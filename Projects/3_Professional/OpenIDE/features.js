// Advanced IDE Features

// Toast Notification System
class ToastManager {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.style.cssText = 'position: fixed; bottom: 30px; right: 30px; z-index: 3000;';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✗',
            info: 'ℹ',
            warning: '⚠'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;
        
        this.container.appendChild(toast);
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.remove(toast);
        });
        
        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }
    }

    remove(toast) {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }
}

// Command Palette
class CommandPalette {
    constructor() {
        this.commands = [
            { name: 'Run Code', icon: '▶', shortcut: 'Ctrl+Enter', action: () => runCode() },
            { name: 'Download File', icon: '⬇', shortcut: 'Ctrl+S', action: () => downloadFile() },
            { name: 'New File', icon: '+', shortcut: 'Ctrl+N', action: () => createNewFile() },
            { name: 'Format Code', icon: '✨', shortcut: 'Alt+Shift+F', action: () => this.formatCode() },
            { name: 'Toggle Sidebar', icon: '◀', shortcut: 'Ctrl+B', action: () => this.toggleSidebar() },
            { name: 'Change Theme', icon: '🎨', shortcut: '', action: () => this.cycleTheme() },
            { name: 'Clear Output', icon: '🗑', shortcut: '', action: () => this.clearOutput() }
        ];
        this.createPalette();
    }

    createPalette() {
        const palette = document.createElement('div');
        palette.className = 'command-palette';
        palette.id = 'commandPalette';
        palette.innerHTML = `
            <input type="text" class="command-input" placeholder="Type a command..." id="commandInput">
            <div class="command-list" id="commandList"></div>
        `;
        document.body.appendChild(palette);

        const input = palette.querySelector('#commandInput');
        input.addEventListener('input', (e) => this.filterCommands(e.target.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
            if (e.key === 'Enter') this.executeSelected();
        });

        this.renderCommands();
    }

    renderCommands(filter = '') {
        const list = document.getElementById('commandList');
        const filtered = this.commands.filter(cmd => 
            cmd.name.toLowerCase().includes(filter.toLowerCase())
        );

        list.innerHTML = filtered.map(cmd => `
            <div class="command-item" data-action="${cmd.name}">
                <span class="command-item-icon">${cmd.icon}</span>
                <span class="command-item-text">${cmd.name}</span>
                ${cmd.shortcut ? `<span class="command-item-shortcut">${cmd.shortcut}</span>` : ''}
            </div>
        `).join('');

        list.querySelectorAll('.command-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                filtered[index].action();
                this.hide();
            });
        });
    }

    filterCommands(filter) {
        this.renderCommands(filter);
    }

    show() {
        const palette = document.getElementById('commandPalette');
        palette.classList.add('active');
        document.getElementById('commandInput').focus();
    }

    hide() {
        const palette = document.getElementById('commandPalette');
        palette.classList.remove('active');
        document.getElementById('commandInput').value = '';
        this.renderCommands();
    }

    executeSelected() {
        const firstItem = document.querySelector('.command-item');
        if (firstItem) firstItem.click();
    }

    formatCode() {
        if (editor) {
            editor.getAction('editor.action.formatDocument').run();
            toastManager.show('Code formatted', 'success');
        }
    }

    toggleSidebar() {
        document.getElementById('toggleSidebar').click();
    }

    cycleTheme() {
        const themeSelector = document.getElementById('themeSelector');
        const currentIndex = themeSelector.selectedIndex;
        themeSelector.selectedIndex = (currentIndex + 1) % themeSelector.options.length;
        themeSelector.dispatchEvent(new Event('change'));
    }

    clearOutput() {
        document.getElementById('clearOutput').click();
    }
}

// Context Menu
class ContextMenu {
    constructor() {
        this.menu = document.createElement('div');
        this.menu.className = 'context-menu';
        this.menu.id = 'contextMenu';
        document.body.appendChild(this.menu);

        document.addEventListener('click', () => this.hide());
    }

    show(x, y, items) {
        this.menu.innerHTML = items.map(item => {
            if (item === 'divider') {
                return '<div class="context-menu-divider"></div>';
            }
            return `
                <div class="context-menu-item" data-action="${item.action}">
                    <span>${item.icon}</span>
                    <span>${item.label}</span>
                </div>
            `;
        }).join('');

        this.menu.style.left = x + 'px';
        this.menu.style.top = y + 'px';
        this.menu.classList.add('active');

        this.menu.querySelectorAll('.context-menu-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const actionIndex = items.filter(i => i !== 'divider').findIndex(i => i.action === item.dataset.action);
                if (actionIndex >= 0) {
                    items.filter(i => i !== 'divider')[actionIndex].callback();
                }
                this.hide();
            });
        });
    }

    hide() {
        this.menu.classList.remove('active');
    }
}

