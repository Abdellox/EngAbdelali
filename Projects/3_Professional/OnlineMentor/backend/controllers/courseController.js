const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
  try {
    const { category, level, minPrice, maxPrice, sort } = req.query;
    const filter = { isPublished: true, isApproved: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Course.find(filter).populate('teacher', 'name avatar rating');

    if (sort === 'popular') query = query.sort('-enrolledStudents');
    else if (sort === 'rating') query = query.sort('-rating');
    else if (sort === 'price-low') query = query.sort('price');
    else if (sort === 'price-high') query = query.sort('-price');
    else query = query.sort('-createdAt');

    const courses = await query;
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchCourses = async (req, res) => {
  try {
    const { q } = req.query;
    const courses = await Course.find({
      $text: { $search: q },
      isPublished: true,
      isApproved: true
    }).populate('teacher', 'name avatar rating');

    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'name avatar bio expertise rating totalReviews');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      teacher: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdCourses: course._id }
    });

    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, course: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await course.deleteOne();
    res.json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already enrolled' });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { enrolledCourses: course._id }
    });

    res.json({ success: true, message: 'Enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('enrolledStudents', 'name email avatar');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, students: course.enrolledStudents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
