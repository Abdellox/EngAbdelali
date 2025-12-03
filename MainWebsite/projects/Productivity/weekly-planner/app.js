/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekGrid = document.getElementById('weekGrid');

days.forEach((day, index) => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
        <h3>${day}</h3>
        <textarea id="day-${index}" placeholder="Add your plans for ${day}...">${localStorage.getItem(`week-${index}`) || ''}</textarea>
    `;
    weekGrid.appendChild(card);
    
    const textarea = card.querySelector('textarea');
    textarea.addEventListener('input', () => {
        localStorage.setItem(`week-${index}`, textarea.value);
    });
});

console.log('Weekly Planner - Built by Abdel Ali');
