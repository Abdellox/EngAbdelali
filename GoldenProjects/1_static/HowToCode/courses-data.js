// Complete course data for all programming languages
const coursesData = {
    cpp: {
        name: "C++ Programming",
        icon: "fas fa-star",
        description: "Master C++ - the mother of languages. Learn memory management, OOP, and build high-performance applications.",
        levels: {
            1: {
                title: "Beginner Level - Foundation",
                duration: "4-6 weeks",
                goal: "Write simple programs on your own",
                topics: [
                    {
                        title: "Getting Started",
                        items: ["What is C++ and why learn it", "Installing IDE (Visual Studio/Code::Blocks)", "Your first program - Hello World", "Understanding compilation process"]
                    },
                    {
                        title: "Basic Syntax",
                        items: ["Variables and data types (int, float, char, bool)", "Input/output with cin and cout", "Operators (arithmetic, logical, relational)", "Comments and code formatting"]
                    },
                    {
                        title: "Control Flow",
                        items: ["If-else statements", "Switch statements", "For loops", "While and do-while loops", "Break and continue"]
                    },
                    {
                        title: "Functions & Arrays",
                        items: ["Function declaration and definition", "Parameters and return values", "Arrays basics", "Simple problem solving"]
                    }
                ]
            },
            2: {
                title: "Intermediate Level - Core Skills",
                duration: "6-8 weeks",
                goal: "Build medium-sized programs with proper structure",
                topics: [
                    {
                        title: "Data Structures",
                        items: ["Multidimensional arrays", "Strings and string manipulation", "Vectors and STL containers", "Sets and maps"]
                    },
                    {
                        title: "Object-Oriented Programming",
                        items: ["Classes and objects", "Constructors and destructors", "Encapsulation", "Inheritance", "Polymorphism"]
                    },
                    {
                        title: "File Handling & Errors",
                        items: ["Reading and writing files", "File streams", "Exception handling (try-catch)", "Error debugging techniques"]
                    },
                    {
                        title: "Modular Programming",
                        items: ["Header files", "Namespaces", "Function overloading", "Using external libraries"]
                    }
                ]
            },
            3: {
                title: "Advanced Level - Deep Concepts",
                duration: "8-10 weeks",
                goal: "Build efficient, scalable software",
                topics: [
                    {
                        title: "Memory Management",
                        items: ["Pointers and references", "Dynamic memory allocation", "Memory leaks prevention", "Smart pointers"]
                    },
                    {
                        title: "Advanced Data Structures",
                        items: ["Linked lists", "Stacks and queues", "Trees and binary search trees", "Graphs", "Hash tables"]
                    },
                    {
                        title: "Algorithms",
                        items: ["Searching algorithms", "Sorting algorithms", "Recursion optimization", "Dynamic programming", "Time complexity analysis"]
                    },
                    {
                        title: "Advanced OOP",
                        items: ["Virtual functions", "Abstract classes", "Operator overloading", "Templates", "Design patterns basics"]
                    }
                ]
            },
            4: {
                title: "Expert Level - Specialization",
                duration: "10-12 weeks",
                goal: "Become a specialist in your chosen field",
                specializations: [
                    {
                        title: "Game Development",
                        icon: "fas fa-gamepad",
                        items: ["Game engines (Unreal Engine)", "Game physics", "Graphics programming", "3D mathematics"]
                    },
                    {
                        title: "System Programming",
                        icon: "fas fa-server",
                        items: ["Operating system concepts", "Multithreading", "Network programming", "Low-level optimization"]
                    },
                    {
                        title: "Embedded Systems",
                        icon: "fas fa-microchip",
                        items: ["Microcontroller programming", "Real-time systems", "Hardware interfacing", "IoT applications"]
                    },
                    {
                        title: "High-Performance Computing",
                        icon: "fas fa-bolt",
                        items: ["Parallel programming", "GPU programming", "Performance optimization", "Scientific computing"]
                    }
                ]
            },
            5: {
                title: "Professional Level - Real-World Skills",
                duration: "Ongoing",
                goal: "Work as a professional C++ developer",
                topics: [
                    {
                        title: "Software Development",
                        items: ["Building complete applications", "Software architecture", "Design patterns", "Code review practices"]
                    },
                    {
                        title: "Version Control & Collaboration",
                        items: ["Git and GitHub mastery", "Team collaboration", "Code documentation", "Agile methodologies"]
                    },
                    {
                        title: "Testing & Deployment",
                        items: ["Unit testing", "Integration testing", "Debugging tools", "CI/CD pipelines", "Performance profiling"]
                    },
                    {
                        title: "Best Practices",
                        items: ["Clean code principles", "SOLID principles", "Security best practices", "Cross-platform development"]
                    }
                ]
            }
        }
    },
    
    python: {
        name: "Python Programming",
        icon: "fab fa-python",
        description: "Learn Python - the most versatile language for AI, data science, web development, and automation.",
        levels: {
            1: {
                title: "Beginner Level - Foundation",
                duration: "3-4 weeks",
                goal: "Write simple Python scripts independently",
                topics: [
                    {
                        title: "Getting Started",
                        items: ["What is Python and why it's popular", "Installing Python and IDE (PyCharm/VS Code)", "Your first program", "Python interactive shell"]
                    },
                    {
                        title: "Basic Syntax",
                        items: ["Variables and data types", "Strings and string methods", "Numbers and math operations", "Input and output", "Comments"]
                    },
                    {
                        title: "Control Flow",
                        items: ["If-elif-else statements", "For loops", "While loops", "Break, continue, pass", "List comprehensions"]
                    },
                    {
                        title: "Functions & Collections",
                        items: ["Defining functions", "Lists and tuples", "Dictionaries and sets", "Basic problem solving"]
                    }
                ]
            },
            2: {
                title: "Intermediate Level - Core Skills",
                duration: "5-6 weeks",
                goal: "Build functional applications with proper structure",
                topics: [
                    {
                        title: "Data Structures",
                        items: ["Advanced list operations", "Dictionary methods", "Sets operations", "Collections module", "Iterators and generators"]
                    },
                    {
                        title: "Object-Oriented Programming",
                        items: ["Classes and objects", "Inheritance and polymorphism", "Encapsulation", "Magic methods", "Property decorators"]
                    },
                    {
                        title: "File Handling & Errors",
                        items: ["Reading and writing files", "Working with CSV and JSON", "Exception handling", "Context managers", "Logging"]
                    },
                    {
                        title: "Modules & Packages",
                        items: ["Importing modules", "Creating packages", "Virtual environments", "pip and package management", "Popular libraries overview"]
                    }
                ]
            },
            3: {
                title: "Advanced Level - Deep Concepts",
                duration: "6-8 weeks",
                goal: "Build efficient, professional applications",
                topics: [
                    {
                        title: "Advanced Python Features",
                        items: ["Decorators", "Generators and iterators", "Context managers", "Metaclasses", "Descriptors"]
                    },
                    {
                        title: "Data Structures & Algorithms",
                        items: ["Algorithm complexity", "Sorting and searching", "Trees and graphs", "Dynamic programming", "Recursion patterns"]
                    },
                    {
                        title: "Concurrency",
                        items: ["Threading", "Multiprocessing", "Asyncio", "Concurrent futures", "GIL understanding"]
                    },
                    {
                        title: "Testing & Debugging",
                        items: ["Unit testing with pytest", "Mocking", "Debugging techniques", "Profiling code", "Type hints"]
                    }
                ]
            },
            4: {
                title: "Expert Level - Specialization",
                duration: "8-12 weeks",
                goal: "Master a specific Python domain",
                specializations: [
                    {
                        title: "Data Science & AI",
                        icon: "fas fa-brain",
                        items: ["NumPy and Pandas", "Machine learning with scikit-learn", "Deep learning with TensorFlow/PyTorch", "Data visualization"]
                    },
                    {
                        title: "Web Development",
                        icon: "fas fa-globe",
                        items: ["Django framework", "Flask framework", "REST APIs", "Database integration", "Authentication"]
                    },
                    {
                        title: "Automation & Scripting",
                        icon: "fas fa-robot",
                        items: ["Web scraping", "Task automation", "System administration", "DevOps tools", "CI/CD"]
                    },
                    {
                        title: "Data Engineering",
                        icon: "fas fa-database",
                        items: ["ETL pipelines", "Big data tools", "Apache Spark", "Data warehousing", "Cloud platforms"]
                    }
                ]
            },
            5: {
                title: "Professional Level - Real-World Skills",
                duration: "Ongoing",
                goal: "Work as a professional Python developer",
                topics: [
                    {
                        title: "Software Engineering",
                        items: ["Design patterns", "Architecture patterns", "Microservices", "API design", "Documentation"]
                    },
                    {
                        title: "DevOps & Deployment",
                        items: ["Docker containers", "Kubernetes basics", "AWS/Azure/GCP", "CI/CD pipelines", "Monitoring"]
                    },
                    {
                        title: "Testing & Quality",
                        items: ["TDD practices", "Integration testing", "Performance testing", "Code coverage", "Security testing"]
                    },
                    {
                        title: "Best Practices",
                        items: ["PEP 8 style guide", "Clean code", "Git workflows", "Code reviews", "Team collaboration"]
                    }
                ]
            }
        }
    },
    
    javascript: {
        name: "JavaScript Programming",
        icon: "fab fa-js",
        description: "Master JavaScript - the language of the web. Build interactive websites and full-stack applications.",
        levels: {
            1: {
                title: "Beginner Level - Foundation",
                duration: "4-5 weeks",
                goal: "Create interactive web pages",
                topics: [
                    {
                        title: "Getting Started",
                        items: ["What is JavaScript", "Setting up environment", "Browser console", "Your first script", "Linking JS to HTML"]
                    },
                    {
                        title: "Basic Syntax",
                        items: ["Variables (let, const, var)", "Data types", "Operators", "Template literals", "Type conversion"]
                    },
                    {
                        title: "Control Flow",
                        items: ["If-else statements", "Switch statements", "For and while loops", "Break and continue", "Ternary operator"]
                    },
                    {
                        title: "Functions & Arrays",
                        items: ["Function declaration", "Arrow functions", "Arrays and methods", "DOM manipulation basics", "Event handling"]
                    }
                ]
            },
            2: {
                title: "Intermediate Level - Core Skills",
                duration: "6-7 weeks",
                goal: "Build dynamic web applications",
                topics: [
                    {
                        title: "Advanced Functions",
                        items: ["Closures", "Callbacks", "Higher-order functions", "Function scope", "IIFE"]
                    },
                    {
                        title: "Objects & OOP",
                        items: ["Objects and properties", "Prototypes", "Classes", "Inheritance", "this keyword", "Getters and setters"]
                    },
                    {
                        title: "Asynchronous JavaScript",
                        items: ["Callbacks", "Promises", "Async/await", "Fetch API", "Error handling"]
                    },
                    {
                        title: "DOM & Events",
                        items: ["Advanced DOM manipulation", "Event delegation", "Form handling", "Local storage", "Browser APIs"]
                    }
                ]
            },
            3: {
                title: "Advanced Level - Deep Concepts",
                duration: "7-9 weeks",
                goal: "Build professional web applications",
                topics: [
                    {
                        title: "Modern JavaScript",
                        items: ["ES6+ features", "Modules", "Destructuring", "Spread/rest operators", "Optional chaining", "Nullish coalescing"]
                    },
                    {
                        title: "Advanced Patterns",
                        items: ["Design patterns", "Module pattern", "Observer pattern", "Singleton", "Factory pattern"]
                    },
                    {
                        title: "Performance & Optimization",
                        items: ["Memory management", "Event loop", "Debouncing and throttling", "Lazy loading", "Code splitting"]
                    },
                    {
                        title: "Testing",
                        items: ["Jest testing", "Unit tests", "Integration tests", "Mocking", "TDD approach"]
                    }
                ]
            },
            4: {
                title: "Expert Level - Specialization",
                duration: "10-12 weeks",
                goal: "Master modern JavaScript frameworks",
                specializations: [
                    {
                        title: "Frontend Development",
                        icon: "fas fa-desktop",
                        items: ["React.js", "Vue.js", "Angular", "State management", "Component architecture"]
                    },
                    {
                        title: "Backend Development",
                        icon: "fas fa-server",
                        items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Database integration"]
                    },
                    {
                        title: "Full-Stack Development",
                        icon: "fas fa-layer-group",
                        items: ["MERN/MEAN stack", "Authentication", "Real-time apps", "WebSockets", "Deployment"]
                    },
                    {
                        title: "Mobile Development",
                        icon: "fas fa-mobile-alt",
                        items: ["React Native", "Ionic", "Progressive Web Apps", "Mobile-first design"]
                    }
                ]
            },
            5: {
                title: "Professional Level - Real-World Skills",
                duration: "Ongoing",
                goal: "Work as a professional JavaScript developer",
                topics: [
                    {
                        title: "Software Architecture",
                        items: ["Microservices", "Serverless", "Design patterns", "Clean architecture", "API design"]
                    },
                    {
                        title: "DevOps & Tools",
                        items: ["Webpack/Vite", "Docker", "CI/CD", "Cloud deployment", "Monitoring"]
                    },
                    {
                        title: "Testing & Quality",
                        items: ["E2E testing", "Performance testing", "Accessibility", "Security best practices", "Code reviews"]
                    },
                    {
                        title: "Team Collaboration",
                        items: ["Git workflows", "Agile methodologies", "Code documentation", "Technical writing", "Mentoring"]
                    }
                ]
            }
        }
    }
};

