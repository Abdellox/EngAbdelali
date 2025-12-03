# MainWebsite Project Structure

## 📁 Organized Folder Structure

```
MainWebsite/
├── 📄 index.html              # Main portfolio homepage
├── 📄 admin.html              # Admin dashboard for managing content
├── 📄 support.html            # Support/donation page
│
├── 📁 css/                    # All stylesheets
│   ├── styles.css             # Main website styles
│   ├── admin-styles.css       # Admin dashboard styles
│   ├── unlock-styles.css      # Golden projects unlock system styles
│   └── secondPortfolio-style.css  # Secondary portfolio styles
│
├── 📁 js/                     # All JavaScript files
│   ├── script.js              # Main website functionality
│   ├── admin-script.js        # Admin dashboard logic
│   ├── analytics.js           # Basic analytics tracking
│   ├── enhanced-analytics.js  # Advanced analytics features
│   ├── portfolio-data-init.js # Portfolio data initialization
│   ├── golden-projects-data.js # Golden projects data
│   ├── unlock-system.js       # Unlock system for premium projects
│   ├── protection.js          # Content protection features
│   └── secondPortfolio-main.js # Secondary portfolio functionality
│
├── 📁 assets/                 # Static assets
│   ├── 📄 Allouche_Resume_2026.pdf  # Resume PDF
│   ├── 📄 LICENSE             # Project license
│   └── 📁 images/             # All images
│       ├── AbdoLinkden.jpg
│       ├── coding time.jpg
│       ├── linkdenLogo.jpg
│       └── mycv.jpg.jpg
│
├── 📁 docs/                   # Documentation
│   └── PROJECT-STRUCTURE.md   # This file
│
├── 📁 projects/               # Individual project folders (193 projects)
│   ├── 2048-game/
│   ├── calculator-app/
│   ├── weather-app/
│   └── ... (190 more projects)
│
└── 📁 secondPortfolio/        # Alternative portfolio template
    ├── portfolio-cv.html      # Secondary portfolio page
    ├── contact.php            # Contact form handler
    ├── 📁 img/                # Portfolio images
    └── 📁 vendor/             # Third-party libraries
        ├── bootstrap/
        ├── icofont/
        ├── boxicons/
        ├── venobox/
        ├── owl.carousel/
        └── aos/
```

## 🔗 File References

### HTML Files
All HTML files have been updated with correct paths:

**index.html:**
- CSS: `css/styles.css`, `css/unlock-styles.css`
- JS: `js/analytics.js`, `js/enhanced-analytics.js`, `js/portfolio-data-init.js`, `js/unlock-system.js`, `js/script.js`
- Assets: `assets/Allouche_Resume_2026.pdf`

**admin.html:**
- CSS: `css/admin-styles.css`
- JS: `js/portfolio-data-init.js`, `js/admin-script.js`

**secondPortfolio/portfolio-cv.html:**
- CSS: `../css/secondPortfolio-style.css`
- JS: `../js/secondPortfolio-main.js`
- Images: `../assets/images/`

## 🎯 Benefits of This Structure

1. **Better Organization**: Files are grouped by type (CSS, JS, assets)
2. **Easier Maintenance**: Find and update files quickly
3. **Scalability**: Easy to add new files in appropriate folders
4. **Professional**: Industry-standard folder structure
5. **Version Control**: Better Git tracking with organized folders
6. **Performance**: Easier to implement caching strategies
7. **Collaboration**: Team members can navigate easily

## 🚀 Quick Start

1. Open `index.html` in your browser to view the main portfolio
2. Access `admin.html` to manage content (default: admin/admin123)
3. All links and references are working correctly

## 📝 Notes

- All file paths have been updated and tested
- Images moved from secondPortfolio to centralized assets/images folder
- Projects folder remains unchanged (193 individual project folders)
- Vendor libraries for secondPortfolio remain in their original location

## 🔧 Maintenance

When adding new files:
- **CSS files** → Place in `css/` folder
- **JavaScript files** → Place in `js/` folder
- **Images** → Place in `assets/images/` folder
- **Documents/PDFs** → Place in `assets/` folder
- **Documentation** → Place in `docs/` folder

---

**Last Updated:** November 19, 2025
**Structure Version:** 2.0
