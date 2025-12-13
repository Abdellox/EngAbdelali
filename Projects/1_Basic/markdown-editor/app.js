/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const markdown = document.getElementById('markdown');
const preview = document.getElementById('preview');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');

markdown.addEventListener('input', updatePreview);
markdown.addEventListener('scroll', syncScroll);

function updatePreview() {
    const text = markdown.value;
    preview.innerHTML = parseMarkdown(text);
    updateStats(text);
}

function updateStats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    
    if (wordCount) wordCount.textContent = words;
    if (charCount) charCount.textContent = chars;
}

function syncScroll() {
    const scrollPercent = markdown.scrollTop / (markdown.scrollHeight - markdown.clientHeight);
    preview.scrollTop = scrollPercent * (preview.scrollHeight - preview.clientHeight);
}

function parseMarkdown(text) {
    // Enhanced markdown parser with better regex patterns
    let html = text
        // Headers (must be at start of line)
        .replace(/^#{6}\s+(.*$)/gim, '<h6>$1</h6>')
        .replace(/^#{5}\s+(.*$)/gim, '<h5>$1</h5>')
        .replace(/^#{4}\s+(.*$)/gim, '<h4>$1</h4>')
        .replace(/^#{3}\s+(.*$)/gim, '<h3>$1</h3>')
        .replace(/^#{2}\s+(.*$)/gim, '<h2>$1</h2>')
        .replace(/^#{1}\s+(.*$)/gim, '<h1>$1</h1>')
        
        // Code blocks (before inline code)
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'text';
            return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
        })
        
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Bold and italic (order matters)
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        // Strikethrough
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">')
        
        // Horizontal rule
        .replace(/^---$/gm, '<hr>')
        
        // Blockquotes
        .replace(/^>\s+(.*$)/gim, '<blockquote>$1</blockquote>')
        
        // Tables (basic support)
        .replace(/\|(.+)\|/g, (match, content) => {
            const cells = content.split('|').map(cell => cell.trim());
            return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
        });
    
    // Handle lists
    html = processLists(html);
    
    // Handle paragraphs
    html = processParagraphs(html);
    
    return html;
}

function processLists(html) {
    // Unordered lists
    html = html.replace(/^[-*+]\s+(.*$)/gim, '<li>$1</li>');
    
    // Ordered lists
    html = html.replace(/^\d+\.\s+(.*$)/gim, '<oli>$1</oli>');
    
    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/(<oli>.*<\/oli>)/gs, '<ol>$1</ol>');
    html = html.replace(/<oli>/g, '<li>').replace(/<\/oli>/g, '</li>');
    
    return html;
}

function processParagraphs(html) {
    // Split by double newlines for paragraphs
    const lines = html.split('\n');
    let result = '';
    let inParagraph = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '') {
            if (inParagraph) {
                result += '</p>\n';
                inParagraph = false;
            }
        } else if (line.match(/^<(h[1-6]|hr|blockquote|pre|ul|ol)/)) {
            if (inParagraph) {
                result += '</p>\n';
                inParagraph = false;
            }
            result += line + '\n';
        } else {
            if (!inParagraph) {
                result += '<p>';
                inParagraph = true;
            } else {
                result += ' ';
            }
            result += line;
        }
    }
    
    if (inParagraph) {
        result += '</p>';
    }
    
    return result;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function insertMarkdown(before, after = '') {
    const start = markdown.selectionStart;
    const end = markdown.selectionEnd;
    const text = markdown.value;
    const selected = text.substring(start, end);
    
    markdown.value = text.substring(0, start) + before + selected + after + text.substring(end);
    markdown.focus();
    markdown.selectionStart = start + before.length;
    markdown.selectionEnd = start + before.length + selected.length;
    
    updatePreview();
}

function downloadMarkdown() {
    const content = markdown.value;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
}

function downloadHTML() {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
    </style>
</head>
<body>
${preview.innerHTML}
</body>
</html>`;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
}

function clearEditor() {
    if (confirm('Clear all content?')) {
        markdown.value = '';
        updatePreview();
        markdown.focus();
    }
}

// Keyboard shortcuts
markdown.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'b':
                e.preventDefault();
                insertMarkdown('**', '**');
                break;
            case 'i':
                e.preventDefault();
                insertMarkdown('*', '*');
                break;
            case 's':
                e.preventDefault();
                downloadMarkdown();
                break;
        }
    }
    
    // Tab for indentation
    if (e.key === 'Tab') {
        e.preventDefault();
        insertMarkdown('  ');
    }
});

// Set default content
markdown.value = `# Welcome to Enhanced Markdown Editor

## Features ✨
- **Bold** and *italic* text
- ~~Strikethrough~~ text
- [Links](https://example.com) and images
- \`Inline code\` and code blocks
- Lists, tables, and blockquotes
- Live preview with scroll sync
- Word and character count
- Export to Markdown or HTML

### Keyboard Shortcuts
- **Ctrl+B**: Bold
- **Ctrl+I**: Italic  
- **Ctrl+S**: Download
- **Tab**: Indent

### Code Example
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

> **Tip**: Use the toolbar buttons or keyboard shortcuts for quick formatting!

### Lists
- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

---

Start editing to see the magic happen! 🎉`;

updatePreview();
markdown.focus();

console.log('Enhanced Markdown Editor - Built by Abdel Ali');