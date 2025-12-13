const API_URL = 'http://localhost:8080/api';

// DOM Elements
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authBtn = document.getElementById('authBtn');
const switchAuth = document.getElementById('switchAuth');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userInfo = document.getElementById('userInfo');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');
const longUrlInput = document.getElementById('longUrl');
const customCodeInput = document.getElementById('customCode');
const shortenBtn = document.getElementById('shortenBtn');
const resultDiv = document.getElementById('result');
const shortUrlInput = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');
const errorDiv = document.getElementById('error');
const linksList = document.getElementById('linksList');
const searchInput = document.getElementById('searchLinks');
const userLinksSection = document.getElementById('userLinksSection');
const statsSection = document.getElementById('statsSection');

let allLinks = [];
let isLoginMode = true;
let currentUser = null;

// Event Listeners
authBtn.addEventListener('click', handleAuth);
switchAuth.addEventListener('click', toggleAuthMode);
logoutBtn.addEventListener('click', logout);
shortenBtn.addEventListener('click', shortenUrl);
copyBtn.addEventListener('click', copyToClipboard);
longUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') shortenUrl();
});
searchInput.addEventListener('input', (e) => {
    filterLinks(e.target.value);
});
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAuth();
});

// Check if user is logged in
checkAuth();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!authModal.style.display || authModal.style.display === 'none') {
            searchInput.focus();
        }
    }
    
    // Escape to close result
    if (e.key === 'Escape') {
        if (!resultDiv.classList.contains('hidden')) {
            resultDiv.classList.add('hidden');
        }
    }
});

async function shortenUrl() {
    const longUrl = longUrlInput.value.trim();
    const customCode = customCodeInput.value.trim();
    
    if (!longUrl) {
        showError('Please enter a URL');
        return;
    }
    
    if (!isValidUrl(longUrl)) {
        showError('Please enter a valid URL');
        return;
    }
    
    if (customCode && !/^[a-zA-Z0-9_-]+$/.test(customCode)) {
        showError('Custom code can only contain letters, numbers, dashes and underscores');
        return;
    }
    
    hideError();
    shortenBtn.disabled = true;
    shortenBtn.textContent = 'Shortening...';
    
    try {
        const response = await fetch(`${API_URL}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ url: longUrl, customCode })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showResult(data.shortUrl);
            longUrlInput.value = '';
            customCodeInput.value = '';
            loadUserLinks();
            loadStats();
        } else {
            showError(data.error || 'Failed to shorten URL');
        }
    } catch (error) {
        showError('Network error. Please check if the server is running.');
    } finally {
        shortenBtn.disabled = false;
        shortenBtn.textContent = 'Shorten URL';
    }
}

async function loadUserLinks() {
    try {
        const response = await fetch(`${API_URL}/links`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Session expired
                showAuthModal();
                return;
            }
            throw new Error('Failed to load links');
        }
        
        const data = await response.json();
        
        if (data.links) {
            allLinks = data.links;
            displayLinks(allLinks);
        }
    } catch (error) {
        console.error('Failed to load links:', error);
        linksList.innerHTML = '<div class="empty-state">Failed to load links. Please refresh.</div>';
    }
}

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`, {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('totalLinks').textContent = data.totalLinks;
            document.getElementById('totalClicks').textContent = data.totalClicks;
            document.getElementById('topLink').textContent = data.topLink || '-';
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

function filterLinks(searchTerm) {
    const filtered = allLinks.filter(link => 
        link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayLinks(filtered);
}

function displayLinks(links) {
    if (links.length === 0) {
        linksList.innerHTML = '<div class="empty-state">No links yet. Create your first short link above! 🚀</div>';
        return;
    }
    
    linksList.innerHTML = links.map(link => `
        <div class="link-item" data-code="${link.shortCode}">
            <div class="link-item-header">
                <a href="${link.shortUrl}" target="_blank" class="short-link">${link.shortUrl}</a>
                <div class="link-actions">
                    <span class="clicks">👁 ${link.clicks}</span>
                    <button class="btn-copy-small" onclick="copyLink('${link.shortUrl}')" title="Copy link">📋</button>
                    <button class="btn-delete" onclick="deleteLink('${link.shortCode}')" title="Delete link">🗑️</button>
                </div>
            </div>
            <div class="original-url" title="${escapeHtml(link.originalUrl)}">${truncateUrl(link.originalUrl)}</div>
            <div class="link-date">${formatDate(link.createdAt)}</div>
        </div>
    `).join('');
}

function truncateUrl(url, maxLength = 60) {
    if (url.length <= maxLength) return escapeHtml(url);
    return escapeHtml(url.substring(0, maxLength)) + '...';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        showError('✓ Link copied to clipboard!');
        setTimeout(hideError, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showError('✓ Link copied to clipboard!');
        setTimeout(hideError, 2000);
    });
}

async function deleteLink(shortCode) {
    if (!confirm('Are you sure you want to delete this link? This cannot be undone.')) return;
    
    // Optimistic UI update
    const linkItem = document.querySelector(`[data-code="${shortCode}"]`);
    if (linkItem) {
        linkItem.style.opacity = '0.5';
        linkItem.style.pointerEvents = 'none';
    }
    
    try {
        const response = await fetch(`${API_URL}/delete/${shortCode}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if (response.ok) {
            // Remove from local array
            allLinks = allLinks.filter(link => link.shortCode !== shortCode);
            displayLinks(allLinks);
            loadStats();
            showError('✓ Link deleted successfully');
            setTimeout(hideError, 2000);
        } else {
            if (linkItem) {
                linkItem.style.opacity = '1';
                linkItem.style.pointerEvents = 'auto';
            }
            showError('Failed to delete link');
        }
    } catch (error) {
        if (linkItem) {
            linkItem.style.opacity = '1';
            linkItem.style.pointerEvents = 'auto';
        }
        showError('Network error. Failed to delete link.');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

function showResult(shortUrl) {
    shortUrlInput.value = shortUrl;
    resultDiv.classList.remove('hidden');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Auto-hide success messages
    if (message.startsWith('✓')) {
        errorDiv.style.background = '#d1fae5';
        errorDiv.style.color = '#065f46';
    } else {
        errorDiv.style.background = '';
        errorDiv.style.color = '';
    }
}

function hideError() {
    errorDiv.classList.add('hidden');
}

function copyToClipboard() {
    shortUrlInput.select();
    document.execCommand('copy');
    
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    copyBtn.style.background = '#10b981';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}
