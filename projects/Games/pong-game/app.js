// Pong Game - Full Implementation
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameRunning = false;
let player1Score = 0;
let player2Score = 0;

// Game objects
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 5,
    dy: 5
};

let paddle1 = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    dy: 0
};

let paddle2 = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    dy: 0
};

// Keyboard controls
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gameLoop();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * 5;
}

function updatePaddles() {
    // Player 1 controls (W/S)
    if (keys['w'] || keys['W']) {
        paddle1.y = Math.max(0, paddle1.y - 7);
    }
    if (keys['s'] || keys['S']) {
        paddle1.y = Math.min(canvas.height - paddle1.height, paddle1.y + 7);
    }
    
    // Player 2 controls (Arrow keys)
    if (keys['ArrowUp']) {
        paddle2.y = Math.max(0, paddle2.y - 7);
    }
    if (keys['ArrowDown']) {
        paddle2.y = Math.min(canvas.height - paddle2.height, paddle2.y + 7);
    }
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Top and bottom collision
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.dy *= -1;
    }
    
    // Paddle 1 collision
    if (ball.x - ball.radius <= paddle1.x + paddle1.width &&
        ball.y >= paddle1.y &&
        ball.y <= paddle1.y + paddle1.height) {
        ball.dx = Math.abs(ball.dx);
    }
    
    // Paddle 2 collision
    if (ball.x + ball.radius >= paddle2.x &&
        ball.y >= paddle2.y &&
        ball.y <= paddle2.y + paddle2.height) {
        ball.dx = -Math.abs(ball.dx);
    }
    
    // Score points
    if (ball.x - ball.radius <= 0) {
        player2Score++;
        document.getElementById('player2Score').textContent = player2Score;
        resetBall();
    }
    if (ball.x + ball.radius >= canvas.width) {
        player1Score++;
        document.getElementById('player1Score').textContent = player1Score;
        resetBall();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw center line
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw paddles
    ctx.fillStyle = '#00ff41';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    
    // Draw ball
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    if (!gameRunning) return;
    
    updatePaddles();
    updateBall();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// Initial draw
draw();

console.log('🏓 Pong Game Ready');
