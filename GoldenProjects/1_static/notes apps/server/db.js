import Database from 'better-sqlite3';
import { v4 as uuid } from 'uuid';

const db = new Database('notes.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    title TEXT,
    content TEXT,
    folderId TEXT,
    isFavorite INTEGER DEFAULT 0,
    createdAt INTEGER,
    updatedAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS folders (
    id TEXT PRIMARY KEY,
    name TEXT,
    parentId TEXT,
    createdAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE,
    color TEXT
  );

  CREATE TABLE IF NOT EXISTS page_tags (
    pageId TEXT,
    tagId TEXT,
    PRIMARY KEY (pageId, tagId)
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT,
    done INTEGER DEFAULT 0,
    pageId TEXT,
    databaseId TEXT,
    rowId TEXT,
    dueDate TEXT,
    priority TEXT,
    createdAt INTEGER,
    updatedAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS databases (
    id TEXT PRIMARY KEY,
    name TEXT,
    fields TEXT,
    createdAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS rows (
    id TEXT PRIMARY KEY,
    databaseId TEXT,
    rowValues TEXT,
    createdAt INTEGER,
    updatedAt INTEGER
  );

  CREATE TABLE IF NOT EXISTS settings (
    settingKey TEXT PRIMARY KEY,
    settingValue TEXT
  );
`);

// Helper functions
const now = () => Date.now();

// Pages
export const getAllPages = () => db.prepare('SELECT * FROM pages ORDER BY updatedAt DESC').all();
export const getPageById = (id) => db.prepare('SELECT * FROM pages WHERE id = ?').get(id);

export const createPage = (data) => {
  const page = {
    id: uuid(),
    title: data.title || '',
    content: data.content || '',
    folderId: data.folderId || null,
    isFavorite: data.isFavorite ? 1 : 0,
    createdAt: now(),
    updatedAt: now()
  };
  db.prepare('INSERT INTO pages (id, title, content, folderId, isFavorite, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(page.id, page.title, page.content, page.folderId, page.isFavorite, page.createdAt, page.updatedAt);
  return page;
};

export const updatePage = (id, data) => {
  const page = getPageById(id);
  if (!page) return null;
  const updated = {
    ...page,
    ...data,
    isFavorite: data.isFavorite !== undefined ? (data.isFavorite ? 1 : 0) : page.isFavorite,
    updatedAt: now()
  };
  db.prepare('UPDATE pages SET title = ?, content = ?, folderId = ?, isFavorite = ?, updatedAt = ? WHERE id = ?')
    .run(updated.title, updated.content, updated.folderId, updated.isFavorite, updated.updatedAt, id);
  return updated;
};

export const deletePage = (id) => {
  const page = getPageById(id);
  db.prepare('DELETE FROM pages WHERE id = ?').run(id);
  db.prepare('DELETE FROM page_tags WHERE pageId = ?').run(id);
  return page;
};

// Folders
export const getAllFolders = () => db.prepare('SELECT * FROM folders ORDER BY name').all();

export const createFolder = (data) => {
  const folder = {
    id: uuid(),
    name: data.name || 'New Folder',
    parentId: data.parentId || null,
    createdAt: now()
  };
  db.prepare('INSERT INTO folders (id, name, parentId, createdAt) VALUES (?, ?, ?, ?)')
    .run(folder.id, folder.name, folder.parentId, folder.createdAt);
  return folder;
};

export const updateFolder = (id, data) => {
  db.prepare('UPDATE folders SET name = ? WHERE id = ?').run(data.name, id);
  return { id, ...data };
};

export const deleteFolder = (id) => {
  db.prepare('DELETE FROM folders WHERE id = ?').run(id);
  db.prepare('UPDATE pages SET folderId = NULL WHERE folderId = ?').run(id);
  return { id };
};

// Tags
export const getAllTags = () => db.prepare('SELECT * FROM tags ORDER BY name').all();

export const createTag = (data) => {
  const tag = {
    id: uuid(),
    name: data.name,
    color: data.color || '#3b82f6'
  };
  try {
    db.prepare('INSERT INTO tags (id, name, color) VALUES (?, ?, ?)').run(tag.id, tag.name, tag.color);
    return tag;
  } catch (e) {
    return db.prepare('SELECT * FROM tags WHERE name = ?').get(data.name);
  }
};

export const getPageTags = (pageId) => {
  return db.prepare(`
    SELECT t.* FROM tags t
    JOIN page_tags pt ON t.id = pt.tagId
    WHERE pt.pageId = ?
  `).all(pageId);
};

export const addTagToPage = (pageId, tagId) => {
  try {
    db.prepare('INSERT INTO page_tags (pageId, tagId) VALUES (?, ?)').run(pageId, tagId);
  } catch (e) {}
};

export const removeTagFromPage = (pageId, tagId) => {
  db.prepare('DELETE FROM page_tags WHERE pageId = ? AND tagId = ?').run(pageId, tagId);
};

// Tasks
export const getAllTasks = () => db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC').all()
  .map(t => ({ ...t, done: !!t.done }));

export const createTask = (data) => {
  const task = {
    id: uuid(),
    title: data.title || '',
    done: data.done ? 1 : 0,
    pageId: data.pageId || null,
    databaseId: data.databaseId || null,
    rowId: data.rowId || null,
    dueDate: data.dueDate || null,
    priority: data.priority || 'medium',
    createdAt: now(),
    updatedAt: now()
  };
  db.prepare('INSERT INTO tasks (id, title, done, pageId, databaseId, rowId, dueDate, priority, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(task.id, task.title, task.done, task.pageId, task.databaseId, task.rowId, task.dueDate, task.priority, task.createdAt, task.updatedAt);
  return { ...task, done: !!task.done };
};

export const updateTask = (id, data) => {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) return null;
  const updated = {
    ...task,
    ...data,
    done: data.done !== undefined ? (data.done ? 1 : 0) : task.done,
    updatedAt: now()
  };
  db.prepare('UPDATE tasks SET title = ?, done = ?, pageId = ?, databaseId = ?, rowId = ?, dueDate = ?, priority = ?, updatedAt = ? WHERE id = ?')
    .run(updated.title, updated.done, updated.pageId, updated.databaseId, updated.rowId, updated.dueDate, updated.priority, updated.updatedAt, id);
  return { ...updated, done: !!updated.done };
};

export const deleteTask = (id) => {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return task ? { ...task, done: !!task.done } : null;
};

// Databases
export const getAllDatabases = () => db.prepare('SELECT * FROM databases').all()
  .map(d => ({ ...d, fields: JSON.parse(d.fields) }));

export const createDatabase = (data) => {
  const database = {
    id: uuid(),
    name: data.name || 'New Database',
    fields: JSON.stringify(data.fields || []),
    createdAt: now()
  };
  db.prepare('INSERT INTO databases (id, name, fields, createdAt) VALUES (?, ?, ?, ?)')
    .run(database.id, database.name, database.fields, database.createdAt);
  return { ...database, fields: JSON.parse(database.fields) };
};

export const updateDatabase = (id, data) => {
  const fields = JSON.stringify(data.fields || []);
  db.prepare('UPDATE databases SET name = ?, fields = ? WHERE id = ?').run(data.name, fields, id);
  return { id, name: data.name, fields: data.fields };
};

export const deleteDatabase = (id) => {
  db.prepare('DELETE FROM databases WHERE id = ?').run(id);
  db.prepare('DELETE FROM rows WHERE databaseId = ?').run(id);
  return { id };
};

// Rows
export const getRowsByDatabase = (databaseId) => db.prepare('SELECT * FROM rows WHERE databaseId = ? ORDER BY createdAt DESC').all(databaseId)
  .map(r => ({ ...r, values: JSON.parse(r.rowValues) }));

export const createRow = (databaseId, values) => {
  const row = {
    id: uuid(),
    databaseId,
    values: JSON.stringify(values || {}),
    createdAt: now(),
    updatedAt: now()
  };
  db.prepare('INSERT INTO rows (id, databaseId, rowValues, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)')
    .run(row.id, row.databaseId, row.values, row.createdAt, row.updatedAt);
  return { ...row, values: JSON.parse(row.values) };
};

export const updateRow = (databaseId, rowId, values) => {
  const valuesStr = JSON.stringify(values || {});
  db.prepare('UPDATE rows SET rowValues = ?, updatedAt = ? WHERE id = ? AND databaseId = ?')
    .run(valuesStr, now(), rowId, databaseId);
  return { id: rowId, databaseId, values, updatedAt: now() };
};

export const deleteRow = (databaseId, rowId) => {
  const row = db.prepare('SELECT * FROM rows WHERE id = ? AND databaseId = ?').get(rowId, databaseId);
  db.prepare('DELETE FROM rows WHERE id = ? AND databaseId = ?').run(rowId, databaseId);
  return row ? { ...row, values: JSON.parse(row.rowValues) } : null;
};

// Search
export const searchAll = (query) => {
  const q = `%${query.toLowerCase()}%`;
  const pages = db.prepare('SELECT * FROM pages WHERE LOWER(title) LIKE ? OR LOWER(content) LIKE ?').all(q, q);
  const tasks = db.prepare('SELECT * FROM tasks WHERE LOWER(title) LIKE ?').all(q).map(t => ({ ...t, done: !!t.done }));
  const rows = db.prepare('SELECT * FROM rows WHERE LOWER(rowValues) LIKE ?').all(q)
    .map(r => ({ databaseId: r.databaseId, row: { ...r, values: JSON.parse(r.rowValues) } }));
  return { pages, tasks, rows };
};

// Settings
export const getSetting = (key) => {
  const row = db.prepare('SELECT settingValue FROM settings WHERE settingKey = ?').get(key);
  return row ? row.settingValue : null;
};

export const setSetting = (key, value) => {
  db.prepare('INSERT OR REPLACE INTO settings (settingKey, settingValue) VALUES (?, ?)').run(key, value);
};

export default db;
