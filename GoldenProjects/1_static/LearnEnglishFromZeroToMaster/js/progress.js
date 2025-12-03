// Progress tracking and statistics
function loadProgress() {
    const saved = localStorage.getItem('englishMasteryProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentLevel = progress.currentLevel || 0;
    }
}

function saveProgress(level) {
    const progress = {
        currentLevel: level,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('englishMasteryProgress', JSON.stringify(progress));
    currentLevel = level;
}

function updateQuizStats(score, total) {
    const stats = getStats();
    stats.quizzesTaken++;
    stats.totalQuestions += total;
    stats.correctAnswers += score;
    stats.lastQuizDate = new Date().toISOString();
    
    localStorage.setItem('englishMasteryStats', JSON.stringify(stats));
}

function getStats() {
    const saved = localStorage.getItem('englishMasteryStats');
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        quizzesTaken: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        wordsLearned: 0,
        studyDays: 1,
        lastQuizDate: null
    };
}

function renderProgress() {
    const stats = getStats();
    const accuracy = stats.totalQuestions > 0 
        ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
        : 0;
    
    const progressDashboard = document.getElementById('progressDashboard');
    
    progressDashboard.innerHTML = `
        <div class="progress-stats">
            <div class="stat-card">
                <div class="stat-value">${currentLevel + 1}</div>
                <div class="stat-label">Current Level</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.quizzesTaken}</div>
                <div class="stat-label">Quizzes Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${accuracy}%</div>
                <div class="stat-label">Accuracy</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.studyDays}</div>
                <div class="stat-label">Study Days</div>
            </div>
        </div>
        
        <div style="margin-top: 3rem;">
            <h3>Your Learning Journey</h3>
            <div style="background: white; padding: 2rem; border-radius: 10px; margin-top: 1rem;">
                ${LEVELS.map((level, index) => `
                    <div style="display: flex; align-items: center; margin: 1rem 0; padding: 1rem; 
                                background: ${index <= currentLevel ? '#d4edda' : '#f8f9fa'}; 
                                border-radius: 5px;">
                        <span style="font-size: 2rem; margin-right: 1rem;">${level.badge}</span>
                        <div style="flex: 1;">
                            <strong>${level.name}</strong>
                            <p style="margin: 0; color: #666;">${level.description}</p>
                        </div>
                        <span style="font-size: 1.5rem;">
                            ${index < currentLevel ? '✅' : index === currentLevel ? '🔄' : '🔒'}
                        </span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${currentLevel >= 6 ? `
            <div class="certificate">
                <h2>🎓 Certificate of Mastery</h2>
                <p style="font-size: 1.5rem; margin: 1rem 0;">Congratulations!</p>
                <p>You have completed all levels and achieved English Mastery!</p>
                <p style="margin-top: 2rem;">Keep practicing to maintain your skills.</p>
            </div>
        ` : ''}
        
        <div style="margin-top: 2rem; text-align: center;">
            <button class="btn btn-primary" onclick="resetProgress()">Reset Progress</button>
        </div>
    `;
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem('englishMasteryProgress');
        localStorage.removeItem('englishMasteryStats');
        currentLevel = 0;
        location.reload();
    }
}
