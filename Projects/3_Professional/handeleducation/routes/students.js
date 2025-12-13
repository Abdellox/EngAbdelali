const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

// Create new student
router.post('/register', [
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('phone').trim().notEmpty(),
    body('gradeLevel').trim().notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            student
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});

// Get student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('sessions');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve student'
        });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const { status, gradeLevel, limit = 100 } = req.query;
        
        const query = {};
        if (status) query.status = status;
        if (gradeLevel) query.gradeLevel = gradeLevel;

        const students = await Student.find(query)
            .sort({ enrollmentDate: -1 })
            .limit(parseInt(limit));

        res.json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve students'
        });
    }
});

// Update student
router.patch('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update student'
        });
    }
});

// Add test score
router.post('/:id/test-scores', async (req, res) => {
    try {
        const { testType, score, date, notes } = req.body;
        
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        student.testScores.push({ testType, score, date, notes });
        await student.save();

        res.json({
            success: true,
            message: 'Test score added',
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add test score'
        });
    }
});

module.exports = router;
