# LegalMind AI - AI System Specification

## Overview
A Retrieval-Augmented Generation (RAG) system for legal question answering with source citations, safety guardrails, and context-aware responses.

## Architecture

```
User Query
    ↓
Query Processing & Classification
    ↓
Embedding Generation
    ↓
Vector Search (pgvector)
    ↓
Context Retrieval
    ↓
Prompt Construction
    ↓
LLM Generation
    ↓
Response Post-Processing
    ↓
Citation Formatting
    ↓
Safety Check
    ↓
Response to User
```

## Components

### 1. Embedding Model
**Model**: sentence-transformers/all-MiniLM-L6-v2
**Dimensions**: 384
**Advantages**:
- Fast inference
- Good semantic understanding
- Multilingual support
- Free and open-source

**Alternative**: OpenAI text-embedding-3-small (1536 dims)

### 2. Vector Database
**Technology**: PostgreSQL with pgvector extension
**Index Type**: HNSW (Hierarchical Navigable Small World)
**Distance Metric**: Cosine similarity
**Configuration**:
```sql
CREATE EXTENSION vector;
CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops);
```

### 3. Document Processing Pipeline

#### Ingestion Flow
```
PDF/DOCX/TXT Upload
    ↓
Text Extraction (PyPDF2/python-docx)
    ↓
Cleaning & Normalization
    ↓
Chunking (RecursiveCharacterTextSplitter)
    ↓
Metadata Extraction
    ↓
Embedding Generation
    ↓
Storage in pgvector
```

#### Chunking Strategy
**Method**: RecursiveCharacterTextSplitter
**Parameters**:
- chunk_size: 1000 characters
- chunk_overlap: 200 characters
- separators: ["\n\n", "\n", ". ", " ", ""]

**Rationale**: Maintains semantic coherence while fitting in context windows

### 4. Retrieval Strategy

#### Hybrid Search
1. **Vector Search** (70% weight)
   - Semantic similarity using embeddings
   - Top-k: 10 chunks
   
2. **Keyword Search** (30% weight)
   - BM25 algorithm
   - Exact term matching
   
3. **Reranking**
   - Cross-encoder model
   - Final top-k: 5 chunks

#### Query Enhancement
- Query expansion with synonyms
- Spell correction
- Entity recognition
- Intent classification

### 5. LLM Configuration

#### Primary Model Options
1. **OpenAI GPT-4 Turbo**
   - Best accuracy
   - Cost: $0.01/1K tokens (input)
   
2. **Anthropic Claude 3 Sonnet**
   - Good balance
   - Cost: $0.003/1K tokens
   
3. **Local Llama 3 70B** (via Ollama)
   - Free
   - Requires GPU

#### Model Parameters
```python
{
    "temperature": 0.3,  # Low for consistency
    "max_tokens": 1000,
    "top_p": 0.9,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0
}
```

### 6. Prompt Engineering

#### System Prompt
```
You are LegalMind AI, an expert legal research assistant. Your role is to provide accurate, well-researched answers to legal questions based on the provided context.

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
- End with a disclaimer if appropriate
```

#### User Prompt Template
```
Context Documents:
{context}

User Question: {question}

Please provide a comprehensive answer based on the context above. Include citations and relevant details.
```

### 7. Safety & Compliance

#### Content Filters
1. **Input Validation**
   - Block offensive language
   - Detect prompt injection attempts
   - Limit query length (max 500 chars)

2. **Output Validation**
   - Check for hallucinations
   - Verify citations exist
   - Filter inappropriate content

3. **Prohibited Topics**
   - How to commit crimes
   - Evading law enforcement
   - Fraudulent activities
   - Harmful advice

#### Disclaimer System
Auto-append disclaimers for:
- Medical-legal questions
- Criminal law questions
- Immigration questions
- Tax law questions

