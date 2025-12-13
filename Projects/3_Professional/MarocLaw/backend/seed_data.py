"""
Seed script to populate the database with sample legal documents
Run with: python seed_data.py
"""
from app.database import SessionLocal
from app.models import Document, Embedding, User
from app.ai_engine import ai_engine
from app.auth import get_password_hash
import uuid

def seed_database():
    db = SessionLocal()
    
    # Create admin user
    admin = User(
        email="admin@legalmind.ai",
        password_hash=get_password_hash("admin123"),
        full_name="Admin User",
        role="admin"
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    
    # Sample legal documents
    sample_docs = [
        {
            "title": "Introduction to Contract Law",
            "content": """A contract is a legally binding agreement between two or more parties. 
            For a contract to be valid, it must have: 1) Offer - a clear proposal made by one party, 
            2) Acceptance - agreement to the terms by the other party, 3) Consideration - something of 
            value exchanged between parties, 4) Intention to create legal relations, and 5) Capacity - 
            parties must be legally able to enter into a contract. Contracts can be written, oral, or 
            implied by conduct. Written contracts are generally preferred as they provide clear evidence 
            of the terms agreed upon.""",
            "category": "Contract Law"
        },
        {
            "title": "Employment Law Basics",
            "content": """Employment law governs the relationship between employers and employees. 
            Key areas include: hiring practices, wages and hours, workplace safety, discrimination and 
            harassment, termination, and benefits. The Fair Labor Standards Act (FLSA) establishes 
            minimum wage, overtime pay, and child labor standards. Title VII of the Civil Rights Act 
            prohibits employment discrimination based on race, color, religion, sex, or national origin. 
            The Americans with Disabilities Act (ADA) requires employers to provide reasonable 
            accommodations for qualified individuals with disabilities.""",
            "category": "Employment Law"
        },
        {
            "title": "Intellectual Property Overview",
            "content": """Intellectual property (IP) refers to creations of the mind, including inventions, 
            literary and artistic works, designs, symbols, names, and images. The main types of IP are: 
            1) Patents - protect inventions and improvements to existing inventions, 2) Trademarks - 
            protect brand names, logos, and slogans, 3) Copyrights - protect original works of authorship 
            including books, music, and software, 4) Trade Secrets - protect confidential business 
            information. IP rights give creators exclusive rights to use their creations for a certain 
            period of time.""",
            "category": "Intellectual Property"
        }
    ]
    
    print("Creating sample documents...")
    for doc_data in sample_docs:
        document = Document(
            title=doc_data["title"],
            content=doc_data["content"],
            category=doc_data["category"],
            uploaded_by=admin.id
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        
        # Create embeddings
        chunks = [doc_data["content"][i:i+500] for i in range(0, len(doc_data["content"]), 400)]
        
        for chunk in chunks:
            embedding_vector = ai_engine.embed_text(chunk)
            embedding = Embedding(
                document_id=document.id,
                chunk_text=chunk,
                embedding=embedding_vector,
                metadata={"category": doc_data["category"]}
            )
            db.add(embedding)
        
        db.commit()
        print(f"✓ Created document: {doc_data['title']}")
    
    print("\n✓ Database seeded successfully!")
    print(f"Admin user created: admin@legalmind.ai / admin123")
    db.close()

if __name__ == "__main__":
    seed_database()
