import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import * as DB from './db.js';

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: { origin: '*'}
});

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Collaboration broadcast helper
function broadcast(type, action, payload) {
  io.emit('data:update', { type, action, payload });
}

// Pages CRUD
app.get('/api/pages', (req, res) => {
  const pages = DB.getAllPages();
  res.json(pages);
});

app.post('/api/pages', (req, res) => {
  const page = DB.createPage(req.body || {});
  broadcast('page', 'create', page);
  res.status(201).json(page);
});

app.put('/api/pages/:id', (req, res) => {
  const { id } = req.params;
  const updated = DB.updatePage(id, req.body || {});
  if (!updated) return res.sendStatus(404);
  broadcast('page', 'update', updated);
  res.json(updated);
});

app.delete('/api/pages/:id', (req, res) => {
  const { id } = req.params;
  const removed = DB.deletePage(id);
  if (!removed) return res.sendStatus(404);
  broadcast('page', 'delete', removed);
  res.json(removed);
});

// Folders CRUD
app.get('/api/folders', (req, res) => {
  res.json(DB.getAllFolders());
});

app.post('/api/folders', (req, res) => {
  const folder = DB.createFolder(req.body || {});
  broadcast('folder', 'create', folder);
  res.status(201).json(folder);
});

app.put('/api/folders/:id', (req, res) => {
  const { id } = req.params;
  const updated = DB.updateFolder(id, req.body || {});
  broadcast('folder', 'update', updated);
  res.json(updated);
});

app.delete('/api/folders/:id', (req, res) => {
  const { id } = req.params;
  const removed = DB.deleteFolder(id);
  broadcast('folder', 'delete', removed);
  res.json(removed);
});

// Tags CRUD
app.get('/api/tags', (req, res) => {
  res.json(DB.getAllTags());
});

app.post('/api/tags', (req, res) => {
  const tag = DB.createTag(req.body || {});
  res.status(201).json(tag);
});

app.get('/api/pages/:id/tags', (req, res) => {
  const { id } = req.params;
  res.json(DB.getPageTags(id));
});

app.post('/api/pages/:id/tags', (req, res) => {
  const { id } = req.params;
  const { tagId } = req.body;
  DB.addTagToPage(id, tagId);
  broadcast('page', 'update', DB.getPageById(id));
  res.json({ success: true });
});

app.delete('/api/pages/:id/tags/:tagId', (req, res) => {
  const { id, tagId } = req.params;
  DB.removeTagFromPage(id, tagId);
  broadcast('page', 'update', DB.getPageById(id));
  res.json({ success: true });
});

// Tasks CRUD
app.get('/api/tasks', (req, res) => {
  res.json(DB.getAllTasks());
});

app.post('/api/tasks', (req, res) => {
  const task = DB.createTask(req.body || {});
  broadcast('task', 'create', task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updated = DB.updateTask(id, req.body || {});
  if (!updated) return res.sendStatus(404);
  broadcast('task', 'update', updated);
  res.json(updated);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const removed = DB.deleteTask(id);
  if (!removed) return res.sendStatus(404);
  broadcast('task', 'delete', removed);
  res.json(removed);
});

// Databases CRUD
app.get('/api/databases', (req, res) => {
  res.json(DB.getAllDatabases());
});

app.post('/api/databases', (req, res) => {
  const database = DB.createDatabase(req.body || {});
  broadcast('database', 'create', database);
  res.status(201).json(database);
});

app.put('/api/databases/:id', (req, res) => {
  const { id } = req.params;
  const updated = DB.updateDatabase(id, req.body || {});
  broadcast('database', 'update', updated);
  res.json(updated);
});

app.delete('/api/databases/:id', (req, res) => {
  const { id } = req.params;
  const removed = DB.deleteDatabase(id);
  broadcast('database', 'delete', removed);
  res.json(removed);
});

// Rows CRUD within a database
app.get('/api/databases/:id/rows', (req, res) => {
  const { id } = req.params;
  res.json(DB.getRowsByDatabase(id));
});

app.post('/api/databases/:id/rows', (req, res) => {
  const { id } = req.params;
  const values = req.body?.values || {};
  const row = DB.createRow(id, values);
  broadcast('row', 'create', { databaseId: id, row });
  res.status(201).json(row);
});

app.put('/api/databases/:id/rows/:rowId', (req, res) => {
  const { id, rowId } = req.params;
  const values = req.body?.values || {};
  const updated = DB.updateRow(id, rowId, values);
  broadcast('row', 'update', { databaseId: id, row: updated });
  res.json(updated);
});

app.delete('/api/databases/:id/rows/:rowId', (req, res) => {
  const { id, rowId } = req.params;
  const removed = DB.deleteRow(id, rowId);
  if (!removed) return res.sendStatus(404);
  broadcast('row', 'delete', { databaseId: id, row: removed });
  res.json(removed);
});

// Simple search across pages, tasks, and rows
app.get('/api/search', (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) return res.json({ pages: [], tasks: [], rows: [] });
  res.json(DB.searchAll(q));
});

// Settings
app.get('/api/settings/:key', (req, res) => {
  const { key } = req.params;
  const value = DB.getSetting(key);
  res.json({ key, value });
});

app.post('/api/settings', (req, res) => {
  const { key, value } = req.body;
  DB.setSetting(key, value);
  res.json({ key, value });
});

io.on('connection', (socket) => {
  socket.emit('hello', { message: 'connected' });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});