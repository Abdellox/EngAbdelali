const express = require('express');
const db = require('../database');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(auth, adminAuth);

// Get all users
router.get('/users', (req, res) => {
  db.all('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC', (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(users);
  });
});

// Delete user
router.delete('/users/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Get pending projects
router.get('/pending-projects', (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name, u.username as author_username
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.user_id = u.id
    WHERE p.status = 'pending'
    ORDER BY p.created_at DESC
  `;

  db.all(query, (err, projects) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch pending projects' });
    }
    res.json(projects);
  });
});

// Approve/reject project
router.put('/projects/:id/status', (req, res) => {
  const { status } = req.body;
  
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.run('UPDATE projects SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update project status' });
    }
    res.json({ message: `Project ${status} successfully` });
  });
});

// Delete project
router.delete('/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete project' });
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

// Get statistics
router.get('/stats', (req, res) => {
  const stats = {};

  db.get('SELECT COUNT(*) as count FROM users', (err, result) => {
    stats.totalUsers = result?.count || 0;

    db.get('SELECT COUNT(*) as count FROM projects', (err, result) => {
      stats.totalProjects = result?.count || 0;

      db.get('SELECT COUNT(*) as count FROM projects WHERE status = "pending"', (err, result) => {
        stats.pendingProjects = result?.count || 0;

        db.get('SELECT SUM(downloads) as total FROM projects', (err, result) => {
          stats.totalDownloads = result?.total || 0;

          res.json(stats);
        });
      });
    });
  });
});

module.exports = router;
