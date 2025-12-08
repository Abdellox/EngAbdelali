const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

// Create order
router.post('/', auth, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { items, payment_method, discount, shift_id, notes } = req.body;
    
    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.quantity * item.unit_price;
    }
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax - (discount || 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (order_number, branch_id, cashier_id, subtotal, tax, discount, total, payment_method, shift_id, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [orderNumber, req.user.branch_id, req.user.id, subtotal, tax, discount, total, payment_method, shift_id, notes]
    );

    const orderId = orderResult.rows[0].id;

    // Create order items and update inventory
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.product_id, item.quantity, item.unit_price, item.quantity * item.unit_price]
      );

      // Update product stock
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );

      // Log inventory transaction
      await client.query(
        `INSERT INTO inventory_transactions (product_id, branch_id, transaction_type, quantity, user_id, reason)
         VALUES ($1, $2, 'out', $3, $4, $5)`,
        [item.product_id, req.user.branch_id, item.quantity, req.user.id, `Sale - Order ${orderNumber}`]
      );
    }

    await client.query('COMMIT');
    res.status(201).json(orderResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Get orders
router.get('/', auth, async (req, res) => {
  try {
    const { start_date, end_date, branch_id } = req.query;
    
    let query = `
      SELECT o.*, u.full_name as cashier_name, b.name as branch_name
      FROM orders o
      LEFT JOIN users u ON o.cashier_id = u.id
      LEFT JOIN branches b ON o.branch_id = b.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (start_date) {
      query += ` AND o.created_at >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND o.created_at <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    if (branch_id) {
      query += ` AND o.branch_id = $${paramCount}`;
      params.push(branch_id);
      paramCount++;
    } else if (req.user.role !== 'admin') {
      query += ` AND o.branch_id = $${paramCount}`;
      params.push(req.user.branch_id);
    }

    query += ' ORDER BY o.created_at DESC LIMIT 100';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get order details
router.get('/:id', auth, async (req, res) => {
  try {
    const orderResult = await pool.query(
      'SELECT o.*, u.full_name as cashier_name FROM orders o LEFT JOIN users u ON o.cashier_id = u.id WHERE o.id = $1',
      [req.params.id]
    );

    const itemsResult = await pool.query(
      `SELECT oi.*, p.name as product_name 
       FROM order_items oi 
       LEFT JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = $1`,
      [req.params.id]
    );

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
