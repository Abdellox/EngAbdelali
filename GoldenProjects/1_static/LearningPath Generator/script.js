// Category organization - parent-child structure
const categories = {
    programming: {
        name: "Programming & Development",
        icon: "💻",
        paths: ["javascript", "python", "web development", "react", "typescript", "data science", "machine learning"]
    },
    freelancing: {
        name: "Freelancing & Remote Work",
        icon: "💼",
        paths: ["virtual assistant", "content writing", "social media management", "video editing", "seo specialist", "email marketing"]
    },
    corporate: {
        name: "Corporate & Remote Jobs",
        icon: "🏢",
        paths: ["data analyst", "project manager", "qa tester", "customer support", "business analyst"]
    },
    design: {
        name: "Design & Creative",
        icon: "🎨",
        paths: ["ui/ux design", "graphic design", "figma", "web design"]
    },
    business: {
        name: "Business & Marketing",
        icon: "📊",
        paths: ["digital marketing", "entrepreneurship", "bookkeeping"]
    },
    languages: {
        name: "Languages",
        icon: "🌍",
        paths: ["english", "spanish", "french", "german", "chinese", "japanese", "translation services"]
    },
    creative: {
        name: "Creative Arts",
        icon: "🎭",
        paths: ["photography", "music production", "guitar", "drawing"]
    },
    science: {
        name: "Science & Math",
        icon: "🔬",
        paths: ["mathematics", "physics", "statistics"]
    }
};

