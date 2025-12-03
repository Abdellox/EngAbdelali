/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const words = ['javascript', 'programming', 'developer', 'computer', 'keyboard', 'algorithm', 'function', 'variable'];
let word = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    updateDisplay();
    createKeyboard();
}

function updateDisplay() {
    const wordDisplay = word.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
    
    document.getElementById('wordDisplay').textContent = wordDisplay;
    document.getElementById('wrongCount').textContent = `${wrongGuesses} / ${maxWrong}`;
    
    drawHangman();
    
    if (!wordDisplay.includes('_')) {
        endGame(true);
    } else if (wrongGuesses >= maxWrong) {
        endGame(false);
    }
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        button.disabled = guessedLetters.includes(letter);
        keyboard.appendChild(button);
    }
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter)) return;
    
    guessedLetters.push(letter);
    
    if (!word.includes(letter)) {
        wrongGuesses++;
    }
    
    updateDisplay();
    createKeyboard();
}

function drawHangman() {
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    
    // Base
    if (wrongGuesses > 0) {
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
        ctx.stroke();
    }
    
    // Pole
    if (wrongGuesses > 1) {
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 10);
        ctx.stroke();
    }
    
    // Top
    if (wrongGuesses > 2) {
        ctx.beginPath();
        ctx.moveTo(50, 10);
        ctx.lineTo(130, 10);
        ctx.stroke();
    }
    
    // Rope
    if (wrongGuesses > 3) {
        ctx.beginPath();
        ctx.moveTo(130, 10);
        ctx.lineTo(130, 30);
        ctx.stroke();
    }
    
    // Head
    if (wrongGuesses > 4) {
        ctx.beginPath();
        ctx.arc(130, 50, 20, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Body
    if (wrongGuesses > 5) {
        ctx.beginPath();
        ctx.moveTo(130, 70);
        ctx.lineTo(130, 130);
        ctx.stroke();
    }
}

function endGame(won) {
    const message = won ? '🎉 You Won!' : `😢 Game Over! Word was: ${word}`;
    setTimeout(() => {
        alert(message);
        startGame();
    }, 500);
}

startGame();
console.log('Hangman Game - Built by Abdel Ali');
