const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/Course');
const User = require('../models/User');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100),
      currency: 'usd',
      metadata: {
        courseId: course._id.toString(),
        studentId: req.user._id.toString(),
        teacherId: course.teacher.toString()
      }
    });

    res.json({ 
      success: true, 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, courseId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const course = await Course.findById(courseId);
      
      course.enrolledStudents.push(req.user._id);
      await course.save();

      await User.findByIdAndUpdate(req.user._id, {
        $push: { enrolledCourses: courseId }
      });

      await User.findByIdAndUpdate(course.teacher, {
        $inc: { earnings: course.price }
      });

      res.json({ success: true, message: 'Payment successful' });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    res.json({ success: true, payments: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
