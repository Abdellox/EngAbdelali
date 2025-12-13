// Quiz and validation system for learning progression
class QuizSystem {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.quizResults = {};
    }

    // Start a quiz for a specific module
    startQuiz(language, level, moduleId) {
        const module = this.getModule(language, level, moduleId);
        if (!module || !module.quiz) {
            console.error('Quiz not found');
            return false;
        }

        this.currentQuiz = module.quiz;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        
        this.renderQuiz();
        return true;
    }

    // Get module data
    getModule(language, level, moduleId) {
        const content = learningContent[language];
        if (!content || !content[level]) return null;
        
        return content[level].modules.find(m => m.id === moduleId);
    }

    // Render quiz interface
    renderQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;

        const question = this.currentQuiz.questions[this.currentQuestion];
        const totalQuestions = this.currentQuiz.questions.length;
        const progress = ((this.currentQuestion + 1) / totalQuestions) * 100;

        quizContainer.innerHTML = `
            <div class="quiz-modal">
                <div class="quiz-header">
                    <h3>Module Quiz</h3>
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text">Question ${this.currentQuestion + 1} of ${totalQuestions}</span>
                    </div>
                </div>
                
                <div class="quiz-content">
                    <h4 class="question-text">${question.question}</h4>
                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" onclick="quizSystem.selectAnswer(${index})">
                                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                <span class="option-text">${option}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="quiz-footer">
                    <button class="btn-secondary" onclick="quizSystem.closeQuiz()">Exit Quiz</button>
                    <div class="quiz-score">Score: ${this.score}/${this.currentQuestion}</div>
                </div>
            </div>
        `;

        quizContainer.style.display = 'flex';
    }

    // Handle answer selection
    selectAnswer(selectedIndex) {
        const question = this.currentQuiz.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        this.answers.push({
            questionId: question.id,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        // Show feedback
        this.showFeedback(isCorrect, question.explanation, selectedIndex);
    }

    // Show answer feedback
    showFeedback(isCorrect, explanation, selectedIndex) {
        const optionButtons = document.querySelectorAll('.option-btn');
        const question = this.currentQuiz.questions[this.currentQuestion];
        
        // Disable all buttons
        optionButtons.forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Show explanation
        const feedbackHtml = `
            <div class="feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}">
                <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
                <div class="feedback-content">
                    <h4>${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                    <p>${explanation}</p>
                </div>
            </div>
            <button class="btn-primary" onclick="quizSystem.nextQuestion()">
                ${this.currentQuestion < this.currentQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
        `;

        const quizContent = document.querySelector('.quiz-content');
        quizContent.innerHTML += feedbackHtml;
    }

    // Move to next question
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.currentQuiz.questions.length) {
            this.renderQuiz();
        } else {
            this.showResults();
        }
    }

    // Show quiz results
    showResults() {
        const totalQuestions = this.currentQuiz.questions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);
        const passed = percentage >= this.currentQuiz.passingScore;

        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-modal results-modal">
                <div class="results-header">
                    <div class="results-icon ${passed ? 'passed' : 'failed'}">
                        ${passed ? '🎉' : '📚'}
                    </div>
                    <h2>${passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
                    <p class="results-message">
                        ${passed 
                            ? 'You passed the quiz! You can now move to the next module.' 
                            : 'You need ' + this.currentQuiz.passingScore + '% to pass. Review the material and try again.'}
                    </p>
                </div>
                
                <div class="results-stats">
                    <div class="stat-card">
                        <div class="stat-value">${this.score}/${totalQuestions}</div>
                        <div class="stat-label">Correct Answers</div>
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
                
                <div class="results-breakdown">
                    <h3>Question Breakdown</h3>
                    ${this.answers.map((answer, index) => `
                        <div class="answer-review ${answer.isCorrect ? 'correct' : 'incorrect'}">
                            <span class="review-icon">${answer.isCorrect ? '✓' : '✗'}</span>
                            <span class="review-text">Question ${index + 1}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="results-actions">
                    ${passed 
                        ? '<button class="btn-primary" onclick="quizSystem.completeModule()">Continue to Next Module</button>'
                        : '<button class="btn-primary" onclick="quizSystem.retakeQuiz()">Retake Quiz</button>'}
                    <button class="btn-secondary" onclick="quizSystem.reviewMaterial()">Review Material</button>
                    <button class="btn-secondary" onclick="quizSystem.closeQuiz()">Close</button>
                </div>
            </div>
        `;

        // Save results
        if (passed) {
            this.saveQuizResult(true, percentage);
        }
    }

    // Save quiz result to localStorage
    saveQuizResult(passed, score) {
        const results = JSON.parse(localStorage.getItem('quizResults')) || {};
        const key = `${currentCourse}-${currentLevel}-module-${this.currentQuestion}`;
        
        results[key] = {
            passed: passed,
            score: score,
            date: new Date().toISOString(),
            attempts: (results[key]?.attempts || 0) + 1
        };
        
        localStorage.setItem('quizResults', JSON.stringify(results));
        
        // Update progress
        if (passed) {
            this.unlockNextModule();
        }
    }

    // Unlock next module
    unlockNextModule() {
        const progress = JSON.parse(localStorage.getItem('learningProgress')) || {};
        const courseKey = `${currentCourse}-${currentLevel}`;
        
        if (!progress[courseKey]) {
            progress[courseKey] = { completedModules: [] };
        }
        
        const currentModuleIndex = this.getCurrentModuleIndex();
        if (!progress[courseKey].completedModules.includes(currentModuleIndex)) {
            progress[courseKey].completedModules.push(currentModuleIndex);
        }
        
        localStorage.setItem('learningProgress', JSON.stringify(progress));
        
        // Update UI
        this.updateProgressUI();
    }

    // Get current module index
    getCurrentModuleIndex() {
        // Implementation depends on your module tracking
        return 0; // Placeholder
    }

    // Update progress UI
    updateProgressUI() {
        // Refresh the module list to show completed/unlocked status
        if (typeof showLevel === 'function') {
            showLevel(currentLevel);
        }
    }

    // Retake quiz
    retakeQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.renderQuiz();
    }

    // Review material
    reviewMaterial() {
        this.closeQuiz();
        // Scroll to lessons
        document.getElementById('lessons-container')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Complete module and move to next
    completeModule() {
        this.closeQuiz();
        // Show success message and unlock next module
        showNotification('Module completed! Next module unlocked.', 'success');
        this.updateProgressUI();
    }

    // Close quiz
    closeQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
            quizContainer.style.display = 'none';
            quizContainer.innerHTML = '';
        }
    }

    // Check if module is unlocked
    isModuleUnlocked(language, level, moduleIndex) {
        if (moduleIndex === 0) return true; // First module always unlocked
        
        const progress = JSON.parse(localStorage.getItem('learningProgress')) || {};
        const courseKey = `${language}-level${level}`;
        
        if (!progress[courseKey]) return false;
        
        // Check if previous module is completed
        return progress[courseKey].completedModules.includes(moduleIndex - 1);
    }

    // Get module completion status
    getModuleStatus(language, level, moduleIndex) {
        const progress = JSON.parse(localStorage.getItem('learningProgress')) || {};
        const courseKey = `${language}-level${level}`;
        
        if (!progress[courseKey]) return 'locked';
        
        if (progress[courseKey].completedModules.includes(moduleIndex)) {
            return 'completed';
        } else if (moduleIndex === 0 || progress[courseKey].completedModules.includes(moduleIndex - 1)) {
            return 'unlocked';
        } else {
            return 'locked';
        }
    }
}

// Initialize quiz system
const quizSystem = new QuizSystem();

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
