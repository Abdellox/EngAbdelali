// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeTheme();
    setupEventListeners();
    loadPageContent();
});

// Initialize localStorage with sample data if empty
function initializeApp() {
    if (!localStorage.getItem('jobs')) {
        const sampleJobs = [
            {
                id: 1,
                title: 'Full Stack Web Developer',
                company: 'TechCorp Inc.',
                description: 'Looking for an experienced full stack developer to build a modern web application using React and Node.js. Must have strong experience with RESTful APIs and database design.',
                category: 'Web Development',
                budget: 3500,
                experience: 'Intermediate',
                deadline: '2025-12-31',
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                postedDate: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Mobile App UI/UX Designer',
                company: 'Creative Studio',
                description: 'Need a talented designer to create beautiful and intuitive mobile app interfaces for iOS and Android. Experience with Figma is required.',
                category: 'Design',
                budget: 2000,
                experience: 'Expert',
                deadline: '2025-11-30',
                skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
                postedDate: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Content Writer for Tech Blog',
                company: 'Digital Media Co.',
                description: 'Seeking a skilled writer to create engaging technical content for our technology blog. SEO knowledge is a plus.',
                category: 'Writing',
                budget: 800,
                experience: 'Entry',
                deadline: '2025-12-15',
                skills: ['Technical Writing', 'SEO', 'Research'],
                postedDate: new Date().toISOString()
            },
            {
                id: 4,
                title: 'React Native Developer',
                company: 'StartupXYZ',
                description: 'Build a cross-platform mobile application for our e-commerce platform. Must have experience with payment integrations.',
                category: 'Mobile Development',
                budget: 5000,
                experience: 'Expert',
                deadline: '2026-01-15',
                skills: ['React Native', 'JavaScript', 'Redux', 'API Integration'],
                postedDate: new Date().toISOString()
            },
            {
                id: 5,
                title: 'Digital Marketing Specialist',
                company: 'Growth Agency',
                description: 'Help us create and execute digital marketing campaigns across social media platforms. Google Ads certification preferred.',
                category: 'Marketing',
                budget: 1500,
                experience: 'Intermediate',
                deadline: '2025-12-20',
                skills: ['Social Media', 'Google Ads', 'Analytics', 'Content Strategy'],
                postedDate: new Date().toISOString()
            },
            {
                id: 6,
                title: 'Data Analyst for ML Project',
                company: 'AI Solutions',
                description: 'Analyze large datasets and build predictive models for our machine learning project. Python and TensorFlow experience required.',
                category: 'Data Science',
                budget: 4000,
                experience: 'Expert',
                deadline: '2026-02-01',
                skills: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
                postedDate: new Date().toISOString()
            }
        ];
        localStorage.setItem('jobs', JSON.stringify(sampleJobs));
    }

    if (!localStorage.getItem('profile')) {
        const defaultProfile = {
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Freelancer',
            skills: 'JavaScript, React, Node.js',
            bio: 'Passionate developer with 5 years of experience.'
        };
        localStorage.setItem('profile', JSON.stringify(defaultProfile));
    }

    if (!localStorage.getItem('applications')) {
        localStorage.setItem('applications', JSON.stringify([]));
    }

    if (!localStorage.getItem('bookmarkedJobs')) {
        localStorage.setItem('bookmarkedJobs', JSON.stringify([]));
    }
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showToast(newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled', 'success');
}

// Update theme icon
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }

    // Post job form
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', handlePostJob);
    }

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Apply form
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', handleJobApplication);
    }

    // Search and filters
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterJobs);
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') filterJobs();
        });
    }

    const categoryFilter = document.getElementById('categoryFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterJobs);
    if (budgetFilter) budgetFilter.addEventListener('change', filterJobs);
    if (experienceFilter) experienceFilter.addEventListener('change', filterJobs);
    if (sortFilter) sortFilter.addEventListener('change', filterJobs);

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }

    // Modal close
    const modal = document.getElementById('applyModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Load page-specific content
function loadPageContent() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);

    if (page === 'index.html' || page === '') {
        loadFeaturedJobs();
    } else if (page === 'jobs.html') {
        loadAllJobs();
    } else if (page === 'profile.html') {
        loadProfile();
        loadUserActivity();
    } else if (page === 'job-details.html') {
        loadJobDetails();
    }
}

// Load featured jobs on home page
function loadFeaturedJobs() {
    const grid = document.getElementById('featuredJobsGrid');
    if (!grid) return;

    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const featuredJobs = jobs.slice(0, 6);

    grid.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
}

// Load all jobs on jobs page
function loadAllJobs() {
    const grid = document.getElementById('jobsGrid');
    if (!grid) return;

    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    displayJobs(jobs);
}

