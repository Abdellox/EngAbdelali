function copyText() {
    const text = document.getElementById('textInput').value;
    
    if (!text) {
        alert('Enter text!');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy');
    });
}

function copyExample(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied: ' + text);
    });
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}
