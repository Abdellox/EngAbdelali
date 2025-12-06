/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let colors = [
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
];

const preview = document.getElementById('preview');
const gradientType = document.getElementById('gradientType');
const direction = document.getElementById('direction');
const cssCode = document.getElementById('cssCode');
const colorStops = document.getElementById('colorStops');
const addColorBtn = document.getElementById('addColorBtn');

// Event listeners
gradientType.addEventListener('change', updateGradient);
direction.addEventListener('change', updateGradient);
addColorBtn.addEventListener('click', addColor);

function renderColorStops() {
    colorStops.innerHTML = colors.map((stop, index) => `
        <div class="color-stop">
            <input type="color" value="${stop.color}" onchange="updateColor(${index}, this.value)">
            <input type="range" min="0" max="100" value="${stop.position}" oninput="updatePosition(${index}, this.value)">
            <span>${stop.position}%</span>
            ${colors.length > 2 ? `<button class="btn-remove" onclick="removeColor(${index})">✕</button>` : ''}
        </div>
    `).join('');
}

function addColor() {
    colors.push({
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        position: 50
    });
    renderColorStops();
    updateGradient();
}

function removeColor(index) {
    if (colors.length > 2) {
        colors.splice(index, 1);
        renderColorStops();
        updateGradient();
    }
}

function updateColor(index, color) {
    colors[index].color = color;
    updateGradient();
}

function updatePosition(index, position) {
    colors[index].position = parseInt(position);
    renderColorStops();
    updateGradient();
}

function updateGradient() {
    const type = gradientType.value;
    const dir = direction.value;
    
    // Sort colors by position
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorString = sortedColors.map(c => `${c.color} ${c.position}%`).join(', ');
    
    let gradient;
    if (type === 'linear') {
        gradient = `linear-gradient(${dir}, ${colorString})`;
    } else {
        gradient = `radial-gradient(circle, ${colorString})`;
    }
    
    preview.style.background = gradient;
    
    cssCode.value = `background: ${gradient};`;
}

function applyPreset(preset) {
    const presets = {
        sunset: [
            { color: '#ff6b6b', position: 0 },
            { color: '#feca57', position: 50 },
            { color: '#ee5a6f', position: 100 }
        ],
        ocean: [
            { color: '#2e86de', position: 0 },
            { color: '#54a0ff', position: 50 },
            { color: '#48dbfb', position: 100 }
        ],
        forest: [
            { color: '#26de81', position: 0 },
            { color: '#20bf6b', position: 50 },
            { color: '#0fb9b1', position: 100 }
        ],
        purple: [
            { color: '#667eea', position: 0 },
            { color: '#764ba2', position: 100 }
        ]
    };
    
    colors = presets[preset];
    renderColorStops();
    updateGradient();
}

function copyCode() {
    cssCode.select();
    cssCode.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        showFeedback('CSS copied to clipboard!');
    } catch (err) {
        navigator.clipboard.writeText(cssCode.value).then(() => {
            showFeedback('CSS copied to clipboard!');
        });
    }
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
renderColorStops();
updateGradient();

console.log('Gradient Generator - Built by Abdel Ali');
