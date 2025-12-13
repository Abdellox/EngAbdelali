// PDF.js Configuration
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Global Variables
let currentTool = null;
let uploadedFiles = [];
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let pageScale = 1.5;
let textItems = [];
let overlayCanvas = null;
let overlayCtx = null;
let modifications = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => openTool(card.dataset.tool));
    });
    document.getElementById('back-btn').addEventListener('click', closeWorkspace);
});

function openTool(toolName) {
    currentTool = toolName;
    uploadedFiles = [];
    
    const titles = {
        'edit': 'Edit PDF - Full Editor',
        'merge': 'Merge PDF Files', 'split': 'Split PDF',
        'compress': 'Compress PDF', 'pdf-to-jpg': 'PDF to JPG',
        'jpg-to-pdf': 'JPG to PDF', 'rotate': 'Rotate PDF',
        'watermark': 'Add Watermark', 'delete': 'Delete Pages'
    };
    
    document.getElementById('workspace-title').textContent = titles[toolName];
    document.getElementById('workspace').classList.remove('hidden');
    document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });
    
    if (toolName === 'edit') {
        initPDFEditor();
    } else {
        createUI(toolName);
    }
}

function closeWorkspace() {
    document.getElementById('workspace').classList.add('hidden');
    document.getElementById('workspace-content').innerHTML = '';
    uploadedFiles = [];
    modifications = {};
}

