/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let currentYear = new Date().getFullYear();
let events = JSON.parse(localStorage.getItem('yearEvents')) || {};

function renderYear() {
    document.getElementById('yearTitle').textContent = currentYear;
    const container = document.getElementById('yearGrid');
    container.innerHTML = '';
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    months.forEach((month, i) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month-card';
        monthDiv.innerHTML = `
            <h3>${month}</h3>
            <div class="events">
                ${(events[`${currentYear}-${i}`] || []).map((event, j) => `
                    <div class="event-item">
                        <span>${event}</span>
                        <button onclick="deleteEvent(${i}, ${j})">×</button>
                    </div>
                `).join('')}
            </div>
            <input type="text" placeholder="Add event..." onkeypress="addEvent(event, ${i})">
        `;
        container.appendChild(monthDiv);
    });
}

function addEvent(event, month) {
    if (event.key === 'Enter') {
        const text = event.target.value.trim();
        if (text) {
            const key = `${currentYear}-${month}`;
            if (!events[key]) events[key] = [];
            events[key].push(text);
            localStorage.setItem('yearEvents', JSON.stringify(events));
            event.target.value = '';
            renderYear();
        }
    }
}

function deleteEvent(month, index) {
    const key = `${currentYear}-${month}`;
    events[key].splice(index, 1);
    localStorage.setItem('yearEvents', JSON.stringify(events));
    renderYear();
}

function prevYear() {
    currentYear--;
    renderYear();
}

function nextYear() {
    currentYear++;
    renderYear();
}

renderYear();
console.log('Year Planner - Built by Abdel Ali');
