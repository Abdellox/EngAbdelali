// Dictionary functionality
function renderDictionary() {
    const dictionaryResult = document.getElementById('dictionaryResult');
    dictionaryResult.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #666;">
            <p style="font-size: 1.2rem;">Search for any English word to see its definition, pronunciation, and examples.</p>
        </div>
    `;
}

function searchWord() {
    const searchInput = document.getElementById('dictionarySearch');
    const word = searchInput.value.trim().toLowerCase();
    
    if (!word) {
        alert('Please enter a word to search');
        return;
    }
    
    // Check local dictionary first
    if (DICTIONARY[word]) {
        displayWordResult(DICTIONARY[word]);
    } else {
        // Use Free Dictionary API
        fetchWordFromAPI(word);
    }
}

function fetchWordFromAPI(word) {
    const resultDiv = document.getElementById('dictionaryResult');
    resultDiv.innerHTML = '<p>Searching...</p>';
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            const wordData = data[0];
            const meaning = wordData.meanings[0];
            
            const result = {
                word: wordData.word,
                pronunciation: wordData.phonetic || 'N/A',
                partOfSpeech: meaning.partOfSpeech,
                definition: meaning.definitions[0].definition,
                examples: meaning.definitions[0].example ? [meaning.definitions[0].example] : [],
                synonyms: meaning.synonyms || []
            };
            
            displayWordResult(result);
        })
        .catch(error => {
            resultDiv.innerHTML = `
                <div class="word-result">
                    <h3>❌ Word not found</h3>
                    <p>Sorry, we couldn't find "${word}" in our dictionary.</p>
                    <p>Please check the spelling and try again.</p>
                </div>
            `;
        });
}

function displayWordResult(wordData) {
    const resultDiv = document.getElementById('dictionaryResult');
    
    resultDiv.innerHTML = `
        <div class="word-result">
            <h2>${wordData.word}</h2>
            <p style="color: #666; font-style: italic; font-size: 1.2rem;">${wordData.pronunciation}</p>
            <button class="btn btn-primary" onclick="speakWord('${wordData.word}')">🔊 Pronounce</button>
            
            <h3 style="margin-top: 2rem;">Part of Speech</h3>
            <p><em>${wordData.partOfSpeech}</em></p>
            
            <h3>Definition</h3>
            <p>${wordData.definition}</p>
            
            ${wordData.examples.length > 0 ? `
                <h3>Examples</h3>
                <ul>
                    ${wordData.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            ` : ''}
            
            ${wordData.synonyms.length > 0 ? `
                <h3>Synonyms</h3>
                <p>${wordData.synonyms.join(', ')}</p>
            ` : ''}
        </div>
    `;
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('dictionarySearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWord();
            }
        });
    }
});
