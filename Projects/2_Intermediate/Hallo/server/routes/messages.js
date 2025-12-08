const express = require('express');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const auth = require('../middleware/auth');

const router = express.Router();

// Get conversation messages
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.userId }
      ],
      isDeleted: false
    })
    .populate('sender', 'username avatar')
    .populate('receiver', 'username avatar')
    .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all conversations
router.get('/', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.userId
    })
    .populate('participants', 'username avatar status lastSeen')
    .populate('lastMessage')
    .sort({ lastMessageAt: -1 });

    res.json({ conversations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark message as read
router.put('/:messageId/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (message && message.receiver.toString() === req.userId) {
      message.isRead = true;
      message.readAt = new Date();
      await message.save();
    }
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
