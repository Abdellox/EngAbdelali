const express = require('express');
const database = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', (req, res) => {
    res.json(database.categories);
});

// Create category (admin only)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
    const newCategory = {
        id: database.categories.length + 1,
        ...req.body
    };
    database.categories.push(newCategory);
    res.status(201).json(newCategory);
});

// Update category (admin only)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
    const index = database.categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    database.categories[index] = {
        ...database.categories[index],
        ...req.body,
        id: parseInt(req.params.id)
    };
    
    res.json(database.categories[index]);
});

// Delete category (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
    const index = database.categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    database.categories.splice(index, 1);
    res.json({ message: 'Category deleted successfully' });
});

module.exports = router;
