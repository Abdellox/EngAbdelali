// Auth System with LocalStorage

// Tab switching
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tabName}-form`).classList.add('active');
        
        hideMessages();
    });
});

// User type selection
document.querySelectorAll('.user-type-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.user-type-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const userType = card.querySelector('input[type="radio"]').value;
        const professionGroup = document.getElementById('profession-group');
        
        if (userType === 'professional') {
            professionGroup.style.display = 'block';
            document.getElementById('register-profession').required = true;
        } else {
            professionGroup.style.display = 'none';
            document.getElementById('register-profession').required = false;
        }
    });
});

// Show/Hide messages
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => successDiv.style.display = 'none', 3000);
}

function hideMessages() {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('success-message').style.display = 'none';
}

// Initialize users array in localStorage
function initStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
}

// Get all users
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

// Save users
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Register
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const profession = document.getElementById('register-profession').value;
    
    // Validation
    if (name.length < 3) {
        showError('الاسم يجب أن يكون 3 أحرف على الأقل');
        return;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError('البريد الإلكتروني غير صحيح');
        return;
    }
    
    if (phone.length < 10) {
        showError('رقم الهاتف غير صحيح');
        return;
    }
    
    if (password.length < 6) {
        showError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
    }
    
    if (userType === 'professional' && !profession) {
        showError('يرجى اختيار المهنة');
        return;
    }
    
    const users = getUsers();
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        showError('البريد الإلكتروني مسجل مسبقاً');
        return;
    }
    
    // Create user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password, // In production, hash this!
        userType,
        profession: userType === 'professional' ? profession : null,
        rating: userType === 'professional' ? 5.0 : null,
        reviewCount: userType === 'professional' ? 0 : null,
        createdAt: new Date().toISOString(),
        isActive: true
    };
    
    users.push(newUser);
    saveUsers(users);
    
    showSuccess('تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...');
    
    // Auto login
    setTimeout(() => {
        loginUser(newUser);
    }, 1500);
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        return;
    }
    
    if (!user.isActive) {
        showError('الحساب غير نشط');
        return;
    }
    
    showSuccess('تم تسجيل الدخول بنجاح!');
    setTimeout(() => loginUser(user), 1000);
});

// Login user and redirect
function loginUser(user) {
    // Store current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect based on user type
    if (user.userType === 'professional') {
        window.location.href = 'dashboard-professional.html';
    } else {
        window.location.href = 'dashboard-client.html';
    }
}

// Initialize
initStorage();

// Add some demo users for testing
const users = getUsers();
if (users.length === 0) {
    const demoUsers = [
        {
            id: '1',
            name: 'أحمد محمد',
            email: 'ahmed@test.com',
            phone: '0501234567',
            password: '123456',
            userType: 'professional',
            profession: 'plumber',
            rating: 4.9,
            reviewCount: 127,
            createdAt: new Date().toISOString(),
            isActive: true
        },
        {
            id: '2',
            name: 'فاطمة علي',
            email: 'fatima@test.com',
            phone: '0507654321',
            password: '123456',
            userType: 'professional',
            profession: 'babysitter',
            rating: 5.0,
            reviewCount: 89,
            createdAt: new Date().toISOString(),
            isActive: true
        },
        {
            id: '3',
            name: 'محمد خالد',
            email: 'client@test.com',
            phone: '0509876543',
            password: '123456',
            userType: 'client',
            profession: null,
            rating: null,
            reviewCount: null,
            createdAt: new Date().toISOString(),
            isActive: true
        }
    ];
    saveUsers(demoUsers);
}
