# 🚀 CodeShare - Modern Project Sharing Platform

A complete, production-ready web platform for browsing, uploading, downloading, and sharing programming projects. Built with React, Node.js, and SQLite - inspired by Kashipara but with a modern, unique design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![Node](https://img.shields.io/badge/Node.js-16+-339933.svg)
![Status](https://img.shields.io/badge/status-production--ready-success.svg)

## ✨ Features

### 🔐 Authentication & User Management
- User registration & login with JWT
- Role-based access control (User/Admin)
- Secure password hashing with bcrypt
- Protected routes & private pages

### 📁 Project Management
- Upload projects with files (ZIP, RAR, 7Z, etc.)
- Add screenshots & project details
- Download tracking & view counters
- Project approval workflow

### 🔍 Browse & Search
- Advanced search & filtering
- Filter by category & language
- Real-time search results
- Pagination support

### ⭐ Community Features
- 5-star rating system
- Comments & discussions
- User profiles & statistics
- Author attribution

### 👨‍💼 Admin Panel
- Approve/reject projects
- User management
- Statistics dashboard
- Content moderation tools

### 🎨 Modern UI/UX
- Clean, professional design
- Dark/Light mode toggle
- Fully responsive (mobile, tablet, desktop)
- Smooth animations & transitions
- Toast notifications

## 🛠 Tech Stack

**Frontend:**
- React 18 - UI library
- Tailwind CSS - Styling
- React Router - Navigation
- Axios - HTTP client
- React Icons - Icons
- React Toastify - Notifications

**Backend:**
- Node.js - Runtime
- Express - Web framework
- SQLite - Database
- JWT - Authentication
- Multer - File uploads
- bcryptjs - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Server will run on `http://localhost:5000`

### 2️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

App will open at `http://localhost:3000`

### 3️⃣ Default Admin Credentials

```
Email: admin@codeshare.com
Password: admin123
```

## 📸 Screenshots

### Homepage
Modern hero section with search, category grid, and featured projects

### Browse Projects
Advanced filtering with category, language, and text search

### Project Details
Full project information with ratings, comments, and download button

### Admin Panel
Statistics dashboard with project approval and user management

### Dark Mode
Complete dark mode support across all pages

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions & troubleshooting
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Complete API docs, database schema, deployment guide
- **[FEATURES.md](FEATURES.md)** - Feature comparison & detailed descriptions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture & data flow diagrams
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Comprehensive project overview

## 🔌 API Endpoints

### Authentication (3)
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Projects (7)
```
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
GET    /api/projects/:id/download
POST   /api/projects/:id/rate
POST   /api/projects/:id/comment
GET    /api/projects/categories/all
```

### Admin (6)
```
GET    /api/admin/users
DELETE /api/admin/users/:id
GET    /api/admin/pending-projects
PUT    /api/admin/projects/:id/status
DELETE /api/admin/projects/:id
GET    /api/admin/stats
```

## 🗄 Database Schema

6 tables: `users`, `categories`, `projects`, `ratings`, `comments`, `download_logs`

Pre-populated with:
- 1 admin user
- 10 categories (Java, PHP, Python, JavaScript, C#, Android, React, Node.js, Django, Laravel)

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy from `backend` directory

### Frontend (Vercel/Netlify)
1. Update API URLs to production
2. Run `npm run build`
3. Deploy `build` folder

See [DOCUMENTATION.md](DOCUMENTATION.md) for detailed deployment instructions.

## 🎯 Use Cases

- **Students:** Find project ideas, download source code, build portfolio
- **Developers:** Share open-source projects, get feedback, showcase work
- **Educators:** Find teaching materials, share course projects, track submissions

## 🔒 Security Features

- JWT authentication with 7-day expiration
- Password hashing with bcrypt (10 rounds)
- Protected routes & role-based access
- File type & size validation
- Input sanitization & SQL injection prevention

## 🌟 What Makes This Different

Compared to Kashipara.com:
- ✅ Modern React SPA vs server-rendered pages
- ✅ Tailwind CSS vs basic CSS
- ✅ Dark mode support
- ✅ Rating & comments system
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Fully responsive design
- ✅ Smooth animations & transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Inspired by Kashipara.com
- Built with modern web technologies
- Designed for the developer community

---

**Built with ❤️ using React, Node.js, and SQLite**

*Perfect for portfolios, learning full-stack development, or as a foundation for a real product!*
