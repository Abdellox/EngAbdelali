const express = require('express');
const cors = require('cors');
const { Innertube } = require('youtubei.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize YouTube client
let youtube = null;

async function getYouTubeClient() {
    if (!youtube) {
        youtube = await Innertube.create();
    }
    return youtube;
}

// Get transcript endpoint
app.get('/api/transcript/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const { lang } = req.query;

        console.log(`\n=== Fetching transcript for video: ${videoId} ===`);
        console.log(`Language: ${lang || 'en'}`);

        const yt = await getYouTubeClient();
        const info = await yt.getInfo(videoId);

        // Get transcript
        const transcriptData = await info.getTranscript();
        
        if (!transcriptData || !transcriptData.transcript) {
            throw new Error('No captions available for this video');
        }

        const transcript = transcriptData.transcript;
        console.log(`Found transcript with ${transcript.content.body.initial_segments.length} segments`);

        // Format transcript
        const formattedTranscript = transcript.content.body.initial_segments.map(segment => {
            const startMs = parseInt(segment.start_ms);
            const startSeconds = startMs / 1000;
            
            return {
                time: formatTime(startSeconds),
                seconds: startSeconds,
                text: segment.snippet.text
            };
        });

        console.log(`✅ Successfully formatted ${formattedTranscript.length} transcript items\n`);

        res.json({
            success: true,
            transcript: formattedTranscript,
            count: formattedTranscript.length
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(400).json({
            success: false,
            error: error.message || 'Failed to fetch transcript. Video may not have captions.'
        });
    }
});

// Helper function to format time
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📝 Open http://localhost:${PORT} in your browser\n`);
});
