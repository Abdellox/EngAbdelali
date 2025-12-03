/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Practice makes perfect. Keep typing to improve your speed.",
    "JavaScript is a versatile programming language used for web development.",
    "The only way to do great work is to love what you do."
];

let currentText = '';
let startTime = null;
let timerInterval = null;

function startTest() {
    currentText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById('textDisplay').textContent = currentText;
    document.getElementById('userInput').value = '';
    document.getElementById('userInput').disabled = false;
    document.getElementById('userInput').focus();
    document.getElementById('results').style.display = 'none';
    
    startTime = null;
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = '0';
}

function checkInput() {
    const input = document.getElementById('userInput').value;
    
    if (!startTime && input.length > 0) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
    }
    
    if (input === currentText) {
        finishTest();
    }
    
    // Highlight correct/incorrect
    const display = document.getElementById('textDisplay');
    let html = '';
    for (let i = 0; i < currentText.length; i++) {
        if (i < input.length) {
            if (input[i] === currentText[i]) {
                html += `<span class="correct">${currentText[i]}</span>`;
            } else {
                html += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            html += currentText[i];
        }
    }
    display.innerHTML = html;
}

function updateTimer() {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    document.getElementById('timer').textContent = elapsed;
}

function finishTest() {
    clearInterval(timerInterval);
    const elapsed = (Date.now() - startTime) / 1000;
    const words = currentText.split(' ').length;
    const wpm = Math.round((words / elapsed) * 60);
    const accuracy = 100;
    
    document.getElementById('wpm').textContent = wpm;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('time').textContent = elapsed.toFixed(1) + 's';
    document.getElementById('results').style.display = 'block';
    document.getElementById('userInput').disabled = true;
}

document.getElementById('userInput').addEventListener('input', checkInput);

startTest();
console.log('Typing Speed Test - Built by Abdel Ali');
