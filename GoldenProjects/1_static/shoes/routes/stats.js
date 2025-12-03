const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get dashboard stats (Admin only)
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'customer' });
        
        const orders = await Order.find();
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalOrders,
            totalProducts,
            totalCustomers,
            totalRevenue,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
