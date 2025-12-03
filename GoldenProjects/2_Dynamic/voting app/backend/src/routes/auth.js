const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Registration
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('nationalId').notEmpty(),
    body('firstName').notEmpty(),
    body('lastName').notEmpty()
  ],
  authController.register
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

// MFA verification
router.post('/verify-mfa',
  [
    body('userId').notEmpty(),
    body('code').isLength({ min: 6, max: 6 })
  ],
  authController.verifyMFA
);

// Biometric registration
router.post('/register-biometric',
  authenticate,
  authController.registerBiometric
);

// Refresh token
router.post('/refresh-token',
  [body('refreshToken').notEmpty()],
  authController.refreshToken
);

// Logout
router.post('/logout', authenticate, authController.logout);

module.exports = router;
