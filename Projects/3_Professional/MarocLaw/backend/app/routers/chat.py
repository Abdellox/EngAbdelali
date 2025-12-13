from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.database import get_db
from app.models import User, Session as ChatSession, Message
from app.schemas import MessageCreate, MessageResponse, ChatResponse, SessionResponse
from app.auth import get_current_active_user
from app.ai_engine import ai_engine

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.post("/message", response_model=ChatResponse)
async def send_message(
    message_data: MessageCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Create or get session
    if message_data.session_id:
        session = db.query(ChatSession).filter(
            ChatSession.id == message_data.session_id,
            ChatSession.user_id == current_user.id
        ).first()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    else:
        session = ChatSession(user_id=current_user.id, title=message_data.content[:50])
        db.add(session)
        db.commit()
        db.refresh(session)
    
    # Save user message
    user_message = Message(
        session_id=session.id,
        role="user",
        content=message_data.content
    )
    db.add(user_message)
    db.commit()
    
    # Get AI response
    ai_response = await ai_engine.answer_question(message_data.content, db)
    
    # Save AI message
    ai_message = Message(
        session_id=session.id,
        role="assistant",
        content=ai_response["answer"],
        metadata={"sources": ai_response["sources"]}
    )
    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)
    
    return ChatResponse(
        answer=ai_response["answer"],
        sources=ai_response["sources"],
        session_id=session.id,
        message_id=ai_message.id
    )

@router.get("/sessions", response_model=List[SessionResponse])
def get_sessions(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    sessions = db.query(ChatSession).filter(
        ChatSession.user_id == current_user.id
    ).order_by(ChatSession.updated_at.desc()).all()
    return sessions

@router.get("/sessions/{session_id}/messages", response_model=List[MessageResponse])
def get_messages(
    session_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    messages = db.query(Message).filter(
        Message.session_id == session_id
    ).order_by(Message.created_at).all()
    return messages

@router.delete("/sessions/{session_id}")
def delete_session(
    session_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    db.delete(session)
    db.commit()
    return {"message": "Session deleted successfully"}
