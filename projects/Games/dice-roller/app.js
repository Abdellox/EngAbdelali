// Dice Roller - Full Implementation
let rolls = [];
let isRolling = false;

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function roll() {
    if (isRolling) return;
    
    isRolling = true;
    const diceEl = document.getElementById('dice');
    
    // Animate rolling
    let count = 0;
    const rollInterval = setInterval(() => {
        const randomFace = diceFaces[Math.floor(Math.random() * 6)];
        diceEl.textContent = randomFace;
        diceEl.style.transform = `rotate(${count * 90}deg) scale(${1 + Math.sin(count) * 0.2})`;
        count++;
        
        if (count > 10) {
            clearInterval(rollInterval);
            finalRoll();
        }
    }, 100);
}

function finalRoll() {
    const num = Math.floor(Math.random() * 6) + 1;
    const diceEl = document.getElementById('dice');
    
    diceEl.textContent = diceFaces[num - 1];
    diceEl.style.transform = 'rotate(0deg) scale(1)';
    
    rolls.unshift(num);
    if (rolls.length > 10) rolls.pop();
    
    updateHistory();
    updateStats();
    
    isRolling = false;
}

function updateHistory() {
    const historyEl = document.getElementById('history');
    historyEl.innerHTML = rolls.map(r => `<span class="roll-item">${r}</span>`).join('');
}

function updateStats() {
    const total = rolls.reduce((sum, r) => sum + r, 0);
    const avg = rolls.length > 0 ? (total / rolls.length).toFixed(2) : 0;
    console.log(`Total rolls: ${rolls.length}, Average: ${avg}`);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        roll();
    }
});

console.log('🎲 Dice Roller Ready');
