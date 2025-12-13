/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const words = ['javascript', 'programming', 'developer', 'computer', 'keyboard', 'algorithm', 'function', 'variable', 'website', 'coding', 'software', 'database'];
let word = '';
let guessedLetters = [];
let wrongLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;
let gameOver = false;

const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

function startGame() {
    word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    guessedLetters = [];
    wrongLetters = [];
    wrongGuesses = 0;
    gameOver = false;
    
    // Hide all hangman parts
    hangmanParts.forEach(part => {
        const element = document.getElementById(part);
        if (element) {
            element.classList.remove('show');
        }
    });
    
    updateDisplay();
    createKeyboard();
    document.getElementById('message').textContent = '';
}

function updateDisplay() {
    // Update word display
    const wordDisplay = word.split('').map(letter => 
        guessedLetters.includes(letter) ? letter.toUpperCase() : '_'
    ).join(' ');
    
    document.getElementById('wordDisplay').textContent = wordDisplay;
    
    // Update wrong letters display
    document.getElementById('wrongLetters').textContent = wrongLetters.join(', ').toUpperCase();
    
    // Update attempts counter
    document.getElementById('wrongCount').textContent = `${wrongGuesses} / ${maxWrong}`;
    
    // Show hangman parts based on wrong guesses
    for (let i = 0; i < wrongGuesses; i++) {
        const part = document.getElementById(hangmanParts[i]);
        if (part) {
            part.classList.add('show');
        }
    }
    
    // Check win/lose conditions
    if (!wordDisplay.includes('_')) {
        endGame(true);
    } else if (wrongGuesses >= maxWrong) {
        endGame(false);
    }
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    
    for (let letter of letters) {
        const button = document.createElement('button');
        button.textContent = letter.toUpperCase();
        button.onclick = () => guessLetter(letter);
        button.disabled = guessedLetters.includes(letter) || gameOver;
        
        // Add visual feedback for guessed letters
        if (guessedLetters.includes(letter)) {
            if (word.includes(letter)) {
                button.style.background = '#10b981';
                button.style.color = 'white';
            } else {
                button.style.background = '#ef4444';
                button.style.color = 'white';
            }
        }
        
        keyboard.appendChild(button);
    }
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter) || gameOver) return;
    
    guessedLetters.push(letter);
    
    if (word.includes(letter)) {
        // Correct guess - no penalty
    } else {
        // Wrong guess - add to wrong letters and increment counter
        wrongLetters.push(letter);
        wrongGuesses++;
    }
    
    updateDisplay();
    createKeyboard();
}

function endGame(won) {
    gameOver = true;
    const messageEl = document.getElementById('message');
    
    if (won) {
        messageEl.textContent = '🎉 Congratulations! You won!';
        messageEl.style.color = '#10b981';
    } else {
        messageEl.textContent = `😢 Game Over! The word was: ${word.toUpperCase()}`;
        messageEl.style.color = '#ef4444';
    }
    
    // Disable all keyboard buttons
    createKeyboard();
}

function newGame() {
    startGame();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const letter = e.key.toLowerCase();
    if (letter >= 'a' && letter <= 'z') {
        guessLetter(letter);
    }
});

// Initialize game
startGame();

console.log('Hangman Game - Built by Abdel Ali');
