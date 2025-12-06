// 2048 Game - Full Implementation
class Game2048 {
    constructor() {
        this.size = 4;
        this.board = [];
        this.score = 0;
        this.best = parseInt(localStorage.getItem('2048-best')) || 0;
        this.previousStates = [];
        this.gameOver = false;
        this.won = false;
        
        this.init();
    }

    init() {
        this.updateBestScore();
        this.newGame();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            const key = e.key;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                e.preventDefault();
                this.saveState();
                
                let moved = false;
                switch(key) {
                    case 'ArrowUp':
                        moved = this.move('up');
                        break;
                    case 'ArrowDown':
                        moved = this.move('down');
                        break;
                    case 'ArrowLeft':
                        moved = this.move('left');
                        break;
                    case 'ArrowRight':
                        moved = this.move('right');
                        break;
                }

                if (moved) {
                    this.addRandomTile();
                    this.render();
                    this.checkGameState();
                } else {
                    this.previousStates.pop();
                }
            }
        });

        // Touch support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (this.gameOver) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 30) {
                    this.handleMove('right');
                } else if (diffX < -30) {
                    this.handleMove('left');
                }
            } else {
                if (diffY > 30) {
                    this.handleMove('down');
                } else if (diffY < -30) {
                    this.handleMove('up');
                }
            }
        });
    }

    handleMove(direction) {
        this.saveState();
        const moved = this.move(direction);
        if (moved) {
            this.addRandomTile();
            this.render();
            this.checkGameState();
        } else {
            this.previousStates.pop();
        }
    }

    newGame() {
        this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.previousStates = [];
        
        this.addRandomTile();
        this.addRandomTile();
        this.render();
        this.hideMessage();
        
        document.getElementById('undoBtn').disabled = true;
    }

    saveState() {
        this.previousStates.push({
            board: JSON.parse(JSON.stringify(this.board)),
            score: this.score
        });
        
        if (this.previousStates.length > 1) {
            this.previousStates.shift();
        }
        
        document.getElementById('undoBtn').disabled = false;
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }

        if (emptyCells.length > 0) {
            const {row, col} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.board[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        let moved = false;
        const oldBoard = JSON.stringify(this.board);

        if (direction === 'left') {
            moved = this.moveLeft();
        } else if (direction === 'right') {
            this.board = this.board.map(row => row.reverse());
            moved = this.moveLeft();
            this.board = this.board.map(row => row.reverse());
        } else if (direction === 'up') {
            this.board = this.transpose(this.board);
            moved = this.moveLeft();
            this.board = this.transpose(this.board);
        } else if (direction === 'down') {
            this.board = this.transpose(this.board);
            this.board = this.board.map(row => row.reverse());
            moved = this.moveLeft();
            this.board = this.board.map(row => row.reverse());
            this.board = this.transpose(this.board);
        }

        return moved;
    }

    moveLeft() {
        let moved = false;
        
        for (let i = 0; i < this.size; i++) {
            let row = this.board[i].filter(cell => cell !== 0);
            
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            
            while (row.length < this.size) {
                row.push(0);
            }
            
            if (JSON.stringify(this.board[i]) !== JSON.stringify(row)) {
                moved = true;
            }
            
            this.board[i] = row;
        }
        
        return moved;
    }

    transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    checkGameState() {
        // Check for win
        if (!this.won) {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] === 2048) {
                        this.won = true;
                        this.showMessage('You Win!', 'Congratulations! You reached 2048!');
                        return;
                    }
                }
            }
        }

        // Check for game over
        if (!this.canMove()) {
            this.gameOver = true;
            this.showMessage('Game Over!', `Final Score: ${this.score}`);
        }
    }

    canMove() {
        // Check for empty cells
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) return true;
            }
        }

        // Check for possible merges
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const current = this.board[i][j];
                if (j < this.size - 1 && current === this.board[i][j + 1]) return true;
                if (i < this.size - 1 && current === this.board[i + 1][j]) return true;
            }
        }

        return false;
    }

    render() {
        // Update score
        document.getElementById('score').textContent = this.score;
        
        // Update best score
        if (this.score > this.best) {
            this.best = this.score;
            localStorage.setItem('2048-best', this.best);
            this.updateBestScore();
        }

        // Clear tile container
        const tileContainer = document.getElementById('tileContainer');
        tileContainer.innerHTML = '';

        // Render tiles
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const value = this.board[i][j];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${value}`;
                    tile.textContent = value;
                    tile.style.top = `${i * 115 + 15}px`;
                    tile.style.left = `${j * 115 + 15}px`;
                    tileContainer.appendChild(tile);
                }
            }
        }
    }

    updateBestScore() {
        document.getElementById('best').textContent = this.best;
    }

    showMessage(title, text) {
        document.getElementById('messageTitle').textContent = title;
        document.getElementById('messageText').textContent = text;
        document.getElementById('gameMessage').classList.add('show');
    }

    hideMessage() {
        document.getElementById('gameMessage').classList.remove('show');
    }
}

// Initialize game
let game;

function newGame() {
    game = new Game2048();
}

function undo() {
    if (game.previousStates.length > 0) {
        const previousState = game.previousStates.pop();
        game.board = previousState.board;
        game.score = previousState.score;
        game.render();
        
        if (game.previousStates.length === 0) {
            document.getElementById('undoBtn').disabled = true;
        }
    }
}

// Start the game
newGame();
