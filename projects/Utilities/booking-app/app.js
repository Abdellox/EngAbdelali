let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

function bookAppointment() {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;
    const service = document.getElementById('serviceInput').value;
    
    if (!name || !email || !date || !time) {
        alert('Please fill all required fields!');
        return;
    }
    
    bookings.push({
        id: Date.now(),
        name,
        email,
        date,
        time,
        service,
        status: 'confirmed',
        created: new Date().toISOString()
    });
    
    saveBookings();
    renderBookings();
    document.getElementById('bookingForm').reset();
    alert('Booking confirmed!');
}

function cancelBooking(id) {
    if (confirm('Cancel this booking?')) {
        bookings = bookings.filter(b => b.id !== id);
        saveBookings();
        renderBookings();
    }
}

function renderBookings() {
    const list = document.getElementById('bookingsList');
    const sorted = [...bookings].sort((a, b) => 
        new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
    );
    
    if (sorted.length === 0) {
        list.innerHTML = '<div class="no-bookings">No bookings yet</div>';
        return;
    }
    
    list.innerHTML = sorted.map(b => `
        <div class="booking-card">
            <div class="booking-header">
                <div class="booking-service">${b.service}</div>
                <span class="booking-status ${b.status}">${b.status}</span>
            </div>
            <div class="booking-details">
                <div class="detail"><strong>Name:</strong> ${b.name}</div>
                <div class="detail"><strong>Email:</strong> ${b.email}</div>
                <div class="detail"><strong>Date:</strong> ${new Date(b.date).toLocaleDateString()}</div>
                <div class="detail"><strong>Time:</strong> ${b.time}</div>
            </div>
            <button onclick="cancelBooking(${b.id})" class="btn-cancel">Cancel Booking</button>
        </div>
    `).join('');
}

function saveBookings() {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Set minimum date to today
document.getElementById('dateInput').min = new Date().toISOString().split('T')[0];

// Initialize
renderBookings();
