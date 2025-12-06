/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

let currentIndex = 0;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function showSlide(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showSlide(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

console.log('Testimonial Slider - Built by Abdel Ali');