const learningPaths = {
    "javascript": {
        title: "JavaScript Development",
        category: "programming",
        description: "Master modern JavaScript from basics to advanced concepts",
        duration: "3-6 months",
        difficulty: "Beginner to Advanced",
        items: [
            {
                id: 1,
                title: "JavaScript Fundamentals",
                description: "Variables, data types, functions, and control flow",
                duration: "2-3 weeks",
                resources: [
                    { name: "JavaScript.info", url: "https://javascript.info/", type: "Tutorial" },
                    { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "Documentation" },
                    { name: "FreeCodeCamp JS Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "Course" }
                ]
            },
            {
                id: 2,
                title: "DOM Manipulation & Events",
                description: "Interact with web pages dynamically",
                duration: "1-2 weeks",
                resources: [
                    { name: "DOM Manipulation Guide", url: "https://www.w3schools.com/js/js_htmldom.asp", type: "Tutorial" },
                    { name: "JavaScript30", url: "https://javascript30.com/", type: "Project-Based" }
                ]
            },
            {
                id: 3,
                title: "Async JavaScript & APIs",
                description: "Promises, async/await, and fetching data",
                duration: "2 weeks",
                resources: [
                    { name: "Async JS Tutorial", url: "https://www.youtube.com/watch?v=PoRJizFvM7s", type: "Video" },
                    { name: "MDN Async", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", type: "Documentation" }
                ]
            },
            {
                id: 4,
                title: "ES6+ Modern Features",
                description: "Arrow functions, destructuring, modules, and more",
                duration: "1-2 weeks",
                resources: [
                    { name: "ES6 Features", url: "https://github.com/lukehoban/es6features", type: "Guide" },
                    { name: "JavaScript.info ES6", url: "https://javascript.info/", type: "Tutorial" }
                ]
            },
            {
                id: 5,
                title: "Build Real Projects",
                description: "Apply your knowledge with hands-on projects",
                duration: "Ongoing",
                resources: [
                    { name: "Frontend Mentor", url: "https://www.frontendmentor.io/", type: "Projects" },
                    { name: "JavaScript30", url: "https://javascript30.com/", type: "Projects" }
                ]
            }
        ]
    },
    "python": {
        title: "Python Programming",
        category: "programming",
        description: "Learn Python from scratch to data science and automation",
        duration: "3-5 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 6,
                title: "Python Basics",
                description: "Syntax, variables, data types, and basic operations",
                duration: "2-3 weeks",
                resources: [
                    { name: "Python.org Tutorial", url: "https://docs.python.org/3/tutorial/", type: "Documentation" },
                    { name: "W3Schools Python", url: "https://www.w3schools.com/python/", type: "Tutorial" },
                    { name: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/", type: "Book" }
                ]
            },
            {
                id: 7,
                title: "Data Structures & Algorithms",
                description: "Lists, dictionaries, sets, and problem-solving",
                duration: "3-4 weeks",
                resources: [
                    { name: "Real Python", url: "https://realpython.com/", type: "Tutorial" },
                    { name: "Python DSA Course", url: "https://www.geeksforgeeks.org/python-programming-language/", type: "Course" }
                ]
            },
            {
                id: 8,
                title: "Object-Oriented Programming",
                description: "Classes, objects, inheritance, and design patterns",
                duration: "2 weeks",
                resources: [
                    { name: "OOP in Python", url: "https://realpython.com/python3-object-oriented-programming/", type: "Tutorial" },
                    { name: "Python OOP", url: "https://www.programiz.com/python-programming/object-oriented-programming", type: "Guide" }
                ]
            },
            {
                id: 9,
                title: "Working with Files & APIs",
                description: "File I/O, JSON, and REST APIs",
                duration: "1-2 weeks",
                resources: [
                    { name: "Python File Handling", url: "https://realpython.com/read-write-files-python/", type: "Tutorial" },
                    { name: "Working with APIs", url: "https://realpython.com/api-integration-in-python/", type: "Tutorial" }
                ]
            },
            {
                id: 10,
                title: "Python Projects",
                description: "Build automation scripts and applications",
                duration: "Ongoing",
                resources: [
                    { name: "Python Project Ideas", url: "https://realpython.com/tutorials/projects/", type: "Projects" },
                    { name: "100 Days of Code", url: "https://www.udemy.com/course/100-days-of-code/", type: "Course" }
                ]
            }
        ]
    },
    "web development": {
        title: "Full-Stack Web Development",
        category: "programming",
        description: "Complete roadmap from frontend to backend development",
        duration: "6-12 months",
        difficulty: "Beginner to Advanced",
        items: [
            {
                id: 11,
                title: "HTML & CSS Fundamentals",
                description: "Structure and style web pages",
                duration: "2-3 weeks",
                resources: [
                    { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "Documentation" },
                    { name: "W3Schools", url: "https://www.w3schools.com/", type: "Tutorial" },
                    { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/responsive-web-design/", type: "Course" }
                ]
            },
            {
                id: 12,
                title: "Responsive Design",
                description: "Flexbox, Grid, and mobile-first design",
                duration: "1-2 weeks",
                resources: [
                    { name: "CSS Tricks Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "Guide" },
                    { name: "Grid Garden", url: "https://cssgridgarden.com/", type: "Interactive" }
                ]
            },
            {
                id: 13,
                title: "JavaScript Fundamentals",
                description: "Add interactivity to your websites",
                duration: "3-4 weeks",
                resources: [
                    { name: "JavaScript.info", url: "https://javascript.info/", type: "Tutorial" },
                    { name: "Codecademy JS Course", url: "https://www.codecademy.com/learn/introduction-to-javascript", type: "Course" }
                ]
            },
            {
                id: 14,
                title: "Frontend Framework (React/Vue)",
                description: "Build modern single-page applications",
                duration: "4-6 weeks",
                resources: [
                    { name: "React Tutorial", url: "https://react.dev/learn", type: "Documentation" },
                    { name: "Vue.js Guide", url: "https://vuejs.org/guide/introduction.html", type: "Documentation" }
                ]
            },
            {
                id: 15,
                title: "Backend Development",
                description: "Node.js, Express, and databases",
                duration: "4-6 weeks",
                resources: [
                    { name: "Node.js Tutorial", url: "https://nodejs.org/en/docs/guides/", type: "Documentation" },
                    { name: "Express.js Guide", url: "https://expressjs.com/en/starter/installing.html", type: "Documentation" }
                ]
            },
            {
                id: 16,
                title: "Full-Stack Projects",
                description: "Build complete web applications",
                duration: "Ongoing",
                resources: [
                    { name: "The Odin Project", url: "https://www.theodinproject.com/", type: "Curriculum" },
                    { name: "Full Stack Open", url: "https://fullstackopen.com/", type: "Course" }
                ]
            }
        ]
    },
    "data science": {
        title: "Data Science & Analytics",
        category: "programming",
        description: "Master data analysis, visualization, and machine learning",
        duration: "6-9 months",
        difficulty: "Intermediate",
        items: [
            {
                id: 17,
                title: "Python for Data Science",
                description: "NumPy, Pandas, and data manipulation",
                duration: "3-4 weeks",
                resources: [
                    { name: "Python Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", type: "Book" },
                    { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", type: "Course" }
                ]
            },
            {
                id: 18,
                title: "Data Visualization",
                description: "Matplotlib, Seaborn, and storytelling with data",
                duration: "2 weeks",
                resources: [
                    { name: "Data Viz with Python", url: "https://realpython.com/python-matplotlib-guide/", type: "Tutorial" },
                    { name: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html", type: "Documentation" }
                ]
            },
            {
                id: 19,
                title: "Statistics & Probability",
                description: "Essential math for data science",
                duration: "3-4 weeks",
                resources: [
                    { name: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability", type: "Course" },
                    { name: "Think Stats", url: "https://greenteapress.com/thinkstats2/html/index.html", type: "Book" }
                ]
            },
            {
                id: 20,
                title: "Machine Learning Basics",
                description: "Supervised and unsupervised learning",
                duration: "4-6 weeks",
                resources: [
                    { name: "Scikit-learn Tutorial", url: "https://scikit-learn.org/stable/tutorial/index.html", type: "Documentation" },
                    { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "Course" }
                ]
            },
            {
                id: 21,
                title: "Real-World Projects",
                description: "Apply skills to datasets and competitions",
                duration: "Ongoing",
                resources: [
                    { name: "Kaggle Competitions", url: "https://www.kaggle.com/competitions", type: "Projects" },
                    { name: "UCI ML Repository", url: "https://archive.ics.uci.edu/ml/index.php", type: "Datasets" }
                ]
            }
        ]
    },
    "machine learning": {
        title: "Machine Learning & AI",
        category: "programming",
        description: "Deep dive into ML algorithms and neural networks",
        duration: "6-12 months",
        difficulty: "Advanced",
        items: [
            {
                id: 22,
                title: "Math Foundations",
                description: "Linear algebra, calculus, and statistics",
                duration: "4-6 weeks",
                resources: [
                    { name: "3Blue1Brown", url: "https://www.youtube.com/c/3blue1brown", type: "Video" },
                    { name: "Khan Academy", url: "https://www.khanacademy.org/", type: "Course" }
                ]
            },
            {
                id: 23,
                title: "Python & ML Libraries",
                description: "NumPy, Pandas, Scikit-learn basics",
                duration: "3-4 weeks",
                resources: [
                    { name: "Python ML Tutorial", url: "https://realpython.com/tutorials/machine-learning/", type: "Tutorial" },
                    { name: "Scikit-learn Docs", url: "https://scikit-learn.org/", type: "Documentation" }
                ]
            },
            {
                id: 24,
                title: "Supervised Learning",
                description: "Regression, classification, and model evaluation",
                duration: "4-5 weeks",
                resources: [
                    { name: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning", type: "Course" },
                    { name: "Hands-On ML Book", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", type: "Book" }
                ]
            },
            {
                id: 25,
                title: "Deep Learning & Neural Networks",
                description: "TensorFlow, PyTorch, and CNNs",
                duration: "6-8 weeks",
                resources: [
                    { name: "Fast.ai", url: "https://www.fast.ai/", type: "Course" },
                    { name: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning", type: "Course" }
                ]
            },
            {
                id: 26,
                title: "ML Projects & Deployment",
                description: "Build and deploy ML models",
                duration: "Ongoing",
                resources: [
                    { name: "ML Projects", url: "https://github.com/ashishpatel26/500-AI-Machine-learning-Deep-learning-Computer-vision-NLP-Projects-with-code", type: "Projects" },
                    { name: "MLOps Guide", url: "https://ml-ops.org/", type: "Guide" }
                ]
            }
        ]
    },
    "react": {
        title: "React.js Development",
        category: "programming",
        description: "Build modern web applications with React",
        duration: "2-4 months",
        difficulty: "Intermediate",
        items: [
            {
                id: 27,
                title: "JavaScript Prerequisites",
                description: "ES6+, async/await, and modern JavaScript",
                duration: "1-2 weeks",
                resources: [
                    { name: "JavaScript.info", url: "https://javascript.info/", type: "Tutorial" },
                    { name: "ES6 Features", url: "https://github.com/lukehoban/es6features", type: "Guide" }
                ]
            },
            {
                id: 28,
                title: "React Fundamentals",
                description: "Components, props, state, and JSX",
                duration: "2-3 weeks",
                resources: [
                    { name: "React Official Docs", url: "https://react.dev/learn", type: "Documentation" },
                    { name: "React Tutorial", url: "https://react.dev/learn/tutorial-tic-tac-toe", type: "Tutorial" }
                ]
            },
            {
                id: 29,
                title: "Hooks & State Management",
                description: "useState, useEffect, useContext, and custom hooks",
                duration: "2 weeks",
                resources: [
                    { name: "React Hooks", url: "https://react.dev/reference/react", type: "Documentation" },
                    { name: "useHooks", url: "https://usehooks.com/", type: "Examples" }
                ]
            },
            {
                id: 30,
                title: "React Router & Navigation",
                description: "Client-side routing and navigation",
                duration: "1 week",
                resources: [
                    { name: "React Router", url: "https://reactrouter.com/", type: "Documentation" },
                    { name: "Routing Tutorial", url: "https://www.youtube.com/watch?v=Law7wfdg_ls", type: "Video" }
                ]
            },
            {
                id: 31,
                title: "Build Real Projects",
                description: "Create portfolio-worthy React applications",
                duration: "Ongoing",
                resources: [
                    { name: "React Projects", url: "https://github.com/topics/react-projects", type: "Projects" },
                    { name: "Frontend Mentor", url: "https://www.frontendmentor.io/", type: "Projects" }
                ]
            }
        ]
    },
    "typescript": {
        title: "TypeScript Development",
        category: "programming",
        description: "Add type safety to your JavaScript projects",
        duration: "1-2 months",
        difficulty: "Intermediate",
        items: [
            {
                id: 32,
                title: "TypeScript Basics",
                description: "Types, interfaces, and basic syntax",
                duration: "1-2 weeks",
                resources: [
                    { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", type: "Documentation" },
                    { name: "TypeScript Tutorial", url: "https://www.typescripttutorial.net/", type: "Tutorial" }
                ]
            },
            {
                id: 33,
                title: "Advanced Types",
                description: "Generics, utility types, and type guards",
                duration: "2 weeks",
                resources: [
                    { name: "Advanced Types", url: "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html", type: "Documentation" },
                    { name: "Type Challenges", url: "https://github.com/type-challenges/type-challenges", type: "Practice" }
                ]
            },
            {
                id: 34,
                title: "TypeScript with React",
                description: "Build type-safe React applications",
                duration: "1-2 weeks",
                resources: [
                    { name: "React TypeScript", url: "https://react-typescript-cheatsheet.netlify.app/", type: "Guide" },
                    { name: "TS + React Tutorial", url: "https://www.youtube.com/watch?v=Z5iWr6Srsj8", type: "Video" }
                ]
            },
            {
                id: 35,
                title: "TypeScript Projects",
                description: "Build real-world TypeScript applications",
                duration: "Ongoing",
                resources: [
                    { name: "TS Project Ideas", url: "https://github.com/topics/typescript-projects", type: "Projects" },
                    { name: "Awesome TypeScript", url: "https://github.com/dzharii/awesome-typescript", type: "Resources" }
                ]
            }
        ]
    },
    "ui/ux design": {
        title: "UI/UX Design",
        category: "design",
        description: "Create beautiful and user-friendly interfaces",
        duration: "3-5 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 36,
                title: "Design Fundamentals",
                description: "Color theory, typography, and layout principles",
                duration: "2-3 weeks",
                resources: [
                    { name: "Design Principles", url: "https://www.interaction-design.org/literature/topics/design-principles", type: "Course" },
                    { name: "Refactoring UI", url: "https://www.refactoringui.com/", type: "Book" }
                ]
            },
            {
                id: 37,
                title: "User Research & Testing",
                description: "Understanding users and their needs",
                duration: "2 weeks",
                resources: [
                    { name: "UX Research Guide", url: "https://www.nngroup.com/articles/", type: "Articles" },
                    { name: "User Testing", url: "https://www.usertesting.com/resources", type: "Resources" }
                ]
            },
            {
                id: 38,
                title: "Wireframing & Prototyping",
                description: "Create mockups and interactive prototypes",
                duration: "2-3 weeks",
                resources: [
                    { name: "Figma Tutorial", url: "https://www.figma.com/resources/learn-design/", type: "Tutorial" },
                    { name: "Wireframing Guide", url: "https://www.uxpin.com/studio/blog/wireframing/", type: "Guide" }
                ]
            },
            {
                id: 39,
                title: "Design Systems",
                description: "Build scalable and consistent design systems",
                duration: "2 weeks",
                resources: [
                    { name: "Design Systems", url: "https://www.designsystems.com/", type: "Resources" },
                    { name: "Material Design", url: "https://material.io/design", type: "Documentation" }
                ]
            },
            {
                id: 40,
                title: "Portfolio Projects",
                description: "Build a stunning design portfolio",
                duration: "Ongoing",
                resources: [
                    { name: "Dribbble", url: "https://dribbble.com/", type: "Inspiration" },
                    { name: "Behance", url: "https://www.behance.net/", type: "Portfolio" }
                ]
            }
        ]
    },
    "digital marketing": {
        title: "Digital Marketing",
        category: "business",
        description: "Master online marketing strategies and tactics",
        duration: "3-6 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 41,
                title: "Marketing Fundamentals",
                description: "Core concepts and strategies",
                duration: "2 weeks",
                resources: [
                    { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage", type: "Course" },
                    { name: "HubSpot Academy", url: "https://academy.hubspot.com/", type: "Course" }
                ]
            },
            {
                id: 42,
                title: "SEO & Content Marketing",
                description: "Search engine optimization and content strategy",
                duration: "3-4 weeks",
                resources: [
                    { name: "Moz SEO Guide", url: "https://moz.com/beginners-guide-to-seo", type: "Guide" },
                    { name: "Ahrefs Blog", url: "https://ahrefs.com/blog/", type: "Blog" }
                ]
            },
            {
                id: 43,
                title: "Social Media Marketing",
                description: "Build and engage audiences on social platforms",
                duration: "2-3 weeks",
                resources: [
                    { name: "Social Media Examiner", url: "https://www.socialmediaexaminer.com/", type: "Resources" },
                    { name: "Buffer Blog", url: "https://buffer.com/resources/", type: "Blog" }
                ]
            },
            {
                id: 44,
                title: "Email Marketing & Automation",
                description: "Build email campaigns and automation workflows",
                duration: "2 weeks",
                resources: [
                    { name: "Mailchimp Resources", url: "https://mailchimp.com/resources/", type: "Resources" },
                    { name: "Email Marketing Guide", url: "https://www.campaignmonitor.com/resources/guides/", type: "Guide" }
                ]
            },
            {
                id: 45,
                title: "Analytics & Optimization",
                description: "Measure and improve marketing performance",
                duration: "Ongoing",
                resources: [
                    { name: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/", type: "Course" },
                    { name: "CXL Institute", url: "https://cxl.com/blog/", type: "Blog" }
                ]
            }
        ]
    },
    "photography": {
        title: "Photography",
        category: "creative",
        description: "Master the art of capturing stunning images",
        duration: "4-8 months",
        difficulty: "Beginner to Advanced",
        items: [
            {
                id: 46,
                title: "Camera Basics",
                description: "Exposure triangle, aperture, shutter speed, ISO",
                duration: "2-3 weeks",
                resources: [
                    { name: "Photography Basics", url: "https://www.youtube.com/watch?v=LxO-6rlihSg", type: "Video" },
                    { name: "Cambridge in Colour", url: "https://www.cambridgeincolour.com/tutorials.htm", type: "Tutorial" }
                ]
            },
            {
                id: 47,
                title: "Composition & Lighting",
                description: "Rule of thirds, leading lines, and natural light",
                duration: "3-4 weeks",
                resources: [
                    { name: "Composition Guide", url: "https://digital-photography-school.com/composition/", type: "Guide" },
                    { name: "Lighting Tutorial", url: "https://www.youtube.com/watch?v=j_Vsx4-dVqk", type: "Video" }
                ]
            },
            {
                id: 48,
                title: "Photo Editing",
                description: "Lightroom and Photoshop fundamentals",
                duration: "3-4 weeks",
                resources: [
                    { name: "Lightroom Tutorials", url: "https://helpx.adobe.com/lightroom-classic/tutorials.html", type: "Tutorial" },
                    { name: "Photoshop Essentials", url: "https://www.photoshopessentials.com/", type: "Tutorial" }
                ]
            },
            {
                id: 49,
                title: "Genre Specialization",
                description: "Portrait, landscape, street, or product photography",
                duration: "4-6 weeks",
                resources: [
                    { name: "Portrait Photography", url: "https://www.youtube.com/watch?v=kmi9vCJqHAQ", type: "Video" },
                    { name: "Landscape Photography", url: "https://www.youtube.com/watch?v=LxO-6rlihSg", type: "Video" }
                ]
            },
            {
                id: 50,
                title: "Build Portfolio",
                description: "Create a professional photography portfolio",
                duration: "Ongoing",
                resources: [
                    { name: "500px", url: "https://500px.com/", type: "Portfolio" },
                    { name: "Unsplash", url: "https://unsplash.com/", type: "Community" }
                ]
            }
        ]
    },
    "virtual assistant": {
        title: "Virtual Assistant Mastery",
        category: "freelancing",
        description: "Become a highly-paid virtual assistant and work from anywhere",
        duration: "2-3 months",
        difficulty: "Beginner",
        items: [
            {
                id: 51,
                title: "VA Fundamentals & Tools",
                description: "Essential skills, tools, and software every VA needs",
                duration: "1-2 weeks",
                resources: [
                    { name: "VA Handbook", url: "https://www.thevirtualsavvy.com/blog", type: "Guide" },
                    { name: "VA Tools Guide", url: "https://www.youtube.com/watch?v=qKXzr8vQKQo", type: "Video" },
                    { name: "Google Workspace", url: "https://workspace.google.com/learning-center/", type: "Tutorial" }
                ]
            },
            {
                id: 52,
                title: "Email & Calendar Management",
                description: "Master inbox zero and scheduling like a pro",
                duration: "1 week",
                resources: [
                    { name: "Email Management", url: "https://www.youtube.com/watch?v=EuD2i8vLMT4", type: "Video" },
                    { name: "Calendar Mastery", url: "https://support.google.com/calendar/", type: "Documentation" }
                ]
            },
            {
                id: 53,
                title: "Communication & Client Management",
                description: "Professional communication and relationship building",
                duration: "1-2 weeks",
                resources: [
                    { name: "Client Communication", url: "https://www.skillshare.com/browse/virtual-assistant", type: "Course" },
                    { name: "Professional Writing", url: "https://www.coursera.org/learn/professional-emails", type: "Course" }
                ]
            },
            {
                id: 54,
                title: "Specialized VA Services",
                description: "Social media, bookkeeping, or project management specialization",
                duration: "2-3 weeks",
                resources: [
                    { name: "VA Specializations", url: "https://www.youtube.com/results?search_query=virtual+assistant+specialization", type: "Video" },
                    { name: "Trello for PMs", url: "https://trello.com/guide", type: "Guide" }
                ]
            },
            {
                id: 55,
                title: "Find Clients & Build Business",
                description: "Get your first clients on Upwork, Fiverr, and beyond",
                duration: "Ongoing",
                resources: [
                    { name: "Upwork Success", url: "https://www.upwork.com/resources/beginners-guide-to-upwork", type: "Guide" },
                    { name: "Fiverr for VAs", url: "https://www.fiverr.com/resources/guides/freelancing/virtual-assistant", type: "Guide" },
                    { name: "VA Pricing Guide", url: "https://www.youtube.com/watch?v=8zKuoGQJZ5s", type: "Video" }
                ]
            }
        ]
    },
    "content writing": {
        title: "Content Writing & Copywriting",
        category: "freelancing",
        description: "Write compelling content that sells and earns you money",
        duration: "2-4 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 56,
                title: "Writing Fundamentals",
                description: "Grammar, style, and writing basics",
                duration: "1-2 weeks",
                resources: [
                    { name: "Grammarly Blog", url: "https://www.grammarly.com/blog/", type: "Blog" },
                    { name: "Writing Basics", url: "https://www.coursera.org/learn/writing-skills", type: "Course" },
                    { name: "Hemingway Editor", url: "https://hemingwayapp.com/", type: "Tool" }
                ]
            },
            {
                id: 57,
                title: "Content Writing Types",
                description: "Blog posts, articles, web content, and more",
                duration: "2-3 weeks",
                resources: [
                    { name: "Content Writing Guide", url: "https://contentmarketinginstitute.com/articles/", type: "Articles" },
                    { name: "Blog Writing", url: "https://www.youtube.com/watch?v=hU6BVxtGd5g", type: "Video" },
                    { name: "SEO Writing", url: "https://ahrefs.com/blog/seo-writing/", type: "Guide" }
                ]
            },
            {
                id: 58,
                title: "Copywriting Skills",
                description: "Write copy that converts and sells",
                duration: "2-3 weeks",
                resources: [
                    { name: "Copywriting Course", url: "https://copyblogger.com/copywriting-101/", type: "Course" },
                    { name: "AIDA Framework", url: "https://www.youtube.com/watch?v=9WE1RfN2VXs", type: "Video" },
                    { name: "Swipe File", url: "https://swiped.co/", type: "Resources" }
                ]
            },
            {
                id: 59,
                title: "Research & SEO",
                description: "Research topics and optimize for search engines",
                duration: "1-2 weeks",
                resources: [
                    { name: "Keyword Research", url: "https://ahrefs.com/blog/keyword-research/", type: "Guide" },
                    { name: "SEO Basics", url: "https://moz.com/beginners-guide-to-seo", type: "Guide" }
                ]
            },
            {
                id: 60,
                title: "Build Portfolio & Get Clients",
                description: "Create samples and land your first writing gigs",
                duration: "Ongoing",
                resources: [
                    { name: "Writer Portfolio", url: "https://contently.com/", type: "Platform" },
                    { name: "Upwork for Writers", url: "https://www.upwork.com/resources/how-to-become-a-freelance-writer", type: "Guide" },
                    { name: "Medium", url: "https://medium.com/", type: "Platform" }
                ]
            }
        ]
    },
    "social media management": {
        title: "Social Media Management",
        category: "freelancing",
        description: "Manage social media accounts and grow online communities",
        duration: "2-3 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 61,
                title: "Social Media Fundamentals",
                description: "Understand platforms, algorithms, and best practices",
                duration: "1-2 weeks",
                resources: [
                    { name: "Social Media Marketing", url: "https://www.coursera.org/learn/social-media-marketing", type: "Course" },
                    { name: "Platform Overview", url: "https://www.youtube.com/watch?v=jbvZgJuCVZE", type: "Video" },
                    { name: "Hootsuite Academy", url: "https://education.hootsuite.com/", type: "Course" }
                ]
            },
            {
                id: 62,
                title: "Content Creation & Strategy",
                description: "Create engaging content and plan content calendars",
                duration: "2-3 weeks",
                resources: [
                    { name: "Content Strategy", url: "https://buffer.com/library/social-media-content-strategy/", type: "Guide" },
                    { name: "Canva for Social", url: "https://www.canva.com/learn/social-media/", type: "Tutorial" },
                    { name: "Content Calendar", url: "https://blog.hootsuite.com/how-to-create-a-social-media-content-calendar/", type: "Guide" }
                ]
            },
            {
                id: 63,
                title: "Community Management",
                description: "Engage audiences and handle customer interactions",
                duration: "1-2 weeks",
                resources: [
                    { name: "Community Building", url: "https://www.youtube.com/watch?v=OMS8hFL8QdI", type: "Video" },
                    { name: "Engagement Tips", url: "https://sproutsocial.com/insights/social-media-engagement/", type: "Guide" }
                ]
            },
            {
                id: 64,
                title: "Analytics & Reporting",
                description: "Track metrics and prove ROI to clients",
                duration: "1-2 weeks",
                resources: [
                    { name: "Social Analytics", url: "https://analytics.google.com/analytics/academy/", type: "Course" },
                    { name: "Meta Insights", url: "https://www.facebook.com/business/learn", type: "Tutorial" }
                ]
            },
            {
                id: 65,
                title: "Get Clients & Scale",
                description: "Find clients and manage multiple accounts",
                duration: "Ongoing",
                resources: [
                    { name: "SMM Pricing", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "Video" },
                    { name: "Client Proposals", url: "https://www.socialmediaexaminer.com/", type: "Resources" },
                    { name: "Upwork SMM", url: "https://www.upwork.com/hire/social-media-managers/", type: "Platform" }
                ]
            }
        ]
    },
    "video editing": {
        title: "Professional Video Editing",
        category: "freelancing",
        description: "Edit videos for YouTube, social media, and businesses",
        duration: "3-5 months",
        difficulty: "Beginner to Advanced",
        items: [
            {
                id: 66,
                title: "Video Editing Basics",
                description: "Learn editing software and fundamental techniques",
                duration: "2-3 weeks",
                resources: [
                    { name: "DaVinci Resolve Tutorial", url: "https://www.youtube.com/watch?v=63Ln33O4p4c", type: "Video" },
                    { name: "Adobe Premiere Pro", url: "https://helpx.adobe.com/premiere-pro/tutorials.html", type: "Tutorial" },
                    { name: "CapCut Guide", url: "https://www.capcut.com/resource", type: "Guide" }
                ]
            },
            {
                id: 67,
                title: "Advanced Editing Techniques",
                description: "Color grading, transitions, effects, and audio",
                duration: "3-4 weeks",
                resources: [
                    { name: "Color Grading", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "Video" },
                    { name: "Motion Graphics", url: "https://www.youtube.com/results?search_query=motion+graphics+tutorial", type: "Video" },
                    { name: "Audio Editing", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "Video" }
                ]
            },
            {
                id: 68,
                title: "YouTube & Social Media Editing",
                description: "Edit for different platforms and audiences",
                duration: "2 weeks",
                resources: [
                    { name: "YouTube Editing", url: "https://creatoracademy.youtube.com/", type: "Course" },
                    { name: "Short-Form Content", url: "https://www.youtube.com/results?search_query=tiktok+editing", type: "Video" }
                ]
            },
            {
                id: 69,
                title: "Workflow & Efficiency",
                description: "Speed up editing and manage projects professionally",
                duration: "1-2 weeks",
                resources: [
                    { name: "Editing Workflow", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "Video" },
                    { name: "Keyboard Shortcuts", url: "https://www.premiumbeat.com/blog/premiere-pro-keyboard-shortcuts/", type: "Guide" }
                ]
            },
            {
                id: 70,
                title: "Build Portfolio & Get Clients",
                description: "Showcase work and land video editing gigs",
                duration: "Ongoing",
                resources: [
                    { name: "Video Portfolio", url: "https://vimeo.com/", type: "Platform" },
                    { name: "Fiverr Video Editing", url: "https://www.fiverr.com/categories/video-animation", type: "Platform" },
                    { name: "Upwork Video Jobs", url: "https://www.upwork.com/hire/video-editors/", type: "Platform" }
                ]
            }
        ]
    },
    "seo specialist": {
        title: "SEO Specialist",
        category: "freelancing",
        description: "Master search engine optimization and rank websites",
        duration: "3-6 months",
        difficulty: "Intermediate",
        items: [
            {
                id: 71,
                title: "SEO Fundamentals",
                description: "How search engines work and SEO basics",
                duration: "2-3 weeks",
                resources: [
                    { name: "Moz SEO Guide", url: "https://moz.com/beginners-guide-to-seo", type: "Guide" },
                    { name: "Google SEO Starter", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", type: "Documentation" },
                    { name: "Ahrefs SEO Course", url: "https://ahrefs.com/academy/seo-training-course", type: "Course" }
                ]
            },
            {
                id: 72,
                title: "Keyword Research",
                description: "Find profitable keywords and search intent",
                duration: "2 weeks",
                resources: [
                    { name: "Keyword Research Guide", url: "https://ahrefs.com/blog/keyword-research/", type: "Guide" },
                    { name: "Google Keyword Planner", url: "https://ads.google.com/home/tools/keyword-planner/", type: "Tool" }
                ]
            },
            {
                id: 73,
                title: "On-Page & Technical SEO",
                description: "Optimize content, meta tags, and site structure",
                duration: "3-4 weeks",
                resources: [
                    { name: "On-Page SEO", url: "https://backlinko.com/on-page-seo", type: "Guide" },
                    { name: "Technical SEO", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "Video" }
                ]
            },
            {
                id: 74,
                title: "Link Building & Off-Page SEO",
                description: "Build authority through backlinks",
                duration: "2-3 weeks",
                resources: [
                    { name: "Link Building", url: "https://ahrefs.com/blog/link-building/", type: "Guide" },
                    { name: "Backlink Strategies", url: "https://www.youtube.com/results?search_query=link+building+strategies", type: "Video" }
                ]
            },
            {
                id: 75,
                title: "SEO Tools & Client Work",
                description: "Master SEO tools and get clients",
                duration: "Ongoing",
                resources: [
                    { name: "SEMrush Academy", url: "https://www.semrush.com/academy/", type: "Course" },
                    { name: "Ahrefs Tools", url: "https://ahrefs.com/", type: "Tool" },
                    { name: "SEO Freelancing", url: "https://www.upwork.com/hire/seo-experts/", type: "Platform" }
                ]
            }
        ]
    },
    "email marketing": {
        title: "Email Marketing Specialist",
        category: "freelancing",
        description: "Create email campaigns that convert and generate revenue",
        duration: "2-3 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 76,
                title: "Email Marketing Basics",
                description: "Email fundamentals, deliverability, and best practices",
                duration: "1-2 weeks",
                resources: [
                    { name: "Email Marketing Guide", url: "https://mailchimp.com/resources/email-marketing-guide/", type: "Guide" },
                    { name: "HubSpot Email Course", url: "https://academy.hubspot.com/courses/email-marketing", type: "Course" }
                ]
            },
            {
                id: 77,
                title: "List Building & Segmentation",
                description: "Grow email lists and segment audiences",
                duration: "1-2 weeks",
                resources: [
                    { name: "List Building", url: "https://www.youtube.com/results?search_query=email+list+building", type: "Video" },
                    { name: "Segmentation Guide", url: "https://www.campaignmonitor.com/resources/guides/email-segmentation/", type: "Guide" }
                ]
            },
            {
                id: 78,
                title: "Copywriting & Design",
                description: "Write compelling emails and design templates",
                duration: "2 weeks",
                resources: [
                    { name: "Email Copywriting", url: "https://copyblogger.com/email-copywriting/", type: "Guide" },
                    { name: "Email Design", url: "https://www.canva.com/learn/email-design/", type: "Tutorial" }
                ]
            },
            {
                id: 79,
                title: "Automation & Workflows",
                description: "Set up automated email sequences",
                duration: "2 weeks",
                resources: [
                    { name: "Email Automation", url: "https://www.activecampaign.com/learn/guides/email-automation", type: "Guide" },
                    { name: "Drip Campaigns", url: "https://www.youtube.com/results?search_query=email+automation", type: "Video" }
                ]
            },
            {
                id: 80,
                title: "Analytics & Client Acquisition",
                description: "Track metrics and get email marketing clients",
                duration: "Ongoing",
                resources: [
                    { name: "Email Analytics", url: "https://mailchimp.com/resources/email-marketing-benchmarks/", type: "Resources" },
                    { name: "Freelance Email Marketing", url: "https://www.upwork.com/hire/email-marketers/", type: "Platform" }
                ]
            }
        ]
    },
    "data analyst": {
        title: "Data Analyst",
        category: "corporate",
        description: "Analyze data and help companies make better decisions",
        duration: "3-6 months",
        difficulty: "Beginner to Intermediate",
        items: [
            {
                id: 81,
                title: "Excel & Spreadsheet Mastery",
                description: "Master Excel formulas, pivot tables, and data manipulation",
                duration: "2-3 weeks",
                resources: [
                    { name: "Excel Tutorial", url: "https://www.excel-easy.com/", type: "Tutorial" },
                    { name: "Excel for Data Analysis", url: "https://www.coursera.org/learn/excel-basics-data-analysis-ibm", type: "Course" },
                    { name: "Google Sheets", url: "https://www.youtube.com/results?search_query=google+sheets+tutorial", type: "Video" }
                ]
            },
            {
                id: 82,
                title: "SQL & Database Basics",
                description: "Query databases and extract insights",
                duration: "3-4 weeks",
                resources: [
                    { name: "SQL Tutorial", url: "https://www.w3schools.com/sql/", type: "Tutorial" },
                    { name: "SQLBolt", url: "https://sqlbolt.com/", type: "Interactive" },
                    { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "Tutorial" }
                ]
            },
            {
                id: 83,
                title: "Data Visualization",
                description: "Create dashboards with Power BI and Tableau",
                duration: "2-3 weeks",
                resources: [
                    { name: "Power BI Tutorial", url: "https://www.youtube.com/results?search_query=power+bi+tutorial", type: "Video" },
                    { name: "Tableau Public", url: "https://public.tableau.com/app/learn/how-to-videos", type: "Tutorial" },
                    { name: "Data Viz Best Practices", url: "https://www.storytellingwithdata.com/", type: "Blog" }
                ]
            },
            {
                id: 84,
                title: "Statistics & Analysis",
                description: "Statistical thinking and data interpretation",
                duration: "2-3 weeks",
                resources: [
                    { name: "Statistics Basics", url: "https://www.khanacademy.org/math/statistics-probability", type: "Course" },
                    { name: "Data Analysis", url: "https://www.coursera.org/learn/data-analysis-with-python", type: "Course" }
                ]
            },
            {
                id: 85,
                title: "Portfolio & Job Search",
                description: "Build portfolio and land data analyst jobs",
                duration: "Ongoing",
                resources: [
                    { name: "Data Analyst Portfolio", url: "https://www.youtube.com/results?search_query=data+analyst+portfolio", type: "Video" },
                    { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/data-analyst-jobs/", type: "Platform" },
                    { name: "Indeed Data Analyst", url: "https://www.indeed.com/q-Data-Analyst-jobs.html", type: "Platform" }
                ]
            }
        ]
    },
    "project manager": {
        title: "Project Manager",
        category: "corporate",
        description: "Lead projects and teams to successful completion",
        duration: "3-5 months",
        difficulty: "Intermediate",
        items: [
            {
                id: 86,
                title: "Project Management Fundamentals",
                description: "PM basics, methodologies, and frameworks",
                duration: "2-3 weeks",
                resources: [
                    { name: "PM Basics", url: "https://www.pmi.org/learning/library", type: "Resources" },
                    { name: "Google PM Certificate", url: "https://www.coursera.org/professional-certificates/google-project-management", type: "Course" },
                    { name: "PM Tutorial", url: "https://www.youtube.com/results?search_query=project+management+tutorial", type: "Video" }
                ]
            },
            {
                id: 87,
                title: "Agile & Scrum",
                description: "Master Agile methodology and Scrum framework",
                duration: "2-3 weeks",
                resources: [
                    { name: "Scrum Guide", url: "https://scrumguides.org/", type: "Documentation" },
                    { name: "Agile Tutorial", url: "https://www.atlassian.com/agile", type: "Guide" },
                    { name: "Scrum Master Course", url: "https://www.youtube.com/results?search_query=scrum+master+tutorial", type: "Video" }
                ]
            },
            {
                id: 88,
                title: "PM Tools & Software",
                description: "Jira, Trello, Asana, Microsoft Project",
                duration: "2 weeks",
                resources: [
                    { name: "Jira Tutorial", url: "https://www.atlassian.com/software/jira/guides", type: "Guide" },
                    { name: "Trello Guide", url: "https://trello.com/guide", type: "Guide" },
                    { name: "Asana Academy", url: "https://academy.asana.com/", type: "Course" }
                ]
            },
            {
                id: 89,
                title: "Communication & Leadership",
                description: "Lead teams and manage stakeholders",
                duration: "2-3 weeks",
                resources: [
                    { name: "Leadership Skills", url: "https://www.coursera.org/learn/leadership-skills", type: "Course" },
                    { name: "PM Communication", url: "https://www.youtube.com/results?search_query=project+manager+communication", type: "Video" }
                ]
            },
            {
                id: 90,
                title: "Certification & Job Search",
                description: "Get certified and land PM jobs",
                duration: "Ongoing",
                resources: [
                    { name: "PMP Certification", url: "https://www.pmi.org/certifications/project-management-pmp", type: "Certification" },
                    { name: "PM Jobs", url: "https://www.linkedin.com/jobs/project-manager-jobs/", type: "Platform" },
                    { name: "Remote PM Jobs", url: "https://remote.co/remote-jobs/project-management/", type: "Platform" }
                ]
            }
        ]
    },
    "qa tester": {
        title: "QA Tester / Software Tester",
        category: "corporate",
        description: "Test software and ensure quality - easy entry into tech!",
        duration: "2-4 months",
        difficulty: "Beginner",
        items: [
            {
                id: 91,
                title: "QA Testing Fundamentals",
                description: "Testing basics, types, and methodologies",
                duration: "1-2 weeks",
                resources: [
                    { name: "Software Testing Tutorial", url: "https://www.guru99.com/software-testing.html", type: "Tutorial" },
                    { name: "QA Basics", url: "https://www.youtube.com/results?search_query=qa+testing+tutorial", type: "Video" },
                    { name: "Testing Types", url: "https://www.softwaretestinghelp.com/types-of-software-testing/", type: "Guide" }
                ]
            },
            {
                id: 92,
                title: "Manual Testing",
                description: "Test cases, bug reporting, and documentation",
                duration: "2-3 weeks",
                resources: [
                    { name: "Manual Testing", url: "https://www.guru99.com/manual-testing.html", type: "Tutorial" },
                    { name: "Test Case Writing", url: "https://www.youtube.com/results?search_query=test+case+writing", type: "Video" },
                    { name: "Bug Reporting", url: "https://www.softwaretestinghelp.com/how-to-write-good-bug-report/", type: "Guide" }
                ]
            },
            {
                id: 93,
                title: "Testing Tools",
                description: "Jira, TestRail, Postman, and browser tools",
                duration: "2 weeks",
                resources: [
                    { name: "Jira for QA", url: "https://www.atlassian.com/software/jira/guides/getting-started/basics", type: "Guide" },
                    { name: "Postman API Testing", url: "https://learning.postman.com/", type: "Tutorial" },
                    { name: "Chrome DevTools", url: "https://developer.chrome.com/docs/devtools/", type: "Documentation" }
                ]
            },
            {
                id: 94,
                title: "Automation Testing Basics",
                description: "Introduction to Selenium and automation",
                duration: "3-4 weeks",
                resources: [
                    { name: "Selenium Tutorial", url: "https://www.selenium.dev/documentation/", type: "Documentation" },
                    { name: "Automation Testing", url: "https://www.youtube.com/results?search_query=selenium+tutorial", type: "Video" },
                    { name: "Test Automation", url: "https://testautomationu.applitools.com/", type: "Course" }
                ]
            },
            {
                id: 95,
                title: "Get QA Jobs",
                description: "Build resume and land QA tester positions",
                duration: "Ongoing",
                resources: [
                    { name: "QA Resume Tips", url: "https://www.youtube.com/results?search_query=qa+tester+resume", type: "Video" },
                    { name: "QA Jobs", url: "https://www.indeed.com/q-QA-Tester-jobs.html", type: "Platform" },
                    { name: "Remote QA Jobs", url: "https://remote.co/remote-jobs/qa/", type: "Platform" }
                ]
            }
        ]
    },
    "customer support": {
        title: "Customer Support Specialist",
        category: "corporate",
        description: "Help customers and work remotely - always hiring!",
        duration: "1-2 months",
        difficulty: "Beginner",
        items: [
            {
                id: 96,
                title: "Customer Service Fundamentals",
                description: "Communication, empathy, and problem-solving",
                duration: "1-2 weeks",
                resources: [
                    { name: "Customer Service Skills", url: "https://www.coursera.org/learn/customer-service", type: "Course" },
                    { name: "Support Basics", url: "https://www.youtube.com/results?search_query=customer+service+training", type: "Video" },
                    { name: "Help Scout Guide", url: "https://www.helpscout.com/helpu/", type: "Resources" }
                ]
            },
            {
                id: 97,
                title: "Support Tools & Software",
                description: "Zendesk, Intercom, Freshdesk, and ticketing systems",
                duration: "1 week",
                resources: [
                    { name: "Zendesk Training", url: "https://support.zendesk.com/hc/en-us/categories/360001075048-Training", type: "Tutorial" },
                    { name: "Intercom Academy", url: "https://www.intercom.com/academy", type: "Course" },
                    { name: "Support Tools", url: "https://www.youtube.com/results?search_query=customer+support+tools", type: "Video" }
                ]
            },
            {
                id: 98,
                title: "Email & Chat Support",
                description: "Written communication and response templates",
                duration: "1 week",
                resources: [
                    { name: "Email Support", url: "https://www.helpscout.com/blog/customer-service-email/", type: "Guide" },
                    { name: "Chat Support Tips", url: "https://www.youtube.com/results?search_query=chat+support+tips", type: "Video" }
                ]
            },
            {
                id: 99,
                title: "Phone & Video Support",
                description: "Voice communication and video calls",
                duration: "1 week",
                resources: [
                    { name: "Phone Support Skills", url: "https://www.youtube.com/results?search_query=phone+support+training", type: "Video" },
                    { name: "Call Center Training", url: "https://www.coursera.org/learn/call-center-training", type: "Course" }
                ]
            },
            {
                id: 100,
                title: "Find Remote Support Jobs",
                description: "Land customer support positions",
                duration: "Ongoing",
                resources: [
                    { name: "Support Jobs", url: "https://www.indeed.com/q-Customer-Support-Remote-jobs.html", type: "Platform" },
                    { name: "Remote Support", url: "https://remote.co/remote-jobs/customer-service/", type: "Platform" },
                    { name: "Support Resume", url: "https://www.youtube.com/results?search_query=customer+support+resume", type: "Video" }
                ]
            }
        ]
    },
    "business analyst": {
        title: "Business Analyst",
        category: "corporate",
        description: "Bridge between business and technology teams",
        duration: "3-5 months",
        difficulty: "Intermediate",
        items: [
            {
                id: 101,
                title: "Business Analysis Fundamentals",
                description: "BA role, responsibilities, and core concepts",
                duration: "2-3 weeks",
                resources: [
                    { name: "BA Guide", url: "https://www.iiba.org/professional-development/career-centre/what-is-business-analysis/", type: "Guide" },
                    { name: "BA Tutorial", url: "https://www.youtube.com/results?search_query=business+analyst+tutorial", type: "Video" },
                    { name: "BA Basics", url: "https://www.bridging-the-gap.com/business-analyst-training/", type: "Course" }
                ]
            },
            {
                id: 102,
                title: "Requirements Gathering",
                description: "Elicit, document, and manage requirements",
                duration: "2-3 weeks",
                resources: [
                    { name: "Requirements Guide", url: "https://www.modernanalyst.com/Resources/Articles/tabid/115/Default.aspx", type: "Articles" },
                    { name: "User Stories", url: "https://www.youtube.com/results?search_query=user+stories+tutorial", type: "Video" }
                ]
            },
            {
                id: 103,
                title: "Process Modeling & Documentation",
                description: "Flowcharts, diagrams, and documentation",
                duration: "2 weeks",
                resources: [
                    { name: "Process Modeling", url: "https://www.lucidchart.com/pages/business-process-modeling", type: "Guide" },
                    { name: "UML Diagrams", url: "https://www.youtube.com/results?search_query=uml+diagrams", type: "Video" }
                ]
            },
            {
                id: 104,
                title: "Data Analysis & SQL",
                description: "Analyze data and create reports",
                duration: "2-3 weeks",
                resources: [
                    { name: "SQL for BA", url: "https://www.w3schools.com/sql/", type: "Tutorial" },
                    { name: "Excel for BA", url: "https://www.youtube.com/results?search_query=excel+for+business+analyst", type: "Video" }
                ]
            },
            {
                id: 105,
                title: "BA Certification & Jobs",
                description: "Get certified and land BA positions",
                duration: "Ongoing",
                resources: [
                    { name: "CBAP Certification", url: "https://www.iiba.org/business-analysis-certifications/cbap/", type: "Certification" },
                    { name: "BA Jobs", url: "https://www.linkedin.com/jobs/business-analyst-jobs/", type: "Platform" },
                    { name: "Remote BA Jobs", url: "https://remote.co/remote-jobs/analyst/", type: "Platform" }
                ]
            }
        ]
    }
};

let userProgress = {
    completedItems: new Set(),
    totalItems: 0,
    currentPath: null,
    favorites: new Set(),
    notes: {}
};

// Dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Toggle icons
    document.querySelector('.sun-icon').style.display = isDark ? 'none' : 'block';
    document.querySelector('.moon-icon').style.display = isDark ? 'block' : 'none';
}

// Load theme
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.sun-icon').style.display = 'none';
        document.querySelector('.moon-icon').style.display = 'block';
    }
}

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('learnPathProgress');
    if (saved) {
        const data = JSON.parse(saved);
        userProgress.completedItems = new Set(data.completedItems || []);
        userProgress.currentPath = data.currentPath;
        userProgress.favorites = new Set(data.favorites || []);
        userProgress.notes = data.notes || {};
    }
}

