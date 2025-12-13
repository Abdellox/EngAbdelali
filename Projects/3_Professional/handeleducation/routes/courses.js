const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const { category, status = 'active' } = req.query;
        
        const query = { status };
        if (category) query.category = category;

        const courses = await Course.find(query)
            .populate('enrolledStudents', 'name email')
            .sort({ startDate: 1 });

        res.json({
            success: true,
            count: courses.length,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve courses'
        });
    }
});

// Get course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('enrolledStudents', 'name email gradeLevel');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({ success: true, course });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve course'
        });
    }
});

// Create course
router.post('/create', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create course'
        });
    }
});

// Enroll student in course
router.post('/:id/enroll', async (req, res) => {
    try {
        const { studentId } = req.body;
        
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (course.enrolledStudents.length >= course.maxStudents) {
            return res.status(400).json({
                success: false,
                message: 'Course is full'
            });
        }

        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({
                success: false,
                message: 'Student already enrolled'
            });
        }

        course.enrolledStudents.push(studentId);
        
        if (course.enrolledStudents.length >= course.maxStudents) {
            course.status = 'full';
        }

        await course.save();

        res.json({
            success: true,
            message: 'Student enrolled successfully',
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to enroll student'
        });
    }
});

module.exports = router;
