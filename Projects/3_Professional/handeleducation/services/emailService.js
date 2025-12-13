const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const emailService = {
    async sendContactConfirmation({ to, name, subject, grade }) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject: 'Thank You for Contacting Handel Education',
            html: `
                <h2>Hello ${name}!</h2>
                <p>Thank you for your interest in Handel Education.</p>
                <p><strong>Your Information:</strong></p>
                <ul>
                    <li>Grade Level: ${grade}</li>
                    <li>Subject(s): ${subject}</li>
                </ul>
                <p>We will contact you within 24 hours to schedule your free consultation.</p>
                <p>Best regards,<br>Handel Education Team</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Confirmation email sent to:', to);
        } catch (error) {
            console.error('Email error:', error);
        }
    },

    async sendAdminNotification({ name, email, phone, grade, subject, message }) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Form Submission - ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Grade:</strong> ${grade}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message || 'No message'}</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Admin notification error:', error);
        }
    }
};

    async sendAppointmentConfirmation({ to, name, subject, date, tutor, type }) {
        const formattedDate = new Date(date).toLocaleString();
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject: 'Appointment Confirmed - Handel Education',
            html: `
                <h2>Hello ${name}!</h2>
                <p>Your tutoring session has been confirmed.</p>
                <p><strong>Details:</strong></p>
                <ul>
                    <li>Subject: ${subject}</li>
                    <li>Tutor: ${tutor}</li>
                    <li>Date & Time: ${formattedDate}</li>
                    <li>Type: ${type}</li>
                </ul>
                <p>We look forward to seeing you!</p>
                <p>Best regards,<br>Handel Education Team</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Appointment email error:', error);
        }
    },

    async sendAppointmentCancellation({ to, name, subject, date }) {
        const formattedDate = new Date(date).toLocaleString();
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject: 'Appointment Cancelled - Handel Education',
            html: `
                <h2>Hello ${name},</h2>
                <p>Your appointment has been cancelled.</p>
                <p><strong>Cancelled Appointment:</strong></p>
                <ul>
                    <li>Subject: ${subject}</li>
                    <li>Date & Time: ${formattedDate}</li>
                </ul>
                <p>Please contact us to reschedule.</p>
                <p>Best regards,<br>Handel Education Team</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Cancellation email error:', error);
        }
    }
};

module.exports = emailService;
