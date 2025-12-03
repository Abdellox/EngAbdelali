// Puzzle Slider - Full Implementation
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let moves = 0;
let startTime = null;
let timerInterval = null;

function renderPuzzle() {
    const grid = document.getElementById('puzzleGrid');
    grid.innerHTML = tiles.map((tile, index) => 
        `<div class="puzzle-tile ${tile === 0 ? 'empty' : ''}" onclick="moveTile(${index})">
            ${tile === 0 ? '' : tile}
        </div>`
    ).join('');
    
    checkWin();
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    
    // Check if tile is adjacent to empty space
    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        moves++;
        document.getElementById('moves').textContent = moves;
        
        if (!startTime) {
            startTime = Date.now();
            startTimer();
        }
        
        renderPuzzle();
    }
}

function shufflePuzzle() {
    // Fisher-Yates shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    
    // Ensure puzzle is solvable
    if (!isSolvable()) {
        [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    }
    
    moves = 0;
    document.getElementById('moves').textContent = moves;
    renderPuzzle();
}

function isSolvable() {
    let inversions = 0;
    for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
}

function resetPuzzle() {
    tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    moves = 0;
    startTime = null;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    document.getElementById('moves').textContent = moves;
    document.getElementById('time').textContent = '0:00';
    renderPuzzle();
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        document.getElementById('time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function checkWin() {
    const isWin = tiles.every((tile, index) => 
        index === 8 ? tile === 0 : tile === index + 1
    );
    
    if (isWin && moves > 0) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`🎉 Congratulations! You solved it in ${moves} moves and ${document.getElementById('time').textContent}!`);
        }, 300);
    }
}

renderPuzzle();
console.log('🧩 Puzzle Slider Ready');
