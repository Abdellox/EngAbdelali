// Professional Dashboard Logic

// Check authentication
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.userType !== 'professional') {
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
    const myOrders = orders.filter(o => o.professionalId === currentUser.id);
    
    document.getElementById('total-orders').textContent = myOrders.length;
    document.getElementById('pending-orders').textContent = myOrders.filter(o => o.status === 'pending').length;
    document.getElementById('accepted-orders').textContent = myOrders.filter(o => o.status === 'accepted').length;
    document.getElementById('completed-orders').textContent = myOrders.filter(o => o.status === 'completed').length;
    
    // Show new orders
    const newOrders = myOrders.filter(o => o.status === 'pending').reverse();
    const newOrdersDiv = document.getElementById('new-orders');
    
    if (newOrders.length === 0) {
        newOrdersDiv.innerHTML = '<p style="color: var(--text-light);">لا توجد طلبات جديدة</p>';
        return;
    }
    
    newOrdersDiv.innerHTML = newOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h4>${order.clientName}</h4>
                    <p style="color: var(--text-light);">📞 ${order.clientPhone}</p>
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
            <div class="order-actions">
                <button class="btn-primary" onclick="acceptOrder('${order.id}')">قبول الطلب</button>
                <button class="btn-secondary" onclick="rejectOrder('${order.id}')">رفض الطلب</button>
            </div>
        </div>
    `).join('');
}

// Accept order
window.acceptOrder = function(orderId) {
    if (!confirm('هل تريد قبول هذا الطلب؟')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'accepted';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOverview();
        alert('تم قبول الطلب! يمكنك التواصل مع العميل الآن');
    }
};

// Reject order
window.rejectOrder = function(orderId) {
    if (!confirm('هل تريد رفض هذا الطلب؟')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOverview();
        alert('تم رفض الطلب');
    }
};

// Complete order
window.completeOrder = function(orderId) {
    if (!confirm('هل تم إنجاز هذا الطلب؟')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'completed';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        loadOverview();
        alert('تم تحديث حالة الطلب إلى مكتمل');
    }
};

// Load all orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    let myOrders = orders.filter(o => o.professionalId === currentUser.id).reverse();
    
    const filterStatus = document.getElementById('filter-status').value;
    if (filterStatus) {
        myOrders = myOrders.filter(o => o.status === filterStatus);
    }
    
    const ordersDiv = document.getElementById('orders-list');
    
    if (myOrders.length === 0) {
        ordersDiv.innerHTML = '<p style="color: var(--text-light);">لا توجد طلبات</p>';
        return;
    }
    
    ordersDiv.innerHTML = myOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h4>${order.clientName}</h4>
                    <p style="color: var(--text-light);">📞 ${order.clientPhone}</p>
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
                <div class="order-actions">
                    <button class="btn-primary" onclick="acceptOrder('${order.id}')">قبول الطلب</button>
                    <button class="btn-secondary" onclick="rejectOrder('${order.id}')">رفض الطلب</button>
                </div>
            ` : ''}
            ${order.status === 'accepted' ? `
                <div class="order-actions">
                    <button class="btn-primary" onclick="completeOrder('${order.id}')">تم الإنجاز</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Filter orders
document.getElementById('filter-status').addEventListener('change', loadOrders);

// Load profile
function loadProfile() {
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
    document.getElementById('profile-phone').value = currentUser.phone;
    document.getElementById('profile-profession').value = getProfessionName(currentUser.profession);
    document.getElementById('profile-rating').value = `${currentUser.rating} ⭐ (${currentUser.reviewCount} تقييم)`;
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
