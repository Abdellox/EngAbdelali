/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let blockedSites = JSON.parse(localStorage.getItem('blockedSites')) || [];

function renderList() {
    const list = document.getElementById('blockedList');
    list.innerHTML = '';
    
    blockedSites.forEach((site, index) => {
        const item = document.createElement('div');
        item.className = 'blocked-item';
        item.innerHTML = `
            <span>${site}</span>
            <button onclick="removeSite(${index})">Remove</button>
        `;
        list.appendChild(item);
    });
}

function addSite() {
    const input = document.getElementById('siteInput');
    const site = input.value.trim();
    
    if (site && !blockedSites.includes(site)) {
        blockedSites.push(site);
        localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
        input.value = '';
        renderList();
    }
}

function removeSite(index) {
    blockedSites.splice(index, 1);
    localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
    renderList();
}

renderList();
console.log('Distraction Blocker - Built by Abdel Ali');
