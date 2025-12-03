/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

// Generate sample data
const items = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`
}));

const itemsPerPage = 12;
let currentPage = 1;

// DOM Elements
const itemsList = document.getElementById('itemsList');
const pageNumbers = document.getElementById('pageNumbers');
const pageInfo = document.getElementById('pageInfo');
const firstBtn = document.getElementById('firstBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const lastBtn = document.getElementById('lastBtn');

// Calculate total pages
const totalPages = Math.ceil(items.length / itemsPerPage);

// Event Listeners
firstBtn.addEventListener('click', () => goToPage(1));
prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
lastBtn.addEventListener('click', () => goToPage(totalPages));

// Render items for current page
function renderItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    itemsList.innerHTML = pageItems.map(item => `
        <div class="item-card">
            ${item.name}
        </div>
    `).join('');
}

// Render page numbers
function renderPageNumbers() {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    let html = '';

    for (let i = startPage; i <= endPage; i++) {
        html += `
            <div class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </div>
        `;
    }

    pageNumbers.innerHTML = html;
}

// Update pagination info
function updatePaginationInfo() {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, items.length);
    pageInfo.textContent = `Showing ${startItem}-${endItem} of ${items.length} items`;
}

// Update button states
function updateButtons() {
    firstBtn.disabled = currentPage === 1;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    lastBtn.disabled = currentPage === totalPages;
}

// Go to specific page
function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderItems();
    renderPageNumbers();
    updatePaginationInfo();
    updateButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize
goToPage(1);

console.log('Pagination Demo - Built by Abdel Ali');
