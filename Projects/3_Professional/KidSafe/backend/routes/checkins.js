const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');
const Child = require('../models/Child');
const Alert = require('../models/Alert');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, (req, res) => {
  try {
    const { childId, location, status } = req.body;
    const checkIn = CheckIn.create({
      childId,
      location,
      status: status || 'safe'
    });

    const child = Child.findById(childId);
    if (child) {
      Child.update(childId, { lastCheckIn: checkIn.timestamp });
      const io = req.app.get('io');
      io.to(`user-${child.parentId}`).emit('check-in', checkIn);
    }

    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/child/:childId', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const checkIns = CheckIn.findByChildId(childId);
    res.json(checkIns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
