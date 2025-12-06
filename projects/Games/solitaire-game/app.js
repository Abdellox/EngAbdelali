/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];

function createDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value, color: (suit === '♥' || suit === '♦') ? 'red' : 'black' });
        });
    });
    return shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    createDeck();
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    // Draw 7 piles
    for (let i = 0; i < 7; i++) {
        const pile = document.createElement('div');
        pile.className = 'pile';
        
        for (let j = 0; j <= i; j++) {
            const card = deck.pop();
            const cardDiv = document.createElement('div');
            cardDiv.className = `card ${card.color}`;
            cardDiv.textContent = `${card.value}${card.suit}`;
            pile.appendChild(cardDiv);
        }
        
        board.appendChild(pile);
    }
    
    // Draw deck
    const deckPile = document.createElement('div');
    deckPile.className = 'deck-pile';
    deckPile.innerHTML = `<div class="card back">🂠</div><p>Deck: ${deck.length} cards</p>`;
    board.appendChild(deckPile);
}

startGame();
console.log('Solitaire - Built by Abdel Ali');
