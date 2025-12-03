/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
function validateForm(event) {
    event.preventDefault();
    
    clearErrors();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const age = document.getElementById('age').value;
    
    let isValid = true;
    
    // Name validation
    if (name.length < 3) {
        showError('name', 'Name must be at least 3 characters');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    // Password validation
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // Confirm password
    if (password !== confirm) {
        showError('confirm', 'Passwords do not match');
        isValid = false;
    }
    
    // Age validation
    if (age < 18 || age > 100) {
        showError('age', 'Age must be between 18 and 100');
        isValid = false;
    }
    
    if (isValid) {
        document.getElementById('success').style.display = 'block';
        document.getElementById('registrationForm').reset();
        setTimeout(() => {
            document.getElementById('success').style.display = 'none';
        }, 3000);
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });
    document.getElementById('success').style.display = 'none';
}

console.log('Form Validator - Built by Abdel Ali');
