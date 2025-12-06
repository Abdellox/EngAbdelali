// API Demo - Full Implementation

let stats = {
    total: 0,
    success: 0,
    failed: 0
};

function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

async function fetchRandomUser() {
    const resultDiv = document.getElementById('users-result');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Loading...';
    resultDiv.innerHTML = '<div class="loading">Fetching user data...</div>';
    
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        
        resultDiv.innerHTML = `
            <div class="user-card">
                <img src="${user.picture.large}" alt="User" class="user-avatar">
                <div class="user-info">
                    <h4>${user.name.first} ${user.name.last}</h4>
                    <div class="user-detail">📧 ${user.email}</div>
                    <div class="user-detail">📱 ${user.phone}</div>
                    <div class="user-detail">📍 ${user.location.city}, ${user.location.country}</div>
                    <div class="user-detail">🎂 ${new Date(user.dob.date).toLocaleDateString()}</div>
                </div>
            </div>
        `;
        
        updateStats(true);
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">Failed to fetch user data. Please try again.</div>';
        updateStats(false);
    }
    
    btn.disabled = false;
    btn.textContent = 'Fetch Random User';
}

async function fetchJoke() {
    const resultDiv = document.getElementById('jokes-result');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Loading...';
    resultDiv.innerHTML = '<div class="loading">Fetching joke...</div>';
    
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        
        resultDiv.innerHTML = `
            <div class="joke-card">
                <div class="joke-text">${joke.setup}</div>
                <div class="joke-text" style="color: #667eea; font-weight: 700;">${joke.punchline} 😄</div>
            </div>
        `;
        
        updateStats(true);
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">Failed to fetch joke. Please try again.</div>';
        updateStats(false);
    }
    
    btn.disabled = false;
    btn.textContent = 'Get a Joke';
}

async function fetchQuote() {
    const resultDiv = document.getElementById('quotes-result');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Loading...';
    resultDiv.innerHTML = '<div class="loading">Fetching quote...</div>';
    
    try {
        const response = await fetch('https://api.quotable.io/random');
        const quote = await response.json();
        
        resultDiv.innerHTML = `
            <div class="quote-card">
                <div class="quote-text">"${quote.content}"</div>
                <div class="quote-author">— ${quote.author}</div>
            </div>
        `;
        
        updateStats(true);
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">Failed to fetch quote. Please try again.</div>';
        updateStats(false);
    }
    
    btn.disabled = false;
    btn.textContent = 'Get Quote';
}

async function fetchCatFact() {
    const resultDiv = document.getElementById('facts-result');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Loading...';
    resultDiv.innerHTML = '<div class="loading">Fetching cat fact...</div>';
    
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div class="fact-card">
                <div class="fact-text">🐱 ${data.fact}</div>
            </div>
        `;
        
        updateStats(true);
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">Failed to fetch cat fact. Please try again.</div>';
        updateStats(false);
    }
    
    btn.disabled = false;
    btn.textContent = 'Get Cat Fact';
}

async function fetchAdvice() {
    const resultDiv = document.getElementById('advice-result');
    const btn = event.target;
    
    btn.disabled = true;
    btn.textContent = 'Loading...';
    resultDiv.innerHTML = '<div class="loading">Fetching advice...</div>';
    
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div class="advice-card">
                <div class="advice-text">💡 ${data.slip.advice}</div>
            </div>
        `;
        
        updateStats(true);
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">Failed to fetch advice. Please try again.</div>';
        updateStats(false);
    }
    
    btn.disabled = false;
    btn.textContent = 'Get Advice';
}

function updateStats(success) {
    stats.total++;
    if (success) {
        stats.success++;
    } else {
        stats.failed++;
    }
    
    document.getElementById('totalRequests').textContent = stats.total;
    const successRate = stats.total > 0 ? Math.round((stats.success / stats.total) * 100) : 100;
    document.getElementById('successRate').textContent = `${successRate}%`;
}

console.log('🌐 API Demo - Fully Functional');
