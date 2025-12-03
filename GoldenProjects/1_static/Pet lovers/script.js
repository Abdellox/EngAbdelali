// Sample pet images data
const petImages = [
    { id: 1, title: "Golden Retriever Puppy", category: "dogs", type: "free", price: 0, image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400" },
    { id: 2, title: "Cute Kitten", category: "cats", type: "free", price: 0, image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400" },
    { id: 3, title: "Colorful Parrot", category: "birds", type: "premium", price: 15, image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400" },
    { id: 4, title: "Husky Dog", category: "dogs", type: "sale", price: 25, image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400" },
    { id: 5, title: "Persian Cat", category: "cats", type: "premium", price: 20, image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400" },
    { id: 6, title: "Tropical Fish", category: "fish", type: "free", price: 0, image: "https://images.unsplash.com/photo-1520990269108-4f2d8b1a0f3d?w=400" },
    { id: 7, title: "White Rabbit", category: "rabbits", type: "free", price: 0, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400" },
    { id: 8, title: "Beagle Puppy", category: "dogs", type: "sale", price: 30, image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400" },
    { id: 9, title: "Siamese Cat", category: "cats", type: "premium", price: 18, image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400" },
    { id: 10, title: "Cockatiel Bird", category: "birds", type: "free", price: 0, image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400" },
    { id: 11, title: "German Shepherd", category: "dogs", type: "sale", price: 35, image: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=400" },
    { id: 12, title: "Orange Tabby", category: "cats", type: "free", price: 0, image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400" }
];

let currentFilter = 'all';

// Load gallery
function loadGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    const filteredImages = filter === 'all' ? petImages : petImages.filter(img => img.type === filter);
    
    galleryGrid.innerHTML = filteredImages.map(img => `
        <div class="gallery-item" data-id="${img.id}">
            <img src="${img.image}" alt="${img.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Pet+Image'">
            <div class="gallery-item-info">
                <div class="gallery-item-header">
                    <h3>${img.title}</h3>
                    <span class="gallery-item-type type-${img.type}">${img.type}</span>
                </div>
                <div class="gallery-item-meta">
                    <span><i class="fas fa-${getCategoryIcon(img.category)}"></i> ${img.category}</span>
                    ${img.price > 0 ? `<span class="gallery-item-price">$${img.price}</span>` : '<span class="gallery-item-price">Free</span>'}
                </div>
                ${img.price > 0 ? `
                    <button class="btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.6rem;" onclick="buyImage(${img.id})">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                ` : `
                    <button class="btn-secondary" style="width: 100%; margin-top: 0.5rem; padding: 0.6rem;" onclick="downloadImage(${img.id})">
                        <i class="fas fa-download"></i> Download Free
                    </button>
                `}
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        dogs: 'dog',
        cats: 'cat',
        birds: 'dove',
        fish: 'fish',
        rabbits: 'rabbit',
        other: 'paw'
    };
    return icons[category] || 'paw';
}

// Load marketplace
function loadMarketplace() {
    const marketplaceGrid = document.getElementById('marketplaceGrid');
    const forSale = petImages.filter(img => img.type === 'sale' || img.type === 'premium');
    
    marketplaceGrid.innerHTML = forSale.map(img => `
        <div class="gallery-item">
            <img src="${img.image}" alt="${img.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Pet+Image'">
            <div class="gallery-item-info">
                <div class="gallery-item-header">
                    <h3>${img.title}</h3>
                    <span class="gallery-item-type type-${img.type}">${img.type}</span>
                </div>
                <div class="gallery-item-meta">
                    <span><i class="fas fa-${getCategoryIcon(img.category)}"></i> ${img.category}</span>
                    <span class="gallery-item-price">$${img.price}</span>
                </div>
                <button class="btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.6rem;" onclick="buyImage(${img.id})">
                    <i class="fas fa-shopping-cart"></i> Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Buy image function
function buyImage(id) {
    if (!currentUser) {
        alert('Please login to purchase images');
        document.getElementById('loginModal').classList.add('active');
        return;
    }
    
    const image = petImages.find(img => img.id === id);
    if (image) {
        if (confirm(`Purchase "${image.title}" for $${image.price}?\n\nThis will redirect you to payment processing.`)) {
            alert(`Payment successful! You've purchased "${image.title}" for $${image.price}.\n\nThe image has been added to your profile.`);
            // In real app, this would process payment and add to user's purchases
        }
    }
}

// Download free image
function downloadImage(id) {
    const image = petImages.find(img => img.id === id);
    if (image) {
        alert(`Downloading "${image.title}"...\n\nIn a real application, this would download the high-resolution image.`);
        // In real app, this would trigger actual download
    }
}

// User session management
let currentUser = null;

// Check if user is logged in
function checkUserSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserProfile();
    }
}

function showUserProfile() {
    document.getElementById('loginBtn').style.display = 'none';
    const profileBtn = document.getElementById('userProfileBtn');
    profileBtn.style.display = 'flex';
    profileBtn.querySelector('span').textContent = currentUser.name;
    profileBtn.querySelector('img').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=ff6b6b&color=fff`;
}

function hideUserProfile() {
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('userProfileBtn').style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
    loadGallery();
    loadMarketplace();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            loadGallery(filter);
        });
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Login Modal
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    closeLogin.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
    
    closeRegister.addEventListener('click', () => {
        registerModal.classList.remove('active');
    });
    
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate login (in real app, this would call backend API)
        currentUser = {
            id: 1,
            name: "John Doe",
            email: formData.get('email'),
            isSeller: true,
            isBuyer: true
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserProfile();
        loginModal.classList.remove('active');
        alert('Login successful! Welcome back!');
    });
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Simulate registration (in real app, this would call backend API)
        currentUser = {
            id: Date.now(),
            name: formData.get('fullName'),
            email: formData.get('email'),
            isSeller: formData.get('isSeller') === 'on',
            isBuyer: formData.get('isBuyer') === 'on'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserProfile();
        registerModal.classList.remove('active');
        alert('Account created successfully! Welcome to iPet Lovers!');
    });
    
    // Upload button
    const uploadModal = document.getElementById('uploadModal');
    const btnUpload = document.querySelector('.btn-upload');
    const closeUpload = document.getElementById('closeUpload');
    
    btnUpload.addEventListener('click', () => {
        if (!currentUser) {
            alert('Please login to upload images');
            loginModal.classList.add('active');
            return;
        }
        uploadModal.classList.add('active');
    });
    
    closeUpload.addEventListener('click', () => {
        uploadModal.classList.remove('active');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            uploadModal.classList.remove('active');
        }
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // Upload form
    const uploadForm = document.getElementById('uploadForm');
    const listingTypeSelect = uploadForm.querySelector('[name="listingType"]');
    const priceGroup = document.getElementById('priceGroup');
    
    listingTypeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'sale' || e.target.value === 'premium') {
            priceGroup.style.display = 'block';
            priceGroup.querySelector('input').required = true;
        } else {
            priceGroup.style.display = 'none';
            priceGroup.querySelector('input').required = false;
        }
    });
    
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        const newImage = {
            id: petImages.length + 1,
            title: formData.get('title'),
            category: formData.get('petType'),
            type: formData.get('listingType'),
            price: formData.get('price') || 0,
            image: formData.get('imageUrl')
        };
        
        petImages.push(newImage);
        loadGallery(currentFilter);
        loadMarketplace();
        uploadModal.classList.remove('active');
        uploadForm.reset();
        alert('Image uploaded successfully!');
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('.nav-menu a, .hero-buttons button').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = link.getAttribute('href') || link.textContent.toLowerCase();
                const section = document.querySelector(target.startsWith('#') ? target : `#${target.split(' ')[0]}`);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Mobile menu toggle
    const btnMenu = document.querySelector('.btn-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
