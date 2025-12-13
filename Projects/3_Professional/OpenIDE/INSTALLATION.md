# 📦 Installation & Deployment Guide

## 🚀 Quick Start (30 seconds)

### Option 1: Direct Browser Open
1. Download all files to a folder
2. Double-click `index.html`
3. Start coding! ✨

### Option 2: Local Web Server
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## 📥 Download Options

### Option 1: Direct Download
1. Download all files from repository
2. Keep the folder structure intact
3. Open `index.html` in browser

### Option 2: Git Clone
```bash
git clone [repository-url]
cd codeflow-ide
# Open index.html in browser
```

### Option 3: Download ZIP
1. Download ZIP from repository
2. Extract to desired location
3. Open `index.html` in browser

## 📁 Required Files

### Essential Files (Must Have)
```
CodeFlow-IDE/
├── index.html          ✅ Required - Main HTML file
├── styles.css          ✅ Required - All styles
├── app.js              ✅ Required - Core functionality
├── snippets.js         ✅ Required - Code snippets
└── features.js         ✅ Required - Advanced features
```

### Documentation Files (Optional)
```
├── README.md           📖 Recommended - Main docs
├── QUICKSTART.md       📖 Recommended - Quick guide
├── FEATURES.md         📖 Optional - Feature list
├── CHANGELOG.md        📖 Optional - Version history
├── PROJECT_OVERVIEW.md 📖 Optional - Project info
├── INSTALLATION.md     📖 Optional - This file
└── LOGO.txt            🎨 Optional - ASCII art
```

## 🌐 Deployment Options

### 1. GitHub Pages (Free)

**Step 1: Create Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [your-repo-url]
git push -u origin main
```

**Step 2: Enable GitHub Pages**
1. Go to repository Settings
2. Navigate to Pages section
3. Select "main" branch
4. Click Save
5. Your IDE will be live at: `https://[username].github.io/[repo-name]`

### 2. Netlify (Free)

**Option A: Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Drag your folder to the deploy area
3. Done! Get instant URL

**Option B: Git Integration**
1. Connect your GitHub repository
2. Set build command: (none needed)
3. Set publish directory: `/`
4. Deploy!

**Custom Domain:**
```
# Add custom domain in Netlify settings
yourdomain.com → Your IDE
```

### 3. Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd codeflow-ide
vercel

# Follow prompts
# Get instant URL
```

### 4. Cloudflare Pages (Free)

1. Go to Cloudflare Pages
2. Connect Git repository
3. Build settings:
   - Build command: (none)
   - Build output: `/`
4. Deploy!

### 5. Firebase Hosting (Free)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### 6. AWS S3 + CloudFront (Paid)

```bash
# Create S3 bucket
aws s3 mb s3://codeflow-ide

# Upload files
aws s3 sync . s3://codeflow-ide --acl public-read

# Enable static website hosting
aws s3 website s3://codeflow-ide --index-document index.html

# Optional: Add CloudFront for CDN
```

### 7. Self-Hosted Server

**Apache (.htaccess)**
```apache
# Enable CORS if needed
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

