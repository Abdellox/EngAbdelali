# 🚀 Quick Start Guide

## Step 1: Install Dependencies

```bash
pip install flask flask-cors yt-dlp
```

## Step 2: Start the Server

```bash
python server.py
```

You should see:
```
🚀 Universal Media Downloader Backend
📡 Server running on http://localhost:5000
✅ Ready to download from 1000+ platforms!
```

## Step 3: Open the App

Open your browser and go to:
```
http://localhost:5000
```

## Step 4: Download Videos!

1. Paste any video URL (YouTube, TikTok, Instagram, etc.)
2. Choose options:
   - ✅ Audio Only - for MP3 extraction
   - ✅ Playlist - to download entire playlists
3. Click "Download"
4. File downloads automatically!

## Test URLs

Try these to test:
- YouTube: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Any public video from supported platforms

## Troubleshooting

### "Backend not running"
- Make sure you ran `python server.py`
- Check if port 5000 is available

### "Download failed"
- Update yt-dlp: `pip install -U yt-dlp`
- Check if the video is public and accessible
- Some platforms may have restrictions

### Audio conversion fails
- Install FFmpeg:
  - Windows: Download from ffmpeg.org
  - Mac: `brew install ffmpeg`
  - Linux: `sudo apt install ffmpeg`

## Files Location

Downloaded files are saved in the `downloads/` folder in your project directory.
