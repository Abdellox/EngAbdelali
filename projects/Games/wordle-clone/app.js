/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const words = ['REACT', 'STYLE', 'WORLD', 'HAPPY', 'LIGHT', 'SMART', 'BRAVE', 'QUICK'];
let targetWord = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentCol = 0;

function createGrid() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            grid.appendChild(cell);
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (currentRow >= 6) return;
    
    if (e.key === 'Enter') {
        if (currentCol === 5) checkWord();
    } else if (e.key === 'Backspace') {
        if (currentCol > 0) {
            currentCol--;
            document.getElementById(`cell-${currentRow}-${currentCol}`).textContent = '';
        }
    } else if (e.key.match(/^[a-z]$/i) && currentCol < 5) {
        document.getElementById(`cell-${currentRow}-${currentCol}`).textContent = e.key.toUpperCase();
        currentCol++;
    }
});

function checkWord() {
    let guess = '';
    for (let i = 0; i < 5; i++) {
        guess += document.getElementById(`cell-${currentRow}-${i}`).textContent;
    }
    
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${currentRow}-${i}`);
        if (guess[i] === targetWord[i]) {
            cell.style.background = '#6aaa64';
        } else if (targetWord.includes(guess[i])) {
            cell.style.background = '#c9b458';
        } else {
            cell.style.background = '#787c7e';
        }
        cell.style.color = 'white';
    }
    
    if (guess === targetWord) {
        setTimeout(() => alert('You won!'), 500);
    } else if (currentRow === 5) {
        setTimeout(() => alert(`Game over! The word was ${targetWord}`), 500);
    }
    
    currentRow++;
    currentCol = 0;
}

createGrid();
console.log('Wordle Clone - Built by Abdel Ali');
