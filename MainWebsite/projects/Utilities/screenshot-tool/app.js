/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

async function captureScreen() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        
        setTimeout(() => {
            const canvas = document.getElementById('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            
            stream.getTracks().forEach(track => track.stop());
            
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            document.getElementById('preview').innerHTML = '';
            document.getElementById('preview').appendChild(img);
            document.getElementById('downloadBtn').style.display = 'block';
        }, 100);
    } catch (e) {
        alert('Screen capture not supported or denied');
    }
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = canvas.toDataURL();
    link.click();
}