**Nginx (nginx.conf)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/codeflow-ide;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable compression
    gzip on;
    gzip_types text/css application/javascript;
}
```

## 🔧 Configuration

### No Configuration Needed!
CodeFlow IDE works out of the box with zero configuration.

### Optional Customizations

**1. Change CDN Source (app.js)**
```javascript
// If Monaco CDN is slow in your region, change to:
require.config({ 
    paths: { 
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
        // or
        vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs'
    } 
});
```

**2. Add Custom Snippets (snippets.js)**
```javascript
// Add your own language snippets
const languageSnippets = {
    yourlanguage: {
        snippets: [
            {
                label: 'yoursnippet',
                insertText: 'your code here',
                documentation: 'Description'
            }
        ]
    }
};
```

**3. Customize Theme (styles.css)**
```css
/* Change primary gradient */
.btn-primary {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

## 🔒 Security Considerations

### For Public Deployment

**1. Content Security Policy (Optional)**
Add to `index.html` `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self' https://cdnjs.cloudflare.com; 
               script-src 'self' 'unsafe-eval' https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline';">
```

**2. HTTPS**
- Always use HTTPS in production
- Most free hosts provide SSL automatically
- For custom domains, use Let's Encrypt

**3. Rate Limiting**
- Not needed (static site)
- No backend to protect

## 📊 Performance Optimization

### 1. Enable Compression

**Gzip (Server-side)**
```
# Most hosts enable this automatically
# Reduces file size by ~70%
```

**Brotli (Better compression)**
```
# Available on Cloudflare, Netlify, Vercel
# Even better compression than gzip
```

### 2. CDN Configuration

**Use CDN for Monaco Editor**
```javascript
// Already configured to use CDN
// Monaco loads from Cloudflare CDN
// Cached globally for fast loading
```

### 3. Browser Caching

**Add to server config:**
```
# Cache static assets for 1 year
Cache-Control: public, max-age=31536000
```

### 4. Minification (Optional)

**CSS Minification:**
```bash
# Using cssnano
npx cssnano styles.css styles.min.css
```

**JS Minification:**
```bash
# Using terser
npx terser app.js -o app.min.js
npx terser features.js -o features.min.js
npx terser snippets.js -o snippets.min.js
```

Then update `index.html` to use `.min.js` files.

## 🧪 Testing

### Browser Testing

**Test in all major browsers:**
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Test features:**
1. Open index.html
2. Try autocomplete (Ctrl+Space)
3. Run JavaScript code (Ctrl+Enter)
4. Create new file (Ctrl+N)
5. Change theme
6. Upload file
7. Download file
8. Open command palette (Ctrl+P)
9. Right-click context menu
10. Check settings panel

### Mobile Testing

**Responsive Design:**
- Works on tablets (iPad, Android tablets)
- Limited on phones (small screen)
- Best experience on desktop/laptop

## 🐛 Troubleshooting

### Issue: Monaco Editor not loading

**Solution 1: Check CDN**
```javascript
// Try alternative CDN in app.js
require.config({ 
    paths: { 
        vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs'
    } 
});
```

**Solution 2: Check Console**
- Open browser DevTools (F12)
- Check Console for errors
- Look for network errors

### Issue: Autocomplete not working

**Solution:**
- Press Ctrl+Space to trigger manually
- Check if correct language is selected
- Verify snippets.js is loaded

### Issue: Files not saving

**Solution:**
- Check if LocalStorage is enabled
- Check browser privacy settings
- Try different browser

### Issue: Slow performance

**Solution:**
- Clear browser cache
- Close other tabs
- Check internet connection (for CDN)
- Try different browser

## 📱 Mobile Deployment

### Progressive Web App (PWA)

**Add manifest.json:**
```json
{
  "name": "CodeFlow IDE",
  "short_name": "CodeFlow",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e1e1e",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

**Add to index.html:**
```html
<link rel="manifest" href="manifest.json">
```

## 🔄 Updates

### Updating Your Deployment

**GitHub Pages:**
```bash
git pull origin main
git add .
git commit -m "Update"
git push
# Auto-deploys
```

**Netlify/Vercel:**
```bash
git push
# Auto-deploys on push
```

**Manual:**
1. Download new files
2. Replace old files
3. Clear browser cache
4. Refresh page

## 📈 Analytics (Optional)

### Google Analytics

**Add to index.html before `</head>`:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ✅ Deployment Checklist

- [ ] All files downloaded
- [ ] index.html opens in browser
- [ ] Monaco Editor loads
- [ ] Autocomplete works
- [ ] Code execution works
- [ ] File upload/download works
- [ ] All themes work
- [ ] Command palette works (Ctrl+P)
- [ ] Settings panel works
- [ ] Tested in multiple browsers
- [ ] HTTPS enabled (if public)
- [ ] Custom domain configured (if needed)
- [ ] Analytics added (if wanted)

## 🎉 Success!

Your CodeFlow IDE is now deployed and ready to use!

**Share your deployment:**
- Share URL with friends
- Add to portfolio
- Use for teaching
- Embed in websites

---

**Need Help?**
- Check README.md
- Review QUICKSTART.md
- Open an issue on GitHub

**Happy Coding! 🚀**
