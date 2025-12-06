/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function navigate(page) {
    document.getElementById('content').innerHTML = `
        <h2>${page}</h2>
        <p>You navigated to ${page} page.</p>
    `;
    closeSidebar();
}

console.log('Sidebar - Built by Abdel Ali');
