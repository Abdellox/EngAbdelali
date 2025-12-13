const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    tutor: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: [true, 'Subject is required']
    },
    date: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    duration: {
        type: Number,
        default: 60,
        required: true
    },
    type: {
        type: String,
        enum: ['online', 'in-person'],
        default: 'online'
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled'
    },
    meetingLink: {
        type: String
    },
    notes: {
        type: String
    },
    sessionNotes: {
        type: String
    },
    homework: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    feedback: {
        type: String
    }
}, {
    timestamps: true
});

// Index for faster queries
appointmentSchema.index({ student: 1, date: -1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