// Initialize managers
let toastManager, commandPalette, contextMenu;

function initializeFeatures() {
    toastManager = new ToastManager();
    commandPalette = new CommandPalette();
    contextMenu = new ContextMenu();

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+P for command palette
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            commandPalette.show();
        }
        // Ctrl+B for sidebar toggle
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            commandPalette.toggleSidebar();
        }
        // Ctrl+N for new file
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            createNewFile();
        }
    });

    // Context menu on editor
    document.getElementById('editor').addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.show(e.clientX, e.clientY, [
            { icon: '✂', label: 'Cut', action: 'cut', callback: () => document.execCommand('cut') },
            { icon: '📋', label: 'Copy', action: 'copy', callback: () => document.execCommand('copy') },
            { icon: '📄', label: 'Paste', action: 'paste', callback: () => document.execCommand('paste') },
            'divider',
            { icon: '✨', label: 'Format', action: 'format', callback: () => commandPalette.formatCode() },
            { icon: '▶', label: 'Run', action: 'run', callback: () => runCode() }
        ]);
    });

    toastManager.show('CodeFlow IDE ready! Press Ctrl+P for commands', 'success');
}


// File Upload Feature
function setupFileUpload() {
    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'btn btn-secondary tooltip';
    uploadBtn.setAttribute('data-tooltip', 'Upload File');
    uploadBtn.innerHTML = '📁 Upload';
    uploadBtn.id = 'uploadBtn';
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,.ts,.py,.java,.cpp,.cs,.html,.css,.json,.md,.sql,.php,.rb,.go,.rs,.txt';
    input.style.display = 'none';
    input.id = 'fileInput';
    
    uploadBtn.addEventListener('click', () => input.click());
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const filename = file.name;
            
            files[filename] = content;
            currentFile = filename;
            editor.setValue(content);
            
            // Detect and set language
            const ext = filename.split('.').pop();
            const langMap = {
                js: 'javascript', ts: 'typescript', py: 'python',
                java: 'java', cpp: 'cpp', cs: 'csharp',
                html: 'html', css: 'css', json: 'json',
                md: 'markdown', sql: 'sql', php: 'php',
                rb: 'ruby', go: 'go', rs: 'rust', txt: 'plaintext'
            };
            
            if (langMap[ext]) {
                monaco.editor.setModelLanguage(editor.getModel(), langMap[ext]);
                document.getElementById('languageSelector').value = langMap[ext];
            }
            
            // Add to file tree
            const fileTree = document.getElementById('fileTree');
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item animate-in';
            fileItem.dataset.file = filename;
            fileItem.innerHTML = `
                <span class="file-icon">📄</span>
                <span class="file-name">${filename}</span>
            `;
            fileItem.addEventListener('click', () => switchFile(filename));
            fileTree.appendChild(fileItem);
            
            addTab(filename);
            toastManager.show(`Uploaded: ${filename}`, 'success');
        };
        reader.readAsText(file);
        input.value = '';
    });
    
    document.querySelector('.top-bar-actions').insertBefore(uploadBtn, document.getElementById('newFileBtn'));
    document.body.appendChild(input);
}

