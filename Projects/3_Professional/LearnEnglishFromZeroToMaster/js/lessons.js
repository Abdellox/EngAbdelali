// Lesson display and management
function showLesson(levelId, lessonIndex) {
    const lessons = getLessonsForLevel(levelId);
    const lesson = lessons[lessonIndex];
    
    if (!lesson) {
        alert('Lesson not found!');
        return;
    }
    
    // Hide levels, show lesson
    document.getElementById('levels').style.display = 'none';
    document.getElementById('lesson-view').style.display = 'block';
    
    // Render lesson content
    const lessonContent = document.getElementById('lessonContent');
    lessonContent.innerHTML = `
        <h2>${lesson.title}</h2>
        <div class="lesson-content">
            ${lesson.content}
            
            ${renderVocabulary(lesson.vocabulary)}
            
            <div class="lesson-navigation">
                <button class="btn btn-primary" onclick="startQuiz(${levelId}, ${lessonIndex})">
                    Take Quiz 📝
                </button>
                ${lessonIndex < lessons.length - 1 ? 
                    `<button class="btn btn-success" onclick="nextLesson(${levelId}, ${lessonIndex})">
                        Next Lesson →
                    </button>` : 
                    `<button class="btn btn-success" onclick="completeLevel(${levelId})">
                        Complete Level 🎉
                    </button>`
                }
            </div>
        </div>
    `;
    
    updateProgress(lessonIndex, lessons.length);
}

// Render vocabulary cards
function renderVocabulary(vocabulary) {
    if (!vocabulary || vocabulary.length === 0) return '';
    
    return `
        <h3>📚 Vocabulary</h3>
        <div class="vocabulary-list">
            ${vocabulary.map(word => `
                <div class="vocab-card">
                    <div class="vocab-word">${word.word}</div>
                    <div class="vocab-pronunciation">${word.pronunciation}</div>
                    <div class="vocab-meaning">${word.meaning}</div>
                    <button class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.3rem 0.8rem;" 
                            onclick="speakWord('${word.word}')">🔊</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Text-to-speech for pronunciation
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech not supported in your browser');
    }
}

// Update progress bar
function updateProgress(current, total) {
    const percentage = ((current + 1) / total) * 100;
    document.getElementById('lessonProgress').style.width = percentage + '%';
}

// Next lesson
function nextLesson(levelId, currentIndex) {
    showLesson(levelId, currentIndex + 1);
}

// Complete level
function completeLevel(levelId) {
    saveProgress(levelId + 1);
    alert(`🎉 Congratulations! You completed Level ${levelId}!`);
    backToLevels();
    renderLevels();
}
