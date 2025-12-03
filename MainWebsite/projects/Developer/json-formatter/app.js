/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function formatJSON() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        output.innerHTML = `<pre>${escapeHtml(formatted)}</pre>`;
        output.style.color = '#333';
    } catch (e) {
        output.textContent = 'Error: ' + e.message;
        output.style.color = '#ff4757';
    }
}

function minifyJSON() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        output.innerHTML = `<pre>${escapeHtml(minified)}</pre>`;
        output.style.color = '#333';
    } catch (e) {
        output.textContent = 'Error: ' + e.message;
        output.style.color = '#ff4757';
    }
}

function validateJSON() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    try {
        JSON.parse(input);
        output.textContent = '✓ Valid JSON!';
        output.style.color = '#2ed573';
    } catch (e) {
        output.textContent = '✗ Invalid JSON: ' + e.message;
        output.style.color = '#ff4757';
    }
}

function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('output').textContent = '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('JSON Formatter - Built by Abdel Ali');
