// Backend API Configuration
const BACKEND_URL = 'http://localhost:5000';
let backendAvailable = false;

const downloadBtn = document.getElementById('downloadBtn');
const urlInput = document.getElementById('urlInput');
const statusDiv = document.getElementById('status');
const resultsDiv = document.getElementById('results');
const audioOnlyCheckbox = document.getElementById('audioOnly');
const playlistCheckbox = document.getElementById('playlist');

// Check backend availability on load
window.addEventListener('load', async () => {
    backendAvailable = await checkBackend();
    if (backendAvailable) {
        showStatus('✅ Backend connected - Full download support enabled!', 'success');
    } else {
        showStatus('⚠️ Backend not running - Start server.py for full functionality', 'info');
    }
});

async function checkBackend() {
    try {
        const response = await fetch(`${BACKEND_URL}/health`, { 
            method: 'GET',
            signal: AbortSignal.timeout(3000)
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

downloadBtn.addEventListener('click', handleDownload);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleDownload();
});

async function handleDownload() {
    const url = urlInput.value.trim();
    
    if (!url) {
        showStatus('❌ Please enter a valid URL', 'error');
        return;
    }

    if (!isValidUrl(url)) {
        showStatus('❌ Invalid URL format', 'error');
        return;
    }

    // Check backend again
    backendAvailable = await checkBackend();
    
    if (!backendAvailable) {
        showStatus('❌ Backend server not running! Start server.py first.', 'error');
        displayBackendInstructions();
        return;
    }

    setLoading(true);
    showStatus('🔍 Fetching video information...', 'info');
    resultsDiv.innerHTML = '';

    try {
        // Step 1: Get video info
        const info = await getVideoInfo(url);
        
        if (!info.success) {
            throw new Error(info.error || 'Failed to fetch video info');
        }

        showStatus(`📹 Found: ${info.title} - Starting download...`, 'info');
        
        // Step 2: Download the video
        const downloadResult = await downloadVideo(url);
        
        if (!downloadResult.success) {
            throw new Error(downloadResult.error || 'Download failed');
        }

        // Step 3: Display success and download link
        displayDownloadSuccess(downloadResult, info);
        showStatus('✅ Download ready! Click below to save the file.', 'success');
        
        // Auto-trigger download
        setTimeout(() => {
            triggerDownload(downloadResult.download_url, downloadResult.title);
        }, 500);
        
    } catch (error) {
        console.error('Download error:', error);
        showStatus(`❌ Error: ${error.message}`, 'error');
        displayErrorInfo(error.message);
    } finally {
        setLoading(false);
    }
}

async function getVideoInfo(url) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.error };
        }

        const data = await response.json();
        return { success: true, ...data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function downloadVideo(url) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url,
                audioOnly: audioOnlyCheckbox.checked,
                playlist: playlistCheckbox.checked
            })
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.error };
        }

        const data = await response.json();
        return { 
            success: true, 
            ...data,
            download_url: `${BACKEND_URL}${data.download_url}`
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function displayDownloadSuccess(result, info) {
    const fileType = audioOnlyCheckbox.checked ? 'Audio (MP3)' : 'Video';
    const fileSize = result.size ? `(${formatBytes(result.size)})` : '';
    
    const html = `
        <div class="video-info">
            <h3>✅ Download Complete!</h3>
            ${info.thumbnail ? `<img src="${info.thumbnail}" alt="Thumbnail">` : ''}
            <p><strong>Title:</strong> ${result.title || info.title}</p>
            <p><strong>Type:</strong> ${fileType} ${fileSize}</p>
            ${info.uploader ? `<p><strong>Uploader:</strong> ${info.uploader}</p>` : ''}
            ${info.duration ? `<p><strong>Duration:</strong> ${formatDuration(info.duration)}</p>` : ''}
            <div class="download-links">
                <a href="${result.download_url}" class="download-link" download="${result.title}">
                    📥 Download ${fileType}
                </a>
            </div>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                💡 Download should start automatically. If not, click the button above.
            </p>
        </div>
    `;
    resultsDiv.innerHTML = html;
}

function displayBackendInstructions() {
    const html = `
        <div class="video-info">
            <h3>🔧 Backend Server Required</h3>
            <p>To download videos, you need to start the Python backend:</p>
            <ol style="margin: 15px 0; padding-left: 20px; line-height: 1.8;">
                <li>Install dependencies: <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">pip install -r requirements.txt</code></li>
                <li>Start server: <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">python server.py</code></li>
                <li>Refresh this page</li>
            </ol>
            <p style="margin-top: 10px; color: #666;">The backend uses yt-dlp to download from 1000+ platforms.</p>
        </div>
    `;
    resultsDiv.innerHTML = html;
}

function displayErrorInfo(errorMessage) {
    const html = `
        <div class="video-info">
            <h3>❌ Download Failed</h3>
            <p><strong>Error:</strong> ${errorMessage}</p>
            <p style="margin-top: 15px;"><strong>Common solutions:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.8;">
                <li>Make sure the URL is correct and accessible</li>
                <li>Check if the video is public (not private/deleted)</li>
                <li>Update yt-dlp: <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">pip install -U yt-dlp</code></li>
                <li>Some platforms may block downloads temporarily</li>
            </ul>
        </div>
    `;
    resultsDiv.innerHTML = html;
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
}

function setLoading(loading) {
    downloadBtn.disabled = loading;
    urlInput.disabled = loading;
    const btnText = downloadBtn.querySelector('.btn-text');
    const btnLoader = downloadBtn.querySelector('.btn-loader');
    
    if (loading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}
