const express = require('express');
const database = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics (admin only)
router.get('/', authMiddleware, adminMiddleware, (req, res) => {
    const totalProducts = database.products.length;
    const totalOrders = database.orders.length;
    const totalRevenue = database.orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = database.orders.filter(o => o.status === 'pending').length;
    
    res.json({
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        recentOrders: database.orders.slice(-5).reverse()
    });
});

module.exports = router;
