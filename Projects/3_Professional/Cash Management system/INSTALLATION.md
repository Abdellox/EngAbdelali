# Installation Guide

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Step 1: Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE business_management;
```

3. Run the schema file:
```bash
psql -U your_username -d business_management -f database/schema.sql
```

## Step 2: Backend Setup

1. Copy environment file:
```bash
copy .env.example .env
```

2. Edit `.env` and update your database credentials:
```
DATABASE_URL=postgresql://username:password@localhost:5432/business_management
JWT_SECRET=your_secure_random_string_here
```

3. Install backend dependencies:
```bash
npm install
```

## Step 3: Frontend Setup

1. Navigate to client folder and install dependencies:
```bash
cd client
npm install
cd ..
```

## Step 4: Run the Application

Start both backend and frontend:
```bash
npm run dev
```

Or run separately:
- Backend: `npm run server` (runs on port 5000)
- Frontend: `npm run client` (runs on port 3000)

## Step 5: Access the Application

Open your browser and go to: http://localhost:3000

## Default Login Credentials

- **Admin**: admin@business.com / admin123
- **Manager**: manager@business.com / manager123
- **Cashier**: cashier@business.com / cashier123

## Troubleshooting

- If database connection fails, check your DATABASE_URL in .env
- If port 5000 or 3000 is in use, change PORT in .env or client package.json
- Make sure PostgreSQL service is running
