/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const difficulties = {
    easy: { max: 50, maxAttempts: 10, name: 'Easy (1-50)' },
    medium: { max: 100, maxAttempts: 8, name: 'Medium (1-100)' },
    hard: { max: 200, maxAttempts: 6, name: 'Hard (1-200)' }
};

let currentDifficulty = 'medium';
let targetNumber;
let attempts = 0;
let gameWon = false;
let guessHistory = [];

function initGame() {
    const diff = difficulties[currentDifficulty];
    targetNumber = Math.floor(Math.random() * diff.max) + 1;
    attempts = 0;
    gameWon = false;
    guessHistory = [];
    
    document.getElementById('difficultyDisplay').textContent = diff.name;
    document.getElementById('maxAttempts').textContent = diff.maxAttempts;
    document.getElementById('attempts').textContent = '0';
    document.getElementById('feedback').textContent = `Guess a number between 1 and ${diff.max}!`;
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').max = diff.max;
    document.getElementById('guessInput').placeholder = `1-${diff.max}`;
    document.getElementById('history').innerHTML = '';
    document.getElementById('guessInput').focus();
}

function checkGuess() {
    if (gameWon) return;
    
    const diff = difficulties[currentDifficulty];
    const guess = parseInt(document.getElementById('guessInput').value);
    const feedback = document.getElementById('feedback');
    
    if (!guess || guess < 1 || guess > diff.max) {
        feedback.textContent = `Please enter a valid number between 1 and ${diff.max}!`;
        feedback.className = 'feedback error';
        return;
    }
    
    if (guessHistory.includes(guess)) {
        feedback.textContent = 'You already guessed that number!';
        feedback.className = 'feedback error';
        return;
    }
    
    attempts++;
    guessHistory.push(guess);
    
    document.getElementById('attempts').textContent = attempts;
    addToHistory(guess);
    
    if (guess === targetNumber) {
        feedback.textContent = `🎉 Correct! You won in ${attempts} attempts!`;
        feedback.className = 'feedback correct';
        gameWon = true;
        showCelebration();
    } else if (attempts >= diff.maxAttempts) {
        feedback.textContent = `😢 Game Over! The number was ${targetNumber}`;
        feedback.className = 'feedback error';
        gameWon = true;
    } else {
        const remaining = diff.maxAttempts - attempts;
        let hint = '';
        
        if (guess < targetNumber) {
            hint = '📈 Too low!';
        } else {
            hint = '📉 Too high!';
        }
        
        // Add proximity hint
        const difference = Math.abs(guess - targetNumber);
        if (difference <= 5) {
            hint += ' 🔥 Very close!';
        } else if (difference <= 15) {
            hint += ' 🌡️ Getting warmer!';
        } else if (difference <= 30) {
            hint += ' ❄️ Getting colder!';
        }
        
        feedback.textContent = `${hint} (${remaining} attempts left)`;
        feedback.className = guess < targetNumber ? 'feedback low' : 'feedback high';
    }
    
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

function addToHistory(guess) {
    const historyDiv = document.getElementById('history');
    const guessElement = document.createElement('span');
    guessElement.className = 'guess-item';
    guessElement.textContent = guess;
    
    if (guess === targetNumber) {
        guessElement.classList.add('correct');
    } else if (guess < targetNumber) {
        guessElement.classList.add('low');
    } else {
        guessElement.classList.add('high');
    }
    
    historyDiv.appendChild(guessElement);
}

function showCelebration() {
    if (gameWon && attempts <= difficulties[currentDifficulty].maxAttempts) {
        // Create celebration effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 100);
        }
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.textContent = ['🎉', '🎊', '⭐', '✨'][Math.floor(Math.random() * 4)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.fontSize = '2rem';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(100vh) rotate(360deg)', opacity: 0 }
    ], {
        duration: 3000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => confetti.remove();
}

function setDifficulty(level) {
    currentDifficulty = level;
    document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="setDifficulty('${level}')"]`).classList.add('active');
    initGame();
}

function newGame() {
    initGame();
}

// Allow Enter key to submit guess
document.getElementById('guessInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

// Initialize game
initGame();

console.log('🎲 Number Guessing Game Ready');