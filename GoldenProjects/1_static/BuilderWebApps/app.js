const form = document.getElementById('cloneForm');
const cloneBtn = document.getElementById('cloneBtn');
const resultDiv = document.getElementById('result');
const previewDiv = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const previewFrame = document.getElementById('previewFrame');
const closePreview = document.getElementById('closePreview');

let clonedFiles = null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btnText = cloneBtn.querySelector('.btn-text');
    const loader = cloneBtn.querySelector('.loader');
    
    btnText.textContent = 'Cloning website...';
    loader.style.display = 'inline-block';
    cloneBtn.disabled = true;
    
    // Hide previous results
    resultDiv.style.display = 'none';
    previewDiv.style.display = 'none';
    
    const websiteUrl = document.getElementById('websiteUrl').value.trim();
    
    if (!websiteUrl) {
        alert('Please enter a website URL');
        btnText.textContent = 'Clone Website';
        loader.style.display = 'none';
        cloneBtn.disabled = false;
        return;
    }
    
    try {
        const response = await fetch('/api/clone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: websiteUrl })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to clone website');
        }
        
        clonedFiles = await response.json();
        
        // Show results
        resultDiv.style.display = 'block';
        previewDiv.style.display = 'block';
        
        // Load preview
        const blob = new Blob([clonedFiles.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;
        
        // Scroll to results
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Clone error:', error);
    } finally {
        btnText.textContent = 'Clone Website';
        loader.style.display = 'none';
        cloneBtn.disabled = false;
    }
});

downloadBtn.addEventListener('click', async () => {
    if (!clonedFiles) return;
    
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Preparing download...';
    
    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clonedFiles)
        });
        
        if (!response.ok) throw new Error('Download failed');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cloned-website.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
    } catch (error) {
        alert('Error downloading: ' + error.message);
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = '📦 Download ZIP';
    }
});

closePreview.addEventListener('click', () => {
    previewDiv.style.display = 'none';
});
