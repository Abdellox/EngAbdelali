/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let rolls = [];
let isRolling = false;
let rollCount = 0;

const diceFaces = {
    1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅'
};

const dicePatterns = {
    1: [[0,0,0],[0,1,0],[0,0,0]],
    2: [[1,0,0],[0,0,0],[0,0,1]],
    3: [[1,0,0],[0,1,0],[0,0,1]],
    4: [[1,0,1],[0,0,0],[1,0,1]],
    5: [[1,0,1],[0,1,0],[1,0,1]],
    6: [[1,0,1],[1,0,1],[1,0,1]]
};

function rollDice() {
    if (isRolling) return;
    
    isRolling = true;
    const diceContainer = document.getElementById('diceContainer');
    const resultDisplay = document.getElementById('result');
    
    // Add rolling animation class
    diceContainer.classList.add('rolling');
    resultDisplay.textContent = 'Rolling...';
    
    // Animate rolling for 2 seconds
    let animationCount = 0;
    const rollAnimation = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        updateDiceDisplay(randomNum);
        animationCount++;
        
        if (animationCount > 20) {
            clearInterval(rollAnimation);
            finishRoll();
        }
    }, 100);
}

function finishRoll() {
    const finalNumber = Math.floor(Math.random() * 6) + 1;
    const diceContainer = document.getElementById('diceContainer');
    const resultDisplay = document.getElementById('result');
    
    // Remove rolling animation
    diceContainer.classList.remove('rolling');
    
    // Update display with final result
    updateDiceDisplay(finalNumber);
    resultDisplay.textContent = `You rolled: ${finalNumber}`;
    resultDisplay.className = `result result-${finalNumber}`;
    
    // Add to history
    rolls.unshift(finalNumber);
    rollCount++;
    
    // Keep only last 20 rolls
    if (rolls.length > 20) {
        rolls.pop();
    }
    
    updateHistory();
    updateStatistics();
    
    // Add celebration for lucky numbers
    if (finalNumber === 6) {
        createCelebration('🎉 Lucky Six! 🎉');
    }
    
    isRolling = false;
}

function updateDiceDisplay(number) {
    const diceElement = document.getElementById('dice');
    diceElement.innerHTML = '';
    
    const pattern = dicePatterns[number];
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const dot = document.createElement('div');
            dot.className = 'dice-dot';
            if (pattern[row][col] === 1) {
                dot.classList.add('active');
            }
            diceElement.appendChild(dot);
        }
    }
    
    // Also show emoji version
    document.getElementById('diceEmoji').textContent = diceFaces[number];
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = rolls.map((roll, index) => 
        `<span class="roll-item ${index === 0 ? 'latest' : ''}">${roll}</span>`
    ).join('');
}

function updateStatistics() {
    if (rolls.length === 0) return;
    
    const total = rolls.reduce((sum, roll) => sum + roll, 0);
    const average = (total / rolls.length).toFixed(2);
    const highest = Math.max(...rolls);
    const lowest = Math.min(...rolls);
    
    // Count frequency of each number
    const frequency = {};
    for (let i = 1; i <= 6; i++) {
        frequency[i] = rolls.filter(roll => roll === i).length;
    }
    
    // Update statistics display
    document.getElementById('totalRolls').textContent = rollCount;
    document.getElementById('average').textContent = average;
    document.getElementById('highest').textContent = highest;
    document.getElementById('lowest').textContent = lowest;
    
    // Update frequency chart
    updateFrequencyChart(frequency);
}

function updateFrequencyChart(frequency) {
    const chartContainer = document.getElementById('frequencyChart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '';
    
    const maxCount = Math.max(...Object.values(frequency));
    
    for (let i = 1; i <= 6; i++) {
        const bar = document.createElement('div');
        bar.className = 'frequency-bar';
        
        const height = maxCount > 0 ? (frequency[i] / maxCount) * 100 : 0;
        bar.innerHTML = `
            <div class="bar-fill" style="height: ${height}%"></div>
            <div class="bar-label">${i}</div>
            <div class="bar-count">${frequency[i]}</div>
        `;
        
        chartContainer.appendChild(bar);
    }
}

function createCelebration(message) {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.textContent = message;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 3000);
    
    // Add confetti effect
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 100);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.textContent = ['🎲', '⭐', '✨', '🎉'][Math.floor(Math.random() * 4)];
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

function resetStats() {
    if (confirm('Reset all statistics?')) {
        rolls = [];
        rollCount = 0;
        document.getElementById('history').innerHTML = '';
        document.getElementById('totalRolls').textContent = '0';
        document.getElementById('average').textContent = '0';
        document.getElementById('highest').textContent = '-';
        document.getElementById('lowest').textContent = '-';
        document.getElementById('frequencyChart').innerHTML = '';
        document.getElementById('result').textContent = 'Click Roll Dice to start!';
        document.getElementById('result').className = 'result';
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        rollDice();
    } else if (e.key === 'r' || e.key === 'R') {
        resetStats();
    }
});

// Initialize display
updateDiceDisplay(1);

console.log('🎲 Enhanced Dice Roller Ready');