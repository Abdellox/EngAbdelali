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
        document.getElementById('fileSize').textContent = (selectedFile.size / 1024).toFixed(2) + ' KB';
    }
});

function extractZip() {
    if (!selectedFile) {
        alert('Please select a ZIP file');
        return;
    }
    
    if (!selectedFile.name.endsWith('.zip')) {
        alert('Please select a valid ZIP file');
        return;
    }
    
    alert('ZIP extraction requires a backend service or library like JSZip. This is a demo interface.');
    
    document.getElementById('result').innerHTML = `
        <h3>Extraction Preview</h3>
        <p>In a full implementation, this would extract:</p>
        <ul>
            <li>file1.txt</li>
            <li>file2.jpg</li>
            <li>folder/file3.pdf</li>
        </ul>
    `;
}

console.log('ZIP Extractor - Built by Abdel Ali');
