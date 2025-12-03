const STORAGE_KEY = "notes_app_v1";
const THEME_KEY = "notes_theme";
const TRASH_KEY = "notes_trash_v1";
const SCHEMA_VERSION = 3; // v3 adds notebook, format, attachments, backlinks, task counts

let notes = [];
let trash = [];
let searchTerm = "";
let showPinnedOnly = false;

const body = document.body;
const searchInput = document.getElementById("searchInput");
const filterPinnedToggle = document.getElementById("filterPinnedToggle");
const themeToggle = document.getElementById("themeToggle");
const notebookFilter = document.getElementById("notebookFilter");
const sortSelect = document.getElementById("sortSelect");
const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const noteColor = document.getElementById("noteColor");
const notesGrid = document.getElementById("notesGrid");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    localStorage.setItem(TRASH_KEY, JSON.stringify(trash));
  } catch (e) {
    console.warn("Save failed:", e);
    alert("Storage limit reached or write failed. Consider exporting notes.");
  }
}

function migrateIfNeeded(item) {
  // v1 note had no tags
  if (!item.tags) item.tags = [];
  // v3 defaults
  if (!("notebook" in item)) item.notebook = null;
  if (!("format" in item)) item.format = "plain";
  if (!Array.isArray(item.attachments)) item.attachments = [];
  return normalizeDerived(item);
}

function load() {
  try {
    const rawNotes = localStorage.getItem(STORAGE_KEY);
    const rawTrash = localStorage.getItem(TRASH_KEY);
    notes = rawNotes ? JSON.parse(rawNotes) : [];
    trash = rawTrash ? JSON.parse(rawTrash) : [];
    // Migration for existing notes to v2
    notes = Array.isArray(notes) ? notes.map(migrateIfNeeded) : [];
    trash = Array.isArray(trash) ? trash.map(migrateIfNeeded) : [];
  } catch (e) {
    notes = [];
    trash = [];
  }
}

function setTheme(theme) {
  body.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.textContent = `Dark: ${theme === "dark" ? "On" : "Off"}`;
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  setTheme(theme);
}

function matchesSearch(note) {
  if (!searchTerm) return true;
  const t = `${note.title || ""} ${note.content || ""} ${(note.tags||[]).join(" ")} ${note.notebook||""}`.toLowerCase();
  return t.includes(searchTerm.toLowerCase());
}

function filteredNotes() {
  let list = [...notes];
  if (showPinnedOnly) list = list.filter(n => n.pinned);
  const nb = (window.currentNotebook || "");
  if (nb) list = list.filter(n => (n.notebook || "") === nb);
  list = list.filter(matchesSearch);
  const order = (window.sortOrder || "updated_desc");
  const cmpUpdated = (a, b) => a.updatedAt - b.updatedAt;
  const cmpTitle = (a, b) => String(a.title||"").localeCompare(String(b.title||""));
  let cmp;
  if (order === "updated_desc") cmp = (a,b) => -cmpUpdated(a,b);
  else if (order === "updated_asc") cmp = cmpUpdated;
  else if (order === "title_asc") cmp = cmpTitle;
  else if (order === "title_desc") cmp = (a,b) => -cmpTitle(a,b);
  else cmp = (a,b) => -cmpUpdated(a,b);
  list.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return cmp(a, b);
  });
  return list;
}

function render() {
  notesGrid.innerHTML = "";
  updateNotebookOptions();
  const list = filteredNotes();
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "badge";
    empty.textContent = "No notes yet";
    notesGrid.appendChild(empty);
    return;
  }
  list.forEach(note => {
    const card = noteCard(note);
    if (Array.isArray(note.tags) && note.tags.length) {
      const chips = document.createElement("div");
      chips.className = "chips";
      note.tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = `#${tag}`;
        chips.appendChild(chip);
      });
      // insert before bottom row if exists, else at end
      card.appendChild(chips);
    }
    notesGrid.appendChild(card);
  });
}

function updateNote(id, patch) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return;
  // keep tags consistent when content/title changes
  const merged = { ...notes[idx], ...patch };
  const tags = extractTags(`${merged.title || ""} ${merged.content || ""}`);
  notes[idx] = { ...normalizeDerived({ ...merged, tags }), updatedAt: Date.now() };
  save();
  recomputeBacklinks();
  render();
}

function deleteNote(id) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return;
  const now = Date.now();
  const removed = { ...notes[idx], deletedAt: now };
  notes.splice(idx, 1);
  trash.unshift(removed);
  save();
  render();
}

function restoreLastDeleted() {
  if (!trash.length) return;
  const item = trash.shift();
  const restored = { ...item };
  delete restored.deletedAt;
  restored.updatedAt = Date.now();
  notes.unshift(restored);
  save();
  render();
}

