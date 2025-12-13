const db = require('./database');

console.log('🚀 Adding more projects to reach 200+...\n');

const moreBatchProjects = [
  // More Go Projects
  {
    title: "Go URL Shortener",
    description: "High-performance URL shortening service with custom aliases, analytics, QR codes, and Redis caching.",
    category: "Go",
    language: "Go",
    technology: "Go, Redis, PostgreSQL",
    github_url: "https://github.com/golang/go",
    requirements: "Go 1.19+, Redis",
    status: "approved"
  },
  {
    title: "Go Task Queue System",
    description: "Distributed task queue with worker pools, job scheduling, retry logic, and monitoring dashboard.",
    category: "Go",
    language: "Go",
    technology: "Go, Redis, RabbitMQ",
    github_url: "https://github.com/hibiken/asynq",
    requirements: "Go 1.18+, Redis",
    status: "approved"
  },
  {
    title: "Go Blog Engine",
    description: "Fast static blog generator with markdown support, themes, RSS feeds, and SEO optimization.",
    category: "Go",
    language: "Go",
    technology: "Go, Hugo, Markdown",
    github_url: "https://github.com/gohugoio/hugo",
    requirements: "Go 1.19+",
    status: "approved"
  },
  {
    title: "Go File Storage Service",
    description: "Cloud file storage with chunked uploads, encryption, compression, and S3 compatibility.",
    category: "Go",
    language: "Go",
    technology: "Go, MinIO, AWS S3",
    github_url: "https://github.com/minio/minio",
    requirements: "Go 1.19+",
    status: "approved"
  },
  {
    title: "Go Monitoring System",
    description: "Infrastructure monitoring with metrics collection, alerting, and beautiful dashboards.",
    category: "Go",
    language: "Go",
    technology: "Go, Prometheus, Grafana",
    github_url: "https://github.com/prometheus/prometheus",
    requirements: "Go 1.19+",
    status: "approved"
  },

  // More Rust Projects
  {
    title: "Rust HTTP Server",
    description: "Lightning-fast HTTP server with async I/O, middleware support, and WebSocket capabilities.",
    category: "Rust",
    language: "Rust",
    technology: "Tokio, Hyper, Tungstenite",
    github_url: "https://github.com/tokio-rs/tokio",
    requirements: "Rust 1.70+",
    status: "approved"
  },
  {
    title: "Rust Database ORM",
    description: "Type-safe ORM with query builder, migrations, connection pooling, and async support.",
    category: "Rust",
    language: "Rust",
    technology: "Diesel, PostgreSQL, Tokio",
    github_url: "https://github.com/diesel-rs/diesel",
    requirements: "Rust 1.70+, PostgreSQL",
    status: "approved"
  },
  {
    title: "Rust Text Editor",
    description: "Terminal-based text editor with syntax highlighting, multiple buffers, and plugin system.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Crossterm, Tree-sitter",
    github_url: "https://github.com/helix-editor/helix",
    requirements: "Rust 1.70+",
    status: "approved"
  },
  {
    title: "Rust Package Manager",
    description: "Fast package manager with dependency resolution, caching, and parallel downloads.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Tokio, Serde",
    github_url: "https://github.com/rust-lang/cargo",
    requirements: "Rust 1.70+",
    status: "approved"
  },
  {
    title: "Rust Image Processing",
    description: "High-performance image manipulation with filters, transformations, and format conversion.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Image, Rayon",
    github_url: "https://github.com/image-rs/image",
    requirements: "Rust 1.70+",
    status: "approved"
  },
  {
    title: "Rust WebAssembly App",
    description: "Web application compiled to WebAssembly with DOM manipulation and JavaScript interop.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Wasm-bindgen, Yew",
    github_url: "https://github.com/yewstack/yew",
    requirements: "Rust 1.70+, wasm-pack",
    status: "approved"
  },
  {
    title: "Rust Cryptocurrency Wallet",
    description: "Secure crypto wallet with multi-currency support, transaction signing, and hardware wallet integration.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Bitcoin, Ethereum",
    github_url: "https://github.com/rust-bitcoin/rust-bitcoin",
    requirements: "Rust 1.70+",
    status: "approved"
  },

  // More Flutter Projects
  {
    title: "Flutter Weather App",
    description: "Beautiful weather app with animations, location services, hourly/daily forecasts, and weather alerts.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, OpenWeather API, Geolocator",
    github_url: "https://github.com/flutter/flutter",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Todo App",
    description: "Task management app with categories, priorities, reminders, and cloud sync.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Firebase, Provider",
    github_url: "https://github.com/flutter/samples",
    requirements: "Flutter 3.0+, Firebase",
    status: "approved"
  },
  {
    title: "Flutter News Reader",
    description: "News aggregator with multiple sources, bookmarks, offline reading, and push notifications.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, News API, SQLite",
    github_url: "https://github.com/flutter/flutter",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Chat App",
    description: "Real-time messaging with group chats, media sharing, voice messages, and end-to-end encryption.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Firebase, WebRTC",
    github_url: "https://github.com/flutter/plugins",
    requirements: "Flutter 3.0+, Firebase",
    status: "approved"
  },
  {
    title: "Flutter Recipe App",
    description: "Cooking app with recipe search, step-by-step instructions, shopping list, and meal planning.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Spoonacular API, SQLite",
    github_url: "https://github.com/flutter/flutter",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Expense Manager",
    description: "Personal finance tracker with budget planning, expense categories, charts, and export features.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, SQLite, Charts",
    github_url: "https://github.com/flutter/samples",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Quiz App",
    description: "Interactive quiz application with multiple categories, timer, scoring, and leaderboard.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Firebase, Provider",
    github_url: "https://github.com/flutter/flutter",
    requirements: "Flutter 3.0+, Firebase",
    status: "approved"
  },
  {
    title: "Flutter Meditation App",
    description: "Mindfulness app with guided meditations, breathing exercises, progress tracking, and calming sounds.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Audio Players, Provider",
    github_url: "https://github.com/flutter/samples",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Travel App",
    description: "Travel booking app with destination search, hotel bookings, flight search, and itinerary planning.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Google Maps, Firebase",
    github_url: "https://github.com/flutter/flutter",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Cryptocurrency Tracker",
    description: "Crypto portfolio tracker with real-time prices, charts, alerts, and market analysis.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, CoinGecko API, Charts",
    github_url: "https://github.com/flutter/samples",
    requirements: "Flutter 3.0+",
    status: "approved"
  },

  // More Vue.js Projects
  {
    title: "Vue.js Music Streaming",
    description: "Spotify-like music streaming app with playlists, search, player controls, and recommendations.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Vuex, Howler.js",
    github_url: "https://github.com/vuejs/vue",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js Portfolio Builder",
    description: "Drag-and-drop portfolio website builder with templates, customization, and one-click deployment.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Vuedraggable, Netlify",
    github_url: "https://github.com/vuejs/vue-router",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js Social Network",
    description: "Facebook-like social platform with posts, friends, groups, events, and messaging.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Socket.io, MongoDB",
    github_url: "https://github.com/vuejs/vuex",
    requirements: "Node.js 16+, MongoDB",
    status: "approved"
  },
  {
    title: "Vue.js Booking System",
    description: "Appointment booking platform with calendar, time slots, notifications, and payment integration.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, FullCalendar, Stripe",
    github_url: "https://github.com/vuejs/vue",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js Recipe Platform",
    description: "Recipe sharing community with search, ratings, comments, and meal planning features.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Firebase, Algolia",
    github_url: "https://github.com/vuejs/awesome-vue",
    requirements: "Node.js 16+, Firebase",
    status: "approved"
  },
  {
    title: "Vue.js Fitness Tracker",
    description: "Workout tracking app with exercise library, progress charts, and goal setting.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Chart.js, IndexedDB",
    github_url: "https://github.com/vuejs/vue",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js Blog Platform",
    description: "Modern blogging platform with markdown editor, SEO tools, and analytics integration.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Nuxt, Markdown-it",
    github_url: "https://github.com/nuxt/nuxt",
    requirements: "Node.js 16+, Nuxt 3",
    status: "approved"
  },

  // More Angular Projects
  {
    title: "Angular Task Manager",
    description: "Project management tool with kanban boards, gantt charts, team collaboration, and time tracking.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, NgRx, Material",
    github_url: "https://github.com/angular/angular",
    requirements: "Node.js 16+, Angular 16",
    status: "approved"
  },
  {
    title: "Angular Social Media",
    description: "Social networking platform with posts, stories, messaging, and video calls.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, Firebase, WebRTC",
    github_url: "https://github.com/angular/components",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },
  {
    title: "Angular E-Commerce",
    description: "Full-featured online store with product catalog, cart, checkout, and order management.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, NgRx, Stripe",
    github_url: "https://github.com/angular/angular-cli",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },
  {
    title: "Angular Fitness App",
    description: "Workout tracking with exercise database, progress charts, and nutrition planning.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, Chart.js, Firebase",
    github_url: "https://github.com/angular/material",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },
  {
    title: "Angular Music Player",
    description: "Music streaming app with playlists, equalizer, lyrics, and social sharing.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, Howler.js, Material",
    github_url: "https://github.com/angular/angular",
    requirements: "Node.js 16+, Angular 16",
    status: "approved"
  },
  {
    title: "Angular Chat Application",
    description: "Real-time messaging with group chats, file sharing, video calls, and screen sharing.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, Socket.io, WebRTC",
    github_url: "https://github.com/angular/components",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },
  {
    title: "Angular Weather Dashboard",
    description: "Weather monitoring with forecasts, maps, alerts, and historical data visualization.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, OpenWeather API, Leaflet",
    github_url: "https://github.com/angular/angular-cli",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },

  // More TypeScript Projects
  {
    title: "TypeScript E-Commerce Backend",
    description: "Complete e-commerce API with products, orders, payments, inventory, and admin dashboard.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "NestJS, Prisma, Stripe",
    github_url: "https://github.com/nestjs/nest",
    requirements: "Node.js 16+, TypeScript 5+",
    status: "approved"
  },
  {
    title: "TypeScript Chat Server",
    description: "Real-time chat backend with Socket.io, rooms, private messages, and message history.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "Socket.io, Redis, MongoDB",
    github_url: "https://github.com/socketio/socket.io",
    requirements: "Node.js 16+, Redis",
    status: "approved"
  },
  {
    title: "TypeScript Task Queue",
    description: "Background job processing with Bull, scheduling, retries, and monitoring dashboard.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "Bull, Redis, Express",
    github_url: "https://github.com/OptimalBits/bull",
    requirements: "Node.js 16+, Redis",
    status: "approved"
  },
  {
    title: "TypeScript Authentication Service",
    description: "Auth microservice with JWT, OAuth2, 2FA, password reset, and session management.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "NestJS, Passport, Redis",
    github_url: "https://github.com/nestjs/passport",
    requirements: "Node.js 16+, Redis",
    status: "approved"
  },
  {
    title: "TypeScript File Upload API",
    description: "File upload service with chunked uploads, S3 storage, image processing, and CDN integration.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "Express, Multer, Sharp, AWS S3",
    github_url: "https://github.com/expressjs/multer",
    requirements: "Node.js 16+, AWS account",
    status: "approved"
  },
  {
    title: "TypeScript Email Service",
    description: "Email sending service with templates, scheduling, tracking, and multiple provider support.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "NestJS, Nodemailer, Bull",
    github_url: "https://github.com/nodemailer/nodemailer",
    requirements: "Node.js 16+, Redis",
    status: "approved"
  },
  {
    title: "TypeScript Payment Gateway",
    description: "Payment processing API with Stripe, PayPal, subscriptions, and webhook handling.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "NestJS, Stripe, PayPal",
    github_url: "https://github.com/stripe/stripe-node",
    requirements: "Node.js 16+",
    status: "approved"
  },
  {
    title: "TypeScript Notification Service",
    description: "Multi-channel notifications with email, SMS, push, in-app, and delivery tracking.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "NestJS, Twilio, Firebase",
    github_url: "https://github.com/nestjs/nest",
    requirements: "Node.js 16+",
    status: "approved"
  },
];