// PDF EDITOR
function initPDFEditor() {
    document.getElementById('workspace-content').innerHTML = `
        <div class="upload-area" id="upload-area">
            <div class="upload-icon">📄</div>
            <h3>Upload Your PDF to Start Editing</h3>
            <p>Click here or drag & drop your PDF file</p>
            <input type="file" id="file-input" accept=".pdf">
            <div style="margin-top:20px;font-size:14px;color:#718096">
                <strong>What you can do:</strong><br>
                ✓ Click any text to edit it<br>
                ✓ Change text color & size<br>
                ✓ Delete unwanted text<br>
                ✓ Changes appear instantly!
            </div>
        </div>
        <div id="editor-workspace" style="display:none">
            <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;padding:20px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 15px rgba(102,126,234,0.3)">
                <h3 style="margin:0 0 10px 0;font-size:20px">📝 How to Edit:</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;font-size:14px">
                    <div><strong>1️⃣ Click Text</strong><br>Click any word in the PDF</div>
                    <div><strong>2️⃣ Edit</strong><br>Change text, color, or size</div>
                    <div><strong>3️⃣ Save</strong><br>Click Save to apply changes</div>
                    <div><strong>4️⃣ Download</strong><br>Get your edited PDF!</div>
                </div>
            </div>
            <div class="editor-container">
                <div class="editor-toolbar">
                    <h4 style="margin-bottom:15px">🛠️ Editor Tools</h4>
                    <div class="toolbar-section">
                        <div style="background:#F7FAFC;padding:15px;border-radius:8px;margin-bottom:15px">
                            <p style="font-size:13px;margin:0;color:#4A5568">
                                <strong>💡 Tip:</strong> Hover over text to see it highlight, then click to edit!
                            </p>
                        </div>
                        <button class="btn btn-primary" onclick="savePDF()" style="width:100%;font-size:16px;padding:14px">
                            💾 Save Edited PDF
                        </button>
                        <div style="margin-top:10px;font-size:12px;text-align:center;color:#718096">
                            <span id="edit-count">0 edits made</span>
                        </div>
                    </div>
                </div>
                <div class="editor-canvas-area">
                    <div id="pdf-container"></div>
                    <div class="page-navigation">
                        <button class="page-nav-btn" onclick="changePage(-1)" id="prev-btn">← Previous Page</button>
                        <span id="page-info" style="font-weight:600">Page 1 of 1</span>
                        <button class="page-nav-btn" onclick="changePage(1)" id="next-btn">Next Page →</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.onclick = () => fileInput.click();
    fileInput.onchange = (e) => { if (e.target.files[0]) loadPDF(e.target.files[0]); };
    uploadArea.ondragover = (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); };
    uploadArea.ondragleave = () => uploadArea.classList.remove('dragover');
    uploadArea.ondrop = (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files[0]) loadPDF(e.dataTransfer.files[0]);
    };
}

async function loadPDF(file) {
    if (!file || file.type !== 'application/pdf') return alert('Please select a PDF');
    
    uploadedFiles = [file];
    const data = await file.arrayBuffer();
    pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    totalPages = pdfDoc.numPages;
    currentPage = 1;
    modifications = {};
    
    document.getElementById('upload-area').style.display = 'none';
    document.getElementById('editor-workspace').style.display = 'block';
    
    await renderPage();
}

async function renderPage() {
    const page = await pdfDoc.getPage(currentPage);
    
    // Calculate scale
    const containerWidth = document.getElementById('pdf-container').clientWidth || 800;
    const viewport = page.getViewport({ scale: 1 });
    pageScale = Math.min(containerWidth / viewport.width, 2);
    const scaledViewport = page.getViewport({ scale: pageScale });
    
    // Base canvas
    const baseCanvas = document.createElement('canvas');
    const baseCtx = baseCanvas.getContext('2d');
    baseCanvas.width = scaledViewport.width;
    baseCanvas.height = scaledViewport.height;
    await page.render({ canvasContext: baseCtx, viewport: scaledViewport }).promise;
    
    // Overlay canvas
    overlayCanvas = document.createElement('canvas');
    overlayCtx = overlayCanvas.getContext('2d');
    overlayCanvas.width = scaledViewport.width;
    overlayCanvas.height = scaledViewport.height;
    overlayCanvas.style.position = 'absolute';
    overlayCanvas.style.top = '0';
    overlayCanvas.style.left = '0';
    overlayCanvas.style.cursor = 'text';
    
    // Container
    const container = document.getElementById('pdf-container');
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.width = scaledViewport.width + 'px';
    container.style.height = scaledViewport.height + 'px';
    container.style.margin = '0 auto';
    container.appendChild(baseCanvas);
    container.appendChild(overlayCanvas);
    
    // Extract text
    const textContent = await page.getTextContent();
    textItems = textContent.items.map((item, idx) => {
        const tx = pdfjsLib.Util.transform(scaledViewport.transform, item.transform);
        return {
            text: item.str,
            x: tx[4],
            y: tx[5],
            width: item.width * pageScale,
            height: item.height * pageScale,
            fontSize: Math.abs(tx[0]),
            index: idx
        };
    });
    
    redrawOverlay();
    overlayCanvas.onclick = (e) => handleClick(e);
    setupHoverEffect();
    
    // Update nav
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

function redrawOverlay() {
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    const pageMods = modifications[currentPage] || {};
    
    textItems.forEach(item => {
        const mod = pageMods[item.index];
        
        if (mod && mod.deleted) {
            overlayCtx.fillStyle = 'white';
            overlayCtx.fillRect(item.x - 2, item.y - item.height - 2, item.width + 4, item.height + 4);
        } else if (mod) {
            overlayCtx.fillStyle = 'white';
            overlayCtx.fillRect(item.x - 2, item.y - item.height - 2, item.width + 100, item.height + 4);
            
            overlayCtx.fillStyle = mod.color || '#000000';
            overlayCtx.font = `${mod.fontSize || item.fontSize}px Arial`;
            overlayCtx.fillText(mod.text, item.x, item.y);
        }
    });
    
    updateEditCount();
}

function updateEditCount() {
    let totalEdits = 0;
    for (let page in modifications) {
        totalEdits += Object.keys(modifications[page]).length;
    }
    const countEl = document.getElementById('edit-count');
    if (countEl) {
        countEl.textContent = `${totalEdits} edit${totalEdits !== 1 ? 's' : ''} made`;
        countEl.style.color = totalEdits > 0 ? '#48BB78' : '#718096';
        countEl.style.fontWeight = totalEdits > 0 ? '600' : 'normal';
    }
}

function handleClick(e) {
    const rect = overlayCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let item of textItems) {
        if (x >= item.x && x <= item.x + item.width + 50 &&
            y >= item.y - item.height && y <= item.y) {
            editText(item);
            return;
        }
    }
}

// Add hover effect
function setupHoverEffect() {
    overlayCanvas.onmousemove = (e) => {
        const rect = overlayCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        let hovering = false;
        for (let item of textItems) {
            if (x >= item.x && x <= item.x + item.width + 50 &&
                y >= item.y - item.height && y <= item.y) {
                hovering = true;
                
                // Draw highlight
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = overlayCanvas.width;
                tempCanvas.height = overlayCanvas.height;
                const tempCtx = tempCanvas.getContext('2d');
                
                // Copy current overlay
                tempCtx.drawImage(overlayCanvas, 0, 0);
                
                // Add highlight
                tempCtx.fillStyle = 'rgba(255, 107, 107, 0.2)';
                tempCtx.fillRect(item.x - 3, item.y - item.height - 3, item.width + 56, item.height + 6);
                tempCtx.strokeStyle = '#FF6B6B';
                tempCtx.lineWidth = 2;
                tempCtx.strokeRect(item.x - 3, item.y - item.height - 3, item.width + 56, item.height + 6);
                
                overlayCanvas.style.cursor = 'pointer';
                break;
            }
        }
        
        if (!hovering) {
            overlayCanvas.style.cursor = 'text';
            redrawOverlay();
        }
    };
}

function editText(item) {
    const pageMods = modifications[currentPage] || {};
    const currentMod = pageMods[item.index] || { text: item.text, fontSize: item.fontSize, color: '#000000' };
    
    const overlay = document.createElement('div');
    overlay.id = 'editor-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;backdrop-filter:blur(4px)';
    overlay.onclick = closeEditor;
    
    const editor = document.createElement('div');
    editor.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:35px;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.4);z-index:10000;min-width:450px;max-width:90%';
    
    editor.innerHTML = `
        <h3 style="margin:0 0 10px 0;font-size:22px;color:#2D3748">✏️ Edit Text</h3>
        <p style="margin:0 0 20px 0;font-size:14px;color:#718096">Original: "${item.text}"</p>
        
        <label style="display:block;margin-bottom:8px;font-weight:600;color:#4A5568">New Text:</label>
        <input type="text" id="edit-input" value="${currentMod.text}" 
               style="width:100%;padding:14px;font-size:16px;border:2px solid #E2E8F0;border-radius:10px;margin-bottom:20px;transition:border 0.3s"
               onfocus="this.style.borderColor='#FF6B6B'" onblur="this.style.borderColor='#E2E8F0'">
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px">
            <div>
                <label style="display:block;margin-bottom:8px;font-weight:600;color:#4A5568">Font Size:</label>
                <input type="number" id="edit-size" value="${Math.round(currentMod.fontSize)}" min="8" max="72" 
                       style="width:100%;padding:12px;border:2px solid #E2E8F0;border-radius:10px;font-size:16px">
            </div>
            <div>
                <label style="display:block;margin-bottom:8px;font-weight:600;color:#4A5568">Text Color:</label>
                <input type="color" id="edit-color" value="${currentMod.color}" 
                       style="width:100%;height:48px;border:2px solid #E2E8F0;border-radius:10px;cursor:pointer">
            </div>
        </div>
        
        <div style="background:#F7FAFC;padding:15px;border-radius:10px;margin-bottom:20px">
            <p style="margin:0;font-size:14px;color:#4A5568"><strong>Preview:</strong></p>
            <p id="preview-text" style="margin:10px 0 0 0;font-size:${Math.round(currentMod.fontSize)}px;color:${currentMod.color}">${currentMod.text}</p>
        </div>
        
        <div style="display:flex;gap:10px;justify-content:flex-end">
            <button onclick="closeEditor()" 
                    style="padding:12px 24px;border:none;background:#E2E8F0;border-radius:10px;cursor:pointer;font-weight:600;transition:all 0.3s"
                    onmouseover="this.style.background='#CBD5E0'" onmouseout="this.style.background='#E2E8F0'">
                Cancel
            </button>
            <button onclick="deleteText(${item.index})" 
                    style="padding:12px 24px;border:none;background:#EF4444;color:white;border-radius:10px;cursor:pointer;font-weight:600;transition:all 0.3s"
                    onmouseover="this.style.background='#DC2626'" onmouseout="this.style.background='#EF4444'">
                🗑️ Delete
            </button>
            <button onclick="saveEdit(${item.index})" 
                    style="padding:12px 24px;border:none;background:#FF6B6B;color:white;border-radius:10px;cursor:pointer;font-weight:600;transition:all 0.3s"
                    onmouseover="this.style.background='#EE5A52'" onmouseout="this.style.background='#FF6B6B'">
                ✓ Save Changes
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(editor);
    
    const input = document.getElementById('edit-input');
    const sizeInput = document.getElementById('edit-size');
    const colorInput = document.getElementById('edit-color');
    const preview = document.getElementById('preview-text');
    
    // Live preview
    input.oninput = () => preview.textContent = input.value;
    sizeInput.oninput = () => preview.style.fontSize = sizeInput.value + 'px';
    colorInput.oninput = () => preview.style.color = colorInput.value;
    
    input.focus();
    input.select();
    
    window.currentEditor = editor;
}

