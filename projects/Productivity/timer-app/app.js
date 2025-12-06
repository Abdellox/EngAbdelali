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

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('display').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    if (interval) return;
    
    if (timeLeft === 0) {
        const mins = parseInt(document.getElementById('minutes').value) || 0;
        const secs = parseInt(document.getElementById('seconds').value) || 0;
        timeLeft = mins * 60 + secs;
    }
    
    if (timeLeft === 0) return;
    
    interval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(interval);
            interval = null;
            alert('Time is up!');
        }
    }, 1000);
}

function pauseTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    timeLeft = 0;
    updateDisplay();
}

console.log('Timer App - Built by Abdel Ali');
