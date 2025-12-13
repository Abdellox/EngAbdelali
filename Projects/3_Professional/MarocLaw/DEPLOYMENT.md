# Deployment Guide

## Production Deployment

### Backend Deployment (Railway/Render)

1. **Prepare for deployment:**
```bash
cd backend
```

2. **Update requirements.txt** (already done)

3. **Set environment variables:**
```
DATABASE_URL=postgresql://...
SECRET_KEY=<generate-secure-key>
OPENAI_API_KEY=sk-...
ALLOWED_ORIGINS=https://yourdomain.com
ENVIRONMENT=production
DEBUG=False
```

4. **Deploy to Railway:**
- Connect GitHub repo
- Add PostgreSQL plugin
- Set environment variables
- Deploy automatically

5. **Run migrations:**
```bash
railway run alembic upgrade head
```

### Frontend Deployment (Vercel)

1. **Prepare for deployment:**
```bash
cd frontend
```

2. **Update environment variables:**
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

3. **Deploy to Vercel:**
```bash
vercel --prod
```

Or connect GitHub repo in Vercel dashboard.

### Database Setup (Supabase/Neon)

1. **Create PostgreSQL database**

2. **Enable pgvector extension:**
```sql
CREATE EXTENSION vector;
```

3. **Update DATABASE_URL** in backend environment

### Post-Deployment

1. **Seed production data:**
```bash
python seed_data.py
```

2. **Test the deployment:**
- Visit your frontend URL
- Create an account
- Test AI chat functionality
- Upload a document
- Check all pages

3. **Monitor:**
- Set up error tracking (Sentry)
- Monitor API performance
- Check database usage
- Review logs regularly

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=your-secret-key-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=sk-your-key
REDIS_URL=redis://host:6379
ENVIRONMENT=production
DEBUG=False
ALLOWED_ORIGINS=https://yourdomain.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=LegalMind AI
```

## Security Checklist

- [ ] Change SECRET_KEY to a secure random string
- [ ] Set DEBUG=False in production
- [ ] Use HTTPS for all connections
- [ ] Enable CORS only for your domain
- [ ] Set up rate limiting
- [ ] Regular security updates
- [ ] Database backups enabled
- [ ] Monitor for suspicious activity
- [ ] Use environment variables for secrets
- [ ] Enable database SSL

## Performance Optimization

1. **Backend:**
- Use Redis for caching
- Enable database connection pooling
- Optimize vector search queries
- Implement request rate limiting

2. **Frontend:**
- Enable Next.js image optimization
- Use CDN for static assets
- Implement code splitting
- Enable compression

3. **Database:**
- Create proper indexes
- Regular VACUUM operations
- Monitor query performance
- Scale vertically/horizontally as needed

## Monitoring

- **Backend:** Use FastAPI's built-in metrics
- **Frontend:** Vercel Analytics
- **Database:** PostgreSQL logs and metrics
- **Errors:** Sentry or similar service
- **Uptime:** UptimeRobot or Pingdom

## Backup Strategy

1. **Database:**
- Daily automated backups
- Point-in-time recovery enabled
- Test restore procedures monthly

2. **Files:**
- Backup uploaded documents
- Version control for code

## Scaling

### Horizontal Scaling
- Multiple backend instances behind load balancer
- Database read replicas
- Redis cluster for caching

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Use faster embedding models

## Cost Optimization

- **OpenAI API:** Monitor token usage, implement caching
- **Database:** Right-size your instance
- **Hosting:** Use appropriate tier for traffic
- **CDN:** Optimize asset delivery
