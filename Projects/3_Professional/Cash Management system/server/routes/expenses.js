const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get expenses
router.get('/', auth, async (req, res) => {
  try {
    const { start_date, end_date, branch_id } = req.query;
    
    let query = 'SELECT e.*, u.full_name as user_name FROM expenses e LEFT JOIN users u ON e.user_id = u.id WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (start_date) {
      query += ` AND e.expense_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND e.expense_date <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    if (branch_id) {
      query += ` AND e.branch_id = $${paramCount}`;
      params.push(branch_id);
    } else if (req.user.role !== 'admin') {
      query += ` AND e.branch_id = $${paramCount}`;
      params.push(req.user.branch_id);
    }

    query += ' ORDER BY e.expense_date DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create expense
router.post('/', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { category, amount, description, expense_date } = req.body;
    
    const result = await pool.query(
      `INSERT INTO expenses (branch_id, category, amount, description, user_id, expense_date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.branch_id, category, amount, description, req.user.id, expense_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    await pool.query('DELETE FROM expenses WHERE id = $1', [req.params.id]);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
