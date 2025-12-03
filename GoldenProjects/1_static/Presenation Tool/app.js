// SlideFlow - Enhanced Modern Presentation Tool
class SlideFlow {
    constructor() {
        this.slides = [this.createSlide()];
        this.currentSlideIndex = 0;
        this.currentMode = 'edit';
        this.history = [];
        this.historyIndex = -1;
        this.autoSaveTimer = null;
        this.isFullscreen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderSlideList();
        this.loadSlide(0);
        this.setupAutoSave();
        this.setupDragAndDrop();
        this.loadFromLocalStorage();
        this.detectDevice();
        this.checkFirstVisit();
        this.hideLoadingScreen();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 800);
    }

    createSlide() {
        return {
            id: Date.now() + Math.random(),
            content: '<h1>New Slide</h1><p>Click to edit or use templates...</p>',
            markdown: '# New Slide\n\nClick to edit or use templates...',
            background: '#ffffff',
            transition: 'fade',
            layout: 'center',
            notes: ''
        };
    }

    setupEventListeners() {
        // Header buttons
        document.getElementById('addSlideBtn').addEventListener('click', () => this.addSlide());
        document.getElementById('deleteSlideBtn').addEventListener('click', () => this.deleteSlide());
        document.getElementById('duplicateSlideBtn').addEventListener('click', () => this.duplicateSlide());
        document.getElementById('presentBtn').addEventListener('click', () => this.startPresentation());
        document.getElementById('saveBtn').addEventListener('click', () => this.savePresentation());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadPresentation());
        document.getElementById('exportHtmlBtn').addEventListener('click', () => this.exportAsHTML());
        document.getElementById('themeBtn').addEventListener('click', () => this.showThemeModal());
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());

        // Mode switching
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Add elements
        document.getElementById('addTextBtn').addEventListener('click', () => this.addElement('text'));
        document.getElementById('addImageBtn').addEventListener('click', () => this.addElement('image'));
        document.getElementById('addCodeBtn').addEventListener('click', () => this.addElement('code'));
        document.getElementById('addShapeBtn').addEventListener('click', () => this.addElement('shape'));
        document.getElementById('addListBtn').addEventListener('click', () => this.addElement('list'));
        document.getElementById('addTableBtn').addEventListener('click', () => this.addElement('table'));
        document.getElementById('addVideoBtn').addEventListener('click', () => this.addElement('video'));

        // Properties
        document.getElementById('bgColor').addEventListener('input', (e) => this.updateBackground(e.target.value));
        document.getElementById('bgGradient').addEventListener('input', (e) => this.updateGradient(e.target.value));
        document.getElementById('textColor').addEventListener('input', (e) => this.updateTextColor(e.target.value));
        document.getElementById('fontSize').addEventListener('input', (e) => {
            document.getElementById('fontSizeLabel').textContent = e.target.value + 'px';
            this.updateFontSize(e.target.value);
        });
        document.getElementById('transitionSelect').addEventListener('change', (e) => this.updateTransition(e.target.value));
        document.getElementById('speakerNotes').addEventListener('input', (e) => this.updateNotes(e.target.value));

        // Layout buttons
        document.querySelectorAll('.layout-btn[data-layout]').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyLayout(e.target.dataset.layout));
        });

        // Template buttons
        document.querySelectorAll('[data-template]').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyTemplate(e.target.dataset.template));
        });

        // Markdown editor
        document.getElementById('markdownInput').addEventListener('input', (e) => this.updateMarkdown(e.target.value));

        // Presentation controls
        document.getElementById('prevBtn').addEventListener('click', () => this.previousSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        document.getElementById('exitBtn').addEventListener('click', () => this.exitPresentation());
        document.getElementById('notesBtn').addEventListener('click', () => this.toggleNotes());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Theme modal
        document.getElementById('closeThemeModal').addEventListener('click', () => this.hideThemeModal());
        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', (e) => this.applyTheme(e.currentTarget.dataset.theme));
        });

        // Help modal
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelpModal());
        document.getElementById('closeHelpModal').addEventListener('click', () => this.hideHelpModal());

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Content editable
        const slideContent = document.getElementById('slideContent');
        slideContent.addEventListener('input', () => {
            this.saveCurrentSlideContent();
            this.saveToHistory();
        });
    }

    switchMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('[data-mode]').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        const canvas = document.querySelector('.canvas-wrapper');
        const markdown = document.getElementById('markdownEditor');
        const slideContent = document.getElementById('slideContent');

        if (mode === 'markdown') {
            canvas.style.display = 'none';
            markdown.classList.remove('hidden');
            document.getElementById('markdownInput').value = this.slides[this.currentSlideIndex].markdown;
            this.renderMarkdownPreview();
        } else {
            canvas.style.display = 'flex';
            markdown.classList.add('hidden');
            slideContent.setAttribute('contenteditable', 'true');
        }
    }

    addSlide() {
        const newSlide = this.createSlide();
        this.slides.push(newSlide);
        this.renderSlideList();
        this.loadSlide(this.slides.length - 1);
        this.saveToHistory();
    }

    deleteSlide() {
        if (this.slides.length <= 1) {
            this.showNotification('Cannot delete the last slide!');
            return;
        }
        if (confirm('Are you sure you want to delete this slide?')) {
            this.slides.splice(this.currentSlideIndex, 1);
            this.currentSlideIndex = Math.max(0, this.currentSlideIndex - 1);
            this.renderSlideList();
            this.loadSlide(this.currentSlideIndex);
            this.saveToHistory();
        }
    }

    duplicateSlide() {
        const currentSlide = this.slides[this.currentSlideIndex];
        const duplicatedSlide = {
            ...currentSlide,
            id: Date.now() + Math.random()
        };
        this.slides.splice(this.currentSlideIndex + 1, 0, duplicatedSlide);
        this.renderSlideList();
        this.loadSlide(this.currentSlideIndex + 1);
        this.saveToHistory();
        this.showNotification('Slide duplicated!');
    }

    renderSlideList() {
        const slideList = document.getElementById('slideList');
        slideList.innerHTML = '';
        
        this.slides.forEach((slide, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'slide-thumb' + (index === this.currentSlideIndex ? ' active' : '');
            
            const thumbContent = document.createElement('div');
            thumbContent.className = 'slide-thumb-content';
            thumbContent.innerHTML = slide.content;
            thumbContent.style.background = slide.background;
            
            thumb.innerHTML = `<div class="slide-number">${index + 1}</div>`;
            thumb.appendChild(thumbContent);
            thumb.addEventListener('click', () => this.loadSlide(index));
            
            // Drag and drop for reordering
            thumb.draggable = true;
            thumb.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', index);
                thumb.style.opacity = '0.5';
            });
            thumb.addEventListener('dragend', () => {
                thumb.style.opacity = '1';
            });
            thumb.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });
            thumb.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/html'));
                const toIndex = index;
                if (fromIndex !== toIndex) {
                    const movedSlide = this.slides.splice(fromIndex, 1)[0];
                    this.slides.splice(toIndex, 0, movedSlide);
                    this.currentSlideIndex = toIndex;
                    this.renderSlideList();
                    this.saveToHistory();
                }
            });
            
            slideList.appendChild(thumb);
        });
    }

    loadSlide(index) {
        this.saveCurrentSlideContent();
        this.currentSlideIndex = index;
        const slide = this.slides[index];
        
        const slideContent = document.getElementById('slideContent');
        slideContent.innerHTML = slide.content;
        
        const canvas = document.getElementById('canvas');
        canvas.style.background = slide.background;
        
        document.getElementById('transitionSelect').value = slide.transition;
        document.getElementById('speakerNotes').value = slide.notes || '';
        
        this.renderSlideList();
    }

    saveCurrentSlideContent() {
        const slideContent = document.getElementById('slideContent');
        this.slides[this.currentSlideIndex].content = slideContent.innerHTML;
        this.renderSlideList();
    }

    addElement(type) {
        const slideContent = document.getElementById('slideContent');
        let element = '';

        switch(type) {
            case 'text':
                element = '<p contenteditable="true" style="margin: 20px 0;">New text element - click to edit</p>';
                break;
            case 'image':
                const url = prompt('Enter image URL (or leave empty to upload):');
                if (url) {
                    element = `<img src="${url}" style="max-width: 500px; border-radius: 8px; margin: 20px auto; display: block;" alt="Image">`;
                } else {
                    this.uploadImage();
                    return;
                }
                break;
            case 'code':
                element = `<pre style="background: #2d2d2d; color: #f8f8f2; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; margin: 20px 0; overflow-x: auto;"><code contenteditable="true">// Your code here
function hello() {
    console.log("Hello World!");
}</code></pre>`;
                break;
            case 'shape':
                element = '<div contenteditable="false" style="width: 200px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 20px auto;"></div>';
                break;
            case 'list':
                element = `<ul contenteditable="true" style="margin: 20px 0; padding-left: 40px;">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                </ul>`;
                break;
            case 'table':
                element = `<table contenteditable="true" style="margin: 20px auto; border-collapse: collapse; width: 80%;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 12px; background: #667eea; color: white;">Header 1</th>
                            <th style="border: 1px solid #ddd; padding: 12px; background: #667eea; color: white;">Header 2</th>
                            <th style="border: 1px solid #ddd; padding: 12px; background: #667eea; color: white;">Header 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 12px;">Data 1</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Data 2</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Data 3</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 12px;">Data 4</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Data 5</td>
                            <td style="border: 1px solid #ddd; padding: 12px;">Data 6</td>
                        </tr>
                    </tbody>
                </table>`;
                break;
            case 'video':
                const videoUrl = prompt('Enter YouTube video URL or video file URL:');
                if (videoUrl) {
                    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                        const videoId = this.extractYouTubeId(videoUrl);
                        element = `<div class="video-container" style="margin: 20px auto; max-width: 640px;">
                            <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                        </div>`;
                    } else {
                        element = `<div class="video-container" style="margin: 20px auto; max-width: 640px;">
                            <video controls src="${videoUrl}"></video>
                        </div>`;
                    }
                }
                break;
        }

        if (element) {
            slideContent.innerHTML += element;
            this.saveCurrentSlideContent();
            this.saveToHistory();
        }
    }

    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    uploadImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const slideContent = document.getElementById('slideContent');
                const img = `<img src="${event.target.result}" style="max-width: 500px; border-radius: 8px; margin: 20px auto; display: block;" alt="Uploaded Image">`;
                slideContent.innerHTML += img;
                this.saveCurrentSlideContent();
                this.saveToHistory();
            };
            
            reader.readAsDataURL(file);
        };
        
        input.click();
    }

    updateBackground(color) {
        const canvas = document.getElementById('canvas');
        canvas.style.background = color;
        this.slides[this.currentSlideIndex].background = color;
        this.saveToHistory();
    }

    updateGradient(value) {
        if (value.includes(',')) {
            const colors = value.split(',').map(c => c.trim());
            if (colors.length >= 2) {
                const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
                const canvas = document.getElementById('canvas');
                canvas.style.background = gradient;
                this.slides[this.currentSlideIndex].background = gradient;
                this.saveToHistory();
            }
        }
    }

    updateTextColor(color) {
        const slideContent = document.getElementById('slideContent');
        slideContent.style.color = color;
    }

    updateFontSize(size) {
        const slideContent = document.getElementById('slideContent');
        slideContent.style.fontSize = size + 'px';
    }

    updateTransition(transition) {
        this.slides[this.currentSlideIndex].transition = transition;
    }

    updateNotes(notes) {
        this.slides[this.currentSlideIndex].notes = notes;
    }

    applyLayout(layout) {
        const slideContent = document.getElementById('slideContent');
        
        switch(layout) {
            case 'center':
                slideContent.style.textAlign = 'center';
                slideContent.style.display = 'flex';
                slideContent.style.flexDirection = 'column';
                slideContent.style.justifyContent = 'center';
                slideContent.style.alignItems = 'center';
                break;
            case 'left':
                slideContent.style.textAlign = 'left';
                slideContent.style.display = 'block';
                slideContent.style.justifyContent = 'flex-start';
                break;
            case 'split':
                slideContent.style.display = 'grid';
                slideContent.style.gridTemplateColumns = '1fr 1fr';
                slideContent.style.gap = '40px';
                slideContent.style.alignItems = 'start';
                break;
        }
        
        this.slides[this.currentSlideIndex].layout = layout;
        this.saveToHistory();
    }

    applyTemplate(template) {
        const slideContent = document.getElementById('slideContent');
        
        switch(template) {
            case 'title':
                slideContent.innerHTML = `
                    <h1 style="font-size: 64px; font-weight: bold; margin-bottom: 20px;">Your Title Here</h1>
                    <p style="font-size: 28px; color: #666;">Subtitle or tagline</p>
                `;
                slideContent.style.textAlign = 'center';
                slideContent.style.display = 'flex';
                slideContent.style.flexDirection = 'column';
                slideContent.style.justifyContent = 'center';
                slideContent.style.alignItems = 'center';
                break;
            case 'content':
                slideContent.innerHTML = `
                    <h2 style="font-size: 48px; margin-bottom: 30px;">Slide Title</h2>
                    <ul style="font-size: 24px; line-height: 1.8;">
                        <li>First key point</li>
                        <li>Second key point</li>
                        <li>Third key point</li>
                    </ul>
                `;
                slideContent.style.textAlign = 'left';
                slideContent.style.display = 'block';
                break;
            case 'twoColumn':
                slideContent.innerHTML = `
                    <div style="text-align: left;">
                        <h3 style="font-size: 36px; margin-bottom: 20px;">Left Column</h3>
                        <p style="font-size: 20px;">Content for the left side</p>
                    </div>
                    <div style="text-align: left;">
                        <h3 style="font-size: 36px; margin-bottom: 20px;">Right Column</h3>
                        <p style="font-size: 20px;">Content for the right side</p>
                    </div>
                `;
                slideContent.style.display = 'grid';
                slideContent.style.gridTemplateColumns = '1fr 1fr';
                slideContent.style.gap = '40px';
                break;
            case 'quote':
                slideContent.innerHTML = `
                    <blockquote style="font-size: 42px; font-style: italic; text-align: center; position: relative;">
                        "Your inspiring quote goes here"
                        <footer style="font-size: 24px; margin-top: 30px; font-style: normal; color: #666;">— Author Name</footer>
                    </blockquote>
                `;
                slideContent.style.display = 'flex';
                slideContent.style.justifyContent = 'center';
                slideContent.style.alignItems = 'center';
                break;
        }
        
        this.saveCurrentSlideContent();
        this.saveToHistory();
        this.showNotification('Template applied!');
    }

    updateMarkdown(markdown) {
        this.slides[this.currentSlideIndex].markdown = markdown;
        this.renderMarkdownPreview();
    }

    renderMarkdownPreview() {
        const markdown = document.getElementById('markdownInput').value;
        const preview = document.getElementById('markdownPreview');
        
        if (typeof marked !== 'undefined') {
            preview.innerHTML = marked.parse(markdown);
            this.slides[this.currentSlideIndex].content = preview.innerHTML;
        } else {
            // Fallback simple markdown parsing
            let html = markdown
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/\n/gim, '<br>');
            preview.innerHTML = html;
            this.slides[this.currentSlideIndex].content = html;
        }
    }

    // Presentation Mode
    startPresentation() {
        document.getElementById('presentationMode').classList.remove('hidden');
        this.currentSlideIndex = 0;
        this.showPresentationSlide();
        this.showNotification('Press ESC to exit, O for overview');
    }

    showPresentationSlide() {
        const slide = this.slides[this.currentSlideIndex];
        const presentationSlide = document.getElementById('presentationSlide');
        
        presentationSlide.innerHTML = slide.content;
        presentationSlide.style.background = slide.background;
        
        // Apply transition
        presentationSlide.className = 'presentation-slide ' + slide.transition + '-enter';
        
        // Update counter
        document.getElementById('slideCounter').textContent = 
            `${this.currentSlideIndex + 1} / ${this.slides.length}`;
        
        // Update progress
        const progress = ((this.currentSlideIndex + 1) / this.slides.length) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        
        // Update notes
        document.getElementById('notesContent').textContent = slide.notes || 'No notes for this slide';
    }

    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.showPresentationSlide();
        }
    }

    nextSlide() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.currentSlideIndex++;
            this.showPresentationSlide();
        }
    }

    exitPresentation() {
        document.getElementById('presentationMode').classList.add('hidden');
        document.getElementById('slideOverview').classList.add('hidden');
        this.loadSlide(this.currentSlideIndex);
    }

    toggleNotes() {
        const notesPanel = document.getElementById('speakerNotesPanel');
        notesPanel.classList.toggle('hidden');
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            this.isFullscreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            this.isFullscreen = false;
        }
    }

    showSlideOverview() {
        const overview = document.getElementById('slideOverview');
        overview.innerHTML = '';
        overview.classList.remove('hidden');
        
        this.slides.forEach((slide, index) => {
            const overviewSlide = document.createElement('div');
            overviewSlide.className = 'overview-slide';
            overviewSlide.innerHTML = `
                <div class="overview-slide-number">${index + 1}</div>
                <div style="width: 100%; height: 100%; padding: 20px; overflow: hidden; background: ${slide.background};">
                    ${slide.content}
                </div>
            `;
            overviewSlide.addEventListener('click', () => {
                this.currentSlideIndex = index;
                overview.classList.add('hidden');
                this.showPresentationSlide();
            });
            overview.appendChild(overviewSlide);
        });
    }

    handleKeyboard(e) {
        const presentationMode = document.getElementById('presentationMode');
        
        if (!presentationMode.classList.contains('hidden')) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'Escape') {
                const overview = document.getElementById('slideOverview');
                if (!overview.classList.contains('hidden')) {
                    overview.classList.add('hidden');
                } else {
                    this.exitPresentation();
                }
            } else if (e.key === 'o' || e.key === 'O') {
                e.preventDefault();
                this.showSlideOverview();
            } else if (e.key === 'n' || e.key === 'N') {
                e.preventDefault();
                this.toggleNotes();
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                this.toggleFullscreen();
            }
        } else {
            // Editor shortcuts
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z') {
                    e.preventDefault();
                    this.undo();
                } else if (e.key === 'y') {
                    e.preventDefault();
                    this.redo();
                } else if (e.key === 's') {
                    e.preventDefault();
                    this.savePresentation();
                }
            }
        }
    }

    // History Management
    saveToHistory() {
        const state = JSON.stringify(this.slides);
        
        // Remove future history if we're not at the end
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        this.history.push(state);
        this.historyIndex++;
        
        // Limit history to 50 states
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.slides = JSON.parse(this.history[this.historyIndex]);
            this.renderSlideList();
            this.loadSlide(this.currentSlideIndex);
            this.showNotification('Undo');
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.slides = JSON.parse(this.history[this.historyIndex]);
            this.renderSlideList();
            this.loadSlide(this.currentSlideIndex);
            this.showNotification('Redo');
        }
    }

    // Auto-save
    setupAutoSave() {
        setInterval(() => {
            this.saveToLocalStorage();
        }, 30000); // Auto-save every 30 seconds
    }

    saveToLocalStorage() {
        try {
            const data = {
                title: document.getElementById('presentationTitle').value || 'Untitled',
                slides: this.slides,
                currentSlideIndex: this.currentSlideIndex
            };
            localStorage.setItem('slideflow_autosave', JSON.stringify(data));
            this.showNotification('Auto-saved', 1000);
        } catch (e) {
            console.error('Auto-save failed:', e);
        }
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('slideflow_autosave');
            if (saved) {
                const data = JSON.parse(saved);
                if (confirm('Found auto-saved presentation. Do you want to restore it?')) {
                    this.slides = data.slides;
                    this.currentSlideIndex = data.currentSlideIndex || 0;
                    document.getElementById('presentationTitle').value = data.title;
                    this.renderSlideList();
                    this.loadSlide(this.currentSlideIndex);
                    this.showNotification('Presentation restored!');
                }
            }
        } catch (e) {
            console.error('Failed to load auto-save:', e);
        }
    }

    // Save & Load
    savePresentation() {
        const data = {
            title: document.getElementById('presentationTitle').value || 'Untitled',
            slides: this.slides,
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.title.replace(/\s+/g, '-').toLowerCase() + '.slideflow.json';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Presentation saved!');
    }

    loadPresentation() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,.slideflow.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    this.slides = data.slides;
                    document.getElementById('presentationTitle').value = data.title;
                    this.currentSlideIndex = 0;
                    this.renderSlideList();
                    this.loadSlide(0);
                    this.showNotification('Presentation loaded!');
                } catch (error) {
                    alert('Error loading presentation: ' + error.message);
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }

    exportAsHTML() {
        const title = document.getElementById('presentationTitle').value || 'Untitled';
        
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; overflow: hidden; }
        .slide { width: 100vw; height: 100vh; display: none; align-items: center; justify-content: center; padding: 60px; font-size: 32px; }
        .slide.active { display: flex; }
        .controls { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.9); padding: 12px 24px; border-radius: 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .btn { border: none; background: #667eea; color: white; padding: 10px 20px; margin: 0 5px; border-radius: 8px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #5568d3; }
        .counter { margin: 0 15px; font-weight: 600; }
        .progress { position: fixed; top: 0; left: 0; width: 100%; height: 4px; background: rgba(0,0,0,0.1); }
        .progress-bar { height: 100%; background: #667eea; transition: width 0.3s; }
    </style>
</head>
<body>
    <div class="progress"><div class="progress-bar" id="progress"></div></div>
`;

        this.slides.forEach((slide, index) => {
            html += `    <div class="slide ${index === 0 ? 'active' : ''}" style="background: ${slide.background};">
        <div style="width: 100%; max-width: 1200px;">${slide.content}</div>
    </div>
`;
        });

        html += `    <div class="controls">
        <button class="btn" onclick="prevSlide()">←</button>
        <span class="counter" id="counter">1 / ${this.slides.length}</span>
        <button class="btn" onclick="nextSlide()">→</button>
    </div>
    <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        
        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            document.getElementById('counter').textContent = (currentSlide + 1) + ' / ' + totalSlides;
            document.getElementById('progress').style.width = ((currentSlide + 1) / totalSlides * 100) + '%';
        }
        
        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
        });
    </script>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = title.replace(/\s+/g, '-').toLowerCase() + '.html';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Exported as HTML!');
    }

    // Drag and Drop for images
    setupDragAndDrop() {
        const canvas = document.getElementById('canvas');
        
        canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            canvas.classList.add('drag-over');
        });
        
        canvas.addEventListener('dragleave', () => {
            canvas.classList.remove('drag-over');
        });
        
        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            canvas.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const slideContent = document.getElementById('slideContent');
                        const img = `<img src="${event.target.result}" style="max-width: 500px; border-radius: 8px; margin: 20px auto; display: block;" alt="Dropped Image">`;
                        slideContent.innerHTML += img;
                        this.saveCurrentSlideContent();
                        this.saveToHistory();
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
        
        // Touch gestures for mobile
        this.setupTouchGestures();
    }

    setupTouchGestures() {
        const presentationMode = document.getElementById('presentationMode');
        let touchStartX = 0;
        let touchEndX = 0;
        
        presentationMode.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        presentationMode.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.previousSlide();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }

    // Theme
    showThemeModal() {
        document.getElementById('themeModal').classList.remove('hidden');
    }

    hideThemeModal() {
        document.getElementById('themeModal').classList.add('hidden');
    }

    showHelpModal() {
        document.getElementById('helpModal').classList.remove('hidden');
    }

    hideHelpModal() {
        document.getElementById('helpModal').classList.add('hidden');
    }

    applyTheme(theme) {
        const themes = {
            default: { primary: '#667eea', secondary: '#764ba2' },
            dark: { primary: '#1a1a2e', secondary: '#16213e' },
            ocean: { primary: '#00b4db', secondary: '#0083b0' },
            sunset: { primary: '#ff6b6b', secondary: '#feca57' }
        };

        const selected = themes[theme];
        document.documentElement.style.setProperty('--primary', selected.primary);
        document.documentElement.style.setProperty('--secondary', selected.secondary);
        
        // Update header gradient
        const header = document.querySelector('.header');
        header.style.background = `linear-gradient(135deg, ${selected.primary} 0%, ${selected.secondary} 100%)`;
        
        this.hideThemeModal();
        this.showNotification(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`);
    }

    // Notification system
    showNotification(message, duration = 2000) {
        let indicator = document.querySelector('.autosave-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'autosave-indicator';
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = message;
        indicator.classList.add('show');
        
        setTimeout(() => {
            indicator.classList.remove('show');
        }, duration);
    }

    checkFirstVisit() {
        const hasVisited = localStorage.getItem('slideflow_visited');
        if (!hasVisited) {
            localStorage.setItem('slideflow_visited', 'true');
            setTimeout(() => {
                this.showHelpModal();
                this.showNotification('Welcome to SlideFlow! 🎉', 3000);
            }, 500);
        }
    }

    toggleMobileMenu() {
        const headerRight = document.querySelector('.header-right');
        headerRight.classList.toggle('menu-open');
    }

    detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
        
        if (isMobile && !isTablet) {
            document.body.classList.add('mobile-device');
            this.showNotification('Swipe left/right to navigate slides', 3000);
        } else if (isTablet) {
            document.body.classList.add('tablet-device');
        }
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.slideFlowApp = new SlideFlow();
    });
} else {
    window.slideFlowApp = new SlideFlow();
}