function closeEditor() {
    document.getElementById('editor-overlay')?.remove();
    window.currentEditor?.remove();
}

function saveEdit(index) {
    const newText = document.getElementById('edit-input').value;
    const newSize = parseInt(document.getElementById('edit-size').value);
    const newColor = document.getElementById('edit-color').value;
    
    if (!modifications[currentPage]) modifications[currentPage] = {};
    
    modifications[currentPage][index] = {
        text: newText,
        fontSize: newSize,
        color: newColor,
        deleted: false
    };
    
    closeEditor();
    redrawOverlay();
}

function deleteText(index) {
    if (!modifications[currentPage]) modifications[currentPage] = {};
    
    modifications[currentPage][index] = { deleted: true };
    
    closeEditor();
    redrawOverlay();
}

function changePage(delta) {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderPage();
    }
}

async function savePDF() {
    if (!pdfDoc || !uploadedFiles[0]) return alert('No PDF loaded');
    
    try {
        showProgress(0, 'Loading...');
        
        const data = await uploadedFiles[0].arrayBuffer();
        const pdfLibDoc = await PDFLib.PDFDocument.load(data);
        const pages = pdfLibDoc.getPages();
        
        showProgress(30, 'Applying changes...');
        
        for (let pageNum in modifications) {
            const pageIdx = parseInt(pageNum) - 1;
            const page = pages[pageIdx];
            const { height } = page.getSize();
            const pageMods = modifications[pageNum];
            
            const pdfPage = await pdfDoc.getPage(parseInt(pageNum));
            const viewport = pdfPage.getViewport({ scale: pageScale });
            const textContent = await pdfPage.getTextContent();
            
            for (let itemIdx in pageMods) {
                const mod = pageMods[itemIdx];
                const originalItem = textContent.items[itemIdx];
                
                if (!originalItem) continue;
                
                const tx = pdfjsLib.Util.transform(viewport.transform, originalItem.transform);
                const x = tx[4];
                const y = tx[5];
                
                page.drawRectangle({
                    x: x - 2,
                    y: height - y - 2,
                    width: (originalItem.width * pageScale) + 100,
                    height: (originalItem.height * pageScale) + 4,
                    color: PDFLib.rgb(1, 1, 1),
                    borderWidth: 0
                });
                
                if (!mod.deleted) {
                    const rgb = hexToRgb(mod.color);
                    page.drawText(mod.text, {
                        x: x,
                        y: height - y,
                        size: mod.fontSize,
                        color: PDFLib.rgb(rgb.r / 255, rgb.g / 255, rgb.b / 255)
                    });
                }
            }
        }
        
        showProgress(80, 'Saving...');
        const pdfBytes = await pdfLibDoc.save();
        download(new Blob([pdfBytes], { type: 'application/pdf' }), 'edited.pdf');
        
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        console.error(e);
        hideProgress();
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function showProgress(percent, text) {
    let prog = document.getElementById('progress');
    if (!prog) {
        prog = document.createElement('div');
        prog.id = 'progress';
        prog.className = 'progress-container active';
        prog.innerHTML = `
            <div class="progress-text" id="progress-text"></div>
            <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
        `;
        document.getElementById('workspace-content').prepend(prog);
    }
    prog.classList.add('active');
    document.getElementById('progress-fill').style.width = percent + '%';
    document.getElementById('progress-text').textContent = text;
}

function hideProgress() {
    document.getElementById('progress')?.classList.remove('active');
}

function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
}

// OTHER TOOLS
function createUI(tool) {
    const accept = tool === 'jpg-to-pdf' ? 'image/*' : '.pdf';
    const multiple = tool === 'merge' || tool === 'jpg-to-pdf';
    
    document.getElementById('workspace-content').innerHTML = `
        <div class="upload-area" id="upload-area">
            <div class="upload-icon">📁</div>
            <h3>Drop ${multiple ? 'files' : 'file'} here or click</h3>
            <p>${accept === '.pdf' ? 'PDF files' : 'Images (JPG, PNG)'}</p>
            <input type="file" id="file-input" accept="${accept}" ${multiple ? 'multiple' : ''}>
        </div>
        <div class="preview-container" id="preview" style="display:none">
            <h3>Files</h3>
            <div class="preview-grid" id="preview-grid"></div>
        </div>
        <div class="progress-container" id="progress">
            <div class="progress-text" id="progress-text"></div>
            <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
        </div>
        <div class="actions-container" id="actions" style="display:none">
            <div id="options"></div>
            <div class="actions" id="buttons"></div>
        </div>
    `;
    
    setupHandlers(tool);
}

function setupHandlers(tool) {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.onclick = () => fileInput.click();
    fileInput.onchange = (e) => handleFiles(e.target.files, tool);
    uploadArea.ondragover = (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); };
    uploadArea.ondragleave = () => uploadArea.classList.remove('dragover');
    uploadArea.ondrop = (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files, tool);
    };
}

