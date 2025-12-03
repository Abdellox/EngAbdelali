# 📖 SeriesRead - Read TV Episodes Like Books

A beautifully designed web application for book lovers who want to experience TV series through reading complete episode scripts and dialogues.

## ✨ Design Philosophy

**Clean. Simple. Focused on Reading.**

- 🎨 **Modern Minimalist UI** - No clutter, just content
- 📱 **Mobile-First Design** - Perfect on any device
- 🌓 **Light & Dark Modes** - Comfortable reading anytime
- ⚡ **Smooth Animations** - Delightful interactions
- ♿ **Accessible** - WCAG compliant, keyboard navigation
- 🎯 **User-Focused** - Every feature serves the reader

## 🌟 Key Features

### 📚 Complete Episode Scripts
- Full episode dialogues (40+ minutes worth)
- Proper scene sequences
- Accurate character names
- Professional screenplay format

### 🎨 Beautiful Interface
- Clean, modern design
- Gradient accents (Purple & Pink)
- Smooth transitions
- Card-based layouts
- Floating action buttons

### 🔍 Smart Search
- Real-time results
- Thousands of TV series
- Instant filtering
- No page refresh needed

### 🌓 Theme Switching
- One-click toggle
- Smooth transitions
- Persistent preference
- Optimized colors for both modes

### 📱 Responsive Design
- Mobile-optimized
- Tablet-friendly
- Desktop enhanced
- Touch-friendly interactions

### 🖨️ Print-Ready
- Beautiful print layouts
- Optimized typography
- Page break management
- Perfect for offline reading

## 🚀 Quick Start

```bash
cd movies-conversation
npm install
npm start
```

Open http://localhost:3000

## 🎯 How to Use

1. **Browse** - Explore popular series on homepage
2. **Search** - Type any series name in the search bar
3. **Select** - Click a series to see all episodes
4. **Read** - Click "📖 Read Script" to enjoy complete dialogues
5. **Toggle** - Switch between Light/Dark mode anytime
6. **Print** - Save scripts for offline reading

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1)
- **Accent**: Pink (#ec4899)
- **Text Dark**: Gray-900 (#1f2937)
- **Text Light**: Gray-500 (#6b7280)
- **Background**: White/Gray-900

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 700-800 weight
- **Body**: 400-500 weight
- **Script**: Georgia (serif)

### Spacing
- **Base**: 1rem (16px)
- **Scale**: 0.5rem increments
- **Max Width**: 1400px

### Borders
- **Radius**: 12-20px (rounded)
- **Width**: 1-2px
- **Style**: Solid

## 📊 Getting Real Scripts

### Option 1: OpenSubtitles API (Recommended)

1. Get free API key: https://www.opensubtitles.com/en/consumers
2. Add to `.env`:
   ```
   REACT_APP_OPENSUBTITLES_API_KEY=your_key_here
   ```
3. Restart app - scripts load automatically!

### Why OpenSubtitles?
- ✅ Complete episode dialogues
- ✅ Accurate timelines (40+ min)
- ✅ Legal to use
- ✅ Free tier available
- ✅ Already integrated in code

See `SCRIPTS_GUIDE.md` for detailed instructions.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TMDB API** - Series data
- **OpenSubtitles API** - Episode scripts
- **CSS3** - Modern styling
- **Google Fonts** - Typography

## 📱 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ Tablet browsers

## ♿ Accessibility

- Keyboard navigation
- Screen reader friendly
- ARIA labels
- Focus indicators
- High contrast support
- Reduced motion support

## 🎯 Perfect For

- 📚 Book lovers who prefer reading
- ✍️ Writers studying dialogue
- 🎭 Actors preparing scripts
- 🎓 Students analyzing narratives
- 🌍 Language learners
- ♿ Accessibility needs

## 📂 Project Structure

```
movies-conversation/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Clean header with theme toggle
│   │   ├── SearchBar.jsx   # Real-time search
│   │   ├── SeriesCard.jsx  # Series grid cards
│   │   ├── EpisodeList.jsx # Episode browser
│   │   └── EpisodeView.jsx # Script reader
│   ├── services/
│   │   ├── tmdbApi.js      # TMDB integration
│   │   └── subtitlesApi.js # Script fetching
│   ├── App.jsx             # Main app
│   ├── App.css             # Modern styles
│   └── index.js            # Entry point
├── .env                    # API keys
├── package.json            # Dependencies
└── README.md              # This file
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #6366f1;    /* Your color */
  --accent: #ec4899;     /* Your color */
}
```

### Change Fonts
Update in `public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

### Modify Layout
All components in `src/components/` are modular and easy to customize.

## 📈 Performance

- ⚡ Fast initial load
- 🔄 Lazy loading scripts
- 💾 Smart caching
- 📦 Code splitting
- 🖼️ Image optimization

## 🔒 Privacy

- No user tracking
- No cookies
- No data collection
- API calls only for content
- Local storage for preferences

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions welcome! Areas to improve:
- Additional script sources
- UI/UX enhancements
- Performance optimizations
- Accessibility improvements
- Mobile experience

## 📞 Support

- Check `SCRIPTS_GUIDE.md` for script integration
- Check `FEATURES.md` for feature details
- Check `QUICK_START.md` for getting started

## 🎉 Enjoy Reading!

This app is designed with love for readers who want to experience TV series in a new way. Happy reading! 📚✨

---

**Made with ❤️ for book lovers and TV enthusiasts**
