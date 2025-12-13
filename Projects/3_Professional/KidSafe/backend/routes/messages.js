const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, (req, res) => {
  try {
    const { recipientId, content, type } = req.body;
    const message = Message.create({
      senderId: req.user.id,
      recipientId,
      content,
      type: type || 'text'
    });

    const io = req.app.get('io');
    io.to(`user-${recipientId}`).emit('new-message', message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/conversation/:userId', authenticateToken, (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const messages = Message.getConversation(req.user.id, userId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
