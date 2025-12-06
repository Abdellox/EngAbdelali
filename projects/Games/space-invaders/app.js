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

let player = { x: canvas.width / 2 - 20, y: canvas.height - 60, width: 40, height: 40, speed: 5 };
let aliens = [];
let bullets = [];
let score = 0;
let gameRunning = false;

function createAliens() {
    aliens = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            aliens.push({ x: col * 60 + 50, y: row * 50 + 50, width: 40, height: 40 });
        }
    }
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    score = 0;
    createAliens();
    bullets = [];
    document.getElementById('score').textContent = score;
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = '#667eea';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw aliens
    ctx.fillStyle = '#dc3545';
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
    });
    
    // Draw bullets
    ctx.fillStyle = '#28a745';
    bullets.forEach((bullet, i) => {
        bullet.y -= 5;
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
        
        if (bullet.y < 0) bullets.splice(i, 1);
        
        // Check collision
        aliens.forEach((alien, j) => {
            if (bullet.x > alien.x && bullet.x < alien.x + alien.width &&
                bullet.y > alien.y && bullet.y < alien.y + alien.height) {
                aliens.splice(j, 1);
                bullets.splice(i, 1);
                score += 10;
                document.getElementById('score').textContent = score;
            }
        });
    });
    
    if (aliens.length === 0) {
        gameRunning = false;
        alert('You won! Score: ' + score);
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    if (e.key === 'ArrowLeft' && player.x > 0) player.x -= player.speed;
    if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) player.x += player.speed;
    if (e.key === ' ') bullets.push({ x: player.x + player.width / 2, y: player.y });
});

console.log('Space Invaders - Built by Abdel Ali');
