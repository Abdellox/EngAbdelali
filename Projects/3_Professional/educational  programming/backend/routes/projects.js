const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /zip|rar|7z|tar|gz|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get all projects (with filters)
router.get('/', (req, res) => {
  const { category, language, search, status = 'approved', limit = 1000, offset = 0 } = req.query;
  
  let query = `
    SELECT p.*, c.name as category_name, c.icon as category_icon,
           u.username as author_username,
           COALESCE(AVG(r.rating), 0) as avg_rating,
           COUNT(DISTINCT r.id) as rating_count
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
    LEFT JOIN ratings r ON p.id = r.project_id
    WHERE p.status = ?
  `;
  
  const params = [status];

  if (category) {
    query += ' AND c.slug = ?';
    params.push(category);
  }

  if (language) {
    query += ' AND p.language LIKE ?';
    params.push(`%${language}%`);
  }

  if (search) {
    query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  query += ' GROUP BY p.id ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.all(query, params, (err, projects) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
    res.json(projects);
  });
});

// Get single project
router.get('/:id', (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name, c.icon as category_icon,
           u.username as author_username, u.avatar as author_avatar,
           COALESCE(AVG(r.rating), 0) as avg_rating,
           COUNT(DISTINCT r.id) as rating_count
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
    LEFT JOIN ratings r ON p.id = r.project_id
    WHERE p.id = ?
    GROUP BY p.id
  `;

  db.get(query, [req.params.id], (err, project) => {
    if (err || !project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Increment views
    db.run('UPDATE projects SET views = views + 1 WHERE id = ?', [req.params.id]);

    // Get comments
    db.all(
      `SELECT c.*, u.username, u.avatar 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.project_id = ? 
       ORDER BY c.created_at DESC`,
      [req.params.id],
      (err, comments) => {
        project.comments = comments || [];
        res.json(project);
      }
    );
  });
});

// Upload project
router.post('/', auth, upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'screenshot', maxCount: 1 }
]), (req, res) => {
  const { title, description, category_id, language, technology, requirements, demo_url, github_url } = req.body;
  
  if (!title || !description || !language || !req.files.file) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  const file_path = req.files.file[0].filename;
  const screenshot = req.files.screenshot ? req.files.screenshot[0].filename : null;

  db.run(
    `INSERT INTO projects (title, description, category_id, user_id, language, technology, 
     file_path, screenshot, requirements, demo_url, github_url, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [title, description, category_id, req.user.id, language, technology, file_path, screenshot, requirements, demo_url, github_url],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload project' });
      }
      res.status(201).json({ message: 'Project uploaded successfully', id: this.lastID });
    }
  );
});

// Download project
router.get('/:id/download', (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, project) => {
    if (err || !project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const filePath = path.join(__dirname, '../uploads', project.file_path);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Log download
    db.run('UPDATE projects SET downloads = downloads + 1 WHERE id = ?', [req.params.id]);
    db.run('INSERT INTO download_logs (project_id, user_id) VALUES (?, ?)', [req.params.id, req.user?.id || null]);

    res.download(filePath, project.title + path.extname(project.file_path));
  });
});

// Rate project
router.post('/:id/rate', auth, (req, res) => {
  const { rating } = req.body;
  
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  db.run(
    'INSERT OR REPLACE INTO ratings (project_id, user_id, rating) VALUES (?, ?, ?)',
    [req.params.id, req.user.id, rating],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to rate project' });
      }
      res.json({ message: 'Rating submitted successfully' });
    }
  );
});

// Comment on project
router.post('/:id/comment', auth, (req, res) => {
  const { comment } = req.body;
  
  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  db.run(
    'INSERT INTO comments (project_id, user_id, comment) VALUES (?, ?, ?)',
    [req.params.id, req.user.id, comment],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to post comment' });
      }
      res.status(201).json({ message: 'Comment posted successfully', id: this.lastID });
    }
  );
});

// Get categories
router.get('/categories/all', (req, res) => {
  db.all('SELECT * FROM categories ORDER BY name', (err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
    res.json(categories);
  });
});

module.exports = router;
