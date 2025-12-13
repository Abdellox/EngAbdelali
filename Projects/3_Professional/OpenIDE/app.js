// Monaco Editor Configuration
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });

let editor;
let currentFile = 'welcome.js';
let files = {
    'welcome.js': `// Welcome to CodeFlow IDE! 🚀
// A free, open-source browser-based IDE with superpowers

console.log("Hello, World!");

// ✨ Try these amazing features:
// 1. Smart Auto-completion (Ctrl+Space) - Works for all languages!
// 2. Command Palette (Ctrl+P) - Quick access to everything
// 3. Code Formatting (Alt+Shift+F) - Beautiful code instantly
// 4. Multi-language Support - 15+ languages ready to go
// 5. Live JavaScript Execution - See results immediately
// 6. Context Menu (Right-click) - Quick actions at your fingertips

function greet(name) {
    return \`Hello, \${name}! Welcome to CodeFlow IDE.\`;
}

const message = greet("Developer");
console.log(message);

// 🎯 Pro Tips:
// - Press Ctrl+P to open command palette
// - Press Ctrl+B to toggle sidebar
// - Press Ctrl+Enter to run code
// - Right-click for context menu
// - Type 'log' and press Tab for console.log snippet

// Try changing the language and see language-specific snippets!
`
};

// Initialize Monaco Editor
require(['vs/editor/editor.main'], function () {
    // Register custom snippets for all languages
    registerLanguageProviders(monaco);
    
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: files[currentFile],
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        lineHeight: 22,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        suggestOnTriggerCharacters: true,
        quickSuggestions: {
            other: true,
            comments: false,
            strings: true
        },
        tabSize: 2,
        formatOnPaste: true,
        formatOnType: true,
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: true,
        renderLineHighlight: 'all',
        bracketPairColorization: { enabled: true },
        guides: {
            bracketPairs: true,
            indentation: true
        }
    });

    // Update cursor position
    editor.onDidChangeCursorPosition((e) => {
        document.getElementById('statusPosition').textContent = 
            `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
    });

    // Save content on change
    editor.onDidChangeModelContent(() => {
        files[currentFile] = editor.getValue();
    });

    // Initialize all features
    initializeEventListeners();
    initializeFeatures();
    setupFileUpload();
    initializeSettings();
    startAutoSave();
    initializeAdvancedFeatures();
    initializeThemeManager();
    initializeCodeAssistant();
    
    // Hide welcome screen after a moment
    setTimeout(() => {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => welcomeScreen.remove(), 500);
        }
    }, 2500);
    
    // Show quick tips
    setTimeout(() => {
        toastManager.show('💡 Press Ctrl+P for all features!', 'info', 5000);
    }, 3000);
});

function initializeEventListeners() {
    // Language Selector
    document.getElementById('languageSelector').addEventListener('change', (e) => {
        const language = e.target.value;
        const languageName = e.target.options[e.target.selectedIndex].text;
        monaco.editor.setModelLanguage(editor.getModel(), language);
        document.getElementById('statusLanguage').textContent = languageName;
        
        // Update file extension
        const extensions = {
            javascript: '.js', typescript: '.ts', python: '.py',
            java: '.java', cpp: '.cpp', csharp: '.cs',
            html: '.html', css: '.css', json: '.json',
            markdown: '.md', sql: '.sql', php: '.php',
            ruby: '.rb', go: '.go', rust: '.rs'
        };
        
        toastManager.show(`Language changed to ${languageName}. Try typing snippets!`, 'success');
    });

    // Theme Selector
    document.getElementById('themeSelector').addEventListener('change', (e) => {
        const themeName = e.target.options[e.target.selectedIndex].text;
        monaco.editor.setTheme(e.target.value);
        toastManager.show(`Theme changed to ${themeName}`, 'info');
    });

    // Run Button
    document.getElementById('runBtn').addEventListener('click', runCode);

    // Download Button
    document.getElementById('downloadBtn').addEventListener('click', downloadFile);

    // New File Button
    document.getElementById('newFileBtn').addEventListener('click', createNewFile);

    // Clear Output
    document.getElementById('clearOutput').addEventListener('click', () => {
        document.getElementById('outputContent').innerHTML = '';
    });

    // Toggle Sidebar
    document.getElementById('toggleSidebar').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        const btn = document.getElementById('toggleSidebar');
        btn.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+S to download
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            downloadFile();
        }
        // Ctrl+Enter to run
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
}

function runCode() {
    const code = editor.getValue();
    const language = document.getElementById('languageSelector').value;
    const output = document.getElementById('outputContent');
    
    output.innerHTML = '<div class="output-message">Running code...</div>';

    if (language === 'javascript') {
        try {
            // Capture console.log
            const logs = [];
            const originalLog = console.log;
            console.log = function(...args) {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
                originalLog.apply(console, args);
            };

            // Execute code
            eval(code);

            // Restore console.log
            console.log = originalLog;

            // Display output
            if (logs.length > 0) {
                output.innerHTML = logs.map(log => 
                    `<div class="output-success">${escapeHtml(log)}</div>`
                ).join('');
            } else {
                output.innerHTML = '<div class="output-success">Code executed successfully (no output)</div>';
            }
        } catch (error) {
            output.innerHTML = `<div class="output-error">Error: ${escapeHtml(error.message)}</div>`;
        }
    } else if (language === 'html') {
        // Preview HTML
        const preview = `
            <iframe 
                style="width:100%;height:100%;border:none;background:white;" 
                srcdoc="${escapeHtml(code)}">
            </iframe>
        `;
        output.innerHTML = preview;
    } else {
        output.innerHTML = `<div class="output-message">⚠️ Code execution for ${language} requires a backend server. Download the file and run it locally.</div>`;
    }
}

function downloadFile() {
    const code = editor.getValue();
    const language = document.getElementById('languageSelector').value;
    
    const extensions = {
        javascript: '.js', typescript: '.ts', python: '.py',
        java: '.java', cpp: '.cpp', csharp: '.cs',
        html: '.html', css: '.css', json: '.json',
        markdown: '.md', sql: '.sql', php: '.php',
        ruby: '.rb', go: '.go', rust: '.rs'
    };
    
    const filename = currentFile.includes('.') ? currentFile : `code${extensions[language] || '.txt'}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toastManager.show(`File downloaded: ${filename}`, 'success');
}

function createNewFile() {
    const filename = prompt('Enter filename (e.g., script.js):');
    if (!filename) return;
    
    // Detect language from extension
    const ext = filename.split('.').pop();
    const langMap = {
        js: 'javascript', ts: 'typescript', py: 'python',
        java: 'java', cpp: 'cpp', cs: 'csharp',
        html: 'html', css: 'css', json: 'json',
        md: 'markdown', sql: 'sql', php: 'php',
        rb: 'ruby', go: 'go', rs: 'rust'
    };
    
    files[filename] = '// New file\n';
    currentFile = filename;
    editor.setValue(files[filename]);
    
    // Set language if detected
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
    
    // Add tab
    addTab(filename);
    
    toastManager.show(`Created new file: ${filename}`, 'success');
}

function switchFile(filename) {
    currentFile = filename;
    editor.setValue(files[filename] || '');
    
    // Update active states
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.toggle('active', item.dataset.file === filename);
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.file === filename);
    });
}

function addTab(filename) {
    const tabs = document.getElementById('tabs');
    const tab = document.createElement('div');
    tab.className = 'tab active';
    tab.dataset.file = filename;
    tab.innerHTML = `
        <span class="tab-name">${filename}</span>
        <button class="tab-close">×</button>
    `;
    
    tab.querySelector('.tab-name').addEventListener('click', () => switchFile(filename));
    tab.querySelector('.tab-close').addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(filename);
    });
    
    tabs.appendChild(tab);
}

function closeTab(filename) {
    delete files[filename];
    document.querySelector(`.tab[data-file="${filename}"]`)?.remove();
    document.querySelector(`.file-item[data-file="${filename}"]`)?.remove();
    
    // Switch to first available file
    const remainingFiles = Object.keys(files);
    if (remainingFiles.length > 0) {
        switchFile(remainingFiles[0]);
    }
}

function updateOutput(message, type = 'message') {
    const output = document.getElementById('outputContent');
    const div = document.createElement('div');
    div.className = `output-${type}`;
    div.textContent = message;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
