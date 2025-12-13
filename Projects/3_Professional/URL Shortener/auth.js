// Authentication functions

async function checkAuth() {
    try {
        const response = await fetch(`${API_URL}/auth/check`, {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated) {
            currentUser = data.user;
            showDashboard();
        } else {
            showAuthModal();
        }
    } catch (error) {
        showAuthModal();
    }
}

async function handleAuth() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        showAuthError('Please enter username and password');
        return;
    }
    
    if (!isLoginMode) {
        if (username.length < 3) {
            showAuthError('Username must be at least 3 characters');
            return;
        }
        if (password.length < 6) {
            showAuthError('Password must be at least 6 characters');
            return;
        }
    }
    
    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
    authBtn.disabled = true;
    authBtn.textContent = isLoginMode ? 'Logging in...' : 'Creating account...';
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = data.user;
            usernameInput.value = '';
            passwordInput.value = '';
            hideAuthError();
            showDashboard();
        } else {
            showAuthError(data.error || 'Authentication failed');
        }
    } catch (error) {
        showAuthError('Network error. Please check if server is running.');
    } finally {
        authBtn.disabled = false;
        authBtn.textContent = isLoginMode ? 'Login' : 'Sign Up';
    }
}

function showAuthError(message) {
    let errorDiv = document.getElementById('authError');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'authError';
        errorDiv.className = 'auth-error';
        document.getElementById('authForm').insertBefore(errorDiv, document.getElementById('authForm').firstChild);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideAuthError() {
    const errorDiv = document.getElementById('authError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

function toggleAuthMode(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    hideAuthError();
    usernameInput.value = '';
    passwordInput.value = '';
    
    if (isLoginMode) {
        authTitle.textContent = 'Welcome Back!';
        document.querySelector('.auth-subtitle').textContent = 'Login to manage your links';
        authBtn.textContent = 'Login';
        switchAuth.innerHTML = 'Don\'t have an account? <a href="#">Sign up</a>';
    } else {
        authTitle.textContent = 'Create Account';
        document.querySelector('.auth-subtitle').textContent = 'Start shortening your links';
        authBtn.textContent = 'Sign Up';
        switchAuth.innerHTML = 'Already have an account? <a href="#">Login</a>';
    }
}

async function logout() {
    if (!confirm('Are you sure you want to logout?')) return;
    
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        currentUser = null;
        allLinks = [];
        showAuthModal();
    } catch (error) {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
    }
}

function showAuthModal() {
    authModal.style.display = 'flex';
    userInfo.classList.add('hidden');
    userLinksSection.style.display = 'none';
    statsSection.style.display = 'none';
    hideAuthError();
    usernameInput.value = '';
    passwordInput.value = '';
    resultDiv.classList.add('hidden');
    longUrlInput.value = '';
    customCodeInput.value = '';
}

function showDashboard() {
    authModal.style.display = 'none';
    userInfo.classList.remove('hidden');
    welcomeUser.textContent = `👋 ${currentUser.username}`;
    userLinksSection.style.display = 'block';
    statsSection.style.display = 'block';
    
    // Show loading state
    linksList.innerHTML = '<div class="empty-state">Loading your links...</div>';
    
    loadUserLinks();
    loadStats();
}
