const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get inventory transactions
router.get('/transactions', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT it.*, p.name as product_name, u.full_name as user_name
      FROM inventory_transactions it
      LEFT JOIN products p ON it.product_id = p.id
      LEFT JOIN users u ON it.user_id = u.id
      ORDER BY it.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add inventory (stock in)
router.post('/add', auth, authorize('admin', 'manager'), async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { product_id, quantity, unit_cost, reason } = req.body;

    // Update product stock
    await client.query(
      'UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2',
      [quantity, product_id]
    );

    // Log transaction
    const result = await client.query(
      `INSERT INTO inventory_transactions (product_id, branch_id, transaction_type, quantity, unit_cost, reason, user_id)
       VALUES ($1, $2, 'in', $3, $4, $5, $6) RETURNING *`,
      [product_id, req.user.branch_id, quantity, unit_cost, reason, req.user.id]
    );

    await client.query('COMMIT');
    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Record waste
router.post('/waste', auth, authorize('admin', 'manager'), async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { product_id, quantity, reason } = req.body;

    await client.query(
      'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
      [quantity, product_id]
    );

    const result = await client.query(
      `INSERT INTO inventory_transactions (product_id, branch_id, transaction_type, quantity, reason, user_id)
       VALUES ($1, $2, 'waste', $3, $4, $5) RETURNING *`,
      [product_id, req.user.branch_id, quantity, reason, req.user.id]
    );

    await client.query('COMMIT');
    res.status(201).json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

module.exports = router;
