// 404 Page - Interactive Features

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../../index.html';
    }
}

function searchSite() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // In a real application, this would search your site
        // For now, we'll redirect to home with a search parameter
        alert(`Searching for: "${query}"\n\nIn a real application, this would search your site!`);
        searchInput.value = '';
    } else {
        searchInput.focus();
    }
}

// Allow Enter key to search
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchSite();
    }
});

// Create shooting stars
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 10px 2px white;
        top: ${Math.random() * 50}%;
        left: ${Math.random() * 100}%;
        animation: shoot 1s linear;
    `;
    
    document.querySelector('.stars').appendChild(star);
    
    setTimeout(() => star.remove(), 1000);
}

// Add shooting star animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shoot {
        from {
            transform: translate(0, 0);
            opacity: 1;
        }
        to {
            transform: translate(200px, 200px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create shooting stars periodically
setInterval(createShootingStar, 3000);

// Add particle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeOut 1s forwards;
            z-index: 9999;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
});

// Add fade out animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Log message
console.log('🚀 404 Page - Lost in Space');
console.log('Built with ❤️ by Abdel Ali');