// Add more market-demanded languages
coursesData.java = {
    name: "Java Programming",
    icon: "fab fa-java",
    description: "Learn Java - build enterprise applications, Android apps, and large-scale systems.",
    levels: {
        1: {
            title: "Beginner Level - Foundation",
            duration: "4-6 weeks",
            goal: "Write simple Java programs",
            topics: [
                {title: "Getting Started", items: ["JDK installation", "IDE setup (IntelliJ/Eclipse)", "First Java program", "Compilation process"]},
                {title: "Basic Syntax", items: ["Variables and data types", "Operators", "Input/output", "Type casting"]},
                {title: "Control Flow", items: ["If-else", "Switch", "Loops (for, while, do-while)", "Break and continue"]},
                {title: "Methods & Arrays", items: ["Method declaration", "Parameters", "Arrays", "String basics"]}
            ]
        },
        2: {
            title: "Intermediate Level - Core Skills",
            duration: "6-8 weeks",
            goal: "Build object-oriented applications",
            topics: [
                {title: "OOP Fundamentals", items: ["Classes and objects", "Constructors", "Encapsulation", "Inheritance", "Polymorphism"]},
                {title: "Advanced OOP", items: ["Abstract classes", "Interfaces", "Inner classes", "Packages"]},
                {title: "Collections Framework", items: ["ArrayList", "HashMap", "HashSet", "Iterators", "Generics"]},
                {title: "Exception Handling", items: ["Try-catch", "Custom exceptions", "File I/O", "Serialization"]}
            ]
        },
        3: {
            title: "Advanced Level - Deep Concepts",
            duration: "8-10 weeks",
            goal: "Build enterprise-grade applications",
            topics: [
                {title: "Advanced Java", items: ["Multithreading", "Concurrency", "Lambda expressions", "Streams API", "Functional programming"]},
                {title: "Data Structures", items: ["Trees", "Graphs", "Algorithms", "Design patterns"]},
                {title: "Database", items: ["JDBC", "SQL", "Hibernate", "JPA"]},
                {title: "Web Development", items: ["Servlets", "JSP", "Spring basics", "REST APIs"]}
            ]
        },
        4: {
            title: "Expert Level - Specialization",
            duration: "10-12 weeks",
            goal: "Master Java specialization",
            specializations: [
                {title: "Enterprise Development", icon: "fas fa-building", items: ["Spring Boot", "Microservices", "Spring Cloud", "Security"]},
                {title: "Android Development", icon: "fab fa-android", items: ["Android SDK", "Activities", "Fragments", "Material Design"]},
                {title: "Big Data", icon: "fas fa-database", items: ["Hadoop", "Spark", "Kafka", "Data processing"]},
                {title: "Cloud Development", icon: "fas fa-cloud", items: ["AWS", "Azure", "Kubernetes", "Serverless"]}
            ]
        },
        5: {
            title: "Professional Level - Real-World Skills",
            duration: "Ongoing",
            goal: "Work as professional Java developer",
            topics: [
                {title: "Architecture", items: ["Design patterns", "Microservices", "Clean architecture", "Domain-driven design"]},
                {title: "DevOps", items: ["Maven/Gradle", "Docker", "Jenkins", "CI/CD", "Monitoring"]},
                {title: "Testing", items: ["JUnit", "Mockito", "Integration testing", "Performance testing"]},
                {title: "Best Practices", items: ["Code quality", "Security", "Documentation", "Team collaboration"]}
            ]
        }
    }
};

