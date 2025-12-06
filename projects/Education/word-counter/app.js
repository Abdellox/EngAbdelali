/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
document.getElementById('text').addEventListener('input', (e) => {
    const text = e.target.value;
    
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;
    const readTime = Math.ceil(words / 200);
    
    document.getElementById('characters').textContent = characters;
    document.getElementById('words').textContent = words;
    document.getElementById('sentences').textContent = sentences;
    document.getElementById('paragraphs').textContent = paragraphs;
    document.getElementById('readTime').textContent = readTime;
});
console.log('Word Counter - Built by Abdel Ali');
