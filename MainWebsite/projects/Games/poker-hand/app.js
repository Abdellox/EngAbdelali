// Poker Hand Evaluator - Full Implementation

const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let currentHand = [];

function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value, numValue: values.indexOf(value) + 2 });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawHand() {
    const deck = shuffleDeck(createDeck());
    currentHand = deck.slice(0, 5);
    displayHand();
    document.getElementById('handName').textContent = 'Click "Evaluate Hand" to see your result';
}

function displayHand() {
    const handDiv = document.getElementById('hand');
    handDiv.innerHTML = '';
    
    currentHand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${(card.suit === '♥' || card.suit === '♦') ? 'red' : 'black'}`;
        cardDiv.innerHTML = `
            <div class="card-value">${card.value}</div>
            <div>${card.suit}</div>
        `;
        handDiv.appendChild(cardDiv);
    });
}

function evaluateHand() {
    if (currentHand.length === 0) {
        alert('Draw a hand first!');
        return;
    }
    
    const result = getHandRank(currentHand);
    document.getElementById('handName').textContent = result;
}

function getHandRank(hand) {
    const values = hand.map(c => c.numValue).sort((a, b) => a - b);
    const suits = hand.map(c => c.suit);
    
    const isFlush = suits.every(s => s === suits[0]);
    const isStraight = checkStraight(values);
    const valueCounts = getValueCounts(values);
    
    // Royal Flush
    if (isFlush && isStraight && values[0] === 10) {
        return '🏆 Royal Flush!';
    }
    
    // Straight Flush
    if (isFlush && isStraight) {
        return '💎 Straight Flush!';
    }
    
    // Four of a Kind
    if (valueCounts.includes(4)) {
        return '🎯 Four of a Kind!';
    }
    
    // Full House
    if (valueCounts.includes(3) && valueCounts.includes(2)) {
        return '🏠 Full House!';
    }
    
    // Flush
    if (isFlush) {
        return '♦️ Flush!';
    }
    
    // Straight
    if (isStraight) {
        return '📊 Straight!';
    }
    
    // Three of a Kind
    if (valueCounts.includes(3)) {
        return '🎲 Three of a Kind!';
    }
    
    // Two Pair
    if (valueCounts.filter(c => c === 2).length === 2) {
        return '👥 Two Pair!';
    }
    
    // One Pair
    if (valueCounts.includes(2)) {
        return '🎴 One Pair';
    }
    
    // High Card
    const highCard = values[values.length - 1];
    const cardName = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'][highCard - 2];
    return `🃏 High Card: ${cardName}`;
}

function checkStraight(values) {
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i + 1] - values[i] !== 1) {
            // Check for Ace-low straight (A-2-3-4-5)
            if (values[0] === 2 && values[4] === 14) {
                return values[1] === 3 && values[2] === 4 && values[3] === 5;
            }
            return false;
        }
    }
    return true;
}

function getValueCounts(values) {
    const counts = {};
    values.forEach(v => counts[v] = (counts[v] || 0) + 1);
    return Object.values(counts);
}

// Draw initial hand
drawHand();

console.log('🃏 Poker Hand Evaluator Ready');
