/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const generateBtn = document.getElementById('generateBtn');
const inputField = document.getElementById('input');

generateBtn.addEventListener('click', generateAllHashes);

// Auto-generate on input
inputField.addEventListener('input', debounce(generateAllHashes, 500));

async function generateAllHashes() {
    const input = inputField.value;
    
    if (!input) {
        clearAllHashes();
        return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    try {
        // Generate MD5 (simulated - browser doesn't have native MD5)
        document.getElementById('md5').value = await generateSimpleMD5(input);
        
        // Generate SHA hashes using Web Crypto API
        document.getElementById('sha1').value = await generateHash(input, 'SHA-1');
        document.getElementById('sha256').value = await generateHash(input, 'SHA-256');
        document.getElementById('sha384').value = await generateHash(input, 'SHA-384');
        document.getElementById('sha512').value = await generateHash(input, 'SHA-512');
    } catch (error) {
        alert('Error generating hashes: ' + error.message);
    }

    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate All Hashes';
}

async function generateHash(text, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple MD5-like hash (not cryptographically secure, just for demo)
async function generateSimpleMD5(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    // Convert to hex and pad to 32 characters (MD5 length)
    const hex = Math.abs(hash).toString(16);
    return hex.padStart(32, '0').substring(0, 32);
}

function copyHash(id) {
    const input = document.getElementById(id);
    
    if (!input.value) {
        alert('Generate hash first!');
        return;
    }

    input.select();
    input.setSelectionRange(0, 99999); // For mobile

    try {
        document.execCommand('copy');
        showCopyFeedback(id);
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(input.value).then(() => {
            showCopyFeedback(id);
        });
    }
}

function showCopyFeedback(id) {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = '#2ed573';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function clearAllHashes() {
    document.getElementById('md5').value = '';
    document.getElementById('sha1').value = '';
    document.getElementById('sha256').value = '';
    document.getElementById('sha384').value = '';
    document.getElementById('sha512').value = '';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('Hash Generator - Built by Abdel Ali');
