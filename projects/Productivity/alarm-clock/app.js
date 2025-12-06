// Alarm Clock - Full Implementation

let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
let currentAlarmId = null;
let checkInterval = null;

// Update current time
function updateCurrentTime() {
    const now = new Date();
    
    // Format time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    
    // Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone').textContent = timezone;
}

// Set alarm
function setAlarm() {
    const timeInput = document.getElementById('alarmTime').value;
    const label = document.getElementById('alarmLabel').value || 'Alarm';
    const sound = document.getElementById('alarmSound').value;
    const repeat = document.getElementById('alarmRepeat').checked;
    
    if (!timeInput) {
        alert('Please select a time for the alarm!');
        return;
    }
    
    const alarm = {
        id: Date.now(),
        time: timeInput,
        label: label,
        sound: sound,
        repeat: repeat,
        active: true,
        createdAt: new Date().toISOString()
    };
    
    alarms.push(alarm);
    saveAlarms();
    renderAlarms();
    
    // Clear form
    document.getElementById('alarmTime').value = '';
    document.getElementById('alarmLabel').value = '';
    document.getElementById('alarmRepeat').checked = false;
    
    // Show success message
    showNotification(`Alarm set for ${timeInput}`);
}

// Toggle alarm
function toggleAlarm(id) {
    const alarm = alarms.find(a => a.id === id);
    if (alarm) {
        alarm.active = !alarm.active;
        saveAlarms();
        renderAlarms();
    }
}

// Delete alarm
function deleteAlarm(id) {
    if (confirm('Are you sure you want to delete this alarm?')) {
        alarms = alarms.filter(a => a.id !== id);
        saveAlarms();
        renderAlarms();
    }
}

// Clear all alarms
function clearAllAlarms() {
    if (alarms.length === 0) return;
    
    if (confirm('Are you sure you want to delete all alarms?')) {
        alarms = [];
        saveAlarms();
        renderAlarms();
    }
}

// Render alarms
function renderAlarms() {
    const alarmsList = document.getElementById('alarmsList');
    const alarmCount = document.getElementById('alarmCount');
    
    alarmCount.textContent = alarms.length;
    
    if (alarms.length === 0) {
        alarmsList.innerHTML = `
            <div class="no-alarms">
                <span class="icon">⏰</span>
                <p>No alarms set</p>
                <small>Create your first alarm above</small>
            </div>
        `;
        return;
    }
    
    alarmsList.innerHTML = alarms.map(alarm => `
        <div class="alarm-item">
            <div class="alarm-info">
                <div class="alarm-time">${alarm.time}</div>
                <div class="alarm-label">${alarm.label}</div>
                <div class="alarm-details">
                    <span>🔔 ${alarm.sound}</span>
                    ${alarm.repeat ? '<span>🔁 Daily</span>' : '<span>📅 Once</span>'}
                    <span>${alarm.active ? '✅ Active' : '⏸️ Paused'}</span>
                </div>
            </div>
            <div class="alarm-actions">
                <button onclick="toggleAlarm(${alarm.id})" class="btn-toggle ${alarm.active ? '' : 'inactive'}">
                    ${alarm.active ? 'Pause' : 'Resume'}
                </button>
                <button onclick="deleteAlarm(${alarm.id})" class="btn-delete">Delete</button>
            </div>
        </div>
    `).join('');
}

// Check alarms
function checkAlarms() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    alarms.forEach(alarm => {
        if (alarm.active && alarm.time === currentTime) {
            triggerAlarm(alarm);
            
            // If not repeating, deactivate the alarm
            if (!alarm.repeat) {
                alarm.active = false;
                saveAlarms();
                renderAlarms();
            }
        }
    });
}

// Trigger alarm
function triggerAlarm(alarm) {
    currentAlarmId = alarm.id;
    
    // Show modal
    document.getElementById('modalLabel').textContent = alarm.label;
    document.getElementById('modalTime').textContent = alarm.time;
    document.getElementById('alarmModal').classList.add('show');
    
    // Play sound
    playAlarmSound(alarm.sound);
    
    // Notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Alarm!', {
            body: `${alarm.label} - ${alarm.time}`,
            icon: '⏰'
        });
    }
}

// Play alarm sound
function playAlarmSound(soundType) {
    // Create audio context for beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different sounds
    const frequencies = {
        beep: 800,
        chime: 1000,
        bell: 600,
        digital: 1200
    };
    
    oscillator.frequency.value = frequencies[soundType] || 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
    
    // Repeat sound
    let repeatCount = 0;
    const repeatInterval = setInterval(() => {
        if (repeatCount >= 5 || !document.getElementById('alarmModal').classList.contains('show')) {
            clearInterval(repeatInterval);
            return;
        }
        
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = frequencies[soundType] || 800;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 1);
        
        repeatCount++;
    }, 1500);
}

// Snooze alarm
function snoozeAlarm() {
    const alarm = alarms.find(a => a.id === currentAlarmId);
    if (alarm) {
        // Add 5 minutes to current time
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        const snoozeTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        // Create snooze alarm
        const snoozeAlarm = {
            id: Date.now(),
            time: snoozeTime,
            label: `${alarm.label} (Snoozed)`,
            sound: alarm.sound,
            repeat: false,
            active: true,
            createdAt: new Date().toISOString()
        };
        
        alarms.push(snoozeAlarm);
        saveAlarms();
        renderAlarms();
        
        showNotification(`Alarm snoozed for 5 minutes (${snoozeTime})`);
    }
    
    dismissAlarm();
}

// Dismiss alarm
function dismissAlarm() {
    document.getElementById('alarmModal').classList.remove('show');
    currentAlarmId = null;
}

// Save alarms to localStorage
function saveAlarms() {
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// Show notification
function showNotification(message) {
    // You can implement a toast notification here
    console.log(message);
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

renderAlarms();

// Check alarms every second
checkInterval = setInterval(checkAlarms, 1000);

console.log('⏰ Alarm Clock - Fully Functional');