// Save progress to localStorage
function saveProgress() {
    const data = {
        completedItems: Array.from(userProgress.completedItems),
        currentPath: userProgress.currentPath,
        favorites: Array.from(userProgress.favorites),
        notes: userProgress.notes
    };
    localStorage.setItem('learnPathProgress', JSON.stringify(data));
}

// Favorites functionality
function toggleFavorite() {
    const pathKey = userProgress.currentPath;
    if (!pathKey) return;
    
    const favoriteBtn = document.getElementById('favoriteBtn');
    const heartOutline = favoriteBtn.querySelector('.heart-outline');
    const heartFilled = favoriteBtn.querySelector('.heart-filled');
    
    if (userProgress.favorites.has(pathKey)) {
        userProgress.favorites.delete(pathKey);
        heartOutline.style.display = 'block';
        heartFilled.style.display = 'none';
        favoriteBtn.classList.remove('favorited');
    } else {
        userProgress.favorites.add(pathKey);
        heartOutline.style.display = 'none';
        heartFilled.style.display = 'block';
        favoriteBtn.classList.add('favorited');
    }
    
    saveProgress();
}

function updateFavoriteButton() {
    const pathKey = userProgress.currentPath;
    if (!pathKey) return;
    
    const favoriteBtn = document.getElementById('favoriteBtn');
    const heartOutline = favoriteBtn.querySelector('.heart-outline');
    const heartFilled = favoriteBtn.querySelector('.heart-filled');
    
    if (userProgress.favorites.has(pathKey)) {
        heartOutline.style.display = 'none';
        heartFilled.style.display = 'block';
        favoriteBtn.classList.add('favorited');
    } else {
        heartOutline.style.display = 'block';
        heartFilled.style.display = 'none';
        favoriteBtn.classList.remove('favorited');
    }
}

