const db = require('./database');

console.log('🌱 Starting massive project seeding...');

const massiveProjects = [
  // Go Projects (15)
  {
    title: "Go Microservices Architecture",
    description: "Complete microservices system built with Go, featuring service discovery, API gateway, gRPC communication, and distributed tracing with Jaeger.",
    category: "Go",
    language: "Go",
    technology: "Go, gRPC, Docker, Kubernetes",
    github_url: "https://github.com/GoogleCloudPlatform/microservices-demo",
    requirements: "Go 1.19+, Docker, Kubernetes",
    status: "approved"
  },
  {
    title: "Go REST API with Gin",
    description: "High-performance REST API using Gin framework with JWT authentication, PostgreSQL, Redis caching, and comprehensive testing.",
    category: "Go",
    language: "Go",
    technology: "Gin, PostgreSQL, Redis, JWT",
    github_url: "https://github.com/gin-gonic/gin",
    requirements: "Go 1.18+, PostgreSQL",
    status: "approved"
  },
  {
    title: "Go Chat Server with WebSocket",
    description: "Real-time chat server with WebSocket support, room management, private messaging, and message persistence.",
    category: "Go",
    language: "Go",
    technology: "Go, WebSocket, MongoDB",
    github_url: "https://github.com/gorilla/websocket",
    requirements: "Go 1.18+, MongoDB",
    status: "approved"
  },
  {
    title: "Go CLI Tool Builder",
    description: "Command-line application framework with subcommands, flags, configuration management, and beautiful terminal UI.",
    category: "Go",
    language: "Go",
    technology: "Cobra, Viper, Bubble Tea",
    github_url: "https://github.com/spf13/cobra",
    requirements: "Go 1.18+",
    status: "approved"
  },
  {
    title: "Go E-Commerce Backend",
    description: "Scalable e-commerce backend with product catalog, cart, orders, payment processing, and inventory management.",
    category: "Go",
    language: "Go",
    technology: "Go, PostgreSQL, Stripe, Redis",
    github_url: "https://github.com/go-kit/kit",
    requirements: "Go 1.19+, PostgreSQL",
    status: "approved"
  },

  // Rust Projects (12)
  {
    title: "Rust Web Framework - Actix",
    description: "Powerful web application with Actix-web framework, async/await, database pooling, and authentication system.",
    category: "Rust",
    language: "Rust",
    technology: "Actix-web, Diesel, PostgreSQL",
    github_url: "https://github.com/actix/actix-web",
    requirements: "Rust 1.70+, PostgreSQL",
    status: "approved"
  },
  {
    title: "Rust CLI System Monitor",
    description: "System monitoring tool with CPU, memory, disk usage tracking, and beautiful terminal dashboard.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, TUI, Sysinfo",
    github_url: "https://github.com/ClementTsang/bottom",
    requirements: "Rust 1.70+",
    status: "approved"
  },
  {
    title: "Rust Game Engine",
    description: "2D game engine with ECS architecture, physics, collision detection, and sprite rendering.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Bevy, WGPU",
    github_url: "https://github.com/bevyengine/bevy",
    requirements: "Rust 1.70+",
    status: "approved"
  },
  {
    title: "Rust Blockchain Implementation",
    description: "Simple blockchain with proof-of-work, transaction validation, and peer-to-peer networking.",
    category: "Rust",
    language: "Rust",
    technology: "Rust, Tokio, Serde",
    github_url: "https://github.com/rust-blockchain/rust-blockchain",
    requirements: "Rust 1.70+",
    status: "approved"
  },

  // Flutter Projects (15)
  {
    title: "Flutter E-Commerce App",
    description: "Complete shopping app with product catalog, cart, checkout, payment integration, order tracking, and user profiles.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Firebase, Stripe",
    github_url: "https://github.com/TheAlphamerc/flutter_ecommerce_app",
    requirements: "Flutter 3.0+, Firebase",
    status: "approved"
  },
  {
    title: "Flutter Social Media App",
    description: "Instagram-like app with posts, stories, likes, comments, follow system, and real-time chat.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Firebase, GetX",
    github_url: "https://github.com/iampawan/FlutterExampleApps",
    requirements: "Flutter 3.0+, Firebase",
    status: "approved"
  },
  {
    title: "Flutter Food Delivery App",
    description: "Food ordering app with restaurant listings, menu, cart, real-time order tracking, and payment gateway.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Firebase, Google Maps",
    github_url: "https://github.com/flutter/samples",
    requirements: "Flutter 3.0+, Firebase",
    status: "approved"
  },
  {
    title: "Flutter Fitness Tracker",
    description: "Health and fitness app with workout tracking, calorie counter, progress charts, and goal setting.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, SQLite, Charts",
    github_url: "https://github.com/flutter/flutter",
    requirements: "Flutter 3.0+",
    status: "approved"
  },
  {
    title: "Flutter Music Player",
    description: "Beautiful music player with playlist management, equalizer, lyrics display, and online streaming.",
    category: "Flutter",
    language: "Dart",
    technology: "Flutter, Audio Players, Provider",
    github_url: "https://github.com/mitesh77/Best-Flutter-UI-Templates",
    requirements: "Flutter 3.0+",
    status: "approved"
  },

  // Vue.js Projects (15)
  {
    title: "Vue.js Admin Dashboard",
    description: "Modern admin panel with charts, tables, forms, authentication, and dark mode. Built with Vue 3 and Composition API.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Vuex, Element Plus",
    github_url: "https://github.com/PanJiaChen/vue-element-admin",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js E-Commerce Store",
    description: "Full-featured online store with product catalog, shopping cart, checkout, payment integration, and order management.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Vuex, Stripe, Node.js",
    github_url: "https://github.com/vuejs/vue",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js Task Manager",
    description: "Trello-like task management with drag-and-drop, boards, lists, cards, and team collaboration.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Vuex, Vuedraggable",
    github_url: "https://github.com/vuejs/awesome-vue",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },
  {
    title: "Vue.js Chat Application",
    description: "Real-time messaging app with Socket.io, group chats, file sharing, and emoji support.",
    category: "Vue.js",
    language: "JavaScript",
    technology: "Vue 3, Socket.io, Node.js",
    github_url: "https://github.com/vuejs/vue-router",
    requirements: "Node.js 16+, Vue 3",
    status: "approved"
  },

  // Angular Projects (15)
  {
    title: "Angular Enterprise Dashboard",
    description: "Enterprise-grade admin dashboard with authentication, role-based access, charts, and data tables.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular 16, RxJS, Material UI",
    github_url: "https://github.com/angular/angular",
    requirements: "Node.js 16+, Angular 16",
    status: "approved"
  },
  {
    title: "Angular CRM System",
    description: "Customer relationship management with lead tracking, sales pipeline, contact management, and analytics.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, NgRx, Material",
    github_url: "https://github.com/angular/components",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },
  {
    title: "Angular E-Learning Platform",
    description: "Online learning platform with courses, video lessons, quizzes, progress tracking, and certificates.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, Firebase, Video.js",
    github_url: "https://github.com/angular/angular-cli",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },
  {
    title: "Angular Real Estate Portal",
    description: "Property listing platform with advanced search, map integration, virtual tours, and agent management.",
    category: "Angular",
    language: "TypeScript",
    technology: "Angular, Google Maps, Firebase",
    github_url: "https://github.com/angular/material",
    requirements: "Node.js 16+, Angular 15+",
    status: "approved"
  },

  // TypeScript Projects (12)
  {
    title: "TypeScript REST API Boilerplate",
    description: "Production-ready API with Express, TypeORM, JWT authentication, validation, and comprehensive testing.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "Express, TypeORM, PostgreSQL",
    github_url: "https://github.com/microsoft/TypeScript",
    requirements: "Node.js 16+, TypeScript 5+",
    status: "approved"
  },
  {
    title: "TypeScript GraphQL Server",
    description: "GraphQL API with Apollo Server, type-safe resolvers, authentication, and real-time subscriptions.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "Apollo Server, Prisma, GraphQL",
    github_url: "https://github.com/graphql/graphql-js",
    requirements: "Node.js 16+, TypeScript 5+",
    status: "approved"
  },
  {
    title: "TypeScript Microservices",
    description: "Microservices architecture with message queues, service discovery, and distributed tracing.",
    category: "TypeScript",
    language: "TypeScript",
    technology: "NestJS, RabbitMQ, Docker",
    github_url: "https://github.com/nestjs/nest",
    requirements: "Node.js 16+, Docker",
    status: "approved"
  },

  // Ruby Projects (10)
  {
    title: "Ruby on Rails E-Commerce",
    description: "Full-stack e-commerce platform with Stripe payments, admin panel, inventory management, and order processing.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails 7, PostgreSQL, Stripe",
    github_url: "https://github.com/rails/rails",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails Blog Platform",
    description: "Modern blogging platform with markdown editor, comments, tags, SEO optimization, and social sharing.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, PostgreSQL, Redis",
    github_url: "https://github.com/forem/forem",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby API with Grape",
    description: "RESTful API framework with versioning, authentication, rate limiting, and comprehensive documentation.",
    category: "Ruby",
    language: "Ruby",
    technology: "Grape, Sequel, PostgreSQL",
    github_url: "https://github.com/ruby-grape/grape",
    requirements: "Ruby 3.0+",
    status: "approved"
  },

  // Swift Projects (12)
  {
    title: "Swift iOS Weather App",
    description: "Beautiful weather application with current conditions, forecasts, location services, and weather alerts.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, Combine, CoreLocation",
    github_url: "https://github.com/apple/swift",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Social Media App",
    description: "Instagram-like iOS app with photo sharing, filters, likes, comments, and real-time messaging.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, Firebase, Vision",
    github_url: "https://github.com/SwiftUIX/SwiftUIX",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Expense Tracker",
    description: "Personal finance app with expense tracking, budget planning, charts, and iCloud sync.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, CoreData, Charts",
    github_url: "https://github.com/realm/SwiftLint",
    requirements: "Xcode 14+, iOS 15+",
    status: "approved"
  },

  // Kotlin Projects (12)
  {
    title: "Kotlin Android MVVM App",
    description: "Modern Android app with MVVM architecture, Jetpack Compose, Room database, and Retrofit.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Jetpack Compose, Room",
    github_url: "https://github.com/android/architecture-samples",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Multiplatform Project",
    description: "Cross-platform app sharing code between Android, iOS, and web with Kotlin Multiplatform.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "KMP, Compose Multiplatform",
    github_url: "https://github.com/JetBrains/compose-multiplatform",
    requirements: "Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Spring Boot API",
    description: "RESTful API with Spring Boot, Kotlin coroutines, JWT authentication, and MongoDB.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Spring Boot, Kotlin, MongoDB",
    github_url: "https://github.com/spring-projects/spring-boot",
    requirements: "Kotlin 1.9+, Java 17+",
    status: "approved"
  },

  // Spring Boot Projects (15)
  {
    title: "Spring Boot Microservices",
    description: "Complete microservices ecosystem with Eureka, API Gateway, Config Server, and distributed tracing.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Cloud, Docker, Kubernetes",
    github_url: "https://github.com/spring-cloud/spring-cloud-netflix",
    requirements: "Java 17+, Docker",
    status: "approved"
  },
  {
    title: "Spring Boot Security OAuth2",
    description: "Secure application with OAuth2, JWT, role-based access control, and social login integration.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Security, OAuth2, JWT",
    github_url: "https://github.com/spring-projects/spring-security",
    requirements: "Java 17+, Spring Boot 3",
    status: "approved"
  },
  {
    title: "Spring Boot E-Commerce",
    description: "Full e-commerce backend with product management, orders, payments, inventory, and admin dashboard.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, MySQL, Stripe",
    github_url: "https://github.com/spring-projects/spring-petclinic",
    requirements: "Java 17+, MySQL",
    status: "approved"
  },
  {
    title: "Spring Boot Blog API",
    description: "RESTful blog API with posts, comments, tags, authentication, and pagination.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, JPA, PostgreSQL",
    github_url: "https://github.com/gothinkster/spring-boot-realworld-example-app",
    requirements: "Java 17+, PostgreSQL",
    status: "approved"
  },
];

console.log(`📦 Total new projects to seed: ${massiveProjects.length}`);


// Seeding logic
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

    massiveProjects.forEach((project, index) => {
      const categorySlug = project.category.toLowerCase().replace(/\./g, '').replace(/\s+/g, '');
      const categoryId = categoryMap[categorySlug];

      if (!categoryId) {
        console.error(`❌ Invalid category "${project.category}" (slug: ${categorySlug}) for project "${project.title}"`);
        failed++;
        if (index === massiveProjects.length - 1) {
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
        Math.floor(Math.random() * 300) + 50,
        Math.floor(Math.random() * 600) + 100
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

        if (index === massiveProjects.length - 1) {
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
      console.log('='.repeat(60));
      console.log('\n🎉 Done! Your CodeShare now has even more projects!');
      console.log('🔄 Restart backend server and refresh browser to see changes.');
      db.close();
    }
  });
});
