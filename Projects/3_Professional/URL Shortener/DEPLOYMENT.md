# 🚀 Deployment Guide

Complete guide to deploy your URL shortener to production.

## 📋 Pre-Deployment Checklist

Before deploying, make sure to:

- [ ] Change session secret in `server.js`
- [ ] Update `BASE_URL` to your domain
- [ ] Set `cookie.secure: true` for HTTPS
- [ ] Test all features locally
- [ ] Backup your database
- [ ] Review security settings

## 🔧 Configuration Changes

### 1. Update server.js

```javascript
// Change these values:
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || 'https://yourdomain.com';

// Update session config:
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-very-long-random-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true,  // IMPORTANT: Set to true for HTTPS
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));
```

### 2. Create .env file

```bash
PORT=8080
BASE_URL=https://yourdomain.com
SESSION_SECRET=your-very-long-random-secret-key-here
NODE_ENV=production
```

### 3. Update app.js

```javascript
// Change API_URL to your domain
const API_URL = 'https://yourdomain.com/api';
```

## 🌐 Deployment Options

### Option 1: VPS (DigitalOcean, Linode, AWS EC2)

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### Step 2: Upload Files

```bash
# Using SCP
scp -r * user@your-server-ip:/var/www/shorturl/

# Or using Git
git clone your-repo-url /var/www/shorturl
cd /var/www/shorturl
```

#### Step 3: Install Dependencies

```bash
cd /var/www/shorturl
npm install --production
```

#### Step 4: Start with PM2

```bash
# Start the app
pm2 start server.js --name shorturl

# Save PM2 config
pm2 save

# Setup auto-start on reboot
pm2 startup
```

#### Step 5: Setup Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/shorturl
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/shorturl /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 6: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is setup automatically
```

### Option 2: Heroku

#### Step 1: Prepare for Heroku

Create `Procfile`:
```
web: node server.js
```

Update `server.js`:
```javascript
const PORT = process.env.PORT || 8080;
```

#### Step 2: Deploy

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SESSION_SECRET=your-secret-key
heroku config:set BASE_URL=https://your-app-name.herokuapp.com

# Deploy
git push heroku main

# Open app
heroku open
```

### Option 3: Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add environment variables:
   - `SESSION_SECRET`
   - `BASE_URL`
6. Deploy!

### Option 4: Vercel (Serverless)

Note: Requires modifications for serverless architecture.

### Option 5: Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  shorturl:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SESSION_SECRET=your-secret-key
      - BASE_URL=https://yourdomain.com
    volumes:
      - ./urls.db:/app/urls.db
    restart: unless-stopped
```

#### Deploy

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🔒 Security Best Practices

### 1. Environment Variables

Never commit sensitive data. Use environment variables:

```bash
# .env file (add to .gitignore)
SESSION_SECRET=generate-a-very-long-random-string-here
BASE_URL=https://yourdomain.com
NODE_ENV=production
```

### 2. Firewall Setup

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. Regular Updates

```bash
# Update dependencies
npm update

# Update system
sudo apt update && sudo apt upgrade -y
```

### 4. Database Backups

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /var/www/shorturl/urls.db /backups/urls_$DATE.db

# Add to crontab (daily at 2 AM)
0 2 * * * /path/to/backup-script.sh
```

## 📊 Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs shorturl

# Monitor resources
pm2 monit

# Restart app
pm2 restart shorturl
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## 🔧 Troubleshooting

### App won't start

```bash
# Check PM2 logs
pm2 logs shorturl --lines 100

# Check if port is in use
sudo lsof -i :8080

# Restart app
pm2 restart shorturl
```

### Database errors

```bash
# Check permissions
ls -la urls.db

# Fix permissions
chmod 644 urls.db
chown www-data:www-data urls.db
```

### SSL issues

```bash
# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

## 📈 Performance Optimization

### 1. Enable Gzip in Nginx

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

### 2. Add Caching Headers

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Database Optimization

```javascript
// Add to server.js
db.run('PRAGMA journal_mode = WAL');
db.run('PRAGMA synchronous = NORMAL');
```

## 🎯 Post-Deployment

### 1. Test Everything

- [ ] Can access website
- [ ] Can create account
- [ ] Can shorten URLs
- [ ] Redirects work
- [ ] Statistics update
- [ ] SSL certificate valid

### 2. Setup Monitoring

- [ ] Setup uptime monitoring (UptimeRobot, Pingdom)
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)

### 3. Backup Strategy

- [ ] Daily database backups
- [ ] Weekly full backups
- [ ] Test restore process

## 📞 Support

If you encounter issues:

1. Check logs: `pm2 logs shorturl`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables
4. Check firewall settings
5. Verify SSL certificate

---

## 🎉 You're Live!

Your URL shortener is now deployed and ready to use!

**Next Steps:**
- Share your short links
- Monitor performance
- Collect user feedback
- Plan future features

---

Made with ❤️ | Happy Deploying!
