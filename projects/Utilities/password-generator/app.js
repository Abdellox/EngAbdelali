// Password Generator - Full Implementation
function generate() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (document.getElementById('upper').checked) chars += upper;
    if (document.getElementById('lower').checked) chars += lower;
    if (document.getElementById('numbers').checked) chars += numbers;
    if (document.getElementById('symbols').checked) chars += symbols;
    
    if (chars === '') {
        alert('Please select at least one option!');
        return;
    }
    
    const length = parseInt(document.getElementById('length').value);
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    document.getElementById('password').textContent = password;
}

function copyPassword() {
    const password = document.getElementById('password').textContent;
    if (password === 'Click Generate') {
        alert('Generate a password first!');
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
}

console.log('🔐 Password Generator Ready');
