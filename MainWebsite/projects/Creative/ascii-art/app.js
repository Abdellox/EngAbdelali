// ASCII Art Generator - Full Implementation

let currentImage = null;

const densityMaps = {
    simple: ' .:-=+*#%@',
    standard: ' .\':,;!~-_+<>i!lI?/\\|()1{}[]rcvunxzjftLCJUYXZO0Qoahkbdpqwm*WMB8&%$#@',
    complex: ' .",:;!~-_+<>i!lI?/\\|()1{}[]rcvunxzjftLCJUYXZO0Qoahkbdpqwm*WMB8&%$#@'
};

// Setup upload area
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');

uploadArea.addEventListener('click', () => imageInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    uploadArea.style.background = 'rgba(102, 126, 234, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.background = '#f8f9fa';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.background = '#f8f9fa';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        loadImage(file);
    }
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        loadImage(file);
    }
});

// Width slider
document.getElementById('widthSlider').addEventListener('input', (e) => {
    document.getElementById('widthValue').textContent = e.target.value;
});

function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            currentImage = img;
            uploadArea.innerHTML = `
                <div class="upload-icon">✅</div>
                <p>Image loaded: ${file.name}</p>
                <small>Click "Generate ASCII Art" to convert</small>
            `;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function generateArt() {
    if (!currentImage) {
        alert('Please upload an image first!');
        return;
    }
    
    const width = parseInt(document.getElementById('widthSlider').value);
    const densityType = document.getElementById('densitySelect').value;
    const invert = document.getElementById('invertCheck').checked;
    const density = densityMaps[densityType];
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate height to maintain aspect ratio
    const aspectRatio = currentImage.height / currentImage.width;
    const height = Math.floor(width * aspectRatio * 0.5); // 0.5 to account for character height
    
    canvas.width = width;
    canvas.height = height;
    
    // Draw image on canvas
    ctx.drawImage(currentImage, 0, 0, width, height);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    // Convert to ASCII
    let ascii = '';
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = pixels[offset];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            
            // Calculate brightness
            const brightness = (r + g + b) / 3;
            const normalizedBrightness = invert ? 255 - brightness : brightness;
            
            // Map brightness to ASCII character
            const charIndex = Math.floor((normalizedBrightness / 255) * (density.length - 1));
            ascii += density[charIndex];
        }
        ascii += '\n';
    }
    
    document.getElementById('asciiOutput').textContent = ascii;
}

function copyToClipboard() {
    const output = document.getElementById('asciiOutput');
    const text = output.textContent;
    
    if (text === 'Upload an image to get started!') {
        alert('Generate ASCII art first!');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        alert('ASCII art copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy to clipboard');
    });
}

function downloadArt() {
    const output = document.getElementById('asciiOutput');
    const text = output.textContent;
    
    if (text === 'Upload an image to get started!') {
        alert('Generate ASCII art first!');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-art.txt';
    a.click();
    URL.revokeObjectURL(url);
}

console.log('🎨 ASCII Art Generator - Fully Functional');
