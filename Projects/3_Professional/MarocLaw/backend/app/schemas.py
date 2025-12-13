from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class MessageCreate(BaseModel):
    content: str
    session_id: Optional[UUID] = None

class MessageResponse(BaseModel):
    id: UUID
    role: str
    content: str
    created_at: datetime
    metadata: Optional[dict] = None
    
    class Config:
        from_attributes = True

class SessionResponse(BaseModel):
    id: UUID
    title: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ChatResponse(BaseModel):
    answer: str
    sources: List[dict]
    session_id: UUID
    message_id: UUID

class FeedbackCreate(BaseModel):
    message_id: UUID
    rating: int
    comment: Optional[str] = None
