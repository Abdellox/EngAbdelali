const express = require('express');
const router = express.Router();
const Helper = require('../models/Helper');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, (req, res) => {
  try {
    const helperData = {
      ...req.body,
      parentId: req.user.id
    };
    const helper = Helper.create(helperData);
    res.status(201).json(helper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateToken, (req, res) => {
  try {
    const helpers = Helper.findByParentId(req.user.id);
    res.json(helpers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, (req, res) => {
  try {
    const helper = Helper.findById(parseInt(req.params.id));
    if (!helper || helper.parentId !== req.user.id) {
      return res.status(404).json({ error: 'Helper not found' });
    }
    const updated = Helper.update(parseInt(req.params.id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const helper = Helper.findById(parseInt(req.params.id));
    if (!helper || helper.parentId !== req.user.id) {
      return res.status(404).json({ error: 'Helper not found' });
    }
    Helper.delete(parseInt(req.params.id));
    res.json({ message: 'Helper removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
