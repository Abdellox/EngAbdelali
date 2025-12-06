/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function compareDiff() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const result = document.getElementById('result');
    
    if (!text1 && !text2) {
        result.innerHTML = '<p style="text-align:center;color:#999;">Enter text in both panels to compare</p>';
        return;
    }
    
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    let html = '';
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 === line2) {
            html += `<div class="diff-line unchanged">  ${line1 || '(empty)'}</div>`;
        } else {
            if (line1) html += `<div class="diff-line removed">- ${line1}</div>`;
            if (line2) html += `<div class="diff-line added">+ ${line2}</div>`;
        }
    }
    
    result.innerHTML = html || '<p style="text-align:center;color:#999;">No differences found</p>';
}

function clearAll() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';
    document.getElementById('result').innerHTML = '<p style="text-align:center;color:#999;">Enter text in both panels to compare</p>';
}

console.log('Diff Checker - Built by Abdel Ali');
