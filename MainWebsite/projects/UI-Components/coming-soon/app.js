const launchDate = new Date('2025-12-31T23:59:59').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = '<h2>We are live!</h2>';
    }
}

function notify() {
    const email = document.getElementById('emailInput').value;
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email!');
        return;
    }
    
    alert(`Thanks! We'll notify you at ${email}`);
    document.getElementById('emailInput').value = '';
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
