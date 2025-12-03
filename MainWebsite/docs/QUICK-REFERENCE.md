# 🚀 Quick Reference Guide

## 📂 Folder Structure at a Glance

```
MainWebsite/
├── 📄 HTML Files (Root)
│   ├── index.html          → Main portfolio
│   ├── admin.html          → Admin dashboard
│   └── support.html        → Support page
│
├── 📁 css/                 → All Stylesheets
│   ├── styles.css          → Main styles
│   ├── admin-styles.css    → Admin styles
│   ├── unlock-styles.css   → Unlock system
│   └── secondPortfolio-style.css → Alt portfolio
│
├── 📁 js/                  → All JavaScript
│   ├── script.js           → Main functionality
│   ├── admin-script.js     → Admin logic
│   ├── analytics.js        → Basic analytics
│   ├── enhanced-analytics.js → Advanced analytics
│   ├── portfolio-data-init.js → Data initialization
│   ├── golden-projects-data.js → Golden projects
│   ├── unlock-system.js    → Unlock logic
│   ├── protection.js       → Content protection
│   └── secondPortfolio-main.js → Alt portfolio JS
│
├── 📁 assets/              → Static Assets
│   ├── Allouche_Resume_2026.pdf → Resume
│   ├── LICENSE             → License file
│   └── images/             → All images
│       ├── AbdoLinkden.jpg
│       ├── coding time.jpg
│       ├── linkdenLogo.jpg
│       └── mycv.jpg.jpg
│
├── 📁 docs/                → Documentation
│   ├── PROJECT-STRUCTURE.md → Full structure
│   ├── MIGRATION-GUIDE.md  → Migration info
│   └── QUICK-REFERENCE.md  → This file
│
├── 📁 projects/            → 193 Projects
│   └── [193 project folders]
│
└── 📁 secondPortfolio/     → Alternative Portfolio
    ├── portfolio-cv.html   → Alt portfolio page
    ├── contact.php         → Contact handler
    ├── img/                → Portfolio images
    └── vendor/             → Third-party libs
```

## 🔗 Path Reference

### From Root HTML Files (index.html, admin.html, support.html)

| Resource Type | Path Format | Example |
|--------------|-------------|---------|
| CSS | `css/filename.css` | `css/styles.css` |
| JavaScript | `js/filename.js` | `js/script.js` |
| Images | `assets/images/filename.jpg` | `assets/images/photo.jpg` |
| Documents | `assets/filename.pdf` | `assets/Allouche_Resume_2026.pdf` |
| Projects | `projects/project-name/` | `projects/calculator-app/` |

### From secondPortfolio Folder

| Resource Type | Path Format | Example |
|--------------|-------------|---------|
| CSS | `../css/filename.css` | `../css/secondPortfolio-style.css` |
| JavaScript | `../js/filename.js` | `../js/secondPortfolio-main.js` |
| Images | `../assets/images/filename.jpg` | `../assets/images/photo.jpg` |
| Projects | `../projects/project-name/` | `../projects/calculator-app/` |

## 📝 Common Tasks

### Adding a New CSS File
1. Place file in `css/` folder
2. Link in HTML: `<link rel="stylesheet" href="css/your-file.css">`

### Adding a New JavaScript File
1. Place file in `js/` folder
2. Link in HTML: `<script src="js/your-file.js"></script>`

### Adding a New Image
1. Place file in `assets/images/` folder
2. Reference: `<img src="assets/images/your-image.jpg">`

### Adding a New Document
1. Place file in `assets/` folder
2. Link: `<a href="assets/your-document.pdf">Download</a>`

### Adding Documentation
1. Place file in `docs/` folder
2. Use Markdown format (.md)

## 🎯 Key Files

| File | Purpose | Location |
|------|---------|----------|
| Main Portfolio | Homepage | `index.html` |
| Admin Panel | Content management | `admin.html` |
| Support Page | Donations | `support.html` |
| Main Styles | Portfolio styling | `css/styles.css` |
| Main Script | Portfolio logic | `js/script.js` |
| Analytics | Visitor tracking | `js/analytics.js` |
| Resume | PDF download | `assets/Allouche_Resume_2026.pdf` |

## 🔧 Configuration Files

| What to Configure | File to Edit |
|------------------|--------------|
| Personal Info | `index.html` (hero section) |
| Admin Credentials | `js/admin-script.js` |
| Unlock Codes | Admin dashboard → Settings |
| Styles/Colors | `css/styles.css` |
| Analytics Settings | `js/analytics.js` |
| Project Data | Admin dashboard → Projects |

## 📊 File Counts

- **HTML Files**: 3 (root) + 1 (secondPortfolio)
- **CSS Files**: 4
- **JavaScript Files**: 9
- **Image Files**: 4
- **Document Files**: 2 (PDF + LICENSE)
- **Project Folders**: 193
- **Documentation Files**: 3

## 🌐 URLs to Access

| Page | URL (Local) |
|------|-------------|
| Main Portfolio | `file:///path/to/MainWebsite/index.html` |
| Admin Dashboard | `file:///path/to/MainWebsite/admin.html` |
| Support Page | `file:///path/to/MainWebsite/support.html` |
| Alt Portfolio | `file:///path/to/MainWebsite/secondPortfolio/portfolio-cv.html` |

## 💡 Tips

1. **Always use relative paths** - Makes the site portable
2. **Keep folder structure** - Don't move files randomly
3. **Use admin dashboard** - For content management
4. **Check browser console** - For debugging errors
5. **Test after changes** - Verify everything works
6. **Backup before major changes** - Safety first

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| CSS not loading | Check path: `css/filename.css` |
| JS not working | Check path: `js/filename.js` |
| Image not showing | Check path: `assets/images/filename.jpg` |
| PDF not downloading | Check path: `assets/filename.pdf` |
| Admin won't login | Check credentials in `js/admin-script.js` |

## 📞 Support

**Developer**: Abdel Ali Allouche  
**Email**: abelaliaalouch@gmail.com  
**Phone**: +212 696674648  
**GitHub**: [Abdellox](https://github.com/Abdellox)  
**LinkedIn**: [Abdel Ali](https://www.linkedin.com/in/abdel-a-3795ba161/)

---

**Last Updated**: November 19, 2025  
**Version**: 2.0
