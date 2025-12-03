function generateQR() {
    const text = document.getElementById('qrText').value.trim();
    
    if (!text) {
        alert('Please enter text or URL!');
        return;
    }
    
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');
    const size = 300;
    
    canvas.width = size;
    canvas.height = size;
    
    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Generate pattern based on text
    const gridSize = 25;
    const cellSize = size / gridSize;
    
    ctx.fillStyle = 'black';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const index = (i * gridSize + j) % text.length;
            const charCode = text.charCodeAt(index);
            
            if ((charCode + i + j) % 2 === 0) {
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
    
    // Draw corner markers
    drawCornerMarker(ctx, 0, 0, cellSize);
    drawCornerMarker(ctx, size - cellSize * 7, 0, cellSize);
    drawCornerMarker(ctx, 0, size - cellSize * 7, cellSize);
}

function drawCornerMarker(ctx, x, y, cellSize) {
    // Outer square
    ctx.fillRect(x, y, cellSize * 7, cellSize * 7);
    
    // Inner white square
    ctx.fillStyle = 'white';
    ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
    
    // Center black square
    ctx.fillStyle = 'black';
    ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
}

function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    
    if (canvas.width === 0) {
        alert('Generate a QR code first!');
        return;
    }
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}
