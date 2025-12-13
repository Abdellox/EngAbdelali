const db = require('./database');

console.log('🔍 Checking projects in database...\n');

db.get('SELECT COUNT(*) as total FROM projects', [], (err, result) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(`📊 Total projects in database: ${result.total}\n`);
  
  // Get count by category
  db.all(`
    SELECT c.name, c.icon, COUNT(p.id) as count 
    FROM categories c 
    LEFT JOIN projects p ON c.id = p.category_id 
    GROUP BY c.id 
    ORDER BY count DESC
  `, [], (err, categories) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    
    console.log('📁 Projects by category:');
    console.log('─'.repeat(40));
    categories.forEach(cat => {
      console.log(`${cat.icon} ${cat.name.padEnd(15)} : ${cat.count} projects`);
    });
    console.log('─'.repeat(40));
    
    // Get sample projects
    db.all('SELECT id, title, category_id FROM projects LIMIT 10', [], (err, projects) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
      
      console.log('\n📝 Sample projects:');
      projects.forEach(p => {
        console.log(`  ${p.id}. ${p.title}`);
      });
      
      db.close();
    });
  });
});
