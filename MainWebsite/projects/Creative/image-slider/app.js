/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    updateIndicators();
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function createIndicators() {
    indicatorsContainer.innerHTML = Array.from(slides).map((_, index) => 
        `<span class="indicator ${index === 0 ? 'active' : ''}" onclick="showSlide(${index})"></span>`
    ).join('');
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-play
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause on hover
document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

createIndicators();

console.log('Image Slider - Built by Abdel Ali');
