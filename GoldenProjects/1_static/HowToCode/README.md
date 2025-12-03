# Code Academy - Learn Programming from Zero to Hero

A free, open-source learning platform designed to help anyone learn programming from scratch. Start with C++ (the mother of languages) and expand to any market-demanded language!

## 🌟 Features

- **12 Market-Demanded Languages**: C++, Python, JavaScript, Java, C#, Go, Rust, PHP, Swift, Kotlin, TypeScript, R
- **5-Level Learning System**: Beginner → Intermediate → Advanced → Expert → Professional
- **Hardware & Software Basics**: Understand the fundamentals before diving into code
- **Interactive Code Examples**: Real code snippets with detailed explanations
- **Progress Tracking**: Your learning progress is saved locally
- **Responsive Design**: Works on desktop, tablet, and mobile
- **100% Free & Open Source**: No paywalls, no subscriptions

## 📚 5-Level Learning System

Every course follows a proven 5-level structure:

### 1️⃣ Beginner Level (Foundation)
- What programming is
- Installing tools and IDE
- Basic syntax (variables, data types)
- Input & output
- Conditions and loops
- Basic functions and arrays
- **Goal**: Write simple programs independently

### 2️⃣ Intermediate Level (Core Skills)
- Intermediate data structures
- File handling
- Error handling
- Object-Oriented Programming
- Modular programming
- Using external libraries
- **Goal**: Build medium-sized programs with proper structure

### 3️⃣ Advanced Level (Deep Concepts)
- Advanced data structures (trees, graphs)
- Algorithms (dynamic programming, optimization)
- Memory management
- Multithreading/concurrency
- Networking basics
- Design patterns
- **Goal**: Build efficient, scalable software

### 4️⃣ Expert Level (Specialization)
Choose your path:
- **Web Development**: Frontend, backend, full-stack
- **Mobile Development**: iOS, Android, cross-platform
- **Data Science/AI**: Machine learning, deep learning
- **Game Development**: Unity, Unreal Engine
- **Cloud/DevOps**: Microservices, containers
- **Goal**: Become a specialist in your chosen field

### 5️⃣ Professional Level (Real-World)
- Building complete applications
- Version control (Git/GitHub)
- Software development lifecycle
- Testing (unit, integration, E2E)
- Deployment and CI/CD
- Team collaboration
- **Goal**: Work as a professional developer

## 💼 Available Courses (Market-Demanded)

### C++ Programming ⭐ Recommended
The mother of languages. Master memory management, OOP, and system programming.
- **Job Market**: High demand
- **Use Cases**: Game dev, system programming, embedded systems, high-performance apps

### Python
Most popular for AI, data science, automation, and backend development.
- **Job Market**: Top demand
- **Use Cases**: AI/ML, data science, web development, automation

### JavaScript
Essential for web development. Build full-stack applications.
- **Job Market**: Top demand
- **Use Cases**: Frontend, backend (Node.js), full-stack, mobile (React Native)

### Java
Enterprise applications, Android development, large-scale systems.
- **Job Market**: High demand
- **Use Cases**: Enterprise, Android, big data, cloud services

### C#
Game development with Unity, .NET applications, enterprise software.
- **Job Market**: High demand
- **Use Cases**: Game dev (Unity), Windows apps, enterprise, web (ASP.NET)

### Go (Golang)
Cloud services, microservices, high-performance backend.
- **Job Market**: Growing fast
- **Use Cases**: Cloud native, microservices, DevOps tools, APIs

### Rust
System programming with memory safety. The future of safe, fast code.
- **Job Market**: Rising star
- **Use Cases**: Systems, blockchain, WebAssembly, embedded

### PHP
Web development, WordPress, Laravel. Powers 77% of websites.
- **Job Market**: High demand
- **Use Cases**: Web development, WordPress, Laravel, APIs

### Swift
iOS and macOS app development for Apple ecosystem.
- **Job Market**: High demand
- **Use Cases**: iOS apps, macOS apps, watchOS, tvOS

### Kotlin
Modern Android development. Google's preferred language.
- **Job Market**: High demand
- **Use Cases**: Android apps, multiplatform mobile, backend

### TypeScript
JavaScript with types for large-scale applications.
- **Job Market**: Growing fast
- **Use Cases**: Large web apps, Angular, React, Node.js

### R Programming
Statistical computing and data analysis.
- **Job Market**: Data science focused
- **Use Cases**: Data analysis, statistics, bioinformatics, research

## 🚀 Getting Started

1. **Open `index.html`** in any modern web browser
2. **Choose a language** from the courses section
3. **Follow the 5-level path** from beginner to professional
4. **Track your progress** automatically saved in your browser

## 📁 Project Structure

```
code-academy/
├── index.html          # Main website structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── courses-data.js     # Complete course data for all languages
└── README.md           # Documentation
```

## 🎨 How to Customize

### Adding a New Language
1. Open `courses-data.js`
2. Add a new course object following the existing structure:
```javascript
coursesData.newlang = {
    name: "Language Name",
    icon: "fab fa-icon",
    description: "Description",
    levels: {
        1: { /* Beginner level data */ },
        2: { /* Intermediate level data */ },
        // ... etc
    }
};
```
3. Add a course card in `index.html` courses section
4. Use the `showCourse('newlang')` function

### Customizing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --accent-color: #f59e0b;
}
```

### Adding Code Examples
Add examples in the practice section of `index.html` with syntax highlighting.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Grid, Flexbox, animations
- **Vanilla JavaScript**: No frameworks, pure JS
- **Font Awesome**: Icons
- **LocalStorage**: Progress tracking

## 🤝 Contributing

This is an open-source project! Contributions welcome:
- ✅ Add more programming languages
- ✅ Create interactive coding exercises
- ✅ Improve course content
- ✅ Add translations
- ✅ Fix bugs and improve UX
- ✅ Add video tutorials
- ✅ Create quizzes and challenges

## 📈 Future Enhancements

- [ ] Interactive code editor (Monaco/CodeMirror)
- [ ] Video tutorials for each level
- [ ] Coding challenges and exercises
- [ ] User accounts and cloud sync
- [ ] Community forum
- [ ] Certificates of completion
- [ ] Mobile app version
- [ ] Multi-language support (UI translation)

## 📄 License

Free to use, modify, and distribute. Built with ❤️ for aspiring programmers everywhere.

## 🎯 Why This Platform?

- **Market-Focused**: Only languages with high job demand
- **Structured Learning**: Clear progression from zero to professional
- **Specialization Paths**: Choose your career direction at expert level
- **Real-World Skills**: Level 5 focuses on professional practices
- **Completely Free**: No hidden costs, no subscriptions
- **Open Source**: Learn from the code, contribute back

Happy Coding! 🚀
