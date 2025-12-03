/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const urlDatabase = {};

function generateShortCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function shortenURL() {
    const longURL = document.getElementById('longURL').value;
    
    if (!longURL) {
        alert('Please enter a URL!');
        return;
    }
    
    if (!longURL.startsWith('http://') && !longURL.startsWith('https://')) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
    }
    
    const shortCode = generateShortCode();
    const shortURL = `https://short.url/${shortCode}`;
    
    urlDatabase[shortCode] = longURL;
    
    document.getElementById('shortURL').value = shortURL;
    document.getElementById('result').style.display = 'block';
    
    addToHistory(longURL, shortURL);
}

function copyShortURL() {
    const shortURL = document.getElementById('shortURL');
    shortURL.select();
    document.execCommand('copy');
    alert('Short URL copied to clipboard!');
}

function addToHistory(longURL, shortURL) {
    const history = document.getElementById('history');
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
        <div><strong>Short:</strong> ${shortURL}</div>
        <div><strong>Original:</strong> ${longURL}</div>
    `;
    history.insertBefore(item, history.firstChild);
}

function clearForm() {
    document.getElementById('longURL').value = '';
    document.getElementById('shortURL').value = '';
    document.getElementById('result').style.display = 'none';
}

console.log('URL Shortener - Built by Abdel Ali');
