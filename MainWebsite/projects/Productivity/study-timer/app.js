/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let timeLeft = 25 * 60;
let interval;
let sessions = 0;
let totalMinutes = 0;

function startStudy() {
    if (!interval) {
        interval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                interval = null;
                sessions++;
                totalMinutes += 25;
                updateStats();
                alert('Study session complete! Take a break.');
                timeLeft = 25 * 60;
                updateDisplay();
            }
        }, 1000);
    }
}

function pauseStudy() {
    clearInterval(interval);
    interval = null;
}

function resetStudy() {
    clearInterval(interval);
    interval = null;
    timeLeft = 25 * 60;
    updateDisplay();
}

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateStats() {
    document.getElementById('sessions').textContent = sessions;
    document.getElementById('totalTime').textContent = totalMinutes;
}

updateDisplay();
updateStats();
