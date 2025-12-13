# 🚀 Quick Start Guide

Get your URL shortener running in 3 minutes!

## Step 1: Install Dependencies (1 minute)

Open your terminal in this folder and run:

```bash
npm install
```

This will install:
- express (web server)
- sqlite3 (database)
- bcryptjs (password security)
- express-session (user sessions)
- cors (cross-origin support)

## Step 2: Start the Server (30 seconds)

```bash
npm start
```

You should see:
```
🚀 Server running at http://localhost:8080
📊 Database: urls.db
```

## Step 3: Open in Browser (30 seconds)

Open your browser and go to:
```
http://localhost:8080
```

## Step 4: Create Account (1 minute)

1. Click "Sign up"
2. Enter username (min 3 characters)
3. Enter password (min 6 characters)
4. Click "Sign Up"

## Step 5: Create Your First Short Link! (30 seconds)

1. Paste a long URL (e.g., `https://www.example.com/very/long/url/here`)
2. (Optional) Add a custom code (e.g., `mylink`)
3. Click "Shorten URL"
4. Copy and share your short link!

## 🎉 That's it!

You now have a fully functional URL shortener with:
- ✅ User authentication
- ✅ Custom short codes
- ✅ Click tracking
- ✅ Link management
- ✅ Private statistics

## 💡 Tips

- **Custom codes:** Use memorable codes like `promo2024` or `sale`
- **Search:** Use the search box to find your links quickly
- **Copy:** Click 📋 to copy any link instantly
- **Delete:** Click 🗑️ to remove unwanted links
- **Stats:** Check your dashboard for click statistics

## 🔧 Troubleshooting

**Port 8080 already in use?**
Edit `server.js` and change:
```javascript
const PORT = 8080;  // Change to 3000, 5000, etc.
```

**Need help?**
Check the full README.md for detailed documentation.

---

Happy shortening! 🔗
