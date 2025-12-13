const db = require('./database');

/**
 * Easy script to add more projects to your CodeShare platform
 * 
 * Usage:
 * 1. Add your projects to the 'newProjects' array below
 * 2. Run: node addMoreProjects.js
 */

const newProjects = [
  // Add your projects here following this format:
  // {
  //   title: "Project Title",
  //   description: "Detailed description of the project...",
  //   category: "Java", // Must match existing category
  //   language: "Java",
  //   technology: "Spring Boot, MySQL",
  //   github_url: "https://github.com/username/repo",
  //   demo_url: "https://demo.example.com", // Optional
  //   requirements: "Java 11+, Maven, MySQL",
  //   status: "approved" // or "pending"
  // },
  
  // Example projects (uncomment and modify):
  /*
  {
    title: "Your Awesome Project",
    description: "A comprehensive description of what this project does, its features, and why it's useful for developers.",
    category: "React",
    language: "JavaScript",
    technology: "React, Node.js, MongoDB",
    github_url: "https://github.com/yourusername/your-project",
    demo_url: "",
    requirements: "Node.js 14+, MongoDB",
    status: "approved"
  }
  */
];

// Don't modify below this line unless you know what you're doing
console.log('🚀 Adding new projects to CodeShare...\n');

if (newProjects.length === 0) {
  console.log('⚠️  No projects to add!');
  console.log('📝 Edit this file and add projects to the newProjects array.');
  process.exit(0);
}

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

    newProjects.forEach((project, index) => {
      const categorySlug = project.category.toLowerCase().replace(/\./g, '');
      const categoryId = categoryMap[categorySlug];

      if (!categoryId) {
        console.error(`❌ Invalid category "${project.category}" for project "${project.title}"`);
        failed++;
        if (index === newProjects.length - 1) {
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
        Math.floor(Math.random() * 100) + 10,
        Math.floor(Math.random() * 200) + 50
      ], (err) => {
        if (err) {
          console.error(`❌ Error inserting "${project.title}":`, err.message);
          failed++;
        } else {
          inserted++;
          console.log(`✅ Added: ${project.title}`);
        }

        if (index === newProjects.length - 1) {
          setTimeout(() => {
            printSummary();
          }, 500);
        }
      });
    });

    function printSummary() {
      console.log('\n' + '='.repeat(50));
      console.log(`📊 Summary:`);
      console.log(`   ✅ Successfully added: ${inserted} projects`);
      if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} projects`);
      }
      console.log('='.repeat(50));
      console.log('\n🎉 Done! Your projects are now live on CodeShare!');
      db.close();
    }
  });
});
