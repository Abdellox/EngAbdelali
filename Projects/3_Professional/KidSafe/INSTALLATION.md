# KidSafe Installation Guide

## System Requirements

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 4GB
- **Disk Space**: 500MB free space

## Step-by-Step Installation

### 1. Install Node.js

If you don't have Node.js installed:

**Windows:**
- Download from https://nodejs.org/
- Run the installer
- Verify installation: `node --version`

**macOS:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Project Dependencies

**Backend:**
```bash
npm install
```

This installs:
- express (web framework)
- socket.io (real-time communication)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- cors (cross-origin requests)
- And other dependencies

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

This installs:
- react (UI library)
- react-router-dom (routing)
- axios (HTTP client)
- leaflet (maps)
- socket.io-client (real-time client)
- And other dependencies

### 3. Configure Environment

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here_change_this
FRONTEND_URL=http://localhost:3000
```

**Important:** Change `JWT_SECRET` to a random string for security!

### 4. Start the Application

**Option A: Run both servers separately**

Terminal 1 (Backend):
```bash
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

**Option B: Use development mode with auto-reload**

Terminal 1 (Backend with nodemon):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### 6. Create Your First Account

1. Open http://localhost:3000/register
2. Fill in your details:
   - Full Name
   - Email
   - Phone
   - Password (minimum 6 characters)
3. Click "Register"
4. You'll be automatically logged in

### 7. Add Your First Child

1. Click "Add Child" on the dashboard
2. Enter child information
3. Save and start monitoring!

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**Change backend port:**
Edit `.env`:
```env
PORT=5001
```

**Change frontend port:**
Create `frontend/.env`:
```env
PORT=3001
```

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install
```

### CORS Errors

Make sure `.env` has correct frontend URL:
```env
FRONTEND_URL=http://localhost:3000
```

### Cannot Connect to Backend

1. Check backend is running: http://localhost:5000/health
2. Check console for errors
3. Verify `.env` configuration
4. Check firewall settings

### Map Not Loading

1. Check internet connection (maps require external tiles)
2. Check browser console for errors
3. Verify leaflet CSS is loaded

## Production Deployment

### Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/build/`

### Serve Frontend from Backend

Install serve package:
```bash
npm install serve
```

Update `backend/server.js` to serve static files:
```javascript
app.use(express.static(path.join(__dirname, '../frontend/build')));
```

### Environment Variables for Production

Update `.env`:
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=very_secure_random_string_here
FRONTEND_URL=https://yourdomain.com
```

### Deploy to Cloud

**Heroku:**
```bash
heroku create kidsafe-app
git push heroku main
```

**AWS/DigitalOcean:**
- Use PM2 for process management
- Set up nginx as reverse proxy
- Configure SSL certificates
- Set up database (MongoDB/PostgreSQL)

## Database Setup (Optional)

The app currently uses in-memory storage. For production, set up a database:

### MongoDB

1. Install MongoDB
2. Update connection string in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/kidsafe
```

3. Replace in-memory models with Mongoose models

### PostgreSQL

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE kidsafe;
```

3. Update connection in `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/kidsafe
```

## Additional Services

### Twilio (SMS/Calls)

1. Sign up at https://www.twilio.com
2. Get credentials
3. Add to `.env`:
```env
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

### Email (Nodemailer)

Add to `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Support

If you encounter issues:

1. Check the logs in terminal
2. Review browser console (F12)
3. Verify all dependencies are installed
4. Check Node.js version compatibility
5. Review environment variables

For additional help, open an issue on GitHub.
