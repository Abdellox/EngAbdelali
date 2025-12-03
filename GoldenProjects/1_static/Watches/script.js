// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load watches from admin data or use defaults
let watches = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Royal Chronograph", category: "luxury", price: 12500, stock: 15, description: "Swiss-made luxury timepiece", features: ["Automatic movement", "Sapphire crystal", "Water resistant"] },
    { id: 2, name: "Sport Pro X", category: "sport", price: 450, stock: 50, description: "GPS sports watch", features: ["GPS tracking", "Heart rate monitor", "Water resistant"] },
    { id: 3, name: "Smart Elite", category: "smart", price: 599, stock: 30, description: "Advanced smartwatch", features: ["AMOLED display", "Health tracking", "Notifications"] },
    { id: 4, name: "Classic Heritage", category: "luxury", price: 8900, stock: 10, description: "Vintage-inspired luxury", features: ["Leather strap", "Manual wind", "Limited edition"] },
    { id: 5, name: "Diver's Deep", category: "diving", price: 750, stock: 25, description: "Professional diving watch", features: ["300m water resistance", "Rotating bezel", "Luminous hands"] },
    { id: 6, name: "Business Elite", category: "business", price: 1200, stock: 20, description: "Executive timepiece", features: ["Stainless steel", "Date display", "Scratch resistant"] },
    { id: 7, name: "Fashion Icon", category: "fashion", price: 350, stock: 40, description: "Trendy fashion watch", features: ["Colorful design", "Interchangeable straps", "Lightweight"] },
    { id: 8, name: "Tech Vision", category: "smart", price: 399, stock: 35, description: "Smartwatch with AMOLED display", features: ["Fitness tracking", "Sleep monitor", "Notifications"] }
];

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Render watches
function renderWatches(filter = 'all') {
    const watchGrid = document.querySelector('.watch-grid');
    watchGrid.innerHTML = '';
    
    const filteredWatches = filter === 'all' 
        ? watches 
        : watches.filter(watch => watch.category === filter);
    
    if (filteredWatches.length === 0) {
        watchGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No watches found in this category.</p>';
        return;
    }
    
    filteredWatches.forEach(watch => {
        const watchCard = document.createElement('div');
        watchCard.className = 'watch-card';
        watchCard.innerHTML = `
            <div class="watch-image">
                <i class="fas fa-watch"></i>
            </div>
            <div class="watch-info">
                <h3>${watch.name}</h3>
                <p>${watch.description}</p>
                <div class="watch-price">$${watch.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" data-id="${watch.id}">Add to Cart</button>
                <button class="view-details-btn" data-id="${watch.id}">View Details</button>
            </div>
        `;
        watchGrid.appendChild(watchCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = watches.find(w => w.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show cart modal
function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '$0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = '$' + total.toLocaleString();
    }
    
    modal.style.display = 'block';
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

// Show product details
function showProductDetails(productId) {
    const product = watches.find(w => w.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const productDetail = document.getElementById('productDetail');
    
    productDetail.innerHTML = `
        <div class="product-detail-content">
            <div class="product-detail-image">
                <i class="fas fa-watch"></i>
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="product-category">${product.category.toUpperCase()}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    <h3>Features:</h3>
                    <ul>
                        ${product.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-price-large">$${product.price.toLocaleString()}</div>
                <p class="product-stock">In Stock: ${product.stock} units</p>
                <button class="btn-primary" onclick="addToCart(${product.id}); document.getElementById('productModal').style.display='none'">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const customerName = prompt('Enter your name:');
    const customerEmail = prompt('Enter your email:');
    
    if (customerName && customerEmail) {
        // Create order
        const order = {
            id: Date.now(),
            customer: customerName,
            email: customerEmail,
            product: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
            amount: total,
            status: 'pending',
            date: new Date().toISOString().split('T')[0]
        };
        
        // Save order
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        alert(`Order placed successfully!\nOrder ID: #${order.id}\nTotal: $${total.toLocaleString()}\n\nThank you for your purchase!`);
        document.getElementById('cartModal').style.display = 'none';
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderWatches();
    updateCartCount();
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            renderWatches(filter);
            document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Category cards - browse button
    document.querySelectorAll('.browse-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = e.target.closest('.category-card').getAttribute('data-category');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const targetBtn = document.querySelector(`[data-filter="${category}"]`);
            if (targetBtn) {
                targetBtn.classList.add('active');
            }
            renderWatches(category);
            document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Category cards - click to browse
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const targetBtn = document.querySelector(`[data-filter="${category}"]`);
            if (targetBtn) {
                targetBtn.classList.add('active');
            }
            renderWatches(category);
            document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        if (e.target.classList.contains('view-details-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            showProductDetails(productId);
        }
    });
    
    // Cart icon
    document.getElementById('cartIcon').addEventListener('click', showCart);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    
    // Search functionality
    const searchIcon = document.getElementById('searchIcon');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchIcon.addEventListener('click', () => {
        searchModal.style.display = 'block';
        searchInput.focus();
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = watches.filter(w => 
            w.name.toLowerCase().includes(query) || 
            w.description.toLowerCase().includes(query) ||
            w.category.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="padding: 1rem;">No watches found</p>';
        } else {
            searchResults.innerHTML = results.map(w => `
                <div class="search-result-item" onclick="showProductDetails(${w.id}); document.getElementById('searchModal').style.display='none'">
                    <i class="fas fa-watch"></i>
                    <div>
                        <h4>${w.name}</h4>
                        <p>${w.category} - $${w.price.toLocaleString()}</p>
                    </div>
                </div>
            `).join('');
        }
    });
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        if (navMenu.style.display === 'flex') {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            navMenu.style.zIndex = '999';
        }
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    });
});