coursesData.csharp = {
    name: "C# Programming",
    icon: "fas fa-hashtag",
    description: "Master C# - build games with Unity, .NET applications, and enterprise software.",
    levels: {
        1: {
            title: "Beginner Level - Foundation",
            duration: "4-5 weeks",
            goal: "Write basic C# programs",
            topics: [
                {title: "Getting Started", items: [".NET installation", "Visual Studio setup", "First C# program", "Console applications"]},
                {title: "Basic Syntax", items: ["Variables and types", "Operators", "Input/output", "String manipulation"]},
                {title: "Control Flow", items: ["If-else", "Switch", "Loops", "Break and continue"]},
                {title: "Methods & Arrays", items: ["Method definition", "Parameters", "Arrays", "Collections basics"]}
            ]
        },
        2: {
            title: "Intermediate Level - Core Skills",
            duration: "6-7 weeks",
            goal: "Build Windows applications",
            topics: [
                {title: "OOP in C#", items: ["Classes and objects", "Properties", "Inheritance", "Polymorphism", "Interfaces"]},
                {title: "Advanced Features", items: ["Delegates", "Events", "Lambda expressions", "LINQ", "Generics"]},
                {title: "Collections", items: ["List", "Dictionary", "Queue", "Stack", "IEnumerable"]},
                {title: "File & Data", items: ["File I/O", "Serialization", "JSON", "XML", "Exception handling"]}
            ]
        },
        3: {
            title: "Advanced Level - Deep Concepts",
            duration: "7-9 weeks",
            goal: "Build professional applications",
            topics: [
                {title: "Async Programming", items: ["async/await", "Task", "Parallel programming", "Thread safety"]},
                {title: "Advanced C#", items: ["Reflection", "Attributes", "Extension methods", "Dynamic types"]},
                {title: "Database", items: ["Entity Framework", "LINQ to SQL", "Database design", "Migrations"]},
                {title: "Web Development", items: ["ASP.NET Core", "MVC pattern", "Web APIs", "Razor pages"]}
            ]
        },
        4: {
            title: "Expert Level - Specialization",
            duration: "10-12 weeks",
            goal: "Master C# specialization",
            specializations: [
                {title: "Game Development", icon: "fas fa-gamepad", items: ["Unity engine", "C# for games", "Game physics", "2D/3D development"]},
                {title: "Web Development", icon: "fas fa-globe", items: ["ASP.NET Core", "Blazor", "SignalR", "Microservices"]},
                {title: "Desktop Apps", icon: "fas fa-desktop", items: ["WPF", "WinForms", "MAUI", "Cross-platform"]},
                {title: "Cloud & Azure", icon: "fas fa-cloud", items: ["Azure services", "Serverless", "Functions", "DevOps"]}
            ]
        },
        5: {
            title: "Professional Level - Real-World Skills",
            duration: "Ongoing",
            goal: "Work as professional C# developer",
            topics: [
                {title: "Architecture", items: ["Design patterns", "SOLID principles", "Clean architecture", "DDD"]},
                {title: "DevOps", items: ["Azure DevOps", "Docker", "CI/CD", "Deployment strategies"]},
                {title: "Testing", items: ["Unit testing", "xUnit", "Moq", "Integration testing", "TDD"]},
                {title: "Best Practices", items: ["Code quality", "Security", "Performance", "Documentation"]}
            ]
        }
    }
};

