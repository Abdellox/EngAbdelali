// Load repair database
let guides = [];
let currentFilter = 'all';
let currentGuide = null;

// Initialize guides on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load repair database
    if (typeof repairDatabase !== 'undefined') {
        guides = repairDatabase;
    }
    displayGuides(guides);
});

// Display guides
function displayGuides(guidesToShow) {
    const guidesGrid = document.getElementById('guidesGrid');
    guidesGrid.innerHTML = '';
    
    guidesToShow.forEach(guide => {
        const guideCard = document.createElement('div');
        guideCard.className = 'guide-card';
        guideCard.onclick = () => openGuide(guide.id);
        
        guideCard.innerHTML = `
            <img src="${guide.image}" alt="${guide.title}">
            <div class="guide-content">
                <h3>${guide.title}</h3>
                <div class="guide-meta">
                    <span class="difficulty ${guide.difficulty}">${guide.difficulty}</span>
                    <span>⏱️ ${guide.time}</span>
                </div>
                <p>${guide.description}</p>
            </div>
        `;
        
        guidesGrid.appendChild(guideCard);
    });
}

// Filter guides
function filterGuides(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let filteredGuides = guides;
    
    if (filter !== 'all') {
        // Check if it's a difficulty filter or category filter
        if (['easy', 'moderate', 'difficult'].includes(filter)) {
            filteredGuides = guides.filter(guide => guide.difficulty === filter);
        } else {
            filteredGuides = guides.filter(guide => guide.category === filter);
        }
    }
    
    displayGuides(filteredGuides);
    
    // Scroll to guides section
    document.getElementById('guides').scrollIntoView({ behavior: 'smooth' });
}

// Search repairs with intelligent matching
function searchRepairs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchInput.trim() === '') {
        alert('Please enter what you want to fix');
        return;
    }
    
    // Intelligent search through title, description, keywords, and brand
    const searchResults = guides.filter(guide => {
        const searchableText = [
            guide.title,
            guide.description,
            guide.category,
            guide.brand || '',
            ...(guide.keywords || [])
        ].join(' ').toLowerCase();
        
        return searchableText.includes(searchInput);
    });
    
    displayGuides(searchResults);
    
    // Scroll to guides section
    document.getElementById('guides').scrollIntoView({ behavior: 'smooth' });
    
    // Show result count
    const guidesSection = document.querySelector('.guides h2');
    guidesSection.textContent = `Found ${searchResults.length} Repair Guide${searchResults.length !== 1 ? 's' : ''}`;
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchRepairs();
            }
        });
    }
});

// Open guide detail with full step-by-step instructions
function openGuide(guideId) {
    const guide = guides.find(g => g.id === guideId);
    if (!guide) return;
    
    currentGuide = guide;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'guide-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="closeGuideModal()">&times;</button>
            <div class="modal-header">
                <h1>${guide.title}</h1>
                <div class="guide-meta-detail">
                    <span class="difficulty ${guide.difficulty}">${guide.difficulty}</span>
                    <span>⏱️ ${guide.time}</span>
                    <span>🔧 ${guide.tools ? guide.tools.length : 0} tools needed</span>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="guide-overview">
                    <h2>Overview</h2>
                    <p>${guide.description}</p>
                    
                    ${guide.tools && guide.tools.length > 0 ? `
                        <div class="tools-needed">
                            <h3>🛠️ Tools Needed:</h3>
                            <ul>
                                ${guide.tools.map(tool => `<li>${tool}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${guide.parts && guide.parts.length > 0 ? `
                        <div class="parts-needed">
                            <h3>📦 Parts Needed:</h3>
                            <ul>
                                ${guide.parts.map(part => `<li>${part}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
                
                <div class="repair-steps">
                    <h2>Step-by-Step Instructions</h2>
                    ${guide.steps.map(step => `
                        <div class="step-card">
                            <div class="step-number">Step ${step.number}</div>
                            <h3>${step.title}</h3>
                            <p class="step-description">${step.description}</p>
                            
                            <div class="step-details">
                                <ol>
                                    ${step.details.map(detail => `<li>${detail}</li>`).join('')}
                                </ol>
                            </div>
                            
                            ${step.warning ? `
                                <div class="step-warning">
                                    <strong>⚠️ Warning:</strong> ${step.warning}
                                </div>
                            ` : ''}
                            
                            ${step.tip ? `
                                <div class="step-tip">
                                    <strong>💡 Tip:</strong> ${step.tip}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                
                ${guide.commonCauses ? `
                    <div class="common-causes">
                        <h2>Common Causes</h2>
                        <ul>
                            ${guide.commonCauses.map(cause => `<li>${cause}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${guide.preventionTips ? `
                    <div class="prevention-tips">
                        <h2>Prevention Tips</h2>
                        <ul>
                            ${guide.preventionTips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="guide-footer">
                    <button class="btn-primary" onclick="window.print()">🖨️ Print This Guide</button>
                    <button class="btn-secondary" onclick="closeGuideModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeGuideModal() {
    const modal = document.querySelector('.guide-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Search suggestions functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsDiv = document.getElementById('searchSuggestions');
    
    if (searchInput && suggestionsDiv) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                suggestionsDiv.innerHTML = '';
                suggestionsDiv.style.display = 'none';
                return;
            }
            
            // Find matching guides
            const matches = guides.filter(guide => {
                const searchableText = [
                    guide.title,
                    guide.description,
                    guide.brand || '',
                    ...(guide.keywords || [])
                ].join(' ').toLowerCase();
                
                return searchableText.includes(query);
            }).slice(0, 5); // Limit to 5 suggestions
            
            if (matches.length > 0) {
                suggestionsDiv.innerHTML = matches.map(guide => `
                    <div class="suggestion-item" onclick="selectSuggestion('${guide.title}')">
                        <strong>${guide.title}</strong>
                        <span class="suggestion-meta">${guide.difficulty} • ${guide.time}</span>
                    </div>
                `).join('');
                suggestionsDiv.style.display = 'block';
            } else {
                suggestionsDiv.innerHTML = '<div class="suggestion-item no-results">No guides found. Try different keywords.</div>';
                suggestionsDiv.style.display = 'block';
            }
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                suggestionsDiv.style.display = 'none';
            }
        });
    }
});

function selectSuggestion(title) {
    const searchInput = document.getElementById('searchInput');
    const suggestionsDiv = document.getElementById('searchSuggestions');
    
    searchInput.value = title;
    suggestionsDiv.style.display = 'none';
    searchRepairs();
}
