/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const loremStart = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

const typeSelect = document.getElementById('type');
const countInput = document.getElementById('count');
const startWithLorem = document.getElementById('startWithLorem');
const output = document.getElementById('output');

function generate() {
    const type = typeSelect.value;
    const count = parseInt(countInput.value) || 1;
    const useLoremStart = startWithLorem.checked;

    let result = '';

    switch (type) {
        case 'paragraphs':
            result = generateParagraphs(count, useLoremStart);
            break;
        case 'sentences':
            result = generateSentences(count, useLoremStart);
            break;
        case 'words':
            result = generateWords(count, useLoremStart);
            break;
    }

    output.value = result;
    updateStats(result);
}

function generateWords(count, useLoremStart) {
    let words = [];
    
    if (useLoremStart) {
        words = loremStart.split(' ');
        count = Math.max(0, count - words.length);
    }

    for (let i = 0; i < count; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }

    return words.join(' ') + '.';
}

function generateSentences(count, useLoremStart) {
    let sentences = [];

    if (useLoremStart) {
        sentences.push(loremStart);
        count--;
    }

    for (let i = 0; i < count; i++) {
        const wordCount = Math.floor(Math.random() * 10) + 5;
        const words = [];
        
        for (let j = 0; j < wordCount; j++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }

        let sentence = words.join(' ');
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
        sentences.push(sentence);
    }

    return sentences.join(' ');
}

function generateParagraphs(count, useLoremStart) {
    let paragraphs = [];

    for (let i = 0; i < count; i++) {
        const sentenceCount = Math.floor(Math.random() * 5) + 3;
        const useStart = useLoremStart && i === 0;
        const paragraph = generateSentences(sentenceCount, useStart);
        paragraphs.push(paragraph);
    }

    return paragraphs.join('\n\n');
}

function quickGenerate(type, count) {
    typeSelect.value = type;
    countInput.value = count;
    generate();
}

function copyText() {
    if (!output.value) {
        alert('Generate text first!');
        return;
    }

    output.select();
    output.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');
        showFeedback('Text copied to clipboard!');
    } catch (err) {
        navigator.clipboard.writeText(output.value).then(() => {
            showFeedback('Text copied to clipboard!');
        });
    }
}

function clearText() {
    output.value = '';
    updateStats('');
}

function updateStats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const paras = text.trim() ? text.split(/\n\n/).length : 0;

    document.getElementById('wordCount').textContent = words;
    document.getElementById('charCount').textContent = chars;
    document.getElementById('paraCount').textContent = paras;
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ed573;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
    `;
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
}

// Generate initial text
generate();

console.log('Lorem Ipsum Generator - Built by Abdel Ali');
