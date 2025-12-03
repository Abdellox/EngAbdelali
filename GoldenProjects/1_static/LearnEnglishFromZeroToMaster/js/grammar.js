// Grammar guide functionality
function renderGrammar() {
    const grammarTopics = document.getElementById('grammarTopics');
    
    grammarTopics.innerHTML = GRAMMAR_TOPICS.map(topic => `
        <div class="grammar-topic" onclick="showGrammarTopic(${topic.id})">
            <h3>${topic.title}</h3>
            <p>Level ${topic.level} | Click to learn more</p>
        </div>
    `).join('');
}

function showGrammarTopic(topicId) {
    const topic = GRAMMAR_TOPICS.find(t => t.id === topicId);
    
    if (!topic) return;
    
    const grammarTopics = document.getElementById('grammarTopics');
    grammarTopics.innerHTML = `
        <button class="back-button" onclick="renderGrammar()">← Back to Topics</button>
        <div style="background: white; padding: 2rem; border-radius: 10px; margin-top: 1rem;">
            ${topic.content}
        </div>
        <div style="margin-top: 2rem;">
            <button class="btn btn-primary" onclick="renderGrammar()">Back to All Topics</button>
        </div>
    `;
}
