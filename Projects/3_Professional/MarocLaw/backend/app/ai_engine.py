from typing import List, Dict
from sentence_transformers import SentenceTransformer
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.config import settings
from app.models import Embedding, Document
import numpy as np

class AIEngine:
    def __init__(self):
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.llm = ChatOpenAI(
            model="gpt-4-turbo-preview",
            temperature=0.3,
            max_tokens=1000,
            openai_api_key=settings.OPENAI_API_KEY
        )
        
        self.system_prompt = """You are LegalMind AI, an expert legal research assistant. Your role is to provide accurate, well-researched answers to legal questions based on the provided context.

CRITICAL RULES:
1. Only answer based on the provided context documents
2. Always cite your sources using [Source: Document Title]
3. If the context doesn't contain enough information, say so clearly
4. Never provide personal legal advice - only general legal information
5. Recommend consulting a licensed attorney for specific legal matters
6. Use clear, accessible language while maintaining accuracy
7. Structure responses with headings and bullet points for readability
8. If asked about illegal activities, politely decline and explain why

RESPONSE FORMAT:
- Start with a direct answer
- Provide detailed explanation with context
- Include relevant citations
- End with a disclaimer if appropriate"""
    
    def embed_text(self, text: str) -> List[float]:
        """Generate embedding for text"""
        embedding = self.embedding_model.encode(text)
        return embedding.tolist()
    
    def vector_search(self, db: Session, query_embedding: List[float], top_k: int = 5) -> List[Dict]:
        """Search for similar chunks using pgvector"""
        query_str = text("""
            SELECT e.chunk_text, e.metadata, d.title, d.source_url,
                   1 - (e.embedding <=> :query_embedding) as similarity
            FROM embeddings e
            JOIN documents d ON e.document_id = d.id
            ORDER BY e.embedding <=> :query_embedding
            LIMIT :top_k
        """)
        
        result = db.execute(
            query_str,
            {"query_embedding": str(query_embedding), "top_k": top_k}
        )
        
        chunks = []
        for row in result:
            chunks.append({
                "text": row.chunk_text,
                "metadata": row.metadata,
                "title": row.title,
                "source_url": row.source_url,
                "similarity": row.similarity
            })
        return chunks
    
    def format_context(self, chunks: List[Dict]) -> str:
        """Format retrieved chunks into context"""
        context_parts = []
        for i, chunk in enumerate(chunks, 1):
            context_parts.append(f"[Document {i}: {chunk['title']}]\n{chunk['text']}\n")
        return "\n".join(context_parts)
    
    def format_sources(self, chunks: List[Dict]) -> List[Dict]:
        """Format sources for response"""
        sources = []
        seen_titles = set()
        for chunk in chunks:
            if chunk['title'] not in seen_titles:
                sources.append({
                    "title": chunk['title'],
                    "url": chunk['source_url'],
                    "similarity": chunk['similarity']
                })
                seen_titles.add(chunk['title'])
        return sources
    
    def is_prohibited_topic(self, question: str) -> bool:
        """Check if question is about prohibited topics"""
        prohibited_keywords = [
            "how to commit", "evade law", "illegal", "fraud", "fake documents"
        ]
        question_lower = question.lower()
        return any(keyword in question_lower for keyword in prohibited_keywords)
    
    def add_disclaimer(self, response: str, question: str) -> str:
        """Add disclaimer if needed"""
        disclaimer_keywords = ["medical", "criminal", "immigration", "tax"]
        if any(keyword in question.lower() for keyword in disclaimer_keywords):
            disclaimer = "\n\n---\n**Disclaimer**: This information is for educational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation."
            return response + disclaimer
        return response
    
    async def answer_question(
        self, 
        question: str, 
        db: Session,
        conversation_history: List[Dict] = None
    ) -> Dict:
        """Main RAG pipeline"""
        
        # Safety check
        if self.is_prohibited_topic(question):
            return {
                "answer": "I cannot provide assistance with illegal activities or help evade the law. If you have legitimate legal questions, I'm happy to help with general legal information.",
                "sources": [],
                "error": "prohibited_topic"
            }
        
        # Generate embedding
        query_embedding = self.embed_text(question)
        
        # Retrieve relevant chunks
        chunks = self.vector_search(db, query_embedding, top_k=5)
        
        if not chunks:
            return {
                "answer": "I don't have enough information in my knowledge base to answer this question accurately. Please consult with a licensed attorney for specific legal advice.",
                "sources": []
            }
        
        # Format context
        context = self.format_context(chunks)
        
        # Build prompt
        prompt = ChatPromptTemplate.from_messages([
            ("system", self.system_prompt),
            ("user", f"Context Documents:\n{context}\n\nUser Question: {question}\n\nPlease provide a comprehensive answer based on the context above.")
        ])
        
        # Generate response
        chain = prompt | self.llm
        response = await chain.ainvoke({})
        answer = response.content
        
        # Add disclaimer if needed
        answer = self.add_disclaimer(answer, question)
        
        # Format sources
        sources = self.format_sources(chunks)
        
        return {
            "answer": answer,
            "sources": sources
        }

ai_engine = AIEngine()
