const express = require('express');
const database = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
    const { category, featured } = req.query;
    let products = database.products;
    
    if (category) {
        products = products.filter(p => p.category === category);
    }
    
    if (featured === 'true') {
        products = products.filter(p => p.featured);
    }
    
    res.json(products);
});

// Get single product
router.get('/:id', (req, res) => {
    const product = database.products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// Create product (admin only)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
    const newProduct = {
        id: database.products.length + 1,
        ...req.body,
        createdAt: new Date()
    };
    database.products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product (admin only)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
    const index = database.products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    database.products[index] = {
        ...database.products[index],
        ...req.body,
        id: parseInt(req.params.id)
    };
    
    res.json(database.products[index]);
});

// Delete product (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
    const index = database.products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    database.products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
