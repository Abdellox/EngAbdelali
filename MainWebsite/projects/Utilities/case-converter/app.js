function convert(type) {
    const input = document.getElementById('input').value;
    
    if (!input) {
        alert('Enter text!');
        return;
    }
    
    let result;
    
    switch (type) {
        case 'upper':
            result = input.toUpperCase();
            break;
        case 'lower':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.replace(/\w\S*/g, txt => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            break;
        case 'sentence':
            result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => 
                c.toUpperCase()
            );
            break;
        case 'camel':
            result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => 
                c.toUpperCase()
            );
            break;
        case 'snake':
            result = input.toLowerCase().replace(/\s+/g, '_');
            break;
        case 'kebab':
            result = input.toLowerCase().replace(/\s+/g, '-');
            break;
        case 'toggle':
            result = input.split('').map(c => 
                c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
            ).join('');
            break;
    }
    
    document.getElementById('output').value = result;
    updateStats();
}

function copy() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Copied!');
}

function clear() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
    updateStats();
}

function updateStats() {
    const input = document.getElementById('input').value;
    const output = document.getElementById('output').value;
    
    document.getElementById('chars').textContent = input.length;
    document.getElementById('words').textContent = input.trim() 
        ? input.trim().split(/\s+/).length 
        : 0;
    document.getElementById('lines').textContent = input.split('\n').length;
}

// Update stats on input
document.getElementById('input').addEventListener('input', updateStats);

// Initialize
updateStats();
