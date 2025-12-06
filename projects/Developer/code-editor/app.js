/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let currentTab = 'html';

function switchTab(tab) {
    currentTab = tab;
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    
    document.querySelectorAll('.code-area').forEach(area => area.style.display = 'none');
    document.getElementById(tab + 'Code').style.display = 'block';
}

function runCode() {
    const html = document.getElementById('htmlCode').value;
    const css = document.getElementById('cssCode').value;
    const js = document.getElementById('jsCode').value;
    
    const output = document.getElementById('output');
    const doc = output.contentDocument || output.contentWindow.document;
    
    const code = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;
    
    doc.open();
    doc.write(code);
    doc.close();
}

// Auto-run on input
document.getElementById('htmlCode').addEventListener('input', runCode);
document.getElementById('cssCode').addEventListener('input', runCode);
document.getElementById('jsCode').addEventListener('input', runCode);

// Set default code
document.getElementById('htmlCode').value = '<h1>Hello World!</h1>\n<p>Start coding...</p>';
document.getElementById('cssCode').value = 'body {\n  font-family: Arial;\n  padding: 20px;\n}\n\nh1 {\n  color: #667eea;\n}';
document.getElementById('jsCode').value = '// JavaScript code here\nconsole.log("Hello!");';

runCode();

console.log('Code Editor - Built by Abdel Ali');
