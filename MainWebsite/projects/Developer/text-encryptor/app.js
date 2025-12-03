/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const inputText = document.getElementById('inputText');
const password = document.getElementById('password');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const copyBtn = document.getElementById('copyBtn');

encryptBtn.addEventListener('click', encrypt);
decryptBtn.addEventListener('click', decrypt);
copyBtn.addEventListener('click', copyToClipboard);

function encrypt() {
    const text = inputText.value;
    const pass = password.value;
    
    if (!text) {
        alert('Please enter text to encrypt!');
        return;
    }
    
    if (!pass) {
        alert('Please enter a password!');
        return;
    }
    
    const encrypted = btoa(xorEncrypt(text, pass));
    outputText.value = encrypted;
}

function decrypt() {
    const text = inputText.value;
    const pass = password.value;
    
    if (!text) {
        alert('Please enter text to decrypt!');
        return;
    }
    
    if (!pass) {
        alert('Please enter a password!');
        return;
    }
    
    try {
        const decrypted = xorEncrypt(atob(text), pass);
        outputText.value = decrypted;
    } catch (e) {
        alert('Decryption failed! Invalid encrypted text or wrong password.');
    }
}

function xorEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}

function copyToClipboard() {
    if (!outputText.value) {
        alert('Nothing to copy!');
        return;
    }
    
    outputText.select();
    document.execCommand('copy');
    
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    copyBtn.style.background = '#2ed573';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

console.log('Text Encryptor - Built by Abdel Ali');
