/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function beautify() {
    const input = document.getElementById('input').value;
    const type = document.getElementById('typeSelect').value;
    const output = document.getElementById('output');
    
    if (!input.trim()) {
        alert('Please enter code to beautify!');
        return;
    }
    
    try {
        let beautified;
        
        switch(type) {
            case 'json':
                beautified = JSON.stringify(JSON.parse(input), null, 2);
                break;
            case 'html':
                beautified = formatHTML(input);
                break;
            case 'css':
                beautified = formatCSS(input);
                break;
            case 'js':
                beautified = formatJS(input);
                break;
        }
        
        output.value = beautified;
    } catch (e) {
        alert('Error: Invalid ' + type.toUpperCase() + ' code!');
    }
}

function minify() {
    const input = document.getElementById('input').value;
    const type = document.getElementById('typeSelect').value;
    const output = document.getElementById('output');
    
    if (!input.trim()) {
        alert('Please enter code to minify!');
        return;
    }
    
    try {
        let minified;
        
        switch(type) {
            case 'json':
                minified = JSON.stringify(JSON.parse(input));
                break;
            case 'html':
            case 'css':
            case 'js':
                minified = input.replace(/\s+/g, ' ').replace(/\n/g, '').trim();
                break;
        }
        
        output.value = minified;
    } catch (e) {
        alert('Error: Invalid code!');
    }
}

function formatHTML(html) {
    let formatted = '';
    let indent = 0;
    
    html.split(/>\s*</).forEach(node => {
        if (node.match(/^\/\w/)) indent--;
        formatted += '  '.repeat(indent) + '<' + node + '>\n';
        if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith('input')) indent++;
    });
    
    return formatted.substring(1, formatted.length - 2);
}

function formatCSS(css) {
    return css
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/;\s*/g, ';\n  ')
        .replace(/\s*}\s*/g, '\n}\n\n');
}

function formatJS(js) {
    return js
        .replace(/;/g, ';\n')
        .replace(/{/g, '{\n  ')
        .replace(/}/g, '\n}');
}

function copy() {
    const output = document.getElementById('output');
    if (!output.value) {
        alert('Nothing to copy!');
        return;
    }
    output.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
}

function clear() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
}

console.log('Code Beautifier - Built by Abdel Ali');
