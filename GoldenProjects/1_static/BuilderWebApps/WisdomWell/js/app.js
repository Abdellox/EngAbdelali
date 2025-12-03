// WisdomWell Application Logic

// Welcome Message
console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║              🌟 Welcome to WisdomWell 🌟                ║
║                                                          ║
║        Where timeless wisdom meets modern life           ║
║                                                          ║
║  Built with ❤️ using HTML, CSS, and JavaScript         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

👴 Elder Thomas and 👵 Grandma Rose are ready to share their wisdom!

📚 Features:
  • Daily Wisdom
  • 6 Wisdom Categories
  • Interactive Stories
  • Q&A System
  • Favorites System

🚀 Start exploring and save your favorite wisdom!
`);

// State Management
const state = {
    currentSection: 'home',
    favorites: JSON.parse(localStorage.getItem('wisdomFavorites')) || [],
    lastDailyWisdom: localStorage.getItem('lastDailyWisdom') || null,
    lastDailyDate: localStorage.getItem('lastDailyDate') || null
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadDailyWisdom();
    renderCategories();
    renderStories();
    loadFavorites();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function navigateToSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionId;
        
        // Refresh favorites when navigating to favorites section
        if (sectionId === 'favorites') {
            loadFavorites();
        }
    }
}

// Daily Wisdom
function loadDailyWisdom() {
    const today = new Date().toDateString();
    const wisdomElement = document.getElementById('dailyWisdom');
    
    // Check if we already have today's wisdom
    if (state.lastDailyDate === today && state.lastDailyWisdom) {
        displayWisdom(JSON.parse(state.lastDailyWisdom));
        return;
    }
    
    // Get random wisdom from all categories
    const allWisdom = [];
    Object.values(wisdomData.wisdom).forEach(categoryWisdom => {
        allWisdom.push(...categoryWisdom);
    });
    
    const randomWisdom = allWisdom[Math.floor(Math.random() * allWisdom.length)];
    
    // Save to localStorage
    state.lastDailyWisdom = JSON.stringify(randomWisdom);
    state.lastDailyDate = today;
    localStorage.setItem('lastDailyWisdom', state.lastDailyWisdom);
    localStorage.setItem('lastDailyDate', state.lastDailyDate);
    localStorage.setItem('lastDailyWisdom', state.lastDailyWisdom);
    localStorage.setItem('lastDailyDate', state.lastDailyDate);
    
    displayWisdom(randomWisdom);
}

function displayWisdom(wisdom) {
    const wisdomElement = document.getElementById('dailyWisdom');
    wisdomElement.innerHTML = `
        <p class="quote">"${wisdom.text}"</p>
        <p class="author">— ${wisdom.author}</p>
    `;
}

// Categories
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    
    grid.innerHTML = wisdomData.categories.map(category => `
        <div class="category-card" onclick="showCategoryContent('${category.id}')">
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        </div>
    `).join('');
}

function showCategoryContent(categoryId) {
    const contentDiv = document.getElementById('categoryContent');
    const category = wisdomData.categories.find(c => c.id === categoryId);
    const wisdomItems = wisdomData.wisdom[categoryId] || [];
    
    contentDiv.innerHTML = `
        <h3>${category.icon} ${category.name}</h3>
        ${wisdomItems.map((item, index) => `
            <div class="wisdom-item" data-category="${categoryId}" data-index="${index}">
                <button class="favorite-btn ${isFavorited(categoryId, index) ? 'favorited' : ''}" 
                        onclick="toggleFavorite('${categoryId}', ${index})">
                    ${isFavorited(categoryId, index) ? '⭐' : '☆'}
                </button>
                <p class="quote">"${item.text}"</p>
                <p class="author">— ${item.author}</p>
                <span class="badge">${item.type}</span>
            </div>
        `).join('')}
    `;
    
    contentDiv.classList.add('active');
    contentDiv.scrollIntoView({ behavior: 'smooth' });
}

// Stories
function renderStories() {
    const grid = document.getElementById('storiesGrid');
    
    grid.innerHTML = wisdomData.stories.map(story => `
        <div class="story-card" onclick="openStory(${story.id})">
            <h3>${story.title}</h3>
            <p class="narrator">${story.avatar} Narrated by ${story.narrator}</p>
            <p>${story.preview}</p>
        </div>
    `).join('');
}

function openStory(storyId) {
    const story = wisdomData.stories.find(s => s.id === storyId);
    const modal = document.getElementById('storyModal');
    
    document.getElementById('storyTitle').textContent = story.title;
    document.getElementById('storyContent').innerHTML = `
        <p class="narrator">${story.avatar} Narrated by ${story.narrator}</p>
        ${story.content}
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('storyModal').classList.remove('active');
}

