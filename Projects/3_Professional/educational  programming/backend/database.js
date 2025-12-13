const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'codeshare.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('✅ Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        avatar TEXT,
        bio TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        icon TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        user_id INTEGER NOT NULL,
        language TEXT NOT NULL,
        technology TEXT,
        file_path TEXT NOT NULL,
        screenshot TEXT,
        demo_url TEXT,
        github_url TEXT,
        requirements TEXT,
        status TEXT DEFAULT 'pending',
        downloads INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Ratings table
    db.run(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        rating INTEGER CHECK(rating >= 1 AND rating <= 5),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(project_id, user_id)
      )
    `);

    // Comments table
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        comment TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Download logs
    db.run(`
      CREATE TABLE IF NOT EXISTS download_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        user_id INTEGER,
        ip_address TEXT,
        downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Insert default admin and categories
    seedData();
  });
}

function seedData() {
  const adminPassword = bcrypt.hashSync('admin123', 10);
  
  db.run(`
    INSERT OR IGNORE INTO users (username, email, password, role)
    VALUES ('admin', 'admin@codeshare.com', ?, 'admin')
  `, [adminPassword]);

  const categories = [
    ['Java', 'java', '☕'],
    ['PHP', 'php', '🐘'],
    ['Python', 'python', '🐍'],
    ['JavaScript', 'javascript', '⚡'],
    ['C#', 'csharp', '🔷'],
    ['Android', 'android', '🤖'],
    ['React', 'react', '⚛️'],
    ['Node.js', 'nodejs', '🟢'],
    ['Django', 'django', '🎸'],
    ['Laravel', 'laravel', '🔺'],
    ['Go', 'go', '🔵'],
    ['Rust', 'rust', '🦀'],
    ['Flutter', 'flutter', '💙'],
    ['Vue.js', 'vuejs', '💚'],
    ['Angular', 'angular', '🅰️'],
    ['TypeScript', 'typescript', '📘'],
    ['Ruby', 'ruby', '💎'],
    ['Swift', 'swift', '🍎'],
    ['Kotlin', 'kotlin', '🟣'],
    ['Spring Boot', 'springboot', '🍃']
  ];

  categories.forEach(([name, slug, icon]) => {
    db.run(`INSERT OR IGNORE INTO categories (name, slug, icon) VALUES (?, ?, ?)`, [name, slug, icon]);
  });
}

module.exports = db;
