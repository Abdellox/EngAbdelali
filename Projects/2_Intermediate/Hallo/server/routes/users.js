const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Search users
router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).select('-password').limit(10);

    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;
    const user = await User.findById(req.userId);

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ user: user.toObject({ getters: true, versionKey: false }) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add contact
router.post('/contacts/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.contacts.includes(req.params.userId)) {
      user.contacts.push(req.params.userId);
      await user.save();
    }
    res.json({ message: 'Contact added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contacts
router.get('/contacts/list', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('contacts', '-password');
    res.json({ contacts: user.contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