// Settings Panel
class SettingsPanel {
    constructor() {
        this.settings = {
            fontSize: 14,
            tabSize: 2,
            wordWrap: true,
            minimap: true,
            lineNumbers: true,
            autoSave: false
        };
        this.loadSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('codeflow-settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    saveSettings() {
        localStorage.setItem('codeflow-settings', JSON.stringify(this.settings));
    }

    applySettings() {
        if (editor) {
            editor.updateOptions({
                fontSize: this.settings.fontSize,
                tabSize: this.settings.tabSize,
                wordWrap: this.settings.wordWrap ? 'on' : 'off',
                minimap: { enabled: this.settings.minimap },
                lineNumbers: this.settings.lineNumbers ? 'on' : 'off'
            });
        }
    }

    show() {
        const panel = document.createElement('div');
        panel.className = 'command-palette active';
        panel.innerHTML = `
            <div style="padding: 20px;">
                <h2 style="margin-bottom: 20px; color: #667eea;">⚙️ Settings</h2>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Font Size: ${this.settings.fontSize}px</label>
                    <input type="range" id="fontSizeRange" min="10" max="24" value="${this.settings.fontSize}" 
                           style="width: 100%;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Tab Size: ${this.settings.tabSize}</label>
                    <input type="range" id="tabSizeRange" min="2" max="8" value="${this.settings.tabSize}" 
                           style="width: 100%;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="wordWrapCheck" ${this.settings.wordWrap ? 'checked' : ''}>
                        Word Wrap
                    </label>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="minimapCheck" ${this.settings.minimap ? 'checked' : ''}>
                        Show Minimap
                    </label>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="lineNumbersCheck" ${this.settings.lineNumbers ? 'checked' : ''}>
                        Show Line Numbers
                    </label>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button id="saveSettingsBtn" class="btn btn-primary" style="flex: 1;">Save</button>
                    <button id="cancelSettingsBtn" class="btn btn-secondary" style="flex: 1;">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Event listeners
        const fontSizeRange = panel.querySelector('#fontSizeRange');
        fontSizeRange.addEventListener('input', (e) => {
            panel.querySelector('label').textContent = `Font Size: ${e.target.value}px`;
        });
        
        const tabSizeRange = panel.querySelector('#tabSizeRange');
        tabSizeRange.addEventListener('input', (e) => {
            panel.querySelectorAll('label')[1].textContent = `Tab Size: ${e.target.value}`;
        });
        
        panel.querySelector('#saveSettingsBtn').addEventListener('click', () => {
            this.settings.fontSize = parseInt(fontSizeRange.value);
            this.settings.tabSize = parseInt(tabSizeRange.value);
            this.settings.wordWrap = panel.querySelector('#wordWrapCheck').checked;
            this.settings.minimap = panel.querySelector('#minimapCheck').checked;
            this.settings.lineNumbers = panel.querySelector('#lineNumbersCheck').checked;
            
            this.saveSettings();
            this.applySettings();
            panel.remove();
            toastManager.show('Settings saved!', 'success');
        });
        
        panel.querySelector('#cancelSettingsBtn').addEventListener('click', () => {
            panel.remove();
        });
    }
}

let settingsPanel;

// Initialize settings
function initializeSettings() {
    settingsPanel = new SettingsPanel();
    settingsPanel.applySettings();
    
    // Add settings button
    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'btn-icon tooltip';
    settingsBtn.setAttribute('data-tooltip', 'Settings');
    settingsBtn.innerHTML = '⚙️';
    settingsBtn.addEventListener('click', () => settingsPanel.show());
    
    document.querySelector('.top-bar-actions').appendChild(settingsBtn);
}

// Auto-save feature
let autoSaveInterval;
function startAutoSave() {
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    
    autoSaveInterval = setInterval(() => {
        if (settingsPanel && settingsPanel.settings.autoSave) {
            localStorage.setItem('codeflow-files', JSON.stringify(files));
            localStorage.setItem('codeflow-current', currentFile);
        }
    }, 30000); // Save every 30 seconds
}

// Load saved files
function loadSavedFiles() {
    const savedFiles = localStorage.getItem('codeflow-files');
    const savedCurrent = localStorage.getItem('codeflow-current');
    
    if (savedFiles) {
        const parsed = JSON.parse(savedFiles);
        if (Object.keys(parsed).length > 0) {
            files = parsed;
            if (savedCurrent && files[savedCurrent]) {
                currentFile = savedCurrent;
            }
        }
    }
}


// Floating Action Button
let fabMenuOpen = false;

function toggleFabMenu() {
    const fabMenu = document.getElementById('fabMenu');
    const fabButton = document.getElementById('fabButton');
    
    fabMenuOpen = !fabMenuOpen;
    
    if (fabMenuOpen) {
        fabMenu.style.display = 'flex';
        fabButton.style.transform = 'rotate(45deg)';
    } else {
        fabMenu.style.display = 'none';
        fabButton.style.transform = 'rotate(0deg)';
    }
}

// Close FAB menu when clicking outside
document.addEventListener('click', (e) => {
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.getElementById('fabMenu');
    
    if (fabMenuOpen && !fabButton.contains(e.target) && !fabMenu.contains(e.target)) {
        toggleFabMenu();
    }
});

// Zen Mode
let zenModeActive = false;

function toggleZenMode() {
    zenModeActive = !zenModeActive;
    document.body.classList.toggle('zen-mode', zenModeActive);
    toastManager.show(zenModeActive ? 'Zen Mode ON 🧘' : 'Zen Mode OFF', 'info');
}

// Add Zen Mode to keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K for Zen Mode
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        toggleZenMode();
    }
    
    // Ctrl+H for Version History
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        showVersionHistory();
    }
});