function noteCard(note) {
  const card = document.createElement("div");
  card.className = `note-card accent-${note.color || "default"}`;
  card.setAttribute("data-id", note.id);

  const top = document.createElement("div");
  top.className = "row";

  const title = document.createElement("input");
  title.className = "input title";
  title.value = note.title || "";
  title.placeholder = "Title";
  title.addEventListener("input", () => debouncedUpdate(note.id, { title: title.value }));

  const actions = document.createElement("div");
  actions.className = "note-actions";

  const pinBtn = document.createElement("button");
  pinBtn.className = "btn";
  pinBtn.textContent = note.pinned ? "Unpin" : "Pin";
  pinBtn.setAttribute("aria-pressed", String(!!note.pinned));
  pinBtn.addEventListener("click", () => updateNote(note.id, { pinned: !note.pinned }));

  const delBtn = document.createElement("button");
  delBtn.className = "btn";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => deleteNote(note.id));

  actions.appendChild(pinBtn);
  actions.appendChild(delBtn);

  top.appendChild(title);
  top.appendChild(actions);

  const content = document.createElement("textarea");
  content.className = "textarea";
  content.rows = 6;
  content.value = note.content || "";
  content.placeholder = "Write here";
  content.addEventListener("input", () => debouncedUpdate(note.id, { content: content.value }));

  const bottom = document.createElement("div");
  bottom.className = "row";

  const meta = document.createElement("div");
  meta.className = "badge";
  const date = new Date(note.updatedAt);
  const tasks = note.tasks ? ` · ◻️${note.tasks.open}/✅${note.tasks.done}` : "";
  const nb = note.notebook ? ` · 📁${note.notebook}` : "";
  meta.textContent = `${note.pinned ? "📌 " : ""}${date.toLocaleString()}${nb}${tasks}`;

  const colorSel = document.createElement("select");
  colorSel.className = "select";
  ["default","yellow","blue","green","pink","purple"].forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c[0].toUpperCase() + c.slice(1);
    if (note.color === c) opt.selected = true;
    colorSel.appendChild(opt);
  });
  colorSel.addEventListener("change", () => updateNote(note.id, { color: colorSel.value }));

  bottom.appendChild(meta);
  bottom.appendChild(colorSel);

  card.appendChild(top);
  card.appendChild(content);
  card.appendChild(bottom);

  return card;
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  const color = noteColor.value;
  if (!title && !content) return;
  const now = Date.now();
  const tags = extractTags(`${title} ${content}`);
  const base = { id: uid(), title, content, color, tags, pinned: false, createdAt: now, updatedAt: now };
  const note = normalizeDerived(base);
  notes.unshift(note);
  save();
  recomputeBacklinks();
  noteTitle.value = "";
  noteContent.value = "";
  noteColor.value = "default";
  render();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  render();
});

filterPinnedToggle.addEventListener("click", () => {
  showPinnedOnly = !showPinnedOnly;
  filterPinnedToggle.textContent = `Pinned: ${showPinnedOnly ? "On" : "Off"}`;
  filterPinnedToggle.setAttribute("aria-pressed", String(showPinnedOnly));
  render();
});

