from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.database import get_db
from app.models import User, Document, Embedding
from app.auth import get_current_active_user
from app.ai_engine import ai_engine
import PyPDF2
import io

router = APIRouter(prefix="/api/documents", tags=["documents"])

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Upload and process a document"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Read PDF content
    content = await file.read()
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
    
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    
    # Create document
    document = Document(
        title=file.filename,
        content=text,
        uploaded_by=current_user.id
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    
    # Process and create embeddings (simplified)
    chunks = [text[i:i+1000] for i in range(0, len(text), 800)]
    
    for chunk in chunks[:10]:  # Limit to 10 chunks for demo
        embedding_vector = ai_engine.embed_text(chunk)
        embedding = Embedding(
            document_id=document.id,
            chunk_text=chunk,
            embedding=embedding_vector
        )
        db.add(embedding)
    
    db.commit()
    
    return {
        "id": document.id,
        "title": document.title,
        "status": "processed"
    }

@router.get("/")
def get_documents(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get user's documents"""
    documents = db.query(Document).filter(
        Document.uploaded_by == current_user.id
    ).all()
    return documents

@router.delete("/{document_id}")
def delete_document(
    document_id: UUID,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a document"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.uploaded_by == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    db.delete(document)
    db.commit()
    
    return {"message": "Document deleted successfully"}