// Notes functionality
function addNoteToStep(itemId) {
    const note = prompt('Add a note for this step:');
    if (note !== null && note.trim() !== '') {
        userProgress.notes[itemId] = note.trim();
        saveProgress();
        // Refresh the roadmap to show the note
        generateRoadmap();
    }
}

function deleteNote(itemId) {
    if (confirm('Delete this note?')) {
        delete userProgress.notes[itemId];
        saveProgress();
        generateRoadmap();
    }
}

// Category functions
function showCategory(categoryKey) {
    const category = categories[categoryKey];
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryTitle');
    const pathsContainer = document.getElementById('categoryPaths');
    
    title.textContent = category.name;
    pathsContainer.innerHTML = '';
    
    category.paths.forEach(pathKey => {
        const path = learningPaths[pathKey];
        const pathCard = document.createElement('div');
        pathCard.className = 'path-card';
        pathCard.onclick = () => {
            document.getElementById('learningGoal').value = pathKey;
            closeCategory();
            generateRoadmap();
        };
        
        pathCard.innerHTML = `
            <h4>${path ? path.title : pathKey.charAt(0).toUpperCase() + pathKey.slice(1)}</h4>
            <p>${path ? path.description : 'Comprehensive learning path'}</p>
            <div class="path-meta">
                <span>${path ? path.difficulty : 'All Levels'}</span>
                <span>•</span>
                <span>${path ? path.duration : '3-6 months'}</span>
            </div>
        `;
        pathsContainer.appendChild(pathCard);
    });
    
    modal.style.display = 'flex';
}

