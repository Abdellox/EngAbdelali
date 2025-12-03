// Simple and reliable voice to text implementation
(function() {
    'use strict';
    
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert('Your browser does not support speech recognition. Please use Chrome, Edge, Brave, or Safari.');
        return;
    }
    
    // Initialize recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    // State
    let isRecording = false;
    let finalTranscript = '';
    let restartAttempts = 0;
    const MAX_RESTART_ATTEMPTS = 3;
    
    // Audio visualization
    let audioContext = null;
    let analyser = null;
    let microphone = null;
    let animationId = null;
    let mediaStream = null;
    
    // DOM elements
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const textArea = document.getElementById('textArea');
    const status = document.getElementById('status');
    const languageSelect = document.getElementById('languageSelect');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const visualizerContainer = document.getElementById('visualizerContainer');
    
    // Set initial language
    recognition.lang = languageSelect.value;
    
    // Language change handler
    languageSelect.addEventListener('change', function() {
        recognition.lang = this.value;
        console.log('Language changed to:', this.value);
    });
    
    // Recognition event handlers
    recognition.onstart = function() {
        console.log('Speech recognition started');
        isRecording = true;
        status.textContent = '🎙️ Recording... Speak now!';
        status.classList.add('recording');
        startBtn.disabled = true;
        stopBtn.disabled = false;
        visualizerContainer.classList.add('active');
        restartAttempts = 0;
    };
    
    recognition.onresult = function(event) {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
                console.log('Final:', transcript);
            } else {
                interimTranscript += transcript;
                console.log('Interim:', transcript);
            }
        }
        
        textArea.value = finalTranscript + interimTranscript;
        textArea.scrollTop = textArea.scrollHeight;
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            status.textContent = '❌ Microphone access denied. Please allow microphone access.';
            status.style.background = '#fee2e2';
            status.style.color = '#991b1b';
            stopRecording();
            alert('Please allow microphone access in your browser settings and try again.');
        } else if (event.error === 'no-speech') {
            console.log('No speech detected, continuing...');
            // Don't stop, just continue
        } else if (event.error === 'audio-capture') {
            status.textContent = '❌ No microphone found.';
            stopRecording();
        } else if (event.error === 'network') {
            status.textContent = '❌ Network error. Check your connection.';
        } else {
            console.log('Error:', event.error);
        }
    };
    
    recognition.onend = function() {
        console.log('Speech recognition ended');
        
        if (isRecording && restartAttempts < MAX_RESTART_ATTEMPTS) {
            console.log('Restarting recognition... Attempt:', restartAttempts + 1);
            restartAttempts++;
            try {
                recognition.start();
            } catch (e) {
                console.error('Failed to restart:', e);
                stopRecording();
            }
        } else if (restartAttempts >= MAX_RESTART_ATTEMPTS) {
            console.log('Max restart attempts reached');
            stopRecording();
        } else {
            status.textContent = 'Ready to record';
            status.classList.remove('recording');
        }
    };
    
    // Start button handler
    startBtn.addEventListener('click', async function() {
        console.log('Start button clicked');
        
        try {
            // Request microphone permission first
            console.log('Requesting microphone access...');
            mediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });
            console.log('Microphone access granted');
            
            // Start visualization
            startVisualization(mediaStream);
            
            // Start recognition
            console.log('Starting speech recognition...');
            recognition.start();
            
        } catch (error) {
            console.error('Error starting:', error);
            
            if (error.name === 'NotAllowedError') {
                alert('Microphone access denied. Please allow microphone access and try again.');
                status.textContent = '❌ Microphone access denied';
            } else if (error.name === 'NotFoundError') {
                alert('No microphone found. Please connect a microphone.');
                status.textContent = '❌ No microphone found';
            } else {
                alert('Error: ' + error.message);
                status.textContent = '❌ Error: ' + error.message;
            }
            
            status.style.background = '#fee2e2';
            status.style.color = '#991b1b';
        }
    });
    
    // Stop button handler
    stopBtn.addEventListener('click', function() {
        console.log('Stop button clicked');
        stopRecording();
    });
    
    function stopRecording() {
        isRecording = false;
        restartAttempts = 0;
        
        try {
            recognition.stop();
        } catch (e) {
            console.error('Error stopping recognition:', e);
        }
        
        stopVisualization();
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        status.textContent = 'Recording stopped';
        status.style.background = '#f3f4f6';
        status.style.color = '#374151';
        status.classList.remove('recording');
        visualizerContainer.classList.remove('active');
    }
    
    // Visualization functions
    function startVisualization(stream) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
            
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            
            visualize();
            console.log('Visualization started');
        } catch (error) {
            console.error('Visualization error:', error);
        }
    }
    
    function visualize() {
        const bars = document.querySelectorAll('.bar');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        function draw() {
            if (!isRecording) return;
            
            animationId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            
            bars.forEach((bar, index) => {
                const dataIndex = Math.floor((index / bars.length) * bufferLength);
                const value = dataArray[dataIndex];
                const height = Math.max(20, (value / 255) * 100);
                bar.style.height = height + 'px';
            });
        }
        
        draw();
    }
    
    function stopVisualization() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        if (microphone) {
            microphone.disconnect();
            microphone = null;
        }
        
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
        
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.height = '20px';
        });
        
        console.log('Visualization stopped');
    }
    
    // Copy button handler
    copyBtn.addEventListener('click', function() {
        if (!textArea.value.trim()) {
            alert('No text to copy!');
            return;
        }
        
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        
        try {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textArea.value).then(function() {
                    showSuccess(copyBtn, '✅ Copied!');
                }).catch(function() {
                    document.execCommand('copy');
                    showSuccess(copyBtn, '✅ Copied!');
                });
            } else {
                document.execCommand('copy');
                showSuccess(copyBtn, '✅ Copied!');
            }
        } catch (error) {
            console.error('Copy error:', error);
            alert('Failed to copy. Please copy manually.');
        }
    });
    
    // Download button handler
    downloadBtn.addEventListener('click', function() {
        if (!textArea.value.trim()) {
            alert('No text to download!');
            return;
        }
        
        const text = textArea.value;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        
        a.href = url;
        a.download = 'voice-transcription-' + date + '.txt';
        document.body.appendChild(a);
        a.click();
        
        setTimeout(function() {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });
    
    // Clear button handler
    clearBtn.addEventListener('click', function() {
        if (!textArea.value.trim()) return;
        
        if (confirm('Are you sure you want to clear all text?')) {
            textArea.value = '';
            finalTranscript = '';
            status.textContent = 'Text cleared. Ready to record';
        }
    });
    
    // Manual editing handler
    textArea.addEventListener('input', function() {
        finalTranscript = textArea.value;
    });
    
    function showSuccess(button, text) {
        const originalText = button.textContent;
        button.textContent = text;
        setTimeout(function() {
            button.textContent = originalText;
        }, 2000);
    }
    
    console.log('Voice to Text app initialized');
})();
