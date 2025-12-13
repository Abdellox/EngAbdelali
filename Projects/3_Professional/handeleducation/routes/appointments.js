const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Student = require('../models/Student');
const emailService = require('../services/emailService');

// Create appointment
router.post('/create', async (req, res) => {
    try {
        const { studentId, tutor, subject, date, duration, type, notes } = req.body;

        // Verify student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const appointment = new Appointment({
            student: studentId,
            tutor,
            subject,
            date,
            duration,
            type,
            notes
        });

        await appointment.save();

        // Add to student's sessions
        student.sessions.push(appointment._id);
        await student.save();

        // Send confirmation email
        await emailService.sendAppointmentConfirmation({
            to: student.email,
            name: student.name,
            subject,
            date,
            tutor,
            type
        });

        res.status(201).json({
            success: true,
            message: 'Appointment scheduled successfully',
            appointment
        });
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create appointment'
        });
    }
});

// Get appointments
router.get('/', async (req, res) => {
    try {
        const { studentId, status, date } = req.query;
        
        const query = {};
        if (studentId) query.student = studentId;
        if (status) query.status = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.date = { $gte: startDate, $lt: endDate };
        }

        const appointments = await Appointment.find(query)
            .populate('student', 'name email phone gradeLevel')
            .sort({ date: 1 });

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve appointments'
        });
    }
});

// Update appointment
router.patch('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('student');

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update appointment'
        });
    }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        ).populate('student');

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Send cancellation email
        await emailService.sendAppointmentCancellation({
            to: appointment.student.email,
            name: appointment.student.name,
            subject: appointment.subject,
            date: appointment.date
        });

        res.json({
            success: true,
            message: 'Appointment cancelled',
            appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to cancel appointment'
        });
    }
});

module.exports = router;
