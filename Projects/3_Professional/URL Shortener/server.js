const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 8080;
const BASE_URL = 'http://localhost:8080';

// Middleware
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // set to true in production with HTTPS
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));
app.use(express.static('.'));

// Database setup
const db = new sqlite3.Database('./urls.db', (err) => {
    if (err) {
        console.error('Database error:', err);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

function initDatabase() {
    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    // URLs table with user_id
    db.run(`
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            short_code TEXT UNIQUE NOT NULL,
            original_url TEXT NOT NULL,
            clicks INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (!err) {
            db.run('CREATE INDEX IF NOT EXISTS idx_short_code ON urls(short_code)');
            db.run('CREATE INDEX IF NOT EXISTS idx_user_id ON urls(user_id)');
        }
    });
}

// Generate random short code
function generateShortCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Auth Middleware
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
}

// API Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    
    if (username.length < 3 || password.length < 6) {
        return res.status(400).json({ error: 'Username min 3 chars, password min 6 chars' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ error: 'Username already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            req.session.userId = this.lastID;
            req.session.username = username;
            res.json({ user: { id: this.lastID, username } });
        }
    );
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        req.session.userId = user.id;
        req.session.username = user.username;
        res.json({ user: { id: user.id, username: user.username } });
    });
});

app.get('/api/auth/check', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            authenticated: true, 
            user: { id: req.session.userId, username: req.session.username }
        });
    } else {
        res.json({ authenticated: false });
    }
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true });
    });
});

// Shorten URL (requires auth)
app.post('/api/shorten', requireAuth, async (req, res) => {
    const { url, customCode } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    
    // Use custom code or generate random
    let shortCode = customCode || generateShortCode();
    
    // Validate custom code
    if (customCode && !/^[a-zA-Z0-9_-]+$/.test(customCode)) {
        return res.status(400).json({ error: 'Invalid custom code format' });
    }
    
    // Check if custom code already exists
    if (customCode) {
        const existing = await new Promise((resolve) => {
            db.get('SELECT short_code FROM urls WHERE short_code = ?', [customCode], (err, row) => {
                resolve(row);
            });
        });
        
        if (existing) {
            return res.status(400).json({ error: 'Custom code already taken' });
        }
    }
    
    // Check if URL already exists for this user
    db.get('SELECT short_code FROM urls WHERE original_url = ? AND user_id = ?', [url, req.session.userId], (err, row) => {
        if (row && !customCode) {
            return res.json({ 
                shortUrl: `${BASE_URL}/${row.short_code}`,
                message: 'URL already shortened'
            });
        }
        
        // Try to insert, retry if collision
        const attemptInsert = (attempt = 0) => {
            if (attempt > 5) {
                return res.status(500).json({ error: 'Failed to generate unique code. Please try again.' });
            }
            
            const code = customCode || generateShortCode();
            
            db.run(
                'INSERT INTO urls (user_id, short_code, original_url) VALUES (?, ?, ?)',
                [req.session.userId, code, url],
                function(err) {
                    if (err) {
                        if (err.message.includes('UNIQUE') && !customCode) {
                            // Retry with new code
                            return attemptInsert(attempt + 1);
                        }
                        return res.status(500).json({ error: 'Database error' });
                    }
                    
                    res.json({ shortUrl: `${BASE_URL}/${code}` });
                }
            );
        };
        
        attemptInsert();
    });
});

// Get user's links (requires auth)
app.get('/api/links', requireAuth, (req, res) => {
    db.all(
        'SELECT short_code, original_url, clicks, created_at FROM urls WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
        [req.session.userId],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            const links = rows.map(row => ({
                shortCode: row.short_code,
                shortUrl: `${BASE_URL}/${row.short_code}`,
                originalUrl: row.original_url,
                clicks: row.clicks,
                createdAt: row.created_at
            }));
            
            res.json({ links });
        }
    );
});

// Get user's statistics (requires auth)
app.get('/api/stats', requireAuth, (req, res) => {
    db.get('SELECT COUNT(*) as total, SUM(clicks) as totalClicks FROM urls WHERE user_id = ?', [req.session.userId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        db.get('SELECT short_code, clicks FROM urls WHERE user_id = ? ORDER BY clicks DESC LIMIT 1', [req.session.userId], (err, topRow) => {
            res.json({
                totalLinks: row.total || 0,
                totalClicks: row.totalClicks || 0,
                topLink: topRow ? `${topRow.clicks} clicks` : '-'
            });
        });
    });
});

// Delete link (requires auth and ownership)
app.delete('/api/delete/:shortCode', requireAuth, (req, res) => {
    const { shortCode } = req.params;
    
    db.run('DELETE FROM urls WHERE short_code = ? AND user_id = ?', [shortCode, req.session.userId], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }
        
        res.json({ success: true });
    });
});

// Redirect short URL
app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    
    // Skip API routes and static files
    if (shortCode === 'api' || shortCode.includes('.') || shortCode === 'favicon.ico') {
        return;
    }
    
    db.get('SELECT original_url FROM urls WHERE short_code = ?', [shortCode], (err, row) => {
        if (err || !row) {
            return res.status(404).sendFile(path.join(__dirname, 'index.html'));
        }
        
        // Increment click count asynchronously
        db.run('UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?', [shortCode], (err) => {
            if (err) console.error('Failed to update click count:', err);
        });
        
        // Redirect immediately
        res.redirect(301, row.original_url);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at ${BASE_URL}`);
    console.log(`📊 Database: urls.db`);
});
