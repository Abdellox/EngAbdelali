/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
const images = [
    { id: 1, category: 'nature', emoji: '🌲', title: 'Forest' },
    { id: 2, category: 'nature', emoji: '🏔️', title: 'Mountains' },
    { id: 3, category: 'nature', emoji: '🌊', title: 'Ocean' },
    { id: 4, category: 'city', emoji: '🏙️', title: 'Skyline' },
    { id: 5, category: 'city', emoji: '🌉', title: 'Bridge' },
    { id: 6, category: 'city', emoji: '🏛️', title: 'Architecture' },
    { id: 7, category: 'people', emoji: '👥', title: 'Group' },
    { id: 8, category: 'people', emoji: '🎭', title: 'Portrait' },
    { id: 9, category: 'food', emoji: '🍕', title: 'Pizza' },
    { id: 10, category: 'food', emoji: '🍣', title: 'Sushi' },
    { id: 11, category: 'food', emoji: '🍰', title: 'Dessert' },
    { id: 12, category: 'nature', emoji: '🌺', title: 'Flowers' }
];

function displayImages(filter = 'all') {
    const gallery = document.getElementById('gallery');
    const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);
    
    gallery.innerHTML = filtered.map(img => `
        <div class="gallery-item" onclick="openLightbox('${img.emoji}', '${img.title}')">
            <div class="image-placeholder">${img.emoji}</div>
            <div class="image-title">${img.title}</div>
        </div>
    `).join('');
}

function filterImages(category) {
    displayImages(category);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function openLightbox(emoji, title) {
    document.getElementById('lightbox').style.display = 'flex';
    document.getElementById('lightboxImg').src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
            <rect width="400" height="400" fill="#667eea"/>
            <text x="50%" y="50%" font-size="150" text-anchor="middle" dy=".3em">${emoji}</text>
        </svg>
    `);
    document.getElementById('caption').textContent = title;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

displayImages();
console.log('Image Gallery - Built by Abdel Ali');
