// Math Learning Application - Enhanced Version
class MathMaster {
    constructor() {
        this.currentLevel = 0;
        this.currentQuestion = null;
        this.questionCount = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.isAnswered = false;
        this.streak = 0;
        this.bestStreak = 0;
        this.hintsUsed = 0;
        this.totalQuestionsAllTime = 0;
        this.achievements = [];
        
        this.loadProgress();
        this.init();
    }
    
    loadProgress() {
        try {
            const saved = localStorage.getItem('mathMasterProgress');
            if (saved) {
                const data = JSON.parse(saved);
                this.totalQuestionsAllTime = data.totalQuestions || 0;
                this.bestStreak = data.bestStreak || 0;
                this.achievements = data.achievements || [];
            }
        } catch (e) {
            console.log('No saved progress');
        }
    }
    
    saveProgress() {
        try {
            const data = {
                totalQuestions: this.totalQuestionsAllTime,
                bestStreak: this.bestStreak,
                achievements: this.achievements,
                lastPlayed: new Date().toISOString()
            };
            localStorage.setItem('mathMasterProgress', JSON.stringify(data));
        } catch (e) {
            console.log('Could not save');
        }
    }
    
    init() {
        this.setupEventListeners();
        this.updateGlobalStats();
    }
    
    setupEventListeners() {
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const level = parseInt(e.currentTarget.dataset.level);
                this.startLevel(level);
            });
        });
        
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showLevelSelection();
        });
        
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        document.getElementById('hintBtn').addEventListener('click', () => {
            this.showHint();
        });
        
        document.getElementById('skipBtn').addEventListener('click', () => {
            this.skipQuestion();
        });
        
        document.getElementById('answerInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isAnswered) {
                this.checkAnswer();
            }
        });
    }
    
    startLevel(level) {
        this.currentLevel = level;
        this.questionCount = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.streak = 0;
        this.hintsUsed = 0;
        
        document.getElementById('levelSelection').classList.remove('active');
        document.getElementById('quizScreen').classList.add('active');
        
        const levelNames = [
            'Level 0: Basic Counting',
            'Level 1: Addition & Subtraction',
            'Level 2: Multiplication & Division',
            'Level 3: Fractions & Decimals',
            'Level 4: Algebra & Equations',
            'Level 5: Advanced Math'
        ];
        
        document.getElementById('currentLevel').textContent = levelNames[level];
        this.updateStats();
        this.generateQuestion();
    }
    
    showLevelSelection() {
        document.getElementById('quizScreen').classList.remove('active');
        document.getElementById('levelSelection').classList.add('active');
        this.updateGlobalStats();
    }
    
    updateGlobalStats() {
        document.getElementById('totalQuestions').textContent = this.totalQuestionsAllTime;
        document.getElementById('bestStreakGlobal').textContent = this.bestStreak;
    }