// Display jobs
function displayJobs(jobs) {
    const grid = document.getElementById('jobsGrid');
    const noResults = document.getElementById('noResults');
    
    if (jobs.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        grid.innerHTML = jobs.map(job => createJobCard(job)).join('');
    }
}

// Create job card HTML
function createJobCard(job) {
    const skillsHTML = job.skills ? job.skills.slice(0, 3).map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('') : '';

    const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    const isBookmarked = bookmarkedJobs.includes(job.id);

    return `
        <div class="job-card fade-in" onclick="viewJobDetails(${job.id})">
            <button class="bookmark-icon ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="event.stopPropagation(); toggleBookmark(${job.id})" 
                    data-job-id="${job.id}">
                ${isBookmarked ? '❤️' : '🤍'}
            </button>
            <div class="job-card-header">
                <div>
                    <h3>${job.title}</h3>
                    <p class="company">${job.company}</p>
                </div>
                <span class="job-badge">${job.category}</span>
            </div>
            <p>${job.description.substring(0, 120)}...</p>
            <div class="job-skills">
                ${skillsHTML}
            </div>
            <div class="job-card-footer">
                <span class="job-budget">$${job.budget}</span>
                <button class="btn btn-primary apply-btn" onclick="event.stopPropagation(); openApplyModal(${job.id})">Apply</button>
            </div>
        </div>
    `;
}

// View job details
function viewJobDetails(jobId) {
    window.location.href = `job-details.html?id=${jobId}`;
}

// Toggle bookmark
function toggleBookmark(jobId) {
    let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    
    if (bookmarkedJobs.includes(jobId)) {
        bookmarkedJobs = bookmarkedJobs.filter(id => id !== jobId);
        showToast('Job removed from saved', 'success');
    } else {
        bookmarkedJobs.push(jobId);
        showToast('Job saved!', 'success');
    }
    
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    
    // Update UI
    const bookmarkBtn = document.querySelector(`[data-job-id="${jobId}"]`);
    if (bookmarkBtn) {
        const isBookmarked = bookmarkedJobs.includes(jobId);
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
        bookmarkBtn.textContent = isBookmarked ? '❤️' : '🤍';
    }
}

// Open apply modal
function openApplyModal(jobId) {
    const modal = document.getElementById('applyModal');
    const jobIdInput = document.getElementById('applyJobId');
    
    if (modal && jobIdInput) {
        jobIdInput.value = jobId;
        modal.style.display = 'block';
        
        // Pre-fill with profile data
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        document.getElementById('applicantName').value = profile.name || '';
        document.getElementById('applicantEmail').value = profile.email || '';
    }
}

// Handle job application
function handleJobApplication(e) {
    e.preventDefault();
    
    const jobId = document.getElementById('applyJobId').value;
    const application = {
        jobId: parseInt(jobId),
        name: document.getElementById('applicantName').value,
        email: document.getElementById('applicantEmail').value,
        coverLetter: document.getElementById('coverLetter').value,
        proposedRate: document.getElementById('proposedRate').value,
        appliedDate: new Date().toISOString()
    };

    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Close modal and show success
    document.getElementById('applyModal').style.display = 'none';
    showToast('Application submitted successfully!', 'success');
    
    // Reset form
    document.getElementById('applyForm').reset();
}

// Handle post job
function handlePostJob(e) {
    e.preventDefault();
    
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const newJob = {
        id: Date.now(),
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        category: document.getElementById('jobCategory').value,
        description: document.getElementById('jobDescription').value,
        budget: parseInt(document.getElementById('jobBudget').value),
        experience: document.getElementById('experienceLevel').value,
        deadline: document.getElementById('jobDeadline').value,
        skills: document.getElementById('jobSkills').value.split(',').map(s => s.trim()),
        postedDate: new Date().toISOString()
    };

    jobs.unshift(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    // Show success message
    document.getElementById('postJobForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    showToast('Job posted successfully!', 'success');
}

// Filter jobs
function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const budgetRange = document.getElementById('budgetFilter').value;
    const experience = document.getElementById('experienceFilter').value;
    const sortBy = document.getElementById('sortFilter')?.value || 'newest';

    let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');

    // Apply filters
    jobs = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || job.category === category;
        const matchesExperience = !experience || job.experience === experience;
        
        let matchesBudget = true;
        if (budgetRange) {
            if (budgetRange === '0-500') matchesBudget = job.budget <= 500;
            else if (budgetRange === '500-1000') matchesBudget = job.budget > 500 && job.budget <= 1000;
            else if (budgetRange === '1000-5000') matchesBudget = job.budget > 1000 && job.budget <= 5000;
            else if (budgetRange === '5000+') matchesBudget = job.budget > 5000;
        }

        return matchesSearch && matchesCategory && matchesExperience && matchesBudget;
    });

    // Apply sorting
    jobs = sortJobs(jobs, sortBy);

    displayJobs(jobs);
}

