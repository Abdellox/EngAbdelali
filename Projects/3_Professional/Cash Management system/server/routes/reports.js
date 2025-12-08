const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

// Dashboard summary
router.get('/dashboard', auth, async (req, res) => {
  try {
    const branchFilter = req.user.role === 'admin' ? '' : `AND branch_id = ${req.user.branch_id}`;

    // Today's sales
    const salesResult = await pool.query(
      `SELECT COALESCE(SUM(total), 0) as today_sales, COUNT(*) as order_count
       FROM orders 
       WHERE DATE(created_at) = CURRENT_DATE ${branchFilter}`
    );

    // Low stock items
    const lowStockResult = await pool.query(
      'SELECT COUNT(*) as low_stock_count FROM products WHERE stock_quantity <= min_stock_level'
    );

    // Today's expenses
    const expensesResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as today_expenses
       FROM expenses 
       WHERE expense_date = CURRENT_DATE ${branchFilter}`
    );

    // Active shifts
    const shiftsResult = await pool.query(
      `SELECT COUNT(*) as active_shifts FROM shifts WHERE status = 'open' ${branchFilter}`
    );

    res.json({
      today_sales: salesResult.rows[0].today_sales,
      order_count: salesResult.rows[0].order_count,
      low_stock_count: lowStockResult.rows[0].low_stock_count,
      today_expenses: expensesResult.rows[0].today_expenses,
      active_shifts: shiftsResult.rows[0].active_shifts
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Sales report
router.get('/sales', auth, async (req, res) => {
  try {
    const { start_date, end_date, branch_id } = req.query;
    
    let query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as order_count,
        SUM(subtotal) as subtotal,
        SUM(tax) as tax,
        SUM(discount) as discount,
        SUM(total) as total
      FROM orders
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (start_date) {
      query += ` AND created_at >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND created_at <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    if (branch_id) {
      query += ` AND branch_id = $${paramCount}`;
      params.push(branch_id);
    } else if (req.user.role !== 'admin') {
      query += ` AND branch_id = $${paramCount}`;
      params.push(req.user.branch_id);
    }

    query += ' GROUP BY DATE(created_at) ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Best selling products
router.get('/best-sellers', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.name,
        p.sku,
        SUM(oi.quantity) as total_sold,
        SUM(oi.subtotal) as total_revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY p.id, p.name, p.sku
      ORDER BY total_sold DESC
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Profit/Loss report
router.get('/profit-loss', auth, async (req, res) => {
  try {
    const { start_date, end_date, branch_id } = req.query;
    
    let params = [];
    let paramCount = 1;
    let dateFilter = '';

    if (start_date && end_date) {
      dateFilter = ` AND created_at BETWEEN $${paramCount} AND $${paramCount + 1}`;
      params.push(start_date, end_date);
      paramCount += 2;
    }

    const branchFilter = branch_id ? ` AND branch_id = $${paramCount}` : 
                        (req.user.role !== 'admin' ? ` AND branch_id = ${req.user.branch_id}` : '');
    if (branch_id) params.push(branch_id);

    // Revenue
    const revenueResult = await pool.query(
      `SELECT COALESCE(SUM(total), 0) as revenue FROM orders WHERE 1=1 ${dateFilter} ${branchFilter}`,
      params
    );

    // Expenses
    const expensesResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as expenses FROM expenses WHERE 1=1 ${dateFilter} ${branchFilter}`,
      params
    );

    const revenue = parseFloat(revenueResult.rows[0].revenue);
    const expenses = parseFloat(expensesResult.rows[0].expenses);
    const profit = revenue - expenses;

    res.json({ revenue, expenses, profit });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
