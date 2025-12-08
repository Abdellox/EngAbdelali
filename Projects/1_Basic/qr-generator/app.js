let qrcode = null;

function generateQR() {
    const text = document.getElementById('qrText').value.trim();
    
    if (!text) {
        alert('Please enter text or URL!');
        return;
    }
    
    // Clear previous QR code
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';
    
    // Generate new QR code
    qrcode = new QRCode(qrcodeDiv, {
        text: text,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download button
    document.getElementById('downloadBtn').style.display = 'block';
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    
    if (!canvas) {
        alert('Generate a QR code first!');
        return;
    }
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Enter key support
document.getElementById('qrText').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQR();
    }
});
