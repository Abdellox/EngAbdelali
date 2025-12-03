import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import {
  getPages, createPage, updatePage, deletePage,
  getTasks, createTask, updateTask, deleteTask,
  getDatabases, createDatabase, updateDatabase, deleteDatabase,
  getRows, createRow, updateRow, deleteRow,
  getFolders, createFolder, updateFolder, deleteFolder,
  getTags, createTag, getPageTags, addTagToPage, removeTagFromPage,
  getSetting, setSetting,
  searchAll
} from './api.js';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [pages, setPages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [rowsByDb, setRowsByDb] = useState({});
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      setPages(await getPages());
      setTasks(await getTasks());
      setFolders(await getFolders());
      setTags(await getTags());
      const dbs = await getDatabases();
      setDatabases(dbs);
      const rows = {};
      for (const d of dbs) rows[d.id] = await getRows(d.id);
      setRowsByDb(rows);
      const theme = await getSetting('theme');
      if (theme?.value === 'dark') setDarkMode(true);
    })();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:4000', { transports: ['websocket'] });
    socket.on('data:update', ({ type, action, payload }) => {
      if (type === 'page') {
        setPages(prev => applyListUpdate(prev, action, payload));
      } else if (type === 'task') {
        setTasks(prev => applyListUpdate(prev, action, payload));
      } else if (type === 'database') {
        setDatabases(prev => applyListUpdate(prev, action, payload));
      } else if (type === 'folder') {
        setFolders(prev => applyListUpdate(prev, action, payload));
      } else if (type === 'row') {
        const { databaseId, row } = payload;
        setRowsByDb(prev => ({ ...prev, [databaseId]: applyListUpdate(prev[databaseId] || [], action, row) }));
      }
    });
    return () => socket.disconnect();
  }, []);

  const actions = useMemo(() => ({
    async addPage(data) { const p = await createPage(data); setPages(prev => [p, ...prev]); return p; },
    async editPage(id, data) { const p = await updatePage(id, data); setPages(prev => updateItem(prev, p)); return p; },
    async removePage(id) { const p = await deletePage(id); setPages(prev => prev.filter(x => x.id !== id)); return p; },

    async addTask(data) { const t = await createTask(data); setTasks(prev => [t, ...prev]); return t; },
    async editTask(id, data) { const t = await updateTask(id, data); setTasks(prev => updateItem(prev, t)); return t; },
    async removeTask(id) { const t = await deleteTask(id); setTasks(prev => prev.filter(x => x.id !== id)); return t; },

    async addDatabase(data) { const d = await createDatabase(data); setDatabases(prev => [d, ...prev]); return d; },
    async editDatabase(id, data) { const d = await updateDatabase(id, data); setDatabases(prev => updateItem(prev, d)); return d; },
    async removeDatabase(id) { const d = await deleteDatabase(id); setDatabases(prev => prev.filter(x => x.id !== id)); return d; },

    async addRow(databaseId, values) { const r = await createRow(databaseId, values); setRowsByDb(prev => ({ ...prev, [databaseId]: [r, ...(prev[databaseId]||[])] })); return r; },
    async editRow(databaseId, rowId, values) { const r = await updateRow(databaseId, rowId, values); setRowsByDb(prev => ({ ...prev, [databaseId]: updateItem(prev[databaseId] || [], r) })); return r; },
    async removeRow(databaseId, rowId) { const r = await deleteRow(databaseId, rowId); setRowsByDb(prev => ({ ...prev, [databaseId]: (prev[databaseId]||[]).filter(x => x.id !== rowId) })); return r; },

    async addFolder(data) { const f = await createFolder(data); setFolders(prev => [f, ...prev]); return f; },
    async editFolder(id, data) { const f = await updateFolder(id, data); setFolders(prev => updateItem(prev, f)); return f; },
    async removeFolder(id) { const f = await deleteFolder(id); setFolders(prev => prev.filter(x => x.id !== id)); return f; },

    async addTag(data) { const t = await createTag(data); setTags(prev => [t, ...prev]); return t; },
    async getPageTags(pageId) { return await getPageTags(pageId); },
    async addTagToPage(pageId, tagId) { await addTagToPage(pageId, tagId); },
    async removeTagFromPage(pageId, tagId) { await removeTagFromPage(pageId, tagId); },

    async toggleDarkMode() { 
      const newMode = !darkMode;
      setDarkMode(newMode);
      await setSetting('theme', newMode ? 'dark' : 'light');
    },

    async search(q) { const res = await searchAll(q); setSearchResults(res); return res; },
    clearSearch() { setSearchResults(null); }
  }), [darkMode]);

  const value = { pages, tasks, databases, rowsByDb, folders, tags, searchResults, darkMode, actions };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() { return useContext(StoreContext); }

function applyListUpdate(list, action, item) {
  if (action === 'create') return [item, ...list];
  if (action === 'update') return updateItem(list, item);
  if (action === 'delete') return list.filter(x => x.id !== item.id);
  return list;
}

function updateItem(list, updated) { return list.map(x => x.id === updated.id ? updated : x); }