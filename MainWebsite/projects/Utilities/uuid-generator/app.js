/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generate() {
    const count = parseInt(document.getElementById('count').value);
    const format = document.getElementById('format').value;
    const output = document.getElementById('output');
    
    let result = '';
    for (let i = 0; i < count; i++) {
        let uuid = generateUUID();
        
        if (format === 'upper') {
            uuid = uuid.toUpperCase();
        } else if (format === 'nohyphen') {
            uuid = uuid.replace(/-/g, '');
        } else if (format === 'braces') {
            uuid = '{' + uuid + '}';
        }
        
        result += uuid + '\n';
    }
    
    output.value = result.trim();
}

function copyUUIDs() {
    const output = document.getElementById('output');
    if (!output.value) {
        alert('Generate UUIDs first!');
        return;
    }
    
    output.select();
    document.execCommand('copy');
    alert('UUIDs copied to clipboard!');
}

function clearOutput() {
    document.getElementById('output').value = '';
}

generate();
console.log('UUID Generator - Built by Abdel Ali');
