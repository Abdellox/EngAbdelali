/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const definitions = {
    'hello': { word: 'hello', type: 'interjection', definition: 'Used as a greeting or to begin a conversation', example: 'Hello, how are you?' },
    'world': { word: 'world', type: 'noun', definition: 'The earth and all its inhabitants', example: 'We live in a beautiful world' },
    'code': { word: 'code', type: 'noun', definition: 'Instructions written in a programming language', example: 'She writes clean code' },
    'javascript': { word: 'javascript', type: 'noun', definition: 'A programming language commonly used for web development', example: 'JavaScript powers modern websites' },
    'portfolio': { word: 'portfolio', type: 'noun', definition: 'A collection of work samples', example: 'Check out my portfolio website' }
};

function searchWord() {
    const word = document.getElementById('wordInput').value.toLowerCase().trim();
    const result = document.getElementById('result');
    
    if (!word) {
        result.innerHTML = '<p class="error">Please enter a word</p>';
        return;
    }
    
    if (definitions[word]) {
        const def = definitions[word];
        result.innerHTML = `
            <div class="definition">
                <h2>${def.word}</h2>
                <p class="type">${def.type}</p>
                <p class="meaning">${def.definition}</p>
                <p class="example"><strong>Example:</strong> "${def.example}"</p>
            </div>
        `;
    } else {
        result.innerHTML = `
            <p class="error">Word not found in dictionary. Try: hello, world, code, javascript, portfolio</p>
        `;
    }
}

console.log('Dictionary App - Built by Abdel Ali');
