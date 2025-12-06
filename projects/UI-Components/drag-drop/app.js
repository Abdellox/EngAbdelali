/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let draggedElement = null;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    draggedElement = event.target;
    event.target.style.opacity = '0.5';
}

function dragEnd(event) {
    event.target.style.opacity = '1';
}

function drop(event) {
    event.preventDefault();
    
    if (event.target.classList.contains('dropzone')) {
        event.target.appendChild(draggedElement);
        updateCount();
    }
}

function updateCount() {
    const zone1Count = document.getElementById('zone1').children.length;
    const zone2Count = document.getElementById('zone2').children.length;
    
    document.getElementById('count1').textContent = zone1Count;
    document.getElementById('count2').textContent = zone2Count;
}

function reset() {
    const zone1 = document.getElementById('zone1');
    const zone2 = document.getElementById('zone2');
    const items = document.getElementById('items');
    
    // Move all items back to items container
    [...zone1.children].forEach(item => items.appendChild(item));
    [...zone2.children].forEach(item => items.appendChild(item));
    
    updateCount();
}

updateCount();
console.log('Drag and Drop - Built by Abdel Ali');
