const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, (req, res) => {
  try {
    const taskData = {
      ...req.body,
      parentId: req.user.id
    };
    const task = Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/child/:childId', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const tasks = Task.findByChildId(childId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/complete', authenticateToken, (req, res) => {
  try {
    const task = Task.complete(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
