let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNoteId = null;

function renderNotesList() {
    const list = document.getElementById('notesList');
    if (notes.length === 0) {
        list.innerHTML = '<div class="no-notes">No notes yet</div>';
        return;
    }
    list.innerHTML = notes.map(note => `
        <div class="note-item ${currentNoteId === note.id ? 'active' : ''}" onclick="loadNote(${note.id})">
            <div class="note-item-title">${note.title || 'Untitled'}</div>
            <div class="note-item-preview">${note.content.substring(0, 50)}...</div>
            <div class="note-item-date">${new Date(note.updated).toLocaleDateString()}</div>
        </div>
    `).join('');
}

function createNote() {
    const note = {
        id: Date.now(),
        title: '',
        content: '',
        created: new Date().toISOString(),
        updated: new Date().toISOString()
    };
    notes.unshift(note);
    currentNoteId = note.id;
    saveNotes();
    renderNotesList();
    loadNote(note.id);
}

function loadNote(id) {
    currentNoteId = id;
    const note = notes.find(n => n.id === id);
    if (note) {
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
        renderNotesList();
    }
}

function saveNote() {
    if (!currentNoteId) return;
    const note = notes.find(n => n.id === currentNoteId);
    if (note) {
        note.title = document.getElementById('noteTitle').value;
        note.content = document.getElementById('noteContent').value;
        note.updated = new Date().toISOString();
        saveNotes();
        renderNotesList();
    }
}

function deleteNote() {
    if (!currentNoteId || !confirm('Delete this note?')) return;
    notes = notes.filter(n => n.id !== currentNoteId);
    currentNoteId = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    saveNotes();
    renderNotesList();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Auto-save
document.getElementById('noteTitle').addEventListener('input', saveNote);
document.getElementById('noteContent').addEventListener('input', saveNote);

renderNotesList();
if (notes.length > 0) loadNote(notes[0].id);
console.log('📝 Notes App Ready');
