/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let gridSize = 16;
let currentColor = '#667eea';
let isDrawing = false;

const gridSizeInput = document.getElementById('gridSize');
const gridValue = document.getElementById('gridValue');
const colorPicker = document.getElementById('colorPicker');
const pixelGrid = document.getElementById('pixelGrid');

gridSizeInput.addEventListener('input', (e) => {
    gridSize = e.target.value;
    gridValue.textContent = `${gridSize}x${gridSize}`;
    createGrid();
});

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

function createGrid() {
    pixelGrid.innerHTML = '';
    pixelGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    pixelGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.addEventListener('mousedown', () => {
            isDrawing = true;
            paintPixel(pixel);
        });
        pixel.addEventListener('mouseenter', () => {
            if (isDrawing) paintPixel(pixel);
        });
        pixel.addEventListener('touchstart', (e) => {
            e.preventDefault();
            paintPixel(pixel);
        });
        pixel.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('pixel')) {
                paintPixel(element);
            }
        });
        pixelGrid.appendChild(pixel);
    }
}

document.addEventListener('mouseup', () => {
    isDrawing = false;
});

function paintPixel(pixel) {
    pixel.style.backgroundColor = currentColor;
}

function clearGrid() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = '#ffffff';
    });
}

function fillGrid() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = currentColor;
    });
}

function downloadArt() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pixelSize = 20;
    
    canvas.width = gridSize * pixelSize;
    canvas.height = gridSize * pixelSize;
    
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel, index) => {
        const x = (index % gridSize) * pixelSize;
        const y = Math.floor(index / gridSize) * pixelSize;
        const color = pixel.style.backgroundColor || '#ffffff';
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, pixelSize, pixelSize);
    });
    
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
}

createGrid();

console.log('Pixel Art Creator - Built by Abdel Ali');
