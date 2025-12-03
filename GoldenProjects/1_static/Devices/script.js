const API_URL = 'http://localhost:3000/api';

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Load Products from Backend
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            ${product.badge ? `<div class="product-badge ${product.badge === 'Sale' ? 'sale' : ''}">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews || 0} reviews)</span>
                </div>
                <div class="product-footer">
                    <span class="price">$${product.price}${product.oldPrice ? ` <span class="old-price">$${product.oldPrice}</span>` : ''}</span>
                    <button class="btn btn-add-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
    
    attachCartListeners();
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.querySelector('.cart-count');
updateCartCount();

function attachCartListeners() {
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const productId = parseInt(button.dataset.productId);
            
            try {
                const response = await fetch(`${API_URL}/products/${productId}`);
                const product = await response.json();
                
                addToCart(product);
                
                button.textContent = 'Added!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.textContent = 'Add to Cart';
                    button.style.background = '';
                }, 1500);
                
                showNotification('Product added to cart!');
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        });
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Load products on page load
loadProducts();

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});