async function handleFiles(files, tool) {
    if (!files.length) return;
    uploadedFiles = Array.from(files);
    await showPreview();
    showButtons(tool);
}

async function showPreview() {
    const preview = document.getElementById('preview');
    const grid = document.getElementById('preview-grid');
    preview.style.display = 'block';
    grid.innerHTML = '';
    
    for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const item = document.createElement('div');
        item.className = 'preview-item';
        
        if (file.type === 'application/pdf') {
            try {
                const canvas = await renderPDF(file);
                item.appendChild(canvas);
            } catch (e) {
                item.innerHTML = '<div style="padding:40px">📄</div>';
            }
        } else {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            item.appendChild(img);
        }
        
        const name = document.createElement('div');
        name.className = 'file-name';
        name.textContent = file.name;
        item.appendChild(name);
        
        const btn = document.createElement('button');
        btn.className = 'remove-btn';
        btn.innerHTML = '×';
        btn.onclick = () => removeFile(i);
        item.appendChild(btn);
        
        grid.appendChild(item);
    }
}

async function renderPDF(file) {
    const data = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas;
}

function removeFile(i) {
    uploadedFiles.splice(i, 1);
    if (!uploadedFiles.length) {
        document.getElementById('preview').style.display = 'none';
        document.getElementById('actions').style.display = 'none';
    } else {
        showPreview();
    }
}

