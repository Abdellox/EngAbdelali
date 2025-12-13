const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Child = require('../models/Child');
const { authenticateToken } = require('./auth');

// Update child location
router.post('/:childId', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const { latitude, longitude, accuracy, speed, battery } = req.body;

    const location = Location.create({
      childId,
      latitude,
      longitude,
      accuracy,
      speed,
      battery
    });

    // Update child's current location
    Child.update(childId, { currentLocation: location });

    // Emit real-time update via Socket.IO
    const child = Child.findById(childId);
    if (child) {
      const io = req.app.get('io');
      io.to(`user-${child.parentId}`).emit('location-update', {
        childId,
        location: {
          latitude,
          longitude,
          accuracy,
          speed,
          battery,
          timestamp: location.timestamp
        }
      });
    }

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest location
router.get('/:childId/latest', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const child = Child.findById(childId);
    
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    if (child.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const location = Location.getLatest(childId);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get location history
router.get('/:childId/history', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const limit = parseInt(req.query.limit) || 100;
    
    const child = Child.findById(childId);
    if (!child) {
      return res.status(404).json({ error: 'Child not found' });
    }
    if (child.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const locations = Location.findByChildId(childId, limit);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
