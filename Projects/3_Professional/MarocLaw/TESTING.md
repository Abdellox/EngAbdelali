# Testing Guide

## Manual Testing Checklist

### Authentication Flow
- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Invalid credentials show error
- [ ] Token persists after page refresh
- [ ] Logout clears token

### AI Assistant
- [ ] Ask a legal question
- [ ] Receive answer with sources
- [ ] Create new conversation
- [ ] View conversation history
- [ ] Delete conversation
- [ ] Session persists across page loads

### Document Upload
- [ ] Upload PDF document
- [ ] Document appears in list
- [ ] Document is processed
- [ ] Can query uploaded document content
- [ ] Delete document

### Pages
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Pricing page displays plans
- [ ] Contact form submits
- [ ] About page loads
- [ ] Privacy policy accessible
- [ ] Terms of service accessible
- [ ] Dashboard shows user data

### Responsive Design
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] All buttons clickable
- [ ] Forms usable on mobile

### Security
- [ ] Protected routes redirect to login
- [ ] Cannot access other users' data
- [ ] XSS protection works
- [ ] CORS configured correctly
- [ ] Rate limiting active

## API Testing

### Using curl

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Sign Up:**
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","full_name":"Test User"}'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Send Message (requires token):**
```bash
curl -X POST http://localhost:8000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"content":"What is a contract?"}'
```

### Using Python

```python
import requests

BASE_URL = "http://localhost:8000"

# Sign up
response = requests.post(f"{BASE_URL}/api/auth/signup", json={
    "email": "test@example.com",
    "password": "test123",
    "full_name": "Test User"
})
print(response.json())

# Login
response = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "test@example.com",
    "password": "test123"
})
token = response.json()["access_token"]

# Send message
headers = {"Authorization": f"Bearer {token}"}
response = requests.post(f"{BASE_URL}/api/chat/message", 
    json={"content": "What is a contract?"},
    headers=headers
)
print(response.json())
```

## Performance Testing

### Load Testing with Apache Bench

```bash
# Test health endpoint
ab -n 1000 -c 10 http://localhost:8000/health

# Test with authentication
ab -n 100 -c 5 -H "Authorization: Bearer TOKEN" \
  http://localhost:8000/api/chat/sessions
```

### Expected Performance
- Health check: < 50ms
- Authentication: < 200ms
- Chat message: < 3000ms (depends on OpenAI)
- Document upload: < 5000ms

## Database Testing

### Check Data Integrity

```sql
-- Count users
SELECT COUNT(*) FROM users;

-- Count sessions
SELECT COUNT(*) FROM sessions;

-- Count messages
SELECT COUNT(*) FROM messages;

-- Count documents
SELECT COUNT(*) FROM documents;

-- Count embeddings
SELECT COUNT(*) FROM embeddings;

-- Check vector index
SELECT * FROM pg_indexes WHERE tablename = 'embeddings';
```

### Test Vector Search

```sql
-- Find similar embeddings (example)
SELECT chunk_text, 
       1 - (embedding <=> '[0.1, 0.2, ...]'::vector) as similarity
FROM embeddings
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

## Common Issues

### Backend Issues

**Issue:** Database connection fails
**Solution:** Check DATABASE_URL, ensure PostgreSQL is running

**Issue:** OpenAI API errors
**Solution:** Verify OPENAI_API_KEY is valid and has credits

**Issue:** Import errors
**Solution:** Run `pip install -r requirements.txt`

**Issue:** Migration fails
**Solution:** Drop database and recreate, then run migrations

### Frontend Issues

**Issue:** API calls fail
**Solution:** Check NEXT_PUBLIC_API_URL matches backend URL

**Issue:** Build errors
**Solution:** Delete node_modules and package-lock.json, reinstall

**Issue:** Styles not loading
**Solution:** Restart dev server, check Tailwind config

**Issue:** Authentication not working
**Solution:** Clear localStorage, check token format

## Automated Testing (Future)

### Backend Tests (pytest)
```python
# tests/test_auth.py
def test_signup():
    response = client.post("/api/auth/signup", json={
        "email": "test@test.com",
        "password": "test123",
        "full_name": "Test"
    })
    assert response.status_code == 200

def test_login():
    response = client.post("/api/auth/login", json={
        "email": "test@test.com",
        "password": "test123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

### Frontend Tests (Jest/Vitest)
```typescript
// __tests__/login.test.tsx
test('login form submits correctly', async () => {
  render(<Login />)
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@test.com' }
  })
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'test123' }
  })
  fireEvent.click(screen.getByText('Sign In'))
  // Assert success
})
```

## Test Data

### Sample Questions
1. "What is a contract?"
2. "What are the elements of a valid contract?"
3. "What is employment discrimination?"
4. "What is intellectual property?"
5. "What are the types of trademarks?"

### Expected Behavior
- All questions should return answers with sources
- Answers should be relevant and accurate
- Sources should be cited properly
- Response time should be < 5 seconds
