from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, chat, documents

app = FastAPI(
    title="LegalMind AI API",
    description="AI-powered legal assistant API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(documents.router)

@app.get("/")
def root():
    return {"message": "LegalMind AI API", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
