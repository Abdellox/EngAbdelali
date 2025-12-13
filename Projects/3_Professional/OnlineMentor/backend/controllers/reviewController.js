const Review = require('../models/Review');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      course: req.params.courseId,
      isApproved: true 
    }).populate('student', 'name avatar');

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeacherReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      teacher: req.params.teacherId,
      isApproved: true 
    }).populate('student', 'name avatar').populate('course', 'title');

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { course, rating, comment } = req.body;

    const courseDoc = await Course.findById(course);
    if (!courseDoc) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (!courseDoc.enrolledStudents.includes(req.user._id)) {
      return res.status(403).json({ 
        success: false, 
        message: 'You must be enrolled to review this course' 
      });
    }

    const review = await Review.create({
      course,
      teacher: courseDoc.teacher,
      student: req.user._id,
      rating,
      comment
    });

    // Update course rating
    const reviews = await Review.find({ course, isApproved: true });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Course.findByIdAndUpdate(course, {
      rating: avgRating,
      totalReviews: reviews.length
    });

    // Update teacher rating
    const teacherReviews = await Review.find({ teacher: courseDoc.teacher, isApproved: true });
    const teacherAvgRating = teacherReviews.reduce((acc, r) => acc + r.rating, 0) / teacherReviews.length;
    await User.findByIdAndUpdate(courseDoc.teacher, {
      rating: teacherAvgRating,
      totalReviews: teacherReviews.length
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, review: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.student.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