function showButtons(tool) {
    const actions = document.getElementById('actions');
    const options = document.getElementById('options');
    const buttons = document.getElementById('buttons');
    actions.style.display = 'block';
    options.innerHTML = '';
    buttons.innerHTML = '';
    
    if (tool === 'split') {
        options.innerHTML = `
            <div style="display:flex;gap:15px;justify-content:center;margin-bottom:20px;flex-wrap:wrap">
                <input type="number" id="from" placeholder="From" min="1" value="1">
                <input type="number" id="to" placeholder="To" min="1">
            </div>`;
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processSplit()">Split PDF</button>';
    } else if (tool === 'rotate') {
        buttons.innerHTML = `
            <button class="btn btn-primary" onclick="processRotate(90)">90°</button>
            <button class="btn btn-primary" onclick="processRotate(180)">180°</button>
            <button class="btn btn-primary" onclick="processRotate(270)">270°</button>`;
    } else if (tool === 'watermark') {
        options.innerHTML = '<input type="text" id="wm-text" placeholder="Watermark text" style="width:100%;max-width:400px;margin-bottom:20px">';
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processWatermark()">Add Watermark</button>';
    } else if (tool === 'delete') {
        options.innerHTML = '<input type="text" id="del-pages" placeholder="Pages (e.g., 1,3,5)" style="width:100%;max-width:400px;margin-bottom:20px">';
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processDelete()">Delete Pages</button>';
    } else if (tool === 'merge') {
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processMerge()">Merge PDFs</button>';
    } else if (tool === 'compress') {
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processCompress()">Compress PDF</button>';
    } else if (tool === 'pdf-to-jpg') {
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processPdfToJpg()">Convert to JPG</button>';
    } else if (tool === 'jpg-to-pdf') {
        buttons.innerHTML = '<button class="btn btn-primary" onclick="processJpgToPdf()">Create PDF</button>';
    }
}

