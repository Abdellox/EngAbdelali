/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const menu = document.getElementById('contextMenu');
const demoBox = document.querySelector('.demo-box');

// Show context menu on right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    // Position the menu
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
    
    // Adjust if menu goes off screen
    const menuRect = menu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) {
        menu.style.left = (e.pageX - menuRect.width) + 'px';
    }
    if (menuRect.bottom > window.innerHeight) {
        menu.style.top = (e.pageY - menuRect.height) + 'px';
    }
});

// Hide context menu on click
document.addEventListener('click', () => {
    menu.style.display = 'none';
});

// Handle menu item actions
function action(name) {
    alert(`Action: ${name}`);
    menu.style.display = 'none';
}

console.log('Context Menu - Built by Abdel Ali');
