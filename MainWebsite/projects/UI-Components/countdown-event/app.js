let events = JSON.parse(localStorage.getItem('events')) || [];

function addEvent() {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    
    if (!name || !date) {
        alert('Fill all fields!');
        return;
    }
    
    events.push({
        id: Date.now(),
        name,
        date
    });
    
    save();
    render();
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
}

function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    save();
    render();
}

function render() {
    const list = document.getElementById('eventsList');
    
    if (events.length === 0) {
        list.innerHTML = '<div class="no-events">No events yet</div>';
        return;
    }
    
    list.innerHTML = events.map(e => {
        const now = new Date().getTime();
        const target = new Date(e.date).getTime();
        const diff = target - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        const isPast = diff < 0;
        
        return `
            <div class="event-card ${isPast ? 'past' : ''}">
                <div class="event-info">
                    <div class="event-name">${e.name}</div>
                    <div class="event-date">${new Date(e.date).toLocaleDateString()}</div>
                </div>
                <div class="countdown">
                    ${isPast ? 'Event Passed' : `${days}d ${hours}h ${mins}m ${secs}s`}
                </div>
                <button onclick="deleteEvent(${e.id})" class="btn-delete">×</button>
            </div>
        `;
    }).join('');
}

function save() {
    localStorage.setItem('events', JSON.stringify(events));
}

setInterval(render, 1000);
render();
