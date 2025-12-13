# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1️⃣ Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

This will install:
- express
- cors
- bcryptjs
- jsonwebtoken
- multer
- sqlite3
- dotenv

### 2️⃣ Start Backend Server

```bash
npm start
```

You should see:
```
✅ Connected to SQLite database
🚀 Server running on http://localhost:5000
```

The database will be automatically created with:
- Default admin user (admin@codeshare.com / admin123)
- 10 pre-populated categories (Java, PHP, Python, etc.)

### 3️⃣ Install Frontend Dependencies

Open a NEW terminal window and run:

```bash
cd frontend
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-icons
- react-toastify
- tailwindcss

### 4️⃣ Start Frontend Development Server

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

---

## ✅ Verify Installation

### Test Backend API

Open your browser and visit:
- http://localhost:5000/api/health

You should see:
```json
{
  "status": "OK",
  "message": "CodeShare API is running"
}
```

### Test Frontend

The homepage should load with:
- Navigation bar
- Hero section with search
- Category grid
- Featured projects section
- Footer

---

## 🎯 First Steps

### 1. Login as Admin

1. Click "Login" in the navigation
2. Use credentials:
   - Email: `admin@codeshare.com`
   - Password: `admin123`
3. You'll be redirected to the homepage

### 2. Access Admin Panel

1. Click "Admin" in the navigation (only visible to admin users)
2. View statistics dashboard
3. Check pending projects tab
4. Manage users

### 3. Create a Regular User Account

1. Logout from admin account
2. Click "Sign Up"
3. Fill in the registration form
4. Login with your new account

### 4. Upload a Project

1. Login as a regular user
2. Click "Upload" in navigation
3. Fill in project details:
   - Title
   - Description
   - Category
   - Language
   - Upload a ZIP file
   - (Optional) Upload screenshot
4. Submit
5. Project will be in "pending" status

### 5. Approve Project (as Admin)

1. Login as admin
2. Go to Admin Panel
3. Click "Pending Projects" tab
4. Approve the uploaded project
5. Project will now appear in public listings

---

## 🐛 Troubleshooting

### Backend won't start

**Error: "Cannot find module 'express'"**
- Solution: Run `npm install` in backend directory

**Error: "Port 5000 already in use"**
- Solution: Change PORT in `.env` file or kill process using port 5000

### Frontend won't start

**Error: "Cannot find module 'react'"**
- Solution: Run `npm install` in frontend directory

**Error: "Port 3000 already in use"**
- Solution: The terminal will ask if you want to use another port, type 'Y'

### Database issues

**Error: "SQLITE_ERROR: no such table"**
- Solution: Delete `codeshare.db` file and restart backend (it will recreate)

### File upload issues

**Error: "File too large"**
- Solution: Files must be under 50MB

**Error: "Invalid file type"**
- Solution: Only .zip, .rar, .7z, .tar, .gz files are allowed

---

## 📁 Project Structure

```
codeshare/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── admin.js
│   ├── uploads/          (created automatically)
│   ├── database.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── codeshare.db      (created automatically)
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProjectCard.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Projects.js
│   │   │   ├── ProjectDetail.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Upload.js
│   │   │   ├── Dashboard.js
│   │   │   └── AdminPanel.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── README.md
├── DOCUMENTATION.md
├── SETUP.md
└── .gitignore
```

---

## 🎨 Customization

### Change Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Change this
    600: '#0284c7',  // And this
  }
}
```

### Add More Categories

Edit `backend/database.js` in the `seedData()` function:
```javascript
const categories = [
  ['Your Category', 'your-slug', '🎯'],
  // Add more...
];
```

### Change Upload Limits

Edit `backend/routes/projects.js`:
```javascript
limits: { fileSize: 50 * 1024 * 1024 }, // Change 50 to your desired MB
```

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure both backend and frontend are running
4. Check that ports 5000 and 3000 are available

---

**Happy Coding! 🎉**
