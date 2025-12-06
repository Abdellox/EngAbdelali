function updatePreview() {
    const name = document.getElementById('name').value || 'Your Name';
    const title = document.getElementById('title').value || 'Your Title';
    const about = document.getElementById('about').value || 'About you...';
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim());

    const preview = document.getElementById('portfolioPreview');
    preview.innerHTML = `
        <div class="portfolio-site">
            <header class="hero">
                <h1>${name}</h1>
                <p class="subtitle">${title}</p>
            </header>
            <section class="about-section">
                <h2>About Me</h2>
                <p>${about}</p>
            </section>
            <section class="skills-section">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${skills.map(skill => `<div class="skill-card">${skill}</div>`).join('')}
                </div>
            </section>
        </div>
    `;
}

// Auto-update on input
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
});

updatePreview();
console.log('🌐 Portfolio Builder Ready');
