const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', adminController.getPlatformStats);
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/approve', adminController.approveUser);
router.put('/courses/:id/approve', adminController.approveCourse);
router.put('/reviews/:id/moderate', adminController.moderateReview);

module.exports = router;
