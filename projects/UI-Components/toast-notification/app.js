/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
function showToast(type) {
    const container = document.getElementById('toastContainer');
    
    const messages = {
        success: '✓ Success! Operation completed.',
        error: '✗ Error! Something went wrong.',
        warning: '⚠ Warning! Please check your input.',
        info: 'ℹ Info: This is an information message.'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = messages[type];
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

console.log('Toast Notification - Built by Abdel Ali');
