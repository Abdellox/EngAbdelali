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
    "Practice makes perfect when learning to type faster.",
    "JavaScript is a powerful programming language for web development.",
    "Typing speed improves with consistent daily practice."
];

let targetText = '';
let startTime = 0;
let timeLeft = 60;
let interval = null;
let correctChars = 0;
let totalChars = 0;

function startGame() {
    targetText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById('targetText').textContent = targetText;
    document.getElementById('inputText').value = '';
    document.getElementById('inputText').disabled = false;
    document.getElementById('inputText').focus();
    document.getElementById('startBtn').disabled = true;
    
    timeLeft = 60;
    correctChars = 0;
    totalChars = 0;
    startTime = Date.now();
    
    interval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if (timeLeft === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    document.getElementById('inputText').disabled = true;
    document.getElementById('startBtn').disabled = false;
    alert(`Game Over! Your WPM: ${document.getElementById('wpm').textContent}`);
}

document.getElementById('inputText').addEventListener('input', (e) => {
    const typed = e.target.value;
    totalChars = typed.length;
    correctChars = 0;
    
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === targetText[i]) correctChars++;
    }
    
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    document.getElementById('accuracy').textContent = accuracy;
    
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const wpm = Math.round((correctChars / 5) / timeElapsed) || 0;
    document.getElementById('wpm').textContent = wpm;
    
    if (typed === targetText) {
        endGame();
        alert('Perfect! You completed the text!');
    }
});

console.log('Typing Game - Built by Abdel Ali');
