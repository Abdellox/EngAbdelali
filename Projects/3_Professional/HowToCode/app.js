// ============================================
// CODE ACADEMY - CLEAN & SIMPLE VERSION
// Everything works, nothing broken!
// ============================================

// Global state
let currentCourse = null;
let currentLevel = 1;

// ============================================
// 1. NAVIGATION & SMOOTH SCROLLING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Animate elements on scroll
    animateOnScroll();
});

// ============================================
// 2. COURSE SELECTION
// ============================================
function showCourse(courseId) {
    currentCourse = courseId;
    currentLevel = 1;
    
    const course = coursesData[courseId];
    if (!course) {
        console.error('Course not found:', courseId);
        return;
    }
    
    // Hide courses, show course detail
    document.getElementById('courses').style.display = 'none';
    const detailSection = document.getElementById('course-detail');
    detailSection.style.display = 'block';
    
    // Update header
    document.getElementById('course-title').innerHTML = `<i class="${course.icon}"></i> ${course.name}`;
    document.getElementById('course-description').textContent = course.description;
    
    // Show Level 1
    showLevel(1);
    
    // Scroll to top
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideCourse() {
    document.getElementById('course-detail').style.display = 'none';
    document.getElementById('courses').style.display = 'block';
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// 3. LEVEL DISPLAY
// ============================================
function showLevel(levelNum) {
    currentLevel = levelNum;
    
    const course = coursesData[currentCourse];
    if (!course) return;
    
    const level = course.levels[levelNum];
    if (!level) return;
    
    // Update active tab
    document.querySelectorAll('.level-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index + 1 === levelNum);
    });
    
    // Build content
    const contentDiv = document.getElementById('level-content');
    let html = `
        <div class="level-content">
            <div class="level-intro">
                <h3>${level.title}</h3>
                <p><strong>Duration:</strong> ${level.duration}</p>
                <p><strong>Goal:</strong> ${level.goal}</p>
            </div>
    `;
    
    // Check if we have learning content for this course/level
    const hasLearningContent = learningContent && 
                               learningContent[currentCourse] && 
                               learningContent[currentCourse][`level${levelNum}`];
    
    if (hasLearningContent) {
        // Show interactive modules
        html += renderModules(currentCourse, levelNum);
    } else if (level.specializations) {
        // Show specializations (Level 4)
        html += renderSpecializations(level.specializations);
    } else {
        // Show topic cards
        html += renderTopics(level.topics);
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

// ============================================
// 4. RENDER FUNCTIONS
// ============================================
function renderModules(courseId, levelNum) {
    const modules = learningContent[courseId][`level${levelNum}`].modules;
    
    let html = '<h3 style="margin-bottom: 1.5rem;">Learning Modules</h3>';
    html += '<div class="modules-list">';
    
    modules.forEach((module, index) => {
        const status = getModuleStatus(courseId, levelNum, index);
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
                        <button class="btn-module-start" onclick="startModule('${courseId}', ${levelNum}, '${module.id}')">
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
    return html;
}

function renderSpecializations(specializations) {
    let html = '<h3 style="margin-bottom: 1.5rem;">Choose Your Specialization</h3>';
    html += '<div class="specialization-grid">';
    
    specializations.forEach(spec => {
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
    return html;
}

function renderTopics(topics) {
    let html = '<div class="topics-grid">';
    
    topics.forEach(topic => {
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
    return html;
}

// ============================================
// 5. MODULE SYSTEM
// ============================================
function startModule(courseId, levelNum, moduleId) {
    const module = getModule(courseId, levelNum, moduleId);
    if (!module) return;
    
    // Show lesson viewer
    showLessonViewer(courseId, levelNum, module);
}

function showLessonViewer(courseId, levelNum, module) {
    const container = document.getElementById('lesson-container');
    if (!container) return;
    
    let currentLesson = 0;
    
    function renderLesson() {
        const lesson = module.lessons[currentLesson];
        const totalLessons = module.lessons.length;
        
        container.innerHTML = `
            <div class="lesson-viewer">
                <div class="lesson-sidebar">
                    <div class="module-info">
                        <h3>${module.title}</h3>
                        <p>${currentLesson + 1} of ${totalLessons} lessons</p>
                    </div>
                    <div class="lessons-list">
                        ${module.lessons.map((l, i) => `
                            <div class="lesson-item ${i === currentLesson ? 'active' : ''}">
                                <span class="lesson-number">${i + 1}</span>
                                <span class="lesson-title">${l.title}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-quiz" onclick="startQuiz('${courseId}', ${levelNum}, '${module.id}')">
                        <i class="fas fa-clipboard-check"></i> Take Quiz
                    </button>
                </div>
                
                <div class="lesson-content">
                    <button class="btn-back" onclick="closeLessonViewer()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <h2>${lesson.title}</h2>
                    <div class="lesson-body">${lesson.content}</div>
                    
                    ${lesson.resources ? `
                        <div class="lesson-resources">
                            <h3><i class="fas fa-book"></i> Resources</h3>
                            ${lesson.resources.map(r => `
                                <a href="${r.url}" target="_blank" class="resource-card">
                                    <i class="fas fa-${r.type === 'video' ? 'video' : 'file-alt'}"></i>
                                    <span>${r.title}</span>
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="lesson-navigation">
                        ${currentLesson > 0 ? `
                            <button class="btn-nav btn-prev" onclick="previousLesson()">
                                <i class="fas fa-chevron-left"></i> Previous
                            </button>
                        ` : '<div></div>'}
                        
                        ${currentLesson < totalLessons - 1 ? `
                            <button class="btn-nav btn-next" onclick="nextLesson()">
                                Next <i class="fas fa-chevron-right"></i>
                            </button>
                        ` : `
                            <button class="btn-nav btn-quiz-final" onclick="startQuiz('${courseId}', ${levelNum}, '${module.id}')">
                                Take Quiz <i class="fas fa-clipboard-check"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Navigation functions
    window.nextLesson = () => {
        if (currentLesson < module.lessons.length - 1) {
            currentLesson++;
            renderLesson();
        }
    };
    
    window.previousLesson = () => {
        if (currentLesson > 0) {
            currentLesson--;
            renderLesson();
        }
    };
    
    renderLesson();
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

function closeLessonViewer() {
    document.getElementById('lesson-container').style.display = 'none';
    showLevel(currentLevel);
}

// ============================================
// 6. QUIZ SYSTEM
// ============================================
function startQuiz(courseId, levelNum, moduleId) {
    const module = getModule(courseId, levelNum, moduleId);
    if (!module || !module.quiz) return;
    
    let currentQuestion = 0;
    let score = 0;
    let answers = [];
    
    function renderQuestion() {
        const q = module.quiz.questions[currentQuestion];
        const container = document.getElementById('quiz-container');
        
        container.innerHTML = `
            <div class="quiz-modal">
                <div class="quiz-header">
                    <h3>Module Quiz</h3>
                    <p>Question ${currentQuestion + 1} of ${module.quiz.questions.length}</p>
                </div>
                <div class="quiz-content">
                    <h4>${q.question}</h4>
                    <div class="options-container">
                        ${q.options.map((opt, i) => `
                            <button class="option-btn" onclick="selectAnswer(${i})">
                                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                <span class="option-text">${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="quiz-footer">
                    <button class="btn-secondary" onclick="closeQuiz()">Exit</button>
                    <span>Score: ${score}/${currentQuestion}</span>
                </div>
            </div>
        `;
        
        container.style.display = 'flex';
    }
    
    window.selectAnswer = (selected) => {
        const q = module.quiz.questions[currentQuestion];
        const isCorrect = selected === q.correct;
        
        if (isCorrect) score++;
        answers.push({ correct: isCorrect });
        
        // Show feedback
        const container = document.getElementById('quiz-container');
        container.querySelector('.quiz-content').innerHTML += `
            <div class="feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}">
                <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
                <div class="feedback-content">
                    <h4>${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                    <p>${q.explanation}</p>
                </div>
            </div>
            <button class="btn-primary" onclick="nextQuestion()">
                ${currentQuestion < module.quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
        `;
        
        // Disable options
        container.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    };
    
    window.nextQuestion = () => {
        currentQuestion++;
        if (currentQuestion < module.quiz.questions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    };
    
    function showResults() {
        const percentage = Math.round((score / module.quiz.questions.length) * 100);
        const passed = percentage >= module.quiz.passingScore;
        
        const container = document.getElementById('quiz-container');
        container.innerHTML = `
            <div class="quiz-modal results-modal">
                <div class="results-header">
                    <div class="results-icon ${passed ? 'passed' : 'failed'}">
                        ${passed ? '🎉' : '📚'}
                    </div>
                    <h2>${passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
                    <p>${passed ? 'You passed!' : 'Try again after reviewing the material.'}</p>
                </div>
                <div class="results-stats">
                    <div class="stat-card">
                        <div class="stat-value">${score}/${module.quiz.questions.length}</div>
                        <div class="stat-label">Correct</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${percentage}%</div>
                        <div class="stat-label">Score</div>
                    </div>
                    <div class="stat-card ${passed ? 'passed' : 'failed'}">
                        <div class="stat-value">${passed ? 'PASSED' : 'FAILED'}</div>
                        <div class="stat-label">Status</div>
                    </div>
                </div>
                <div class="results-actions">
                    ${passed ? `
                        <button class="btn-primary" onclick="completeModule('${courseId}', ${levelNum}, '${moduleId}')">
                            Continue
                        </button>
                    ` : `
                        <button class="btn-primary" onclick="startQuiz('${courseId}', ${levelNum}, '${moduleId}')">
                            Retake Quiz
                        </button>
                    `}
                    <button class="btn-secondary" onclick="closeQuiz()">Close</button>
                </div>
            </div>
        `;
        
        if (passed) {
            saveModuleCompletion(courseId, levelNum, moduleId);
        }
    }
    
    renderQuestion();
}

function closeQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
}

function completeModule(courseId, levelNum, moduleId) {
    closeQuiz();
    closeLessonViewer();
    showLevel(levelNum);
    showNotification('Module completed! Next module unlocked.', 'success');
}

// ============================================
// 7. PROGRESS TRACKING
// ============================================
function getModuleStatus(courseId, levelNum, moduleIndex) {
    if (moduleIndex === 0) return 'unlocked'; // First module always unlocked
    
    const progress = JSON.parse(localStorage.getItem('moduleProgress')) || {};
    const key = `${courseId}-level${levelNum}`;
    
    if (!progress[key]) return 'locked';
    
    if (progress[key].includes(moduleIndex)) {
        return 'completed';
    } else if (progress[key].includes(moduleIndex - 1)) {
        return 'unlocked';
    }
    
    return 'locked';
}

function saveModuleCompletion(courseId, levelNum, moduleId) {
    const progress = JSON.parse(localStorage.getItem('moduleProgress')) || {};
    const key = `${courseId}-level${levelNum}`;
    
    if (!progress[key]) progress[key] = [];
    
    const moduleIndex = getModuleIndex(courseId, levelNum, moduleId);
    if (!progress[key].includes(moduleIndex)) {
        progress[key].push(moduleIndex);
    }
    
    localStorage.setItem('moduleProgress', JSON.stringify(progress));
}

// ============================================
// 8. HELPER FUNCTIONS
// ============================================
function getModule(courseId, levelNum, moduleId) {
    if (!learningContent || !learningContent[courseId]) return null;
    const level = learningContent[courseId][`level${levelNum}`];
    if (!level) return null;
    return level.modules.find(m => m.id === moduleId);
}

function getModuleIndex(courseId, levelNum, moduleId) {
    if (!learningContent || !learningContent[courseId]) return -1;
    const level = learningContent[courseId][`level${levelNum}`];
    if (!level) return -1;
    return level.modules.findIndex(m => m.id === moduleId);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.course-card, .basic-card, .benefit').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
}

// ============================================
// 9. CODE PLAYGROUND TAB SWITCHING
// ============================================
function showExampleTab(tabId) {
    document.querySelectorAll('.example-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.example-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    event.target.classList.add('active');
}

console.log('✅ Code Academy loaded successfully!');