async function processMerge() {
    if (uploadedFiles.length < 2) return alert('Need at least 2 PDFs');
    try {
        showProgress(0, 'Merging...');
        const merged = await PDFLib.PDFDocument.create();
        for (let i = 0; i < uploadedFiles.length; i++) {
            showProgress((i / uploadedFiles.length) * 90, `Merging ${i + 1}/${uploadedFiles.length}...`);
            const data = await uploadedFiles[i].arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(data);
            const pages = await merged.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(p => merged.addPage(p));
        }
        showProgress(95, 'Saving...');
        const bytes = await merged.save();
        download(new Blob([bytes], { type: 'application/pdf' }), 'merged.pdf');
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processSplit() {
    if (!uploadedFiles.length) return alert('Select a PDF');
    const from = parseInt(document.getElementById('from').value);
    const to = parseInt(document.getElementById('to').value);
    if (!from || !to || from > to) return alert('Invalid page range');
    
    try {
        showProgress(50, 'Splitting...');
        const data = await uploadedFiles[0].arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(data);
        const newPdf = await PDFLib.PDFDocument.create();
        const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
        const pages = await newPdf.copyPages(pdf, indices);
        pages.forEach(p => newPdf.addPage(p));
        const bytes = await newPdf.save();
        download(new Blob([bytes], { type: 'application/pdf' }), `split_${from}-${to}.pdf`);
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processCompress() {
    if (!uploadedFiles.length) return alert('Select a PDF');
    try {
        showProgress(50, 'Compressing...');
        const data = await uploadedFiles[0].arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(data);
        const bytes = await pdf.save({ useObjectStreams: false });
        download(new Blob([bytes], { type: 'application/pdf' }), 'compressed.pdf');
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processPdfToJpg() {
    if (!uploadedFiles.length) return alert('Select a PDF');
    try {
        const data = await uploadedFiles[0].arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        const zip = new JSZip();
        
        for (let i = 1; i <= pdf.numPages; i++) {
            showProgress((i / pdf.numPages) * 100, `Converting page ${i}/${pdf.numPages}...`);
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: ctx, viewport }).promise;
            
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
            zip.file(`page_${i}.jpg`, blob);
        }
        
        showProgress(95, 'Creating ZIP...');
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        download(zipBlob, 'pdf-images.zip');
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processJpgToPdf() {
    if (!uploadedFiles.length) return alert('Select images');
    try {
        showProgress(0, 'Creating PDF...');
        const pdf = await PDFLib.PDFDocument.create();
        
        for (let i = 0; i < uploadedFiles.length; i++) {
            showProgress((i / uploadedFiles.length) * 90, `Adding image ${i + 1}/${uploadedFiles.length}...`);
            const data = await uploadedFiles[i].arrayBuffer();
            let img;
            if (uploadedFiles[i].type === 'image/png') {
                img = await pdf.embedPng(data);
            } else {
                img = await pdf.embedJpg(data);
            }
            const page = pdf.addPage([img.width, img.height]);
            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        
        showProgress(95, 'Saving...');
        const bytes = await pdf.save();
        download(new Blob([bytes], { type: 'application/pdf' }), 'images.pdf');
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processRotate(degrees) {
    if (!uploadedFiles.length) return alert('Select a PDF');
    try {
        showProgress(50, `Rotating ${degrees}°...`);
        const data = await uploadedFiles[0].arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(data);
        const pages = pdf.getPages();
        pages.forEach(page => page.setRotation(PDFLib.degrees(degrees)));
        const bytes = await pdf.save();
        download(new Blob([bytes], { type: 'application/pdf' }), `rotated_${degrees}.pdf`);
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processWatermark() {
    if (!uploadedFiles.length) return alert('Select a PDF');
    const text = document.getElementById('wm-text').value;
    if (!text) return alert('Enter watermark text');
    
    try {
        showProgress(50, 'Adding watermark...');
        const data = await uploadedFiles[0].arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(data);
        const pages = pdf.getPages();
        
        pages.forEach(page => {
            const { width, height } = page.getSize();
            page.drawText(text, {
                x: width / 2 - (text.length * 10),
                y: height / 2,
                size: 50,
                opacity: 0.3,
                color: PDFLib.rgb(0.5, 0.5, 0.5)
            });
        });
        
        const bytes = await pdf.save();
        download(new Blob([bytes], { type: 'application/pdf' }), 'watermarked.pdf');
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}

async function processDelete() {
    if (!uploadedFiles.length) return alert('Select a PDF');
    const input = document.getElementById('del-pages').value;
    if (!input) return alert('Enter pages to delete');
    
    try {
        const toDelete = input.split(',').map(p => parseInt(p.trim()) - 1).filter(p => !isNaN(p));
        if (!toDelete.length) return alert('Invalid page numbers');
        
        showProgress(50, 'Deleting pages...');
        const data = await uploadedFiles[0].arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(data);
        const total = pdf.getPageCount();
        const toKeep = Array.from({ length: total }, (_, i) => i).filter(i => !toDelete.includes(i));
        
        const newPdf = await PDFLib.PDFDocument.create();
        const pages = await newPdf.copyPages(pdf, toKeep);
        pages.forEach(p => newPdf.addPage(p));
        
        const bytes = await newPdf.save();
        download(new Blob([bytes], { type: 'application/pdf' }), 'deleted_pages.pdf');
        showProgress(100, 'Done!');
        setTimeout(hideProgress, 2000);
    } catch (e) {
        alert('Error: ' + e.message);
        hideProgress();
    }
}
