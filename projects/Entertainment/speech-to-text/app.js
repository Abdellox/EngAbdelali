/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let recognition = null;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('output').textContent = transcript;
    };
    
    recognition.onerror = (event) => {
        document.getElementById('output').textContent = 'Error: ' + event.error;
    };
}

function startRecording() {
    if (recognition) {
        recognition.start();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('status').textContent = 'Recording...';
    } else {
        alert('Speech recognition not supported in this browser');
    }
}

function stopRecording() {
    if (recognition) {
        recognition.stop();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('status').textContent = 'Stopped';
    }
}

console.log('Speech to Text - Built by Abdel Ali');
