let selectedFiles = [];

document.getElementById('pdfInput').addEventListener('change', (e) => {
    selectedFiles = Array.from(e.target.files);
    displayFiles();
});

function displayFiles() {
    const fileList = document.getElementById('fileList');
    if (selectedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }
    
    fileList.innerHTML = '<h3>Selected Files:</h3>' + selectedFiles.map((file, index) => `
        <div class="file-item">
            <span>📄 ${file.name}</span>
            <button onclick="removeFile(${index})" class="btn-remove">×</button>
        </div>
    `).join('');
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFiles();
}

function mergePDFs() {
    if (selectedFiles.length < 2) {
        alert('Please select at least 2 PDF files to merge!');
        return;
    }
    
    alert(`Demo: Would merge ${selectedFiles.length} PDF files. This requires a PDF library like pdf-lib in a real implementation.`);
}

console.log('📑 PDF Merger Ready');
