/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const items = [
    'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'TypeScript', 'Go', 'Rust', 'Scala', 'Perl', 'Haskell', 'Lua', 'Dart'
];

function renderItems(filteredItems = items) {
    const list = document.getElementById('itemList');
    list.innerHTML = filteredItems.map(item => 
        `<div class="item">${item}</div>`
    ).join('');
    
    document.getElementById('count').textContent = `${filteredItems.length} items`;
}

function search() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = items.filter(item => 
        item.toLowerCase().includes(query)
    );
    renderItems(filtered);
}

renderItems();
console.log('Search Filter - Built by Abdel Ali');
