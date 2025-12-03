/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */

let currentIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    }
});

function openLightbox() {
    lightbox.classList.add('active');
    showImage();
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showImage() {
    const item = galleryItems[currentIndex];
    const placeholder = item.querySelector('.image-placeholder');
    const style = placeholder.style.background;
    const text = placeholder.querySelector('span').textContent;
    
    lightboxContent.innerHTML = `
        <div class="lightbox-image" style="background: ${style};">
            <span>${text}</span>
        </div>
    `;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage();
}

console.log('Lightbox Gallery - Built by Abdel Ali');
