# ✅ CodeShare - Installation & Testing Checklist

Use this checklist to verify your installation is working correctly.

---

## 📦 Installation Checklist

### Backend Setup

- [ ] Node.js 16+ installed
- [ ] Navigated to `backend` directory
- [ ] Ran `npm install` successfully
- [ ] All dependencies installed (7 packages)
- [ ] `.env` file exists with JWT_SECRET
- [ ] Ran `npm start`
- [ ] Server started on port 5000
- [ ] Saw "✅ Connected to SQLite database" message
- [ ] Saw "🚀 Server running on http://localhost:5000" message
- [ ] `codeshare.db` file created in backend directory
- [ ] `uploads` folder created in backend directory

### Frontend Setup

- [ ] Opened NEW terminal window
- [ ] Navigated to `frontend` directory
- [ ] Ran `npm install` successfully
- [ ] All dependencies installed (6 packages)
- [ ] Tailwind CSS configured
- [ ] Ran `npm start`
- [ ] Frontend started on port 3000
- [ ] Browser opened automatically
- [ ] No compilation errors

---

## 🧪 Functionality Testing

### 1. Homepage Tests

- [ ] Homepage loads successfully
- [ ] Navigation bar visible
- [ ] Logo displays "CS" icon
- [ ] Hero section with gradient background visible
- [ ] Search bar present
- [ ] Statistics section shows (Projects, Downloads, Users)
- [ ] Categories grid displays 10 categories with icons
- [ ] Featured projects section visible (may be empty initially)
- [ ] Footer displays with links
- [ ] Dark mode toggle button visible
- [ ] Dark mode toggle works

### 2. Authentication Tests

#### Registration
- [ ] Click "Sign Up" button
- [ ] Registration form loads
- [ ] Fill in username, email, password, confirm password
- [ ] Submit form
- [ ] Success toast notification appears
- [ ] Automatically logged in
- [ ] Redirected to homepage
- [ ] Navigation shows "Upload" and "Dashboard" links
- [ ] Username appears in navigation

#### Login
- [ ] Logout from current session
- [ ] Click "Login" button
- [ ] Login form loads
- [ ] Enter email and password
- [ ] Submit form
- [ ] Success toast notification
- [ ] Redirected to homepage
- [ ] Navigation updated with user menu

#### Admin Login
- [ ] Logout if logged in
- [ ] Click "Login"
- [ ] Enter: admin@codeshare.com
- [ ] Enter: admin123
- [ ] Submit
- [ ] Successfully logged in
- [ ] "Admin" link appears in navigation

### 3. Browse Projects Tests

- [ ] Click "Projects" in navigation
- [ ] Projects page loads
- [ ] Filter bar visible with 3 inputs
- [ ] Search input works
- [ ] Category dropdown populated with 10 categories
- [ ] Language filter input works
- [ ] "No projects found" message (if no projects yet)
- [ ] Filters update URL parameters

### 4. Upload Project Tests

- [ ] Login as regular user (not admin)
- [ ] Click "Upload" in navigation
- [ ] Upload form loads
- [ ] All form fields visible:
  - [ ] Title input
  - [ ] Description textarea
  - [ ] Category dropdown
  - [ ] Language input
  - [ ] Technology input
  - [ ] Requirements textarea
  - [ ] Demo URL input
  - [ ] GitHub URL input
  - [ ] File upload area
  - [ ] Screenshot upload area
- [ ] Fill in all required fields (marked with *)
- [ ] Select a ZIP file (create a test.zip if needed)
- [ ] Optionally upload a screenshot
- [ ] Click "Upload Project"
- [ ] Success toast appears
- [ ] Redirected to dashboard
- [ ] Project appears in dashboard with "pending" status

### 5. Dashboard Tests

- [ ] Click "Dashboard" in navigation
- [ ] Dashboard loads
- [ ] Welcome message with username
- [ ] Statistics cards show:
  - [ ] Total Projects
  - [ ] Total Downloads
  - [ ] Total Views
- [ ] Projects table displays
- [ ] Uploaded project visible in table
- [ ] Status shows "pending"
- [ ] Downloads and views show 0

### 6. Admin Panel Tests

- [ ] Logout and login as admin
- [ ] Click "Admin" in navigation
- [ ] Admin panel loads
- [ ] Statistics dashboard shows:
  - [ ] Total Users
  - [ ] Total Projects
  - [ ] Pending Projects
  - [ ] Total Downloads
- [ ] Two tabs visible: "Pending Projects" and "Users"
- [ ] Pending Projects tab shows uploaded project
- [ ] Project details visible
- [ ] Three action buttons: Approve, Reject, Delete
- [ ] Click "Approve" button
- [ ] Success toast appears
- [ ] Project removed from pending list
- [ ] Switch to "Users" tab
- [ ] Users table displays
- [ ] All registered users visible
- [ ] Admin user cannot be deleted
- [ ] Regular users have delete button

### 7. Project Detail Tests

- [ ] Logout from admin
- [ ] Login as regular user
- [ ] Click "Projects" in navigation
- [ ] Approved project now visible in grid
- [ ] Click on project card
- [ ] Project detail page loads
- [ ] Screenshot/image displays (or gradient placeholder)
- [ ] Category badge visible
- [ ] Star rating system visible
- [ ] Project title displays
- [ ] Author username shows
- [ ] View and download counters visible
- [ ] Description section displays
- [ ] Requirements section displays (if provided)
- [ ] Download button visible
- [ ] Sidebar shows:
  - [ ] Language
  - [ ] Technology
  - [ ] Demo URL (if provided)
  - [ ] GitHub URL (if provided)
  - [ ] Upload date
