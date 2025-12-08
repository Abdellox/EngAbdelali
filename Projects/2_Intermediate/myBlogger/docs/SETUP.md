# Complete Setup Guide

Step-by-step instructions to get your blog up and running.

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Customization](#customization)
3. [Content Management](#content-management)
4. [Deployment](#deployment)
5. [Integrations](#integrations)

## Quick Start

### Option 1: Local Development

1. **Download the Files**
   ```bash
   # Extract the zip file or clone the repository
   # Navigate to the project folder
   ```

2. **Open in Browser**
   - Double-click `index.html`
   - Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   ```

3. **View Your Site**
   - Open browser to `http://localhost:8000`

### Option 2: Direct Deployment

1. **Choose a Hosting Provider**
   - Netlify (Free, recommended)
   - Vercel (Free)
   - GitHub Pages (Free)
   - Traditional hosting (Bluehost, SiteGround, etc.)

2. **Upload Files**
   - Via FTP/SFTP
   - Through hosting control panel
   - Git deployment

## Customization

### 1. Basic Information

**Update Site Title and Description**

Edit `index.html` and all other HTML files:
```html
<!-- Change this -->
<title>TechLife Blog - Home</title>
<meta name="description" content="Your description here">

<!-- To your information -->
<title>Your Blog Name - Home</title>
<meta name="description" content="Your unique description">
```

**Update Logo**

In all HTML files, find:
```html
<a href="index.html" class="logo">TechLife<span>Blog</span></a>
```

Change to:
```html
<a href="index.html" class="logo">YourBlog<span>Name</span></a>
```

Or use an image logo:
```html
<a href="index.html" class="logo">
  <img src="images/logo.png" alt="Your Blog">
</a>
```

### 2. Colors and Branding

**Edit `css/style.css`:**

```css
:root {
    /* Primary brand color */
    --primary-color: #2563eb;  /* Change to your color */
    --secondary-color: #1e40af; /* Darker shade */
    
    /* Text colors */
    --text-color: #1f2937;
    --text-light: #6b7280;
    
    /* Background colors */
    --bg-color: #ffffff;
    --bg-secondary: #f9fafb;
    
    /* Border and shadows */
    --border-color: #e5e7eb;
    --shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

**Color Scheme Examples:**

**Blue (Default):**
```css
--primary-color: #2563eb;
--secondary-color: #1e40af;
```

**Green:**
```css
--primary-color: #10b981;
--secondary-color: #059669;
```

**Purple:**
```css
--primary-color: #8b5cf6;
--secondary-color: #7c3aed;
```

**Orange:**
```css
--primary-color: #f97316;
--secondary-color: #ea580c;
```

### 3. Typography

**Change Fonts:**

Add to `<head>` in HTML files:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Update in `css/style.css`:
```css
body {
    font-family: 'Inter', sans-serif;
}
```

**Popular Font Combinations:**
- Inter + Inter (Modern, clean)
- Roboto + Roboto (Professional)
- Lato + Lato (Friendly)
- Playfair Display + Source Sans Pro (Elegant)

### 4. Navigation Menu

**Edit Navigation in all HTML files:**

```html
<ul class="nav-menu" id="navMenu">
    <li><a href="index.html">Home</a></li>
    <li><a href="category-tech.html">Tech</a></li>
    <li><a href="category-lifestyle.html">Lifestyle</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
    <!-- Add more items -->
    <li><a href="category-tutorials.html">Tutorials</a></li>
</ul>
```

### 5. Footer Information

**Update Footer in all HTML files:**

```html
<div class="footer-col">
    <h4>About Your Blog</h4>
    <p>Your custom description here</p>
    <div class="social-links">
        <a href="https://facebook.com/yourpage"><i class="fab fa-facebook"></i></a>
        <a href="https://twitter.com/yourhandle"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com/yourhandle"><i class="fab fa-instagram"></i></a>
        <a href="https://linkedin.com/in/yourprofile"><i class="fab fa-linkedin"></i></a>
    </div>
</div>
```

### 6. Images

**Image Specifications:**

- **Featured Images**: 1200x630px (16:9 ratio)
- **Thumbnails**: 400x300px
- **Author Photos**: 200x200px (square)
- **Logo**: 200x50px (or SVG)

**Optimize Images:**
```bash
# Use online tools:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
# - ImageOptim (Mac)

# Or command line:
# ImageMagick
convert input.jpg -quality 85 -resize 1200x630 output.jpg

# WebP format (better compression)
cwebp -q 85 input.jpg -o output.webp
```

**Image Folder Structure:**
```
images/
├── featured-1.jpg
├── featured-2.jpg
├── featured-3.jpg
├── post-1.jpg
├── post-2.jpg
├── thumb-1.jpg
├── thumb-2.jpg
├── author-1.jpg
├── author-2.jpg
└── logo.png
```

## Content Management

### Creating a New Blog Post

1. **Duplicate Template**
   ```bash
   # Copy post-ai-revolution.html
   # Rename to your-post-title.html
   ```

2. **Update Meta Information**
   ```html
   <title>Your Post Title | Your Blog</title>
   <meta name="description" content="Your post description">
   <meta name="keywords" content="keyword1, keyword2, keyword3">
   <meta property="og:title" content="Your Post Title">
   <meta property="og:description" content="Your post description">
   <meta property="og:image" content="images/your-post-image.jpg">
   ```

3. **Update Post Header**
   ```html
   <span class="category-badge">Your Category</span>
   <h1>Your Post Title</h1>
   <div class="author-info">
       <img src="images/your-author.jpg" alt="Author Name">
       <div>
           <strong>Author Name</strong>
           <span>Author Title</span>
       </div>
   </div>
   <span><i class="far fa-calendar"></i> November 21, 2024</span>
   ```

4. **Add Your Content**
   ```html
   <div class="post-body">
       <p class="lead">Your engaging introduction...</p>
       
       <h2>Main Section</h2>
       <p>Your content...</p>
       
       <h3>Subsection</h3>
       <p>More content...</p>
   </div>
   ```

5. **Update Tags**
   ```html
   <div class="post-tags">
       <strong>Tags:</strong>
       <a href="#" class="tag">Tag1</a>
       <a href="#" class="tag">Tag2</a>
       <a href="#" class="tag">Tag3</a>
   </div>
   ```

6. **Add to Homepage**
   
   Edit `index.html` and add your post card:
   ```html
   <article class="post-card">
       <div class="post-image">
           <img src="images/your-post.jpg" alt="Your Post">
           <span class="category-badge">Category</span>
       </div>
       <div class="post-content">
           <div class="post-meta">
               <span><i class="far fa-calendar"></i> Nov 21, 2024</span>
               <span><i class="far fa-user"></i> Author</span>
               <span><i class="far fa-clock"></i> 5 min read</span>
           </div>
           <h3><a href="your-post.html">Your Post Title</a></h3>
           <p>Your post excerpt...</p>
           <a href="your-post.html" class="read-more">Read More</a>
       </div>
   </article>
   ```

### Creating a New Category Page

1. **Duplicate `category-tech.html`**
2. **Rename to `category-yourname.html`**
3. **Update category header:**
   ```html
   <div class="category-header">
       <h1><i class="fas fa-icon"></i> Your Category</h1>
       <p>Category description</p>
   </div>
   ```
4. **Add posts in that category**
5. **Update navigation menu** in all files

### Managing the Slider

**Edit `index.html`:**

```html
<div class="slide">
    <img src="images/your-featured.jpg" alt="Description">
    <div class="slide-content">
        <span class="category-badge">Category</span>
        <h2>Your Featured Post Title</h2>
        <p>Brief description</p>
        <a href="your-post.html" class="btn-primary">Read More</a>
    </div>
</div>
```

**Add/Remove Slides:**
- Add more `<div class="slide">` elements
- JavaScript automatically creates dots
- Slides auto-advance every 5 seconds

## Deployment

### Option 1: Netlify (Recommended)

1. **Create Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up (free)

2. **Deploy**
   - Drag and drop your folder
   - Or connect GitHub repository
   - Site goes live instantly

3. **Custom Domain**
   - Settings → Domain Management
   - Add your domain
   - Update DNS records

4. **HTTPS**
   - Automatically enabled
   - Free SSL certificate

### Option 2: GitHub Pages

1. **Create Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```

2. **Enable Pages**
   - Repository Settings
   - Pages section
   - Select branch (main)
   - Save

3. **Access Site**
   - `https://username.github.io/repo`

### Option 3: Traditional Hosting

1. **Choose Provider**
   - Bluehost
   - SiteGround
   - HostGator
   - DreamHost

2. **Upload via FTP**
   ```
   Host: ftp.yourdomain.com
   Username: your-username
   Password: your-password
   Port: 21
   ```

3. **Upload Files**
   - Use FileZilla or similar
   - Upload to `public_html` or `www`
   - Maintain folder structure

4. **Set Permissions**
   - Files: 644
   - Folders: 755

## Integrations

### Google Analytics

1. **Create Account**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property

2. **Get Tracking Code**
   ```html
   <!-- Add before </head> in all HTML files -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Newsletter Integration

**Mailchimp:**

1. **Create Account** at [mailchimp.com](https://mailchimp.com)
2. **Create Audience**
3. **Get Signup Form Code**
4. **Replace Form Action:**
   ```html
   <form action="https://yourdomain.us1.list-manage.com/subscribe/post?u=xxx&id=xxx" 
         method="post" class="newsletter-form">
       <input type="email" name="EMAIL" placeholder="Your email" required>
       <button type="submit" class="btn-primary">Subscribe</button>
   </form>
   ```

**ConvertKit:**

```html
<script async data-uid="YOUR_FORM_ID" 
        src="https://your-account.ck.page/YOUR_FORM_ID/index.js">
</script>
```

### Contact Form

**Formspree (Free):**

1. **Sign up** at [formspree.io](https://formspree.io)
2. **Create Form**
3. **Update contact.html:**
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
       <input type="text" name="name" required>
       <input type="email" name="email" required>
       <textarea name="message" required></textarea>
       <button type="submit">Send</button>
   </form>
   ```

**Google Forms:**

1. Create form in Google Forms
2. Get embed code
3. Add to contact.html:
   ```html
   <iframe src="YOUR_GOOGLE_FORM_URL" 
           width="100%" height="800"></iframe>
   ```

### Social Sharing

**Update share buttons in post template:**

```html
<a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_POST_URL" 
   target="_blank" class="share-btn facebook">
   <i class="fab fa-facebook-f"></i> Facebook
</a>

<a href="https://twitter.com/intent/tweet?url=YOUR_POST_URL&text=YOUR_POST_TITLE" 
   target="_blank" class="share-btn twitter">
   <i class="fab fa-twitter"></i> Twitter
</a>

<a href="https://www.linkedin.com/sharing/share-offsite/?url=YOUR_POST_URL" 
   target="_blank" class="share-btn linkedin">
   <i class="fab fa-linkedin-in"></i> LinkedIn
</a>
```

### Comment System

**Disqus:**

1. **Sign up** at [disqus.com](https://disqus.com)
2. **Register Site**
3. **Add Code** before `</body>`:
   ```html
   <div id="disqus_thread"></div>
   <script>
       var disqus_config = function () {
           this.page.url = 'YOUR_PAGE_URL';
           this.page.identifier = 'YOUR_PAGE_ID';
       };
       (function() {
           var d = document, s = d.createElement('script');
           s.src = 'https://YOUR_SHORTNAME.disqus.com/embed.js';
           s.setAttribute('data-timestamp', +new Date());
           (d.head || d.body).appendChild(s);
       })();
   </script>
   ```

## Performance Optimization

### 1. Minify Files

**CSS:**
```bash
# Use online tools or:
npm install -g clean-css-cli
cleancss -o style.min.css style.css
```

**JavaScript:**
```bash
npm install -g uglify-js
uglifyjs script.js -o script.min.js
```

### 2. Enable Caching

**Create `.htaccess` (Apache):**
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. Use CDN

**For Font Awesome and other libraries:**
- Already using CDN in templates
- Consider Cloudflare for entire site

## Troubleshooting

### Images Not Loading
- Check file paths are correct
- Ensure images are in `images/` folder
- Verify file extensions match (jpg vs jpeg)

### Styles Not Applying
- Clear browser cache
- Check CSS file path
- Verify CSS syntax

### Mobile Menu Not Working
- Ensure JavaScript file is loaded
- Check browser console for errors
- Verify script.js path is correct

### Forms Not Submitting
- Check form action URL
- Verify method (POST/GET)
- Test with form service

## Maintenance Checklist

### Weekly
- [ ] Publish new content
- [ ] Respond to comments
- [ ] Check analytics
- [ ] Share on social media

### Monthly
- [ ] Review analytics
- [ ] Update old content
- [ ] Check broken links
- [ ] Backup website
- [ ] Monitor site speed

### Quarterly
- [ ] SEO audit
- [ ] Update design elements
- [ ] Review monetization
- [ ] Plan content calendar

## Support Resources

- **HTML/CSS**: [MDN Web Docs](https://developer.mozilla.org)
- **JavaScript**: [JavaScript.info](https://javascript.info)
- **SEO**: [Google Search Central](https://developers.google.com/search)
- **Hosting**: Provider documentation
- **Community**: Web development forums

---

**Need Help?** Review the documentation files in the `docs/` folder for detailed guides on specific topics.
