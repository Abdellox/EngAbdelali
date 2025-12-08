// Exam Mode Functionality
let examState = {
    currentJob: '',
    currentCategory: '',
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: null,
    timerInterval: null,
    mode: 'practice' // 'practice' or 'exam'
};

// Initialize exam mode
function initExamMode() {
    console.log('Initializing exam mode...');
    const modeSelection = document.getElementById('modeSelection');
    const practiceMode = document.getElementById('practiceMode');
    const examMode = document.getElementById('examMode');
    const backToJobsBtn = document.getElementById('backToJobsBtn');

    if (!practiceMode || !examMode) {
        console.error('Mode buttons not found!');
        return;
    }

    // Practice mode button
    practiceMode.querySelector('.mode-btn').addEventListener('click', function() {
        console.log('Practice mode clicked');
        examState.mode = 'practice';
        console.log('Calling showPracticeQuestions with:', examState.currentCategory, examState.currentJob);
        showPracticeQuestions(examState.currentCategory, examState.currentJob);
    });

    // Exam mode button
    examMode.querySelector('.mode-btn').addEventListener('click', function() {
        examState.mode = 'exam';
        startExam();
    });

    // Back button
    backToJobsBtn.addEventListener('click', function() {
        showCategories();
    });
}

// Show mode selection
function showModeSelection(category, job) {
    examState.currentCategory = category;
    examState.currentJob = job;
    examState.questions = jobData[category][job];

    document.getElementById('modeJobTitle').textContent = `${job} - Choose Your Mode`;
    
    showView('modeSelection');
}

// Start exam
function startExam() {
    examState.currentQuestionIndex = 0;
    examState.userAnswers = [];
    examState.startTime = Date.now();
    
    // Shuffle questions for exam
    examState.questions = shuffleArray([...jobData[examState.currentCategory][examState.currentJob]]);
    
    // Start timer
    startTimer();
    
    // Show first question
    renderExamQuestion();
    showView('exam');
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start timer
function startTimer() {
    const timeDisplay = document.getElementById('timeDisplay');
    examState.timerInterval = setInterval(function() {
        const elapsed = Math.floor((Date.now() - examState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Stop timer
function stopTimer() {
    if (examState.timerInterval) {
        clearInterval(examState.timerInterval);
    }
}

// Render exam question
function renderExamQuestion() {
    const question = examState.questions[examState.currentQuestionIndex];
    const examQuestionCard = document.getElementById('examQuestionCard');
    const examJobTitle = document.getElementById('examJobTitle');
    
    examJobTitle.textContent = `${examState.currentJob} - Exam Mode`;
    
    // Update progress
    document.getElementById('currentQ').textContent = examState.currentQuestionIndex + 1;
    document.getElementById('totalQ').textContent = examState.questions.length;
    
    // Generate wrong answers (simplified - in real app, you'd have predefined options)
    const correctAnswer = question.a;
    const options = generateExamOptions(correctAnswer);
    
    // Store correct answer
    if (!examState.userAnswers[examState.currentQuestionIndex]) {
        examState.userAnswers[examState.currentQuestionIndex] = {
            question: question.q,
            correctAnswer: correctAnswer,
            userAnswer: null,
            options: options
        };
    }
    
    const currentAnswer = examState.userAnswers[examState.currentQuestionIndex];
    
    examQuestionCard.innerHTML = `
        <div class="exam-question">${examState.currentQuestionIndex + 1}. ${question.q}</div>
        <div class="exam-options">
            ${currentAnswer.options.map((option, index) => `
                <div class="exam-option ${currentAnswer.userAnswer === index ? 'selected' : ''}" 
                     data-index="${index}">
                    ${String.fromCharCode(65 + index)}. ${option}
                </div>
            `).join('')}
        </div>
    `;
    
    // Add click handlers to options
    document.querySelectorAll('.exam-option').forEach(option => {
        option.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            selectExamOption(index);
        });
    });
    
    // Update navigation buttons
    document.getElementById('examPrevBtn').disabled = examState.currentQuestionIndex === 0;
    document.getElementById('examNextBtn').disabled = examState.currentQuestionIndex === examState.questions.length - 1;
}

// Generate exam options
function generateExamOptions(correctAnswer) {
    const wrongAnswers = [
        "I don't have experience with this, but I'm willing to learn.",
        "I would ask my supervisor for guidance on how to handle this situation.",
        "I believe this depends on the specific circumstances and company policy."
    ];
    
    const options = [correctAnswer, ...wrongAnswers];
    return shuffleArray(options);
}

// Select exam option
function selectExamOption(index) {
    examState.userAnswers[examState.currentQuestionIndex].userAnswer = index;
    
    // Update UI
    document.querySelectorAll('.exam-option').forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Exam navigation
document.getElementById('examPrevBtn').addEventListener('click', function() {
    if (examState.currentQuestionIndex > 0) {
        examState.currentQuestionIndex--;
        renderExamQuestion();
    }
});

document.getElementById('examNextBtn').addEventListener('click', function() {
    if (examState.currentQuestionIndex < examState.questions.length - 1) {
        examState.currentQuestionIndex++;
        renderExamQuestion();
    }
});

document.getElementById('exitExamBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to exit the exam? Your progress will be lost.')) {
        stopTimer();
        showView('modeSelection');
    }
});

document.getElementById('submitExamBtn').addEventListener('click', function() {
    // Check if all questions are answered
    const unanswered = examState.userAnswers.filter(a => a.userAnswer === null).length;
    
    if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
            return;
        }
    }
    
    stopTimer();
    showResults();
});

