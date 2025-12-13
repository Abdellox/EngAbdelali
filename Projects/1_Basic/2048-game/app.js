// Simple 2048 Game Implementation
let board = [];
let score = 0;
let best = localStorage.getItem('2048-best') || 0;

function initGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    addRandomTile();
    addRandomTile();
    updateDisplay();
}

function addRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({row: i, col: j});
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateDisplay() {
    const container = document.getElementById('tileContainer');
    container.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                const tile = document.createElement('div');
                tile.className = `tile tile-${board[i][j]}`;
                tile.style.left = `${j * 70 + 10}px`;
                tile.style.top = `${i * 70 + 10}px`;
                tile.textContent = board[i][j];
                container.appendChild(tile);
            }
        }
    }
    
    document.getElementById('score').textContent = score;
    document.getElementById('best').textContent = best;
}

function move(direction) {
    let moved = false;
    const newBoard = board.map(row => [...row]);
    
    if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            const row = slideArray(board[i]);
            if (JSON.stringify(row) !== JSON.stringify(board[i])) {
                moved = true;
                newBoard[i] = row;
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < 4; i++) {
            const row = slideArray(board[i].slice().reverse()).reverse();
            if (JSON.stringify(row) !== JSON.stringify(board[i])) {
                moved = true;
                newBoard[i] = row;
            }
        }
    } else if (direction === 'up') {
        for (let j = 0; j < 4; j++) {
            const column = [board[0][j], board[1][j], board[2][j], board[3][j]];
            const newColumn = slideArray(column);
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
                moved = true;
                for (let i = 0; i < 4; i++) {
                    newBoard[i][j] = newColumn[i];
                }
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) {
            const column = [board[0][j], board[1][j], board[2][j], board[3][j]];
            const newColumn = slideArray(column.slice().reverse()).reverse();
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
                moved = true;
                for (let i = 0; i < 4; i++) {
                    newBoard[i][j] = newColumn[i];
                }
            }
        }
    }
    
    if (moved) {
        board = newBoard;
        addRandomTile();
        updateDisplay();
        
        if (score > best) {
            best = score;
            localStorage.setItem('2048-best', best);
        }
        
        if (isGameOver()) {
            setTimeout(() => {
                document.getElementById('gameMessage').style.display = 'flex';
            }, 300);
        }
    }
}

function slideArray(arr) {
    const filtered = arr.filter(val => val !== 0);
    const missing = 4 - filtered.length;
    const zeros = Array(missing).fill(0);
    const newArray = filtered.concat(zeros);
    
    for (let i = 0; i < 3; i++) {
        if (newArray[i] !== 0 && newArray[i] === newArray[i + 1]) {
            newArray[i] *= 2;
            newArray[i + 1] = 0;
            score += newArray[i];
        }
    }
    
    const filtered2 = newArray.filter(val => val !== 0);
    const missing2 = 4 - filtered2.length;
    const zeros2 = Array(missing2).fill(0);
    return filtered2.concat(zeros2);
}

function isGameOver() {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    
    // Check for possible merges
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === board[i][j + 1]) return false;
        }
    }
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i + 1][j]) return false;
        }
    }
    
    return true;
}

function newGame() {
    document.getElementById('gameMessage').style.display = 'none';
    initGame();
}

function undo() {
    // Simple implementation - just restart
    newGame();
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            move('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            move('down');
            break;
        case 'ArrowLeft':
            e.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
            e.preventDefault();
            move('right');
            break;
    }
});

// Initialize game
initGame();