function closeCategory() {
    document.getElementById('categoryModal').style.display = 'none';
}

function backToHome() {
    document.getElementById('roadmap').style.display = 'none';
    document.getElementById('welcomeState').style.display = 'block';
}

function quickSelect(topic) {
    document.getElementById('learningGoal').value = topic;
    generateRoadmap();
}

function shareRoadmap() {
    const input = document.getElementById('learningGoal').value;
    const url = window.location.href;
    const text = `Check out my learning roadmap for ${input}!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'LearnPath AI',
            text: text,
            url: url
        }).catch(() => {});
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${text} ${url}`).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

function generateRoadmap() {
    const input = document.getElementById('learningGoal').value.toLowerCase().trim();
    
    if (!input) {
        alert('Please enter a topic you want to learn!');
        return;
    }

    const roadmapContent = document.getElementById('roadmapContent');
    const roadmapSection = document.getElementById('roadmap');
    const welcomeState = document.getElementById('welcomeState');
    const roadmapTitle = document.getElementById('roadmapTitle');
    
    roadmapContent.innerHTML = '';

    let path = null;
    let pathKey = null;
    
    for (const [key, value] of Object.entries(learningPaths)) {
        if (input.includes(key)) {
            path = value;
            pathKey = key;
            break;
        }
    }

    if (!path) {
        path = generateGenericRoadmap(input);
        pathKey = 'custom';
    }

    userProgress.currentPath = pathKey;
    userProgress.totalItems = path.items.length;

    welcomeState.style.display = 'none';
    roadmapSection.style.display = 'block';
    roadmapTitle.textContent = path.title || `Learning Path: ${input}`;

    const infoHeader = document.createElement('div');
    infoHeader.className = 'roadmap-info';
    infoHeader.innerHTML = `
        <p class="roadmap-description">${path.description || 'Your personalized learning journey'}</p>
        <div class="roadmap-meta">
            <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
                    <path d="M10 6v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                ${path.duration || '3-6 months'}
            </span>
            <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                ${path.difficulty || 'All Levels'}
            </span>
            <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M3 7h14M3 12h14M7 3v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                ${path.items.length} Steps
            </span>
        </div>
    `;
    roadmapContent.appendChild(infoHeader);

    path.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'roadmap-item';
        itemElement.id = `roadmap-item-${item.id}`;
        
        const isCompleted = userProgress.completedItems.has(item.id);
        if (isCompleted) {
            itemElement.classList.add('completed');
        }

        const hasNote = userProgress.notes[item.id];
        
        itemElement.innerHTML = `
            <div class="item-header">
                <div class="item-number">${index + 1}</div>
                <div class="item-main">
                    <div class="item-title-row">
                        <h3 class="item-title">${item.title}</h3>
                        <div class="item-actions">
                            <button class="note-btn" onclick="addNoteToStep(${item.id})" title="Add note">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7l-3-5z" stroke="currentColor" stroke-width="2"/>
                                    <path d="M13 2v5h5" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <label class="checkbox-wrapper">
                                <input type="checkbox" class="checkbox" id="item${item.id}" 
                                       ${isCompleted ? 'checked' : ''}
                                       onchange="updateProgress(${item.id})">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <p class="item-description">${item.description || ''}</p>
                    ${item.duration ? `<span class="item-duration">⏱️ ${item.duration}</span>` : ''}
                    ${hasNote ? `
                        <div class="note-container">
                            <div class="note-header">
                                <span class="note-icon">📝</span>
                                <span class="note-label">Your Note:</span>
                                <button class="delete-note-btn" onclick="deleteNote(${item.id})" title="Delete note">×</button>
                            </div>
                            <p class="note-text">${hasNote}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="item-resources">
                <h4>📚 Resources:</h4>
                <div class="resource-grid">
                    ${item.resources.map(resource => `
                        <a href="${resource.url}" target="_blank" class="resource-card">
                            <span class="resource-name">${resource.name}</span>
                            <span class="resource-type">${resource.type || 'Resource'}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        roadmapContent.appendChild(itemElement);
    });

    updateProgressBar();
    updateFavoriteButton();
    saveProgress();
    roadmapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateGenericRoadmap(topic) {
    return {
        title: `Learning Path: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        description: `A comprehensive guide to mastering ${topic}`,
        duration: "3-6 months",
        difficulty: "All Levels",
        items: [
            {
                id: 100,
                title: "Fundamentals & Basics",
                description: `Start with the core concepts and foundations of ${topic}`,
                duration: "2-4 weeks",
                resources: [
                    { name: "Google Search", url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' tutorial')}`, type: "Search" },
                    { name: "YouTube Tutorials", url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' tutorial')}`, type: "Video" },
                    { name: "Reddit Community", url: `https://www.reddit.com/search/?q=${encodeURIComponent(topic)}`, type: "Community" }
                ]
            },
            {
                id: 101,
                title: "Intermediate Concepts",
                description: `Dive deeper into ${topic} with more advanced topics`,
                duration: "4-6 weeks",
                resources: [
                    { name: "Online Courses", url: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}`, type: "Course" },
                    { name: "Udemy", url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}`, type: "Course" },
                    { name: "Documentation", url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' documentation')}`, type: "Docs" }
                ]
            },
            {
                id: 102,
                title: "Hands-On Practice",
                description: "Apply your knowledge through practical projects",
                duration: "4-8 weeks",
                resources: [
                    { name: "Project Ideas", url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' project ideas')}`, type: "Projects" },
                    { name: "GitHub Repositories", url: `https://github.com/search?q=${encodeURIComponent(topic)}`, type: "Code" },
                    { name: "Stack Overflow", url: `https://stackoverflow.com/search?q=${encodeURIComponent(topic)}`, type: "Q&A" }
                ]
            },
            {
                id: 103,
                title: "Advanced Topics & Specialization",
                description: `Master advanced concepts and specialize in ${topic}`,
                duration: "6-12 weeks",
                resources: [
                    { name: "Advanced Tutorials", url: `https://www.google.com/search?q=${encodeURIComponent('advanced ' + topic)}`, type: "Tutorial" },
                    { name: "Books & Publications", url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' books')}`, type: "Books" },
                    { name: "Research Papers", url: `https://scholar.google.com/scholar?q=${encodeURIComponent(topic)}`, type: "Research" }
                ]
            },
            {
                id: 104,
                title: "Real-World Application",
                description: "Build portfolio projects and contribute to the community",
                duration: "Ongoing",
                resources: [
                    { name: "Portfolio Projects", url: `https://www.google.com/search?q=${encodeURIComponent(topic + ' portfolio projects')}`, type: "Projects" },
                    { name: "Open Source", url: `https://github.com/topics/${encodeURIComponent(topic.replace(/\s+/g, '-'))}`, type: "Contribute" },
                    { name: "Community Forums", url: `https://www.reddit.com/search/?q=${encodeURIComponent(topic)}`, type: "Community" }
                ]
            }
        ]
    };
}

