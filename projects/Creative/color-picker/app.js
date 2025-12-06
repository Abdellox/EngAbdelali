/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const colorInput = document.getElementById('colorInput');
const colorDisplay = document.getElementById('colorDisplay');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const palette = document.getElementById('palette');

colorInput.addEventListener('input', updateColor);

function updateColor() {
    const color = colorInput.value;
    colorDisplay.style.background = color;
    
    hexValue.value = color.toUpperCase();
    rgbValue.value = hexToRgb(color);
    hslValue.value = hexToHsl(color);
    
    generatePalette(color);
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function generatePalette(baseColor) {
    const variations = [
        { name: 'Lighter', factor: 1.3 },
        { name: 'Light', factor: 1.15 },
        { name: 'Base', factor: 1 },
        { name: 'Dark', factor: 0.85 },
        { name: 'Darker', factor: 0.7 }
    ];
    
    palette.innerHTML = variations.map(v => {
        const color = adjustColor(baseColor, v.factor);
        return `
            <div class="palette-item" style="background: ${color}" onclick="selectColor('${color}')">
                <span>${v.name}</span>
            </div>
        `;
    }).join('');
}

function adjustColor(hex, factor) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    r = Math.min(255, Math.round(r * factor));
    g = Math.min(255, Math.round(g * factor));
    b = Math.min(255, Math.round(b * factor));
    
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function selectColor(color) {
    colorInput.value = color;
    updateColor();
}

function copyHex() {
    navigator.clipboard.writeText(hexValue.value).then(() => {
        alert('HEX color copied!');
    });
}

updateColor();

console.log('Color Picker - Built by Abdel Ali');
