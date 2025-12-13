# LegalMind AI - Backend

FastAPI backend with RAG (Retrieval-Augmented Generation) for legal question answering.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up PostgreSQL with pgvector:
```sql
CREATE DATABASE legalmind;
\c legalmind
CREATE EXTENSION vector;
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Run migrations:
```bash
alembic upgrade head
```

5. Start the server:
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Chat
- `POST /api/chat/message` - Send message and get AI response
- `GET /api/chat/sessions` - Get user's chat sessions
- `GET /api/chat/sessions/{id}/messages` - Get session messages
- `DELETE /api/chat/sessions/{id}` - Delete session

## Development

API docs available at: http://localhost:8000/docs
