function formatPhone() {
    const input = document.getElementById('phoneInput').value.replace(/\D/g, '');
    const style = document.getElementById('formatStyle').value;
    const output = document.getElementById('output');
    
    if (!input) {
        output.textContent = 'Enter a phone number';
        return;
    }
    
    let formatted = '';
    
    switch (style) {
        case 'us':
            if (input.length >= 10) {
                formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
            } else {
                formatted = input;
            }
            break;
        case 'international':
            if (input.length >= 10) {
                formatted = `+1 ${input.slice(0, 3)} ${input.slice(3, 6)} ${input.slice(6, 10)}`;
            } else {
                formatted = input;
            }
            break;
        case 'dots':
            if (input.length >= 10) {
                formatted = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 10)}`;
            } else {
                formatted = input;
            }
            break;
        case 'dashes':
            if (input.length >= 10) {
                formatted = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
            } else {
                formatted = input;
            }
            break;
    }
    
    output.textContent = formatted;
}

function copyFormatted() {
    const output = document.getElementById('output').textContent;
    if (output === 'Enter a phone number') {
        alert('Format a phone number first!');
        return;
    }
    navigator.clipboard.writeText(output).then(() => {
        alert('Copied to clipboard!');
    });
}

console.log('📞 Phone Formatter Ready');
