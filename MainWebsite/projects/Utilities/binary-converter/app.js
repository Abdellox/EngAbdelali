/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

function textToBinary() {
    const text = document.getElementById('textInput').value;
    
    if (!text) {
        alert('Please enter text!');
        return;
    }
    
    const binary = text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
    
    document.getElementById('binaryOutput').value = binary;
}

function binaryToText() {
    const binary = document.getElementById('binaryOutput').value;
    
    if (!binary) {
        alert('Please enter binary!');
        return;
    }
    
    try {
        const text = binary.split(' ').map(bin => {
            return String.fromCharCode(parseInt(bin, 2));
        }).join('');
        
        document.getElementById('textInput').value = text;
    } catch (e) {
        alert('Invalid binary format! Use space-separated 8-bit binary numbers.');
    }
}

function decimalToBinary() {
    const num = document.getElementById('decimalInput').value;
    
    if (!num) {
        alert('Please enter a number!');
        return;
    }
    
    const decimal = parseInt(num);
    if (isNaN(decimal)) {
        alert('Please enter a valid number!');
        return;
    }
    
    const binary = decimal.toString(2);
    const hex = decimal.toString(16).toUpperCase();
    const octal = decimal.toString(8);
    
    document.getElementById('numberResult').innerHTML = `
        <strong>Decimal:</strong> ${decimal}<br>
        <strong>Binary:</strong> ${binary}<br>
        <strong>Hexadecimal:</strong> ${hex}<br>
        <strong>Octal:</strong> ${octal}
    `;
}

function binaryToDecimal() {
    const binary = prompt('Enter binary number:');
    
    if (!binary) return;
    
    try {
        const decimal = parseInt(binary, 2);
        
        if (isNaN(decimal)) {
            alert('Invalid binary number!');
            return;
        }
        
        const hex = decimal.toString(16).toUpperCase();
        const octal = decimal.toString(8);
        
        document.getElementById('numberResult').innerHTML = `
            <strong>Binary:</strong> ${binary}<br>
            <strong>Decimal:</strong> ${decimal}<br>
            <strong>Hexadecimal:</strong> ${hex}<br>
            <strong>Octal:</strong> ${octal}
        `;
        
        document.getElementById('decimalInput').value = decimal;
    } catch (e) {
        alert('Invalid binary number!');
    }
}

console.log('Binary Converter - Built by Abdel Ali');
