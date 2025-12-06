/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];
let credits = 100;

function spin() {
    if (credits < 10) {
        alert('Not enough credits!');
        return;
    }
    
    credits -= 10;
    document.getElementById('credits').textContent = credits;
    
    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];
    
    document.getElementById('reel1').textContent = reel1;
    document.getElementById('reel2').textContent = reel2;
    document.getElementById('reel3').textContent = reel3;
    
    if (reel1 === reel2 && reel2 === reel3) {
        credits += 100;
        document.getElementById('result').textContent = '🎉 JACKPOT! +100 credits';
        document.getElementById('result').style.color = '#28a745';
    } else if (reel1 === reel2 || reel2 === reel3) {
        credits += 20;
        document.getElementById('result').textContent = '✨ Match! +20 credits';
        document.getElementById('result').style.color = '#667eea';
    } else {
        document.getElementById('result').textContent = 'Try again!';
        document.getElementById('result').style.color = '#dc3545';
    }
    
    document.getElementById('credits').textContent = credits;
}

console.log('Slot Machine - Built by Abdel Ali');
