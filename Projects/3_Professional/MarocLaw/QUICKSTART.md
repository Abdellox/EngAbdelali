# Quick Start Guide

Get LegalMind AI running in 5 minutes!

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ with pgvector
- OpenAI API key

## Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/legalmind-ai.git
cd legalmind-ai
```

## Step 2: Database Setup

```sql
-- In PostgreSQL
CREATE DATABASE legalmind;
\c legalmind
CREATE EXTENSION vector;
```

## Step 3: Backend Setup

```bash
cd backend

# Create .env file
copy .env.example .env

# Edit .env with your settings:
# - DATABASE_URL
# - SECRET_KEY (generate a secure random string)
# - OPENAI_API_KEY

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Seed database (optional but recommended)
python seed_data.py
```

## Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# .env.local is already configured
```

## Step 5: Start Services

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Or use: `start-backend.bat`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Or use: `start-frontend.bat`

## Step 6: Access Application

Open your browser to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

## Step 7: Test It Out

### Option 1: Use Seeded Admin Account
- Email: `admin@legalmind.ai`
- Password: `admin123`

### Option 2: Create New Account
1. Click "Sign Up"
2. Fill in your details
3. Login with your credentials

### Try the AI Assistant
1. Go to "AI Assistant" or click "Try Demo"
2. Ask a legal question like:
   - "What is a contract?"
   - "What are the elements of a valid contract?"
   - "What is employment discrimination?"

## Troubleshooting

### Backend Issues

**Error: "Could not connect to database"**
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
# Ensure database exists
```

**Error: "No module named 'app'"**
```bash
# Make sure you're in the backend directory
cd backend
# Reinstall dependencies
pip install -r requirements.txt
```

**Error: "OpenAI API error"**
```bash
# Verify OPENAI_API_KEY in .env
# Check you have API credits
# Ensure key is valid
```

### Frontend Issues

**Error: "Cannot connect to API"**
```bash
# Check backend is running on port 8000
# Verify NEXT_PUBLIC_API_URL in .env.local
```

**Error: "Module not found"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

**Error: "pgvector extension not found"**
```sql
-- Install pgvector extension
CREATE EXTENSION vector;
```

**Error: "Migration failed"**
```bash
# Reset database
# Drop and recreate database
# Run migrations again
alembic upgrade head
```

## Next Steps

1. **Explore the application:**
   - Try different questions
   - Upload a PDF document
   - Check your dashboard
   - View conversation history

2. **Customize:**
   - Update branding in frontend
   - Add more sample documents
   - Modify AI prompts
   - Adjust UI colors

3. **Deploy:**
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
   - Configure environment for production
   - Set up monitoring

4. **Develop:**
   - See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
   - Check [FEATURES.md](FEATURES.md) for feature roadmap
   - Read [TESTING.md](TESTING.md) for testing

## Automated Setup (Windows)

For a fully automated setup, run:

```bash
setup.bat
```

This will:
- ✅ Install all dependencies
- ✅ Set up environment files
- ✅ Run database migrations
- ✅ Seed sample data
- ✅ Provide next steps

## Common Commands

### Backend
```bash
# Start server
uvicorn app.main:app --reload

# Run migrations
alembic upgrade head

# Create migration
alembic revision --autogenerate -m "description"

# Seed data
python seed_data.py

# Test API
python test_api.py
```

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check
```

### Database
```bash
# Connect to database
psql -U user -d legalmind

# Backup database
pg_dump legalmind > backup.sql

# Restore database
psql legalmind < backup.sql
```

## Support

Need help? Check:
- [README.md](README.md) - Main documentation
- [TESTING.md](TESTING.md) - Testing guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [GitHub Issues](https://github.com/yourusername/legalmind-ai/issues)

## Success Checklist

- [ ] PostgreSQL running with pgvector
- [ ] Backend .env configured
- [ ] Backend dependencies installed
- [ ] Database migrations completed
- [ ] Sample data seeded
- [ ] Frontend dependencies installed
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Can access homepage
- [ ] Can create account
- [ ] Can login
- [ ] Can ask AI questions
- [ ] Can view dashboard

If all checked, you're ready to go! 🎉

## What's Next?

- Explore all pages (About, Pricing, Contact)
- Upload a PDF document
- Try different legal questions
- Check the API documentation
- Read the technical specifications
- Start customizing for your needs

Happy coding! 🚀