console.log(`📦 Total projects in this batch: ${moreBatchProjects.length}\n`);


// Seeding logic (same as before)
db.all('SELECT id, slug FROM categories', [], (err, categories) => {
  if (err) {
    console.error('❌ Error fetching categories:', err);
    process.exit(1);
  }

  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  db.get('SELECT id FROM users WHERE role = ?', ['admin'], (err, admin) => {
    if (err || !admin) {
      console.error('❌ Error fetching admin user:', err);
      process.exit(1);
    }

    const adminId = admin.id;
    let inserted = 0;
    let failed = 0;

    moreBatchProjects.forEach((project, index) => {
      const categorySlug = project.category.toLowerCase().replace(/\./g, '').replace(/\s+/g, '');
      const categoryId = categoryMap[categorySlug];

      if (!categoryId) {
        console.error(`❌ Invalid category "${project.category}" (slug: ${categorySlug})`);
        failed++;
        if (index === moreBatchProjects.length - 1) {
          printSummary();
        }
        return;
      }

      db.run(`
        INSERT INTO projects (
          title, description, category_id, user_id, language, 
          technology, file_path, github_url, demo_url, requirements, 
          status, downloads, views
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        project.title,
        project.description,
        categoryId,
        adminId,
        project.language,
        project.technology,
        'github-project',
        project.github_url,
        project.demo_url || '',
        project.requirements,
        project.status || 'approved',
        Math.floor(Math.random() * 400) + 100,
        Math.floor(Math.random() * 800) + 200
      ], (err) => {
        if (err) {
          console.error(`❌ Error inserting "${project.title}":`, err.message);
          failed++;
        } else {
          inserted++;
          if (inserted % 10 === 0) {
            console.log(`✅ Inserted ${inserted} projects...`);
          }
        }

        if (index === moreBatchProjects.length - 1) {
          setTimeout(() => {
            printSummary();
          }, 1000);
        }
      });
    });

    function printSummary() {
      console.log('\n' + '='.repeat(60));
      console.log(`📊 Summary:`);
      console.log(`   ✅ Successfully added: ${inserted} projects`);
      if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} projects`);
      }
      
      // Get total count
      db.get('SELECT COUNT(*) as total FROM projects', [], (err, result) => {
        if (!err) {
          console.log(`   📈 Total projects in database: ${result.total}`);
        }
        console.log('='.repeat(60));
        console.log('\n🎉 Done! Refresh your browser to see all projects!');
        db.close();
      });
    }
  });
});
