# Contributing to LegalMind AI

Thank you for your interest in contributing to LegalMind AI! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/legalmind-ai.git
   cd legalmind-ai
   ```
3. **Set up the development environment:**
   ```bash
   setup.bat  # Windows
   ```
4. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Backend Development

1. **Make changes in `backend/` directory**
2. **Test your changes:**
   ```bash
   python test_api.py
   ```
3. **Check code style:**
   ```bash
   black app/
   flake8 app/
   ```
4. **Run the server:**
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Development

1. **Make changes in `frontend/` directory**
2. **Test locally:**
   ```bash
   npm run dev
   ```
3. **Check TypeScript:**
   ```bash
   npm run type-check
   ```
4. **Format code:**
   ```bash
   npm run format
   ```

## Code Style

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions small and focused
- Use meaningful variable names

```python
def calculate_similarity(embedding1: List[float], embedding2: List[float]) -> float:
    """
    Calculate cosine similarity between two embeddings.
    
    Args:
        embedding1: First embedding vector
        embedding2: Second embedding vector
        
    Returns:
        Similarity score between 0 and 1
    """
    # Implementation
    pass
```

### TypeScript (Frontend)
- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable
- Use meaningful prop names

```typescript
interface MessageProps {
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function Message({ content, role, timestamp }: MessageProps) {
  // Implementation
}
```

## Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(chat): add message export functionality
fix(auth): resolve token expiration issue
docs(readme): update installation instructions
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md**
5. **Create pull request** with clear description
6. **Link related issues**
7. **Request review** from maintainers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Updated integration tests

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

## Areas for Contribution

### High Priority
- [ ] Add automated tests
- [ ] Improve error handling
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add more document formats
- [ ] Performance optimization

### Medium Priority
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Export conversations
- [ ] Advanced search
- [ ] User preferences
- [ ] Dark mode

### Low Priority
- [ ] Social login
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Team features
- [ ] API for developers

## Bug Reports

When reporting bugs, include:

1. **Description:** Clear description of the bug
2. **Steps to reproduce:** Detailed steps
3. **Expected behavior:** What should happen
4. **Actual behavior:** What actually happens
5. **Screenshots:** If applicable
6. **Environment:**
   - OS: Windows/Mac/Linux
   - Browser: Chrome/Firefox/Safari
   - Version: Backend/Frontend version

## Feature Requests

When requesting features, include:

1. **Problem:** What problem does this solve?
2. **Solution:** Proposed solution
3. **Alternatives:** Other solutions considered
4. **Use case:** How would you use this?
5. **Priority:** How important is this?

## Code Review

All submissions require review. We use GitHub pull requests for this purpose.

### Review Criteria
- Code quality and style
- Test coverage
- Documentation
- Performance impact
- Security considerations
- Breaking changes

## Community

- Be respectful and inclusive
- Help others learn
- Share knowledge
- Give constructive feedback
- Follow code of conduct

## Questions?

- Open an issue for questions
- Check existing documentation
- Review closed issues/PRs
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to LegalMind AI! 🎉
