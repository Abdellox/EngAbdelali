/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let startTime = Date.now();
let totalTime = parseInt(localStorage.getItem('totalScreenTime')) || 0;

function updateTime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const total = totalTime + elapsed;
    
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    
    document.getElementById('time').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTime() {
    if (confirm('Reset screen time tracker?')) {
        localStorage.setItem('totalScreenTime', '0');
        totalTime = 0;
        startTime = Date.now();
        updateTime();
    }
}

setInterval(updateTime, 1000);
updateTime();

window.addEventListener('beforeunload', () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    localStorage.setItem('totalScreenTime', totalTime + elapsed);
});

console.log('Screen Time - Built by Abdel Ali');