coursesData.go = {
    name: "Go (Golang)",
    icon: "fab fa-golang",
    description: "Learn Go - build fast, scalable cloud services and microservices.",
    levels: {
        1: {
            title: "Beginner Level - Foundation",
            duration: "3-4 weeks",
            goal: "Write simple Go programs",
            topics: [
                {title: "Getting Started", items: ["Go installation", "Workspace setup", "First Go program", "Go modules"]},
                {title: "Basic Syntax", items: ["Variables", "Data types", "Constants", "Operators", "Formatting"]},
                {title: "Control Flow", items: ["If-else", "Switch", "For loops", "Defer", "Panic and recover"]},
                {title: "Functions & Arrays", items: ["Functions", "Multiple returns", "Variadic functions", "Arrays and slices"]}
            ]
        },
        2: {
            title: "Intermediate Level - Core Skills",
            duration: "5-6 weeks",
            goal: "Build concurrent applications",
            topics: [
                {title: "Data Structures", items: ["Slices", "Maps", "Structs", "Pointers", "Methods"]},
                {title: "Interfaces", items: ["Interface definition", "Type assertions", "Empty interface", "Error handling"]},
                {title: "Concurrency", items: ["Goroutines", "Channels", "Select", "Sync package", "WaitGroups"]},
                {title: "Packages", items: ["Creating packages", "Importing", "Standard library", "Third-party packages"]}
            ]
        },
        3: {
            title: "Advanced Level - Deep Concepts",
            duration: "6-8 weeks",
            goal: "Build production-ready services",
            topics: [
                {title: "Advanced Concurrency", items: ["Context", "Worker pools", "Pipeline patterns", "Race conditions"]},
                {title: "Testing", items: ["Unit testing", "Table-driven tests", "Benchmarking", "Mocking"]},
                {title: "Web Development", items: ["HTTP server", "Routing", "Middleware", "REST APIs", "JSON handling"]},
                {title: "Database", items: ["SQL drivers", "GORM", "Migrations", "Connection pooling"]}
            ]
        },
        4: {
            title: "Expert Level - Specialization",
            duration: "8-10 weeks",
            goal: "Master Go specialization",
            specializations: [
                {title: "Microservices", icon: "fas fa-cubes", items: ["gRPC", "Protocol Buffers", "Service mesh", "API gateways"]},
                {title: "Cloud Native", icon: "fas fa-cloud", items: ["Kubernetes", "Docker", "Cloud platforms", "Serverless"]},
                {title: "DevOps Tools", icon: "fas fa-tools", items: ["CLI tools", "Automation", "Infrastructure", "Monitoring"]},
                {title: "System Programming", icon: "fas fa-server", items: ["Network programming", "File systems", "OS interaction"]}
            ]
        },
        5: {
            title: "Professional Level - Real-World Skills",
            duration: "Ongoing",
            goal: "Work as professional Go developer",
            topics: [
                {title: "Architecture", items: ["Microservices design", "Clean architecture", "Design patterns", "Scalability"]},
                {title: "DevOps", items: ["CI/CD", "Docker", "Kubernetes", "Monitoring", "Logging"]},
                {title: "Testing & Quality", items: ["Integration testing", "E2E testing", "Performance testing", "Code coverage"]},
                {title: "Best Practices", items: ["Go idioms", "Error handling", "Security", "Documentation"]}
            ]
        }
    }
};

