# 🚀 Universal Media Downloader

A fast, free, and open-source web application to download videos, playlists, and media from YouTube and 1000+ other platforms.

## ✨ Features

- 🎬 **Multi-Platform Support**: YouTube, Vimeo, Twitter, Facebook, Instagram, TikTok, and 1000+ sites
- 📦 **Playlist Downloads**: Download entire playlists and collections
- 🎵 **Audio Extraction**: Extract audio as MP3 from any video
- ⚡ **Fast & Free**: No limits, no registration, completely free
- 🌐 **Web-Based**: Works in any browser, no installation needed
- 🔓 **Open Source**: Free to use, modify, and distribute

## 🚀 Quick Start (3 Steps!)

### Windows Users:
1. Double-click `start.bat`
2. Open browser to `http://localhost:5000`
3. Paste any video URL and download!

### Mac/Linux Users:
```bash
chmod +x start.sh
./start.sh
```
Then open `http://localhost:5000` in your browser.

### Manual Setup:

1. **Install dependencies:**
```bash
pip install flask flask-cors yt-dlp
```

2. **Start the server:**
```bash
python server.py
```

3. **Open your browser:**
```
http://localhost:5000
```

4. **Download anything!** 🎉

### Test the Backend:
```bash
python test_backend.py
```

## 📖 Usage

1. **Paste URL**: Copy any video URL from supported platforms
2. **Choose Options**:
   - ✅ Audio Only: Extract MP3 audio
   - ✅ Playlist: Download entire playlist
3. **Click Download**: Video downloads automatically to `downloads/` folder!

### Complete Download Flow:
1. Backend fetches video information
2. Shows title, thumbnail, duration
3. Downloads video/audio using yt-dlp
4. Automatically triggers browser download
5. File saved to your Downloads folder

### What Happens Behind the Scenes:
- ✅ URL validation
- ✅ Backend connectivity check
- ✅ Video info extraction
- ✅ Download with progress tracking
- ✅ Automatic file serving
- ✅ Browser download trigger

### Supported Platforms

YouTube, YouTube Music, Vimeo, Twitter/X, Facebook, Instagram, TikTok, Twitch, Dailymotion, SoundCloud, Reddit, and 1000+ more sites supported by yt-dlp.

## 🛠️ Advanced Configuration

### Custom Output Directory

Edit `server.py`:
```python
DOWNLOAD_DIR = '/path/to/your/downloads'
```

### Quality Settings

Modify `ydl_opts` in `server.py`:
```python
'format': 'bestvideo[height<=1080]+bestaudio/best'  # Max 1080p
```

### Audio Quality

```python
'preferredquality': '320'  # 320kbps MP3
```

## 🌐 Deploy to Production

### Using Vercel (Frontend)
```bash
vercel deploy
```

### Using Heroku (Backend)
```bash
heroku create your-app-name
git push heroku main
```

### Using Docker
```bash
docker build -t media-downloader .
docker run -p 5000:5000 media-downloader
```

## 🤝 Contributing

Contributions are welcome! This project helps people access content offline.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 Legal Disclaimer

This tool is for personal use only. Users are responsible for complying with:
- Copyright laws in their jurisdiction
- Terms of service of content platforms
- Fair use policies

Only download content you have rights to or that is in the public domain.

## 🔧 Troubleshooting

### "Download failed" error
- Make sure Python backend is running
- Check if yt-dlp is up to date: `pip install -U yt-dlp`
- Some platforms may block downloads

### Rate limiting
- Use the Python backend instead of web-only mode
- Add delays between downloads

### FFmpeg not found (for audio conversion)
Install FFmpeg:
- **Windows**: Download from ffmpeg.org
- **Mac**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg`

## 📦 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python, Flask
- **Downloader**: yt-dlp (supports 1000+ sites)
- **APIs**: Cobalt Tools API (fallback)

## 🎯 Roadmap

- [ ] Batch download support
- [ ] Download queue management
- [ ] Format selection (720p, 1080p, 4K)
- [ ] Subtitle downloads
- [ ] Browser extension
- [ ] Mobile app

## 📄 License

MIT License - Free to use, modify, and distribute

## 🌟 Support

If this project helps you, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code

---

**Made with ❤️ for people without reliable internet access**
