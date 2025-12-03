const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const electionController = require('../controllers/electionController');
const { authenticate, authorize } = require('../middleware/auth');

// Get active elections
router.get('/active', electionController.getActiveElections);

// Get election details
router.get('/:electionId', electionController.getElectionDetails);

// Get candidates
router.get('/:electionId/candidates', electionController.getCandidates);

// Get real-time results
router.get('/:electionId/results', electionController.getResults);

// Create election (admin only)
router.post('/',
  authenticate,
  authorize('admin', 'election_official'),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601()
  ],
  electionController.createElection
);

module.exports = router;
