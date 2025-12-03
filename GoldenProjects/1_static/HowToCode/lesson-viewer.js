// Lesson viewer and content management system
class LessonViewer {
    constructor() {
        this.currentLanguage = null;
        this.currentLevel = null;
        this.currentModule = null;
        this.currentLesson = 0;
    }

    // Show module content with lessons
    showModule(language, level, moduleId) {
        this.currentLanguage = language;
        this.currentLevel = level;
        this.currentModule = moduleId;
        this.currentLesson = 0;

        const module = this.getModule(language, level, moduleId);
        if (!module) {
            console.error('Module not found');
            return;
        }

        // Check if module is unlocked
        const moduleIndex = this.getModuleIndex(language, level, moduleId);
        if (!quizSystem.isModuleUnlocked(language, level, moduleIndex)) {
            showNotification('Complete the previous module first!', 'warning');
            return;
        }

        this.renderModuleView(module);
    }

    // Get module from learning content
    getModule(language, level, moduleId) {
        const content = learningContent[language];
        if (!content || !content[level]) return null;
        
        return content[level].modules.find(m => m.id === moduleId);
    }

    // Get module index
    getModuleIndex(language, level, moduleId) {
        const content = learningContent[language];
        if (!content || !content[level]) return -1;
        
        return content[level].modules.findIndex(m => m.id === moduleId);
    }

