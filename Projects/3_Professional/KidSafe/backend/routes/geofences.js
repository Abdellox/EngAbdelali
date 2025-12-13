const express = require('express');
const router = express.Router();
const Geofence = require('../models/Geofence');
const Child = require('../models/Child');
const Alert = require('../models/Alert');
const { authenticateToken } = require('./auth');

// Create geofence
router.post('/', authenticateToken, (req, res) => {
  try {
    const geofenceData = {
      ...req.body,
      parentId: req.user.id
    };
    const geofence = Geofence.create(geofenceData);
    res.status(201).json(geofence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all geofences for parent
router.get('/', authenticateToken, (req, res) => {
  try {
    const geofences = Geofence.findByParentId(req.user.id);
    res.json(geofences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get geofences for specific child
router.get('/child/:childId', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const geofences = Geofence.findByChildId(childId);
    res.json(geofences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update geofence
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const geofence = Geofence.findById(parseInt(req.params.id));
    if (!geofence) {
      return res.status(404).json({ error: 'Geofence not found' });
    }
    if (geofence.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const updated = Geofence.update(parseInt(req.params.id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete geofence
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const geofence = Geofence.findById(parseInt(req.params.id));
    if (!geofence) {
      return res.status(404).json({ error: 'Geofence not found' });
    }
    if (geofence.parentId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    Geofence.delete(parseInt(req.params.id));
    res.json({ message: 'Geofence deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
