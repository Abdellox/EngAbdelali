// Infinite Scroll - Full Implementation
let page = 1;
let isLoading = false;

function loadItems() {
    if (isLoading) return;
    
    isLoading = true;
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    
    // Simulate API delay
    setTimeout(() => {
        const content = document.getElementById('content');
        
        for (let i = 0; i < 10; i++) {
            const itemNumber = (page - 1) * 10 + i + 1;
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <h3>Item ${itemNumber}</h3>
                <p>This is content for item number ${itemNumber}</p>
            `;
            content.appendChild(item);
        }
        
        page++;
        isLoading = false;
        loading.style.display = 'none';
    }, 500);
}

// Detect scroll near bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadItems();
    }
});

// Initial load
loadItems();

console.log('∞ Infinite Scroll Ready');
