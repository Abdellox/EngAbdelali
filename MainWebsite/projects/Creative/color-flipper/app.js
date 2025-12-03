/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let currentMode = 'hex';
let currentColor = '#667eea';

function flipColor() {
    if (currentMode === 'hex') {
        currentColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    } else if (currentMode === 'rgb') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        currentColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode === 'hsl') {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 100);
        const l = Math.floor(Math.random() * 100);
        currentColor = `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    updateDisplay();
}

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(mode + 'Btn').classList.add('active');
    flipColor();
}

function updateDisplay() {
    document.body.style.background = currentColor;
    document.getElementById('colorName').textContent = currentColor;
}

function copyColor() {
    navigator.clipboard.writeText(currentColor).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#2ed573';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

updateDisplay();
console.log('Color Flipper - Built by Abdel Ali');
