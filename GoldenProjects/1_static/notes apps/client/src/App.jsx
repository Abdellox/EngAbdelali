import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useStore } from './store.js';
import './styles.css';

function Sidebar() {
  const { pages, folders, tasks, databases, actions, darkMode } = useStore();
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [folderName, setFolderName] = useState('');
  const nav = useNavigate();

  async function addFolder() {
    if (!folderName.trim()) return;
    await actions.addFolder({ name: folderName });
    setFolderName('');
    setShowFolderForm(false);
  }

  async function newPage() {
    const p = await actions.addPage({ title: 'Untitled', content: '' });
    nav(`/page/${p.id}`);
  }

  const favorites = pages.filter(p => p.isFavorite);
  const recentPages = [...pages].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>📝 Notion Lite</h2>
        <button onClick={actions.toggleDarkMode} className="icon-btn" title="Toggle theme">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <button onClick={newPage} className="new-page-btn">+ New Page</button>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">🏠 All Pages</Link>
        <Link to="/favorites" className="nav-item">⭐ Favorites</Link>
        <Link to="/recent" className="nav-item">🕐 Recent</Link>
        <Link to="/tasks" className="nav-item">✓ Tasks</Link>
        <Link to="/databases" className="nav-item">📊 Databases</Link>
      </nav>

      <div className="sidebar-section">
        <div className="section-header">
          <span>📁 Folders</span>
          <button onClick={() => setShowFolderForm(!showFolderForm)} className="icon-btn">+</button>
        </div>
        {showFolderForm && (
          <div className="folder-form">
            <input 
              value={folderName} 
              onChange={e => setFolderName(e.target.value)}
              placeholder="Folder name"
              onKeyDown={e => e.key === 'Enter' && addFolder()}
            />
            <button onClick={addFolder}>Add</button>
          </div>
        )}
        {folders.map(f => (
          <Link key={f.id} to={`/folder/${f.id}`} className="folder-item">
            📁 {f.name}
          </Link>
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="sidebar-section">
          <div className="section-header">⭐ Starred</div>
          {favorites.slice(0, 3).map(p => (
            <Link key={p.id} to={`/page/${p.id}`} className="page-link">
              {p.title || 'Untitled'}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const { actions } = useStore();
  const [q, setQ] = useState('');
  
  function handleSearch(e) {
    e.preventDefault();
    if (q.trim()) actions.search(q);
  }

  return (
    <header className="header">
      <form onSubmit={handleSearch} className="search-form">
        <input 
          value={q} 
          onChange={e => setQ(e.target.value)} 
          placeholder="Search pages, tasks, databases..." 
          className="search-input"
        />
        <button type="submit">🔍</button>
        {q && <button type="button" onClick={() => { setQ(''); actions.clearSearch(); }}>✕</button>}
      </form>
    </header>
  );
}

function SearchResults() {
  const { searchResults } = useStore();
  if (!searchResults) return null;
  
  return (
    <div className="search-results">
      <h3>Search Results</h3>
      <div className="results-grid">
        <div>
          <h4>Pages ({searchResults.pages.length})</h4>
          {searchResults.pages.map(p => (
            <Link key={p.id} to={`/page/${p.id}`} className="result-item">
              📄 {p.title || 'Untitled'}
            </Link>
          ))}
        </div>
        <div>
          <h4>Tasks ({searchResults.tasks.length})</h4>
          {searchResults.tasks.map(t => (
            <div key={t.id} className="result-item">
              ✓ {t.title}
            </div>
          ))}
        </div>
        <div>
          <h4>Database Rows ({searchResults.rows.length})</h4>
          {searchResults.rows.map(({ databaseId, row }) => (
            <Link key={row.id} to={`/database/${databaseId}`} className="result-item">
              📊 Row {row.id.slice(0, 8)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PagesList({ folderId = null, filterType = null }) {
  const { pages, folders, actions } = useStore();
  
  let filteredPages = pages;
  let title = 'All Pages';
  
  if (folderId) {
    filteredPages = pages.filter(p => p.folderId === folderId);
    const folder = folders.find(f => f.id === folderId);
    title = folder ? `📁 ${folder.name}` : 'Folder';
  } else if (filterType === 'favorites') {
    filteredPages = pages.filter(p => p.isFavorite);
    title = '⭐ Favorites';
  } else if (filterType === 'recent') {
    filteredPages = [...pages].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 20);
    title = '🕐 Recent Pages';
  }

  return (
    <div className="page-list">
      <h2>{title}</h2>
      <div className="pages-grid">
        {filteredPages.map(p => (
          <PageCard key={p.id} page={p} />
        ))}
        {filteredPages.length === 0 && (
          <div className="empty-state">No pages yet. Create one to get started!</div>
        )}
      </div>
    </div>
  );
}

function PageCard({ page }) {
  const { actions } = useStore();
  const nav = useNavigate();

  async function toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    await actions.editPage(page.id, { isFavorite: !page.isFavorite });
  }

  return (
    <Link to={`/page/${page.id}`} className="page-card">
      <div className="page-card-header">
        <h3>{page.title || 'Untitled'}</h3>
        <button onClick={toggleFavorite} className="icon-btn">
          {page.isFavorite ? '⭐' : '☆'}
        </button>
      </div>
      <p className="page-preview">{page.content?.slice(0, 100) || 'Empty page'}</p>
      <div className="page-meta">
        {new Date(page.updatedAt).toLocaleDateString()}
      </div>
    </Link>
  );
}

function PageView() {
  const { pages, folders, tags, actions } = useStore();
  const { id } = useParams();
  const page = pages.find(p => p.id === id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folderId, setFolderId] = useState('');
  const [pageTags, setPageTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (page) {
      setTitle(page.title || '');
      setContent(page.content || '');
      setFolderId(page.folderId || '');
      loadTags();
    }
  }, [page?.id]);

  async function loadTags() {
    if (page) {
      const t = await actions.getPageTags(page.id);
      setPageTags(t);
    }
  }

  async function save() {
    await actions.editPage(page.id, { title, content, folderId: folderId || null });
  }

  async function deletePage() {
    if (confirm('Delete this page?')) {
      await actions.removePage(page.id);
      nav('/');
    }
  }

  async function addTag() {
    if (!newTagName.trim()) return;
    const tag = await actions.addTag({ name: newTagName, color: '#3b82f6' });
    await actions.addTagToPage(page.id, tag.id);
    setNewTagName('');
    setShowTagInput(false);
    loadTags();
  }

  async function removeTag(tagId) {
    await actions.removeTagFromPage(page.id, tagId);
    loadTags();
  }

  function insertMarkdown(before, after = '') {
    const textarea = document.querySelector('.content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newContent = content.substring(0, start) + before + selected + after + content.substring(end);
    setContent(newContent);
  }

  if (!page) return <div className="page-view">Page not found</div>;

  return (
    <div className="page-view">
      <div className="page-toolbar">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          onBlur={save}
          placeholder="Untitled"
          className="page-title-input"
        />
        <div className="toolbar-actions">
          <select value={folderId} onChange={e => { setFolderId(e.target.value); }} onBlur={save}>
            <option value="">No folder</option>
            {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
          <button onClick={() => actions.editPage(page.id, { isFavorite: !page.isFavorite })} className="icon-btn">
            {page.isFavorite ? '⭐' : '☆'}
          </button>
          <button onClick={deletePage} className="btn-danger">Delete</button>
        </div>
      </div>

      <div className="tags-section">
        {pageTags.map(tag => (
          <span key={tag.id} className="tag" style={{ backgroundColor: tag.color }}>
            {tag.name}
            <button onClick={() => removeTag(tag.id)}>×</button>
          </span>
        ))}
        {showTagInput ? (
          <div className="tag-input">
            <input 
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTag()}
              placeholder="Tag name"
              autoFocus
            />
            <button onClick={addTag}>Add</button>
            <button onClick={() => setShowTagInput(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowTagInput(true)} className="add-tag-btn">+ Add tag</button>
        )}
      </div>

      <div className="markdown-toolbar">
        <button onClick={() => insertMarkdown('**', '**')} title="Bold">B</button>
        <button onClick={() => insertMarkdown('*', '*')} title="Italic">I</button>
        <button onClick={() => insertMarkdown('# ', '')} title="Heading">H1</button>
        <button onClick={() => insertMarkdown('## ', '')} title="Heading 2">H2</button>
        <button onClick={() => insertMarkdown('- ', '')} title="List">• List</button>
        <button onClick={() => insertMarkdown('```\n', '\n```')} title="Code">Code</button>
        <button onClick={() => insertMarkdown('[', '](url)')} title="Link">Link</button>
      </div>

      <div className="editor-container">
        <textarea 
          value={content}
          onChange={e => setContent(e.target.value)}
          onBlur={save}
          className="content-editor"
          placeholder="Start writing..."
        />
        <div className="markdown-preview">
          <ReactMarkdown>{content || '*Preview will appear here*'}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function DatabasesList() {
  const { databases, actions } = useStore();
  const [name, setName] = useState('');
  const [fields, setFields] = useState([]);
  const nav = useNavigate();

  function addField() {
    setFields(prev => [...prev, { name: 'Field', type: 'text' }]);
  }

  async function create() {
    if (!name.trim()) return;
    const d = await actions.addDatabase({ name, fields });
    setName('');
    setFields([]);
    nav(`/database/${d.id}`);
  }

  return (
    <div className="database-list">
      <h2>📊 Databases</h2>
      
      <div className="create-database">
        <h3>Create New Database</h3>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Database name"
        />
        <div className="fields-config">
          {fields.map((f, i) => (
            <div key={i} className="field-row">
              <input 
                value={f.name} 
                onChange={e => setFields(fs => fs.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))}
                placeholder="Field name"
              />
              <select 
                value={f.type} 
                onChange={e => setFields(fs => fs.map((x, idx) => idx === i ? { ...x, type: e.target.value } : x))}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
              </select>
              <button onClick={() => setFields(fs => fs.filter((_, idx) => idx !== i))}>Remove</button>
            </div>
          ))}
          <button onClick={addField}>+ Add Field</button>
        </div>
        <button onClick={create} className="btn-primary">Create Database</button>
      </div>

      <div className="databases-grid">
        {databases.map(d => (
          <Link key={d.id} to={`/database/${d.id}`} className="database-card">
            <h3>📊 {d.name}</h3>
            <p>{d.fields?.length || 0} fields</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DatabaseView() {
  const { databases, rowsByDb, actions } = useStore();
  const { id } = useParams();
  const db = databases.find(d => d.id === id);
  const rows = rowsByDb[id] || [];
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    if (db) setSchema(db.fields || []);
  }, [db?.id]);

  if (!db) return <div className="database-view">Database not found</div>;

  function addRow() {
    actions.addRow(db.id, {});
  }

  function saveSchema() {
    actions.editDatabase(db.id, { name: db.name, fields: schema });
  }

  return (
    <div className="database-view">
      <h2>📊 {db.name}</h2>
      
      <div className="schema-editor">
        <h3>Schema</h3>
        {schema.map((f, i) => (
          <div key={f.id || i} className="field-row">
            <input 
              value={f.name} 
              onChange={e => setSchema(fs => fs.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))}
            />
            <select 
              value={f.type} 
              onChange={e => setSchema(fs => fs.map((x, idx) => idx === i ? { ...x, type: e.target.value } : x))}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
        ))}
        <button onClick={() => setSchema(prev => [...prev, { name: 'Field', type: 'text' }])}>+ Add Field</button>
        <button onClick={saveSchema}>Save Schema</button>
      </div>

      <div className="database-table">
        <table>
          <thead>
            <tr>
              {schema.map(f => <th key={f.id || f.name}>{f.name}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                {schema.map(f => (
                  <td key={f.id || f.name}>
                    <FieldInput 
                      type={f.type} 
                      value={(r.values || {})[f.id || f.name]} 
                      onChange={val => actions.editRow(db.id, r.id, { ...(r.values || {}), [f.id || f.name]: val })}
                    />
                  </td>
                ))}
                <td>
                  <button onClick={() => actions.removeRow(db.id, r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="btn-primary">+ Add Row</button>
      </div>
    </div>
  );
}

function TasksPage() {
  const { tasks, pages, databases, actions } = useStore();
  const [title, setTitle] = useState('');
  const [pageId, setPageId] = useState('');
  const [databaseId, setDatabaseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  async function add() {
    if (!title.trim()) return;
    await actions.addTask({ 
      title, 
      pageId: pageId || null, 
      databaseId: databaseId || null,
      dueDate: dueDate || null,
      priority
    });
    setTitle('');
    setDueDate('');
  }

  const pendingTasks = tasks.filter(t => !t.done);
  const completedTasks = tasks.filter(t => t.done);

  return (
    <div className="tasks-page">
      <h2>✓ Tasks</h2>
      
      <div className="task-form">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Task title"
        />
        <input 
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={pageId} onChange={e => setPageId(e.target.value)}>
          <option value="">No page</option>
          {pages.map(p => <option key={p.id} value={p.id}>{p.title || 'Untitled'}</option>)}
        </select>
        <button onClick={add} className="btn-primary">Add Task</button>
      </div>

      <div className="tasks-section">
        <h3>Pending ({pendingTasks.length})</h3>
        {pendingTasks.map(t => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>

      <div className="tasks-section">
        <h3>Completed ({completedTasks.length})</h3>
        {completedTasks.map(t => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}

function TaskItem({ task }) {
  const { actions } = useStore();
  
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  return (
    <div className="task-item">
      <input 
        type="checkbox" 
        checked={task.done} 
        onChange={e => actions.editTask(task.id, { done: e.target.checked })}
      />
      <span className={task.done ? 'task-done' : ''}>{task.title}</span>
      {task.priority && (
        <span className="task-priority" style={{ backgroundColor: priorityColors[task.priority] }}>
          {task.priority}
        </span>
      )}
      {task.dueDate && (
        <span className="task-due">📅 {new Date(task.dueDate).toLocaleDateString()}</span>
      )}
      <button onClick={() => actions.removeTask(task.id)} className="icon-btn">🗑️</button>
    </div>
  );
}

function FieldInput({ type, value, onChange }) {
  if (type === 'number') {
    return <input type="number" value={value || ''} onChange={e => onChange(Number(e.target.value))} />;
  }
  if (type === 'date') {
    return <input type="date" value={value || ''} onChange={e => onChange(e.target.value)} />;
  }
  if (type === 'checkbox') {
    return <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />;
  }
  return <input value={value || ''} onChange={e => onChange(e.target.value)} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { darkMode } = useStore();
  
  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Sidebar />
      <div className="main-content">
        <Header />
        <SearchResults />
        <div className="content">
          <Routes>
            <Route path="/" element={<PagesList />} />
            <Route path="/favorites" element={<PagesList filterType="favorites" />} />
            <Route path="/recent" element={<PagesList filterType="recent" />} />
            <Route path="/folder/:id" element={<FolderView />} />
            <Route path="/page/:id" element={<PageView />} />
            <Route path="/databases" element={<DatabasesList />} />
            <Route path="/database/:id" element={<DatabaseView />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function FolderView() {
  const { id } = useParams();
  return <PagesList folderId={id} />;
}
