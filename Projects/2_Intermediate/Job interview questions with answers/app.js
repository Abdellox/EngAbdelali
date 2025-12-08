// State management
let currentView = 'categories';
let currentCategory = '';
let currentJob = '';
let currentQuestionIndex = 0;
let currentQuestions = [];

// DOM elements
const categoryGrid = document.getElementById('categoryGrid');
const jobList = document.getElementById('jobList');
const questionView = document.getElementById('questionView');
const searchInput = document.getElementById('searchInput');
const backBtn = document.getElementById('backBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionCounter = document.getElementById('questionCounter');
const questionCard = document.getElementById('questionCard');
const jobTitle = document.getElementById('jobTitle');

// Initialize app
function init() {
    renderCategories();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    backBtn.addEventListener('click', function() {
        // Go back to mode selection
        showModeSelection(currentCategory, currentJob);
    });
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
}

// Render categories
function renderCategories() {
    categoryGrid.innerHTML = '';
    
    Object.keys(jobData).forEach(category => {
        const jobs = Object.keys(jobData[category]);
        const card = document.createElement('div');
        card.className = 'category-card';
        
        card.innerHTML = `
            <h3>${category}</h3>
            <div class="job-count">${jobs.length} job roles</div>
            <ul>
                ${jobs.map(job => `<li data-category="${category}" data-job="${job}">${job}</li>`).join('')}
            </ul>
        `;
        
        // Add click listeners to job items
        card.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                const category = li.dataset.category;
                const job = li.dataset.job;
                showQuestions(category, job);
            });
        });
        
        categoryGrid.appendChild(card);
    });
    
    showView('categories');
}

// Handle search with online capability
let searchTimeout;
function handleSearch(e) {
    const searchTerm = e.target.value.trim();
    
    // Clear previous timeout
    clearTimeout(searchTimeout);
    
    if (searchTerm === '') {
        renderCategories();
        return;
    }
    
    // Show loading state
    categoryGrid.innerHTML = '<div class="category-card"><h3>🔍 Searching...</h3><p>Looking for interview questions...</p></div>';
    
    // Debounce search
    searchTimeout = setTimeout(() => {
        performSearch(searchTerm);
    }, 500);
}

