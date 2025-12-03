import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const api = axios.create({ baseURL: API_BASE });

// Pages
export const getPages = () => api.get('/pages').then(r => r.data);
export const createPage = (data) => api.post('/pages', data).then(r => r.data);
export const updatePage = (id, data) => api.put(`/pages/${id}`, data).then(r => r.data);
export const deletePage = (id) => api.delete(`/pages/${id}`).then(r => r.data);

// Tasks
export const getTasks = () => api.get('/tasks').then(r => r.data);
export const createTask = (data) => api.post('/tasks', data).then(r => r.data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data).then(r => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(r => r.data);

// Databases
export const getDatabases = () => api.get('/databases').then(r => r.data);
export const createDatabase = (data) => api.post('/databases', data).then(r => r.data);
export const updateDatabase = (id, data) => api.put(`/databases/${id}`, data).then(r => r.data);
export const deleteDatabase = (id) => api.delete(`/databases/${id}`).then(r => r.data);

// Rows
export const getRows = (databaseId) => api.get(`/databases/${databaseId}/rows`).then(r => r.data);
export const createRow = (databaseId, values) => api.post(`/databases/${databaseId}/rows`, { values }).then(r => r.data);
export const updateRow = (databaseId, rowId, values) => api.put(`/databases/${databaseId}/rows/${rowId}`, { values }).then(r => r.data);
export const deleteRow = (databaseId, rowId) => api.delete(`/databases/${databaseId}/rows/${rowId}`).then(r => r.data);

// Search
export const searchAll = (q) => api.get('/search', { params: { q } }).then(r => r.data);

// Folders
export const getFolders = () => api.get('/folders').then(r => r.data);
export const createFolder = (data) => api.post('/folders', data).then(r => r.data);
export const updateFolder = (id, data) => api.put(`/folders/${id}`, data).then(r => r.data);
export const deleteFolder = (id) => api.delete(`/folders/${id}`).then(r => r.data);

// Tags
export const getTags = () => api.get('/tags').then(r => r.data);
export const createTag = (data) => api.post('/tags', data).then(r => r.data);
export const getPageTags = (pageId) => api.get(`/pages/${pageId}/tags`).then(r => r.data);
export const addTagToPage = (pageId, tagId) => api.post(`/pages/${pageId}/tags`, { tagId }).then(r => r.data);
export const removeTagFromPage = (pageId, tagId) => api.delete(`/pages/${pageId}/tags/${tagId}`).then(r => r.data);

// Settings
export const getSetting = (key) => api.get(`/settings/${key}`).then(r => r.data);
export const setSetting = (key, value) => api.post('/settings', { key, value }).then(r => r.data);