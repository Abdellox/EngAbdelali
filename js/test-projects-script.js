// Test Projects Interface Script

document.addEventListener('DOMContentLoaded', function() {
    // Tier Navigation
    const tierButtons = document.querySelectorAll('.tier-btn');
    const projectSections = document.querySelectorAll('.projects-section');
    
    tierButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tier = this.getAttribute('data-tier');
            
            // Remove active class from all buttons
            tierButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all sections
            projectSections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            const targetSection = document.getElementById(`${tier}-projects`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Unlock Buttons
    const unlockButtons = document.querySelectorAll('.unlock-btn');
    
    unlockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPremium = this.classList.contains('premium');
            const tierName = isPremium ? 'Professional' : 'Intermediate';
            
            alert(`🔓 Unlock ${tierName} Projects\n\nThis would open your unlock system modal.\nIn the real implementation, this will integrate with your existing unlock-system.js`);
        });
    });
    
    // View Project Buttons
    const viewButtons = document.querySelectorAll('.view-btn:not([disabled])');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectName = projectCard.querySelector('h3').textContent;
            const projectFolder = projectCard.getAttribute('data-folder');
            
            if (projectFolder) {
                // Navigate to actual project
                window.location.href = `projects/${projectFolder}/index.html`;
            } else {
                alert(`Opening: ${projectName}\n\nThis would navigate to the actual project page.`);
            }
        });
    });
    
    // Add hover effects
    const projectCards = document.querySelectorAll('.project-card:not(.locked)');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('✅ Test Projects Interface Loaded');
    console.log('📊 This is a TEST page - no changes to your real site');
});
