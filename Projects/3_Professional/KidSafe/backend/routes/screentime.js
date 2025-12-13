const express = require('express');
const router = express.Router();
const ScreenTime = require('../models/ScreenTime');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, (req, res) => {
  try {
    const screenTimeData = {
      ...req.body,
      parentId: req.user.id
    };
    const screenTime = ScreenTime.create(screenTimeData);
    res.status(201).json(screenTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/child/:childId', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const records = ScreenTime.findByChildId(childId);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/child/:childId/today', authenticateToken, (req, res) => {
  try {
    const childId = parseInt(req.params.childId);
    const total = ScreenTime.getTodayTotal(childId);
    res.json({ childId, totalMinutes: total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
