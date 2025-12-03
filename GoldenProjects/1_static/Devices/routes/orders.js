const express = require('express');
const database = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all orders (admin only)
router.get('/', authMiddleware, adminMiddleware, (req, res) => {
    res.json(database.orders);
});

// Create order
router.post('/', (req, res) => {
    const newOrder = {
        id: database.orders.length + 1,
        ...req.body,
        status: 'pending',
        createdAt: new Date()
    };
    database.orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Update order status (admin only)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
    const index = database.orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }
    
    database.orders[index] = {
        ...database.orders[index],
        ...req.body
    };
    
    res.json(database.orders[index]);
});

// Delete order (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
    const index = database.orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }
    
    database.orders.splice(index, 1);
    res.json({ message: 'Order deleted successfully' });
});

module.exports = router;
