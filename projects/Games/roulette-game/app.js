/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let credits = 100;

function placeBet(type) {
    const bet = parseInt(document.getElementById('betAmount').value) || 10;
    
    if (bet > credits) {
        alert('Not enough credits!');
        return;
    }
    
    credits -= bet;
    const number = Math.floor(Math.random() * 37); // 0-36
    const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(number);
    const isBlack = number > 0 && !isRed;
    const isEven = number > 0 && number % 2 === 0;
    const isOdd = number > 0 && number % 2 === 1;
    
    document.getElementById('result').textContent = `Number: ${number}`;
    
    let win = false;
    let payout = 0;
    
    if (type === 'red' && isRed) { win = true; payout = bet * 2; }
    else if (type === 'black' && isBlack) { win = true; payout = bet * 2; }
    else if (type === 'even' && isEven) { win = true; payout = bet * 2; }
    else if (type === 'odd' && isOdd) { win = true; payout = bet * 2; }
    
    if (win) {
        credits += payout;
        document.getElementById('message').textContent = `You won ${payout} credits!`;
        document.getElementById('message').style.color = '#28a745';
    } else {
        document.getElementById('message').textContent = `You lost ${bet} credits`;
        document.getElementById('message').style.color = '#dc3545';
    }
    
    document.getElementById('credits').textContent = credits;
}

console.log('Roulette Game - Built by Abdel Ali');
