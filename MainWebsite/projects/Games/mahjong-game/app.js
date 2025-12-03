/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const tiles = ['🀀', '🀁', '🀂', '🀃', '🀄', '🀅', '🀆', '🀇', '🀈', '🀉', '🀊', '🀋'];
let board = [];
let selected = null;
let matches = 0;

function createBoard() {
    board = [];
    const tilePairs = [...tiles, ...tiles];
    
    for (let i = tilePairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilePairs[i], tilePairs[j]] = [tilePairs[j], tilePairs[i]];
    }
    
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    matches = 0;
    selected = null;
    
    tilePairs.forEach((tile, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'tile';
        tileDiv.textContent = tile;
        tileDiv.dataset.index = index;
        tileDiv.onclick = () => selectTile(index, tile);
        boardDiv.appendChild(tileDiv);
    });
}

function selectTile(index, tile) {
    const tileDiv = document.querySelectorAll('.tile')[index];
    
    if (tileDiv.classList.contains('matched') || tileDiv.classList.contains('selected')) return;
    
    if (selected === null) {
        selected = { index, tile };
        tileDiv.classList.add('selected');
    } else {
        if (selected.tile === tile && selected.index !== index) {
            tileDiv.classList.add('matched');
            document.querySelectorAll('.tile')[selected.index].classList.add('matched');
            matches++;
            
            if (matches === tiles.length) {
                setTimeout(() => alert('You won!'), 500);
            }
        } else {
            document.querySelectorAll('.tile')[selected.index].classList.remove('selected');
        }
        selected = null;
    }
}

createBoard();
console.log('Mahjong - Built by Abdel Ali');
