const db = require('./database');

console.log('🔷 Adding C# projects...\n');

const csharpProjects = [
  {
    title: "ASP.NET Core MVC E-Commerce",
    description: "Full-featured e-commerce platform with product management, shopping cart, order processing, payment integration with Stripe, and comprehensive admin dashboard.",
    category: "C#",
    language: "C#",
    technology: "ASP.NET Core MVC, Entity Framework, SQL Server, Stripe",
    github_url: "https://github.com/dotnet-architecture/eShopOnWeb",
    requirements: ".NET 7+, SQL Server, Visual Studio",
    status: "approved"
  },
  {
    title: "Blazor WebAssembly SPA",
    description: "Modern single-page application with Blazor WebAssembly, authentication, real-time updates, and responsive UI components.",
    category: "C#",
    language: "C#",
    technology: "Blazor WebAssembly, SignalR, ASP.NET Core",
    github_url: "https://github.com/dotnet/blazor-samples",
    requirements: ".NET 7+, Visual Studio 2022",
    status: "approved"
  },
  {
    title: "WPF Desktop Inventory System",
    description: "Professional inventory management desktop application with barcode scanning, reporting, stock alerts, and modern MVVM architecture.",
    category: "C#",
    language: "C#",
    technology: "WPF, MVVM, Entity Framework, SQL Server",
    github_url: "https://github.com/microsoft/WPF-Samples",
    requirements: ".NET 6+, SQL Server, Visual Studio",
    status: "approved"
  },
  {
    title: "ASP.NET Core Web API",
    description: "RESTful API with JWT authentication, Swagger documentation, CQRS pattern, repository pattern, and comprehensive unit tests.",
    category: "C#",
    language: "C#",
    technology: "ASP.NET Core, Entity Framework, JWT, Swagger",
    github_url: "https://github.com/jasontaylordev/CleanArchitecture",
    requirements: ".NET 7+, SQL Server",
    status: "approved"
  },
  {
    title: "Blazor Server Dashboard",
    description: "Real-time admin dashboard with charts, data tables, user management, and beautiful Material Design UI.",
    category: "C#",
    language: "C#",
    technology: "Blazor Server, SignalR, MudBlazor",
    github_url: "https://github.com/MudBlazor/MudBlazor",
    requirements: ".NET 7+, Visual Studio 2022",
    status: "approved"
  },
  {
    title: "WinForms Point of Sale System",
    description: "Complete POS system with sales processing, inventory tracking, customer management, receipt printing, and reporting.",
    category: "C#",
    language: "C#",
    technology: "Windows Forms, SQL Server, Crystal Reports",
    github_url: "https://github.com/dotnet/winforms",
    requirements: ".NET Framework 4.8+, SQL Server",
    status: "approved"
  },
  {
    title: "ASP.NET Core Identity Server",
    description: "Authentication and authorization server with OAuth2, OpenID Connect, multi-factor authentication, and user management.",
    category: "C#",
    language: "C#",
    technology: "IdentityServer4, ASP.NET Core, Entity Framework",
    github_url: "https://github.com/IdentityServer/IdentityServer4",
    requirements: ".NET 6+, SQL Server",
    status: "approved"
  },
  {
    title: "Xamarin Mobile App",
    description: "Cross-platform mobile app for iOS and Android with MVVM, REST API integration, and offline data sync.",
    category: "C#",
    language: "C#",
    technology: "Xamarin.Forms, MVVM, SQLite",
    github_url: "https://github.com/xamarin/xamarin-forms-samples",
    requirements: "Visual Studio 2022, Xamarin",
    status: "approved"
  },
  {
    title: "ASP.NET Core Microservices",
    description: "Microservices architecture with API Gateway, service discovery, message bus, Docker containers, and Kubernetes deployment.",
    category: "C#",
    language: "C#",
    technology: "ASP.NET Core, RabbitMQ, Docker, Kubernetes",
    github_url: "https://github.com/dotnet-architecture/eShopOnContainers",
    requirements: ".NET 7+, Docker, Kubernetes",
    status: "approved"
  },
  {
    title: "WPF Hospital Management System",
    description: "Comprehensive hospital management with patient records, appointments, billing, pharmacy, lab reports, and staff management.",
    category: "C#",
    language: "C#",
    technology: "WPF, MVVM, Entity Framework, SQL Server",
    github_url: "https://github.com/microsoft/WPF-Samples",
    requirements: ".NET 6+, SQL Server",
    status: "approved"
  },
  {
    title: "ASP.NET Core CMS",
    description: "Content management system with page builder, media library, SEO tools, multi-language support, and role-based access.",
    category: "C#",
    language: "C#",
    technology: "ASP.NET Core, Entity Framework, PostgreSQL",
    github_url: "https://github.com/OrchardCMS/OrchardCore",
    requirements: ".NET 7+, PostgreSQL",
    status: "approved"
  },
  {
    title: "Blazor Chat Application",
    description: "Real-time chat with SignalR, group chats, private messages, file sharing, and emoji support.",
    category: "C#",
    language: "C#",
    technology: "Blazor, SignalR, ASP.NET Core",
    github_url: "https://github.com/dotnet/aspnetcore",
    requirements: ".NET 7+, Visual Studio 2022",
    status: "approved"
  },
  {
    title: "WinForms School Management",
    description: "Complete school management with student records, attendance, grades, timetable, fee management, and parent portal.",
    category: "C#",
    language: "C#",
    technology: "Windows Forms, Entity Framework, SQL Server",
    github_url: "https://github.com/dotnet/winforms",
    requirements: ".NET Framework 4.8+, SQL Server",
    status: "approved"
  },
  {
    title: "ASP.NET Core Blog Platform",
    description: "Modern blogging platform with markdown editor, comments, tags, SEO optimization, and social media integration.",
    category: "C#",
    language: "C#",
    technology: "ASP.NET Core MVC, Entity Framework, Redis",
    github_url: "https://github.com/Moonglade/Moonglade",
    requirements: ".NET 7+, SQL Server",
    status: "approved"
  },
  {
    title: "Unity 3D Game Project",
    description: "Complete 3D game with physics, AI, multiplayer networking, inventory system, and beautiful graphics.",
    category: "C#",
    language: "C#",
    technology: "Unity 3D, C#, Photon Networking",
    github_url: "https://github.com/Unity-Technologies/ml-agents",
    requirements: "Unity 2022+, Visual Studio",
    status: "approved"
  },
];

