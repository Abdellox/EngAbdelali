const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all branches
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM branches WHERE is_active = true ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create branch
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    
    const result = await pool.query(
      'INSERT INTO branches (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, address, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update branch
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;
    
    const result = await pool.query(
      'UPDATE branches SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *',
      [name, address, phone, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
