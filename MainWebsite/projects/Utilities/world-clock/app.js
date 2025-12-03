/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const timezones = [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Paris', zone: 'Europe/Paris' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Mumbai', zone: 'Asia/Kolkata' },
    { name: 'Singapore', zone: 'Asia/Singapore' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong' },
    { name: 'Moscow', zone: 'Europe/Moscow' },
    { name: 'Berlin', zone: 'Europe/Berlin' },
    { name: 'Toronto', zone: 'America/Toronto' },
    { name: 'Chicago', zone: 'America/Chicago' },
    { name: 'Mexico City', zone: 'America/Mexico_City' },
];

const timezoneSelect = document.getElementById('timezoneSelect');
const addTimezoneBtn = document.getElementById('addTimezone');
const clocksContainer = document.getElementById('clocksContainer');

let activeClocks = JSON.parse(localStorage.getItem('worldClocks')) || [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' }
];

// Populate timezone select
timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.zone;
    option.textContent = tz.name;
    timezoneSelect.appendChild(option);
});

// Add timezone
addTimezoneBtn.addEventListener('click', () => {
    const selectedZone = timezoneSelect.value;
    const selectedName = timezoneSelect.options[timezoneSelect.selectedIndex].text;

    if (!selectedZone) {
        alert('Please select a timezone');
        return;
    }

    if (activeClocks.some(clock => clock.zone === selectedZone)) {
        alert('This timezone is already added');
        return;
    }

    activeClocks.push({ name: selectedName, zone: selectedZone });
    saveClocks();
    displayClocks();
});

// Display clocks
function displayClocks() {
    clocksContainer.innerHTML = '';

    activeClocks.forEach((clock, index) => {
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: clock.zone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const dateString = now.toLocaleDateString('en-US', {
            timeZone: clock.zone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        clockCard.innerHTML = `
            <div class="clock-header">
                <h3>${clock.name}</h3>
                <button class="delete-btn" onclick="removeClock(${index})">×</button>
            </div>
            <div class="time">${timeString}</div>
            <div class="date">${dateString}</div>
        `;

        clocksContainer.appendChild(clockCard);
    });
}

// Remove clock
function removeClock(index) {
    activeClocks.splice(index, 1);
    saveClocks();
    displayClocks();
}

// Save to localStorage
function saveClocks() {
    localStorage.setItem('worldClocks', JSON.stringify(activeClocks));
}

// Update clocks every second
setInterval(displayClocks, 1000);

// Initial display
displayClocks();
