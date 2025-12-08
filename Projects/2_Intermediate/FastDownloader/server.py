#!/usr/bin/env python3
"""
Backend server for Universal Media Downloader
Provides powerful download capabilities using yt-dlp
"""

from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import yt_dlp
import os
import tempfile
import uuid
import time
from pathlib import Path

app = Flask(__name__, static_folder='.')
CORS(app)

# Use a dedicated downloads directory
DOWNLOAD_DIR = os.path.join(os.getcwd(), 'downloads')
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# Serve static files
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/info', methods=['POST'])
def get_info():
    """Get video information without downloading"""
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    
    print(f"📋 Fetching info for: {url}")
    
    try:
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'skip_download': True
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            result = {
                'success': True,
                'title': info.get('title', 'Unknown'),
                'duration': info.get('duration', 0),
                'thumbnail': info.get('thumbnail'),
                'uploader': info.get('uploader'),
                'view_count': info.get('view_count'),
                'formats': len(info.get('formats', []))
            }
            
            print(f"✅ Info fetched: {result['title']}")
            return jsonify(result)
            
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error fetching info: {error_msg}")
        return jsonify({'error': error_msg}), 500

@app.route('/api/download', methods=['POST'])
def download():
    """Download video or audio"""
    data = request.json
    url = data.get('url')
    audio_only = data.get('audioOnly', False)
    playlist = data.get('playlist', False)
    
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    
    print(f"⬇️  Starting download: {url}")
    print(f"   Audio only: {audio_only}, Playlist: {playlist}")
    
    try:
        # Generate unique filename
        unique_id = str(uuid.uuid4())[:8]
        timestamp = int(time.time())
        base_filename = f"download_{timestamp}_{unique_id}"
        
        ydl_opts = {
            'format': 'bestaudio/best' if audio_only else 'best[ext=mp4]/best',
            'outtmpl': os.path.join(DOWNLOAD_DIR, base_filename + '.%(ext)s'),
            'quiet': False,
            'no_warnings': False,
            'noplaylist': not playlist,
            'progress_hooks': [download_progress_hook],
        }
        
        # Audio conversion settings
        if audio_only:
            ydl_opts['postprocessors'] = [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }]
            ydl_opts['keepvideo'] = False
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get('title', 'download')
            
            # Determine the actual file extension
            if audio_only:
                ext = 'mp3'
            else:
                ext = info.get('ext', 'mp4')
            
            # Find the downloaded file
            final_filename = f"{base_filename}.{ext}"
            final_path = os.path.join(DOWNLOAD_DIR, final_filename)
            
            # Check if file exists
            if not os.path.exists(final_path):
                # Try to find the file with any extension
                for file in os.listdir(DOWNLOAD_DIR):
                    if file.startswith(base_filename):
                        final_filename = file
                        final_path = os.path.join(DOWNLOAD_DIR, file)
                        break
            
            if os.path.exists(final_path):
                file_size = os.path.getsize(final_path)
                print(f"✅ Download complete: {title}")
                print(f"   File: {final_filename} ({file_size} bytes)")
                
                return jsonify({
                    'success': True,
                    'filename': final_filename,
                    'title': title,
                    'ext': ext,
                    'size': file_size,
                    'download_url': f'/api/file/{final_filename}'
                })
            else:
                print(f"❌ File not found after download: {final_path}")
                return jsonify({'error': 'Download completed but file not found'}), 500
                
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Download error: {error_msg}")
        return jsonify({'error': error_msg}), 500

def download_progress_hook(d):
    """Progress hook for yt-dlp"""
    if d['status'] == 'downloading':
        percent = d.get('_percent_str', 'N/A')
        speed = d.get('_speed_str', 'N/A')
        print(f"   Progress: {percent} at {speed}", end='\r')
    elif d['status'] == 'finished':
        print(f"\n   ✓ Download finished, processing...")

@app.route('/api/file/<filename>')
def serve_file(filename):
    """Serve downloaded file"""
    filepath = os.path.join(DOWNLOAD_DIR, filename)
    
    if os.path.exists(filepath):
        print(f"📤 Serving file: {filename}")
        return send_file(
            filepath, 
            as_attachment=True,
            download_name=filename,
            mimetype='application/octet-stream'
        )
    
    print(f"❌ File not found: {filename}")
    return jsonify({'error': 'File not found'}), 404

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok', 
        'backend': 'yt-dlp',
        'download_dir': DOWNLOAD_DIR,
        'files_count': len(os.listdir(DOWNLOAD_DIR))
    })

@app.route('/api/cleanup', methods=['POST'])
def cleanup():
    """Clean up old downloaded files"""
    try:
        count = 0
        for file in os.listdir(DOWNLOAD_DIR):
            filepath = os.path.join(DOWNLOAD_DIR, file)
            if os.path.isfile(filepath):
                os.remove(filepath)
                count += 1
        
        print(f"🧹 Cleaned up {count} files")
        return jsonify({'success': True, 'files_removed': count})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Universal Media Downloader Backend")
    print("=" * 60)
    print(f"📡 Server running on http://localhost:5000")
    print(f"📁 Downloads directory: {DOWNLOAD_DIR}")
    print(f"✅ Ready to download from 1000+ platforms!")
    print("=" * 60)
    
    app.run(debug=True, port=5000, host='0.0.0.0')
