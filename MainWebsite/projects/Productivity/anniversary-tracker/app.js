// Anniversary Tracker - Full Implementation

let anniversaries = JSON.parse(localStorage.getItem('anniversaries')) || [];
let currentFilter = 'all';

const categoryEmojis = {
    relationship: '💕',
    wedding: '💍',
    birthday: '🎂',
    friendship: '👥',
    work: '💼',
    other: '⭐'
};

function addAnniversary() {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const notes = document.getElementById('eventNotes').value.trim();
    
    if (!name || !date) {
        alert('Please fill in the event name and date!');
        return;
    }
    
    const anniversary = {
        id: Date.now(),
        name,
        date,
        category,
        notes,
        createdAt: new Date().toISOString()
    };
    
    anniversaries.push(anniversary);
    saveAnniversaries();
    renderAnniversaries();
    
    // Clear form
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventNotes').value = '';
    
    // Show success
    showNotification(`Anniversary "${name}" added successfully!`);
}

function deleteAnniversary(id) {
    if (confirm('Are you sure you want to delete this anniversary?')) {
        anniversaries = anniversaries.filter(a => a.id !== id);
        saveAnniversaries();
        renderAnniversaries();
    }
}

function filterAnniversaries(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderAnniversaries();
}

function renderAnniversaries() {
    const list = document.getElementById('anniversariesList');
    const count = document.getElementById('anniversaryCount');
    
    let filtered = [...anniversaries];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Apply filter
    if (currentFilter === 'upcoming') {
        filtered = filtered.filter(a => {
            const nextDate = getNextAnniversaryDate(new Date(a.date));
            return nextDate >= today;
        });
    } else if (currentFilter === 'past') {
        filtered = filtered.filter(a => {
            const nextDate = getNextAnniversaryDate(new Date(a.date));
            return nextDate < today;
        });
    }
    
    // Sort by next occurrence
    filtered.sort((a, b) => {
        const dateA = getNextAnniversaryDate(new Date(a.date));
        const dateB = getNextAnniversaryDate(new Date(b.date));
        return dateA - dateB;
    });
    
    count.textContent = anniversaries.length;
    
    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="no-anniversaries">
                <span class="icon">💝</span>
                <p>No ${currentFilter === 'all' ? '' : currentFilter} anniversaries</p>
                <small>${currentFilter === 'all' ? 'Add your first special date above' : 'Try a different filter'}</small>
            </div>
        `;
        return;
    }
    
    list.innerHTML = filtered.map(anniversary => {
        const originalDate = new Date(anniversary.date);
        const nextDate = getNextAnniversaryDate(originalDate);
        const yearsAgo = Math.floor((new Date() - originalDate) / (365.25 * 24 * 60 * 60 * 1000));
        const daysUntil = Math.ceil((nextDate - today) / (24 * 60 * 60 * 1000));
        
        const isUpcoming = daysUntil >= 0 && daysUntil <= 30;
        const isToday = daysUntil === 0;
        
        return `
            <div class="anniversary-card">
                <div class="card-header">
                    <div class="card-title">
                        <div class="event-name">${categoryEmojis[anniversary.category]} ${anniversary.name}</div>
                        <span class="event-category">${anniversary.category}</span>
                    </div>
                    <div class="card-actions">
                        <button onclick="deleteAnniversary(${anniversary.id})" class="btn-delete">Delete</button>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="info-box">
                        <div class="info-label">Years</div>
                        <div class="info-value large">${yearsAgo}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Days Until</div>
                        <div class="info-value">${daysUntil}</div>
                    </div>
                    <div class="info-box">
                        <div class="info-label">Next Date</div>
                        <div class="info-value" style="font-size: 1rem;">${formatDate(nextDate)}</div>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="event-date">
                        📅 Original Date: ${formatDate(originalDate)}
                    </div>
                    ${anniversary.notes ? `<div class="event-notes">💭 ${anniversary.notes}</div>` : ''}
                    ${isToday ? '<div class="countdown-badge">🎉 Today!</div>' : ''}
                    ${isUpcoming && !isToday ? `<div class="countdown-badge upcoming">Coming Soon!</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function getNextAnniversaryDate(originalDate) {
    const today = new Date();
    const thisYear = today.getFullYear();
    
    let nextDate = new Date(thisYear, originalDate.getMonth(), originalDate.getDate());
    
    if (nextDate < today) {
        nextDate.setFullYear(thisYear + 1);
    }
    
    return nextDate;
}

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function saveAnniversaries() {
    localStorage.setItem('anniversaries', JSON.stringify(anniversaries));
}

function showNotification(message) {
    console.log(message);
    // You can implement a toast notification here
}

// Initialize
renderAnniversaries();

console.log('💝 Anniversary Tracker - Fully Functional');
