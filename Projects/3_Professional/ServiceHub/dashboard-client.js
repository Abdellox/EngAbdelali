// Client Dashboard Logic

// Check authentication
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.userType !== 'client') {
    window.location.href = 'auth.html';
}

// Display user info
document.getElementById('user-name').textContent = `مرحباً، ${currentUser.name}`;
document.getElementById('user-avatar').textContent = currentUser.name.charAt(0);

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Sidebar navigation
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        
        document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
        document.getElementById(`${section}-section`).style.display = 'block';
        
        if (section === 'browse') loadProfessionals();
        if (section === 'orders') loadOrders();
        if (section === 'profile') loadProfile();
    });
});

// Get profession name in Arabic
function getProfessionName(profession) {
    const names = {
        babysitter: 'مربية أطفال',
        plumber: 'سباك',
        electrician: 'كهربائي',
        gardener: 'بستاني',
        painter: 'دهان',
        cleaner: 'تنظيف',
        carpenter: 'نجار',
        mechanic: 'ميكانيكي'
    };
    return names[profession] || profession;
}

// Get status name in Arabic
function getStatusName(status) {
    const names = {
        pending: 'قيد الانتظار',
        accepted: 'مقبول',
        completed: 'مكتمل',
        cancelled: 'ملغي'
    };
    return names[status] || status;
}

// Load overview stats
function loadOverview() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(o => o.clientId === currentUser.id);
    
    document.getElementById('total-orders').textContent = userOrders.length;
    document.getElementById('pending-orders').textContent = userOrders.filter(o => o.status === 'pending').length;
    document.getElementById('completed-orders').textContent = userOrders.filter(o => o.status === 'completed').length;
    
    // Show recent orders
    const recentOrders = userOrders.slice(-3).reverse();
    const recentOrdersDiv = document.getElementById('recent-orders');
    
    if (recentOrders.length === 0) {
        recentOrdersDiv.innerHTML = '<p style="color: var(--text-light);">لا توجد طلبات بعد</p>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    recentOrdersDiv.innerHTML = recentOrders.map(order => {
        const professional = users.find(u => u.id === order.professionalId);
        return `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h4>${professional ? professional.name : 'محترف'}</h4>
                        <p style="color: var(--text-light);">${getProfessionName(order.profession)}</p>
                    </div>
                    <span class="order-status status-${order.status}">${getStatusName(order.status)}</span>
                </div>
                <p>${order.description}</p>
                <p style="color: var(--text-light); margin-top: 0.5rem;">📅 ${order.date} ⏰ ${order.time}</p>
            </div>
        `;
    }).join('');
}

// Load professionals
function loadProfessionals() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const professionals = users.filter(u => u.userType === 'professional' && u.isActive);
    
    const filterProfession = document.getElementById('filter-profession').value;
    const filtered = filterProfession 
        ? professionals.filter(p => p.profession === filterProfession)
        : professionals;
    
    const professionalsDiv = document.getElementById('professionals-list');
    
    if (filtered.length === 0) {
        professionalsDiv.innerHTML = '<p style="color: var(--text-light);">لا يوجد محترفون في هذا المجال</p>';
        return;
    }
    
    professionalsDiv.innerHTML = filtered.map(pro => `
        <div class="professional-card">
            <div class="professional-avatar">${pro.name.charAt(0)}</div>
            <h3>${pro.name}</h3>
            <p class="profession">${getProfessionName(pro.profession)}</p>
            <div class="rating">
                <span class="stars">${'⭐'.repeat(Math.floor(pro.rating))}</span>
                <span class="rating-text">${pro.rating} (${pro.reviewCount} تقييم)</span>
            </div>
            <button class="btn-primary" onclick="openOrderModal('${pro.id}', '${pro.name}', '${pro.profession}')">طلب خدمة</button>
        </div>
    `).join('');
}

// Filter professionals
document.getElementById('filter-profession').addEventListener('change', loadProfessionals);

// Open order modal
window.openOrderModal = function(professionalId, professionalName, profession) {
    document.getElementById('order-professional-id').value = professionalId;
    document.getElementById('order-professional-name').value = professionalName + ' - ' + getProfessionName(profession);
    document.getElementById('order-modal').classList.add('active');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('order-date').min = today;
};

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('order-modal').classList.remove('active');
});

// Submit new order
document.getElementById('new-order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const professionalId = document.getElementById('order-professional-id').value;
    const description = document.getElementById('order-description').value;
    const date = document.getElementById('order-date').value;
    const time = document.getElementById('order-time').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const professional = users.find(u => u.id === professionalId);
    
    const order = {
        id: Date.now().toString(),
        clientId: currentUser.id,
        clientName: currentUser.name,
        clientPhone: currentUser.phone,
        professionalId,
        professionalName: professional.name,
        profession: professional.profession,
        description,
        date,
        time,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    alert('تم إرسال الطلب بنجاح!');
    document.getElementById('order-modal').classList.remove('active');
    document.getElementById('new-order-form').reset();
    
    loadOverview();
});

// Load orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = orders.filter(o => o.clientId === currentUser.id).reverse();
    
    const ordersDiv = document.getElementById('orders-list');
    
    if (userOrders.length === 0) {
        ordersDiv.innerHTML = '<p style="color: var(--text-light);">لا توجد طلبات بعد</p>';
        return;
    }
    
    ordersDiv.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h4>${order.professionalName}</h4>
                    <p style="color: var(--text-light);">${getProfessionName(order.profession)}</p>
                </div>
                <span class="order-status status-${order.status}">${getStatusName(order.status)}</span>
            </div>
            <p><strong>الوصف:</strong> ${order.description}</p>
            <p style="color: var(--text-light); margin-top: 0.5rem;">
                📅 ${order.date} ⏰ ${order.time}
            </p>
            <p style="color: var(--text-light); font-size: 0.9rem;">
                تاريخ الطلب: ${new Date(order.createdAt).toLocaleDateString('ar-SA')}
            </p>
            ${order.status === 'pending' ? `
                <button class="btn-secondary" style="margin-top: 1rem;" onclick="cancelOrder('${order.id}')">إلغاء الطلب</button>
            ` : ''}
        </div>
    `).join('');
}

// Cancel order
window.cancelOrder = function(orderId) {
    if (!confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        loadOverview();
        alert('تم إلغاء الطلب');
    }
};

// Load profile
function loadProfile() {
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
    document.getElementById('profile-phone').value = currentUser.phone;
}

// Update profile
document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('profile-name').value.trim();
    const phone = document.getElementById('profile-phone').value.trim();
    
    if (name.length < 3) {
        alert('الاسم يجب أن يكون 3 أحرف على الأقل');
        return;
    }
    
    if (phone.length < 10) {
        alert('رقم الهاتف غير صحيح');
        return;
    }
    
    // Update current user
    currentUser.name = name;
    currentUser.phone = phone;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].phone = phone;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    document.getElementById('user-name').textContent = `مرحباً، ${name}`;
    document.getElementById('user-avatar').textContent = name.charAt(0);
    
    alert('تم حفظ التغييرات بنجاح!');
});

// Initialize
loadOverview();
