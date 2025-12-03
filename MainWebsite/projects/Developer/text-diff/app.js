/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    
    if (!text1 && !text2) {
        alert('Please enter text in both fields!');
        return;
    }
    
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    let result1 = '';
    let result2 = '';
    let additions = 0;
    let deletions = 0;
    let unchanged = 0;
    
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 === line2) {
            result1 += `<div class="line same">${escapeHtml(line1) || '&nbsp;'}</div>`;
            result2 += `<div class="line same">${escapeHtml(line2) || '&nbsp;'}</div>`;
            unchanged++;
        } else {
            if (line1) {
                result1 += `<div class="line removed">- ${escapeHtml(line1)}</div>`;
                deletions++;
            } else {
                result1 += `<div class="line empty">&nbsp;</div>`;
            }
            
            if (line2) {
                result2 += `<div class="line added">+ ${escapeHtml(line2)}</div>`;
                additions++;
            } else {
                result2 += `<div class="line empty">&nbsp;</div>`;
            }
        }
    }
    
    document.getElementById('result1').innerHTML = result1;
    document.getElementById('result2').innerHTML = result2;
    
    document.getElementById('stats').innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Additions:</span>
            <span class="stat-value added">${additions}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Deletions:</span>
            <span class="stat-value removed">${deletions}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Unchanged:</span>
            <span class="stat-value">${unchanged}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Total Changes:</span>
            <span class="stat-value">${additions + deletions}</span>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function swapTexts() {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const temp = text1.value;
    text1.value = text2.value;
    text2.value = temp;
}

function clearAll() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';
    document.getElementById('result1').innerHTML = '';
    document.getElementById('result2').innerHTML = '';
    document.getElementById('stats').innerHTML = '';
}

console.log('Text Diff Checker - Built by Abdel Ali');