async function performSearch(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    categoryGrid.innerHTML = '';
    let foundResults = false;
    
    // First, search in local database
    Object.keys(jobData).forEach(category => {
        const jobs = Object.keys(jobData[category]);
        const matchingJobs = jobs.filter(job => 
            job.toLowerCase().includes(searchLower) || 
            category.toLowerCase().includes(searchLower)
        );
        
        if (matchingJobs.length > 0) {
            foundResults = true;
            const card = document.createElement('div');
            card.className = 'category-card';
            
            card.innerHTML = `
                <h3>${category}</h3>
                <div class="job-count">${matchingJobs.length} matching roles</div>
                <ul>
                    ${matchingJobs.map(job => `<li data-category="${category}" data-job="${job}">${job}</li>`).join('')}
                </ul>
            `;
            
            card.querySelectorAll('li').forEach(li => {
                li.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const category = li.dataset.category;
                    const job = li.dataset.job;
                    showQuestions(category, job);
                });
            });
            
            categoryGrid.appendChild(card);
        }
    });
    
    // If no local results, search online
    if (!foundResults) {
        categoryGrid.innerHTML = '<div class="category-card"><h3>🌐 Searching online...</h3><p>Fetching interview questions from the web...</p></div>';
        
        try {
            const onlineResults = await searchInterviewQuestions(searchTerm);
            
            if (onlineResults && onlineResults.questions.length > 0) {
                // Add to temporary storage
                if (!jobData['Online Search Results']) {
                    jobData['Online Search Results'] = {};
                }
                jobData['Online Search Results'][onlineResults.job] = onlineResults.questions;
                
                // Display results
                categoryGrid.innerHTML = '';
                const card = document.createElement('div');
                card.className = 'category-card online-result';
                
                card.innerHTML = `
                    <h3>🌐 ${onlineResults.category}</h3>
                    <div class="job-count">Found ${onlineResults.questions.length} questions online</div>
                    <ul>
                        <li data-category="Online Search Results" data-job="${onlineResults.job}">
                            ${onlineResults.job} <span class="badge-online">LIVE</span>
                        </li>
                    </ul>
                    <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                        📡 Questions fetched from online sources
                    </p>
                `;
                
                card.querySelector('li').addEventListener('click', (e) => {
                    e.stopPropagation();
                    showQuestions('Online Search Results', onlineResults.job);
                });
                
                categoryGrid.appendChild(card);
            } else {
                categoryGrid.innerHTML = `
                    <div class="category-card">
                        <h3>❌ No results found</h3>
                        <p>We couldn't find interview questions for "${searchTerm}"</p>
                        <p style="margin-top: 15px; font-size: 0.9em; color: #666;">
                            Try searching for:<br>
                            • Common job titles (e.g., "Software Developer", "Nurse", "Teacher")<br>
                            • Browse our categories below
                        </p>
                        <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 20px; cursor: pointer;">
                            Browse All Jobs
                        </button>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Online search error:', error);
            categoryGrid.innerHTML = `
                <div class="category-card">
                    <h3>⚠️ Search Error</h3>
                    <p>Unable to search online. Please check your internet connection.</p>
                    <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 20px; cursor: pointer;">
                        Try Again
                    </button>
                </div>
            `;
        }
    }
}

// Show questions for a specific job - now shows mode selection first
function showQuestions(category, job) {
    // Show mode selection instead of directly showing questions
    showModeSelection(category, job);
}

// Show practice mode questions
function showPracticeQuestions(category, job) {
    console.log('showPracticeQuestions called with:', category, job);
    currentCategory = category;
    currentJob = job;
    currentQuestions = jobData[category][job];
    currentQuestionIndex = 0;
    
    console.log('Questions loaded:', currentQuestions.length);
    jobTitle.textContent = `${job} - Practice Mode`;
    renderQuestion();
    showView('questions');
}

// Render current question
function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    questionCard.innerHTML = `
        <div class="question">${currentQuestionIndex + 1}. ${question.q}</div>
        <button class="show-answer-btn" onclick="toggleAnswer()">Show Answer</button>
        <div class="answer" id="answer">
            <h4>Answer:</h4>
            <p>${question.a}</p>
        </div>
    `;
    
    updateNavigationButtons();
    updateQuestionCounter();
}

// Toggle answer visibility
function toggleAnswer() {
    const answer = document.getElementById('answer');
    const btn = document.querySelector('.show-answer-btn');
    
    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        btn.textContent = 'Show Answer';
    } else {
        answer.classList.add('show');
        btn.textContent = 'Hide Answer';
    }
}

// Navigation functions
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === currentQuestions.length - 1;
}

function updateQuestionCounter() {
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
}

// View management
function showView(view) {
    categoryGrid.classList.add('hidden');
    jobList.classList.add('hidden');
    questionView.classList.add('hidden');
    document.getElementById('modeSelection').classList.add('hidden');
    document.getElementById('examView').classList.add('hidden');
    document.getElementById('resultsView').classList.add('hidden');
    
    if (view === 'categories') {
        categoryGrid.classList.remove('hidden');
    } else if (view === 'questions') {
        questionView.classList.remove('hidden');
    } else if (view === 'modeSelection') {
        document.getElementById('modeSelection').classList.remove('hidden');
    } else if (view === 'exam') {
        document.getElementById('examView').classList.remove('hidden');
    } else if (view === 'results') {
        document.getElementById('resultsView').classList.remove('hidden');
    }
}

function showCategories() {
    searchInput.value = '';
    renderCategories();
    showView('categories');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
