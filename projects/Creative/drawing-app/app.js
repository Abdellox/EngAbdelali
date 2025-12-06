/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let currentTool = 'brush';
let currentColor = '#000000';
let currentSize = 5;

// Set canvas size
canvas.width = canvas.offsetWidth;
canvas.height = 600;

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!isDrawing) return;
    
    e.preventDefault();
    const pos = getPosition(e);
    
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (currentTool === 'brush') {
        ctx.strokeStyle = currentColor;
    } else if (currentTool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
    }
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX || e.touches[0].clientX) - rect.left,
        y: (e.clientY || e.touches[0].clientY) - rect.top
    };
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function clearCanvas() {
    if (confirm('Clear the canvas?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function saveDrawing() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Event listeners
document.getElementById('colorPicker').addEventListener('input', (e) => {
    currentColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
    currentSize = e.target.value;
    document.getElementById('sizeValue').textContent = e.target.value;
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.offsetWidth;
    ctx.putImageData(imageData, 0, 0);
});

console.log('Drawing App - Built by Abdel Ali');
