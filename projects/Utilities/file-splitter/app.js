/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let selectedFile = null;

document.getElementById('fileInput').addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        document.getElementById('fileName').textContent = selectedFile.name;
        document.getElementById('fileSize').textContent = (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB';
    }
});

function splitFile() {
    if (!selectedFile) {
        alert('Please select a file first');
        return;
    }
    
    const chunkSize = parseInt(document.getElementById('chunkSize').value) * 1024 * 1024;
    const chunks = Math.ceil(selectedFile.size / chunkSize);
    
    document.getElementById('result').innerHTML = `
        <h3>File Split Info</h3>
        <p>Total chunks: ${chunks}</p>
        <p>Chunk size: ${(chunkSize / 1024 / 1024).toFixed(2)} MB</p>
        <p class="note">Note: Actual file splitting requires backend processing. This is a demo interface.</p>
    `;
}

console.log('File Splitter - Built by Abdel Ali');
