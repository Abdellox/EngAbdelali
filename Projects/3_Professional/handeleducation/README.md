# Handel Education - Complete Platform

Modern education platform with student management, course enrollment, and appointment scheduling.

## Features

- **Student Management**: Register, track progress, test scores
- **Course System**: Create courses, manage enrollment, track capacity
- **Appointment Scheduling**: Book tutoring sessions, online/in-person
- **Contact Form**: Lead capture with email notifications
- **Email Notifications**: Automated confirmations and reminders

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer
- **Validation**: Express Validator

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file with:
   - MongoDB connection string
   - Email credentials (Gmail, SendGrid, etc.)
   - Admin email address

4. Start MongoDB:
```bash
mongod
```

5. Run the server:
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/all` - Get all contacts
- `PATCH /api/contact/:id/status` - Update contact status

### Students
- `POST /api/students/register` - Register new student
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `PATCH /api/students/:id` - Update student
- `POST /api/students/:id/test-scores` - Add test score

### Appointments
- `POST /api/appointments/create` - Create appointment
- `GET /api/appointments` - Get appointments
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/create` - Create course
- `POST /api/courses/:id/enroll` - Enroll student

## Database Models

- **Student**: Student profiles with test scores and sessions
- **Course**: Course information with enrollment tracking
- **Appointment**: Tutoring session scheduling
- **Contact**: Lead capture from contact form

## Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate app-specific password
3. Use in EMAIL_PASSWORD env variable

## Production Deployment

1. Set NODE_ENV=production
2. Use secure MongoDB connection (MongoDB Atlas)
3. Configure production email service
4. Set up SSL/HTTPS
5. Use process manager (PM2)

## License

MIT
