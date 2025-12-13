const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/teachers', userController.getTeachers);
router.get('/:id', userController.getUser);

router.use(protect);
router.get('/:id/courses', userController.getUserCourses);
router.get('/dashboard/stats', userController.getDashboardStats);

module.exports = router;
