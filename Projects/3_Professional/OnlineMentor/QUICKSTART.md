# Quick Start Guide

## Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend  
cd frontend
npm install
```

## Setup MongoDB

Option 1 - Local MongoDB:
```bash
# Install MongoDB from mongodb.com/try/download/community
# Start MongoDB service
```

Option 2 - MongoDB Atlas (Cloud):
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update backend/.env MONGODB_URI

## Run the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access at: http://localhost:3000

## Test the Platform

1. Register as a student or teacher
2. Teachers can create courses
3. Students can browse and enroll
4. Test reviews and ratings

## Environment Files Created

- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend configuration

Update these with your actual API keys for Stripe, Agora, etc.

## Next Steps

- Set up MongoDB (local or Atlas)
- Get Stripe test keys from stripe.com
- Get Agora credentials from agora.io for live video
- Run both servers and start testing!