- [ ] Comments section visible
- [ ] Comment form present (if logged in)

### 8. Rating & Comments Tests

- [ ] On project detail page
- [ ] Click on a star (1-5)
- [ ] Success toast appears
- [ ] Rating updates
- [ ] Scroll to comments section
- [ ] Type a comment
- [ ] Click "Post Comment"
- [ ] Success toast appears
- [ ] Comment appears in list
- [ ] Comment shows username and date

### 9. Download Tests

- [ ] On project detail page
- [ ] Click "Download Project" button
- [ ] File download starts
- [ ] Download counter increments
- [ ] Success toast appears

### 10. Dark Mode Tests

- [ ] Click dark mode toggle (moon icon)
- [ ] Page switches to dark theme
- [ ] All pages support dark mode:
  - [ ] Homepage
  - [ ] Projects
  - [ ] Project Detail
  - [ ] Upload
  - [ ] Dashboard
  - [ ] Admin Panel
  - [ ] Login
  - [ ] Register
- [ ] Toggle back to light mode
- [ ] Theme persists after page refresh

### 11. Responsive Design Tests

- [ ] Open browser DevTools
- [ ] Toggle device toolbar
- [ ] Test mobile view (375px)
  - [ ] Navigation collapses to hamburger menu
  - [ ] All content readable
  - [ ] Forms usable
  - [ ] Cards stack vertically
- [ ] Test tablet view (768px)
  - [ ] Layout adjusts appropriately
  - [ ] 2-column grid for projects
- [ ] Test desktop view (1920px)
  - [ ] Full navigation visible
  - [ ] 3-column grid for projects
  - [ ] Optimal spacing

---

## 🔍 API Testing

### Test Backend Endpoints

#### Health Check
```bash
curl http://localhost:5000/api/health
```
Expected: `{"status":"OK","message":"CodeShare API is running"}`

#### Get Categories
```bash
curl http://localhost:5000/api/projects/categories/all
```
Expected: Array of 10 categories

#### Get Projects
```bash
curl http://localhost:5000/api/projects
```
Expected: Array of approved projects

---

## 🐛 Common Issues & Solutions

### Backend Issues

**Issue:** Port 5000 already in use
- **Solution:** Change PORT in `.env` file or kill process using port 5000

**Issue:** Database error
- **Solution:** Delete `codeshare.db` and restart backend

**Issue:** Module not found
- **Solution:** Run `npm install` in backend directory

### Frontend Issues

**Issue:** Port 3000 already in use
- **Solution:** Terminal will ask to use another port, type 'Y'

**Issue:** Tailwind styles not working
- **Solution:** Restart frontend server

**Issue:** API connection error
- **Solution:** Ensure backend is running on port 5000

### Upload Issues

**Issue:** File upload fails
- **Solution:** Check file size (max 50MB) and type (.zip, .rar, etc.)

**Issue:** Screenshot not displaying
- **Solution:** Ensure image format is .jpg, .jpeg, or .png

---

## ✅ Final Verification

### All Systems Go!

- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] Database created and seeded
- [ ] Admin login works
- [ ] User registration works
- [ ] Project upload works
- [ ] Project approval works
- [ ] Project download works
- [ ] Rating system works
- [ ] Comments work
- [ ] Dark mode works
- [ ] Responsive design works
- [ ] All pages accessible
- [ ] No console errors
- [ ] All features functional

---

## 🎉 Success Criteria

If you've checked all boxes above, congratulations! Your CodeShare platform is:

✅ **Fully Installed**
✅ **Fully Functional**
✅ **Production Ready**

---

## 📊 Test Data Suggestions

### Create Test Projects

1. **E-Commerce Website**
   - Language: PHP
   - Category: PHP
   - Technology: Laravel, MySQL
   - Create a dummy ZIP file

2. **Todo App**
   - Language: JavaScript
   - Category: React
   - Technology: React, Node.js
   - Create a dummy ZIP file

3. **Blog System**
   - Language: Python
   - Category: Django
   - Technology: Django, PostgreSQL
   - Create a dummy ZIP file

### Create Test Users

1. **Regular User 1**
   - Username: john_doe
   - Email: john@example.com
   - Password: password123

2. **Regular User 2**
   - Username: jane_smith
   - Email: jane@example.com
   - Password: password123

3. **Admin** (already exists)
   - Email: admin@codeshare.com
   - Password: admin123

---

## 🔄 Testing Workflow

### Complete User Journey

1. **As Visitor:**
   - Browse homepage
   - View categories
   - Browse projects
   - View project details
   - Try to upload (redirected to login)

2. **As New User:**
   - Register account
   - Upload project
   - View dashboard
   - Check project status (pending)

3. **As Admin:**
   - Login as admin
   - View admin panel
   - Approve pending project
   - View statistics

4. **As User Again:**
   - Login as regular user
   - Browse projects
   - See approved project
   - Download project
   - Rate project
   - Comment on project

---

## 📝 Notes

- Keep both terminal windows open (backend + frontend)
- Check browser console for any errors
- Check terminal for server logs
- Test in different browsers (Chrome, Firefox, Safari)
- Test with different screen sizes

---

**Happy Testing! 🚀**

If all tests pass, your CodeShare platform is ready for deployment!
