// Global variables
let recognition = null;
let isRecording = false;
let finalTranscript = '';
let audioContext = null;
let analyser = null;
let microphone = null;
let animationId = null;
let mediaStream = null;

// DOM Elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const textArea = document.getElementById('textArea');
const status = document.getElementById('status');
const languageSelect = document.getElementById('languageSelect');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const visualizerContainer = document.getElementById('visualizerContainer');

// Initialize on page load
window.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        status.textContent = '❌ Speech recognition not supported in this browser. Please use Chrome, Edge, Brave, or Safari.';
        status.style.background = '#fee2e2';
        status.style.color = '#991b1b';
        startBtn.disabled = true;
        return;
    }
    
    // Initialize Speech Recognition
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('App initialized successfully');
}

function setupEventListeners() {
    // Language change
    languageSelect.addEventListener('change', () => {
        if (recognition) {
            recognition.lang = languageSelect.value;
        }
    });
    
    // Start Recording
    startBtn.addEventListener('click', startRecording);
    
    // Stop Recording
    stopBtn.addEventListener('click', stopRecording);
    
    // Speech Recognition Events
    recognition.onstart = () => {
        console.log('Speech recognition started');
        status.textContent = '🎙️ Recording... Speak now!';
        status.classList.add('recording');
    };
    
    recognition.onresult = handleSpeechResult;
    recognition.onerror = handleSpeechError;
    recognition.onend = handleSpeechEnd;
    
    // Copy Text
    copyBtn.addEventListener('click', copyText);
    
    // Download Text
    downloadBtn.addEventListener('click', downloadText);
    
    // Clear Text
    clearBtn.addEventListener('click', clearText);
    
    // Allow manual editing
    textArea.addEventListener('input', () => {
        finalTranscript = textArea.value;
    });
}

async function startRecording() {
    try {
        console.log('Starting recording...');
        
        // Request microphone permission first
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted');
        
        // Start speech recognition
        recognition.start();
        
        // Update UI
        isRecording = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        visualizerContainer.classList.add('active');
        
        // Start audio visualization
        startAudioVisualization(mediaStream);
        
    } catch (error) {
        console.error('Error starting recording:', error);
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            status.textContent = '❌ Microphone access denied. Please allow microphone access and try again.';
            status.style.background = '#fee2e2';
            status.style.color = '#991b1b';
        } else if (error.name === 'NotFoundError') {
            status.textContent = '❌ No microphone found. Please connect a microphone.';
            status.style.background = '#fee2e2';
            status.style.color = '#991b1b';
        } else {
            status.textContent = '❌ Error: ' + error.message;
            status.style.background = '#fee2e2';
            status.style.color = '#991b1b';
        }
        
        // Reset UI
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

function stopRecording() {
    console.log('Stopping recording...');
    
    try {
        // Stop speech recognition
        if (recognition) {
            recognition.stop();
        }
        
        // Update state
        isRecording = false;
        
        // Update UI
        startBtn.disabled = false;
        stopBtn.disabled = true;
        status.textContent = 'Recording stopped';
        status.style.background = '#f3f4f6';
        status.style.color = '#374151';
        status.classList.remove('recording');
        visualizerContainer.classList.remove('active');
        
        // Stop audio visualization
        stopAudioVisualization();
        
    } catch (error) {
        console.error('Error stopping recording:', error);
    }
}

function handleSpeechResult(event) {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
        } else {
            interimTranscript += transcript;
        }
    }
    
    textArea.value = finalTranscript + interimTranscript;
    textArea.scrollTop = textArea.scrollHeight;
}

