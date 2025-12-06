/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const colors = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;
let gameActive = false;

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    gameActive = true;
    document.getElementById('level').textContent = '0';
    document.getElementById('message').textContent = 'Watch the pattern...';
    nextLevel();
}

function nextLevel() {
    level++;
    playerSequence = [];
    document.getElementById('level').textContent = level;
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            document.getElementById('message').textContent = 'Your turn!';
            return;
        }
        
        flashButton(sequence[i]);
        i++;
    }, 600);
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    playSound(color);
    
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

function playSound(color) {
    const frequencies = { red: 329.63, blue: 261.63, green: 392.00, yellow: 440.00 };
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequencies[color];
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function handleClick(color) {
    if (!gameActive) return;
    
    flashButton(color);
    playerSequence.push(color);
    
    const currentIndex = playerSequence.length - 1;
    
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver();
        return;
    }
    
    if (playerSequence.length === sequence.length) {
        document.getElementById('message').textContent = 'Correct! Next level...';
        setTimeout(nextLevel, 1000);
    }
}

function gameOver() {
    gameActive = false;
    document.getElementById('message').textContent = `Game Over! Level: ${level}`;
    
    // Flash all buttons
    colors.forEach(color => {
        document.getElementById(color).classList.add('active');
    });
    
    setTimeout(() => {
        colors.forEach(color => {
            document.getElementById(color).classList.remove('active');
        });
    }, 500);
}

colors.forEach(color => {
    document.getElementById(color).onclick = () => handleClick(color);
});

console.log('Simon Game - Built by Abdel Ali');
