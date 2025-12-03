# 📝 Notion Lite

A free, open-source, self-hosted alternative to Notion. Built with simplicity and speed in mind.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

> **Why Notion Lite?** Many note-taking apps are paid or cloud-only. We built Notion Lite to be completely free, open-source, and self-hosted. Your data stays on your server, forever.

![Notion Lite Screenshot](https://via.placeholder.com/800x450?text=Notion+Lite+Screenshot)

## ✨ Highlights

- 🆓 **100% Free & Open Source** - No subscriptions, no limits
- 🏠 **Self-Hosted** - Your data, your server, your control
- ⚡ **Fast & Lightweight** - Built for speed
- 🌙 **Dark Mode** - Easy on the eyes
- 📱 **Responsive** - Works on desktop and mobile
- 🔄 **Real-time Sync** - Collaborate with your team
- 💾 **Persistent Storage** - SQLite database, data never lost

## Project Structure

```
notes apps/
├── client/           # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── api.js
└── server/           # Node.js + Express backend
    ├── index.js
    └── package.json
```

## Prerequisites

- Node.js 18+

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/notes-app.git
   cd notes-app
   ```

2. **Start the backend**
   ```bash
   cd server
   npm install
   npm start
   ```
   Backend runs on `http://localhost:4000`

3. **Start the frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173` and start creating!

### First Steps
1. Click "New Page" to create your first note
2. Try the markdown editor with live preview
3. Create folders to organize your pages
4. Add tags for better categorization
5. Toggle dark mode with the moon icon 🌙

## Features

### Core Features
- **Pages & Notes**: Create, edit, delete pages with rich markdown support and live preview
- **Folders**: Organize pages into folders with hierarchical structure
- **Tags**: Tag pages for better organization and filtering
- **Favorites**: Star important pages for quick access
- **Recent Pages**: Quick access to recently edited pages
- **Search**: Fast search across pages, tasks, and database rows

### Databases
- **Custom Tables**: Create databases with custom fields (text, number, date, checkbox)
- **CRUD Operations**: Full create, read, update, delete for rows
- **Dynamic Schema**: Add/edit fields on the fly

### Tasks
- **To-Do Lists**: Create and manage tasks with checkboxes
- **Priority Levels**: Set task priority (low, medium, high)
- **Due Dates**: Assign due dates to tasks
- **Page Assignment**: Link tasks to specific pages or databases

### UI/UX
- **Dark Mode**: Toggle between light and dark themes
- **Modern Sidebar**: Clean navigation with folders and quick links
- **Markdown Editor**: Rich toolbar with formatting shortcuts
- **Split View**: Side-by-side editor and preview
- **Responsive Design**: Works on desktop and mobile

### Technical
- **Persistent Storage**: SQLite database - data survives server restarts
- **Real-time Collaboration**: WebSocket updates broadcast changes to all clients
- **Auto-save**: Changes save automatically on blur

## 📚 Documentation

### User Guides
- **[Quick Reference](QUICK_REFERENCE.md)** - Common tasks and shortcuts
- **[Features Guide](FEATURES.md)** - Complete feature list and roadmap
- **[Screenshots](SCREENSHOTS.md)** - Visual guide to the UI

### Developer Guides
- **[API Documentation](API.md)** - Complete REST API reference
- **[Contributing](CONTRIBUTING.md)** - How to contribute to the project
- **[Deployment](DEPLOYMENT.md)** - Deploy to production

### Support
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **[Changelog](CHANGELOG.md)** - Version history

## 🎯 Use Cases

- **Personal Knowledge Base** - Store notes, ideas, and research
- **Team Wiki** - Collaborative documentation
- **Project Management** - Track tasks and organize projects
- **Meeting Notes** - Quick note-taking with markdown
- **Study Notes** - Organize learning materials
- **Recipe Book** - Store and organize recipes
- **Travel Planning** - Plan trips with checklists

## 🤝 Contributing

We love contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

## 💬 Community

- **Issues**: Report bugs or request features
- **Discussions**: Ask questions or share ideas
- **Pull Requests**: Contribute code

## 🙏 Acknowledgments

Inspired by:
- [Notion](https://notion.so) - For the amazing UX
- [Obsidian](https://obsidian.md) - For markdown-first approach
- [AppFlowy](https://appflowy.io) - For open-source inspiration

## 📊 Project Stats

- **Language**: JavaScript (Node.js + React)
- **Database**: SQLite
- **Real-time**: WebSockets (Socket.IO)
- **Styling**: CSS with CSS Variables
- **Build Tool**: Vite

## 🔮 Roadmap

See [FEATURES.md](FEATURES.md) for the complete roadmap. Highlights:

- [ ] Export/Import (PDF, Markdown, HTML)
- [ ] Page linking and backlinks
- [ ] Templates
- [ ] Version history
- [ ] Calendar and Kanban views
- [ ] Mobile apps
- [ ] Offline support (PWA)

## ⚠️ Notes

- Data is stored in SQLite (`notes.db` file in server directory)
- Real-time collaboration via WebSockets (last-write-wins)
- All features work offline-first with instant UI updates
- No user authentication yet (single-user or trusted team)

## 🚀 Deploy

Ready to deploy? Check out our [Deployment Guide](DEPLOYMENT.md) for:
- VPS deployment (DigitalOcean, AWS, etc.)
- Docker deployment
- Heroku deployment
- And more!

---

**Made with ❤️ by the open-source community**

[⬆ Back to top](#-notion-lite)