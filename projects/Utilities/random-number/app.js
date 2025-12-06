let history = [];

function generate() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    
    if (min >= max) {
        alert('Min must be less than Max!');
        return;
    }
    
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('result').textContent = num;
    
    // Add to history
    history.unshift(num);
    if (history.length > 10) history.pop();
    
    // Display history
    document.getElementById('history').innerHTML = history.length > 0
        ? '<h3>History:</h3>' + history.map(n => `<span class="history-item">${n}</span>`).join('')
        : '';
}

// Generate initial number
generate();
