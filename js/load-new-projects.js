/**
 * ═══════════════════════════════════════════════════════════════════════
 * New Projects Loader - From Projects Folder
 * Copyright © 2025 Abdel Ali. All Rights Reserved.
 * ═══════════════════════════════════════════════════════════════════════
 */

// Basic Projects (30 projects) - ALL FREE
const basicProjects = [
  { id: 1, name: '2048 Game', category: 'games', tech: ['JavaScript', 'CSS3', 'HTML5'], folder: '1_Basic/2048-game', isFree: true },
  { id: 2, name: 'BMI Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/bmi-calculator', isFree: true },
  { id: 3, name: 'Calculator App', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/calculator-app', isFree: true },
  { id: 4, name: 'Code Beautifier', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/code-beautifier', isFree: true },
  { id: 5, name: 'Color Picker', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/color-picker', isFree: true },
  { id: 6, name: 'Countdown Timer', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/countdown-timer', isFree: true },
  { id: 7, name: 'Currency Converter', category: 'utilities', tech: ['JavaScript', 'API'], folder: '1_Basic/currency-converter', isFree: true },
  { id: 8, name: 'Dice Roller', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/dice-roller', isFree: true },
  { id: 9, name: 'Digital Clock', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/digital-clock', isFree: true },
  { id: 10, name: 'Drawing App', category: 'creative', tech: ['JavaScript', 'Canvas'], folder: '1_Basic/drawing-app', isFree: true },
  { id: 11, name: 'Gradient Generator', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/gradient-generator', isFree: true },
  { id: 12, name: 'Hangman Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/hangman-game', isFree: true },
  { id: 13, name: 'Image Slider', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/image-slider', isFree: true },
  { id: 14, name: 'JSON Formatter', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/json-formatter', isFree: true },
  { id: 15, name: 'Markdown Editor', category: 'developer', tech: ['JavaScript', 'Marked.js'], folder: '1_Basic/markdown-editor', isFree: true },
  { id: 16, name: 'Meme Generator', category: 'creative', tech: ['JavaScript', 'Canvas'], folder: '1_Basic/meme-generator', isFree: true },
  { id: 17, name: 'Memory Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/memory-game', isFree: true },
  { id: 18, name: 'Number Guessing', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/number-guessing', isFree: true },
  { id: 19, name: 'Password Generator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/password-generator', isFree: true },
  { id: 20, name: 'QR Generator', category: 'utilities', tech: ['JavaScript', 'QR Library'], folder: '1_Basic/qr-generator', isFree: true },
  { id: 21, name: 'Rock Paper Scissors', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/rock-paper-scissors', isFree: true },
  { id: 22, name: 'Snake Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: '1_Basic/snake-game', isFree: true },
  { id: 23, name: 'Stopwatch', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/stopwatch', isFree: true },
  { id: 24, name: 'Tic Tac Toe', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/tic-tac-toe', isFree: true },
  { id: 25, name: 'Tip Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/tip-calculator', isFree: true },
  { id: 26, name: 'Typing Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/typing-game', isFree: true },
  { id: 27, name: 'Unit Converter', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/unit-converter', isFree: true },
  { id: 28, name: 'Weather App', category: 'utilities', tech: ['JavaScript', 'API'], folder: '1_Basic/weather-app', isFree: true },
  { id: 29, name: 'Wordle Clone', category: 'games', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/wordle-clone', isFree: true },
  { id: 30, name: 'Resume Builder', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '1_Basic/resume-builder', isFree: true }
];

// Intermediate Projects (20 projects) - ALL LOCKED
const intermediateProjects = [
  { id: 31, name: 'Barbershop', category: 'business', tech: ['JavaScript', 'CSS3', 'HTML5'], folder: '2_Intermediate/Barbershop', tier: 'intermediate' },
  { id: 32, name: 'Books Resume', category: 'education', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/BooksResume', tier: 'intermediate' },
  { id: 33, name: 'Camera', category: 'utilities', tech: ['JavaScript', 'WebRTC'], folder: '2_Intermediate/Camera', tier: 'intermediate' },
  { id: 34, name: 'Coffee Shop', category: 'business', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/CoffeShop', tier: 'intermediate' },
  { id: 35, name: 'Convert Text To Voice', category: 'utilities', tech: ['JavaScript', 'Web Speech API'], folder: '2_Intermediate/Convert Text To voice', tier: 'intermediate' },
  { id: 36, name: 'Fake Data Generator', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Fake Data Generator', tier: 'intermediate' },
  { id: 37, name: 'Fast Downloader', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/FastDownloader', tier: 'intermediate' },
  { id: 38, name: 'Glaces', category: 'business', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Glaces', tier: 'intermediate' },
  { id: 39, name: 'Hallo', category: 'communication', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Hallo', tier: 'intermediate' },
  { id: 40, name: 'Job Interview Questions', category: 'education', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Job interview questions with answers', tier: 'intermediate' },
  { id: 41, name: 'Learn Math', category: 'education', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/LearnMath', tier: 'intermediate' },
  { id: 42, name: 'Maker Templates', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/makerTemplates', tier: 'intermediate' },
  { id: 43, name: 'My Blogger', category: 'content', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/myBlogger', tier: 'intermediate' },
  { id: 44, name: 'Notes Apps', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: '2_Intermediate/notes apps', tier: 'intermediate' },
  { id: 45, name: 'Pizza Shop', category: 'business', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Pizzashop', tier: 'intermediate' },
  { id: 46, name: 'Random Text', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Random Text', tier: 'intermediate' },
  { id: 47, name: 'Room Service', category: 'business', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/RoomService', tier: 'intermediate' },
  { id: 48, name: 'Shoes', category: 'ecommerce', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/shoes', tier: 'intermediate' },
  { id: 49, name: 'Type Writter', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/TypeWritter', tier: 'intermediate' },
  { id: 50, name: 'Watches', category: 'ecommerce', tech: ['JavaScript', 'CSS3'], folder: '2_Intermediate/Watches', tier: 'intermediate' }
];

// Professional Projects (20 projects) - ALL LOCKED - COMING SOON
const professionalProjects = [
  { id: 51, name: 'Cash Management System', category: 'finance', tech: ['React', 'Node.js', 'MongoDB'], folder: '', tier: 'professional' },
  { id: 52, name: 'Community Hub', category: 'social', tech: ['React', 'Firebase'], folder: '', tier: 'professional' },
  { id: 53, name: 'Educational Programming', category: 'education', tech: ['JavaScript', 'CSS3'], folder: '', tier: 'professional' },
  { id: 54, name: 'Freelance Jobs', category: 'business', tech: ['React', 'Node.js'], folder: '', tier: 'professional' },
  { id: 55, name: 'Global Food and Drink', category: 'business', tech: ['React', 'API'], folder: '', tier: 'professional' },
  { id: 56, name: 'Government Digital Services', category: 'government', tech: ['React', 'Node.js'], folder: '', tier: 'professional' },
  { id: 57, name: 'Handel Education', category: 'education', tech: ['React', 'Firebase'], folder: '', tier: 'professional' },
  { id: 58, name: 'How To Code', category: 'education', tech: ['React', 'CSS3'], folder: '', tier: 'professional' },
  { id: 59, name: 'Kid Safe', category: 'education', tech: ['React', 'Node.js'], folder: '', tier: 'professional' },
  { id: 60, name: 'Learn English From Zero To Master', category: 'education', tech: ['React', 'Audio'], folder: '', tier: 'professional' },
  { id: 61, name: 'Learning Path Generator', category: 'education', tech: ['React', 'AI'], folder: '', tier: 'professional' },
  { id: 62, name: 'Let Me Fix It', category: 'utilities', tech: ['React', 'Node.js'], folder: '', tier: 'professional' },
  { id: 63, name: 'Maroc COD', category: 'ecommerce', tech: ['React', 'Node.js'], folder: '', tier: 'professional' },
  { id: 64, name: 'Maroc Law', category: 'legal', tech: ['React', 'Database'], folder: '', tier: 'professional' },
  { id: 65, name: 'Online Mentor', category: 'education', tech: ['React', 'WebRTC'], folder: '', tier: 'professional' },
  { id: 66, name: 'Open IDE', category: 'developer', tech: ['React', 'Monaco Editor'], folder: '', tier: 'professional' },
  { id: 67, name: 'SEO Guide', category: 'marketing', tech: ['React', 'CSS3'], folder: '', tier: 'professional' },
  { id: 68, name: 'Service Hub', category: 'business', tech: ['React', 'Node.js'], folder: '', tier: 'professional' },
  { id: 69, name: 'Super PDF Tools', category: 'utilities', tech: ['React', 'PDF.js'], folder: '', tier: 'professional' },
  { id: 70, name: 'URL Shortener', category: 'utilities', tech: ['React', 'Node.js', 'MongoDB'], folder: '', tier: 'professional' }
];

// Combine all projects
const allNewProjects = [...basicProjects, ...intermediateProjects, ...professionalProjects];

// Override the getProjects function
function getProjects() {
  return allNewProjects;
}

// Initialize and save to localStorage
function initializeNewProjects() {
  localStorage.setItem('portfolioProjects', JSON.stringify(allNewProjects));
  localStorage.setItem('portfolioDataVersion', '3.0');
  
  // Initialize other portfolio data if not exists
  initializeOtherData();
  
  console.log('✅ New Projects Loaded: 30 Basic (FREE) + 20 Intermediate (LOCKED) + 20 Professional (LOCKED)');
}

// Initialize Services, Experience, Testimonials, Skills
function initializeOtherData() {
  const hasExperience = localStorage.getItem('portfolioExperience');
  const hasTestimonials = localStorage.getItem('portfolioTestimonials');
  const hasServices = localStorage.getItem('portfolioServices');
  const hasSkills = localStorage.getItem('portfolioSkills');

  // Default Experience Data
  if (!hasExperience) {
    const defaultExperience = [
      {
        id: 1,
        period: '2022 - Present',
        position: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        description: 'Leading development of enterprise web applications using modern JavaScript frameworks and cloud technologies.',
        highlights: [
          'Architected and deployed 20+ microservices on AWS',
          'Led a team of 5 developers building real-time analytics dashboard',
          'Reduced application load time by 60% through optimization',
          'Implemented CI/CD pipelines reducing deployment time'
        ]
      },
      {
        id: 2,
        period: '2020 - 2022',
        position: 'Full Stack Developer',
        company: 'Digital Innovations Ltd.',
        description: 'Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL.',
        highlights: [
          'Built 30+ responsive web applications',
          'Integrated third-party APIs and payment gateways',
          'Improved code quality with 85% test coverage',
          'Mentored 3 junior developers'
        ]
      },
      {
        id: 3,
        period: '2019 - 2020',
        position: 'Frontend Developer',
        company: 'Creative Web Studio',
        description: 'Specialized in creating engaging user interfaces and interactive web experiences.',
        highlights: [
          'Developed 50+ pixel-perfect responsive websites',
          'Implemented complex animations using CSS3 and JavaScript',
          'Optimized website performance achieving 95+ Lighthouse scores',
          'Collaborated with UX designers to improve accessibility'
        ]
      }
    ];
    localStorage.setItem('portfolioExperience', JSON.stringify(defaultExperience));
  }

  // Default Testimonials Data
  if (!hasTestimonials) {
    const defaultTestimonials = [
      {
        id: 1,
        name: 'Sarah Mitchell',
        company: 'CEO, TechStart Solutions',
        rating: 5,
        text: 'Abdel delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and problem-solving skills are outstanding.',
        avatar: 'SM'
      },
      {
        id: 2,
        name: 'James Chen',
        company: 'Product Manager, InnovateCo',
        rating: 5,
        text: 'Working with Abdel on our productivity app was a game-changer. He transformed our complex requirements into an intuitive application.',
        avatar: 'JC'
      },
      {
        id: 3,
        name: 'Emily Johnson',
        company: 'CTO, CloudMetrics Inc',
        rating: 5,
        text: 'Abdel\'s work on our weather application was phenomenal. His code quality and documentation made future maintenance effortless.',
        avatar: 'EJ'
      },
      {
        id: 4,
        name: 'Michael Rodriguez',
        company: 'Founder, ToolBox Pro',
        rating: 5,
        text: 'The calculator and converter tools Abdel built are incredibly robust. His mathematical precision and UI/UX sensibility created tools our users love.',
        avatar: 'MR'
      },
      {
        id: 5,
        name: 'Lisa Park',
        company: 'Director, EduPlay Games',
        rating: 5,
        text: 'Abdel developed multiple interactive games for our educational platform. The games are engaging, bug-free, and perform flawlessly.',
        avatar: 'LP'
      },
      {
        id: 6,
        name: 'David Williams',
        company: 'Operations Lead, TaskFlow Systems',
        rating: 5,
        text: 'The task management system Abdel created revolutionized our workflow. Exceptional work!',
        avatar: 'DW'
      }
    ];
    localStorage.setItem('portfolioTestimonials', JSON.stringify(defaultTestimonials));
  }

  // Default Services Data
  if (!hasServices) {
    const defaultServices = [
      {
        id: 1,
        title: 'CV to Web App',
        icon: '📄',
        description: 'Turn your CV into a sleek, dynamic web application that stands out from traditional PDFs.',
        features: ['Interactive design', 'Mobile responsive', 'Easy to share', 'Professional look']
      },
      {
        id: 2,
        title: 'Frontend Development',
        icon: '🧱',
        description: 'Build responsive and interactive user interfaces with modern technologies.',
        features: ['HTML5, CSS3, JavaScript', 'React, Vue.js, Next.js', 'Responsive design', 'Performance optimization']
      },
      {
        id: 3,
        title: 'Backend Development',
        icon: '🔙',
        description: 'Create robust APIs and server-side logic for your applications.',
        features: ['Node.js & Express', 'Python & Django', 'PHP & Laravel', 'RESTful APIs']
      },
      {
        id: 4,
        title: 'Database Setup',
        icon: '💾',
        description: 'Design and manage efficient database systems for your data.',
        features: ['MySQL & PostgreSQL', 'MongoDB & Redis', 'Database design', 'Query optimization']
      },
      {
        id: 5,
        title: 'API Integration',
        icon: '🔗',
        description: 'Connect your application with payment gateways, authentication, and third-party services.',
        features: ['Payment integration', 'Social login', 'Third-party APIs', 'Webhooks setup']
      },
      {
        id: 6,
        title: 'Hosting & Deployment',
        icon: '☁️',
        description: 'Deploy your applications on reliable cloud platforms.',
        features: ['Vercel & Netlify', 'AWS & Render', 'CI/CD pipelines', 'Domain setup']
      },
      {
        id: 7,
        title: 'Authentication & Security',
        icon: '🔐',
        description: 'Implement secure user authentication and data protection.',
        features: ['User login systems', 'Role-based access', 'Data encryption', 'Security best practices']
      },
      {
        id: 8,
        title: 'UI/UX Design',
        icon: '🧠',
        description: 'Create simple, clean, and mobile-friendly layouts.',
        features: ['Responsive layouts', 'User-friendly design', 'Modern aesthetics', 'Accessibility']
      },
      {
        id: 9,
        title: 'Maintenance & Updates',
        icon: '🧰',
        description: 'Keep your application running smoothly with ongoing support.',
        features: ['Bug fixes', 'Feature updates', 'Performance monitoring', 'Technical support']
      }
    ];
    localStorage.setItem('portfolioServices', JSON.stringify(defaultServices));
  }

  // Default Skills Data
  if (!hasSkills) {
    const defaultSkills = [
      {
        id: 1,
        category: 'Frontend',
        technologies: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS/SCSS', 'Redux', 'Next.js', 'Webpack', 'Vite']
      },
      {
        id: 2,
        category: 'Backend',
        technologies: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs', 'GraphQL', 'MySQL', 'Firebase', 'Prisma']
      },
      {
        id: 3,
        category: 'DevOps & Tools',
        technologies: ['Docker', 'AWS', 'Git', 'GitHub Actions', 'CI/CD', 'Linux', 'Nginx', 'Jest', 'Vitest', 'VS Code', 'Postman', 'Figma']
      }
    ];
    localStorage.setItem('portfolioSkills', JSON.stringify(defaultSkills));
  }
}

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', function() {
  initializeNewProjects();
});
