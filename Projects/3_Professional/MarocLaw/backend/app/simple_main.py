"""
Simplified backend that runs without database - for demo purposes
Run with: uvicorn app.simple_main:app --reload --port 8000
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

app = FastAPI(title="LegalMind AI API - Demo Mode")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
users_db = {}
sessions_db = {}
messages_db = []

# Schemas
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class MessageCreate(BaseModel):
    content: str
    session_id: Optional[str] = None

# Routes
@app.get("/")
def root():
    return {"message": "LegalMind AI API - Demo Mode", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/api/auth/signup")
def signup(user_data: UserCreate):
    if user_data.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    users_db[user_data.email] = {
        "id": user_id,
        "email": user_data.email,
        "full_name": user_data.full_name,
        "role": "user",
        "is_active": True,
        "created_at": datetime.utcnow().isoformat()
    }
    return users_db[user_data.email]

@app.post("/api/auth/login")
def login(user_data: UserLogin):
    if user_data.email not in users_db:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    return {
        "access_token": f"demo_token_{user_data.email}",
        "token_type": "bearer"
    }

@app.get("/api/auth/me")
def get_me():
    return {
        "id": str(uuid.uuid4()),
        "email": "demo@legalmind.ai",
        "full_name": "Demo User",
        "role": "user",
        "is_active": True,
        "created_at": datetime.utcnow().isoformat()
    }

@app.post("/api/chat/message")
def send_message(message_data: MessageCreate):
    session_id = message_data.session_id or str(uuid.uuid4())
    message_id = str(uuid.uuid4())
    
    # Mock AI response
    answer = f"""Based on your question about "{message_data.content[:50]}...", here's a general legal information response:

This is a demo response. In the full version with database and OpenAI integration, you would receive:
- Detailed legal information from our knowledge base
- Source citations from legal documents
- Context-aware responses using GPT-4
- Verified references and links

To enable full AI features:
1. Set up PostgreSQL with pgvector
2. Add your OpenAI API key
3. Run database migrations
4. Seed the knowledge base

For now, you can explore the beautiful UI and all 10+ pages of the application!"""
    
    messages_db.append({
        "id": message_id,
        "session_id": session_id,
        "role": "user",
        "content": message_data.content,
        "created_at": datetime.utcnow().isoformat()
    })
    
    messages_db.append({
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "assistant",
        "content": answer,
        "created_at": datetime.utcnow().isoformat()
    })
    
    return {
        "answer": answer,
        "sources": [
            {"title": "Demo Document 1", "url": "#", "similarity": 0.95},
            {"title": "Demo Document 2", "url": "#", "similarity": 0.87}
        ],
        "session_id": session_id,
        "message_id": message_id
    }

@app.get("/api/chat/sessions")
def get_sessions():
    unique_sessions = {}
    for msg in messages_db:
        sid = msg["session_id"]
        if sid not in unique_sessions:
            unique_sessions[sid] = {
                "id": sid,
                "title": "Demo Conversation",
                "created_at": msg["created_at"],
                "updated_at": msg["created_at"]
            }
    return list(unique_sessions.values())

@app.get("/api/chat/sessions/{session_id}/messages")
def get_messages(session_id: str):
    return [msg for msg in messages_db if msg["session_id"] == session_id]

@app.delete("/api/chat/sessions/{session_id}")
def delete_session(session_id: str):
    global messages_db
    messages_db = [msg for msg in messages_db if msg["session_id"] != session_id]
    return {"message": "Session deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
