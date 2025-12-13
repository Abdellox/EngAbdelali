const express = require('express');
const router = express.Router();
const Child = require('../models/Child');
const { authenticateToken } = require('./auth');

// Get all children for parent
router.get('/', authenticateToken, (req, res) => {
  try {
    const children = Child.findByParentId(req.user.id);
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get child by ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const child = Child.findById(parseInt(req.params.id));
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    if (child.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create child
router.post('/', authenticateToken, (req, res) => {
  try {
    const childData = {
      ...req.body,
      parentId: req.user.id
    };
    const child = Child.create(childData);
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update child
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const child = Child.findById(parseInt(req.params.id));
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    if (child.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updated = Child.update(parseInt(req.params.id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete child
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const child = Child.findById(parseInt(req.params.id));
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    if (child.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    Child.delete(parseInt(req.params.id));
    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
