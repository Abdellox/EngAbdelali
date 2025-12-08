# 🧪 Testing Guide

## Quick Test (Verify Everything Works)

### Step 1: Start the Backend
```bash
python server.py
```

Expected output:
```
🚀 Universal Media Downloader Backend
📡 Server running on http://localhost:5000
✅ Ready to download from 1000+ platforms!
```

### Step 2: Run Backend Tests
Open a new terminal:
```bash
python test_backend.py
```

This will test:
- ✅ Backend health check
- ✅ Video info fetching
- ✅ Download functionality

### Step 3: Test in Browser

1. Open `http://localhost:5000`
2. You should see: "✅ Backend connected - Full download support enabled!"
3. Paste a test URL (see below)
4. Click Download
5. Video should download automatically!

## Test URLs

### YouTube (Always Works)
```
https://www.youtube.com/watch?v=jNQXAC9IVRw
```
"Me at the zoo" - First YouTube video (44 seconds)

### Short Video Test
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Audio Test
1. Paste any YouTube URL
2. Check "Audio Only (MP3)"
3. Click Download
4. Should download as MP3

## Expected Behavior

### ✅ Successful Download Flow:

1. **Status: "🔍 Fetching video information..."**
   - Backend is getting video details

2. **Status: "📹 Found: [Video Title] - Starting download..."**
   - Video info retrieved successfully

3. **Shows video info:**
   - Thumbnail image
   - Video title
   - Uploader name
   - Duration

4. **Status: "✅ Download ready! Click below to save the file."**
   - Download completed

5. **Browser download starts automatically**
   - File saves to your Downloads folder

### ❌ Common Issues & Solutions

#### "Backend not running"
**Problem:** Frontend can't connect to backend
**Solution:** 
```bash
python server.py
```

#### "Download failed"
**Problem:** yt-dlp can't download the video
**Solutions:**
- Update yt-dlp: `pip install -U yt-dlp`
- Check if video is public
- Try a different URL

#### "Audio conversion failed"
**Problem:** FFmpeg not installed
**Solution:**
- Windows: Download from ffmpeg.org
- Mac: `brew install ffmpeg`
- Linux: `sudo apt install ffmpeg`

#### Port 5000 already in use
**Problem:** Another app is using port 5000
**Solution:** Edit `server.py`, change:
```python
app.run(debug=True, port=5001)  # Use different port
```

## Manual Testing Checklist

- [ ] Backend starts without errors
- [ ] Browser shows "Backend connected" message
- [ ] Can paste URL in input field
- [ ] Download button is clickable
- [ ] Video info displays correctly
- [ ] Download starts automatically
- [ ] File appears in Downloads folder
- [ ] Audio-only mode works
- [ ] Error messages are clear
- [ ] Mobile view works (resize browser)

## Performance Testing

### Test Download Speed
1. Download a 5-minute video
2. Check console for progress
3. Should complete in reasonable time

### Test Multiple Downloads
1. Download 3 videos in a row
2. Each should work independently
3. Files should have unique names

### Test Different Platforms
- [ ] YouTube
- [ ] TikTok (if accessible)
- [ ] Vimeo
- [ ] Twitter/X
- [ ] Instagram (if accessible)

## Debugging

### Enable Verbose Logging
Edit `server.py`:
```python
ydl_opts = {
    'quiet': False,  # Change to False
    'verbose': True,  # Add this line
}
```

### Check Downloaded Files
```bash
# Windows
dir downloads

# Mac/Linux
ls -lh downloads/
```

### View Backend Logs
All output appears in the terminal where you ran `python server.py`

### Browser Console
Press F12 in browser to see JavaScript logs

## Automated Testing

### Create test_all.py
```python
import subprocess
import time
import requests

# Start server
server = subprocess.Popen(['python', 'server.py'])
time.sleep(3)

# Run tests
subprocess.run(['python', 'test_backend.py'])

# Stop server
server.terminate()
```

## Success Criteria

✅ **Backend Test Passes**
✅ **Video info fetches in < 5 seconds**
✅ **Download completes successfully**
✅ **File exists in downloads/ folder**
✅ **Browser download triggers automatically**
✅ **No errors in console**

## Need Help?

If tests fail:
1. Check Python version: `python --version` (need 3.7+)
2. Check dependencies: `pip list | grep -E "flask|yt-dlp"`
3. Check firewall settings
4. Try a different browser
5. Check the QUICKSTART.md guide
