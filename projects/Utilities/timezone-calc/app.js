/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function convert() {
    const fromTz = document.getElementById('fromTz').value;
    const toTz = document.getElementById('toTz').value;
    const timeInput = document.getElementById('timeInput').value;
    const result = document.getElementById('result');
    
    if (!timeInput) {
        result.textContent = 'Please select a time';
        return;
    }
    
    const [hours, minutes] = timeInput.split(':');
    const now = new Date();
    now.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const fromTime = now.toLocaleString('en-US', { timeZone: fromTz, hour: '2-digit', minute: '2-digit', hour12: false });
    const toTime = now.toLocaleString('en-US', { timeZone: toTz, hour: '2-digit', minute: '2-digit', hour12: false });
    
    result.innerHTML = `
        <div>${fromTime} → ${toTime}</div>
    `;
}

console.log('Timezone Calculator - Built by Abdel Ali');