coursesData.rust = {
    name: "Rust Programming",
    icon: "fab fa-rust",
    description: "Master Rust - build safe, fast, and concurrent systems without memory bugs.",
    levels: {
        1: {
            title: "Beginner Level - Foundation",
            duration: "5-6 weeks",
            goal: "Understand Rust basics and ownership",
            topics: [
                {title: "Getting Started", items: ["Rust installation", "Cargo basics", "First Rust program", "Rust ecosystem"]},
                {title: "Basic Syntax", items: ["Variables and mutability", "Data types", "Functions", "Comments"]},
                {title: "Ownership", items: ["Ownership rules", "Borrowing", "References", "Slices"]},
                {title: "Control Flow", items: ["If expressions", "Loops", "Match", "Pattern matching"]}
            ]
        },
        2: {
            title: "Intermediate Level - Core Skills",
            duration: "6-8 weeks",
            goal: "Build safe Rust applications",
            topics: [
                {title: "Data Structures", items: ["Structs", "Enums", "Option and Result", "Collections", "Vectors"]},
                {title: "Error Handling", items: ["Result type", "Option type", "Panic", "Error propagation"]},
                {title: "Generics & Traits", items: ["Generic types", "Trait definitions", "Trait bounds", "Lifetimes"]},
                {title: "Modules", items: ["Module system", "Crates", "Packages", "Visibility"]}
            ]
        },
        3: {
            title: "Advanced Level - Deep Concepts",
            duration: "8-10 weeks",
            goal: "Build high-performance systems",
            topics: [
                {title: "Advanced Features", items: ["Smart pointers", "Rc and Arc", "RefCell", "Unsafe Rust"]},
                {title: "Concurrency", items: ["Threads", "Message passing", "Shared state", "Sync and Send"]},
                {title: "Iterators & Closures", items: ["Iterator trait", "Closures", "Functional programming"]},
                {title: "Testing", items: ["Unit tests", "Integration tests", "Documentation tests", "Benchmarks"]}
            ]
        },
        4: {
            title: "Expert Level - Specialization",
            duration: "10-12 weeks",
            goal: "Master Rust specialization",
            specializations: [
                {title: "Systems Programming", icon: "fas fa-microchip", items: ["OS development", "Embedded systems", "Device drivers", "Low-level"]},
                {title: "Web Development", icon: "fas fa-globe", items: ["Actix-web", "Rocket", "Async Rust", "WebAssembly"]},
                {title: "Blockchain", icon: "fas fa-link", items: ["Smart contracts", "Substrate", "Crypto", "Distributed systems"]},
                {title: "Game Development", icon: "fas fa-gamepad", items: ["Bevy engine", "Game physics", "Graphics", "Performance"]}
            ]
        },
        5: {
            title: "Professional Level - Real-World Skills",
            duration: "Ongoing",
            goal: "Work as professional Rust developer",
            topics: [
                {title: "Architecture", items: ["Design patterns", "Error handling strategies", "API design", "Performance"]},
                {title: "DevOps", items: ["Cross-compilation", "CI/CD", "Docker", "Deployment"]},
                {title: "Testing & Quality", items: ["Property testing", "Fuzzing", "Profiling", "Optimization"]},
                {title: "Best Practices", items: ["Rust idioms", "Safety", "Documentation", "Community standards"]}
            ]
        }
    }
};

