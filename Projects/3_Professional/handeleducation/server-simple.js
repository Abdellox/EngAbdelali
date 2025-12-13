const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage (replace with MongoDB in production)
const storage = {
    contacts: [],
    students: [],
    appointments: [],
    courses: [
        {
            id: 1,
            name: 'SAT/ACT Mastery',
            category: 'SAT/ACT',
            description: 'Comprehensive test preparation with proven strategies',
            price: 299,
            duration: 12,
            maxStudents: 10,
            enrolledCount: 7,
            status: 'active'
        },
        {
            id: 2,
            name: 'Math Excellence',
            category: 'Math',
            description: 'From Algebra to Calculus',
            price: 249,
            duration: 10,
            maxStudents: 8,
            enrolledCount: 5,
            status: 'active'
        },
        {
            id: 3,
            name: 'Writing & English',
            category: 'English',
            description: 'Develop powerful writing skills',
            price: 229,
            duration: 8,
            maxStudents: 10,
            enrolledCount: 6,
            status: 'active'
        }
    ]
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Handel Education API is running',
        timestamp: new Date().toISOString()
    });
});

// Contact form submission
app.post('/api/contact/submit', (req, res) => {
    try {
        const { name, email, phone, grade, subject, message } = req.body;

        if (!name || !email || !phone || !grade || !subject) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled'
            });
        }

        const contact = {
            id: storage.contacts.length + 1,
            name,
            email,
            phone,
            grade,
            subject,
            message: message || '',
            status: 'new',
            createdAt: new Date().toISOString()
        };

        storage.contacts.push(contact);

        console.log('📧 New contact submission:', contact);

        res.status(201).json({
            success: true,
            message: 'Thank you! We will contact you within 24 hours.',
            contactId: contact.id
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
app.get('/api/contact/all', (req, res) => {
    res.json({
        success: true,
        count: storage.contacts.length,
        contacts: storage.contacts
    });
});

// Get all courses
app.get('/api/courses', (req, res) => {
    const { status = 'active' } = req.query;
    
    const filteredCourses = storage.courses.filter(c => c.status === status);

    res.json({
        success: true,
        count: filteredCourses.length,
        courses: filteredCourses
    });
});

// Register student
app.post('/api/students/register', (req, res) => {
    try {
        const { name, email, phone, gradeLevel, subjects } = req.body;

        if (!name || !email || !phone || !gradeLevel) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled'
            });
        }

        // Check if email exists
        const exists = storage.students.find(s => s.email === email);
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        const student = {
            id: storage.students.length + 1,
            name,
            email,
            phone,
            gradeLevel,
            subjects: subjects || [],
            status: 'active',
            enrollmentDate: new Date().toISOString(),
            testScores: [],
            sessions: []
        };

        storage.students.push(student);

        console.log('👨‍🎓 New student registered:', student);

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            student
        });

    } catch (error) {
        console.error('Student registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});

// Get all students
app.get('/api/students', (req, res) => {
    res.json({
        success: true,
        count: storage.students.length,
        students: storage.students
    });
});

// Create appointment
app.post('/api/appointments/create', (req, res) => {
    try {
        const { studentId, tutor, subject, date, duration, type, notes } = req.body;

        if (!studentId || !tutor || !subject || !date) {
            return res.status(400).json({
                success: false,
                message: 'Required fields missing'
            });
        }

        const appointment = {
            id: storage.appointments.length + 1,
            studentId,
            tutor,
            subject,
            date,
            duration: duration || 60,
            type: type || 'online',
            status: 'scheduled',
            notes: notes || '',
            createdAt: new Date().toISOString()
        };

        storage.appointments.push(appointment);

        console.log('📅 New appointment created:', appointment);

        res.status(201).json({
            success: true,
            message: 'Appointment scheduled successfully',
            appointment
        });

    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create appointment'
        });
    }
});

// Get appointments
app.get('/api/appointments', (req, res) => {
    res.json({
        success: true,
        count: storage.appointments.length,
        appointments: storage.appointments
    });
});

// Get statistics
app.get('/api/stats', (req, res) => {
    res.json({
        success: true,
        stats: {
            totalStudents: storage.students.length,
            totalContacts: storage.contacts.length,
            totalAppointments: storage.appointments.length,
            activeCourses: storage.courses.filter(c => c.status === 'active').length
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ========================================');
    console.log('   Handel Education Server Started!');
    console.log('🚀 ========================================');
    console.log('');
    console.log(`   📍 URL: http://localhost:${PORT}`);
    console.log(`   📚 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   ⏰ Time: ${new Date().toLocaleString()}`);
    console.log('');
    console.log('   Available endpoints:');
    console.log('   - GET  /api/health');
    console.log('   - POST /api/contact/submit');
    console.log('   - GET  /api/courses');
    console.log('   - POST /api/students/register');
    console.log('   - POST /api/appointments/create');
    console.log('   - GET  /api/stats');
    console.log('');
    console.log('🚀 ========================================');
    console.log('');
});

module.exports = app;
