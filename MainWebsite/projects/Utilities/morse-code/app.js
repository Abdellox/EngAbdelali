/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
};

const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

function textToMorse() {
    const input = document.getElementById('input').value.toUpperCase();
    const output = input.split('').map(char => morseCode[char] || char).join(' ');
    document.getElementById('output').value = output;
}

function morseToText() {
    const input = document.getElementById('input').value;
    const output = input.split(' ').map(code => reverseMorse[code] || '').join('');
    document.getElementById('output').value = output;
}

function copyOutput() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}

function swap() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const temp = input.value;
    input.value = output.value;
    output.value = temp;
}

function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
}

console.log('Morse Code Translator - Built by Abdel Ali');
