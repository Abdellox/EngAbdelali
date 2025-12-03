const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { authenticate, authorize } = require('../middleware/auth');

// Get audit logs (authorized personnel only)
router.get('/logs',
  authenticate,
  authorize('admin', 'auditor'),
  auditController.getAuditLogs
);

// Get election audit trail
router.get('/election/:electionId',
  authenticate,
  authorize('admin', 'auditor'),
  auditController.getElectionAudit
);

// Verify blockchain integrity
router.get('/verify-integrity/:electionId',
  auditController.verifyBlockchainIntegrity
);

module.exports = router;
