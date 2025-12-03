// Main application logic
let currentLevel = 0;
let currentLesson = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderLevels();
    setupNavigation();
});

// Render level cards
function renderLevels() {
    const levelsGrid = document.querySelector('.levels-grid');
    levelsGrid.innerHTML = '';
    
    LEVELS.forEach((level, index) => {
        const isLocked = index > currentLevel;
        const card = document.createElement('div');
        card.className = `level-card ${level.color} ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `
            <span class="level-badge ${level.color}">${level.badge} ${level.name}</span>
            <h3>${level.name}</h3>
            <p>${level.description}</p>
            <p><strong>${level.lessons} Lessons</strong></p>
            ${isLocked ? '<p>🔒 Complete previous level to unlock</p>' : '<p>✅ Click to start</p>'}
        `;
        
        if (!isLocked) {
            card.onclick = () => openLevel(level.id);
        }
        
        levelsGrid.appendChild(card);
    });
}

// Open a level
function openLevel(levelId) {
    currentLevel = levelId;
    const lessons = getLessonsForLevel(levelId);
    
    if (lessons.length > 0) {
        showLesson(levelId, 0);
    } else {
        alert('Lessons for this level are coming soon!');
    }
}

// Get lessons for a specific level
function getLessonsForLevel(levelId) {
    switch(levelId) {
        case 0: return LEVEL_0_LESSONS;
        case 1: return LEVEL_1_LESSONS;
        default: return [];
    }
}

// Navigation setup
function setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            showSection(target);
        });
    });
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show requested section
    const section = document.getElementById(sectionName);
    if (section) {
        section.style.display = 'block';
    }
    
    // Special handling for different sections
    if (sectionName === 'dictionary') {
        renderDictionary();
    } else if (sectionName === 'grammar') {
        renderGrammar();
    } else if (sectionName === 'progress') {
        renderProgress();
    }
}

// Start learning button
function startLearning() {
    document.getElementById('levels').scrollIntoView({ behavior: 'smooth' });
}

// Back to levels
function backToLevels() {
    document.getElementById('lesson-view').style.display = 'none';
    document.getElementById('levels').style.display = 'block';
}
