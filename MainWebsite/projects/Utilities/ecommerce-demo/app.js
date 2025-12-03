/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let cartCount = 0;
const cartElement = document.querySelector('.cart');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartElement.textContent = `🛒 Cart (${cartCount})`;
        button.textContent = 'Added!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = '#6366f1';
        }, 1500);
    });
});

console.log('E-Commerce Demo - Built by Abdel Ali');
