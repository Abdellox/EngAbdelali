# Complete Setup Instructions for LegalMind AI

## Current Status
✅ Python 3.13.3 installed
✅ Node.js v22.14.0 installed
❌ PostgreSQL not installed or not in PATH
⚠️ Frontend dependencies partially installed
⚠️ Backend dependencies need PostgreSQL

## Step-by-Step Setup

### 1. Install PostgreSQL with pgvector

**Download and Install:**
1. Download PostgreSQL 15+ from: https://www.postgresql.org/download/windows/
2. During installation, remember your password for the postgres user
3. Add PostgreSQL to your PATH (usually `C:\Program Files\PostgreSQL\15\bin`)

**Install pgvector extension:**
```bash
# After PostgreSQL is installed
# Download pgvector from: https://github.com/pgvector/pgvector/releases
# Or use: https://github.com/pgvector/pgvector-windows
```

### 2. Create Database

Open Command Prompt or PowerShell and run:

```bash
# Connect to PostgreSQL
psql -U postgres

# In psql prompt:
CREATE DATABASE legalmind;
\c legalmind
CREATE EXTENSION vector;
\q
```

### 3. Configure Backend

Edit `backend/.env` file with your settings:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/legalmind
SECRET_KEY=your-super-secret-key-min-32-characters-change-this
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 4. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

If you get psycopg2 errors, try:
```bash
pip install psycopg2-binary --no-binary psycopg2-binary
# OR
pip install psycopg2-binary
```

### 5. Run Database Migrations

```bash
cd backend
alembic upgrade head
```

### 6. Seed Sample Data (Optional)

```bash
python seed_data.py
```

This creates an admin user:
- Email: admin@legalmind.ai
- Password: admin123

### 7. Install Frontend Dependencies

```bash
cd frontend
npm install
```

If you get errors, try:
```bash
npm cache clean --force
npm install
```

### 8. Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 9. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Alternative: Use SQLite (Simpler Setup)

If PostgreSQL is too complex, you can modify the backend to use SQLite:

1. Edit `backend/app/config.py`
2. Change DATABASE_URL to: `sqlite:///./legalmind.db`
3. Remove pgvector dependency (vector search won't work)

## Troubleshooting

### PostgreSQL Issues
- Make sure PostgreSQL service is running
- Check Windows Services for "postgresql-x64-15"
- Verify password is correct

### Python Package Issues
```bash
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir
```

### Node Module Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Quick Test Without Full Setup

You can test the frontend without the backend:

```bash
cd frontend
npm run dev
```

The frontend will load, but AI features won't work without the backend.

## Need Help?

Check these files:
- README.md - Main documentation
- QUICKSTART.md - Quick setup guide
- TESTING.md - Testing instructions
- DEPLOYMENT.md - Production deployment

## Minimum Requirements

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ with pgvector
- OpenAI API key (for AI features)
- 4GB RAM minimum
- 10GB disk space
