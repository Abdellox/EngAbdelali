# 🏗 CodeShare Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Application                      │    │
│  │                                                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐        │    │
│  │  │  Pages   │  │Components│  │ Context  │        │    │
│  │  │          │  │          │  │          │        │    │
│  │  │ • Home   │  │ • Navbar │  │ • Auth   │        │    │
│  │  │ • Projects│ │ • Footer │  │          │        │    │
│  │  │ • Upload │  │ • Cards  │  │          │        │    │
│  │  │ • Admin  │  │ • Forms  │  │          │        │    │
│  │  └──────────┘  └──────────┘  └──────────┘        │    │
│  │                                                     │    │
│  │              Tailwind CSS Styling                  │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│                           │ HTTP/HTTPS                      │
│                           │ (Axios)                         │
└───────────────────────────┼─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Express.js Application                    │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │         Middleware Layer                  │     │    │
│  │  │  • CORS                                   │     │    │
│  │  │  • Body Parser                            │     │    │
│  │  │  • JWT Authentication                     │     │    │
│  │  │  • Multer (File Upload)                   │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │           API Routes                      │     │    │
│  │  │                                           │     │    │
│  │  │  /api/auth                                │     │    │
│  │  │  • POST /register                         │     │    │
│  │  │  • POST /login                            │     │    │
│  │  │  • GET  /me                               │     │    │
│  │  │                                           │     │    │
│  │  │  /api/projects                            │     │    │
│  │  │  • GET    /                               │     │    │
│  │  │  • GET    /:id                            │     │    │
│  │  │  • POST   /                               │     │    │
│  │  │  • GET    /:id/download                   │     │    │
│  │  │  • POST   /:id/rate                       │     │    │
│  │  │  • POST   /:id/comment                    │     │    │
│  │  │                                           │     │    │
│  │  │  /api/admin                               │     │    │
│  │  │  • GET    /users                          │     │    │
│  │  │  • DELETE /users/:id                      │     │    │
│  │  │  • GET    /pending-projects               │     │    │
│  │  │  • PUT    /projects/:id/status            │     │    │
│  │  │  • DELETE /projects/:id                   │     │    │
│  │  │  • GET    /stats                          │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│                           │                                 │
│                           ▼                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │              SQLite Database                        │    │
│  │                                                     │    │
│  │  Tables:                                           │    │
│  │  • users                                           │    │
│  │  • projects                                        │    │
│  │  • categories                                      │    │
│  │  • ratings                                         │    │
│  │  • comments                                        │    │
│  │  • download_logs                                   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              File System                            │    │
│  │                                                     │    │
│  │  /uploads/                                         │    │
│  │  • Project files (.zip, .rar, etc.)               │    │
│  │  • Screenshots (.jpg, .png)                       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Registration Flow

```
User → Frontend Form → Validation
                          ↓
                    POST /api/auth/register
                          ↓
                    Backend Validation
                          ↓
                    Hash Password (bcrypt)
                          ↓
                    Insert into DB
                          ↓
                    Generate JWT Token
                          ↓
                    Return Token + User Data
                          ↓
                    Store Token in LocalStorage
                          ↓
                    Redirect to Home
```

### 2. Project Upload Flow

```
User → Upload Form → Select Files
                          ↓
                    Fill Project Details
                          ↓
                    POST /api/projects (multipart/form-data)
                          ↓
                    JWT Authentication Check
                          ↓
                    Multer File Processing
                          ↓
                    Save Files to /uploads/
                          ↓
                    Insert Project to DB (status: pending)
                          ↓
                    Return Success Message
                          ↓
                    Redirect to Dashboard
```

### 3. Project Browse & Download Flow

```
User → Browse Projects Page
         ↓
    GET /api/projects?filters
         ↓
    Database Query with Filters
         ↓
    Return Projects Array
         ↓
    Display in Grid Layout
         ↓
    User Clicks Project Card
         ↓
    GET /api/projects/:id
         ↓
    Increment View Counter
         ↓
    Fetch Comments & Ratings
         ↓
    Display Project Details
         ↓
    User Clicks Download
         ↓
    GET /api/projects/:id/download
         ↓
    Increment Download Counter
         ↓
    Log Download
         ↓
    Stream File to User
```

