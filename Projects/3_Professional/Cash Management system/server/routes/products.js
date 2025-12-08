const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, authorize } = require('../middleware/auth');

// Get all products
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = true
      ORDER BY p.name
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get low stock products
router.get('/low-stock', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM products 
      WHERE stock_quantity <= min_stock_level AND is_active = true
      ORDER BY stock_quantity ASC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create product
router.post('/', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { name, category_id, sku, price, cost, stock_quantity, min_stock_level, unit } = req.body;
    
    const result = await pool.query(
      `INSERT INTO products (name, category_id, sku, price, cost, stock_quantity, min_stock_level, unit) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, category_id, sku, price, cost, stock_quantity, min_stock_level, unit]
    );

    await pool.query(
      'INSERT INTO audit_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'create_product', 'product', result.rows[0].id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
router.put('/:id', auth, authorize('admin', 'manager'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, price, cost, stock_quantity, min_stock_level, unit } = req.body;
    
    const result = await pool.query(
      `UPDATE products 
       SET name = $1, category_id = $2, price = $3, cost = $4, 
           stock_quantity = $5, min_stock_level = $6, unit = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [name, category_id, price, cost, stock_quantity, min_stock_level, unit, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product (soft delete)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    await pool.query('UPDATE products SET is_active = false WHERE id = $1', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