// Add remaining market-demanded languages
coursesData.php = {
    name: "PHP Programming",
    icon: "fab fa-php",
    description: "Learn PHP - power 77% of websites. Build dynamic web applications and APIs.",
    levels: {
        1: {title: "Beginner Level", duration: "3-4 weeks", goal: "Create dynamic web pages", topics: [{title: "Basics", items: ["PHP syntax", "Variables", "Operators", "Control flow", "Functions"]}, {title: "Web Integration", items: ["HTML integration", "Forms", "GET/POST", "Cookies", "Sessions"]}]},
        2: {title: "Intermediate Level", duration: "5-6 weeks", goal: "Build web applications", topics: [{title: "OOP", items: ["Classes", "Inheritance", "Interfaces", "Namespaces", "Autoloading"]}, {title: "Database", items: ["MySQL", "PDO", "CRUD operations", "Prepared statements"]}]},
        3: {title: "Advanced Level", duration: "6-8 weeks", goal: "Build professional applications", topics: [{title: "Frameworks", items: ["Laravel", "Symfony", "MVC pattern", "Routing", "Middleware"]}, {title: "APIs", items: ["REST APIs", "Authentication", "JSON", "API security"]}]},
        4: {title: "Expert Level", duration: "8-10 weeks", goal: "Master PHP development", specializations: [{title: "Laravel Expert", icon: "fas fa-gem", items: ["Eloquent ORM", "Blade templates", "Queues", "Broadcasting"]}, {title: "WordPress", icon: "fab fa-wordpress", items: ["Theme development", "Plugin development", "Custom post types", "WooCommerce"]}]},
        5: {title: "Professional Level", duration: "Ongoing", goal: "Work as professional PHP developer", topics: [{title: "Best Practices", items: ["PSR standards", "Composer", "Testing", "Security", "Performance"]}]}
    }
};

