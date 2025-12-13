const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    category: {
        type: String,
        enum: ['SAT/ACT', 'Math', 'English', 'Science', 'College Prep', 'Study Skills'],
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'intermediate'
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxStudents: {
        type: Number,
        default: 10
    },
    schedule: [{
        day: String,
        time: String
    }],
    tutor: {
        type: String,
        required: true
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'full'],
        default: 'active'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true
});

courseSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Course', courseSchema);