### 4. Admin Approval Flow

```
Admin → Login → Admin Panel
                    ↓
              GET /api/admin/pending-projects
                    ↓
              Display Pending List
                    ↓
              Admin Clicks Approve
                    ↓
              PUT /api/admin/projects/:id/status
                    ↓
              Update status = 'approved'
                    ↓
              Project Now Visible to Public
```

---

## Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── Router
│       ├── Navbar
│       │   ├── Logo
│       │   ├── Navigation Links
│       │   ├── User Menu
│       │   └── Dark Mode Toggle
│       │
│       ├── Routes
│       │   ├── Home
│       │   │   ├── Hero Section
│       │   │   ├── Search Bar
│       │   │   ├── Stats Section
│       │   │   ├── Categories Grid
│       │   │   ├── Featured Projects
│       │   │   └── CTA Section
│       │   │
│       │   ├── Projects
│       │   │   ├── Filter Bar
│       │   │   └── Project Grid
│       │   │       └── ProjectCard (multiple)
│       │   │
│       │   ├── ProjectDetail
│       │   │   ├── Image/Screenshot
│       │   │   ├── Project Info
│       │   │   ├── Rating System
│       │   │   ├── Download Button
│       │   │   └── Comments Section
│       │   │
│       │   ├── Upload (Protected)
│       │   │   └── Upload Form
│       │   │       ├── Text Inputs
│       │   │       ├── File Upload
│       │   │       └── Submit Button
│       │   │
│       │   ├── Dashboard (Protected)
│       │   │   ├── Stats Cards
│       │   │   └── Projects Table
│       │   │
│       │   ├── AdminPanel (Admin Only)
│       │   │   ├── Stats Dashboard
│       │   │   ├── Tabs
│       │   │   ├── Pending Projects List
│       │   │   └── Users Table
│       │   │
│       │   ├── Login
│       │   │   └── Login Form
│       │   │
│       │   └── Register
│       │       └── Registration Form
│       │
│       └── Footer
│           ├── Links
│           ├── Categories
│           └── Social Icons
│
└── ToastContainer (Notifications)
```

---

## Database Relationships

```
┌─────────────┐
│    users    │
│─────────────│
│ id (PK)     │◄─────┐
│ username    │      │
│ email       │      │
│ password    │      │
│ role        │      │
└─────────────┘      │
                     │
                     │ user_id (FK)
                     │
┌─────────────┐      │
│  projects   │      │
│─────────────│      │
│ id (PK)     │◄─────┤
│ title       │      │
│ description │      │
│ user_id (FK)├──────┘
│ category_id │
│ file_path   │
│ status      │
└─────────────┘
      ▲
      │
      │ project_id (FK)
      │
      ├──────────────────┬──────────────────┐
      │                  │                  │
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   ratings   │   │  comments   │   │download_logs│
│─────────────│   │─────────────│   │─────────────│
│ id (PK)     │   │ id (PK)     │   │ id (PK)     │
│ project_id  │   │ project_id  │   │ project_id  │
│ user_id     │   │ user_id     │   │ user_id     │
│ rating      │   │ comment     │   │ ip_address  │
└─────────────┘   └─────────────┘   └─────────────┘

┌─────────────┐
│ categories  │
│─────────────│
│ id (PK)     │
│ name        │
│ slug        │
│ icon        │
└─────────────┘
      ▲
      │
      │ category_id (FK)
      │
      └──────────────────┘
```

---

## Authentication Flow

```
┌──────────────────────────────────────────────────────┐
│                  Authentication                       │
└──────────────────────────────────────────────────────┘

1. User Login:
   ┌─────────┐
   │  User   │
   └────┬────┘
        │ email + password
        ▼
   ┌─────────┐
   │ Backend │
   └────┬────┘
        │ Verify credentials
        │ Hash comparison
        ▼
   ┌─────────┐
   │   JWT   │ Generate token with:
   │  Token  │ • user id
   └────┬────┘ • username
        │      • email
        │      • role
        ▼
   ┌─────────┐
   │ Client  │ Store in localStorage
   └─────────┘

