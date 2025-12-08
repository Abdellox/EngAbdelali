// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Search Toggle
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');

if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
    });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Featured Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('sliderDots');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function createDots() {
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
            dotsContainer.appendChild(dot);
        });
    }
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });
}

// Auto-advance slider
if (slides.length > 0) {
    createDots();
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        newsletterForm.reset();
    });
}

// Search Form
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchForm.querySelector('.search-input').value;
        alert(`Searching for: ${query}`);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============ NEW ADVANCED FEATURES ============

// 1. Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const article = document.querySelector('.article-content');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const progress = ((scrolled - articleTop + windowHeight) / articleHeight) * 100;
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        
        progressBar.style.width = clampedProgress + '%';
    });
}

// 2. Bookmark/Save Feature
function initBookmarks() {
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    const savedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');

    bookmarkBtns.forEach(btn => {
        const postId = btn.dataset.postId;
        
        // Check if already bookmarked
        if (savedPosts.includes(postId)) {
            btn.classList.add('bookmarked');
            btn.innerHTML = '<i class="fas fa-bookmark"></i>';
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = btn.dataset.postId;
            let bookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');

            if (bookmarks.includes(postId)) {
                bookmarks = bookmarks.filter(id => id !== postId);
                btn.classList.remove('bookmarked');
                btn.innerHTML = '<i class="far fa-bookmark"></i>';
            } else {
                bookmarks.push(postId);
                btn.classList.add('bookmarked');
                btn.innerHTML = '<i class="fas fa-bookmark"></i>';
            }

            localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarks));
        });
    });
}

// 3. Reactions/Claps System
function initReactions() {
    const reactionBtns = document.querySelectorAll('.reaction-btn');

    reactionBtns.forEach(btn => {
        const postId = btn.dataset.postId;
        const countSpan = btn.querySelector('.reaction-count');
        const storageKey = `reactions_${postId}`;
        
        // Load saved reactions
        const savedReactions = parseInt(localStorage.getItem(storageKey) || '0');
        if (savedReactions > 0) {
            countSpan.textContent = savedReactions;
            btn.classList.add('reacted');
        }

        btn.addEventListener('click', () => {
            let count = parseInt(countSpan.textContent || '0');
            count++;
            countSpan.textContent = count;
            btn.classList.add('reacted');
            
            // Animate
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);

            localStorage.setItem(storageKey, count.toString());
        });
    });
}

// 4. Copy Code Button
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block.parentNode);
        wrapper.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
            const code = block.textContent;
            await navigator.clipboard.writeText(code);
            
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
}

// 5. Table of Contents Generator
function initTableOfContents() {
    const tocContainer = document.querySelector('.table-of-contents');
    if (!tocContainer) return;

    const article = document.querySelector('.article-content');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        li.className = heading.tagName === 'H3' ? 'toc-sub-item' : 'toc-item';
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth' });
        });

        li.appendChild(link);
        tocList.appendChild(li);
    });

    tocContainer.appendChild(tocList);

    // Highlight active section
    window.addEventListener('scroll', () => {
        let current = '';
        headings.forEach(heading => {
            const sectionTop = heading.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = heading.id;
            }
        });

        tocList.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 6. Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 7. Share with Native API
function initShareButtons() {
    const shareBtn = document.querySelector('.share-native-btn');
    if (!shareBtn) return;

    if (navigator.share) {
        shareBtn.style.display = 'inline-flex';
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.title,
                    text: document.querySelector('meta[name="description"]')?.content || '',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        });
    }
}

// 8. Reading Time Calculator
function calculateReadingTime() {
    const article = document.querySelector('.article-content');
    if (!article) return;

    const text = article.textContent;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    const timeElements = document.querySelectorAll('.reading-time');
    timeElements.forEach(el => {
        el.textContent = `${readingTime} min read`;
    });
}

// 9. Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 10. View Counter
function initViewCounter() {
    const viewCounters = document.querySelectorAll('.view-count');
    
    viewCounters.forEach(counter => {
        const postId = counter.dataset.postId;
        const storageKey = `views_${postId}`;
        
        let views = parseInt(localStorage.getItem(storageKey) || '0');
        views++;
        
        localStorage.setItem(storageKey, views.toString());
        counter.textContent = views.toLocaleString();
    });
}

// 11. Follow Author Button
function initFollowButtons() {
    const followBtns = document.querySelectorAll('.follow-btn');
    const following = JSON.parse(localStorage.getItem('followingAuthors') || '[]');

    followBtns.forEach(btn => {
        const authorId = btn.dataset.authorId;
        
        if (following.includes(authorId)) {
            btn.textContent = 'Following';
            btn.classList.add('following');
        }

        btn.addEventListener('click', () => {
            let followList = JSON.parse(localStorage.getItem('followingAuthors') || '[]');
            
            if (followList.includes(authorId)) {
                followList = followList.filter(id => id !== authorId);
                btn.textContent = 'Follow';
                btn.classList.remove('following');
            } else {
                followList.push(authorId);
                btn.textContent = 'Following';
                btn.classList.add('following');
            }

            localStorage.setItem('followingAuthors', JSON.stringify(followList));
        });
    });
}

// 12. Copy Link Button
function initCopyLink() {
    const copyLinkBtns = document.querySelectorAll('.copy-link-btn');
    
    copyLinkBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            await navigator.clipboard.writeText(window.location.href);
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        });
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initReadingProgress();
    initBookmarks();
    initReactions();
    initCodeCopy();
    initTableOfContents();
    initLazyLoading();
    initShareButtons();
    calculateReadingTime();
    initScrollToTop();
    initViewCounter();
    initFollowButtons();
    initCopyLink();
});
