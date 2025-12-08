const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all users
router.get('/', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, role, branch_id, is_active FROM users ORDER BY full_name'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create user
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { email, password, full_name, role, branch_id } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, role, branch_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, full_name, role, branch_id`,
      [email, hashedPassword, full_name, role, branch_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, role, branch_id, is_active } = req.body;
    
    const result = await pool.query(
      `UPDATE users SET full_name = $1, role = $2, branch_id = $3, is_active = $4
       WHERE id = $5 RETURNING id, email, full_name, role, branch_id, is_active`,
      [full_name, role, branch_id, is_active, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    await pool.query('UPDATE users SET is_active = false WHERE id = $1', [req.params.id]);
    res.json({ message: 'User deactivated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
