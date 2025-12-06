/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let selectedImage = null;

document.getElementById('imageInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('preview').innerHTML = `
                <img src="${e.target.result}" style="max-width: 100%; border-radius: 10px;">
                <p>Original size: ${(file.size / 1024).toFixed(2)} KB</p>
            `;
        };
        reader.readAsDataURL(file);
    }
});

function compressImage() {
    if (!selectedImage) {
        alert('Please select an image first');
        return;
    }
    
    const quality = document.getElementById('quality').value / 100;
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                document.getElementById('result').innerHTML = `
                    <h3>Compressed Image</h3>
                    <img src="${url}" style="max-width: 100%; border-radius: 10px;">
                    <p>Compressed size: ${(blob.size / 1024).toFixed(2)} KB</p>
                    <a href="${url}" download="compressed.jpg" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Download</a>
                `;
            }, 'image/jpeg', quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(selectedImage);
}

console.log('Image Compressor - Built by Abdel Ali');
