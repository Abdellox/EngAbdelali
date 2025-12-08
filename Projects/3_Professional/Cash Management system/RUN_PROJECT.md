# 🚀 How to Run the Project

## ⚠️ IMPORTANT: You need PostgreSQL installed first!

### If you DON'T have PostgreSQL:
1. Download from: https://www.postgresql.org/download/windows/
2. Install it (remember the password you set for 'postgres' user)
3. Come back here after installation

### If you HAVE PostgreSQL installed:

## Step 1: Setup Database

**Option A - Using Command Line:**
```bash
psql -U postgres
```
Then type:
```sql
CREATE DATABASE business_management;
\q
```

Then load the schema:
```bash
psql -U postgres -d business_management -f database/schema.sql
```

**Option B - Using pgAdmin:**
1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name it: business_management
4. Open Query Tool and paste the contents of `database/schema.sql`
5. Execute it

## Step 2: Update Database Password

Edit the `.env` file and change YOUR_PASSWORD to your actual PostgreSQL password:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/business_management
```

## Step 3: Run the Application

Open TWO terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Wait until you see: "Server running on port 5000"

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The browser should automatically open to http://localhost:3000

## Step 4: Login

Use these credentials:
- **Email:** admin@business.com
- **Password:** admin123

## 🎉 You're Ready!

The system is now running. You can:
- View the dashboard
- Create products
- Make sales through POS
- Track inventory
- Record expenses
- View reports

## ❌ Troubleshooting

**"Database connection error":**
- Make sure PostgreSQL is running
- Check your password in .env file
- Verify database exists: `psql -U postgres -l`

**"Port already in use":**
- Close other applications using port 5000 or 3000
- Or change the port in .env (backend) or client/package.json (frontend)

**"Module not found":**
- Run `npm install` in root folder
- Run `npm install` in client folder
