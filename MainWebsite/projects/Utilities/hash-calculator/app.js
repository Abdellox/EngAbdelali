/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

async function calculateHash() {
    const text = document.getElementById('input').value;
    const result = document.getElementById('result');
    
    if (!text) {
        result.innerHTML = '<p style="text-align:center;color:#999;">Enter text to calculate hash</p>';
        return;
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Simple hash function (not cryptographic)
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    result.innerHTML = `
        <div class="hash-item">
            <strong>Simple Hash:</strong>
            ${Math.abs(hash).toString(16)}
        </div>
        <div class="hash-item">
            <strong>Length:</strong>
            ${text.length} characters
        </div>
        <div class="hash-item">
            <strong>Note:</strong>
            This is a simple hash function for demonstration. For cryptographic purposes, use Web Crypto API with SHA-256 or similar.
        </div>
    `;
}

console.log('Hash Calculator - Built by Abdel Ali');
