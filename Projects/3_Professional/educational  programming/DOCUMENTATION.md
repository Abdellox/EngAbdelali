# CodeShare - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Sitemap](#sitemap)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [UI/UX Design](#uiux-design)
7. [Installation Guide](#installation-guide)
8. [Deployment](#deployment)

---

## 🎯 Project Overview

CodeShare is a modern web platform for browsing, uploading, downloading, and sharing programming projects. It's inspired by Kashipara but features a unique, clean design with improved user experience.

### Key Features
- ✅ User authentication (Register/Login)
- ✅ Project upload with file & screenshot support
- ✅ Advanced search & filtering
- ✅ Rating & commenting system
- ✅ Admin panel for content moderation
- ✅ Dark/Light mode
- ✅ Fully responsive design
- ✅ Real-time statistics

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **SQLite** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

---

## 🗺 Sitemap

```
CodeShare Platform
│
├── Public Pages
│   ├── Home (/)
│   ├── Browse Projects (/projects)
│   ├── Project Detail (/projects/:id)
│   ├── Login (/login)
│   └── Register (/register)
│
├── Protected Pages (Require Login)
│   ├── Upload Project (/upload)
│   └── User Dashboard (/dashboard)
│
└── Admin Pages (Admin Only)
    └── Admin Panel (/admin)
        ├── Pending Projects
        ├── User Management
        └── Statistics
```

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  avatar TEXT,
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id INTEGER,
  user_id INTEGER NOT NULL,
  language TEXT NOT NULL,
  technology TEXT,
  file_path TEXT NOT NULL,
  screenshot TEXT,
  demo_url TEXT,
  github_url TEXT,
  requirements TEXT,
  status TEXT DEFAULT 'pending',
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Ratings Table
```sql
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(project_id, user_id)
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Download Logs Table
```sql
CREATE TABLE download_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER,
  ip_address TEXT,
  downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Body: { username, email, password }
Response: { token, user }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
Response: { id, username, email, role, avatar, bio }
```

---

### Project Routes (`/api/projects`)

#### Get All Projects
```
GET /api/projects?category=<slug>&language=<lang>&search=<query>&limit=20&offset=0
Response: [{ project objects }]
```

#### Get Single Project
```
GET /api/projects/:id
Response: { project object with comments }
```

#### Upload Project
```
POST /api/projects
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: FormData with project details + files
Response: { message, id }
```

#### Download Project
```
GET /api/projects/:id/download
Response: File download
```

#### Rate Project
```
POST /api/projects/:id/rate
Headers: Authorization: Bearer <token>
Body: { rating: 1-5 }
Response: { message }
```

#### Comment on Project
```
POST /api/projects/:id/comment
Headers: Authorization: Bearer <token>
Body: { comment }
Response: { message, id }
```

#### Get Categories
```
GET /api/projects/categories/all
Response: [{ id, name, slug, icon }]
```

---

### Admin Routes (`/api/admin`)

All admin routes require authentication + admin role.

#### Get All Users
```
GET /api/admin/users
Response: [{ user objects }]
```

#### Delete User
```
DELETE /api/admin/users/:id
Response: { message }
```

#### Get Pending Projects
```
GET /api/admin/pending-projects
Response: [{ pending project objects }]
```

#### Approve/Reject Project
```
PUT /api/admin/projects/:id/status
Body: { status: 'approved' | 'rejected' }
Response: { message }
```

#### Delete Project
```
DELETE /api/admin/projects/:id
Response: { message }
```

#### Get Statistics
```
GET /api/admin/stats
Response: { totalUsers, totalProjects, pendingProjects, totalDownloads }
```

---

## 🎨 UI/UX Design

### Color Palette

**Primary Colors:**
- Blue: `#0ea5e9` (Primary actions, links)
- Purple: `#764ba2` (Gradients, accents)
- Green: `#10b981` (Success states)
- Red: `#ef4444` (Errors, delete actions)
- Yellow: `#f59e0b` (Warnings, ratings)

**Neutral Colors:**
- Light mode: White backgrounds, gray text
- Dark mode: Gray-900 backgrounds, white text

### Typography
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto')
- Headings: Bold, 2xl-4xl sizes
- Body: Regular, base size
- Small text: sm size for metadata

### Components

**Cards:**
- Rounded corners (rounded-xl)
- Shadow on hover
- Smooth transitions
- Image/icon at top
- Content below

**Buttons:**
- Primary: Blue background, white text
- Secondary: Transparent with border
- Danger: Red background
- Rounded corners (rounded-lg)
- Hover effects

**Forms:**
- Clean input fields with icons
- Focus states with ring
- Validation feedback
- Responsive layout

### Animations
- Fade-in on page load
- Slide-up for hero content
- Hover effects on cards
- Smooth transitions (0.3s)

---

## 📦 Installation Guide

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created):
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

### Default Admin Credentials
```
Email: admin@codeshare.com
Password: admin123
```

---

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables:
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy from `backend` directory
5. Note the deployed URL

### Frontend Deployment (Vercel/Netlify)

1. Update API URLs in frontend code to production backend URL
2. Build the project:
```bash
npm run build
```
3. Deploy the `build` folder to Vercel/Netlify
4. Configure environment variables if needed

### Database
- SQLite database file will be created automatically
- For production, consider migrating to PostgreSQL or MySQL
- Backup database regularly

---

## 📝 Additional Notes

### File Upload Limits
- Max file size: 50MB
- Allowed formats: .zip, .rar, .7z, .tar, .gz
- Screenshot formats: .jpg, .jpeg, .png

### Security Features
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Admin-only endpoints
- File type validation

### Future Enhancements
- Email verification
- Password reset functionality
- Social login (Google, GitHub)
- Advanced analytics
- Project versioning
- Live chat support
- API rate limiting
- CDN for file storage

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Built with ❤️ using React, Node.js, and SQLite**