// Show results
function showResults() {
    const totalQuestions = examState.questions.length;
    let correctCount = 0;
    
    // Calculate score
    examState.userAnswers.forEach(answer => {
        if (answer.userAnswer !== null) {
            const selectedAnswer = answer.options[answer.userAnswer];
            if (selectedAnswer === answer.correctAnswer) {
                correctCount++;
            }
        }
    });
    
    const score = Math.round((correctCount / totalQuestions) * 100);
    const wrongCount = totalQuestions - correctCount;
    const timeTaken = Math.floor((Date.now() - examState.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    
    // Update results UI
    document.getElementById('scoreValue').textContent = `${score}%`;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('wrongAnswers').textContent = wrongCount;
    document.getElementById('timeTaken').textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
    
    // Set message based on score
    let message = '';
    if (score >= 90) {
        message = '🎉 Excellent! You\'re well prepared for this interview!';
    } else if (score >= 70) {
        message = '👍 Good job! Review the questions you missed and you\'ll be ready!';
    } else if (score >= 50) {
        message = '📚 Keep practicing! Review the answers and try again.';
    } else {
        message = '💪 Don\'t give up! Study the questions and retake the exam.';
    }
    document.getElementById('resultsMessage').textContent = message;
    
    // Show review
    const reviewSection = document.getElementById('reviewSection');
    reviewSection.innerHTML = '<h3 style="color: #667eea; margin-bottom: 20px;">Review Your Answers:</h3>';
    
    examState.userAnswers.forEach((answer, index) => {
        const isCorrect = answer.userAnswer !== null && answer.options[answer.userAnswer] === answer.correctAnswer;
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;
        
        reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${answer.question}</div>
            ${answer.userAnswer !== null ? `
                <div class="review-answer ${isCorrect ? 'correct' : 'wrong'}">
                    Your answer: ${answer.options[answer.userAnswer]}
                </div>
            ` : '<div class="review-answer wrong">Not answered</div>'}
            ${!isCorrect ? `
                <div class="review-answer correct">
                    Correct answer: ${answer.correctAnswer}
                </div>
            ` : ''}
        `;
        
        reviewSection.appendChild(reviewItem);
    });
    
    showView('results');
}

// Results actions
document.getElementById('retakeExamBtn').addEventListener('click', function() {
    startExam();
});

document.getElementById('backToCategoriesBtn').addEventListener('click', function() {
    showCategories();
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExamMode);
} else {
    initExamMode();
}
