# 🎯 LearnPath AI - Personalized Learning Roadmap Generator

> Your personalized learning journey starts here. Free, open-source, and built to help anyone master any subject.

![LearnPath AI](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Made with Love](https://img.shields.io/badge/made%20with-❤️-red)

## ✨ Features

### 🎨 Beautiful & Modern Design
- **Dark Mode** - Easy on the eyes with automatic theme switching
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Delightful user experience
- **Clean Interface** - Intuitive and easy to navigate

### 📚 Organized Learning Paths
- **Category System** - Browse by Programming, Freelancing, Corporate Jobs, Design, Business, Languages, Creative Arts, and Science
- **21+ Pre-built Roadmaps** - Comprehensive learning paths ready to use
  - **Corporate & Remote Jobs** 🏢: Data Analyst, Project Manager, QA Tester, Customer Support, Business Analyst
  - **Freelancing & Remote Work** 💼: Virtual Assistant, Content Writing, Social Media Management, Video Editing, SEO Specialist, Email Marketing
  - **Programming** 💻: JavaScript, Python, Web Development, React, TypeScript, Data Science, Machine Learning
  - **Design** 🎨: UI/UX Design
  - **Business** 📊: Digital Marketing
  - **Creative** 🎭: Photography
- **AI-Powered Generation** - Enter ANY topic and get a custom roadmap
- **Curated Resources** - Hand-picked tutorials, courses, and documentation

### 📊 Progress Tracking & Personalization
- **Check Off Steps** - Mark completed milestones
- **Visual Progress Bar** - See your learning journey at a glance
- **Personal Notes** 📝 - Add notes to any step for your reference
- **Favorites System** ⭐ - Bookmark your favorite learning paths
- **Local Storage** - All your data is saved automatically
- **Export Roadmap** - Download your learning plan with notes as a text file

### 🚀 Additional Features
- **Share Roadmaps** - Share your learning journey with friends
- **Quick Topics** - One-click access to popular subjects
- **Resource Types** - Organized by Tutorial, Course, Video, Documentation, etc.
- **Duration Estimates** - Know how long each step takes
- **Back Navigation** - Easy return to browse more paths
- **Smart Search** - Find any topic instantly

## 🗂️ Category Organization

Learning paths are organized into parent categories (like a family tree):

### 💻 Programming & Development
- JavaScript, Python, Web Development
- React, TypeScript, Data Science
- Machine Learning, and more...

### 🎨 Design & Creative
- UI/UX Design, Graphic Design
- Figma, Web Design

### 💼 Business & Marketing
- Digital Marketing, SEO
- Entrepreneurship, Project Management

### 🌍 Languages
- English, Spanish, French
- German, Chinese, Japanese

### 🎭 Creative Arts
- Photography, Video Editing
- Music Production, Guitar, Drawing

### 🔬 Science & Math
- Mathematics, Physics
- Statistics, Chemistry

## 🚀 Getting Started

### Option 1: Open Locally
1. Download or clone this repository
2. Open `index.html` in your browser
3. Start learning!

### Option 2: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select main branch as source
4. Your site will be live at `https://yourusername.github.io/learnpath-ai`

## 💡 How to Use

1. **Search or Browse** - Enter any topic or click a category
2. **Get Your Roadmap** - Receive a step-by-step learning path
3. **Track Progress** - Check off completed steps
4. **Add Notes** 📝 - Click the note icon to add personal notes to any step
5. **Favorite Paths** ⭐ - Click the heart to save your favorite roadmaps
6. **Access Resources** - Click on curated learning materials
7. **Export & Share** - Download or share your roadmap with notes

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS Variables for theming
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Progress persistence
- **Web Share API** - Native sharing capabilities

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🎨 Customization

### Adding New Learning Paths

Edit `script.js` and add to the `learningPaths` object:

```javascript
"your-topic": {
    title: "Your Topic Title",
    category: "programming", // or design, business, etc.
    description: "Description of the learning path",
    duration: "3-6 months",
    difficulty: "Beginner to Advanced",
    items: [
        {
            id: 27, // unique ID
            title: "Step Title",
            description: "Step description",
            duration: "2 weeks",
            resources: [
                { name: "Resource Name", url: "https://...", type: "Tutorial" }
            ]
        }
    ]
}
```

### Customizing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #4F46E5;
    --success: #10B981;
    /* ... more variables */
}
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add Learning Paths** - Share your expertise
2. **Improve Resources** - Suggest better learning materials
3. **Fix Bugs** - Report or fix issues
4. **Enhance UI** - Improve design and user experience
5. **Translate** - Help make it multilingual

## 📄 License

MIT License - feel free to use this project for anything!

## 🌟 Acknowledgments

- Made with ❤️ for learners worldwide
- Inspired by the desire to make learning accessible to everyone
- Built to help students and lifelong learners achieve their goals

## 📞 Support

If you find this project helpful:
- ⭐ Star this repository
- 🐛 Report bugs via Issues
- 💡 Suggest features
- 🔄 Share with friends

---

**Happy Learning! 🎓**

*Remember: The journey of a thousand miles begins with a single step.*
