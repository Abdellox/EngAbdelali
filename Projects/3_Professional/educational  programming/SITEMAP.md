# 🗺 CodeShare - Complete Sitemap

## Visual Site Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         CODESHARE                                │
│                    www.codeshare.com                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   PUBLIC     │      │  PROTECTED   │      │    ADMIN     │
│   ROUTES     │      │   ROUTES     │      │   ROUTES     │
└──────────────┘      └──────────────┘      └──────────────┘
        │                     │                     │
        │                     │                     │
        ▼                     ▼                     ▼
```

---

## 🌐 Public Routes (No Login Required)

### 1. Homepage `/`

```
┌─────────────────────────────────────────────────────────┐
│                      HOMEPAGE                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         HERO SECTION                            │    │
│  │  • Gradient background                          │    │
│  │  • Main heading & tagline                       │    │
│  │  • CTA buttons (Browse, Upload)                 │    │
│  │  • Search bar                                   │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         STATISTICS SECTION                      │    │
│  │  • Total Projects                               │    │
│  │  • Total Downloads                              │    │
│  │  • Total Users                                  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         CATEGORIES GRID                         │    │
│  │  [Java] [PHP] [Python] [JavaScript] [C#]      │    │
│  │  [Android] [React] [Node.js] [Django] [Laravel]│    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         FEATURED PROJECTS                       │    │
│  │  [Project Card] [Project Card] [Project Card]  │    │
│  │  [Project Card] [Project Card] [Project Card]  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         CTA SECTION                             │    │
│  │  "Ready to Share Your Project?"                │    │
│  │  [Get Started Free]                             │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Links to:**
- Browse Projects → `/projects`
- Upload Project → `/upload` (requires login)
- Category Pages → `/projects?category=java`
- Project Details → `/projects/:id`

---

### 2. Browse Projects `/projects`

```
┌─────────────────────────────────────────────────────────┐
│                   BROWSE PROJECTS                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         FILTER BAR                              │    │
│  │  [Search Input] [Category Dropdown] [Language] │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Results: 24 projects found                             │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         PROJECT GRID                            │    │
│  │                                                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │    │
│  │  │ Project  │  │ Project  │  │ Project  │    │    │
│  │  │  Card 1  │  │  Card 2  │  │  Card 3  │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘    │    │
│  │                                                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │    │
│  │  │ Project  │  │ Project  │  │ Project  │    │    │
│  │  │  Card 4  │  │  Card 5  │  │  Card 6  │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘    │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  [Load More]                                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Query Parameters:**
- `?search=text` - Search query
- `?category=slug` - Filter by category
- `?language=name` - Filter by language
- `?limit=20` - Results per page
- `?offset=0` - Pagination offset

**Links to:**
- Project Details → `/projects/:id`
- Category Filter → `/projects?category=java`

---

### 3. Project Detail `/projects/:id`

```
┌─────────────────────────────────────────────────────────┐
│                   PROJECT DETAIL                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         PROJECT IMAGE/SCREENSHOT                │    │
│  │                                                 │    │
│  │         [Large Project Screenshot]              │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────┐  ┌──────────────────────┐    │
│  │   MAIN CONTENT      │  │    SIDEBAR           │    │
│  │                     │  │                      │    │
│  │  [Category Badge]   │  │  [Download Button]   │    │
│  │  ⭐⭐⭐⭐⭐ (4.5)    │  │                      │    │
│  │                     │  │  Language: Python    │    │
│  │  Project Title      │  │  Technology: Django  │    │
│  │                     │  │                      │    │
│  │  by @username       │  │  [Live Demo Link]    │    │
│  │  👁 500 views       │  │  [GitHub Link]       │    │
│  │  ⬇ 150 downloads    │  │                      │    │
│  │                     │  │  Uploaded: Jan 15    │    │
│  │  Description        │  └──────────────────────┘    │
│  │  Lorem ipsum...     │                              │
│  │                     │                              │
│  │  Requirements       │                              │
│  │  • Python 3.8+      │                              │
│  │  • Django 4.0       │                              │
│  │                     │                              │
│  │  ─────────────────  │                              │
│  │                     │                              │
│  │  COMMENTS (5)       │                              │
│  │                     │                              │
│  │  [Comment Form]     │                              │
│  │                     │                              │
│  │  @user1: Great!     │                              │
│  │  @user2: Thanks!    │                              │
│  │                     │                              │
│  └─────────────────────┘                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Actions:**
- Download project file
- Rate project (1-5 stars)
- Post comment
- View demo
- Visit GitHub repo

---

### 4. Login `/login`

```
┌─────────────────────────────────────────────────────────┐
│                        LOGIN                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│              ┌──────────────────────┐                   │
│              │                      │                   │
│              │   Welcome Back       │                   │
│              │   Sign in to your    │                   │
│              │   account            │                   │
│              │                      │                   │
│              │  📧 Email Address    │                   │
│              │  [input field]       │                   │
│              │                      │                   │
│              │  🔒 Password         │                   │
│              │  [input field]       │                   │
│              │                      │                   │
│              │  [Sign In Button]    │                   │
│              │                      │                   │
│              │  Don't have account? │                   │
│              │  [Sign up]           │                   │
│              │                      │                   │
│              └──────────────────────┘                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Links to:**
- Register → `/register`
- After login → `/` (homepage)

---

### 5. Register `/register`

```
┌─────────────────────────────────────────────────────────┐
│                      REGISTER                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│              ┌──────────────────────┐                   │
│              │                      │                   │
│              │   Create Account     │                   │
│              │   Join our community │                   │
│              │                      │                   │
│              │  👤 Username         │                   │
│              │  [input field]       │                   │
│              │                      │                   │
│              │  📧 Email Address    │                   │
│              │  [input field]       │                   │
│              │                      │                   │
│              │  🔒 Password         │                   │
│              │  [input field]       │                   │
│              │                      │                   │
│              │  🔒 Confirm Password │                   │
│              │  [input field]       │                   │
│              │                      │                   │
│              │  [Create Account]    │                   │
│              │                      │                   │
│              │  Already have one?   │                   │
│              │  [Sign in]           │                   │
│              │                      │                   │
│              └──────────────────────┘                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Links to:**
- Login → `/login`
- After registration → `/` (homepage)

---

## 🔒 Protected Routes (Login Required)

### 6. Upload Project `/upload`

```
┌─────────────────────────────────────────────────────────┐
│                   UPLOAD PROJECT                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         UPLOAD FORM                             │    │
│  │                                                 │    │
│  │  Project Title *                                │    │
│  │  [input field]                                  │    │
│  │                                                 │    │
│  │  Description *                                  │    │
│  │  [textarea]                                     │    │
│  │                                                 │    │
│  │  Category          Language *                   │    │
│  │  [dropdown]        [input]                      │    │
│  │                                                 │    │
│  │  Technology Stack                               │    │
│  │  [input field]                                  │    │
│  │                                                 │    │
│  │  Requirements                                   │    │
│  │  [textarea]                                     │    │
│  │                                                 │    │
│  │  Demo URL          GitHub URL                   │    │
│  │  [input]           [input]                      │    │
│  │                                                 │    │
│  │  Project File * (ZIP, RAR, 7Z)                 │    │
│  │  ┌──────────────────────────────────┐          │    │
│  │  │  📁 Click to upload project file │          │    │
│  │  └──────────────────────────────────┘          │    │
│  │                                                 │    │
│  │  Screenshot (Optional)                          │    │
│  │  ┌──────────────────────────────────┐          │    │
│  │  │  🖼 Click to upload screenshot   │          │    │
│  │  └──────────────────────────────────┘          │    │
│  │                                                 │    │
│  │  [Upload Project Button]                        │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**After Upload:**
- Project status: "pending"
- Redirect to → `/dashboard`
- Awaits admin approval

---

### 7. User Dashboard `/dashboard`

```
┌─────────────────────────────────────────────────────────┐
│                    USER DASHBOARD                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Welcome back, @username!                               │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         STATISTICS                              │    │
│  │                                                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │    │
│  │  │   📁 5   │  │  ⬇ 150   │  │  👁 500  │    │    │
│  │  │ Projects │  │Downloads │  │  Views   │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘    │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         YOUR PROJECTS                           │    │
│  │                                                 │    │
│  │  ┌─────────────────────────────────────────┐  │    │
│  │  │ Title      Status    Downloads  Views   │  │    │
│  │  ├─────────────────────────────────────────┤  │    │
│  │  │ Project 1  Approved     50       200    │  │    │
│  │  │ Project 2  Pending       0         0    │  │    │
│  │  │ Project 3  Approved    100       300    │  │    │
│  │  └─────────────────────────────────────────┘  │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- View personal statistics
- See all uploaded projects
- Track project status
- Monitor downloads & views

---

## 👨‍💼 Admin Routes (Admin Role Required)

### 8. Admin Panel `/admin`

```
┌─────────────────────────────────────────────────────────┐
│                     ADMIN PANEL                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         STATISTICS DASHBOARD                    │    │
│  │                                                 │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────┐│    │
│  │  │ 👥 1200  │ │ 📁 150   │ │ ⏳ 5     │ │5000││    │
│  │  │  Users   │ │ Projects │ │ Pending  │ │DLs ││    │
│  │  └──────────┘ └──────────┘ └──────────┘ └────┘│    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         TABS                                    │    │
│  │  [Pending Projects (5)] [Users (1200)]         │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         PENDING PROJECTS TAB                    │    │
│  │                                                 │    │
│  │  ┌─────────────────────────────────────────┐  │    │
│  │  │ Project Title                            │  │    │
│  │  │ Description...                           │  │    │
│  │  │ By: @user | Language: Python             │  │    │
│  │  │ [✓ Approve] [✗ Reject] [🗑 Delete]      │  │    │
│  │  └─────────────────────────────────────────┘  │    │
│  │                                                 │    │
│  │  ┌─────────────────────────────────────────┐  │    │
│  │  │ Another Project                          │  │    │
│  │  │ Description...                           │  │    │
│  │  │ By: @user2 | Language: Java              │  │    │
│  │  │ [✓ Approve] [✗ Reject] [🗑 Delete]      │  │    │
│  │  └─────────────────────────────────────────┘  │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         USERS TAB                               │    │
│  │                                                 │    │
│  │  ┌─────────────────────────────────────────┐  │    │
│  │  │ Username  Email        Role    Actions  │  │    │
│  │  ├─────────────────────────────────────────┤  │    │
│  │  │ admin     admin@...    Admin   -        │  │    │
│  │  │ john      john@...     User    [Delete] │  │    │
│  │  │ jane      jane@...     User    [Delete] │  │    │
│  │  └─────────────────────────────────────────┘  │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Admin Actions:**
- Approve pending projects
- Reject projects
- Delete projects
- View all users
- Delete users (except admins)
- View platform statistics

---

## 🧭 Navigation Structure

### Main Navigation (All Pages)

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] CodeShare    Projects    [User Menu]    [🌙]   │
└─────────────────────────────────────────────────────────┘

When Logged Out:
  [Logo] CodeShare | Projects | Login | Sign Up | [🌙]

When Logged In (User):
  [Logo] CodeShare | Projects | Upload | Dashboard | Logout | [🌙]

When Logged In (Admin):
  [Logo] CodeShare | Projects | Upload | Dashboard | Admin | Logout | [🌙]
```

### Footer (All Pages)

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  CodeShare          Quick Links      Categories         │
│  Description        • Browse         • Java             │
│                     • Upload         • Python           │
│                     • About          • JavaScript       │
│                     • Contact        • PHP              │
│                                                          │
│  [GitHub] [Twitter] [LinkedIn] [Email]                  │
│                                                          │
│  © 2024 CodeShare. All rights reserved.                 │
│  Privacy Policy | Terms of Service                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 User Flows

### New User Registration Flow

```
1. Visit Homepage
   ↓
2. Click "Sign Up"
   ↓
3. Fill Registration Form
   ↓
4. Submit
   ↓
5. Auto Login (JWT token)
   ↓
6. Redirect to Homepage
   ↓
7. Can now Upload Projects
```

### Project Upload & Approval Flow

```
1. Login Required
   ↓
2. Click "Upload" in Nav
   ↓
3. Fill Upload Form
   ↓
4. Select Files
   ↓
5. Submit
   ↓
6. Project Status: "Pending"
   ↓
7. Redirect to Dashboard
   ↓
8. Admin Reviews in Admin Panel
   ↓
9. Admin Approves
   ↓
10. Project Status: "Approved"
    ↓
11. Project Now Visible to Public
```

### Project Download Flow

```
1. Browse Projects
   ↓
2. Click Project Card
   ↓
3. View Project Details
   ↓
4. Click "Download" Button
   ↓
5. Download Counter +1
   ↓
6. Download Log Created
   ↓
7. File Download Starts
```

---

## 📊 Page Hierarchy

```
Level 1: Homepage (/)
  ├─ Level 2: Browse Projects (/projects)
  │   └─ Level 3: Project Detail (/projects/:id)
  │
  ├─ Level 2: Login (/login)
  │
  ├─ Level 2: Register (/register)
  │
  ├─ Level 2: Upload (Protected) (/upload)
  │
  ├─ Level 2: Dashboard (Protected) (/dashboard)
  │
  └─ Level 2: Admin Panel (Admin Only) (/admin)
```

---

## 🎯 SEO & URL Structure

```
Homepage:           /
Browse All:         /projects
Category Filter:    /projects?category=java
Language Filter:    /projects?language=python
Search:             /projects?search=ecommerce
Combined:           /projects?category=php&search=cms
Project Detail:     /projects/123
Upload:             /upload
Dashboard:          /dashboard
Admin:              /admin
Login:              /login
Register:           /register
```

---

**Total Pages: 8**
- Public: 5
- Protected: 2
- Admin: 1

**Total Routes: 16 API endpoints + 8 frontend routes = 24 total routes**