function handleSpeechError(event) {
    console.error('Speech recognition error:', event.error);
    
    let errorMessage = '';
    
    switch(event.error) {
        case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            // Don't stop recording, just notify
            setTimeout(() => {
                if (isRecording) {
                    status.textContent = '🎙️ Recording... Speak now!';
                }
            }, 2000);
            break;
        case 'audio-capture':
            errorMessage = '❌ No microphone found or microphone error.';
            stopRecording();
            break;
        case 'not-allowed':
            errorMessage = '❌ Microphone access denied. Please allow microphone access.';
            stopRecording();
            break;
        case 'network':
            errorMessage = '❌ Network error. Please check your connection.';
            break;
        case 'aborted':
            errorMessage = 'Recording aborted.';
            break;
        default:
            errorMessage = `Error: ${event.error}`;
    }
    
    status.textContent = errorMessage;
    
    if (event.error !== 'no-speech') {
        status.style.background = '#fee2e2';
        status.style.color = '#991b1b';
        isRecording = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        visualizerContainer.classList.remove('active');
        stopAudioVisualization();
    }
}

function handleSpeechEnd() {
    console.log('Speech recognition ended');
    
    if (isRecording) {
        // Restart if still recording (for continuous recording)
        try {
            console.log('Restarting recognition for continuous recording...');
            recognition.start();
        } catch (error) {
            console.error('Error restarting recognition:', error);
            stopRecording();
        }
    } else {
        status.textContent = 'Ready to record';
        status.style.background = '#f3f4f6';
        status.style.color = '#374151';
        status.classList.remove('recording');
    }
}

function startAudioVisualization(stream) {
    try {
        // Create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        
        // Create analyser
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        
        // Create microphone source
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        
        // Start visualization
        visualize();
        
        console.log('Audio visualization started');
    } catch (error) {
        console.error('Error starting audio visualization:', error);
    }
}

function visualize() {
    const bars = document.querySelectorAll('.bar');
    
    if (!bars.length || !analyser) {
        console.error('Bars or analyser not found');
        return;
    }
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        if (!isRecording) {
            return;
        }
        
        animationId = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        
        // Update each bar based on audio frequency data
        bars.forEach((bar, index) => {
            const dataIndex = Math.floor((index / bars.length) * bufferLength);
            const value = dataArray[dataIndex];
            const height = Math.max(20, (value / 255) * 100);
            bar.style.height = height + 'px';
        });
    }
    
    draw();
}

function stopAudioVisualization() {
    try {
        // Cancel animation
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        // Disconnect microphone
        if (microphone) {
            microphone.disconnect();
            microphone = null;
        }
        
        // Close audio context
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
            audioContext = null;
        }
        
        // Stop media stream
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        
        // Reset bars
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.height = '20px';
        });
        
        console.log('Audio visualization stopped');
    } catch (error) {
        console.error('Error stopping audio visualization:', error);
    }
}

function copyText() {
    if (textArea.value.trim() === '') {
        alert('No text to copy!');
        return;
    }
    
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textArea.value).then(() => {
                showCopySuccess();
            }).catch(() => {
                // Fallback to execCommand
                document.execCommand('copy');
                showCopySuccess();
            });
        } else {
            // Fallback to execCommand
            document.execCommand('copy');
            showCopySuccess();
        }
    } catch (error) {
        console.error('Error copying text:', error);
        alert('Failed to copy text. Please copy manually.');
    }
}

function showCopySuccess() {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
}

function downloadText() {
    if (textArea.value.trim() === '') {
        alert('No text to download!');
        return;
    }
    
    try {
        const text = textArea.value;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        
        a.href = url;
        a.download = `voice-transcription-${date}.txt`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        console.log('Text downloaded successfully');
    } catch (error) {
        console.error('Error downloading text:', error);
        alert('Failed to download text. Please try again.');
    }
}

function clearText() {
    if (textArea.value.trim() === '') {
        return;
    }
    
    if (confirm('Are you sure you want to clear all text?')) {
        textArea.value = '';
        finalTranscript = '';
        status.textContent = 'Text cleared. Ready to record';
        status.style.background = '#f3f4f6';
        status.style.color = '#374151';
    }
}
