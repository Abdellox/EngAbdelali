const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    gradeLevel: {
        type: String,
        required: [true, 'Grade level is required']
    },
    subjects: [{
        type: String,
        trim: true
    }],
    parentEmail: {
        type: String,
        lowercase: true,
        trim: true
    },
    parentPhone: {
        type: String,
        trim: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'graduated'],
        default: 'pending'
    },
    notes: {
        type: String
    },
    testScores: [{
        testType: String,
        score: Number,
        date: Date,
        notes: String
    }],
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
}, {
    timestamps: true
});

// Index for faster queries
studentSchema.index({ email: 1 });
studentSchema.index({ status: 1 });

module.exports = mongoose.model('Student', studentSchema);
