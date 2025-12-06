/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function pickNumbers() {
    const count = parseInt(document.getElementById('count').value);
    const max = parseInt(document.getElementById('max').value);
    const numbersDiv = document.getElementById('numbers');
    
    if (count > max) {
        alert('Count cannot be greater than max number!');
        return;
    }
    
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max) + 1);
    }
    
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    numbersDiv.innerHTML = sorted.map(n => `<div class="number">${n}</div>`).join('');
}

console.log('Lottery Picker - Built by Abdel Ali');
