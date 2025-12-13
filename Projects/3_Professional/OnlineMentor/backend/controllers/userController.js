const User = require('../models/User');
const Course = require('../models/Course');

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ 
      role: 'teacher',
      isApproved: true 
    }).select('-password');

    res.json({ success: true, count: teachers.length, teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let courses;
    if (user.role === 'teacher') {
      courses = await Course.find({ teacher: user._id });
    } else {
      courses = await Course.find({ _id: { $in: user.enrolledCourses } });
    }

    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('enrolledCourses')
      .populate('createdCourses');

    const stats = {
      enrolledCourses: user.enrolledCourses?.length || 0,
      createdCourses: user.createdCourses?.length || 0,
      rating: user.rating || 0,
      earnings: user.earnings || 0
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