coursesData.swift = {
    name: "Swift Programming",
    icon: "fab fa-swift",
    description: "Master Swift - build beautiful iOS and macOS applications for Apple ecosystem.",
    levels: {
        1: {title: "Beginner Level", duration: "4-5 weeks", goal: "Create simple iOS apps", topics: [{title: "Basics", items: ["Swift syntax", "Variables", "Optionals", "Control flow", "Functions"]}, {title: "iOS Basics", items: ["Xcode", "Playgrounds", "UIKit basics", "Storyboards"]}]},
        2: {title: "Intermediate Level", duration: "6-7 weeks", goal: "Build functional iOS apps", topics: [{title: "OOP", items: ["Classes", "Structs", "Protocols", "Extensions", "Generics"]}, {title: "UI Development", items: ["Auto Layout", "Table Views", "Collection Views", "Navigation"]}]},
        3: {title: "Advanced Level", duration: "7-9 weeks", goal: "Build professional apps", topics: [{title: "SwiftUI", items: ["Declarative UI", "State management", "Combine", "Animations"]}, {title: "Data", items: ["Core Data", "Networking", "JSON", "UserDefaults"]}]},
        4: {title: "Expert Level", duration: "10-12 weeks", goal: "Master iOS development", specializations: [{title: "iOS Apps", icon: "fab fa-apple", items: ["App Store", "In-app purchases", "Push notifications", "CloudKit"]}, {title: "Cross-Platform", icon: "fas fa-mobile-alt", items: ["SwiftUI multiplatform", "macOS apps", "watchOS", "tvOS"]}]},
        5: {title: "Professional Level", duration: "Ongoing", goal: "Work as professional iOS developer", topics: [{title: "Best Practices", items: ["Architecture patterns", "Testing", "CI/CD", "App Store optimization"]}]}
    }
};

