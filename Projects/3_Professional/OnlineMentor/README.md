# Student-Teacher Learning Platform

A modern web platform connecting students with teachers for live courses, recorded lessons, and interactive learning.

## Features

### For Students
- Browse courses by category, skill level, and teacher ratings
- Enroll in live or recorded courses
- Rate and review teachers
- Track learning progress
- Download course resources
- Real-time messaging with teachers

### For Teachers
- Create and manage courses
- Host live video sessions
- Upload recorded content
- Track student engagement
- Manage earnings and analytics

### For Admins
- User and content moderation
- Platform analytics
- Course approval system

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Live Video**: WebRTC/Agora SDK
- **Payments**: Stripe
- **Authentication**: JWT
- **File Storage**: AWS S3 or Cloudinary

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

Create `.env` files in both frontend and backend directories (see `.env.example` files)

### Run Development Servers

```bash
# Backend (port 5000)
cd backend
npm run dev

# Frontend (port 3000)
cd frontend
npm start
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── context/        # React context
│   │   └── utils/          # Helper functions
│   └── public/
├── backend/
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, validation
│   └── config/             # Configuration
└── docs/                   # Documentation
```

## API Documentation

See `/docs/API.md` for detailed API documentation.

## Deployment

Recommended hosting:
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, AWS
- **Database**: MongoDB Atlas
- **Storage**: AWS S3, Cloudinary

## License

MIT
