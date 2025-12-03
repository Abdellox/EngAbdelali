/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

function startCountdown() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = new Date(document.getElementById('eventDate').value);
    
    if (!eventName || !eventDate || isNaN(eventDate)) {
        alert('Please enter event name and date');
        return;
    }
    
    document.getElementById('title').textContent = eventName;
    
    const interval = setInterval(() => {
        const now = new Date();
        const diff = eventDate - now;
        
        if (diff <= 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = '<h2>Event has arrived!</h2>';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').innerHTML = `
            <div class="time-unit"><span>${days}</span><label>Days</label></div>
            <div class="time-unit"><span>${hours}</span><label>Hours</label></div>
            <div class="time-unit"><span>${minutes}</span><label>Minutes</label></div>
            <div class="time-unit"><span>${seconds}</span><label>Seconds</label></div>
        `;
    }, 1000);
}

console.log('Event Countdown - Built by Abdel Ali');
