/**
 * Golden Projects Data - Links to your amazing projects
 * 
 * Project Types:
 * - Static: Works directly by opening HTML file
 * - Vite: Needs "npm run dev" or build
 * - Node.js: Needs "npm start" (backend server)
 * - Python: Needs "python app.py"
 * 
 * See GOLDEN-PROJECTS-SERVER-GUIDE.md for setup instructions
 */

const goldenProjectsData = [
  {
    id: 1,
    title: "Books Resume",
    description: "AI-powered book summarizer that creates comprehensive summaries from PDFs and text files",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    demoUrl: "#",
    githubUrl: "#",
    tags: ["AI", "Node.js", "PDF Processing"],
    category: "productivity",
    serverType: "Node.js",
    setupRequired: true,
    setupCommand: "npm install && npm start",
    note: "Requires Node.js server and OpenAI API key"
  },
  {
    id: 2,
    title: "Builder Web Apps",
    description: "Powerful web application builder with AI assistance for rapid development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    demoUrl: "#",
    githubUrl: "#",
    tags: ["Web Builder", "AI", "JavaScript"],
    category: "developer",
    serverType: "Node.js",
    setupRequired: true,
    setupCommand: "npm install && npm start",
    note: "Requires Node.js server and Puppeteer"
  },
  {
    id: 3,
    title: "Coffee Shop",
    description: "Modern e-commerce platform for coffee shop with beautiful UI and smooth animations",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    demoUrl: "#",
    githubUrl: "#",
    tags: ["E-commerce", "Vite", "React"],
    category: "finance",
    serverType: "Vite",
    setupRequired: true,
    setupCommand: "npm install && npm run dev",
    note: "Requires Vite dev server (npm run dev) or build for production"
  },
  {
    id: 4,
    title: "Text to Voice Converter",
    description: "Advanced text-to-speech converter with multiple Arabic voices and customization options",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Python", "TTS", "Flask"],
    category: "utilities",
    serverType: "Python",
    setupRequired: true,
    setupCommand: "pip install -r requirements.txt && python app.py",
    note: "Requires Python server. Use standalone.html for demo without server"
  },
  {
    id: 5,
    title: "Devices Store",
    description: "Full-stack e-commerce platform for electronic devices with admin panel",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["E-commerce", "Node.js", "MongoDB"],
    category: "finance",
    serverType: "Node.js",
    setupRequired: true,
    setupCommand: "npm install && npm start",
    note: "Requires Node.js server"
  },
  {
    id: 6,
    title: "Freelance Jobs Platform",
    description: "Complete freelancing marketplace connecting clients with professionals",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Marketplace", "JavaScript", "LocalStorage"],
    category: "other",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 7,
    title: "Ice Cream Shop",
    description: "Delightful ice cream shop website with interactive menu and ordering system",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["E-commerce", "JavaScript", "CSS3"],
    category: "finance",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 8,
    title: "Global Food & Drink",
    description: "Explore cuisines from around the world with recipes and cultural insights",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Vite", "React", "API"],
    category: "health",
    serverType: "Vite",
    setupRequired: true,
    setupCommand: "npm install && npm run dev",
    note: "Requires Vite dev server (npm run dev)"
  },
  {
    id: 9,
    title: "How To Code",
    description: "Interactive coding learning platform with 12+ programming languages and live code editor",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Education", "Monaco Editor", "JavaScript"],
    category: "developer",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 10,
    title: "Learn English",
    description: "Comprehensive English learning platform from zero to master level",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Education", "JavaScript", "Interactive"],
    category: "other",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 11,
    title: "Learning Path Generator",
    description: "AI-powered tool to generate personalized learning paths for any career",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["AI", "Career", "Education"],
    category: "productivity",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 12,
    title: "Learn Math",
    description: "Interactive mathematics learning platform with visual explanations and practice",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Education", "Math", "Interactive"],
    category: "other",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 13,
    title: "Template Maker",
    description: "AI-powered template generator for various document types and formats",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["AI", "Node.js", "Templates"],
    category: "productivity",
    serverType: "Node.js",
    setupRequired: true,
    setupCommand: "npm install && npm start",
    note: "Requires Node.js server and Hugging Face API key"
  },
  {
    id: 14,
    title: "Notes App",
    description: "Advanced note-taking application with rich text editor and cloud sync",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Productivity", "JavaScript", "LocalStorage"],
    category: "productivity",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 15,
    title: "Pizza Shop",
    description: "Modern pizza ordering system with customization and delivery tracking",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["E-commerce", "Vite", "React"],
    category: "finance",
    serverType: "Vite",
    setupRequired: true,
    setupCommand: "npm install && npm run dev",
    note: "Requires Vite dev server (npm run dev)"
  },
  {
    id: 16,
    title: "Perfume Collection",
    description: "Elegant e-commerce platform for luxury perfumes with admin dashboard",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["E-commerce", "JavaScript", "Admin Panel"],
    category: "finance",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 17,
    title: "Random Text Generator",
    description: "Generate random text, lorem ipsum, and placeholder content",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Utility", "JavaScript", "Generator"],
    category: "utilities",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 18,
    title: "Service Hub",
    description: "Professional services marketplace connecting clients with service providers",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Marketplace", "Node.js", "Services"],
    category: "other",
    serverType: "Static/Node.js",
    setupRequired: false,
    note: "✅ Use demo.html for static demo, or npm start for full features"
  },
  {
    id: 19,
    title: "Shoes Store",
    description: "Modern e-commerce platform for shoes with advanced filtering and cart",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["E-commerce", "Node.js", "MongoDB"],
    category: "finance",
    serverType: "Node.js + MongoDB",
    setupRequired: true,
    setupCommand: "npm install && npm start",
    note: "Requires Node.js server and MongoDB database"
  },
  {
    id: 20,
    title: "Desktop Wallpapers",
    description: "Beautiful collection of high-quality desktop wallpapers",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Gallery", "JavaScript", "Images"],
    category: "creative",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 21,
    title: "Watches Store",
    description: "Luxury watches e-commerce platform with elegant design and admin panel",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["E-commerce", "JavaScript", "Admin Panel"],
    category: "finance",
    serverType: "Static",
    setupRequired: false,
    note: "✅ Works directly! Just open index.html"
  },
  {
    id: 22,
    title: "LensStory - Camera Evolution",
    description: "Comprehensive history of cameras from Camera Obscura to AI-powered photography",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    demoUrl: "javascript:void(0)",
    githubUrl: "javascript:void(0)",
    tags: ["Next.js", "TypeScript", "Photography", "Education"],
    category: "other",
    serverType: "Next.js",
    setupRequired: true,
    setupCommand: "npm install && npm run dev",
    note: "Requires Next.js dev server (npm run dev). Open http://localhost:3000"
  }
];

// Initialize golden projects in localStorage if not exists
function initGoldenProjects() {
  if (!localStorage.getItem('goldenProjects')) {
    localStorage.setItem('goldenProjects', JSON.stringify(goldenProjectsData));
  }
}

// Auto-initialize on load
if (typeof window !== 'undefined') {
  initGoldenProjects();
}

