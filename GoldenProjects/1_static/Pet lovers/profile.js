// User Profile Data (simulated - in real app this would come from backend)
const currentUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=ff6b6b&color=fff&size=120",
    bio: "Pet lover and photographer. I specialize in capturing beautiful moments of dogs and cats.",
    isSeller: true,
    isBuyer: true,
    paypalEmail: "john.doe@paypal.com",
    joinedDate: "2025-01-15"
};

const userListings = [
    { id: 1, title: "Golden Retriever Puppy", category: "dogs", type: "sale", price: 25, image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400", views: 145, likes: 23 },
    { id: 2, title: "Cute Kitten Playing", category: "cats", type: "premium", price: 20, image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400", views: 98, likes: 15 },
    { id: 3, title: "Husky in Snow", category: "dogs", type: "sale", price: 30, image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400", views: 203, likes: 41 },
    { id: 4, title: "Persian Cat Portrait", category: "cats", type: "premium", price: 18, image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=400", views: 87, likes: 12 }
];

const purchaseHistory = [
    { id: 101, title: "Colorful Parrot", seller: "Jane Smith", price: 15, date: "2025-11-10", image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400" },
    { id: 102, title: "Tropical Fish", seller: "Mike Johnson", price: 12, date: "2025-11-05", image: "https://images.unsplash.com/photo-1520990269108-4f2d8b1a0f3d?w=400" },
    { id: 103, title: "White Rabbit", seller: "Sarah Williams", price: 10, date: "2025-10-28", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400" }
];

const salesHistory = [
    { id: 201, title: "Golden Retriever Puppy", buyer: "Alice Brown", price: 25, date: "2025-11-15", image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400" },
    { id: 202, title: "Husky in Snow", buyer: "Bob Wilson", price: 30, date: "2025-11-12", image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400" },
    { id: 203, title: "Cute Kitten Playing", buyer: "Carol Davis", price: 20, date: "2025-11-08", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400" }
];

// Load user profile
function loadProfile() {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('profileAvatar').src = currentUser.avatar;
    
    // Update stats
    document.getElementById('totalListings').textContent = userListings.length;
    document.getElementById('totalSales').textContent = salesHistory.length;
    document.getElementById('totalPurchases').textContent = purchaseHistory.length;
    
    const totalEarnings = salesHistory.reduce((sum, sale) => sum + sale.price, 0);
    document.getElementById('totalEarnings').textContent = `$${totalEarnings}`;
}

// Load user listings
function loadMyListings() {
    const grid = document.getElementById('myListingsGrid');
    
    if (userListings.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">You haven\'t listed any images yet. Upload your first pet image!</p>';
        return;
    }
    
    grid.innerHTML = userListings.map(listing => `
        <div class="gallery-item">
            <img src="${listing.image}" alt="${listing.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Pet+Image'">
            <div class="gallery-item-info">
                <div class="gallery-item-header">
                    <h3>${listing.title}</h3>
                    <span class="gallery-item-type type-${listing.type}">${listing.type}</span>
                </div>
                <div class="gallery-item-meta">
                    <span><i class="fas fa-eye"></i> ${listing.views}</span>
                    <span><i class="fas fa-heart"></i> ${listing.likes}</span>
                </div>
                <div class="gallery-item-meta">
                    <span class="gallery-item-price">$${listing.price}</span>
                </div>
                <div class="listing-actions">
                    <button class="btn-edit-listing" onclick="editListing(${listing.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete-listing" onclick="deleteListing(${listing.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load purchase history
function loadPurchaseHistory() {
    const container = document.getElementById('purchaseHistory');
    
    if (purchaseHistory.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">No purchases yet. Browse the marketplace to find amazing pet images!</p>';
        return;
    }
    
    container.innerHTML = purchaseHistory.map(purchase => `
        <div class="purchase-item">
            <img src="${purchase.image}" alt="${purchase.title}" onerror="this.src='https://via.placeholder.com/80'">
            <div class="purchase-details">
                <h4>${purchase.title}</h4>
                <p>Seller: ${purchase.seller}</p>
                <p>Date: ${purchase.date}</p>
            </div>
            <div class="purchase-price">$${purchase.price}</div>
        </div>
    `).join('');
}

// Load sales history
function loadSalesHistory() {
    const container = document.getElementById('salesHistory');
    
    if (salesHistory.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">No sales yet. Upload and list your pet images to start selling!</p>';
        return;
    }
    
    container.innerHTML = salesHistory.map(sale => `
        <div class="purchase-item">
            <img src="${sale.image}" alt="${sale.title}" onerror="this.src='https://via.placeholder.com/80'">
            <div class="purchase-details">
                <h4>${sale.title}</h4>
                <p>Buyer: ${sale.buyer}</p>
                <p>Date: ${sale.date}</p>
            </div>
            <div class="purchase-price">$${sale.price}</div>
        </div>
    `).join('');
}

// Edit listing
function editListing(id) {
    const listing = userListings.find(l => l.id === id);
    if (listing) {
        alert(`Edit listing: ${listing.title}\n\nThis would open an edit form in a real application.`);
    }
}

// Delete listing
function deleteListing(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        const index = userListings.findIndex(l => l.id === id);
        if (index > -1) {
            userListings.splice(index, 1);
            loadMyListings();
            alert('Listing deleted successfully!');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadMyListings();
    loadPurchaseHistory();
    loadSalesHistory();
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(settingsForm);
        
        currentUser.name = formData.get('fullName');
        currentUser.email = formData.get('email');
        currentUser.bio = formData.get('bio');
        currentUser.isSeller = formData.get('isSeller') === 'on';
        currentUser.isBuyer = formData.get('isBuyer') === 'on';
        currentUser.paypalEmail = formData.get('paypalEmail');
        
        if (formData.get('avatar')) {
            currentUser.avatar = formData.get('avatar');
        }
        
        loadProfile();
        alert('Settings saved successfully!');
    });
});