**Example Disclaimer**:
"This information is for educational purposes only and does not constitute legal advice. Please consult with a qualified attorney for advice specific to your situation."

### 8. Context Management

#### Conversation History
- Store last 5 message pairs
- Summarize older context
- Max context window: 8K tokens

#### Context Pruning
- Remove redundant information
- Prioritize recent and relevant chunks
- Compress long documents

### 9. Citation System

#### Citation Format
```
[Source: Document Title, Section X, Page Y]
```

#### Citation Tracking
- Store document_id, chunk_id
- Enable click-through to source
- Highlight relevant passages

### 10. Performance Optimization

#### Caching Strategy
- Cache embeddings for common queries
- Cache LLM responses (24 hours)
- Redis for session management

#### Batch Processing
- Batch embedding generation
- Async document processing
- Queue system for uploads

#### Monitoring
- Track response times
- Monitor token usage
- Log error rates
- User satisfaction scores

## Implementation Pseudocode

### RAG Pipeline
```python
async def answer_question(question: str, user_id: str, session_id: str):
    # 1. Validate input
    if not validate_question(question):
        return error_response("Invalid question")
    
    # 2. Check safety
    if is_prohibited_topic(question):
        return safety_response()
    
    # 3. Generate query embedding
    query_embedding = embed_text(question)
    
    # 4. Retrieve relevant chunks
    chunks = vector_search(query_embedding, top_k=10)
    chunks = rerank_chunks(question, chunks, top_k=5)
    
    # 5. Build context
    context = format_context(chunks)
    
    # 6. Get conversation history
    history = get_conversation_history(session_id, limit=5)
    
    # 7. Construct prompt
    prompt = build_prompt(question, context, history)
    
    # 8. Call LLM
    response = await llm.generate(prompt)
    
    # 9. Post-process
    response = add_citations(response, chunks)
    response = add_disclaimer_if_needed(response, question)
    
    # 10. Save to database
    save_message(session_id, "user", question)
    save_message(session_id, "assistant", response)
    
    # 11. Return
    return {
        "answer": response,
        "sources": format_sources(chunks),
        "session_id": session_id
    }
```

### Document Ingestion
```python
async def ingest_document(file_path: str, metadata: dict):
    # 1. Extract text
    text = extract_text(file_path)
    
    # 2. Clean text
    text = clean_text(text)
    
    # 3. Chunk text
    chunks = chunk_text(text, chunk_size=1000, overlap=200)
    
    # 4. Generate embeddings
    embeddings = embed_texts(chunks)
    
    # 5. Store in database
    document_id = create_document(metadata)
    for chunk, embedding in zip(chunks, embeddings):
        store_embedding(document_id, chunk, embedding)
    
    return document_id
```

## Evaluation Metrics

### Quality Metrics
1. **Answer Relevance**: Human evaluation (1-5 scale)
2. **Citation Accuracy**: % of citations that are valid
3. **Factual Correctness**: Verified against source documents
4. **Response Time**: < 3 seconds target

### User Metrics
1. **Satisfaction Score**: Thumbs up/down ratio
2. **Follow-up Rate**: % of users asking clarifying questions
3. **Session Length**: Average questions per session
4. **Retention Rate**: % of users returning

## Continuous Improvement

### Feedback Loop
1. Collect user feedback (thumbs up/down)
2. Log problematic responses
3. Manual review of low-rated answers
4. Fine-tune prompts based on patterns
5. Update knowledge base regularly

### A/B Testing
- Test different prompt templates
- Compare LLM models
- Optimize retrieval parameters
- Test UI variations

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer (Nginx/AWS ALB)
- Database read replicas
- Distributed caching

### Cost Optimization
- Use cheaper models for simple queries
- Implement smart caching
- Batch API calls
- Monitor and optimize token usage

### Rate Limiting
- Free tier: 10 requests/day
- Pro tier: 1000 requests/day
- Enterprise: Custom limits
- Implement exponential backoff
