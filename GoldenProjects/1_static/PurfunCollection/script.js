// Products Data - Load from localStorage (synced with admin) or use defaults
let products = JSON.parse(localStorage.getItem('storeProducts')) || [
    { id: 1, name: "Midnight Elegance", category: "men", price: 89.99, description: "A sophisticated blend of woody and spicy notes", icon: "🌙" },
    { id: 2, name: "Rose Garden", category: "women", price: 95.99, description: "Delicate floral fragrance with rose essence", icon: "🌹" },
    { id: 3, name: "Ocean Breeze", category: "unisex", price: 79.99, description: "Fresh aquatic scent for everyday wear", icon: "🌊" },
    { id: 4, name: "Velvet Noir", category: "women", price: 105.99, description: "Luxurious evening perfume with vanilla notes", icon: "💜" },
    { id: 5, name: "Urban Legend", category: "men", price: 92.99, description: "Modern masculine scent with citrus top notes", icon: "🏙️" },
    { id: 6, name: "Golden Hour", category: "unisex", price: 88.99, description: "Warm amber fragrance perfect for any occasion", icon: "✨" },
    { id: 7, name: "Wild Orchid", category: "women", price: 98.99, description: "Exotic floral blend with oriental undertones", icon: "🌺" },
    { id: 8, name: "Black Leather", category: "men", price: 110.99, description: "Bold and intense leather fragrance", icon: "🖤" },
    { id: 9, name: "Crystal Clear", category: "unisex", price: 75.99, description: "Light and refreshing daily fragrance", icon: "💎" },
];

// Save initial products to localStorage if not exists
if (!localStorage.getItem('storeProducts')) {
    localStorage.setItem('storeProducts', JSON.stringify(products));
}

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    loadCart();
});

// Display Products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter Products
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        if (filter === 'all') {
            displayProducts(products);
        } else {
            const filtered = products.filter(product => product.category === filter);
            displayProducts(filtered);
        }
    });
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    saveCart();
    showNotification('Added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// Update Cart Display
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        cartCount.textContent = '0';
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-image">${item.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = itemCount;
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Cart Modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Total: ' + cartTotal.textContent);
    cart = [];
    updateCart();
    saveCart();
    cartModal.classList.remove('active');
});

// Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    contactForm.reset();
});

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d4af37;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
