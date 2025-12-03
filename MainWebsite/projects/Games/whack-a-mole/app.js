/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let score = 0;
let timeLeft = 30;
let gameActive = false;
let moleTimer;
let countdownTimer;

function startGame() {
    if (gameActive) return;
    
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    document.getElementById('score').textContent = score;
    document.getElementById('timeLeft').textContent = timeLeft;
    document.getElementById('startBtn').disabled = true;
    
    countdownTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    showMole();
}

function showMole() {
    if (!gameActive) return;
    
    // Hide all moles
    document.querySelectorAll('.mole').forEach(mole => {
        mole.classList.remove('active');
    });
    
    // Show random mole
    const holes = document.querySelectorAll('.hole');
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const mole = randomHole.querySelector('.mole');
    mole.classList.add('active');
    
    // Hide after random time
    const showTime = Math.random() * 1000 + 500;
    moleTimer = setTimeout(() => {
        mole.classList.remove('active');
        showMole();
    }, showTime);
}

function whackMole(element) {
    if (!gameActive) return;
    if (!element.classList.contains('active')) return;
    
    score++;
    document.getElementById('score').textContent = score;
    element.classList.remove('active');
    element.classList.add('whacked');
    
    setTimeout(() => {
        element.classList.remove('whacked');
    }, 200);
}

function endGame() {
    gameActive = false;
    clearInterval(countdownTimer);
    clearTimeout(moleTimer);
    
    document.querySelectorAll('.mole').forEach(mole => {
        mole.classList.remove('active');
    });
    
    document.getElementById('startBtn').disabled = false;
    alert(`Game Over! Your score: ${score}`);
}

// Create game board
const board = document.getElementById('gameBoard');
for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    const mole = document.createElement('div');
    mole.className = 'mole';
    mole.onclick = () => whackMole(mole);
    hole.appendChild(mole);
    board.appendChild(hole);
}

console.log('Whack-a-Mole - Built by Abdel Ali');
