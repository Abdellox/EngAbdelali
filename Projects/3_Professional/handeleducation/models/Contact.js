const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true
    },
    grade: {
        type: String,
        required: [true, 'Grade level is required']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required']
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'converted', 'closed'],
        default: 'new'
    },
    source: {
        type: String,
        default: 'website'
    },
    followUpDate: {
        type: Date
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

contactSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
