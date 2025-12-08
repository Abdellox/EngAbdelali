const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Start shift
router.post('/start', auth, async (req, res) => {
  try {
    const { opening_cash } = req.body;
    
    const result = await pool.query(
      `INSERT INTO shifts (branch_id, user_id, start_time, opening_cash, status)
       VALUES ($1, $2, CURRENT_TIMESTAMP, $3, 'open') RETURNING *`,
      [req.user.branch_id, req.user.id, opening_cash]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// End shift
router.post('/end/:id', auth, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { closing_cash, notes } = req.body;
    const { id } = req.params;

    // Calculate expected cash
    const salesResult = await client.query(
      `SELECT COALESCE(SUM(total), 0) as total_sales 
       FROM orders 
       WHERE shift_id = $1 AND payment_method = 'cash'`,
      [id]
    );

    const shiftResult = await client.query(
      'SELECT opening_cash FROM shifts WHERE id = $1',
      [id]
    );

    const expected_cash = parseFloat(shiftResult.rows[0].opening_cash) + parseFloat(salesResult.rows[0].total_sales);
    const variance = parseFloat(closing_cash) - expected_cash;

    const result = await client.query(
      `UPDATE shifts 
       SET end_time = CURRENT_TIMESTAMP, closing_cash = $1, expected_cash = $2, 
           variance = $3, notes = $4, status = 'closed'
       WHERE id = $5 RETURNING *`,
      [closing_cash, expected_cash, variance, notes, id]
    );

    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Get active shift
router.get('/active', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM shifts 
       WHERE user_id = $1 AND status = 'open' 
       ORDER BY start_time DESC LIMIT 1`,
      [req.user.id]
    );
    res.json(result.rows[0] || null);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get shift history
router.get('/history', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.*, u.full_name as user_name 
       FROM shifts s 
       LEFT JOIN users u ON s.user_id = u.id 
       WHERE s.branch_id = $1 
       ORDER BY s.start_time DESC LIMIT 50`,
      [req.user.branch_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
