const db = require('./database');

console.log('🎯 Adding final batch to reach 200+ projects...\n');

const finalProjects = [
  // More Ruby Projects (7)
  {
    title: "Ruby on Rails Social Network",
    description: "Complete social platform with posts, friends, groups, messaging, and activity feeds.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails 7, ActionCable, PostgreSQL",
    github_url: "https://github.com/diaspora/diaspora",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails CMS",
    description: "Content management system with page builder, media library, and multi-language support.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, PostgreSQL, Redis",
    github_url: "https://github.com/refinery/refinerycms",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails Job Board",
    description: "Job posting platform with applications, company profiles, and email notifications.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, Sidekiq, PostgreSQL",
    github_url: "https://github.com/jobboard/jobboard",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails Forum",
    description: "Discussion forum with topics, posts, moderation tools, and user reputation system.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, PostgreSQL, Elasticsearch",
    github_url: "https://github.com/discourse/discourse",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails Booking System",
    description: "Appointment scheduling with calendar, notifications, and payment processing.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, Stripe, Twilio",
    github_url: "https://github.com/rails/rails",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails Marketplace",
    description: "Multi-vendor marketplace with product listings, orders, and commission management.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, Stripe Connect, PostgreSQL",
    github_url: "https://github.com/spree/spree",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },
  {
    title: "Ruby on Rails Analytics Dashboard",
    description: "Business intelligence dashboard with charts, reports, and data visualization.",
    category: "Ruby",
    language: "Ruby",
    technology: "Rails, Chartkick, PostgreSQL",
    github_url: "https://github.com/ankane/chartkick",
    requirements: "Ruby 3.0+, Rails 7",
    status: "approved"
  },

  // More Swift Projects (7)
  {
    title: "Swift Recipe App",
    description: "Cooking app with recipe search, step-by-step instructions, shopping list, and meal planning.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, CoreData, Spoonacular API",
    github_url: "https://github.com/apple/swift",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Fitness Tracker",
    description: "Health app with workout tracking, calorie counter, progress charts, and HealthKit integration.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, HealthKit, Charts",
    github_url: "https://github.com/SwiftUIX/SwiftUIX",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift News Reader",
    description: "News aggregator with multiple sources, bookmarks, offline reading, and dark mode.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, Combine, News API",
    github_url: "https://github.com/apple/swift",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Music Player",
    description: "Music app with playlist management, equalizer, lyrics, and Apple Music integration.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, AVFoundation, MusicKit",
    github_url: "https://github.com/SwiftUIX/SwiftUIX",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Task Manager",
    description: "Productivity app with tasks, projects, reminders, and iCloud sync.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, CoreData, CloudKit",
    github_url: "https://github.com/apple/swift",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Shopping List",
    description: "Smart shopping list with categories, barcode scanner, and shared lists.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, Vision, CloudKit",
    github_url: "https://github.com/SwiftUIX/SwiftUIX",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },
  {
    title: "Swift Habit Tracker",
    description: "Habit building app with streaks, reminders, statistics, and motivational quotes.",
    category: "Swift",
    language: "Swift",
    technology: "SwiftUI, CoreData, UserNotifications",
    github_url: "https://github.com/apple/swift",
    requirements: "Xcode 14+, iOS 16+",
    status: "approved"
  },

  // More Kotlin Projects (7)
  {
    title: "Kotlin Weather App",
    description: "Weather application with forecasts, location services, weather alerts, and beautiful UI.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Jetpack Compose, Retrofit",
    github_url: "https://github.com/android/compose-samples",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin News App",
    description: "News reader with multiple sources, bookmarks, offline mode, and push notifications.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Compose, Room, Retrofit",
    github_url: "https://github.com/android/architecture-samples",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Shopping App",
    description: "E-commerce app with product catalog, cart, checkout, and order tracking.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Compose, Firebase",
    github_url: "https://github.com/android/compose-samples",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Chat App",
    description: "Messaging app with real-time chat, group chats, media sharing, and encryption.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Firebase, WebRTC",
    github_url: "https://github.com/firebase/quickstart-android",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Expense Tracker",
    description: "Finance app with expense tracking, budget planning, charts, and export features.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Compose, Room, Charts",
    github_url: "https://github.com/android/architecture-samples",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Recipe App",
    description: "Cooking app with recipe search, favorites, shopping list, and meal planning.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Compose, Retrofit",
    github_url: "https://github.com/android/compose-samples",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },
  {
    title: "Kotlin Meditation App",
    description: "Mindfulness app with guided meditations, breathing exercises, and progress tracking.",
    category: "Kotlin",
    language: "Kotlin",
    technology: "Kotlin, Compose, ExoPlayer",
    github_url: "https://github.com/google/ExoPlayer",
    requirements: "Android Studio, Kotlin 1.9+",
    status: "approved"
  },

  // More Spring Boot Projects (6)
  {
    title: "Spring Boot Chat Application",
    description: "Real-time chat with WebSocket, group chats, file sharing, and message history.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, WebSocket, MongoDB",
    github_url: "https://github.com/spring-projects/spring-boot",
    requirements: "Java 17+, MongoDB",
    status: "approved"
  },
  {
    title: "Spring Boot Task Manager",
    description: "Project management with tasks, teams, deadlines, and notification system.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, JPA, PostgreSQL",
    github_url: "https://github.com/spring-projects/spring-framework",
    requirements: "Java 17+, PostgreSQL",
    status: "approved"
  },
  {
    title: "Spring Boot File Storage",
    description: "Cloud file storage with upload, download, sharing, and S3 integration.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, AWS S3, MySQL",
    github_url: "https://github.com/spring-projects/spring-boot",
    requirements: "Java 17+, AWS account",
    status: "approved"
  },
  {
    title: "Spring Boot Social Media",
    description: "Social platform with posts, likes, comments, follow system, and feeds.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, MongoDB, Redis",
    github_url: "https://github.com/spring-projects/spring-framework",
    requirements: "Java 17+, MongoDB",
    status: "approved"
  },
  {
    title: "Spring Boot Booking System",
    description: "Reservation platform with calendar, availability, payments, and notifications.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, Stripe, PostgreSQL",
    github_url: "https://github.com/spring-projects/spring-boot",
    requirements: "Java 17+, PostgreSQL",
    status: "approved"
  },
  {
    title: "Spring Boot Analytics Platform",
    description: "Data analytics with dashboards, reports, charts, and real-time metrics.",
    category: "Spring Boot",
    language: "Java",
    technology: "Spring Boot, Elasticsearch, Kibana",
    github_url: "https://github.com/spring-projects/spring-framework",
    requirements: "Java 17+, Elasticsearch",
    status: "approved"
  },
];

