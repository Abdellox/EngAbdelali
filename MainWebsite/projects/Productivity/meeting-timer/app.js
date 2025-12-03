/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let startTime = 0;
let interval = null;
let participants = 0;
let hourlyRate = 0;

function startMeeting() {
    participants = parseInt(document.getElementById('participants').value) || 1;
    hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 50;
    
    startTime = Date.now();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    
    interval = setInterval(updateTimer, 1000);
}

function stopMeeting() {
    clearInterval(interval);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

function resetMeeting() {
    stopMeeting();
    startTime = 0;
    document.getElementById('time').textContent = '00:00:00';
    document.getElementById('cost').textContent = '$0.00';
}

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    document.getElementById('time').textContent = timeStr;
    
    const cost = (elapsed / 1000 / 3600) * hourlyRate * participants;
    document.getElementById('cost').textContent = '$' + cost.toFixed(2);
}

console.log('Meeting Timer - Built by Abdel Ali');
