/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

// Canvas setup
const canvas = document.getElementById('tetrisCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 240;
canvas.height = 400;

// Game constants
const ROWS = 20;
const COLS = 12;
const BLOCK = 20;

// Game state
let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let piece = { x: 5, y: 0, shape: [[1, 1, 1, 1]] };

// Tetromino shapes
const shapes = [
    [[1, 1, 1, 1]],           // I
    [[1, 1], [1, 1]],         // O
    [[1, 1, 1], [0, 1, 0]],   // T
    [[1, 1, 1], [1, 0, 0]],   // L
    [[1, 1, 1], [0, 0, 1]],   // J
    [[1, 1, 0], [0, 1, 1]],   // S
    [[0, 1, 1], [1, 1, 0]]    // Z
];

// Game variables
let score = 0;
let level = 1;
let lines = 0;
let dropTime = 1000;
let lastTime = 0;
let gameRunning = false;

// Main draw function
function draw() {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
}

// Draw the board
function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c]) {
                ctx.fillStyle = '#667eea';
                ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK - 1, BLOCK - 1);
            }
        }
    }
}

// Draw the current piece
function drawPiece() {
    ctx.fillStyle = '#10b981';
    piece.shape.forEach((row, r) => {
        row.forEach((val, c) => {
            if (val) {
                ctx.fillRect(
                    (piece.x + c) * BLOCK,
                    (piece.y + r) * BLOCK,
                    BLOCK - 1,
                    BLOCK - 1
                );
            }
        });
    });
}

// Check for collisions
function collision() {
    return piece.shape.some((row, r) =>
        row.some((val, c) =>
            val && (
                board[piece.y + r] === undefined ||
                board[piece.y + r][piece.x + c] === undefined ||
                board[piece.y + r][piece.x + c]
            )
        )
    );
}

// Merge piece into board
function merge() {
    piece.shape.forEach((row, r) => {
        row.forEach((val, c) => {
            if (val) {
                board[piece.y + r][piece.x + c] = 1;
            }
        });
    });
}

// Clear completed lines
function clearLines() {
    let cleared = 0;
    
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(c => c)) {
            board.splice(r, 1);
            board.unshift(Array(COLS).fill(0));
            cleared++;
            r++;
        }
    }
    
    if (cleared) {
        lines += cleared;
        score += cleared * 100;
        document.getElementById('lines').textContent = lines;
        document.getElementById('score').textContent = score;
        
        // Level up every 10 lines
        if (lines % 10 === 0) {
            level++;
            dropTime = Math.max(100, dropTime - 100);
            document.getElementById('level').textContent = level;
        }
    }
}

// Create new piece
function newPiece() {
    piece = {
        x: 5,
        y: 0,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
    };
    
    if (collision()) {
        gameRunning = false;
        alert('Game Over! Score: ' + score);
        document.getElementById('startBtn').style.display = 'block';
        
        // Reset game
        board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
        score = 0;
        level = 1;
        lines = 0;
        dropTime = 1000;
        document.getElementById('score').textContent = score;
        document.getElementById('level').textContent = level;
        document.getElementById('lines').textContent = lines;
    }
}

// Drop piece down
function drop() {
    piece.y++;
    if (collision()) {
        piece.y--;
        merge();
        clearLines();
        newPiece();
    }
}

// Keyboard controls
document.addEventListener('keydown', e => {
    if (!gameRunning) return;
    
    if (e.key === 'ArrowLeft') {
        piece.x--;
        if (collision()) piece.x++;
    } else if (e.key === 'ArrowRight') {
        piece.x++;
        if (collision()) piece.x--;
    } else if (e.key === 'ArrowDown') {
        drop();
    } else if (e.key === 'ArrowUp') {
        // Rotate piece
        let rotated = piece.shape[0].map((val, i) =>
            piece.shape.map(row => row[i]).reverse()
        );
        let temp = piece.shape;
        piece.shape = rotated;
        if (collision()) piece.shape = temp;
    }
});

// Game loop
function gameLoop(time = 0) {
    if (!gameRunning) return;
    
    if (time - lastTime > dropTime) {
        drop();
        lastTime = time;
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    gameRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    newPiece();
    gameLoop();
}

// Initial draw
draw();