// Character Dialogs
function speakWithCharacter(character) {
    const modal = document.getElementById('dialogModal');
    const dialogs = wisdomData.characterDialogs[character];
    const characterInfo = character === 'thomas' 
        ? { name: 'Elder Thomas', avatar: '👴' }
        : { name: 'Grandma Rose', avatar: '👵' };
    
    document.getElementById('dialogAvatar').textContent = characterInfo.avatar;
    document.getElementById('dialogName').textContent = characterInfo.name;
    
    const dialogContent = dialogs.map(dialog => `
        <div class="dialog-message">
            <p>${dialog}</p>
        </div>
    `).join('');
    
    document.getElementById('dialogContent').innerHTML = dialogContent;
    modal.classList.add('active');
}

function closeDialog() {
    document.getElementById('dialogModal').classList.remove('active');
}

// Q&A System
function askQuestion() {
    const questionInput = document.getElementById('userQuestion');
    const question = questionInput.value.trim().toLowerCase();
    
    if (!question) {
        alert('Please enter a question first.');
        return;
    }
    
    // Find matching response based on keywords
    let response = null;
    
    for (const [keyword, responses] of Object.entries(wisdomData.qaResponses.keywords)) {
        if (question.includes(keyword)) {
            response = responses[Math.floor(Math.random() * responses.length)];
            break;
        }
    }
    
    // Use default response if no keyword match
    if (!response) {
        const defaultResponses = wisdomData.qaResponses.default;
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    displayAnswer(response);
    questionInput.value = '';
}

function displayAnswer(response) {
    const container = document.getElementById('answerContainer');
    
    container.innerHTML = `
        <div class="answer-header">
            <div class="answer-avatar">${response.avatar}</div>
            <h3>${response.author}</h3>
        </div>
        <div class="answer-text">
            <p>"${response.text}"</p>
        </div>
    `;
    
    container.classList.add('active');
    container.scrollIntoView({ behavior: 'smooth' });
}

// Favorites System
function toggleFavorite(categoryId, index) {
    const favoriteKey = `${categoryId}-${index}`;
    const favoriteIndex = state.favorites.indexOf(favoriteKey);
    
    if (favoriteIndex > -1) {
        state.favorites.splice(favoriteIndex, 1);
    } else {
        state.favorites.push(favoriteKey);
    }
    
    localStorage.setItem('wisdomFavorites', JSON.stringify(state.favorites));
    
    // Update UI
    const btn = event.target;
    if (favoriteIndex > -1) {
        btn.textContent = '☆';
        btn.classList.remove('favorited');
    } else {
        btn.textContent = '⭐';
        btn.classList.add('favorited');
    }
    
    // Refresh favorites page if currently viewing
    if (state.currentSection === 'favorites') {
        loadFavorites();
    }
}

function isFavorited(categoryId, index) {
    return state.favorites.includes(`${categoryId}-${index}`);
}

function loadFavorites() {
    const container = document.getElementById('favoritesContainer');
    
    if (state.favorites.length === 0) {
        container.innerHTML = '<p class="empty-state">You haven\'t saved any wisdom yet. Start exploring!</p>';
        return;
    }
    
    const favoritesHTML = state.favorites.map(favoriteKey => {
        const [categoryId, index] = favoriteKey.split('-');
        const wisdom = wisdomData.wisdom[categoryId][parseInt(index)];
        const category = wisdomData.categories.find(c => c.id === categoryId);
        
        return `
            <div class="wisdom-item">
                <button class="favorite-btn favorited" onclick="toggleFavorite('${categoryId}', ${index})">⭐</button>
                <p class="quote">"${wisdom.text}"</p>
                <p class="author">— ${wisdom.author}</p>
                <span class="badge">${category.icon} ${category.name}</span>
            </div>
        `;
    }).join('');
    
    container.innerHTML = favoritesHTML;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const storyModal = document.getElementById('storyModal');
    const dialogModal = document.getElementById('dialogModal');
    
    if (event.target === storyModal) {
        closeModal();
    }
    if (event.target === dialogModal) {
        closeDialog();
    }
}

// Allow Enter key to submit question
document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('userQuestion');
    if (questionInput) {
        questionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                askQuestion();
            }
        });
    }
});
