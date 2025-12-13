// Quiz functionality
let currentQuiz = null;
let quizAnswers = [];
let quizScore = 0;

function startQuiz(levelId, lessonIndex) {
    const lessons = getLessonsForLevel(levelId);
    const lesson = lessons[lessonIndex];
    
    if (!lesson.quiz || lesson.quiz.length === 0) {
        alert('No quiz available for this lesson');
        return;
    }
    
    currentQuiz = lesson.quiz;
    quizAnswers = new Array(currentQuiz.length).fill(null);
    quizScore = 0;
    
    renderQuiz();
}

function renderQuiz() {
    const lessonContent = document.getElementById('lessonContent');
    
    lessonContent.innerHTML = `
        <h2>📝 Quiz Time!</h2>
        <p>Test your knowledge from this lesson.</p>
        <div class="quiz-container">
            ${currentQuiz.map((q, index) => `
                <div class="question" id="question-${index}">
                    <h4>Question ${index + 1}: ${q.question}</h4>
                    <div class="options">
                        ${q.options.map((option, optIndex) => `
                            <div class="option" onclick="selectAnswer(${index}, ${optIndex})">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="quiz-buttons">
            <button class="btn btn-primary" onclick="submitQuiz()">Submit Quiz</button>
            <button class="btn" onclick="backToLesson()">Back to Lesson</button>
        </div>
        <div id="quizResult"></div>
    `;
}

function selectAnswer(questionIndex, optionIndex) {
    // Remove previous selection
    const questionDiv = document.getElementById(`question-${questionIndex}`);
    questionDiv.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const options = questionDiv.querySelectorAll('.option');
    options[optionIndex].classList.add('selected');
    
    // Store answer
    quizAnswers[questionIndex] = optionIndex;
}

function submitQuiz() {
    if (quizAnswers.includes(null)) {
        alert('Please answer all questions before submitting!');
        return;
    }
    
    quizScore = 0;
    
    currentQuiz.forEach((q, index) => {
        const questionDiv = document.getElementById(`question-${index}`);
        const options = questionDiv.querySelectorAll('.option');
        
        options.forEach((opt, optIndex) => {
            if (optIndex === q.correct) {
                opt.classList.add('correct');
            }
            if (optIndex === quizAnswers[index] && optIndex !== q.correct) {
                opt.classList.add('incorrect');
            }
        });
        
        if (quizAnswers[index] === q.correct) {
            quizScore++;
        }
    });
    
    const percentage = (quizScore / currentQuiz.length) * 100;
    const resultDiv = document.getElementById('quizResult');
    
    resultDiv.innerHTML = `
        <div style="background: ${percentage >= 70 ? '#d4edda' : '#f8d7da'}; 
                    padding: 2rem; border-radius: 10px; margin-top: 2rem; text-align: center;">
            <h3>Your Score: ${quizScore} / ${currentQuiz.length}</h3>
            <p style="font-size: 2rem;">${percentage}%</p>
            <p>${percentage >= 70 ? '🎉 Great job! You passed!' : '📚 Keep studying and try again!'}</p>
        </div>
    `;
    
    // Update user stats
    updateQuizStats(quizScore, currentQuiz.length);
}

function backToLesson() {
    location.reload();
}
