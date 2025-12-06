let poll = null;

function addOption() {
    const div = document.getElementById('options');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'option-input';
    input.placeholder = `Option ${div.children.length + 1}`;
    div.appendChild(input);
}

function createPoll() {
    const question = document.getElementById('question').value.trim();
    const options = Array.from(document.querySelectorAll('.option-input'))
        .map(i => i.value.trim())
        .filter(v => v);
    
    if (!question || options.length < 2) {
        alert('Please enter question and at least 2 options!');
        return;
    }
    
    poll = {
        question,
        options: options.map(o => ({ text: o, votes: 0 }))
    };
    
    renderPoll();
}

function renderPoll() {
    if (!poll) return;
    
    const display = document.getElementById('pollDisplay');
    const total = poll.options.reduce((sum, o) => sum + o.votes, 0);
    
    display.innerHTML = `
        <div class="poll-result">
            <h3>${poll.question}</h3>
            ${poll.options.map((o, i) => `
                <div class="poll-option" onclick="vote(${i})">
                    <div class="option-text">${o.text}</div>
                    <div class="option-bar">
                        <div class="option-fill" style="width: ${total > 0 ? (o.votes / total * 100) : 0}%"></div>
                    </div>
                    <div class="option-votes">
                        ${o.votes} votes (${total > 0 ? Math.round(o.votes / total * 100) : 0}%)
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function vote(index) {
    if (!poll) return;
    poll.options[index].votes++;
    renderPoll();
}
