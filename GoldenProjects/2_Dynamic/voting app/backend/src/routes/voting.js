const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const votingController = require('../controllers/votingController');
const { authenticate } = require('../middleware/auth');

// Submit vote
router.post('/submit',
  authenticate,
  [
    body('electionId').notEmpty(),
    body('encryptedVote').notEmpty(),
    body('signature').notEmpty()
  ],
  votingController.submitVote
);

// Verify vote receipt
router.post('/verify',
  [
    body('receiptId').notEmpty(),
    body('verificationCode').notEmpty()
  ],
  votingController.verifyVote
);

// Get voter status
router.get('/status/:electionId', authenticate, votingController.getVoterStatus);

module.exports = router;
