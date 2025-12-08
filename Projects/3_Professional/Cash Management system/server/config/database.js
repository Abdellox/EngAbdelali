const { Pool } = require('pg');

// Check if we should use mock database
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('YOUR_PASSWORD')) {
  console.log('⚠️  No valid DATABASE_URL found, using mock database');
  module.exports = require('./database-mock');
} else {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  pool.on('connect', () => {
    console.log('✅ Database connected successfully');
  });

  pool.on('error', (err) => {
    console.error('❌ Unexpected database error:', err);
  });

  module.exports = pool;
}
