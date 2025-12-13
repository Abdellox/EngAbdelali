# LegalMind AI - Complete Architecture

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: React Context + Hooks
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Auth**: JWT + bcrypt
- **Validation**: Pydantic v2
- **ORM**: SQLAlchemy 2.0
- **Migration**: Alembic
- **Rate Limiting**: slowapi
- **CORS**: fastapi-cors

### AI Layer
- **Framework**: LangChain
- **Embeddings**: sentence-transformers (all-MiniLM-L6-v2)
- **LLM**: OpenAI GPT-4 / Anthropic Claude / Local Llama
- **Vector DB**: pgvector
- **Document Processing**: LlamaIndex
- **Chunking**: RecursiveCharacterTextSplitter

### Database
- **Primary**: PostgreSQL 15+ with pgvector
- **Cache**: Redis (optional)
- **Storage**: S3-compatible (MinIO/AWS S3)

### DevOps
- **Frontend Host**: Vercel
- **Backend Host**: Railway / Render / AWS
- **Database**: Supabase / Neon / AWS RDS
- **Monitoring**: Sentry + LogTail
- **CI/CD**: GitHub Actions

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  Next.js 15 App (React + TypeScript + Tailwind)            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│              FastAPI Backend (Python)                        │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │   Auth   │   Chat   │  Search  │  Admin   │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│      AI ENGINE           │  │    DATABASE LAYER        │
│  ┌────────────────────┐  │  │  ┌────────────────────┐  │
│  │  LangChain RAG     │  │  │  │  PostgreSQL        │  │
│  │  Pipeline          │  │  │  │  + pgvector        │  │
│  ├────────────────────┤  │  │  ├────────────────────┤  │
│  │  Embeddings        │  │  │  │  Users             │  │
│  │  (sentence-trans)  │  │  │  │  Sessions          │  │
│  ├────────────────────┤  │  │  │  Messages          │  │
│  │  LLM Provider      │  │  │  │  Documents         │  │
│  │  (GPT-4/Claude)    │  │  │  │  Embeddings        │  │
│  └────────────────────┘  │  │  └────────────────────┘  │
└──────────────────────────┘  └──────────────────────────┘
```

## Database Schema

### Users Table
- id (UUID, PK)
- email (unique)
- password_hash
- full_name
- role (user/admin)
- is_active
- created_at
- updated_at

### Sessions Table
- id (UUID, PK)
- user_id (FK)
- title
- created_at
- updated_at

### Messages Table
- id (UUID, PK)
- session_id (FK)
- role (user/assistant)
- content (text)
- metadata (jsonb)
- created_at

### Documents Table
- id (UUID, PK)
- title
- content
- source_url
- category
- uploaded_by (FK)
- created_at

### Embeddings Table
- id (UUID, PK)
- document_id (FK)
- chunk_text
- embedding (vector(384))
- metadata (jsonb)
- created_at

### Feedback Table
- id (UUID, PK)
- message_id (FK)
- user_id (FK)
- rating (1-5)
- comment
- created_at

## Security Features

1. JWT-based authentication
2. Password hashing (bcrypt)
3. Rate limiting (100 req/min per IP)
4. CORS configuration
5. SQL injection prevention (ORM)
6. XSS protection (sanitization)
7. HTTPS only
8. Environment variable secrets
9. API key rotation
10. Audit logging
