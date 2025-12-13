"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2024-12-03

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from pgvector.sqlalchemy import Vector

# revision identifiers
revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Enable pgvector extension
    op.execute('CREATE EXTENSION IF NOT EXISTS vector')
    
    # Users table
    op.create_table(
        'users',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('email', sa.String(), nullable=False, unique=True),
        sa.Column('password_hash', sa.String(), nullable=False),
        sa.Column('full_name', sa.String()),
        sa.Column('role', sa.String(), default='user'),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now())
    )
    op.create_index('ix_users_email', 'users', ['email'])
    
    # Sessions table
    op.create_table(
        'sessions',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.id')),
        sa.Column('title', sa.String(), default='New Conversation'),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now())
    )
    
    # Messages table
    op.create_table(
        'messages',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('session_id', UUID(as_uuid=True), sa.ForeignKey('sessions.id', ondelete='CASCADE')),
        sa.Column('role', sa.String(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('metadata', sa.JSON()),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now())
    )
    
    # Documents table
    op.create_table(
        'documents',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('content', sa.Text()),
        sa.Column('source_url', sa.String()),
        sa.Column('category', sa.String()),
        sa.Column('uploaded_by', UUID(as_uuid=True), sa.ForeignKey('users.id')),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now())
    )
    
    # Embeddings table
    op.create_table(
        'embeddings',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('document_id', UUID(as_uuid=True), sa.ForeignKey('documents.id', ondelete='CASCADE')),
        sa.Column('chunk_text', sa.Text(), nullable=False),
        sa.Column('embedding', Vector(384)),
        sa.Column('metadata', sa.JSON()),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now())
    )
    
    # Create vector index
    op.execute('CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops)')
    
    # Feedback table
    op.create_table(
        'feedback',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('message_id', UUID(as_uuid=True), sa.ForeignKey('messages.id')),
        sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.id')),
        sa.Column('rating', sa.Integer()),
        sa.Column('comment', sa.Text()),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now())
    )

def downgrade():
    op.drop_table('feedback')
    op.drop_table('embeddings')
    op.drop_table('documents')
    op.drop_table('messages')
    op.drop_table('sessions')
    op.drop_table('users')
    op.execute('DROP EXTENSION IF EXISTS vector')
