# 🧪 Testing Checklist

Use this checklist to verify everything works correctly.

## ✅ Server Tests

- [ ] Server starts without errors (`npm start`)
- [ ] Can access http://localhost:8080
- [ ] Database file `urls.db` is created automatically
- [ ] No console errors in terminal

## ✅ Authentication Tests

### Sign Up
- [ ] Can create new account with valid credentials
- [ ] Shows error for username < 3 characters
- [ ] Shows error for password < 6 characters
- [ ] Shows error for duplicate username
- [ ] Redirects to dashboard after signup

### Login
- [ ] Can login with correct credentials
- [ ] Shows error for wrong password
- [ ] Shows error for non-existent username
- [ ] Session persists after page refresh
- [ ] Can switch between login/signup forms

### Logout
- [ ] Logout button works
- [ ] Redirects to login screen
- [ ] Session is cleared
- [ ] Can't access dashboard after logout

## ✅ URL Shortening Tests

### Basic Shortening
- [ ] Can shorten a valid URL
- [ ] Shows error for invalid URL
- [ ] Shows error for empty URL
- [ ] Generated short code is 6 characters
- [ ] Short URL is displayed correctly
- [ ] Can copy short URL to clipboard

### Custom Codes
- [ ] Can create link with custom code
- [ ] Shows error for duplicate custom code
- [ ] Shows error for invalid characters in custom code
- [ ] Custom code appears in short URL

### URL Validation
- [ ] Accepts http:// URLs
- [ ] Accepts https:// URLs
- [ ] Rejects URLs without protocol
- [ ] Rejects invalid URLs

## ✅ Link Management Tests

### Display
- [ ] Links appear in "Your Recent Links" section
- [ ] Shows correct original URL
- [ ] Shows correct short URL
- [ ] Shows click count (starts at 0)
- [ ] Shows creation time (e.g., "Just now", "2m ago")
- [ ] Shows empty state when no links

### Search
- [ ] Can search by original URL
- [ ] Can search by short URL
- [ ] Search is case-insensitive
- [ ] Shows "No links found" for no matches

### Copy
- [ ] Copy button (📋) copies link to clipboard
- [ ] Shows success message after copy
- [ ] Works for all links in list

### Delete
- [ ] Delete button (🗑️) shows confirmation
- [ ] Link is removed after confirmation
- [ ] Link stays if cancelled
- [ ] Statistics update after delete
- [ ] Shows success message

## ✅ Statistics Tests

- [ ] Shows correct total links count
- [ ] Shows correct total clicks count
- [ ] Shows top link clicks
- [ ] Shows "-" when no links exist
- [ ] Updates after creating new link
- [ ] Updates after deleting link

## ✅ Redirect Tests

### Short URL Redirect
- [ ] Visiting short URL redirects to original URL
- [ ] Click count increments after redirect
- [ ] Works for custom codes
- [ ] Works for generated codes
- [ ] Shows 404 for non-existent codes

### Click Tracking
- [ ] Click count starts at 0
- [ ] Increments by 1 per visit
- [ ] Updates in real-time (after refresh)
- [ ] Tracks clicks from different browsers

## ✅ Security Tests

### Authentication
- [ ] Can't access /api/links without login
- [ ] Can't access /api/stats without login
- [ ] Can't delete others' links
- [ ] Session expires after 7 days
- [ ] Password is not visible in database

### Data Isolation
- [ ] User A can't see User B's links
- [ ] User A can't delete User B's links
- [ ] Statistics show only own data
- [ ] Search only searches own links

## ✅ UI/UX Tests

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] All buttons are clickable
- [ ] Text is readable on all devices

### Animations
- [ ] Links slide in when loaded
- [ ] Hover effects work on buttons
- [ ] Modal appears smoothly
- [ ] Transitions are smooth

### User Feedback
- [ ] Shows loading state when shortening
- [ ] Shows error messages clearly
- [ ] Shows success messages
- [ ] Buttons disable during operations
- [ ] Form clears after success

## ✅ Edge Cases

- [ ] Can handle very long URLs (1000+ chars)
- [ ] Can handle special characters in URLs
- [ ] Can handle rapid clicking
- [ ] Can handle network errors gracefully
- [ ] Can handle session expiration
- [ ] Can handle duplicate URL submissions
- [ ] Can handle 50+ links in list

## 🐛 Known Issues

Document any issues you find here:

1. 
2. 
3. 

## 📝 Test Results

**Date:** ___________
**Tester:** ___________
**Pass Rate:** _____ / 80 tests

**Overall Status:** ⬜ PASS  ⬜ FAIL

---

**Notes:**
