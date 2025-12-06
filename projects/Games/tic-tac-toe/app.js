/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
// Tic Tac Toe - Full Implementation
const cells = document.querySelectorAll('.cell');
const playerTurn = document.getElementById('playerTurn');
const resetBtn = document.getElementById('resetBtn');
const newGameBtn = document.getElementById('newGameBtn');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winnerText');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

// Check for winner or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
            continue;
        }
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        announceWinner(`Player ${currentPlayer} Wins!`);
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        announceWinner("It's a Draw!");
        scores.draw++;
        updateScores();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
}

// Highlight winning cells
function highlightWinningCells(cells) {
    cells.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).classList.add('winner');
    });
}

// Announce winner
function announceWinner(message) {
    winnerText.textContent = message;
    winnerMessage.classList.add('show');
    setTimeout(() => {
        winnerMessage.classList.remove('show');
    }, 3000);
}

// Update scores
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

// Reset game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    
    winnerMessage.classList.remove('show');
}

// New game (reset scores too)
function newGame() {
    resetGame();
    scores = { X: 0, O: 0, draw: 0 };
    updateScores();
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);

console.log('Tic Tac Toe - Ready!');
