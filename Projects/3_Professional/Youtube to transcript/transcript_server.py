from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound
import re

app = Flask(__name__, static_folder='.')
CORS(app)

def format_time(seconds):
    """Format seconds to MM:SS or HH:MM:SS"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    
    if hours > 0:
        return f"{hours}:{minutes:02d}:{secs:02d}"
    return f"{minutes}:{secs:02d}"

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/transcript/<video_id>')
def get_transcript(video_id):
    try:
        print(f"\n=== Fetching transcript for: {video_id} ===")
        
        # Get transcript - will automatically get the first available language
        api = YouTubeTranscriptApi()
        transcript_data = api.fetch(video_id)
        
        print(f"✅ Got {len(transcript_data)} transcript segments")
        
        # Format transcript
        formatted_transcript = []
        for item in transcript_data:
            formatted_transcript.append({
                'time': format_time(item.start),
                'seconds': item.start,
                'text': item.text.strip()
            })
        
        print(f"✅ Successfully formatted transcript\n")
        
        return jsonify({
            'success': True,
            'transcript': formatted_transcript,
            'count': len(formatted_transcript)
        })
        
    except TranscriptsDisabled:
        print("❌ Transcripts are disabled for this video")
        return jsonify({
            'success': False,
            'error': 'Subtitles are disabled for this video. Please try another video with captions enabled.'
        }), 400
        
    except NoTranscriptFound:
        print("❌ No transcript found")
        return jsonify({
            'success': False,
            'error': 'No transcript found for this video. Please try another video.'
        }), 400
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Failed to fetch transcript: {str(e)}'
        }), 400

if __name__ == '__main__':
    print("\n🚀 Server running at http://localhost:3000")
    print("📝 Open http://localhost:3000 in your browser\n")
    app.run(port=3000, debug=True)
