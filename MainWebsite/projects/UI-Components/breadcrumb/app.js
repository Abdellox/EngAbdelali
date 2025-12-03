const pages = {
    home: { title: 'Home', children: ['products', 'about', 'contact'] },
    products: { title: 'Products', parent: 'home', children: ['electronics', 'clothing', 'books'] },
    electronics: { title: 'Electronics', parent: 'products', children: ['phones', 'laptops'] },
    phones: { title: 'Phones', parent: 'electronics' },
    laptops: { title: 'Laptops', parent: 'electronics' },
    clothing: { title: 'Clothing', parent: 'products' },
    books: { title: 'Books', parent: 'products' },
    about: { title: 'About Us', parent: 'home' },
    contact: { title: 'Contact', parent: 'home' }
};

let currentPage = 'home';

function navigate(page) {
    currentPage = page;
    renderBreadcrumb();
    renderContent();
}

function renderBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const path = getPath(currentPage);
    
    breadcrumb.innerHTML = path.map((p, i) => `
        <span class="breadcrumb-item ${i === path.length - 1 ? 'active' : ''}" 
              ${i < path.length - 1 ? `onclick="navigate('${p}')"` : ''}>
            ${pages[p].title}
        </span>
        ${i < path.length - 1 ? '<span class="separator">›</span>' : ''}
    `).join('');
}

function getPath(page) {
    const path = [];
    let current = page;
    
    while (current) {
        path.unshift(current);
        current = pages[current].parent;
    }
    
    return path;
}

function renderContent() {
    const content = document.getElementById('content');
    const page = pages[currentPage];
    
    content.innerHTML = `
        <h2>${page.title}</h2>
        <p>You are currently viewing: <strong>${page.title}</strong></p>
        ${page.children ? `
            <div class="links">
                <h3>Navigate to:</h3>
                ${page.children.map(c => 
                    `<button onclick="navigate('${c}')" class="nav-btn">${pages[c].title}</button>`
                ).join('')}
            </div>
        ` : '<p>This is a leaf page with no children.</p>'}
        ${page.parent ? 
            `<button onclick="navigate('${page.parent}')" class="back-btn">← Back to ${pages[page.parent].title}</button>` 
            : ''}
    `;
}

renderBreadcrumb();
renderContent();
