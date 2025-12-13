// AI-Powered Code Assistant

class CodeAssistant {
    constructor() {
        this.isActive = false;
    }

    analyze(code, language) {
        const suggestions = [];
        
        // Check for common patterns
        if (language === 'javascript') {
            if (code.includes('fetch') && !code.includes('catch')) {
                suggestions.push({
                    message: 'Add error handling to fetch calls',
                    code: 'try {\n  const response = await fetch(url);\n} catch (error) {\n  console.error(error);\n}',
                    severity: 'warning'
                });
            }
            if (code.includes('.then(') && code.length > 100) {
                suggestions.push({
                    message: 'Consider using async/await',
                    code: 'const result = await promise;',
                    severity: 'info'
                });
            }
        }

        if (code.length > 1000) {
            suggestions.push({
                message: 'Consider breaking into smaller functions',
                severity: 'info'
            });
        }

        return suggestions;
    }

    showSuggestions(suggestions) {
        if (suggestions.length === 0) {
            toastManager.show('Code looks good! ✨', 'success');
            return;
        }

        const panel = document.createElement('div');
        panel.className = 'command-palette active';
        panel.innerHTML = `
            <div style="padding: 20px;">
                <h2 style="margin-bottom: 20px; color: #667eea;">🤖 AI Suggestions</h2>
                <div style="max-height: 400px; overflow-y: auto;">
                    ${suggestions.map(s => `
                        <div style="background: #2d2d30; padding: 15px; margin-bottom: 10px; border-radius: 6px;">
                            <div style="font-weight: 600;">${s.message}</div>
                            ${s.code ? `<pre style="background: #1e1e1e; padding: 10px; margin-top: 10px; border-radius: 4px; font-size: 12px;">${s.code}</pre>` : ''}
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-secondary" onclick="this.closest('.command-palette').remove()" style="margin-top: 20px; width: 100%;">Close</button>
            </div>
        `;
        document.body.appendChild(panel);
    }
}

let codeAssistant;

function initializeCodeAssistant() {
    codeAssistant = new CodeAssistant();
    
    if (commandPalette) {
        commandPalette.commands.push(
            { name: 'AI Suggestions', icon: '🤖', shortcut: '', action: () => {
                const code = editor.getValue();
                const language = document.getElementById('languageSelector').value;
                const suggestions = codeAssistant.analyze(code, language);
                codeAssistant.showSuggestions(suggestions);
            }}
        );
        commandPalette.renderCommands();
    }
}
