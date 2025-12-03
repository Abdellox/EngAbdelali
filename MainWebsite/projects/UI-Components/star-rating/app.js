/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
let currentRating = 0;

function rate(stars) {
    currentRating = stars;
    updateStars();
    document.getElementById('ratingText').textContent = `You rated: ${stars} star${stars > 1 ? 's' : ''}`;
}

function hoverStar(stars) {
    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.classList.add('hover');
        } else {
            star.classList.remove('hover');
        }
    });
}

function resetHover() {
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('hover');
    });
}

function updateStars() {
    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function resetRating() {
    currentRating = 0;
    updateStars();
    document.getElementById('ratingText').textContent = 'Rate this!';
}

console.log('Star Rating - Built by Abdel Ali');
