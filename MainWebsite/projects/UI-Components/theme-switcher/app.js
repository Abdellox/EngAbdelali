/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

let isDark = false;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    isDark = true;
    document.body.setAttribute('data-theme', 'dark');
    updateThemeButton();
}

themeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    isDark = !isDark;
    
    if (isDark) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
    
    updateThemeButton();
}

function updateThemeButton() {
    if (isDark) {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
}

console.log('Theme Switcher - Built by Abdel Ali');