function updateProgress(itemId) {
    const checkbox = document.getElementById(`item${itemId}`);
    const itemElement = document.getElementById(`roadmap-item-${itemId}`);
    
    if (checkbox.checked) {
        userProgress.completedItems.add(itemId);
        itemElement.classList.add('completed');
    } else {
        userProgress.completedItems.delete(itemId);
        itemElement.classList.remove('completed');
    }

    updateProgressBar();
    saveProgress();
}

function updateProgressBar() {
    if (userProgress.totalItems === 0) return;
    
    const progress = (userProgress.completedItems.size / userProgress.totalItems) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}% Complete`;
}

function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
        userProgress.completedItems.clear();
        updateProgressBar();
        saveProgress();
        
        document.querySelectorAll('.checkbox').forEach(cb => {
            cb.checked = false;
        });
        
        document.querySelectorAll('.roadmap-item').forEach(item => {
            item.classList.remove('completed');
        });
    }
}

function exportRoadmap() {
    const input = document.getElementById('learningGoal').value;
    const path = learningPaths[userProgress.currentPath] || { title: input };
    
    let exportText = `${path.title}\n${'='.repeat(path.title.length)}\n\n`;
    exportText += `Progress: ${userProgress.completedItems.size}/${userProgress.totalItems} steps completed\n\n`;
    
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach((item, index) => {
        if (index === 0) return;
        
        const title = item.querySelector('.item-title').textContent;
        const description = item.querySelector('.item-description')?.textContent || '';
        const isCompleted = item.classList.contains('completed');
        
        exportText += `${isCompleted ? '✅' : '⬜'} ${title}\n`;
        if (description) exportText += `   ${description}\n`;
        
        const resources = item.querySelectorAll('.resource-card');
        if (resources.length > 0) {
            exportText += '   Resources:\n';
            resources.forEach(resource => {
                const name = resource.querySelector('.resource-name').textContent;
                const url = resource.href;
                exportText += `   - ${name}: ${url}\n`;
            });
        }
        exportText += '\n';
    });
    
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-roadmap-${userProgress.currentPath || 'custom'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadProgress();
    
    const input = document.getElementById('learningGoal');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateRoadmap();
        }
    });
});
