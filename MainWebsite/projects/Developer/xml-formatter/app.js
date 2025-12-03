/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function formatXML() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    if (!input.trim()) {
        output.value = 'Please enter XML to format';
        return;
    }
    
    try {
        const formatted = input
            .replace(/>\s*</g, '>\n<')
            .split('\n')
            .map((line, i, arr) => {
                let indent = 0;
                for (let j = 0; j < i; j++) {
                    if (arr[j].match(/<[^\/][^>]*[^\/]>$/)) indent++;
                    if (arr[j].match(/<\/[^>]+>$/)) indent--;
                }
                return '  '.repeat(Math.max(0, indent)) + line.trim();
            })
            .join('\n');
        
        output.value = formatted;
    } catch (e) {
        output.value = 'Error formatting XML: ' + e.message;
    }
}

function minifyXML() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output');
    
    if (!input.trim()) {
        output.value = 'Please enter XML to minify';
        return;
    }
    
    output.value = input.replace(/>\s+</g, '><').trim();
}

function copyOutput() {
    const output = document.getElementById('output');
    output.select();
    navigator.clipboard.writeText(output.value);
    alert('Copied to clipboard!');
}

console.log('XML Formatter - Built by Abdel Ali');
