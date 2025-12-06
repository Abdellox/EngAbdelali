/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const emojis = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let startTime;
let timerInterval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    cards = shuffle([...emojis, ...emojis]);
    const board = document.getElementById('gameBoard');
    board.innerHTML = cards.map((emoji, index) => 
        `<div class="card" data-index="${index}" onclick="flipCard(${index})">
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${emoji}</div>
            </div>
        </div>`
    ).join('');
    
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0/8';
    
    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function flipCard(index) {
    if (flippedCards.length === 2) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push({ index, emoji: cards[index], element: card });
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.emoji === card2.emoji) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = `${matchedPairs}/8`;
        flippedCards = [];
        
        if (matchedPairs === 8) {
            setTimeout(showWin, 500);
        }
    } else {
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    document.getElementById('time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showWin() {
    clearInterval(timerInterval);
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = document.getElementById('time').textContent;
    document.getElementById('winModal').style.display = 'flex';
}

function restartGame() {
    clearInterval(timerInterval);
    startTime = null;
    document.getElementById('time').textContent = '0:00';
    document.getElementById('winModal').style.display = 'none';
    initGame();
}

initGame();
console.log('Memory Game - Built by Abdel Ali');
