// AI Template Generator - Main Script
// Using FREE Hugging Face AI - No API keys needed!

class TemplateGenerator {
    constructor() {
        this.generatedHTML = '';
        this.generatedCSS = '';
        this.generatedJS = '';
        this.apiUrl = window.location.origin + '/api/generate';
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generateTemplate());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadTemplate());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyAllCode());
        
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    async generateTemplate() {
        const description = document.getElementById('description').value.trim();

        if (!description) {
            alert('Please describe your template!');
            return;
        }

        const btn = document.getElementById('generateBtn');
        btn.disabled = true;
        btn.querySelector('.btn-text').style.display = 'none';
        btn.querySelector('.btn-loader').style.display = 'inline';

        try {
            await this.callBackend(description);
            this.updatePreview();
            this.enableActions();
        } catch (error) {
            alert('Error generating template: ' + error.message);
            console.error(error);
        } finally {
            btn.disabled = false;
            btn.querySelector('.btn-text').style.display = 'inline';
            btn.querySelector('.btn-loader').style.display = 'none';
        }
    }

    async callBackend(description) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate template');
        }

        const data = await response.json();
        this.parseGeneratedCode(data.code);
    }

    parseGeneratedCode(content) {
        // Extract HTML
        const htmlMatch = content.match(/===\s*HTML\s*===\s*([\s\S]*?)(?===\s*CSS\s*===|$)/i);
        this.generatedHTML = htmlMatch ? htmlMatch[1].trim() : '';

        // Extract CSS
        const cssMatch = content.match(/===\s*CSS\s*===\s*([\s\S]*?)(?===\s*JS\s*===|$)/i);
        this.generatedCSS = cssMatch ? cssMatch[1].trim() : '';

        // Extract JS
        const jsMatch = content.match(/===\s*JS\s*===\s*([\s\S]*?)$/i);
        this.generatedJS = jsMatch ? jsMatch[1].trim() : '';

        // Clean up code blocks if wrapped in ```
        this.generatedHTML = this.cleanCodeBlock(this.generatedHTML);
        this.generatedCSS = this.cleanCodeBlock(this.generatedCSS);
        this.generatedJS = this.cleanCodeBlock(this.generatedJS);

        // Update code displays
        document.getElementById('htmlCode').textContent = this.generatedHTML;
        document.getElementById('cssCode').textContent = this.generatedCSS;
        document.getElementById('jsCode').textContent = this.generatedJS;
    }

    cleanCodeBlock(code) {
        return code.replace(/```[\w]*\n?/g, '').trim();
    }

    updatePreview() {
        const iframe = document.getElementById('previewFrame');
        const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        ${this.generatedCSS}
    </style>
</head>
<body>
    ${this.generatedHTML}
    <script>
        ${this.generatedJS}
    </script>
</body>
</html>`;

        iframe.srcdoc = fullHTML;
    }

    enableActions() {
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('copyBtn').disabled = false;
    }

    downloadTemplate() {
        const zip = this.createZipContent();
        const blob = new Blob([zip], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'template.html';
        a.click();
        URL.revokeObjectURL(url);
    }

    createZipContent() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Template</title>
    <style>
${this.generatedCSS}
    </style>
</head>
<body>
${this.generatedHTML}
    <script>
${this.generatedJS}
    </script>
</body>
</html>`;
    }

    copyAllCode() {
        const allCode = this.createZipContent();
        navigator.clipboard.writeText(allCode).then(() => {
            const btn = document.getElementById('copyBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied! ✓';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TemplateGenerator();
});
