// API Configuration
const API_URL = 'http://localhost:3000/api';

// Product Data
let products = [];

// Cart
let cart = [];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartCount = document.querySelector('.cart-count');
const categoryCards = document.querySelectorAll('.category-card');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Display Products
function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const productId = product._id || product.id;
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fas fa-shoe-prints"></i>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(product.rating)}
                </div>
                <div class="product-price">
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart('${productId}')">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        displayProducts(filter);
    });
});

// Category Card Click
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.click();
            }
        });
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => (p._id || p.id) == productId);
    const existingItem = cart.find(item => (item._id || item.id) == productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification('Added to cart!');
}

// Update Cart
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Show Cart Modal
cartBtn.addEventListener('click', () => {
    displayCart();
    cartModal.style.display = 'block';
});

// Close Modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Display Cart Items
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => {
        const itemId = item._id || item.id;
        return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #ddd;">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <button onclick="changeQuantity('${itemId}', -1)" style="padding: 0.5rem 1rem; cursor: pointer;">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${itemId}', 1)" style="padding: 0.5rem 1rem; cursor: pointer;">+</button>
                <button onclick="removeFromCart('${itemId}')" style="padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; cursor: pointer; border-radius: 5px;">Remove</button>
            </div>
        </div>
    `}).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Change Quantity
function changeQuantity(productId, change) {
    const item = cart.find(item => (item._id || item.id) == productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            displayCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => (item._id || item.id) != productId);
    updateCart();
    displayCart();
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    e.target.reset();
});

// Load Products from API
async function loadProductsFromAPI() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
            products = await response.json();
            displayProducts();
        } else {
            // Fallback to demo products
            products = getDemoProducts();
            displayProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to demo products
        products = getDemoProducts();
        displayProducts();
    }
}

// Demo Products Fallback
function getDemoProducts() {
    return [
        { id: 1, name: 'Air Max Pro', category: 'sneakers', price: 129.99, rating: 5, badge: 'New', stock: 50 },
        { id: 2, name: 'Classic Oxford', category: 'formal', price: 89.99, rating: 4, badge: '', stock: 30 },
        { id: 3, name: 'Running Elite', category: 'sports', price: 149.99, rating: 5, badge: 'Hot', stock: 40 },
        { id: 4, name: 'Casual Loafer', category: 'casual', price: 69.99, rating: 4, badge: '', stock: 60 },
        { id: 5, name: 'Street Sneaker', category: 'sneakers', price: 99.99, rating: 5, badge: 'Sale', stock: 45 },
        { id: 6, name: 'Derby Dress', category: 'formal', price: 119.99, rating: 4, badge: '', stock: 25 },
        { id: 7, name: 'Trail Runner', category: 'sports', price: 139.99, rating: 5, badge: 'New', stock: 35 },
        { id: 8, name: 'Canvas Slip-On', category: 'casual', price: 59.99, rating: 4, badge: '', stock: 70 },
        { id: 9, name: 'High Top Sneaker', category: 'sneakers', price: 109.99, rating: 5, badge: '', stock: 55 },
        { id: 10, name: 'Leather Brogue', category: 'formal', price: 159.99, rating: 5, badge: 'Premium', stock: 20 },
        { id: 11, name: 'Basketball Pro', category: 'sports', price: 169.99, rating: 5, badge: 'Hot', stock: 30 },
        { id: 12, name: 'Boat Shoe', category: 'casual', price: 79.99, rating: 4, badge: '', stock: 50 }
    ];
}

// Submit Order to API
async function submitOrder(orderData) {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error submitting order:', error);
        return null;
    }
}

// Initialize
loadProductsFromAPI();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});
