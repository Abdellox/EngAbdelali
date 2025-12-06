/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function generate() {
    const palette = document.getElementById('palette');
    palette.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const color = generateColor();
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.background = color;
        colorBox.innerHTML = `
            <div class="color-info">
                <div class="color-code">${color}</div>
                <button class="btn-copy-color" onclick="copyColor('${color}')">Copy</button>
            </div>
        `;
        palette.appendChild(colorBox);
    }
}

function copyColor(color) {
    navigator.clipboard.writeText(color).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#2ed573';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// Generate initial palette
generate();

console.log('Color Palette Generator - Built by Abdel Ali');
