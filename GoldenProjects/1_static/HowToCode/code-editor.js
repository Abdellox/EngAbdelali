// Monaco Editor Integration for Interactive Code Examples
class CodeEditor {
    constructor() {
        this.editors = new Map();
        this.currentLanguage = 'cpp';
        this.languageMap = {
            'cpp': 'cpp',
            'python': 'python',
            'javascript': 'javascript',
            'java': 'java',
            'csharp': 'csharp',
            'go': 'go',
            'rust': 'rust',
            'php': 'php',
            'swift': 'swift',
            'kotlin': 'kotlin',
            'typescript': 'typescript',
            'r': 'r'
        };
        this.defaultCode = this.getDefaultCode();
    }

    // Initialize Monaco Editor
    initializeEditor(containerId, language, initialCode = null) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return null;
        }

        const monacoLanguage = this.languageMap[language] || 'cpp';
        const code = initialCode || this.defaultCode[language] || this.defaultCode['cpp'];

        // Create editor
        const editor = monaco.editor.create(container, {
            value: code,
            language: monacoLanguage,
            theme: 'vs-dark',
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            cursorStyle: 'line',
            wordWrap: 'on',
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
            }
        });

        this.editors.set(containerId, editor);
        return editor;
    }

    // Get default code for each language
    getDefaultCode() {
        return {
            cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
            python: `# Python Hello World
print("Hello, World!")

# Try modifying this code
name = "Programmer"
print(f"Hello, {name}!")`,
            javascript: `// JavaScript Hello World
console.log("Hello, World!");

// Try modifying this code
const name = "Programmer";
console.log(\`Hello, \${name}!\`);`,
            java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
            csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
            go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
            rust: `fn main() {
    println!("Hello, World!");
}`,
            php: `<?php
echo "Hello, World!";

// Try modifying this code
$name = "Programmer";
echo "Hello, $name!";
?>`,
            swift: `import Foundation

print("Hello, World!")

// Try modifying this code
let name = "Programmer"
print("Hello, \\(name)!")`,
            kotlin: `fun main() {
    println("Hello, World!")
    
    // Try modifying this code
    val name = "Programmer"
    println("Hello, $name!")
}`,
            typescript: `// TypeScript Hello World
console.log("Hello, World!");

// Try modifying this code
const name: string = "Programmer";
console.log(\`Hello, \${name}!\`);`,
            r: `# R Hello World
print("Hello, World!")

# Try modifying this code
name <- "Programmer"
print(paste("Hello,", name, "!"))`
        };
    }

    // Create interactive code playground
    createPlayground(language, containerId = 'code-playground') {
        const playgroundHtml = `
            <div class="code-playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <i class="fas fa-code"></i>
                        <span>Interactive Code Editor</span>
                    </div>
                    <div class="playground-actions">
                        <select id="language-selector" class="language-selector">
                            <option value="cpp" ${language === 'cpp' ? 'selected' : ''}>C++</option>
                            <option value="python" ${language === 'python' ? 'selected' : ''}>Python</option>
                            <option value="javascript" ${language === 'javascript' ? 'selected' : ''}>JavaScript</option>
                            <option value="java" ${language === 'java' ? 'selected' : ''}>Java</option>
                            <option value="csharp" ${language === 'csharp' ? 'selected' : ''}>C#</option>
                            <option value="go" ${language === 'go' ? 'selected' : ''}>Go</option>
                            <option value="rust" ${language === 'rust' ? 'selected' : ''}>Rust</option>
                            <option value="php" ${language === 'php' ? 'selected' : ''}>PHP</option>
                            <option value="swift" ${language === 'swift' ? 'selected' : ''}>Swift</option>
                            <option value="kotlin" ${language === 'kotlin' ? 'selected' : ''}>Kotlin</option>
                            <option value="typescript" ${language === 'typescript' ? 'selected' : ''}>TypeScript</option>
                            <option value="r" ${language === 'r' ? 'selected' : ''}>R</option>
                        </select>
                        <button class="btn-editor-action" onclick="codeEditor.resetCode()">
                            <i class="fas fa-undo"></i> Reset
                        </button>
                        <button class="btn-editor-action" onclick="codeEditor.copyCode()">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <button class="btn-editor-action btn-run" onclick="codeEditor.runCode()">
                            <i class="fas fa-play"></i> Run Code
                        </button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="editor-container" id="monaco-editor"></div>
                    <div class="output-container" id="code-output">
                        <div class="output-header">
                            <i class="fas fa-terminal"></i> Output
                        </div>
                        <div class="output-content" id="output-content">
                            <div class="output-placeholder">
                                <i class="fas fa-info-circle"></i>
                                <p>Click "Run Code" to see the output</p>
                                <p class="output-note">Note: Code execution opens in an online compiler</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = playgroundHtml;
            
            // Initialize Monaco Editor
            setTimeout(() => {
                this.currentLanguage = language;
                this.initializeEditor('monaco-editor', language);
                
                // Add language selector listener
                document.getElementById('language-selector').addEventListener('change', (e) => {
                    this.changeLanguage(e.target.value);
                });
            }, 100);
        }
    }

    // Change programming language
    changeLanguage(language) {
        this.currentLanguage = language;
        const editor = this.editors.get('monaco-editor');
        
        if (editor) {
            const monacoLanguage = this.languageMap[language] || 'cpp';
            const model = editor.getModel();
            monaco.editor.setModelLanguage(model, monacoLanguage);
            editor.setValue(this.defaultCode[language] || this.defaultCode['cpp']);
        }
    }

    // Get current code
    getCode() {
        const editor = this.editors.get('monaco-editor');
        return editor ? editor.getValue() : '';
    }

    // Set code
    setCode(code) {
        const editor = this.editors.get('monaco-editor');
        if (editor) {
            editor.setValue(code);
        }
    }

    // Reset code to default
    resetCode() {
        const code = this.defaultCode[this.currentLanguage] || this.defaultCode['cpp'];
        this.setCode(code);
        showNotification('Code reset to default', 'info');
    }

    // Copy code to clipboard
    async copyCode() {
        const code = this.getCode();
        try {
            await navigator.clipboard.writeText(code);
            showNotification('Code copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showNotification('Code copied to clipboard!', 'success');
        }
    }

    // Run code (executes inline - no popups!)
    async runCode() {
        const code = this.getCode();
        const language = this.currentLanguage;
        
        if (!code.trim()) {
            this.showOutputMessage('error', 'Please write some code first!');
            return;
        }

        // Check if code executor is available
        if (typeof codeExecutor !== 'undefined') {
            // Use inline executor
            this.showOutputMessage('loading', 'Executing code...');
            const result = await codeExecutor.executeCode(code, language);
            codeExecutor.displayResult(result);
        } else {
            // Fallback: show message
            this.showOutputMessage('info', 'Code executor not loaded. Add code-executor.js to enable inline execution!');
        }
    }

    // Show output message
    showOutputMessage(type, message) {
        const outputContent = document.getElementById('output-content');
        if (!outputContent) return;

        const icons = {
            loading: '<i class="fas fa-spinner fa-spin"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };

        outputContent.innerHTML = `
            <div class="output-${type}">
                ${icons[type]}
                <p>${message}</p>
            </div>
        `;
    }

    // Execute code using online compiler API (simplified version)
    async executeCodeOnline(code, language) {
        const outputContent = document.getElementById('output-content');
        
        // Note: This is a simplified version. In production, you'd use actual compiler APIs
        // For now, we'll open in a new tab with the code
        
        try {
            // Encode code for URL
            const encodedCode = encodeURIComponent(code);
            
            // Open in online compiler
            const urls = {
                cpp: `https://www.programiz.com/cpp-programming/online-compiler/`,
                python: `https://www.programiz.com/python-programming/online-compiler/`,
                java: `https://www.programiz.com/java-programming/online-compiler/`
            };
            
            window.open(urls[language], '_blank');
            
            // Show message
            if (outputContent) {
                outputContent.innerHTML = `
                    <div class="output-success">
                        <i class="fas fa-check-circle"></i>
                        <p>Code opened in online compiler</p>
                        <p class="output-note">Your code is ready to run!</p>
                        <div class="output-instructions">
                            <h4>Instructions:</h4>
                            <ol>
                                <li>The compiler opened in a new tab</li>
                                <li>Clear the default code</li>
                                <li>Paste your code (Ctrl+V / Cmd+V)</li>
                                <li>Click "Run" to see the output</li>
                            </ol>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            if (outputContent) {
                outputContent.innerHTML = `
                    <div class="output-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Could not execute code</p>
                        <p class="output-note">Please copy the code and run it in an online compiler</p>
                    </div>
                `;
            }
        }
    }

    // Create inline code editor for examples
    createInlineEditor(containerId, language, code, readOnly = false) {
        const container = document.getElementById(containerId);
        if (!container) return null;

        const editorId = `editor-${containerId}`;
        const outputId = `output-${containerId}`;
        
        container.innerHTML = `
            <div class="inline-editor">
                <div class="inline-editor-header">
                    <span class="editor-language">${language.toUpperCase()}</span>
                    ${!readOnly ? `
                        <div class="inline-editor-actions">
                            <button class="btn-inline-action" onclick="codeEditor.copyInlineCode('${editorId}')" title="Copy Code">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                            <button class="btn-inline-action btn-inline-run" onclick="codeEditor.runInlineCode('${editorId}', '${language}', '${outputId}')" title="Run Code">
                                <i class="fas fa-play"></i> Run
                            </button>
                        </div>
                    ` : ''}
                </div>
                <div class="inline-editor-body" id="${editorId}"></div>
                <div class="inline-output" id="${outputId}" style="display: none;"></div>
            </div>
        `;

        setTimeout(() => {
            const editor = monaco.editor.create(document.getElementById(editorId), {
                value: code,
                language: this.languageMap[language] || 'cpp',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                readOnly: readOnly,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineDecorationsWidth: 5,
                lineNumbersMinChars: 2
            });

            this.editors.set(editorId, editor);
        }, 100);
    }

    // Copy inline code
    async copyInlineCode(editorId) {
        const editor = this.editors.get(editorId);
        if (editor) {
            const code = editor.getValue();
            try {
                await navigator.clipboard.writeText(code);
                showNotification('Code copied!', 'success');
            } catch (err) {
                showNotification('Failed to copy code', 'error');
            }
        }
    }

    // Run inline code
    async runInlineCode(editorId, language, outputId) {
        const editor = this.editors.get(editorId);
        if (!editor) return;

        const code = editor.getValue();
        const outputDiv = document.getElementById(outputId);
        
        if (!outputDiv) return;

        // Show output container
        outputDiv.style.display = 'block';
        outputDiv.innerHTML = `
            <div class="inline-output-header">
                <i class="fas fa-terminal"></i> Output
                <button class="btn-close-output" onclick="document.getElementById('${outputId}').style.display='none'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="inline-output-content">
                <div class="output-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Executing code...</span>
                </div>
            </div>
        `;

        // Execute code
        if (typeof codeExecutor !== 'undefined') {
            const result = await codeExecutor.executeCode(code, language);
            
            const outputContent = outputDiv.querySelector('.inline-output-content');
            if (result.error) {
                outputContent.innerHTML = `
                    <div class="output-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <pre>${this.escapeHtml(result.error)}</pre>
                    </div>
                `;
            } else if (result.status === 'error') {
                outputContent.innerHTML = `
                    <div class="output-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <strong>Error:</strong>
                        <pre>${this.escapeHtml(result.output)}</pre>
                    </div>
                `;
            } else {
                outputContent.innerHTML = `
                    <div class="output-success">
                        <i class="fas fa-check-circle"></i>
                        <pre>${this.escapeHtml(result.output)}</pre>
                    </div>
                `;
            }
        } else {
            const outputContent = outputDiv.querySelector('.inline-output-content');
            outputContent.innerHTML = `
                <div class="output-error">
                    <i class="fas fa-info-circle"></i>
                    <p>Code executor not loaded</p>
                </div>
            `;
        }
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Dispose editor
    disposeEditor(containerId) {
        const editor = this.editors.get(containerId);
        if (editor) {
            editor.dispose();
            this.editors.delete(containerId);
        }
    }

    // Dispose all editors
    disposeAll() {
        this.editors.forEach(editor => editor.dispose());
        this.editors.clear();
    }
}

// Initialize code editor
const codeEditor = new CodeEditor();

// Load Monaco Editor from CDN
function loadMonacoEditor() {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.monaco) {
            resolve();
            return;
        }

        // Load Monaco Editor
        const loaderScript = document.createElement('script');
        loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
        loaderScript.onload = () => {
            require.config({ 
                paths: { 
                    'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' 
                } 
            });
            
            require(['vs/editor/editor.main'], () => {
                resolve();
            });
        };
        loaderScript.onerror = reject;
        document.head.appendChild(loaderScript);
    });
}

// Initialize Monaco when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadMonacoEditor().then(() => {
        console.log('Monaco Editor loaded successfully');
    }).catch(err => {
        console.error('Failed to load Monaco Editor:', err);
    });
});