console.log(`📦 Total projects in final batch: ${finalProjects.length}\n`);


// Seeding logic
db.all('SELECT id, slug FROM categories', [], (err, categories) => {
  if (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }

  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.slug] = cat.id;
  });

  db.get('SELECT id FROM users WHERE role = ?', ['admin'], (err, admin) => {
    if (err || !admin) {
      console.error('❌ Error:', err);
      process.exit(1);
    }

    const adminId = admin.id;
    let inserted = 0;
    let failed = 0;

    finalProjects.forEach((project, index) => {
      const categorySlug = project.category.toLowerCase().replace(/\./g, '').replace(/\s+/g, '');
      const categoryId = categoryMap[categorySlug];

      if (!categoryId) {
        console.error(`❌ Invalid category "${project.category}"`);
        failed++;
        if (index === finalProjects.length - 1) {
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
        Math.floor(Math.random() * 500) + 150,
        Math.floor(Math.random() * 1000) + 300
      ], (err) => {
        if (err) {
          console.error(`❌ Error: "${project.title}":`, err.message);
          failed++;
        } else {
          inserted++;
          if (inserted % 10 === 0) {
            console.log(`✅ Inserted ${inserted} projects...`);
          }
        }

        if (index === finalProjects.length - 1) {
          setTimeout(() => {
            printSummary();
          }, 1000);
        }
      });
    });

    function printSummary() {
      db.get('SELECT COUNT(*) as total FROM projects', [], (err, result) => {
        console.log('\n' + '='.repeat(60));
        console.log(`📊 FINAL SUMMARY:`);
        console.log(`   ✅ Successfully added: ${inserted} projects`);
        if (failed > 0) {
          console.log(`   ❌ Failed: ${failed} projects`);
        }
        if (!err) {
          console.log(`   🎉 TOTAL PROJECTS IN DATABASE: ${result.total}`);
        }
        console.log('='.repeat(60));
        console.log('\n🚀 Your CodeShare platform is now MASSIVE!');
        console.log('🔄 Refresh your browser to see all projects!');
        db.close();
      });
    }
  });
});
