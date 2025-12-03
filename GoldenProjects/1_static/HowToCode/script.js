// Global state
let currentCourse = null;
let currentLevel = 1;

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

// Show course detail
function showCourse(courseId) {
    currentCourse = courseId;
    currentLevel = 1;
    
    const course = coursesData[courseId];
    if (!course) return;
    
    // Hide courses section, show course detail
    document.getElementById('courses').style.display = 'none';
    const detailSection = document.getElementById('course-detail');
    detailSection.style.display = 'block';
    
    // Update course header
    document.getElementById('course-title').innerHTML = `<i class="${course.icon}"></i> ${course.name}`;
    document.getElementById('course-description').textContent = course.description;
    
    // Show first level
    showLevel(1);
    
    // Scroll to top
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide course and return to courses list
function hideCourse() {
    document.getElementById('course-detail').style.display = 'none';
    document.getElementById('courses').style.display = 'block';
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show specific level
function showLevel(levelNum) {
    // Use enhanced version from lesson-viewer.js if available
    if (typeof showLevelWithModules === 'function') {
        showLevelWithModules(levelNum);
        return;
    }
    
    // Fallback to original implementation
    currentLevel = levelNum;
    
    const course = coursesData[currentCourse];
    if (!course) return;
    
    const level = course.levels[levelNum];
    if (!level) return;
    
    // Update active tab
    document.querySelectorAll('.level-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index + 1 === levelNum);
    });
    
    // Build level content
    const contentDiv = document.getElementById('level-content');
    let html = `
        <div class="level-content">
            <div class="level-intro">
                <h3>${level.title}</h3>
                <p><strong>Duration:</strong> ${level.duration}</p>
                <p><strong>Goal:</strong> ${level.goal}</p>
            </div>
    `;
    
    // Check if this level has specializations (Level 4)
    if (level.specializations) {
        html += '<h3 style="margin-bottom: 1.5rem; color: var(--text-dark);">Choose Your Specialization</h3>';
        html += '<div class="specialization-grid">';
        level.specializations.forEach(spec => {
            html += `
                <div class="specialization-card">
                    <i class="${spec.icon}"></i>
                    <h4>${spec.title}</h4>
                    <ul>
                        ${spec.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        html += '</div>';
    } else {
        // Regular topics
        html += '<div class="topics-grid">';
        level.topics.forEach(topic => {
            html += `
                <div class="topic-card">
                    <h4><i class="fas fa-check-circle"></i> ${topic.title}</h4>
                    <ul>
                        ${topic.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        html += '</div>';
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
    
    // Save progress
    saveProgress(`${currentCourse}-level-${levelNum}`, true);
}

// Show specific code example
function showExample(exampleId) {
    const example = document.getElementById(exampleId);
    if (example) {
        example.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add highlight effect
        example.style.transform = 'scale(1.02)';
        example.style.transition = 'transform 0.3s';
        setTimeout(() => {
            example.style.transform = 'scale(1)';
        }, 300);
    }
}

// Progress tracking (localStorage)
const progressKey = 'codeAcademyProgress';

function saveProgress(module, completed) {
    let progress = JSON.parse(localStorage.getItem(progressKey)) || {};
    progress[module] = completed;
    localStorage.setItem(progressKey, JSON.stringify(progress));
}

function getProgress() {
    return JSON.parse(localStorage.getItem(progressKey)) || {};
}

// Add interactive features to module buttons
document.addEventListener('DOMContentLoaded', () => {
    const moduleButtons = document.querySelectorAll('.btn-module');
    const progress = getProgress();
    
    moduleButtons.forEach((button, index) => {
        const moduleId = `module-${index + 1}`;
        
        // Check if module is completed
        if (progress[moduleId]) {
            button.innerHTML = '<i class="fas fa-check"></i> Completed';
            button.style.background = '#10b981';
        }
        
        // Add click handler to mark as completed
        button.addEventListener('click', function() {
            saveProgress(moduleId, true);
            this.innerHTML = '<i class="fas fa-check"></i> Completed';
            this.style.background = '#10b981';
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and modules
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.course-card, .module, .basic-card, .benefit');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});

console.log('Welcome to Code Academy! Start your programming journey today.');
