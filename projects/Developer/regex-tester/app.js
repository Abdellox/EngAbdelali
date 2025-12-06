/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const regexInput = document.getElementById('regexInput');
const flagsInput = document.getElementById('flags');
const testString = document.getElementById('testString');
const matchResults = document.getElementById('matchResults');

regexInput.addEventListener('input', testRegex);
flagsInput.addEventListener('input', testRegex);
testString.addEventListener('input', testRegex);

function testRegex() {
    const pattern = regexInput.value;
    const flags = flagsInput.value;
    const text = testString.value;
    
    if (!pattern || !text) {
        matchResults.innerHTML = '<p class="info">Enter a regex pattern and test string to see matches.</p>';
        return;
    }
    
    try {
        const regex = new RegExp(pattern, flags);
        const matches = text.match(regex);
        
        if (matches && matches.length > 0) {
            let highlightedText = text;
            const uniqueMatches = [...new Set(matches)];
            
            uniqueMatches.forEach((match, index) => {
                const color = `hsl(${(index * 60) % 360}, 70%, 80%)`;
                highlightedText = highlightedText.replace(
                    new RegExp(escapeRegex(match), 'g'),
                    `<mark style="background: ${color}">${match}</mark>`
                );
            });
            
            matchResults.innerHTML = `
                <div class="match-count">✓ Found ${matches.length} match(es)</div>
                <div class="highlighted-text">${highlightedText}</div>
                <div class="match-list">
                    <h4>Matches:</h4>
                    ${matches.map((m, i) => `<div class="match-item">${i + 1}. "${m}"</div>`).join('')}
                </div>
            `;
        } else {
            matchResults.innerHTML = '<p class="no-match">✗ No matches found</p>';
        }
    } catch (e) {
        matchResults.innerHTML = `<p class="error">✗ Invalid regex: ${e.message}</p>`;
    }
}

function setPattern(pattern, flags) {
    regexInput.value = pattern;
    flagsInput.value = flags;
    testRegex();
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log('Regex Tester - Built by Abdel Ali');
