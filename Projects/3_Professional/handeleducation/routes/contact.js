const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

// Submit contact form
router.post('/submit', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('grade').trim().notEmpty().withMessage('Grade level is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { name, email, phone, grade, subject, message } = req.body;

        // Save to database
        const contact = new Contact({
            name,
            email,
            phone,
            grade,
            subject,
            message
        });

        await contact.save();

        // Send confirmation email to student/parent
        await emailService.sendContactConfirmation({
            to: email,
            name,
            subject,
            grade
        });

        // Send notification to admin
        await emailService.sendAdminNotification({
            name,
            email,
            phone,
            grade,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Thank you! We will contact you within 24 hours.',
            contactId: contact._id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again.'
        });
    }
});

// Get all contacts (admin)
router.get('/all', async (req, res) => {
    try {
        const { status, limit = 50 } = req.query;
        
        const query = status ? { status } : {};
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            count: contacts.length,
            contacts
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve contacts'
        });
    }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status, notes },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        res.json({
            success: true,
            contact
        });
    } catch (error) {
        console.error('Update contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update contact'
        });
    }
});

module.exports = router;
