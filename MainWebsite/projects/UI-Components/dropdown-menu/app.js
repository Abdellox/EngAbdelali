// Dropdown Menu - Full Implementation
function toggle() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

function select(option) {
    document.getElementById('result').textContent = 'Selected: ' + option;
    toggle();
}

// Close dropdown when clicking outside
window.onclick = (e) => {
    if (!e.target.matches('.dropdown-btn')) {
        const menu = document.getElementById('menu');
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
};

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const menu = document.getElementById('menu');
    if (e.key === 'Escape' && menu.classList.contains('show')) {
        toggle();
    }
});

console.log('📋 Dropdown Menu Ready');
