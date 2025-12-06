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

markdown.addEventListener('input', updatePreview);

function updatePreview() {
    const text = markdown.value;
    preview.innerHTML = parseMarkdown(text);
}

function parseMarkdown(text) {
    return text
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hul]|<pre|<blockquote)(.*$)/gim, '<p>$1</p>')
        .replace(/<p><\/p>/g, '');
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

// Set default content
markdown.value = `# Welcome to Markdown Editor

## Features
- **Bold** and *italic* text
- [Links](https://example.com)
- \`Inline code\`
- Lists and more!

### Code Block
\`\`\`
function hello() {
  console.log("Hello World!");
}
\`\`\`

> This is a blockquote

Start editing to see the preview!`;

updatePreview();

console.log('Markdown Editor - Built by Abdel Ali');
