function togglePassword() {
    const input = document.getElementById('passwordInput');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function checkStrength() {
    const password = document.getElementById('passwordInput').value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Enter a password';
        strengthText.className = 'strength-text';
        updateRequirements(password);
        return;
    }
    
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    Object.values(checks).forEach(check => {
        if (check) strength++;
    });
    
    const percentage = (strength / 5) * 100;
    strengthBar.style.width = percentage + '%';
    
    if (strength <= 2) {
        strengthBar.style.background = '#e74c3c';
        strengthText.textContent = 'Weak Password';
        strengthText.className = 'strength-text weak';
    } else if (strength <= 3) {
        strengthBar.style.background = '#f39c12';
        strengthText.textContent = 'Medium Password';
        strengthText.className = 'strength-text medium';
    } else if (strength <= 4) {
        strengthBar.style.background = '#3498db';
        strengthText.textContent = 'Strong Password';
        strengthText.className = 'strength-text strong';
    } else {
        strengthBar.style.background = '#27ae60';
        strengthText.textContent = 'Very Strong Password';
        strengthText.className = 'strength-text very-strong';
    }
    
    updateRequirements(password);
}

function updateRequirements(password) {
    const reqs = {
        'req-length': password.length >= 8,
        'req-upper': /[A-Z]/.test(password),
        'req-lower': /[a-z]/.test(password),
        'req-number': /[0-9]/.test(password),
        'req-special': /[^A-Za-z0-9]/.test(password)
    };
    
    Object.entries(reqs).forEach(([id, met]) => {
        const el = document.getElementById(id);
        el.textContent = el.textContent.replace(/^[❌✅]/, met ? '✅' : '❌');
        el.style.color = met ? '#27ae60' : '#e74c3c';
    });
}

console.log('🔒 Password Strength Checker Ready');
