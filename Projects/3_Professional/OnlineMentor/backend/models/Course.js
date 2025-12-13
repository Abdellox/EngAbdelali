const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    maxlength: 2000
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['programming', 'design', 'business', 'music', 'language', 'science', 'math', 'other']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  thumbnail: {
    type: String,
    default: 'default-course.jpg'
  },
  syllabus: [{
    title: String,
    description: String,
    duration: Number
  }],
  lessons: [{
    title: String,
    type: {
      type: String,
      enum: ['video', 'live', 'document', 'quiz']
    },
    content: String,
    duration: Number,
    isPreview: {
      type: Boolean,
      default: false
    }
  }],
  liveSchedule: [{
    date: Date,
    duration: Number,
    meetingLink: String,
    maxStudents: Number
  }],
  resources: [{
    title: String,
    fileUrl: String,
    fileType: String
  }],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for search
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
