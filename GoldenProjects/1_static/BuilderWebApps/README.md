# 🎨 Website Cloner

Clone any website's frontend and automatically customize it with your personal information. Perfect for creating your own version of templates, portfolios, or landing pages!

## Features

- **Clone Any Website**: Enter any URL and clone its HTML structure
- **Auto-Replace Personal Info**: Automatically replaces:
  - Email addresses
  - Phone numbers
  - Names/Company names
  - Descriptions
  - Addresses
- **Flexible Options**:
  - Download images or use placeholders
  - Clone CSS styles
  - Include JavaScript (optional)
  - Download fonts
- **Download as ZIP**: Get all files ready to deploy
- **Modern UI**: Beautiful, responsive interface

## How It Works

1. Enter the URL of any website you want to clone
2. Fill in your personal information (name, email, phone, etc.)
3. Select what to include (images, styles, scripts)
4. Click "Clone & Customize Website"
5. Preview the result
6. Download as ZIP file

## Installation

1. Install Node.js (v14 or higher)

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser:
```
http://localhost:3000
```

## Usage Example

**Clone a portfolio website:**
1. URL: `https://example-portfolio.com`
2. Your Name: `John Doe`
3. Your Email: `john@example.com`
4. Your Phone: `+1 234 567 8900`
5. Description: `Full-stack developer specializing in React and Node.js`
6. Select options and generate!

The tool will:
- Clone the entire HTML structure
- Replace all email addresses with yours
- Replace phone numbers with yours
- Update the title and meta tags
- Fix image and CSS links
- Package everything as a ZIP

## What You Get

The downloaded ZIP contains:
- `index.html` - Cloned HTML with your info
- `style.css` - Extracted CSS styles
- `script.js` - JavaScript (if enabled)
- `README.md` - Deployment instructions

## Deployment

Deploy your cloned website to:
- **GitHub Pages**: Free and easy
- **Netlify**: Drag and drop
- **Vercel**: One-click deploy
- **Cloudflare Pages**: Fast CDN

## Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Modern gradient UI
- Responsive design

**Backend:**
- Node.js + Express
- Axios (HTTP requests)
- Cheerio (HTML parsing)
- Archiver (ZIP creation)

## Use Cases

- Create your portfolio from a template
- Clone landing pages for your business
- Customize open-source website templates
- Learn from existing websites
- Quick prototyping

## Important Notes

- Only clone websites you have permission to use
- Respect copyright and licensing
- Some websites may block scraping
- Complex JavaScript apps may not work perfectly
- Always customize the cloned content

## Requirements

- Node.js 14+
- npm or yarn
- Internet connection

## License

MIT License - Use responsibly and ethically!

## Disclaimer

This tool is for educational and personal use. Always respect website copyrights and terms of service. Only clone websites you have permission to use or that are open source.
