const images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
    'https://picsum.photos/800/400?random=4',
    'https://picsum.photos/800/400?random=5'
];

let currentIndex = 0;
let autoplayInterval;

function render() {
    const track = document.getElementById('track');
    track.innerHTML = images.map((img, i) => `
        <div class="carousel-slide ${i === currentIndex ? 'active' : ''}" 
             style="background-image:url(${img})">
        </div>
    `).join('');
    
    const dots = document.getElementById('dots');
    dots.innerHTML = images.map((img, i) => `
        <span class="dot ${i === currentIndex ? 'active' : ''}" 
              onclick="goTo(${i})">
        </span>
    `).join('');
}

function next() {
    currentIndex = (currentIndex + 1) % images.length;
    render();
}

function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    render();
}

function goTo(index) {
    currentIndex = index;
    render();
}

function toggleAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
        document.getElementById('autoplayBtn').innerHTML = '▶ Autoplay';
    } else {
        autoplayInterval = setInterval(next, 3000);
        document.getElementById('autoplayBtn').innerHTML = '⏸ Pause';
    }
}

// Keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
});

render();
