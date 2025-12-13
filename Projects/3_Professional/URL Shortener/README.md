# 🔗 ShortURL - Modern Link Shortener

A fast, clean, and secure URL shortener with user authentication, custom short codes, and click tracking. Built with vanilla JavaScript, HTML, CSS, and Node.js.

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with password hashing
- ⚡ **Lightning Fast** - Instant URL shortening
- 🎨 **Custom Short Codes** - Create memorable links (e.g., `yoursite.com/promo2024`)
- 📊 **Private Statistics** - Track clicks on your links
- 🔍 **Search & Filter** - Find your links instantly
- 🗑️ **Link Management** - Delete unwanted links
- 💾 **SQLite Database** - No external database setup needed
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔒 **Secure** - Session-based auth with httpOnly cookies

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **Open your browser:**
```
http://localhost:8080
```

5. **Create an account and start shortening URLs!**

## 📖 Usage

### First Time Setup
1. Open `http://localhost:8080`
2. Click "Sign up" to create an account
3. Enter a username (min 3 characters) and password (min 6 characters)
4. You're ready to go!

### Creating Short Links
1. **Basic:** Enter a long URL and click "Shorten URL"
2. **Custom:** Enter a URL + custom code (e.g., "summer2024")
3. **Copy:** Click the copy button to copy your short link
4. **Share:** Use your short link anywhere!

### Managing Links
- **Search:** Use the search box to find specific links
- **Copy:** Click 📋 to copy any link
- **Delete:** Click 🗑️ to remove a link
- **Track:** See click counts for each link

### Statistics
View your personal statistics:
- Total links created
- Total clicks received
- Top performing link

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Backend:** Node.js + Express
- **Database:** SQLite3
- **Authentication:** bcryptjs + express-session
- **Styling:** Custom CSS with gradients and animations

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/check` - Check auth status
- `POST /api/auth/logout` - Logout

### Links
- `POST /api/shorten` - Create short URL (requires auth)
- `GET /api/links` - Get user's links (requires auth)
- `GET /api/stats` - Get user's statistics (requires auth)
- `DELETE /api/delete/:shortCode` - Delete link (requires auth)
- `GET /:shortCode` - Redirect to original URL (public)

## ⚙️ Configuration

Edit `server.js` to customize:

```javascript
const PORT = 8080;  // Change server port
const BASE_URL = 'http://localhost:8080';  // Change to your domain

// Session secret (IMPORTANT: Change in production!)
secret: 'your-secret-key-change-in-production'
```

## 🔒 Security Features

- Passwords hashed with bcrypt (10 rounds)
- Session-based authentication
- httpOnly cookies (prevents XSS)
- CSRF protection ready
- SQL injection prevention (parameterized queries)
- User data isolation (users only see their own links)

## 📁 Project Structure

```
shorturl/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── app.js             # Main app logic
├── auth.js            # Authentication logic
├── server.js          # Express server
├── package.json       # Dependencies
├── README.md          # Documentation
├── .gitignore         # Git ignore rules
└── urls.db            # SQLite database (auto-created)
```

## 🚀 Deployment

### Production Checklist
1. Change session secret in `server.js`
2. Set `cookie.secure: true` for HTTPS
3. Update `BASE_URL` to your domain
4. Set up environment variables
5. Use a process manager (PM2)
6. Set up reverse proxy (nginx)

### Example with PM2
```bash
npm install -g pm2
pm2 start server.js --name shorturl
pm2 save
pm2 startup
```

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 8080 is available
- Run `npm install` to ensure dependencies are installed

**Can't login:**
- Clear browser cookies
- Check if server is running
- Verify database file exists

**Links not working:**
- Ensure BASE_URL matches your domain
- Check database permissions

## 📝 Development

For development with auto-reload:
```bash
npm run dev
```

This requires `nodemon` (included in devDependencies).

## 🤝 Contributing

Feel free to fork, modify, and use this project for your needs!

## 📄 License

MIT License - Feel free to use this project commercially or personally.

## 🎯 Future Enhancements

- QR code generation
- Link expiration dates
- Analytics dashboard
- API rate limiting
- Bulk link creation
- Link categories/tags
- Export data feature

---

Made with ❤️ | Fast & Reliable URL Shortener
