/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const rInput = document.getElementById('r');
const gInput = document.getElementById('g');
const bInput = document.getElementById('b');
const hexInput = document.getElementById('hexInput');
const hexResult = document.getElementById('hexResult');
const rgbResult = document.getElementById('rgbResult');
const colorPreview = document.getElementById('colorPreview');
const colorPicker = document.getElementById('colorPicker');
const hslValue = document.getElementById('hslValue');
const cmykValue = document.getElementById('cmykValue');

// Event listeners
rInput.addEventListener('input', rgbToHex);
gInput.addEventListener('input', rgbToHex);
bInput.addEventListener('input', rgbToHex);
hexInput.addEventListener('input', hexToRgb);
colorPicker.addEventListener('input', handleColorPicker);

function rgbToHex() {
    let r = parseInt(rInput.value) || 0;
    let g = parseInt(gInput.value) || 0;
    let b = parseInt(bInput.value) || 0;

    // Clamp values
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    const hex = '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');

    hexResult.value = hex.toUpperCase();
    colorPreview.style.background = hex;
    colorPicker.value = hex;
    updateColorInfo(r, g, b);
}

function hexToRgb() {
    let hex = hexInput.value.trim();
    
    // Add # if missing
    if (!hex.startsWith('#')) {
        hex = '#' + hex;
    }

    // Validate hex
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexRegex.test(hex)) {
        return;
    }

    // Convert 3-digit hex to 6-digit
    if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    rInput.value = r;
    gInput.value = g;
    bInput.value = b;

    rgbResult.value = `rgb(${r}, ${g}, ${b})`;
    colorPreview.style.background = hex;
    colorPicker.value = hex;
    updateColorInfo(r, g, b);
}

function handleColorPicker() {
    const hex = colorPicker.value;
    hexInput.value = hex;
    hexToRgb();
}

function applyPreset(hex) {
    hexInput.value = hex;
    hexToRgb();
}

function updateColorInfo(r, g, b) {
    // Calculate HSL
    const hsl = rgbToHsl(r, g, b);
    hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    // Calculate CMYK
    const cmyk = rgbToCmyk(r, g, b);
    cmykValue.textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

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

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function copyHex() {
    hexResult.select();
    document.execCommand('copy');
    showFeedback('Hex copied!');
}

function copyRgb() {
    rgbResult.select();
    document.execCommand('copy');
    showFeedback('RGB copied!');
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ed573;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
    `;
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
}

// Initialize
rgbToHex();

console.log('RGB/Hex Converter - Built by Abdel Ali');
