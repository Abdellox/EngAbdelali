const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/confirm-payment', paymentController.confirmPayment);
router.get('/history', paymentController.getPaymentHistory);

module.exports = router;
