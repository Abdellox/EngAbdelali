/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function encode() {
    const input = document.getElementById('input').value;
    
    if (!input) {
        alert('Please enter text to encode!');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('output').value = encoded;
    } catch (e) {
        alert('Encoding failed! Please check your input.');
    }
}

function decode() {
    const input = document.getElementById('input').value;
    
    if (!input) {
        alert('Please enter Base64 text to decode!');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('output').value = decoded;
    } catch (e) {
        alert('Invalid Base64 string! Please check your input.');
    }
}

function swap() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    
    const temp = input.value;
    input.value = output.value;
    output.value = temp;
}

function copy() {
    const output = document.getElementById('output');
    
    if (!output.value) {
        alert('Nothing to copy! Encode or decode first.');
        return;
    }
    
    output.select();
    output.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        showFeedback('Copied to clipboard!');
    } catch (err) {
        navigator.clipboard.writeText(output.value).then(() => {
            showFeedback('Copied to clipboard!');
        });
    }
}

function clear() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ed573;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

console.log('Base64 Tool - Built by Abdel Ali');
