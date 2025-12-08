# Quick Start Guide

## Important: Before Running

You need to have PostgreSQL installed and running on your system.

### Step 1: Install PostgreSQL (if not installed)
Download from: https://www.postgresql.org/download/windows/

### Step 2: Create Database
Open PostgreSQL command line (psql) and run:
```sql
CREATE DATABASE business_management;
```

Then run the schema:
```bash
psql -U postgres -d business_management -f database/schema.sql
```

### Step 3: Configure Environment
The `.env` file has been created. Update the DATABASE_URL if needed:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/business_management
```

### Step 4: Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd client
npm install
cd ..
```

If npm install is slow, you can try:
```bash
npm install --legacy-peer-deps
```

### Step 5: Run the Application

**Option 1 - Run both together:**
```bash
npm run dev
```

**Option 2 - Run separately:**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

### Step 6: Access the Application

Open browser: http://localhost:3000

**Login with:**
- Email: admin@business.com
- Password: admin123

## Troubleshooting

**If npm install is stuck:**
- Press Ctrl+C to cancel
- Try: `npm cache clean --force`
- Then: `npm install --legacy-peer-deps`

**If database connection fails:**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in .env file
- Verify database exists: `psql -U postgres -l`

**If port is already in use:**
- Backend: Change PORT in .env
- Frontend: Change port in client/package.json