coursesData.kotlin = {
    name: "Kotlin Programming",
    icon: "fab fa-android",
    description: "Learn Kotlin - Google's preferred language for modern Android development.",
    levels: {
        1: {title: "Beginner Level", duration: "3-4 weeks", goal: "Write Kotlin programs", topics: [{title: "Basics", items: ["Kotlin syntax", "Variables", "Null safety", "Control flow", "Functions"]}, {title: "Android Basics", items: ["Android Studio", "First app", "Activities", "Layouts"]}]},
        2: {title: "Intermediate Level", duration: "6-7 weeks", goal: "Build Android apps", topics: [{title: "OOP", items: ["Classes", "Data classes", "Objects", "Interfaces", "Inheritance"]}, {title: "Android UI", items: ["Views", "RecyclerView", "Fragments", "Navigation"]}]},
        3: {title: "Advanced Level", duration: "7-9 weeks", goal: "Build professional apps", topics: [{title: "Jetpack Compose", items: ["Declarative UI", "State", "Navigation", "Material Design"]}, {title: "Architecture", items: ["MVVM", "Repository pattern", "Room database", "Coroutines"]}]},
        4: {title: "Expert Level", duration: "10-12 weeks", goal: "Master Android development", specializations: [{title: "Android Expert", icon: "fab fa-android", items: ["Play Store", "Firebase", "Push notifications", "In-app billing"]}, {title: "Multiplatform", icon: "fas fa-layer-group", items: ["Kotlin Multiplatform", "Shared code", "iOS integration"]}]},
        5: {title: "Professional Level", duration: "Ongoing", goal: "Work as professional Android developer", topics: [{title: "Best Practices", items: ["Clean architecture", "Testing", "CI/CD", "Performance optimization"]}]}
    }
};

coursesData.typescript = {
    name: "TypeScript",
    icon: "fab fa-node-js",
    description: "Master TypeScript - JavaScript with types for large-scale applications.",
    levels: {
        1: {title: "Beginner Level", duration: "2-3 weeks", goal: "Understand TypeScript basics", topics: [{title: "Basics", items: ["TypeScript setup", "Basic types", "Interfaces", "Type annotations", "Compilation"]}, {title: "JavaScript Knowledge", items: ["ES6+ features", "Functions", "Arrays", "Objects"]}]},
        2: {title: "Intermediate Level", duration: "4-5 weeks", goal: "Build typed applications", topics: [{title: "Advanced Types", items: ["Union types", "Generics", "Type guards", "Utility types", "Mapped types"]}, {title: "OOP", items: ["Classes", "Interfaces", "Abstract classes", "Decorators"]}]},
        3: {title: "Advanced Level", duration: "5-7 weeks", goal: "Build enterprise applications", topics: [{title: "Advanced Features", items: ["Advanced generics", "Conditional types", "Template literal types", "Module augmentation"]}, {title: "Tooling", items: ["tsconfig", "Linting", "Build tools", "Type definitions"]}]},
        4: {title: "Expert Level", duration: "8-10 weeks", goal: "Master TypeScript frameworks", specializations: [{title: "Frontend", icon: "fas fa-desktop", items: ["React with TypeScript", "Angular", "Vue 3", "Type-safe state"]}, {title: "Backend", icon: "fas fa-server", items: ["Node.js", "Express", "NestJS", "GraphQL"]}]},
        5: {title: "Professional Level", duration: "Ongoing", goal: "Work as TypeScript expert", topics: [{title: "Best Practices", items: ["Type safety", "Code organization", "Testing", "Documentation"]}]}
    }
};

coursesData.r = {
    name: "R Programming",
    icon: "fab fa-r-project",
    description: "Learn R - the language for statistical computing and data analysis.",
    levels: {
        1: {title: "Beginner Level", duration: "3-4 weeks", goal: "Perform basic data analysis", topics: [{title: "Basics", items: ["R syntax", "Variables", "Data types", "Vectors", "Functions"]}, {title: "Data Structures", items: ["Matrices", "Data frames", "Lists", "Factors"]}]},
        2: {title: "Intermediate Level", duration: "5-6 weeks", goal: "Analyze and visualize data", topics: [{title: "Data Manipulation", items: ["dplyr", "tidyr", "Data cleaning", "Filtering", "Grouping"]}, {title: "Visualization", items: ["ggplot2", "Base plots", "Charts", "Customization"]}]},
        3: {title: "Advanced Level", duration: "6-8 weeks", goal: "Perform advanced analysis", topics: [{title: "Statistics", items: ["Hypothesis testing", "Regression", "ANOVA", "Time series"]}, {title: "Advanced Tools", items: ["R Markdown", "Shiny apps", "Package development"]}]},
        4: {title: "Expert Level", duration: "8-10 weeks", goal: "Master data science with R", specializations: [{title: "Machine Learning", icon: "fas fa-brain", items: ["caret", "Random forests", "Neural networks", "Model evaluation"]}, {title: "Bioinformatics", icon: "fas fa-dna", items: ["Bioconductor", "Genomics", "Proteomics", "Analysis pipelines"]}]},
        5: {title: "Professional Level", duration: "Ongoing", goal: "Work as R data scientist", topics: [{title: "Best Practices", items: ["Reproducible research", "Version control", "Documentation", "Collaboration"]}]}
    }
};