// Sort jobs
function sortJobs(jobs, sortBy) {
    switch(sortBy) {
        case 'newest':
            return jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        case 'oldest':
            return jobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        case 'budget-high':
            return jobs.sort((a, b) => b.budget - a.budget);
        case 'budget-low':
            return jobs.sort((a, b) => a.budget - b.budget);
        default:
            return jobs;
    }
}

// Clear filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('budgetFilter').value = '';
    document.getElementById('experienceFilter').value = '';
    if (document.getElementById('sortFilter')) {
        document.getElementById('sortFilter').value = 'newest';
    }
    filterJobs();
    showToast('Filters cleared', 'success');
}

// Load profile
function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    
    document.getElementById('profileName').value = profile.name || '';
    document.getElementById('profileEmail').value = profile.email || '';
    document.getElementById('profileRole').value = profile.role || 'Freelancer';
    document.getElementById('profileSkills').value = profile.skills || '';
    document.getElementById('profileBio').value = profile.bio || '';
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const profile = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        role: document.getElementById('profileRole').value,
        skills: document.getElementById('profileSkills').value,
        bio: document.getElementById('profileBio').value
    };

    localStorage.setItem('profile', JSON.stringify(profile));
    
    showToast('Profile updated successfully!', 'success');
}

// Load user activity
function loadUserActivity() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    // Posted jobs (last 5)
    const postedJobsContainer = document.getElementById('postedJobs');
    if (postedJobsContainer) {
        const recentJobs = jobs.slice(0, 5);
        if (recentJobs.length === 0) {
            postedJobsContainer.innerHTML = '<p style="color: var(--text-light);">No jobs posted yet.</p>';
        } else {
            postedJobsContainer.innerHTML = recentJobs.map(job => `
                <div class="activity-item">
                    <h4>${job.title}</h4>
                    <p>Budget: $${job.budget} • ${job.category}</p>
                </div>
            `).join('');
        }
    }

    // Applied jobs
    const appliedJobsContainer = document.getElementById('appliedJobs');
    if (appliedJobsContainer) {
        if (applications.length === 0) {
            appliedJobsContainer.innerHTML = '<p style="color: var(--text-light);">No applications submitted yet.</p>';
        } else {
            appliedJobsContainer.innerHTML = applications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return `
                    <div class="activity-item">
                        <h4>${job ? job.title : 'Job not found'}</h4>
                        <p>Proposed Rate: $${app.proposedRate}</p>
                    </div>
                `;
            }).join('');
        }
    }
}

// Load job details page
function loadJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'));
    
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const job = jobs.find(j => j.id === jobId);
    
    const container = document.getElementById('jobDetailsContainer');
    
    if (!job) {
        container.innerHTML = '<p>Job not found.</p>';
        return;
    }

    const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    const isBookmarked = bookmarkedJobs.includes(job.id);

    const skillsHTML = job.skills ? job.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('') : '';

    container.innerHTML = `
        <div class="job-details-header">
            <h1 class="job-details-title">${job.title}</h1>
            <div class="job-details-meta">
                <div class="meta-item">
                    <strong>Company:</strong> ${job.company}
                </div>
                <div class="meta-item">
                    <strong>Category:</strong> ${job.category}
                </div>
                <div class="meta-item">
                    <strong>Experience:</strong> ${job.experience}
                </div>
                <div class="meta-item">
                    <strong>Deadline:</strong> ${new Date(job.deadline).toLocaleDateString()}
                </div>
            </div>
            <div class="job-details-actions">
                <button class="btn btn-primary btn-large" onclick="openApplyModal(${job.id})">Apply Now</button>
                <button class="btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                        onclick="toggleBookmark(${job.id}); location.reload();">
                    ${isBookmarked ? '❤️ Saved' : '🤍 Save Job'}
                </button>
            </div>
        </div>
        
        <div class="job-details-body">
            <h2 class="job-details-section-title">Job Description</h2>
            <p class="job-details-description">${job.description}</p>
            
            <h2 class="job-details-section-title">Required Skills</h2>
            <div class="job-details-skills">
                ${skillsHTML}
            </div>
            
            <div class="job-details-budget">
                <h3>Budget</h3>
                <div class="budget-amount">$${job.budget.toLocaleString()}</div>
                <p style="color: var(--text-light); margin-top: 0.5rem;">Fixed price project</p>
            </div>
        </div>
    `;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
