const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const Child = require('../models/Child');
const { authenticateToken } = require('./auth');

// Create alert
router.post('/', authenticateToken, (req, res) => {
  try {
    const { childId, type, title, message, location, metadata } = req.body;
    
    const child = Child.findById(childId);
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    const alert = Alert.create({
      childId,
      parentId: child.parentId,
      type,
      title,
      message,
      location,
      metadata
    });

    // Emit real-time alert via Socket.IO
    const io = req.app.get('io');
    io.to(`user-${child.parentId}`).emit('new-alert', alert);

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get alerts for parent
router.get('/', authenticateToken, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const alerts = Alert.findByParentId(req.user.id, limit);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get unacknowledged alerts
router.get('/unacknowledged', authenticateToken, (req, res) => {
  try {
    const alerts = Alert.getUnacknowledged(req.user.id);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Acknowledge alert
router.put('/:id/acknowledge', authenticateToken, (req, res) => {
  try {
    const alert = Alert.findById(parseInt(req.params.id));
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    if (alert.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updated = Alert.acknowledge(parseInt(req.params.id));
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Emergency panic button
router.post('/emergency', authenticateToken, (req, res) => {
  try {
    const { childId, location } = req.body;
    
    const child = Child.findById(childId);
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }

    const alert = Alert.create({
      childId,
      parentId: child.parentId,
      type: 'emergency',
      title: '🚨 EMERGENCY ALERT',
      message: `${child.name} has activated the panic button!`,
      location,
      metadata: { isPanicButton: true }
    });

    // Emit emergency alert
    const io = req.app.get('io');
    io.to(`user-${child.parentId}`).emit('emergency-alert', alert);

    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
