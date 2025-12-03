/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

const loadBtn = document.getElementById('loadBtn');
const cards = document.querySelectorAll('.card');

const contentData = [
    {
        title: 'Beautiful Landscape',
        description: 'A stunning view of mountains and valleys with breathtaking scenery.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'
    },
    {
        title: 'City Lights',
        description: 'Urban architecture illuminated at night creating a magical atmosphere.',
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=200&fit=crop'
    },
    {
        title: 'Ocean Waves',
        description: 'Peaceful ocean waves crashing on a pristine sandy beach.',
        image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=200&fit=crop'
    }
];

loadBtn.addEventListener('click', loadContent);

function loadContent() {
    loadBtn.disabled = true;
    loadBtn.textContent = 'Loading...';

    // Simulate loading delay
    setTimeout(() => {
        cards.forEach((card, index) => {
            const data = contentData[index];
            card.classList.add('loaded');
            card.innerHTML = `
                <div class="card-content">
                    <img src="${data.image}" alt="${data.title}">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                </div>
            `;
        });

        loadBtn.textContent = 'Reload';
        loadBtn.disabled = false;
    }, 2000);
}

console.log('Skeleton Loader - Built by Abdel Ali');
