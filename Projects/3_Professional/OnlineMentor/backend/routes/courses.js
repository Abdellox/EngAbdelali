const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', courseController.getCourses);
router.get('/search', courseController.searchCourses);
router.get('/:id', courseController.getCourse);

router.use(protect);
router.post('/', authorize('teacher', 'admin'), courseController.createCourse);
router.put('/:id', authorize('teacher', 'admin'), courseController.updateCourse);
router.delete('/:id', authorize('teacher', 'admin'), courseController.deleteCourse);
router.post('/:id/enroll', courseController.enrollCourse);
router.get('/:id/students', authorize('teacher', 'admin'), courseController.getCourseStudents);

module.exports = router;