console.log(`📦 Total C# projects to add: ${csharpProjects.length}\n`);

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

    csharpProjects.forEach((project, index) => {
      const categoryId = categoryMap['csharp'];

      if (!categoryId) {
        console.error(`❌ C# category not found!`);
        failed++;
        if (index === csharpProjects.length - 1) {
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
          if (inserted % 5 === 0) {
            console.log(`✅ Inserted ${inserted} C# projects...`);
          }
        }

        if (index === csharpProjects.length - 1) {
          setTimeout(() => {
            printSummary();
          }, 1000);
        }
      });
    });

    function printSummary() {
      db.get('SELECT COUNT(*) as total FROM projects', [], (err, result) => {
        console.log('\n' + '='.repeat(60));
        console.log(`📊 C# PROJECTS ADDED:`);
        console.log(`   ✅ Successfully added: ${inserted} C# projects`);
        if (failed > 0) {
          console.log(`   ❌ Failed: ${failed} projects`);
        }
        if (!err) {
          console.log(`   🎉 TOTAL PROJECTS IN DATABASE: ${result.total}`);
        }
        console.log('='.repeat(60));
        console.log('\n🔷 C# category is now complete!');
        console.log('🔄 Refresh your browser to see C# projects!');
        db.close();
      });
    }
  });
});
