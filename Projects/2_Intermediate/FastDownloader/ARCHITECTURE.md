# 🏗️ System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              index.html (Frontend UI)                  │ │
│  │  • URL input field                                     │ │
│  │  • Download button                                     │ │
│  │  • Status display                                      │ │
│  │  • Results area                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↕                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              app.js (Frontend Logic)                   │ │
│  │  • Backend connectivity check                          │ │
│  │  • API calls (fetch)                                   │ │
│  │  • UI updates                                          │ │
│  │  • Auto-download trigger                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/JSON
┌─────────────────────────────────────────────────────────────┐
│                    PYTHON BACKEND SERVER                     │
│                      (Flask + yt-dlp)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   API Endpoints                        │ │
│  │  • GET  /health          - Health check                │ │
│  │  • POST /api/info        - Get video info              │ │
│  │  • POST /api/download    - Download video              │ │
│  │  • GET  /api/file/<name> - Serve downloaded file       │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↕                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   yt-dlp Library                       │ │
│  │  • Extract video info                                  │ │
│  │  • Download from 1000+ platforms                       │ │
│  │  • Convert audio (with FFmpeg)                         │ │
│  │  • Handle playlists                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↕                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                 downloads/ Folder                      │ │
│  │  • Stores downloaded files                             │ │
│  │  • Unique filenames (timestamp + UUID)                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL PLATFORMS                        │
│  • YouTube      • TikTok       • Instagram                   │
│  • Twitter/X    • Facebook     • Vimeo                       │
│  • And 1000+ more platforms...                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Initiates Download

```
User enters URL → Click Download
         ↓
Frontend validates URL
         ↓
Check if backend is running
```

### 2. Fetch Video Information

```
Frontend → POST /api/info
         ↓
Backend → yt-dlp.extract_info(download=False)
         ↓
yt-dlp → Fetch metadata from platform
         ↓
Backend ← Video info (title, thumbnail, duration)
         ↓
Frontend ← JSON response
         ↓
Display video info to user
```

### 3. Download Video

```
Frontend → POST /api/download
         ↓
Backend → yt-dlp.extract_info(download=True)
         ↓
yt-dlp → Download video from platform
         ↓
Save to downloads/ folder
         ↓
Backend ← File path and metadata
         ↓
Frontend ← JSON with download URL
         ↓
Auto-trigger browser download
         ↓
User's Downloads folder ← File saved!
```

## Component Details

### Frontend (index.html + app.js + style.css)

**Responsibilities:**
- User interface
- Input validation
- Backend communication
- Status updates
- Auto-download triggering

**Key Functions:**
- `checkBackend()` - Verify server is running
- `handleDownload()` - Main download orchestration
- `getVideoInfo()` - Fetch video metadata
- `downloadVideo()` - Initiate download
- `triggerDownload()` - Auto-start browser download

### Backend (server.py)

**Responsibilities:**
- API endpoints
- yt-dlp integration
- File management
- Error handling
- CORS handling

**Key Endpoints:**
- `/health` - Health check
- `/api/info` - Get video info without downloading
- `/api/download` - Download video/audio
- `/api/file/<filename>` - Serve downloaded file

**Key Functions:**
- `get_info()` - Extract video metadata
- `download()` - Download and process video
- `serve_file()` - Send file to browser
- `download_progress_hook()` - Track progress

### yt-dlp Integration

**Features Used:**
- Video info extraction
- Multi-platform support
- Format selection
- Audio extraction (with FFmpeg)
- Playlist handling
- Progress hooks

**Configuration:**
```python
ydl_opts = {
    'format': 'best',              # Quality selection
    'outtmpl': 'path/file.%(ext)s', # Output template
    'quiet': False,                 # Logging
    'noplaylist': True,             # Single video
    'postprocessors': [...]         # Audio conversion
}
```

## File Structure

```
universal-media-downloader/
├── index.html          # Main UI
├── app.js              # Frontend logic
├── style.css           # Styling
├── server.py           # Backend API
├── requirements.txt    # Python dependencies
├── downloads/          # Downloaded files (created automatically)
├── start.bat           # Windows launcher
├── start.sh            # Mac/Linux launcher
├── test_backend.py     # Backend tests
├── README.md           # Documentation
├── QUICKSTART.md       # Quick start guide
├── TESTING.md          # Testing guide
├── FEATURES.md         # Feature list
└── ARCHITECTURE.md     # This file
```

## Technology Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (gradients, animations)
- **Vanilla JavaScript** - Logic (no frameworks)
- **Fetch API** - HTTP requests

### Backend
- **Python 3.7+** - Runtime
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin support
- **yt-dlp** - Download engine
- **FFmpeg** - Audio conversion (optional)

### External
- **yt-dlp** - Supports 1000+ platforms
- **FFmpeg** - Audio/video processing

## Security Considerations

### Input Validation
- URL format validation
- Sanitized filenames
- Path traversal prevention

### CORS
- Enabled for localhost development
- Configure for production deployment

### File Management
- Unique filenames (UUID + timestamp)
- Automatic cleanup option
- Size limits (configurable)

### Error Handling
- Try-catch blocks
- User-friendly error messages
- Backend logging

## Scalability

### Current Design
- Single-threaded Flask server
- Synchronous downloads
- Local file storage

### Production Improvements
- Use Gunicorn/uWSGI for production
- Add Redis queue for async downloads
- Implement rate limiting
- Add user sessions
- Cloud storage integration
- CDN for file serving

## Performance

### Optimization Strategies
- Efficient file streaming
- Progress tracking
- Minimal memory usage
- Fast info extraction

### Bottlenecks
- Download speed (limited by source)
- Disk I/O
- Network bandwidth

## Deployment Options

### Local (Current)
```bash
python server.py
```

### Production
- **Heroku** - Easy deployment
- **AWS EC2** - Full control
- **Docker** - Containerized
- **Vercel** - Frontend only

## Future Enhancements

- [ ] Queue system for multiple downloads
- [ ] User accounts and history
- [ ] Download scheduling
- [ ] Format/quality selection
- [ ] Subtitle downloads
- [ ] Batch URL processing
- [ ] Browser extension
- [ ] Mobile app
- [ ] WebSocket for real-time progress
- [ ] Cloud storage integration