    // Render module view
    renderModuleView(module) {
        const container = document.getElementById('lesson-container');
        if (!container) return;

        const lesson = module.lessons[this.currentLesson];
        const totalLessons = module.lessons.length;
        const progress = ((this.currentLesson + 1) / totalLessons) * 100;

        container.innerHTML = `
            <div class="lesson-viewer">
                <div class="lesson-sidebar">
                    <div class="module-info">
                        <h3>${module.title}</h3>
                        <div class="lesson-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                            <span>${this.currentLesson + 1} of ${totalLessons} lessons</span>
                        </div>
                    </div>
                    
                    <div class="lessons-list">
                        ${module.lessons.map((l, index) => `
                            <div class="lesson-item ${index === this.currentLesson ? 'active' : ''} ${index < this.currentLesson ? 'completed' : ''}">
                                <span class="lesson-number">${index + 1}</span>
                                <span class="lesson-title">${l.title}</span>
                                ${index < this.currentLesson ? '<span class="lesson-check">✓</span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="btn-quiz" onclick="lessonViewer.startModuleQuiz()">
                        <i class="fas fa-clipboard-check"></i>
                        Take Module Quiz
                    </button>
                </div>
                
                <div class="lesson-content">
                    <div class="lesson-header">
                        <button class="btn-back" onclick="lessonViewer.closeLesson()">
                            <i class="fas fa-arrow-left"></i> Back to Course
                        </button>
                        <h2>${lesson.title}</h2>
                    </div>
                    
                    <div class="lesson-body">
                        ${lesson.content}
                    </div>
                    
                    ${lesson.resources && lesson.resources.length > 0 ? `
                        <div class="lesson-resources">
                            <h3><i class="fas fa-book"></i> Additional Resources</h3>
                            <div class="resources-grid">
                                ${lesson.resources.map(resource => `
                                    <a href="${resource.url}" target="_blank" class="resource-card">
                                        <i class="fas fa-${this.getResourceIcon(resource.type)}"></i>
                                        <div class="resource-info">
                                            <span class="resource-type">${resource.type}</span>
                                            <span class="resource-title">${resource.title}</span>
                                        </div>
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="lesson-navigation">
                        ${this.currentLesson > 0 ? `
                            <button class="btn-nav btn-prev" onclick="lessonViewer.previousLesson()">
                                <i class="fas fa-chevron-left"></i> Previous Lesson
                            </button>
                        ` : '<div></div>'}
                        
                        ${this.currentLesson < totalLessons - 1 ? `
                            <button class="btn-nav btn-next" onclick="lessonViewer.nextLesson()">
                                Next Lesson <i class="fas fa-chevron-right"></i>
                            </button>
                        ` : `
                            <button class="btn-nav btn-quiz-final" onclick="lessonViewer.startModuleQuiz()">
                                Take Quiz <i class="fas fa-clipboard-check"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;

        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight code blocks if any
        this.highlightCode();
    }

    // Get icon for resource type
    getResourceIcon(type) {
        const icons = {
            'video': 'video',
            'article': 'file-alt',
            'interactive': 'code',
            'documentation': 'book',
            'tutorial': 'graduation-cap'
        };
        return icons[type] || 'link';
    }

    // Highlight code blocks
    highlightCode() {
        // Simple syntax highlighting (can be enhanced with Prism.js or highlight.js)
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.classList.add('highlighted');
        });
    }

    // Navigate to next lesson
    nextLesson() {
        const module = this.getModule(this.currentLanguage, this.currentLevel, this.currentModule);
        if (this.currentLesson < module.lessons.length - 1) {
            this.currentLesson++;
            this.renderModuleView(module);
        }
    }

    // Navigate to previous lesson
    previousLesson() {
        if (this.currentLesson > 0) {
            this.currentLesson--;
            const module = this.getModule(this.currentLanguage, this.currentLevel, this.currentModule);
            this.renderModuleView(module);
        }
    }

    // Start module quiz
    startModuleQuiz() {
        const moduleIndex = this.getModuleIndex(this.currentLanguage, this.currentLevel, this.currentModule);
        quizSystem.startQuiz(this.currentLanguage, this.currentLevel, this.currentModule);
    }

    // Close lesson viewer
    closeLesson() {
        const container = document.getElementById('lesson-container');
        if (container) {
            container.style.display = 'none';
            container.innerHTML = '';
        }
        
        // Return to course view
        if (typeof showLevel === 'function') {
            showLevel(currentLevel);
        }
    }

    // Mark lesson as completed
    markLessonCompleted() {
        const progress = JSON.parse(localStorage.getItem('lessonProgress')) || {};
        const key = `${this.currentLanguage}-${this.currentLevel}-${this.currentModule}-${this.currentLesson}`;
        
        progress[key] = {
            completed: true,
            date: new Date().toISOString()
        };
        
        localStorage.setItem('lessonProgress', JSON.stringify(progress));
    }

    // Check if lesson is completed
    isLessonCompleted(language, level, moduleId, lessonIndex) {
        const progress = JSON.parse(localStorage.getItem('lessonProgress')) || {};
        const key = `${language}-${level}-${moduleId}-${lessonIndex}`;
        return progress[key]?.completed || false;
    }
}

// Initialize lesson viewer
const lessonViewer = new LessonViewer();

// Enhanced showLevel function to include module cards
function showLevelWithModules(levelNum) {
    currentLevel = levelNum;
    
    const course = coursesData[currentCourse];
    if (!course) return;
    
    const level = course.levels[levelNum];
    if (!level) return;
    
    // Update active tab
    document.querySelectorAll('.level-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index + 1 === levelNum);
    });
    
    // Build level content with modules
    const contentDiv = document.getElementById('level-content');
    let html = `
        <div class="level-content">
            <div class="level-intro">
                <h3>${level.title}</h3>
                <p><strong>Duration:</strong> ${level.duration}</p>
                <p><strong>Goal:</strong> ${level.goal}</p>
            </div>
    `;
    
    // Check if learning content exists for this language/level
    const hasLearningContent = learningContent[currentCourse] && 
                               learningContent[currentCourse][`level${levelNum}`];
    
    if (hasLearningContent) {
        const modules = learningContent[currentCourse][`level${levelNum}`].modules;
        
        html += '<h3 style="margin-bottom: 1.5rem; color: var(--text-dark);">Learning Modules</h3>';
        html += '<div class="modules-list">';
        
        modules.forEach((module, index) => {
            const status = quizSystem.getModuleStatus(currentCourse, levelNum, index);
            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';
            
            html += `
                <div class="module-card ${status}">
                    <div class="module-header-card">
                        <div class="module-icon">
                            ${isCompleted ? '✓' : isLocked ? '🔒' : '📚'}
                        </div>
                        <div class="module-info-card">
                            <h4>Module ${index + 1}: ${module.title}</h4>
                            <p>${module.lessons.length} lessons • ${module.quiz.questions.length} quiz questions</p>
                        </div>
                        <div class="module-status-badge ${status}">
                            ${isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
                        </div>
                    </div>
                    <div class="module-actions">
                        ${!isLocked ? `
                            <button class="btn-module-start" onclick="lessonViewer.showModule('${currentCourse}', 'level${levelNum}', '${module.id}')">
                                ${isCompleted ? 'Review' : 'Start'} Module
                            </button>
                        ` : `
                            <button class="btn-module-locked" disabled>
                                Complete previous module to unlock
                            </button>
                        `}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    } else {
        // Show original topic cards if no learning content yet
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
        
        html += `
            <div class="coming-soon-notice">
                <i class="fas fa-info-circle"></i>
                <p>Interactive lessons and quizzes for this level are coming soon! Check back later.</p>
            </div>
        `;
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
}
