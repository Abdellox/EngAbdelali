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
        output.innerHTML = `<div class="error">Error: ${e.message}</div>`;
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
        output.innerHTML = `<div class="error">Error: ${e.message}</div>`;
    }
}

function validateJSON() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    try {
        JSON.parse(input);
        output.innerHTML = '<div class="success">✓ Valid JSON!</div>';
    } catch (e) {
        output.innerHTML = `<div class="error">✗ Invalid JSON: ${e.message}</div>`;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('JSON Viewer - Built by Abdel Ali');