2. Authenticated Request:
   ┌─────────┐
   │ Client  │
   └────┬────┘
        │ Request + Authorization Header
        │ "Bearer <token>"
        ▼
   ┌─────────┐
   │Middleware│ Verify token
   └────┬────┘ Decode payload
        │
        ├─ Valid ──────► Continue to route
        │
        └─ Invalid ────► 401 Unauthorized
```

---

## File Upload Architecture

```
┌──────────────────────────────────────────────────────┐
│                  File Upload System                   │
└──────────────────────────────────────────────────────┘

Client Side:
┌─────────────┐
│   Browser   │
│             │
│ File Input  │ User selects file
│             │
└──────┬──────┘
       │
       │ FormData object
       │ • file (project zip)
       │ • screenshot (image)
       │ • metadata (title, desc, etc.)
       │
       ▼
┌─────────────┐
│   Axios     │ POST multipart/form-data
└──────┬──────┘
       │
       ▼

Server Side:
┌─────────────┐
│   Multer    │ Parse multipart data
│ Middleware  │
└──────┬──────┘
       │
       ├─ Validate file type
       ├─ Check file size
       ├─ Generate unique filename
       │
       ▼
┌─────────────┐
│ File System │ Save to /uploads/
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Database   │ Store file path
└─────────────┘
```

---

## State Management

```
┌──────────────────────────────────────────────────────┐
│              React State Management                   │
└──────────────────────────────────────────────────────┘

Global State (Context API):
┌─────────────────┐
│  AuthContext    │
│─────────────────│
│ • user          │ Current user object
│ • loading       │ Auth loading state
│ • login()       │ Login function
│ • logout()      │ Logout function
└─────────────────┘

Component State (useState):
┌─────────────────┐
│  Home           │
│─────────────────│
│ • projects      │
│ • categories    │
│ • stats         │
└─────────────────┘

┌─────────────────┐
│  Projects       │
│─────────────────│
│ • projects      │
│ • filters       │
│ • loading       │
└─────────────────┘

┌─────────────────┐
│  Upload         │
│─────────────────│
│ • formData      │
│ • file          │
│ • screenshot    │
│ • loading       │
└─────────────────┘

┌─────────────────┐
│  AdminPanel     │
│─────────────────│
│ • activeTab     │
│ • pending       │
│ • users         │
│ • stats         │
└─────────────────┘
```

---

## API Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt_token_here"
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

### Project Object
```json
{
  "id": 1,
  "title": "E-Commerce Website",
  "description": "Full-stack e-commerce...",
  "category_id": 2,
  "category_name": "PHP",
  "category_icon": "🐘",
  "user_id": 5,
  "author_username": "johndoe",
  "language": "PHP",
  "technology": "Laravel, MySQL",
  "file_path": "1234567890-project.zip",
  "screenshot": "1234567890-screenshot.jpg",
  "demo_url": "https://demo.com",
  "github_url": "https://github.com/user/repo",
  "requirements": "PHP 8.0, MySQL 5.7",
  "status": "approved",
  "downloads": 150,
  "views": 500,
  "avg_rating": 4.5,
  "rating_count": 20,
  "created_at": "2024-01-15T10:30:00Z",
  "comments": [...]
}
```

---

## Security Layers

```
┌──────────────────────────────────────────────────────┐
│                  Security Layers                      │
└──────────────────────────────────────────────────────┘

Layer 1: Frontend Validation
├─ Form validation
├─ File type checking
└─ Size limits

Layer 2: Network Security
├─ HTTPS (in production)
├─ CORS configuration
└─ JWT tokens

Layer 3: Backend Validation
├─ Input sanitization
├─ SQL injection prevention
└─ File type validation

Layer 4: Authentication
├─ JWT verification
├─ Token expiration
└─ Role-based access

Layer 5: Authorization
├─ Protected routes
├─ Admin-only endpoints
└─ User ownership checks

Layer 6: Data Security
├─ Password hashing (bcrypt)
├─ Secure file storage
└─ Database constraints
```

---

This architecture is scalable, maintainable, and production-ready! 🚀
