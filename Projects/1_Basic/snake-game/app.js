/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state variables
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let level = 1;
let foodEaten = 0;
let gameLoop;
let gameStarted = false;
let gamePaused = false;
let highScore = localStorage.getItem('snakeHighScore') || 0;

// Speed and difficulty settings
const difficulties = {
    easy: { speed: 200, name: 'Easy', speedMultiplier: 1.5 },
    medium: { speed: 150, name: 'Medium', speedMultiplier: 1.2 },
    hard: { speed: 100, name: 'Hard', speedMultiplier: 1.1 }
};

let currentDifficulty = 'medium';
let gameSpeed = difficulties[currentDifficulty].speed;
let customSpeed = 5; // 1-10 scale

function startGame() {
    if (gameStarted && !gamePaused) return;
    
    if (!gameStarted) {
        // New game
        snake = [{ x: 10, y: 10 }];
        dx = 1;
        dy = 0;
        score = 0;
        level = 1;
        foodEaten = 0;
        generateFood();
        updateDisplay();
    }
    
    gameStarted = true;
    gamePaused = false;
    
    // Update UI
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('gameOver').style.display = 'none';
    
    // Calculate speed based on difficulty and custom speed
    const baseSpeed = difficulties[currentDifficulty].speed;
    const speedFactor = (11 - customSpeed) / 10; // Invert so higher value = faster
    gameSpeed = Math.max(50, baseSpeed * speedFactor);
    
    gameLoop = setInterval(update, gameSpeed);
}

function update() {
    if (gamePaused) return;
    
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    if (checkFood()) {
        foodEaten++;
        score += level * 10; // Score increases with level
        
        // Level up every 5 food items
        if (foodEaten % 5 === 0) {
            level++;
            // Increase speed slightly with each level
            clearInterval(gameLoop);
            gameSpeed = Math.max(50, gameSpeed * 0.95);
            gameLoop = setInterval(update, gameSpeed);
        }
        
        updateDisplay();
        generateFood();
    } else {
        snake.pop();
    }
    draw();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function checkFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    food = newFood;
}

function draw() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#00ff41';
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
    
    // Draw food
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function gameOver() {
    clearInterval(gameLoop);
    gameStarted = false;
    gamePaused = false;
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    
    // Show game over screen
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalLevel').textContent = level;
    document.getElementById('finalFoodEaten').textContent = foodEaten;
    document.getElementById('finalDifficulty').textContent = difficulties[currentDifficulty].name;
    document.getElementById('gameOver').style.display = 'flex';
    
    // Update UI buttons
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    
    // Draw game over on canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
}

// New game management functions
function pauseGame() {
    if (!gameStarted) return;
    
    gamePaused = !gamePaused;
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (gamePaused) {
        pauseBtn.textContent = '▶️ Resume';
        // Draw pause overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Press Space or Resume to continue', canvas.width / 2, canvas.height / 2 + 40);
    } else {
        pauseBtn.textContent = '⏸️ Pause';
        draw(); // Redraw game
    }
}

function resetGame() {
    clearInterval(gameLoop);
    gameStarted = false;
    gamePaused = false;
    
    // Reset game state
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    level = 1;
    foodEaten = 0;
    generateFood();
    updateDisplay();
    
    // Update UI
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    
    draw();
}

function setDifficulty(difficulty) {
    if (gameStarted) return; // Can't change during game
    
    currentDifficulty = difficulty;
    
    // Update UI
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
    
    updateDisplay();
}

function updateSpeed(value) {
    customSpeed = parseInt(value);
    document.getElementById('speedValue').textContent = value;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('foodEaten').textContent = foodEaten;
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('currentSpeed').textContent = difficulties[currentDifficulty].name + ` (${customSpeed}/10)`;
}

function showSettings() {
    document.getElementById('gameOver').style.display = 'none';
}

// Enhanced keyboard controls
document.addEventListener('keydown', (e) => {
    // Game controls
    if (e.key === ' ') {
        e.preventDefault();
        if (gameStarted) {
            pauseGame();
        } else {
            startGame();
        }
        return;
    }
    
    if (!gameStarted || gamePaused) {
        if (e.key === 'Enter') startGame();
        return;
    }
    
    // Movement controls (Arrow keys and WASD)
    switch(e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case 'arrowdown':
        case 's':
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case 'arrowleft':
        case 'a':
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case 'arrowright':
        case 'd':
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});

// Touch controls for mobile
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!gameStarted) startGame();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 30 && dx === 0) { dx = 1; dy = 0; }
        else if (deltaX < -30 && dx === 0) { dx = -1; dy = 0; }
    } else {
        // Vertical swipe
        if (deltaY > 30 && dy === 0) { dx = 0; dy = 1; }
        else if (deltaY < -30 && dy === 0) { dx = 0; dy = -1; }
    }
});

// Initialize game
updateDisplay();
draw();

console.log('🐍 Enhanced Snake Game - Built by Abdel Ali');
