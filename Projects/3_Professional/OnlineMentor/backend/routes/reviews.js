const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/course/:courseId', reviewController.getCourseReviews);
router.get('/teacher/:teacherId', reviewController.getTeacherReviews);

router.use(protect);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
