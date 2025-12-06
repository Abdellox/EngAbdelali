let history = JSON.parse(localStorage.getItem('clipboardHistory')) || [];

function copyText() {
    const text = document.getElementById('textInput').value.trim();
    
    if (!text) {
        alert('Enter text!');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        history.unshift({
            id: Date.now(),
            text,
            time: new Date().toISOString()
        });
        
        if (history.length > 10) history.pop();
        
        save();
        render();
        alert('Copied!');
        document.getElementById('textInput').value = '';
    });
}

function recopy(id) {
    const item = history.find(h => h.id === id);
    if (item) {
        navigator.clipboard.writeText(item.text);
        alert('Copied!');
    }
}

function deleteItem(id) {
    history = history.filter(h => h.id !== id);
    save();
    render();
}

function render() {
    const list = document.getElementById('historyList');
    
    if (history.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:#999;padding:2rem">No clipboard history</p>';
        return;
    }
    
    list.innerHTML = history.map(h => `
        <div class="history-item">
            <div class="history-text">
                ${h.text.substring(0, 100)}${h.text.length > 100 ? '...' : ''}
            </div>
            <div class="history-actions">
                <button onclick="recopy(${h.id})" class="btn-action btn-recopy">Copy</button>
                <button onclick="deleteItem(${h.id})" class="btn-action btn-delete">Delete</button>
            </div>
        </div>
    `).join('');
}

function save() {
    localStorage.setItem('clipboardHistory', JSON.stringify(history));
}

// Initialize
render();
