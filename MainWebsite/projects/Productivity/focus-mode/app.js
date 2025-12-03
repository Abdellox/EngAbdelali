/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let interval = null;
let timeLeft = 0;

function startFocus() {
    const minutes = parseInt(document.getElementById('minutes').value) || 25;
    timeLeft = minutes * 60;
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    document.body.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    
    interval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            stopFocus();
            alert('Focus session complete!');
        }
    }, 1000);
}

function stopFocus() {
    clearInterval(interval);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('display').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

console.log('Focus Mode - Built by Abdel Ali');
