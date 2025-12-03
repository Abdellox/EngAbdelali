/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function validateEmail() {
    const email = document.getElementById('emailInput').value.trim();
    const result = document.getElementById('result');
    
    if (!email) {
        result.className = '';
        result.innerHTML = '';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (isValid) {
        result.className = 'valid';
        result.innerHTML = '✓ Valid email address';
    } else {
        result.className = 'invalid';
        result.innerHTML = '✗ Invalid email address';
    }
}

console.log('Email Validator - Built by Abdel Ali');
