// Digital Clock - Full Implementation
function updateClock() {
    const now = new Date();
    
    // Format time with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
    
    // Show timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone').textContent = timezone;
}

// Update every second
setInterval(updateClock, 1000);

// Initial update
updateClock();

console.log('🕐 Digital Clock Ready');
