// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Checklist functionality - save state to localStorage
const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');

// Load saved checkbox states
checkboxes.forEach((checkbox, index) => {
    const savedState = localStorage.getItem(`checkbox-${index}`);
    if (savedState === 'true') {
        checkbox.checked = true;
    }
    
    // Save state on change
    checkbox.addEventListener('change', function() {
        localStorage.setItem(`checkbox-${index}`, this.checked);
        updateProgress();
    });
});

// Progress tracking
function updateProgress() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
    const percentage = Math.round((checked / total) * 100);
    
    console.log(`SEO Checklist Progress: ${checked}/${total} (${percentage}%)`);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .strategy-section, .tool-card, .tip-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize progress on load
updateProgress();
