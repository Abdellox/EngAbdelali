const express = require('express');
const router = express.Router();
const { createAddress } = require('../controllers/addressController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createAddress);

module.exports = router;
