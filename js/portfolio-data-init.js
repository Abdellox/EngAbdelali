/**
 * ═══════════════════════════════════════════════════════════════════════
 * Portfolio Default Data Initialization - Complete Dataset
 * Copyright © 2025 Abdel Ali. All Rights Reserved.
 * ═══════════════════════════════════════════════════════════════════════
 */

function initializeDefaultData() {
  // Version control - force reload if data structure changed
  const DATA_VERSION = '2.0';
  const currentVersion = localStorage.getItem('portfolioDataVersion');
  
  // Force reload if version mismatch
  if (currentVersion !== DATA_VERSION) {
    localStorage.clear();
    localStorage.setItem('portfolioDataVersion', DATA_VERSION);
    console.log('🔄 Portfolio data updated to version ' + DATA_VERSION);
  }
  
  const hasExperience = localStorage.getItem('portfolioExperience');
  const hasTestimonials = localStorage.getItem('portfolioTestimonials');
  const hasServices = localStorage.getItem('portfolioServices');
  const hasSkills = localStorage.getItem('portfolioSkills');
  const hasProjects = localStorage.getItem('portfolioProjects');

  // Default Experience Data
  if (!hasExperience) {
    const defaultExperience = [
      {
        id: 1,
        period: '2022 - Present',
        position: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        description: 'Leading development of enterprise web applications using modern JavaScript frameworks and cloud technologies. Architecting scalable solutions and mentoring junior developers.',
        highlights: [
          'Architected and deployed 20+ microservices on AWS, improving system scalability by 300%',
          'Led a team of 5 developers in building a real-time analytics dashboard serving 10K+ users',
          'Reduced application load time by 60% through performance optimization and code refactoring',
          'Implemented CI/CD pipelines reducing deployment time from hours to minutes'
        ]
      },
      {
        id: 2,
        period: '2020 - 2022',
        position: 'Full Stack Developer',
        company: 'Digital Innovations Ltd.',
        description: 'Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        highlights: [
          'Built 30+ responsive web applications from concept to deployment',
          'Integrated third-party APIs and payment gateways for e-commerce platforms',
          'Improved code quality by implementing automated testing with 85% coverage',
          'Mentored 3 junior developers and conducted code reviews'
        ]
      },
      {
        id: 3,
        period: '2019 - 2020',
        position: 'Frontend Developer',
        company: 'Creative Web Studio',
        description: 'Specialized in creating engaging user interfaces and interactive web experiences. Worked closely with designers to bring creative visions to life.',
        highlights: [
          'Developed 50+ pixel-perfect responsive websites and landing pages',
          'Implemented complex animations and interactions using CSS3 and JavaScript',
          'Optimized website performance achieving 95+ Lighthouse scores',
          'Collaborated with UX designers to improve user experience and accessibility'
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
        text: 'Abdel delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and problem-solving skills are outstanding. The project was completed ahead of schedule with clean, maintainable code.',
        avatar: 'SM'
      },
      {
        id: 2,
        name: 'James Chen',
        company: 'Product Manager, InnovateCo',
        rating: 5,
        text: 'Working with Abdel on our productivity app was a game-changer. He transformed our complex requirements into an intuitive, user-friendly application. His expertise in React and Node.js is truly impressive.',
        avatar: 'JC'
      },
      {
        id: 3,
        name: 'Emily Johnson',
        company: 'CTO, CloudMetrics Inc',
        rating: 5,
        text: 'Abdel\'s work on our weather application was phenomenal. He implemented real-time data visualization with smooth animations. His code quality and documentation made future maintenance effortless. Highly recommended!',
        avatar: 'EJ'
      },
      {
        id: 4,
        name: 'Michael Rodriguez',
        company: 'Founder, ToolBox Pro',
        rating: 5,
        text: 'The calculator and converter tools Abdel built for our platform are incredibly robust. His mathematical precision and UI/UX sensibility created tools our users love. Professional, responsive, and talented.',
        avatar: 'MR'
      },
      {
        id: 5,
        name: 'Lisa Park',
        company: 'Director, EduPlay Games',
        rating: 5,
        text: 'Abdel developed multiple interactive games for our educational platform. His creativity and technical skills brought our vision to life. The games are engaging, bug-free, and perform flawlessly across all devices.',
        avatar: 'LP'
      },
      {
        id: 6,
        name: 'David Williams',
        company: 'Operations Lead, TaskFlow Systems',
        rating: 5,
        text: 'The task management system Abdel created revolutionized our workflow. His understanding of productivity tools and clean architecture resulted in a solution that our entire team relies on daily. Exceptional work!',
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

  // Default Projects Data - ALL 193 PROJECTS
  if (!hasProjects) {
    const allProjects = [
      // GAMES (31 projects)
      { id: 1, name: '2048 Game', category: 'games', tech: ['JavaScript', 'CSS3', 'HTML5'], folder: 'Games/2048-game' },
      { id: 2, name: 'Bingo Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/bingo-game' },
      { id: 3, name: 'Blackjack Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/blackjack-game' },
      { id: 4, name: 'Breakout Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/breakout-game' },
      { id: 5, name: 'Card Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/card-game' },
      { id: 6, name: 'Checkers Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/checkers-game' },
      { id: 7, name: 'Chess Board', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/chess-board' },
      { id: 8, name: 'Connect Four', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/connect-four' },
      { id: 9, name: 'Dice Roller', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/dice-roller' },
      { id: 10, name: 'Hangman Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/hangman-game' },
      { id: 11, name: 'Lottery Picker', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/lottery-picker' },
      { id: 12, name: 'Mahjong Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/mahjong-game' },
      { id: 13, name: 'Memory Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/memory-game' },
      { id: 14, name: 'Number Guessing', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/number-guessing' },
      { id: 17, name: 'Poker Hand', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/poker-hand' },
      { id: 18, name: 'Pong Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/pong-game' },
      { id: 19, name: 'Puzzle Slider', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/puzzle-slider' },
      { id: 20, name: 'Rock Paper Scissors', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/rock-paper-scissors' },
      { id: 21, name: 'Roulette Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/roulette-game' },
      { id: 22, name: 'Simon Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/simon-game' },
      { id: 23, name: 'Slot Machine', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/slot-machine' },
      { id: 24, name: 'Snake Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/snake-game' },
      { id: 25, name: 'Solitaire Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/solitaire-game' },
      { id: 26, name: 'Space Invaders', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/space-invaders' },
      { id: 27, name: 'Sudoku Solver', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/sudoku-solver' },
      { id: 28, name: 'Tetris Game', category: 'games', tech: ['JavaScript', 'Canvas'], folder: 'Games/tetris-game' },
      { id: 29, name: 'Tic Tac Toe', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/tic-tac-toe' },
      { id: 30, name: 'Trivia Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/trivia-game' },
      { id: 31, name: 'Typing Game', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/typing-game' },
      { id: 32, name: 'Whack A Mole', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/whack-a-mole' },
      { id: 33, name: 'Wordle Clone', category: 'games', tech: ['JavaScript', 'CSS3'], folder: 'Games/wordle-clone' },
      
      // PRODUCTIVITY (23 projects)
      { id: 36, name: 'Todo Advanced', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/todo-advanced' },
      { id: 37, name: 'Notes App', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/notes-app' },
      { id: 38, name: 'Calendar App', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/calendar-app' },
      { id: 39, name: 'Pomodoro Timer', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/pomodoro-timer' },
      { id: 40, name: 'Habit Tracker', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/habit-tracker' },
      { id: 41, name: 'Goal Tracker', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/goal-tracker' },
      { id: 42, name: 'Daily Goals', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/daily-goals' },
      { id: 43, name: 'Task App', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/task-app' },
      { id: 44, name: 'Kanban Board', category: 'productivity', tech: ['JavaScript', 'Drag & Drop'], folder: 'Productivity/kanban-board' },
      { id: 45, name: 'Focus Mode', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/focus-mode' },
      { id: 46, name: 'Break Timer', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/break-timer' },
      { id: 47, name: 'Study Timer', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/study-timer' },
      { id: 48, name: 'Meeting Timer', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/meeting-timer' },
      { id: 49, name: 'Distraction Blocker', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/distraction-blocker' },
      { id: 50, name: 'Screen Time', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/screen-time' },
      { id: 51, name: 'Productivity Stats', category: 'productivity', tech: ['JavaScript', 'Charts'], folder: 'Productivity/productivity-stats' },
      { id: 52, name: 'Flashcard App', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/flashcard-app' },
      { id: 53, name: 'Journal App', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/journal-app' },
      { id: 54, name: 'Bookmark Manager', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/bookmark-manager' },
      { id: 55, name: 'Clipboard Manager', category: 'productivity', tech: ['JavaScript', 'LocalStorage'], folder: 'Productivity/clipboard-manager' },
      { id: 56, name: 'Weekly Planner', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/weekly-planner' },
      { id: 57, name: 'Monthly Calendar', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/monthly-calendar' },
      { id: 58, name: 'Year Planner', category: 'productivity', tech: ['JavaScript', 'CSS3'], folder: 'Productivity/year-planner' },
      
      // UTILITIES (27 projects)
      { id: 59, name: 'Calculator App', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/calculator-app' },
      { id: 60, name: 'Unit Converter', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/unit-converter' },
      { id: 61, name: 'Currency Converter', category: 'utilities', tech: ['JavaScript', 'API'], folder: 'Utilities/currency-converter' },
      { id: 62, name: 'BMI Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/bmi-calculator' },
      { id: 63, name: 'Tip Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/tip-calculator' },
      { id: 64, name: 'Loan Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/loan-calculator' },
      { id: 65, name: 'Age Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/age-calculator' },
      { id: 66, name: 'Date Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/date-calculator' },
      { id: 67, name: 'Timezone Calculator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/timezone-calc' },
      { id: 68, name: 'World Clock', category: 'utilities', tech: ['JavaScript', 'API'], folder: 'Utilities/world-clock' },
      { id: 69, name: 'World Time', category: 'utilities', tech: ['JavaScript', 'API'], folder: 'Utilities/world-time' },
      { id: 70, name: 'Digital Clock', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/digital-clock' },
      { id: 71, name: 'Stopwatch', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/stopwatch' },
      { id: 72, name: 'Timer App', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/timer-app' },
      { id: 73, name: 'Countdown Timer', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/countdown-timer' },
      { id: 74, name: 'Countdown Event', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/countdown-event' },
      { id: 75, name: 'Event Countdown', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/event-countdown' },
      { id: 76, name: 'Alarm Clock', category: 'utilities', tech: ['JavaScript', 'Audio'], folder: 'Utilities/alarm-clock' },
      { id: 77, name: 'QR Generator', category: 'utilities', tech: ['JavaScript', 'QR Library'], folder: 'Utilities/qr-generator' },
      { id: 78, name: 'Barcode Generator', category: 'utilities', tech: ['JavaScript', 'Library'], folder: 'Utilities/barcode-generator' },
      { id: 79, name: 'UUID Generator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/uuid-generator' },
      { id: 80, name: 'Random Number', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/random-number' },
      { id: 81, name: 'Name Generator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/name-generator' },
      { id: 82, name: 'Password Generator', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/password-generator' },
      { id: 83, name: 'Password Strength', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/password-strength' },
      { id: 84, name: 'Phone Formatter', category: 'utilities', tech: ['JavaScript', 'CSS3'], folder: 'Utilities/phone-formatter' },
      { id: 85, name: 'Email Validator', category: 'utilities', tech: ['JavaScript', 'Regex'], folder: 'Utilities/email-validator' },
      
      // DEVELOPER TOOLS (24 projects)
      { id: 86, name: 'Code Editor', category: 'developer', tech: ['JavaScript', 'CodeMirror'], folder: 'Developer/code-editor' },
      { id: 87, name: 'Code Beautifier', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/code-beautifier' },
      { id: 88, name: 'JSON Formatter', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/json-formatter' },
      { id: 89, name: 'JSON Viewer', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/json-viewer' },
      { id: 90, name: 'XML Formatter', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/xml-formatter' },
      { id: 91, name: 'Markdown Editor', category: 'developer', tech: ['JavaScript', 'Marked.js'], folder: 'Developer/markdown-editor' },
      { id: 92, name: 'Markdown Preview', category: 'developer', tech: ['JavaScript', 'Marked.js'], folder: 'Developer/markdown-preview' },
      { id: 93, name: 'Regex Tester', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/regex-tester' },
      { id: 94, name: 'Base64 Converter', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/base64-converter' },
      { id: 95, name: 'Base64 Tool', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/base64-tool' },
      { id: 96, name: 'Binary Converter', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/binary-converter' },
      { id: 97, name: 'Hash Generator', category: 'developer', tech: ['JavaScript', 'Crypto'], folder: 'Developer/hash-generator' },
      { id: 98, name: 'Hash Calculator', category: 'developer', tech: ['JavaScript', 'Crypto'], folder: 'Developer/hash-calculator' },
      { id: 99, name: 'Minifier Tool', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/minifier-tool' },
      { id: 100, name: 'Diff Checker', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/diff-checker' },
      { id: 101, name: 'Text Diff', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/text-diff' },
      { id: 102, name: 'CSS Generator', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/css-generator' },
      { id: 103, name: 'Gradient Generator', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/gradient-generator' },
      { id: 104, name: 'Color Picker', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/color-picker' },
      { id: 105, name: 'RGB Hex Converter', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/rgb-hex-converter' },
      { id: 106, name: 'Lorem Generator', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/lorem-generator' },
      { id: 107, name: 'Lorem Ipsum', category: 'developer', tech: ['JavaScript', 'CSS3'], folder: 'Developer/lorem-ipsum' },
      { id: 108, name: 'API Demo', category: 'developer', tech: ['JavaScript', 'Fetch API'], folder: 'Developer/api-demo' },
      { id: 109, name: 'GitHub Profile', category: 'developer', tech: ['JavaScript', 'GitHub API'], folder: 'Developer/github-profile' },
      
      // CREATIVE (13 projects)
      { id: 110, name: 'Drawing App', category: 'creative', tech: ['JavaScript', 'Canvas'], folder: 'Creative/drawing-app' },
      { id: 111, name: 'Pixel Art', category: 'creative', tech: ['JavaScript', 'Canvas'], folder: 'Creative/pixel-art' },
      { id: 112, name: 'Color Palette', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/color-palette' },
      { id: 113, name: 'Color Flipper', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/color-flipper' },
      { id: 114, name: 'Audio Visualizer', category: 'creative', tech: ['JavaScript', 'Web Audio'], folder: 'Creative/audio-visualizer' },
      { id: 115, name: 'Music Player', category: 'creative', tech: ['JavaScript', 'Audio'], folder: 'Creative/music-player' },
      { id: 116, name: 'Meme Generator', category: 'creative', tech: ['JavaScript', 'Canvas'], folder: 'Creative/meme-generator' },
      { id: 117, name: 'ASCII Art', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/ascii-art' },
      { id: 118, name: 'Emoji Picker', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/emoji-picker' },
      { id: 119, name: 'Image Gallery', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/image-gallery' },
      { id: 120, name: 'Image Slider', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/image-slider' },
      { id: 121, name: 'Lightbox', category: 'creative', tech: ['JavaScript', 'CSS3'], folder: 'Creative/lightbox' },
      { id: 122, name: 'Video Player', category: 'creative', tech: ['JavaScript', 'HTML5 Video'], folder: 'Creative/video-player' },
      
      // FINANCE (4 projects)
      { id: 123, name: 'Budget Planner', category: 'finance', tech: ['JavaScript', 'LocalStorage'], folder: 'Finance/budget-planner' },
      { id: 124, name: 'Expense Tracker', category: 'finance', tech: ['JavaScript', 'Charts'], folder: 'Finance/expense-tracker' },
      { id: 125, name: 'Invoice Generator', category: 'finance', tech: ['JavaScript', 'PDF'], folder: 'Finance/invoice-generator' },
      { id: 126, name: 'Crypto Tracker', category: 'finance', tech: ['JavaScript', 'API'], folder: 'Finance/crypto-tracker' },
      
      // HEALTH (2 projects)
      { id: 127, name: 'Fitness Tracker', category: 'health', tech: ['JavaScript', 'LocalStorage'], folder: 'Health/fitness-tracker' },
      { id: 128, name: 'Meditation Timer', category: 'health', tech: ['JavaScript', 'Audio'], folder: 'Health/meditation-timer' },
      
      // UI COMPONENTS (29 projects)
      { id: 129, name: '404 Page', category: 'ui-components', tech: ['HTML5', 'CSS3'], folder: 'UI-Components/404-page' },
      { id: 130, name: 'Accordion', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/accordion' },
      { id: 131, name: 'Breadcrumb', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/breadcrumb' },
      { id: 132, name: 'Carousel', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/carousel' },
      { id: 133, name: 'Coming Soon', category: 'ui-components', tech: ['HTML5', 'CSS3'], folder: 'UI-Components/coming-soon' },
      { id: 134, name: 'Context Menu', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/context-menu' },
      { id: 135, name: 'Copy to Clipboard', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/copy-to-clipboard' },
      { id: 136, name: 'Countdown Event', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/countdown-event' },
      { id: 137, name: 'Drag Drop', category: 'ui-components', tech: ['JavaScript', 'Drag API'], folder: 'UI-Components/drag-drop' },
      { id: 138, name: 'Dropdown Menu', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/dropdown-menu' },
      { id: 139, name: 'FAQ Section', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/faq-section' },
      { id: 140, name: 'Infinite Scroll', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/infinite-scroll' },
      { id: 141, name: 'Loading Spinner', category: 'ui-components', tech: ['CSS3', 'HTML5'], folder: 'UI-Components/loading-spinner' },
      { id: 142, name: 'Modal Popup', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/modal-popup' },
      { id: 143, name: 'Pagination', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/pagination' },
      { id: 144, name: 'Pricing Table', category: 'ui-components', tech: ['HTML5', 'CSS3'], folder: 'UI-Components/pricing-table' },
      { id: 145, name: 'Profile Card', category: 'ui-components', tech: ['HTML5', 'CSS3'], folder: 'UI-Components/profile-card' },
      { id: 146, name: 'Progress Bar', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/progress-bar' },
      { id: 147, name: 'Scroll to Top', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/scroll-to-top' },
      { id: 148, name: 'Search Filter', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/search-filter' },
      { id: 149, name: 'Sidebar', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/sidebar' },
      { id: 150, name: 'Skeleton Loader', category: 'ui-components', tech: ['CSS3', 'HTML5'], folder: 'UI-Components/skeleton-loader' },
      { id: 151, name: 'Star Rating', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/star-rating' },
      { id: 152, name: 'Tabs', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/tabs' },
      { id: 153, name: 'Team Members', category: 'ui-components', tech: ['HTML5', 'CSS3'], folder: 'UI-Components/team-members' },
      { id: 154, name: 'Testimonial Slider', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/testimonial-slider' },
      { id: 155, name: 'Theme Switcher', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/theme-switcher' },
      { id: 156, name: 'Toast Notification', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/toast-notification' },
      { id: 157, name: 'Tooltip', category: 'ui-components', tech: ['JavaScript', 'CSS3'], folder: 'UI-Components/tooltip' },
      
      // ENTERTAINMENT (14 projects)
      { id: 158, name: 'Dictionary App', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/dictionary-app' },
      { id: 159, name: 'Joke Generator', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/joke-generator' },
      { id: 160, name: 'Lorem Generator', category: 'entertainment', tech: ['JavaScript', 'CSS3'], folder: 'Entertainment/lorem-generator' },
      { id: 161, name: 'Lorem Ipsum', category: 'entertainment', tech: ['JavaScript', 'CSS3'], folder: 'Entertainment/lorem-ipsum' },
      { id: 162, name: 'Movie Search', category: 'entertainment', tech: ['JavaScript', 'OMDB API'], folder: 'Entertainment/movie-search' },
      { id: 163, name: 'Music Player', category: 'entertainment', tech: ['JavaScript', 'Audio'], folder: 'Entertainment/music-player' },
      { id: 164, name: 'News App', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/news-app' },
      { id: 165, name: 'Podcast Player', category: 'entertainment', tech: ['JavaScript', 'Audio'], folder: 'Entertainment/podcast-player' },
      { id: 166, name: 'Quote Generator', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/quote-generator' },
      { id: 167, name: 'Random Quote', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/random-quote' },
      { id: 168, name: 'Random User', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/random-user' },
      { id: 169, name: 'Recipe App', category: 'entertainment', tech: ['JavaScript', 'API'], folder: 'Entertainment/recipe-app' },
      { id: 170, name: 'Speech to Text', category: 'entertainment', tech: ['JavaScript', 'Web Speech'], folder: 'Entertainment/speech-to-text' },
      { id: 171, name: 'Text to Speech', category: 'entertainment', tech: ['JavaScript', 'Web Speech'], folder: 'Entertainment/text-to-speech' },
      
      // EDUCATION (4 projects)
      { id: 172, name: 'Math Quiz', category: 'education', tech: ['JavaScript', 'CSS3'], folder: 'Education/math-quiz' },
      { id: 173, name: 'Quiz App', category: 'education', tech: ['JavaScript', 'CSS3'], folder: 'Education/quiz-app' },
      { id: 174, name: 'Typing Speed', category: 'education', tech: ['JavaScript', 'CSS3'], folder: 'Education/typing-speed' },
      { id: 175, name: 'Word Counter', category: 'education', tech: ['JavaScript', 'CSS3'], folder: 'Education/word-counter' }
    ];
    
    localStorage.setItem('portfolioProjects', JSON.stringify(allProjects));
    console.log('✅ All 188 projects loaded!');
  }

  console.log('✅ Portfolio default data initialized');
  console.log('📊 Data Summary:');
  console.log('  - Projects:', JSON.parse(localStorage.getItem('portfolioProjects') || '[]').length);
  console.log('  - Testimonials:', JSON.parse(localStorage.getItem('portfolioTestimonials') || '[]').length);
  console.log('  - Services:', JSON.parse(localStorage.getItem('portfolioServices') || '[]').length);
  console.log('  - Experience:', JSON.parse(localStorage.getItem('portfolioExperience') || '[]').length);
  console.log('  - Skills:', JSON.parse(localStorage.getItem('portfolioSkills') || '[]').length);
}

// Run initialization
initializeDefaultData();

