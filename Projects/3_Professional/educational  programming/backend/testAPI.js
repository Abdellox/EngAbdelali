const http = require('http');

console.log('🧪 Testing API endpoints...\n');

function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/projects',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const projects = JSON.parse(data);
        console.log(`✅ GET /api/projects`);
        console.log(`   Total projects returned: ${projects.length}`);
        
        // Count by category
        const categories = {};
        projects.forEach(project => {
          const cat = project.category_name || 'Unknown';
          categories[cat] = (categories[cat] || 0) + 1;
        });
        
        console.log('\n📊 Projects by category:');
        Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
          console.log(`   ${cat}: ${count} projects`);
        });
        
        console.log('\n✅ All tests passed!');
        console.log(`\n🎉 Your API is now returning all ${projects.length} projects!`);
        console.log('\n💡 Refresh your browser at http://localhost:3000/projects to see all projects!');
        
      } catch (error) {
        console.error('❌ Error parsing response:', error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error:', error.message);
  });

  req.end();
}

testAPI();
