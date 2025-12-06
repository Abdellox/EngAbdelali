// Number Guessing Game - Full Implementation
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const feedback = document.getElementById('feedback');
    const attemptsEl = document.getElementById('attempts');
    
    if (!guess || guess < 1 || guess > 100) {
        feedback.textContent = 'Please enter a valid number between 1 and 100!';
        feedback.className = 'feedback error';
        return;
    }
    
    attempts++;
    attemptsEl.textContent = `Attempts: ${attempts}`;
    
    if (guess === targetNumber) {
        feedback.textContent = `🎉 Correct! You won in ${attempts} attempts!`;
        feedback.className = 'feedback correct';
    } else if (guess < targetNumber) {
        feedback.textContent = '📈 Too low! Try a higher number.';
        feedback.className = 'feedback low';
    } else {
        feedback.textContent = '📉 Too high! Try a lower number.';
        feedback.className = 'feedback high';
    }
    
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

function newGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('attempts').textContent = 'Attempts: 0';
    document.getElementById('guessInput').focus();
}

// Allow Enter key to submit guess
document.getElementById('guessInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

console.log('🎲 Number Guessing Game Ready');