themeToggle.addEventListener("click", () => {
  const current = body.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// Notebook filter and sorting controls
if (notebookFilter) {
  notebookFilter.addEventListener("change", () => {
    window.currentNotebook = notebookFilter.value || "";
    render();
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    window.sortOrder = sortSelect.value || "updated_desc";
    render();
  });
}

exportBtn.addEventListener("click", () => {
  const payload = { version: SCHEMA_VERSION, notes, trash };
  const data = JSON.stringify(payload, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `notes-${new Date().toISOString().slice(0,19)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", async () => {
  const file = importFile.files && importFile.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const imported = JSON.parse(text);
    if (Array.isArray(imported)) {
      // legacy format (notes array only)
      notes = imported.map(n => ({
        id: n.id || uid(),
        title: String(n.title || ""),
        content: String(n.content || ""),
        color: n.color || "default",
        tags: Array.isArray(n.tags) ? n.tags : extractTags(`${n.title || ""} ${n.content || ""}`),
        notebook: n.notebook || null,
        format: n.format || guessFormat(`${n.title||""}\n${n.content||""}`),
        attachments: Array.isArray(n.attachments) ? n.attachments : [],
        pinned: !!n.pinned,
        createdAt: Number(n.createdAt || Date.now()),
        updatedAt: Number(n.updatedAt || Date.now()),
      }));
      trash = [];
    } else if (imported && typeof imported === "object") {
      const arrNotes = Array.isArray(imported.notes) ? imported.notes : [];
      const arrTrash = Array.isArray(imported.trash) ? imported.trash : [];
      notes = arrNotes.map(n => ({
        id: n.id || uid(),
        title: String(n.title || ""),
        content: String(n.content || ""),
        color: n.color || "default",
        tags: Array.isArray(n.tags) ? n.tags : extractTags(`${n.title || ""} ${n.content || ""}`),
        notebook: n.notebook || null,
        format: n.format || guessFormat(`${n.title||""}\n${n.content||""}`),
        attachments: Array.isArray(n.attachments) ? n.attachments : [],
        pinned: !!n.pinned,
        createdAt: Number(n.createdAt || Date.now()),
        updatedAt: Number(n.updatedAt || Date.now()),
      }));
      trash = arrTrash.map(n => ({
        id: n.id || uid(),
        title: String(n.title || ""),
        content: String(n.content || ""),
        color: n.color || "default",
        tags: Array.isArray(n.tags) ? n.tags : extractTags(`${n.title || ""} ${n.content || ""}`),
        notebook: n.notebook || null,
        format: n.format || guessFormat(`${n.title||""}\n${n.content||""}`),
        attachments: Array.isArray(n.attachments) ? n.attachments : [],
        pinned: !!n.pinned,
        createdAt: Number(n.createdAt || Date.now()),
        updatedAt: Number(n.updatedAt || Date.now()),
        deletedAt: Number(n.deletedAt || Date.now()),
      }));
    } else {
      return;
    }
    save();
    recomputeBacklinks();
    render();
  } catch (e) {}
  importFile.value = "";
});

// Debounce updates to reduce write frequency
const updateTimers = new Map();
const pendingPatches = new Map();
function debouncedUpdate(id, patch, delay = 250) {
  const prev = pendingPatches.get(id) || {};
  pendingPatches.set(id, { ...prev, ...patch });
  if (updateTimers.has(id)) {
    clearTimeout(updateTimers.get(id));
  }
  const t = setTimeout(() => {
    const toApply = pendingPatches.get(id) || {};
    pendingPatches.delete(id);
    updateTimers.delete(id);
    updateNote(id, toApply);
  }, delay);
  updateTimers.set(id, t);
}

// Extract hashtags from text into array of tag strings (without #)
function extractTags(text) {
  if (!text) return [];
  const matches = text.match(/#[\w-]{2,}/g) || [];
  const set = new Set(matches.map(t => t.slice(1).toLowerCase()));
  return Array.from(set);
}

// Extract [[links]] (id or title) for backlinks support
function extractLinks(text) {
  if (!text) return [];
  const matches = text.match(/\[\[([^\]]+)\]\]/g) || [];
  return matches.map(m => m.slice(2, -2).trim());
}

// Extract notebook via @notebook(Name) directive
function extractNotebook(text) {
  if (!text) return null;
  const m = text.match(/@notebook\(([^)]+)\)/i);
  return m ? m[1].trim() : null;
}

// Guess note format based on content tokens
function guessFormat(text) {
  const mdHints = /(^#{1,6}\s)|(```)|(^\s*[-*]\s)|\[.+\]\(.+\)|!\[.*\]\(.+\)/m;
  return mdHints.test(text || "") ? "markdown" : "plain";
}

// Compute task counts from markdown checkboxes
function computeTasks(text) {
  if (!text) return { open: 0, done: 0 };
  const open = (text.match(/^-\s*\[\s\]/gmi) || []).length;
  const done = (text.match(/^-\s*\[x\]/gmi) || []).length;
  return { open, done };
}

// Normalize derived fields for a note
function normalizeDerived(note) {
  const source = `${note.title || ""}\n${note.content || ""}`;
  const notebook = extractNotebook(source) || note.notebook || null;
  const links = extractLinks(source);
  const format = note.format || guessFormat(source);
  const tasks = computeTasks(source);
  const attachments = Array.isArray(note.attachments) ? note.attachments : [];
  return { ...note, notebook, links, format, tasks, attachments };
}

// Recompute backlinks from notes' links to targets by id or title
function recomputeBacklinks() {
  const byId = new Map(notes.map(n => [n.id, n]));
  const byTitle = new Map(notes.map(n => [String(n.title || "").toLowerCase(), n]));
  const backlinks = new Map(notes.map(n => [n.id, new Set()]));
  notes.forEach(n => {
    (n.links || []).forEach(token => {
      const idToken = token.startsWith("id:") ? token.slice(3) : token;
      const target = byId.get(idToken) || byTitle.get(token.toLowerCase());
      if (target) {
        backlinks.get(target.id).add(n.id);
      }
    });
  });
  notes = notes.map(n => ({ ...n, backlinks: Array.from(backlinks.get(n.id) || []) }));
}

// Keyboard shortcut: Ctrl+Shift+Z to restore last deleted note
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (e.ctrlKey && e.shiftKey && key === "z") {
    e.preventDefault();
    restoreLastDeleted();
  }
});

function updateNotebookOptions() {
  if (!notebookFilter) return;
  const options = new Set([""]);
  notes.forEach(n => { if (n.notebook) options.add(n.notebook); });
  const current = (window.currentNotebook || "");
  notebookFilter.innerHTML = "";
  Array.from(options).sort((a,b)=>String(a).localeCompare(String(b))).forEach(nb => {
    const opt = document.createElement("option");
    opt.value = nb;
    opt.textContent = nb ? nb : "All notebooks";
    if (nb === current) opt.selected = true;
    notebookFilter.appendChild(opt);
  });
}

initTheme();
load();
recomputeBacklinks();
render();