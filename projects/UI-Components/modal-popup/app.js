// Modal Popup - Full Implementation
function openModal() {
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close when clicking outside
window.onclick = (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
};

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

console.log('📦 Modal Popup Ready');
