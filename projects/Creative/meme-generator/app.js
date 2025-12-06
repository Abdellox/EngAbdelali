/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

// Popular meme templates
const memes = [
    'https://i.imgflip.com/30b1gx.jpg',  // Distracted Boyfriend
    'https://i.imgflip.com/1bij.jpg',     // One Does Not Simply
    'https://i.imgflip.com/1g8my4.jpg',   // Drake Hotline Bling
    'https://i.imgflip.com/26am.jpg',     // Surprised Pikachu
    'https://i.imgflip.com/2fm6x.jpg',    // Expanding Brain
    'https://i.imgflip.com/1ur9b0.jpg',   // Two Buttons
    'https://i.imgflip.com/1ihzfe.jpg',   // Disaster Girl
    'https://i.imgflip.com/9ehk.jpg',     // Success Kid
    'https://i.imgflip.com/1otk96.jpg',   // Change My Mind
    'https://i.imgflip.com/1c1uej.jpg'    // Leonardo Dicaprio Cheers
];

let currentMeme = 0;

// Load random meme on start
function randomMeme() {
    currentMeme = Math.floor(Math.random() * memes.length);
    document.getElementById('memeImage').src = memes[currentMeme];
}

// Update top text
document.getElementById('topInput').addEventListener('input', (e) => {
    const text = e.target.value || 'TOP TEXT';
    document.getElementById('topText').textContent = text.toUpperCase();
});

// Update bottom text
document.getElementById('bottomInput').addEventListener('input', (e) => {
    const text = e.target.value || 'BOTTOM TEXT';
    document.getElementById('bottomText').textContent = text.toUpperCase();
});

// Download meme
function downloadMeme() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('memeImage');
    
    // Wait for image to load
    if (!img.complete || !img.src) {
        alert('Please wait for the meme to load!');
        return;
    }
    
    // Set canvas size to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // Draw image
    ctx.drawImage(img, 0, 0);
    
    // Set text style
    const fontSize = canvas.width / 15;
    ctx.font = `bold ${fontSize}px Impact, sans-serif`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Draw top text
    const topText = document.getElementById('topText').textContent;
    const topY = fontSize / 2;
    ctx.strokeText(topText, canvas.width / 2, topY);
    ctx.fillText(topText, canvas.width / 2, topY);
    
    // Draw bottom text
    const bottomText = document.getElementById('bottomText').textContent;
    const bottomY = canvas.height - fontSize * 1.5;
    ctx.strokeText(bottomText, canvas.width / 2, bottomY);
    ctx.fillText(bottomText, canvas.width / 2, bottomY);
    
    // Download
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Initialize with random meme
randomMeme();
