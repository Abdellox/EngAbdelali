// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';
const API_URL = 'https://api.unsplash.com';
const DEMO_MODE = true;

let currentCategory = 'nature';

document.addEventListener('DOMContentLoaded', () => {
    loadWallpapers(currentCategory);
    setupEventListeners();
});

function setupEventListeners() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            loadWallpapers(currentCategory);
        });
    });

    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.trim();
        if (query) loadWallpapers(query);
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) loadWallpapers(query);
        }
    });

    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') closeModal();
    });
}

async function loadWallpapers(query) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<div class="loading">Loading amazing wallpapers...</div>';

    try {
        let images;
        if (DEMO_MODE || !UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
            images = getDemoImages(query);
        } else {
            const response = await fetch(`${API_URL}/search/photos?query=${query}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`);
            const data = await response.json();
            images = data.results;
        }
        displayWallpapers(images);
    } catch (error) {
        gallery.innerHTML = '<div class="loading">Error loading wallpapers. Using demo images...</div>';
        setTimeout(() => displayWallpapers(getDemoImages(query)), 1000);
    }
}

function getDemoImages(category) {
    const imageLibrary = {
        nature: [
            { id: 'n1', urls: { regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain landscape' },
            { id: 'n2', urls: { regular: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', full: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Forest path' },
            { id: 'n3', urls: { regular: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', full: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Nature landscape' },
            { id: 'n4', urls: { regular: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800', full: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Green forest' },
            { id: 'n5', urls: { regular: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800', full: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Sunset nature' },
            { id: 'n6', urls: { regular: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', full: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Nature view' },
            { id: 'n7', urls: { regular: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800', full: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Flower field' },
            { id: 'n8', urls: { regular: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800', full: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Flower close-up' },
            { id: 'n9', urls: { regular: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', full: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Lake view' }
        ],
        space: [
            { id: 's1', urls: { regular: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800', full: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Milky way' },
            { id: 's2', urls: { regular: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800', full: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Night sky' },
            { id: 's3', urls: { regular: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800', full: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Stars' },
            { id: 's4', urls: { regular: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800', full: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Galaxy' },
            { id: 's5', urls: { regular: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800', full: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Cosmos' },
            { id: 's6', urls: { regular: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800', full: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Space nebula' },
            { id: 's7', urls: { regular: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800', full: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Rocket launch' },
            { id: 's8', urls: { regular: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800', full: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Astronaut' },
            { id: 's9', urls: { regular: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', full: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Earth from space' }
        ],
        abstract: [
            { id: 'a1', urls: { regular: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800', full: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Abstract art' },
            { id: 'a2', urls: { regular: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800', full: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Colorful abstract' },
            { id: 'a3', urls: { regular: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800', full: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Abstract pattern' },
            { id: 'a4', urls: { regular: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800', full: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Geometric abstract' },
            { id: 'a5', urls: { regular: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800', full: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Abstract waves' },
            { id: 'a6', urls: { regular: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800', full: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fluid art' },
            { id: 'a7', urls: { regular: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', full: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Abstract shapes' },
            { id: 'a8', urls: { regular: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800', full: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Gradient abstract' },
            { id: 'a9', urls: { regular: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=800', full: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Modern abstract' }
        ],
        city: [
            { id: 'c1', urls: { regular: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', full: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'City skyline' },
            { id: 'c2', urls: { regular: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', full: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Urban landscape' },
            { id: 'c3', urls: { regular: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800', full: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Night city' },
            { id: 'c4', urls: { regular: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', full: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'City lights' },
            { id: 'c5', urls: { regular: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800', full: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Downtown' },
            { id: 'c6', urls: { regular: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800', full: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Skyscrapers' },
            { id: 'c7', urls: { regular: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800', full: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'City street' },
            { id: 'c8', urls: { regular: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800', full: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'London city' },
            { id: 'c9', urls: { regular: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800', full: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tokyo city' }
        ],
        minimal: [
            { id: 'm1', urls: { regular: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800', full: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Minimal design' },
            { id: 'm2', urls: { regular: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800', full: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Simple minimal' },
            { id: 'm3', urls: { regular: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=800', full: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Clean minimal' },
            { id: 'm4', urls: { regular: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800', full: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'White minimal' },
            { id: 'm5', urls: { regular: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800', full: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Minimalist art' },
            { id: 'm6', urls: { regular: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800', full: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Minimal background' },
            { id: 'm7', urls: { regular: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800', full: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Pastel minimal' },
            { id: 'm8', urls: { regular: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800', full: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Soft minimal' },
            { id: 'm9', urls: { regular: 'https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?w=800', full: 'https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Elegant minimal' }
        ],
        ocean: [
            { id: 'o1', urls: { regular: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', full: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Ocean waves' },
            { id: 'o2', urls: { regular: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800', full: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Beach sunset' },
            { id: 'o3', urls: { regular: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', full: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tropical beach' },
            { id: 'o4', urls: { regular: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', full: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Blue ocean' },
            { id: 'o5', urls: { regular: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800', full: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Ocean view' },
            { id: 'o6', urls: { regular: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800', full: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Seascape' },
            { id: 'o7', urls: { regular: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800', full: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Underwater' },
            { id: 'o8', urls: { regular: 'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=800', full: 'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Coral reef' },
            { id: 'o9', urls: { regular: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', full: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Ocean horizon' }
        ],
        mountains: [
            { id: 'mt1', urls: { regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain peaks' },
            { id: 'mt2', urls: { regular: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', full: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Snow mountains' },
            { id: 'mt3', urls: { regular: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800', full: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain range' },
            { id: 'mt4', urls: { regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Alpine view' },
            { id: 'mt5', urls: { regular: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800', full: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain lake' },
            { id: 'mt6', urls: { regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Rocky mountains' },
            { id: 'mt7', urls: { regular: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800', full: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain sunset' },
            { id: 'mt8', urls: { regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain valley' },
            { id: 'mt9', urls: { regular: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800', full: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain hiking' }
        ],
        coding: [
            { id: 'cd1', urls: { regular: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', full: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Code on screen' },
            { id: 'cd2', urls: { regular: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800', full: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Programming' },
            { id: 'cd3', urls: { regular: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', full: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Developer workspace' },
            { id: 'cd4', urls: { regular: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', full: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Laptop coding' },
            { id: 'cd5', urls: { regular: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800', full: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Code editor' },
            { id: 'cd6', urls: { regular: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', full: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'MacBook coding' },
            { id: 'cd7', urls: { regular: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800', full: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Code syntax' },
            { id: 'cd8', urls: { regular: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800', full: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Developer setup' },
            { id: 'cd9', urls: { regular: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800', full: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tech workspace' }
        ],
        sports: [
            { id: 'sp1', urls: { regular: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', full: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Sports action' },
            { id: 'sp2', urls: { regular: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', full: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Basketball' },
            { id: 'sp3', urls: { regular: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800', full: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Football' },
            { id: 'sp4', urls: { regular: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800', full: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Running' },
            { id: 'sp5', urls: { regular: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800', full: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Cycling' },
            { id: 'sp6', urls: { regular: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800', full: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tennis' },
            { id: 'sp7', urls: { regular: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800', full: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Gym workout' },
            { id: 'sp8', urls: { regular: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', full: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Skateboarding' },
            { id: 'sp9', urls: { regular: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800', full: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Surfing' }
        ],
        fashion: [
            { id: 'f1', urls: { regular: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', full: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion style' },
            { id: 'f2', urls: { regular: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800', full: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion clothing' },
            { id: 'f3', urls: { regular: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', full: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion model' },
            { id: 'f4', urls: { regular: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c85?w=800', full: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c85?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Streetwear' },
            { id: 'f5', urls: { regular: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800', full: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion accessories' },
            { id: 'f6', urls: { regular: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', full: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion shoes' },
            { id: 'f7', urls: { regular: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800', full: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion boutique' },
            { id: 'f8', urls: { regular: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800', full: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion portrait' },
            { id: 'f9', urls: { regular: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800', full: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fashion design' }
        ],
        cars: [
            { id: 'cr1', urls: { regular: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', full: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Sports car' },
            { id: 'cr2', urls: { regular: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', full: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Luxury car' },
            { id: 'cr3', urls: { regular: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800', full: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Classic car' },
            { id: 'cr4', urls: { regular: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', full: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Ferrari' },
            { id: 'cr5', urls: { regular: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800', full: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Porsche' },
            { id: 'cr6', urls: { regular: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=800', full: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'BMW' },
            { id: 'cr7', urls: { regular: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', full: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tesla' },
            { id: 'cr8', urls: { regular: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', full: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Lamborghini' },
            { id: 'cr9', urls: { regular: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800', full: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mercedes' }
        ],
        motorcycles: [
            { id: 'mc1', urls: { regular: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', full: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Sport bike' },
            { id: 'mc2', urls: { regular: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800', full: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Motorcycle' },
            { id: 'mc3', urls: { regular: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800', full: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Harley Davidson' },
            { id: 'mc4', urls: { regular: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800', full: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Cruiser bike' },
            { id: 'mc5', urls: { regular: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Racing bike' },
            { id: 'mc6', urls: { regular: 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=800', full: 'https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Vintage motorcycle' },
            { id: 'mc7', urls: { regular: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800', full: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Superbike' },
            { id: 'mc8', urls: { regular: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Kawasaki' },
            { id: 'mc9', urls: { regular: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800', full: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Yamaha' }
        ],
        animals: [
            { id: 'an1', urls: { regular: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800', full: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Wildlife' },
            { id: 'an2', urls: { regular: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800', full: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Lion' },
            { id: 'an3', urls: { regular: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800', full: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fox' },
            { id: 'an4', urls: { regular: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800', full: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Elephant' },
            { id: 'an5', urls: { regular: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800', full: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tiger' },
            { id: 'an6', urls: { regular: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800', full: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Panda' },
            { id: 'an7', urls: { regular: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800', full: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Giraffe' },
            { id: 'an8', urls: { regular: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800', full: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Deer' },
            { id: 'an9', urls: { regular: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800', full: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Wolf' }
        ],
        food: [
            { id: 'fd1', urls: { regular: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', full: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Gourmet food' },
            { id: 'fd2', urls: { regular: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', full: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Pizza' },
            { id: 'fd3', urls: { regular: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', full: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Salad' },
            { id: 'fd4', urls: { regular: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', full: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Burger' },
            { id: 'fd5', urls: { regular: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800', full: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Pancakes' },
            { id: 'fd6', urls: { regular: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800', full: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Sushi' },
            { id: 'fd7', urls: { regular: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', full: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Dessert' },
            { id: 'fd8', urls: { regular: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', full: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Pasta' },
            { id: 'fd9', urls: { regular: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800', full: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Burger meal' }
        ],
        architecture: [
            { id: 'ar1', urls: { regular: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800', full: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Modern architecture' },
            { id: 'ar2', urls: { regular: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800', full: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Building design' },
            { id: 'ar3', urls: { regular: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800', full: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Skyscraper' },
            { id: 'ar4', urls: { regular: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800', full: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Glass building' },
            { id: 'ar5', urls: { regular: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', full: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Modern house' },
            { id: 'ar6', urls: { regular: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', full: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'City architecture' },
            { id: 'ar7', urls: { regular: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800', full: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Bridge architecture' },
            { id: 'ar8', urls: { regular: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800', full: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Interior design' },
            { id: 'ar9', urls: { regular: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800', full: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Architectural detail' }
        ],
        travel: [
            { id: 'tr1', urls: { regular: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', full: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Travel destination' },
            { id: 'tr2', urls: { regular: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800', full: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Lake travel' },
            { id: 'tr3', urls: { regular: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800', full: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Paris' },
            { id: 'tr4', urls: { regular: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800', full: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'London' },
            { id: 'tr5', urls: { regular: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', full: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Paris Eiffel' },
            { id: 'tr6', urls: { regular: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800', full: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Beach travel' },
            { id: 'tr7', urls: { regular: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800', full: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Mountain travel' },
            { id: 'tr8', urls: { regular: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', full: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Road trip' },
            { id: 'tr9', urls: { regular: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', full: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Adventure travel' }
        ],
        technology: [
            { id: 'tc1', urls: { regular: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', full: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Technology' },
            { id: 'tc2', urls: { regular: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', full: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tech gadgets' },
            { id: 'tc3', urls: { regular: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', full: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Workspace tech' },
            { id: 'tc4', urls: { regular: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800', full: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Laptop tech' },
            { id: 'tc5', urls: { regular: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', full: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Digital tech' },
            { id: 'tc6', urls: { regular: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800', full: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'MacBook' },
            { id: 'tc7', urls: { regular: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800', full: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Computer setup' },
            { id: 'tc8', urls: { regular: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', full: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Laptop workspace' },
            { id: 'tc9', urls: { regular: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', full: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Tech desk' }
        ],
        fitness: [
            { id: 'ft1', urls: { regular: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', full: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Gym fitness' },
            { id: 'ft2', urls: { regular: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', full: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Workout' },
            { id: 'ft3', urls: { regular: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', full: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Gym equipment' },
            { id: 'ft4', urls: { regular: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800', full: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Yoga' },
            { id: 'ft5', urls: { regular: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', full: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Running fitness' },
            { id: 'ft6', urls: { regular: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800', full: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Crossfit' },
            { id: 'ft7', urls: { regular: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800', full: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Weights' },
            { id: 'ft8', urls: { regular: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800', full: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Training' },
            { id: 'ft9', urls: { regular: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800', full: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1920' }, user: { name: 'Unsplash' }, alt_description: 'Fitness motivation' }
        ]
    };

    return imageLibrary[category] || imageLibrary.nature;
}

function displayWallpapers(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const card = document.createElement('div');
        card.className = 'wallpaper-card';
        card.innerHTML = `
            <img src="${image.urls.regular}" alt="${image.alt_description || 'Wallpaper'}" loading="lazy">
            <div class="wallpaper-info">
                <p>Photo by ${image.user.name}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(image));
        gallery.appendChild(card);
    });
}

function openModal(image) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalPhotographer = document.getElementById('modalPhotographer');
    const downloadBtn = document.getElementById('downloadBtn');
    const setWallpaperBtn = document.getElementById('setWallpaperBtn');

    modalImage.src = image.urls.regular;
    modalPhotographer.textContent = `Photo by ${image.user.name}`;
    downloadBtn.href = image.urls.full;
    downloadBtn.download = `wallpaper-${image.id}.jpg`;

    setWallpaperBtn.onclick = () => {
        document.body.style.backgroundImage = `url(${image.urls.full})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        alert('Preview set! This changes the website background. To set as desktop wallpaper, download the image and set it through your system settings.');
    };

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}
