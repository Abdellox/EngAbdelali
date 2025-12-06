/**
 * ═══════════════════════════════════════════════════════════════════════
 * Portfolio Website - Abdel Ali - Dynamic Version
 * Copyright © 2025 Abdel Ali. All Rights Reserved.
 * ═══════════════════════════════════════════════════════════════════════
 */

console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c📧 Interested in my work? Let\'s connect!', 'font-size: 14px; color: #64748b;');
console.log('%c⚖️  This code is copyrighted. Please respect intellectual property.', 'font-size: 12px; color: #ef4444;');
console.log('%c🔗 Contact: abdel.ali@example.com', 'font-size: 12px; color: #10b981;');

// ===================================
// Navigation Functionality
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('mobile-active');
  
  const isExpanded = hamburger.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('mobile-active');
    hamburger.setAttribute('aria-expanded', 'false');
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      // Smooth scroll with easing
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Add a subtle highlight effect to the target section
      targetSection.style.transition = 'background-color 0.6s ease';
      const originalBg = window.getComputedStyle(targetSection).backgroundColor;
      targetSection.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
      setTimeout(() => {
        targetSection.style.backgroundColor = originalBg;
      }, 600);
    }
  });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
  const scrollY = window.pageYOffset;
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      correspondingLink?.classList.add('active');
    } else {
      correspondingLink?.classList.remove('active');
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', debounce(highlightActiveLink, 100));
highlightActiveLink();

// ===================================
// Typewriter Effect with Dynamic Descriptions
// ===================================

const typewriterElement = document.getElementById('typewriter');
const heroSubtitle = document.getElementById('heroSubtitle');
const heroButtons = document.getElementById('heroButtons');

const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'Problem Solver',
  'Code Enthusiast',
  'Tech Innovator'
];

const descriptions = [
  'I build clean, efficient code that powers seamless digital experiences. Modern technologies meet reliable, scalable solutions in every project.',
  'From intuitive interfaces to robust back-end systems, I deliver full-stack excellence. Every line of code is written with performance, security, and future-proofing in mind.',
  'I transform complex problems into simple, elegant software solutions. Your ideas become reliable applications built to grow with your needs.',
  'I focus on creating applications that are fast, responsive, and user-friendly. Quality and maintainability are at the core of everything I develop.',
  'I combine creativity and logic to deliver technology that works for you. Transparent communication and consistent results are my commitment.',
  'I leverage modern frameworks and best practices to build scalable apps. Each project is crafted with precision, care, and attention to detail.',
  'I bring vision to life with clean, structured, and efficient code. Trust me to turn your concepts into secure, high-performing software.',
  'I build exceptional digital experiences with clean code and modern technologies. Turning complex challenges into elegant solutions is what I do best.'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 200;
let descriptionIndex = 0;
let firstCycleComplete = false;

// Randomly select initial description
descriptionIndex = Math.floor(Math.random() * descriptions.length);
heroSubtitle.textContent = descriptions[descriptionIndex];

function typeWriter() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    // Deleting characters
    const text = currentRole.substring(0, charIndex - 1);
    typewriterElement.innerHTML = text.split('').map((char, i) => 
      `<span class="fire-char" style="animation-delay: ${i * 0.05}s">${char}</span>`
    ).join('');
    charIndex--;
    typewriterDelay = 100;
  } else {
    // Typing characters
    const text = currentRole.substring(0, charIndex + 1);
    typewriterElement.innerHTML = text.split('').map((char, i) => 
      `<span class="fire-char ${i === charIndex ? 'fire-new' : ''}" style="animation-delay: ${i * 0.05}s">${char}</span>`
    ).join('');
    charIndex++;
    typewriterDelay = 150;
  }
  
  // When word is complete
  if (!isDeleting && charIndex === currentRole.length) {
    // Pause at end of word
    typewriterDelay = 2000;
    isDeleting = true;
    
    // Show subtitle and buttons after first word is complete
    if (!firstCycleComplete) {
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroButtons.style.opacity = '1';
        firstCycleComplete = true;
      }, 500);
    }
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typewriterDelay = 500;
    
    // Change description when cycling through roles
    if (firstCycleComplete) {
      changeDescription();
    }
  }
  
  setTimeout(typeWriter, typewriterDelay);
}

// Function to smoothly change description
function changeDescription() {
  // Fade out
  heroSubtitle.style.opacity = '0';
  
  setTimeout(() => {
    // Get random description different from current
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * descriptions.length);
    } while (newIndex === descriptionIndex && descriptions.length > 1);
    
    descriptionIndex = newIndex;
    heroSubtitle.textContent = descriptions[descriptionIndex];
    
    // Fade in
    heroSubtitle.style.opacity = '1';
  }, 400);
}

// Start typewriter effect after a short delay
setTimeout(() => {
  typeWriter();
}, 500);

// ===================================
// Hero Parallax Effect
// ===================================

const hero = document.querySelector('.hero');

function parallaxEffect() {
  if (!hero) return;
  
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
}

let ticking = false;

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      parallaxEffect();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);

// ===================================
// Intersection Observer for Scroll Animations
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(item);
});

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
  observer.observe(card);
});

// Observe testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
  observer.observe(card);
});

// ===================================
// Dynamic Data Loading
// ===================================

function getProjects() {
  return JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
}

function getTestimonials() {
  return JSON.parse(localStorage.getItem('portfolioTestimonials') || '[]');
}

function getExperience() {
  return JSON.parse(localStorage.getItem('portfolioExperience') || '[]');
}

function getSkills() {
  return JSON.parse(localStorage.getItem('portfolioSkills') || '[]');
}

function getServices() {
  return JSON.parse(localStorage.getItem('portfolioServices') || '[]');
}

// ===================================
// Generate Services Section
// ===================================

function generateServices() {
  const services = getServices();
  const grid = document.querySelector('.services-grid');
  
  if (!grid) return;
  
  if (services.length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: white; grid-column: 1/-1;">No services added yet. Add from admin dashboard.</p>';
    return;
  }
  
  grid.innerHTML = services.map(service => `
    <div class="service-card">
      <div class="service-icon">${service.icon}</div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-description">${service.description}</p>
      <ul class="service-features">
        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ===================================
// Generate Experience Section
// ===================================

function generateExperience() {
  const experience = getExperience();
  const timeline = document.querySelector('.timeline');
  
  if (!timeline) return;
  
  if (experience.length === 0) {
    timeline.innerHTML = '<p style="text-align: center; color: #64748b;">No experience added yet. Add from admin dashboard.</p>';
    return;
  }
  
  timeline.innerHTML = experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${exp.period}</div>
        <h3>${exp.position}</h3>
        <h4>${exp.company}</h4>
        <p>${exp.description}</p>
        ${exp.highlights && exp.highlights.length > 0 ? `
          <ul class="timeline-highlights">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// ===================================
// Generate Testimonials Section
// ===================================

function generateTestimonials() {
  const testimonials = getTestimonials();
  const grid = document.querySelector('.testimonials-grid');
  
  if (!grid) return;
  
  if (testimonials.length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1/-1;">No testimonials added yet. Add from admin dashboard.</p>';
    return;
  }
  
  grid.innerHTML = testimonials.map(testimonial => `
    <div class="testimonial-card">
      <div class="testimonial-rating">
        ${'<span class="star">⭐</span>'.repeat(testimonial.rating)}
      </div>
      <p class="testimonial-text">${testimonial.text}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${testimonial.avatar}</div>
        <div class="author-info">
          <h4 class="author-name">${testimonial.name}</h4>
          <p class="author-role">${testimonial.company}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ===================================
// Generate Skills Section
// ===================================

function generateSkills() {
  const skills = getSkills();
  const skillsGrid = document.querySelector('.skills-grid');
  
  if (!skillsGrid) return;
  
  if (skills.length === 0) {
    skillsGrid.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1/-1;">No skills added yet. Add from admin dashboard.</p>';
    return;
  }
  
  skillsGrid.innerHTML = skills.map(skill => `
    <div class="skill-category">
      <h3>${skill.category}</h3>
      <div class="tech-stack">
        ${skill.technologies.map(tech => `<div class="tech-item">${tech}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

// ===================================
// Generate Projects Section
// ===================================

function generateProjectCards() {
  const projects = getProjects();
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (!projectsGrid) return;
  
  if (projects.length === 0) {
    projectsGrid.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1/-1;">No projects added yet. Add from admin dashboard.</p>';
    return;
  }
  
  projectsGrid.innerHTML = '';
  
  // Check if user has unlocked
  const isUnlocked = window.unlockSystem ? window.unlockSystem.isUnlocked() : false;
  
  projects.forEach((project, index) => {
    const card = document.createElement('article');
    const isFreeProject = project.isFree === true;
    const canAccess = isFreeProject || isUnlocked;
    const isLocked = !canAccess;
    
    card.className = `project-card ${isLocked ? 'locked' : ''}`;
    card.setAttribute('data-category', project.category);
    card.style.animationDelay = `${index * 0.03}s`;
    
    const categoryLabel = project.category.charAt(0).toUpperCase() + project.category.slice(1);
    
    const techBadges = project.tech.map(tech => 
      `<span class="tech-badge">${tech}</span>`
    ).join('');
    
    // Build project URL
    let projectUrl = '';
    if (project.folder) {
      projectUrl = `projects/${project.folder}/index.html`;
    }
    
    card.innerHTML = `
      <div class="project-tag">${categoryLabel} ${isFreeProject ? '(Free)' : isLocked ? '🔒' : ''}</div>
      <h3 class="project-title">${project.name}</h3>
      <div class="project-tech">${techBadges}</div>
      <div class="project-links">
        ${projectUrl ? `<a href="${projectUrl}" target="_blank" class="project-link">
          🚀 View Demo
        </a>` : `<span class="project-link" style="cursor: not-allowed; opacity: 0.6;">
          Demo Coming Soon
        </span>`}
        ${isLocked ? `<button class="project-link unlock-btn" onclick="window.unlockSystem.openModal()">
          🔓 Unlock All
        </button>` : ''}
      </div>
    `;
    
    projectsGrid.appendChild(card);
  });
  
  updateFilterButtons();
}

// ===================================
// Update Filter Buttons with Counts
// ===================================

function updateFilterButtons() {
  const projects = getProjects();
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  const categoryCounts = {
    all: projects.length,
    games: 0,
    productivity: 0,
    utilities: 0,
    developer: 0,
    creative: 0,
    finance: 0,
    health: 0,
    'ui-components': 0,
    entertainment: 0,
    education: 0
  };
  
  projects.forEach(project => {
    if (categoryCounts.hasOwnProperty(project.category)) {
      categoryCounts[project.category]++;
    }
  });
  
  filterButtons.forEach(btn => {
    const category = btn.getAttribute('data-category');
    const count = categoryCounts[category] || 0;
    
    // Keep existing button text with emoji, just update count
    const currentText = btn.textContent;
    const emojiMatch = currentText.match(/^(.*?)\s*\(/);
    if (emojiMatch) {
      const prefix = emojiMatch[1].trim();
      btn.textContent = `${prefix} (${count})`;
    } else {
      const label = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
      btn.textContent = `${label} (${count})`;
    }
  });
}

// ===================================
// Project Filtering Functionality
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilter = 'all';

function loadSavedFilter() {
  try {
    const savedFilter = localStorage.getItem('portfolioFilter');
    if (savedFilter) {
      activeFilter = savedFilter;
      filterProjects(activeFilter);
      updateActiveButton(activeFilter);
    }
  } catch (error) {
    console.warn('LocalStorage not available:', error);
  }
}

function saveFilter(category) {
  try {
    localStorage.setItem('portfolioFilter', category);
  } catch (error) {
    console.warn('Could not save to LocalStorage:', error);
  }
}

function filterProjects(category) {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      setTimeout(() => {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      }, index * 30);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

function updateActiveButton(category) {
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    activeFilter = category;
    
    filterProjects(category);
    updateActiveButton(category);
    saveFilter(category);
  });
});

// ===================================
// Contact Form Validation
// ===================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(formData) {
  const errors = [];
  
  if (!formData.get('name') || formData.get('name').trim().length < 2) {
    errors.push('Please enter a valid name (at least 2 characters)');
  }
  
  if (!emailRegex.test(formData.get('email'))) {
    errors.push('Please enter a valid email address');
  }
  
  if (!formData.get('subject') || formData.get('subject').trim().length < 3) {
    errors.push('Please enter a subject (at least 3 characters)');
  }
  
  if (!formData.get('message') || formData.get('message').trim().length < 10) {
    errors.push('Please enter a message (at least 10 characters)');
  }
  
  return errors;
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  
  setTimeout(() => {
    formMessage.className = 'form-message';
  }, 5000);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const errors = validateForm(formData);
  
  contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  
  if (errors.length > 0) {
    showMessage(errors[0], 'error');
    
    if (formData.get('name').trim().length < 2) {
      document.getElementById('name').classList.add('error');
    }
    if (!emailRegex.test(formData.get('email'))) {
      document.getElementById('email').classList.add('error');
    }
    if (formData.get('subject').trim().length < 3) {
      document.getElementById('subject').classList.add('error');
    }
    if (formData.get('message').trim().length < 10) {
      document.getElementById('message').classList.add('error');
    }
    
    return;
  }
  
  showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
  contactForm.reset();
});

contactForm.querySelectorAll('input, textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.classList.remove('error');
  });
});

// ===================================
// Additional Scroll Animations
// ===================================

const animatedElements = document.querySelectorAll('.stat-item, .skill-category, .project-card');

animatedElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(element);
});

// ===================================
// Initialize All Dynamic Content
// ===================================

function initializePortfolio() {
  generateServices();
  generateExperience();
  generateTestimonials();
  generateSkills();
  // generateProjectCards(); // Disabled: Using new 3-tier system (tier-projects.js)
  // loadSavedFilter(); // Disabled: Using tier navigation instead
}

// Listen for data updates from admin dashboard
window.addEventListener('portfolioDataUpdated', () => {
  initializePortfolio();
});

// ===================================
// Scroll Progress Bar
// ===================================

const scrollProgressBar = document.getElementById('scrollProgressBar');

function updateScrollProgress() {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgressBar.style.width = scrolled + '%';
}

// Optimized scroll listener with requestAnimationFrame
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    updateScrollProgress();
  });
}, { passive: true });

// ===================================
// Scroll to Top Button
// ===================================

const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
function toggleScrollToTop() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Listen for scroll events
window.addEventListener('scroll', debounce(toggleScrollToTop, 100));

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializePortfolio);
window.addEventListener('load', loadSavedFilter);


// ===================================
// Golden Projects Functionality
// ===================================

function loadGoldenProjects() {
  const goldenProjectsGrid = document.getElementById('goldenProjectsGrid');
  
  if (!goldenProjectsGrid) return;
  
  // Get golden projects from localStorage
  const projects = localStorage.getItem('goldenProjects');
  const goldenProjects = projects ? JSON.parse(projects) : [];
  
  if (goldenProjects.length === 0) {
    goldenProjectsGrid.innerHTML = `
      <div class="golden-empty-state">
        <div class="golden-trophy">🏆</div>
        <p>No golden projects yet. Add them from the admin dashboard!</p>
        <a href="admin-dashboard.html" class="btn btn-golden">Go to Admin Dashboard</a>
      </div>
    `;
    return;
  }
  
  // Check if unlock system is available
  const isUnlocked = window.unlockSystem ? window.unlockSystem.isUnlocked() : false;
  
  // Add unlock banner if locked
  if (!isUnlocked && goldenProjects.length > 1) {
    goldenProjectsGrid.innerHTML = `
      <div class="unlock-banner">
        <div class="unlock-banner-content">
          <div class="unlock-banner-icon">🔒</div>
          <div class="unlock-banner-text">
            <h3>Unlock All ${goldenProjects.length} Golden Projects</h3>
            <p>Support me to get instant access to all premium projects! First project is free to preview.</p>
          </div>
          <button class="unlock-banner-btn" onclick="window.unlockSystem.openModal()">
            ☕ Unlock Now
          </button>
        </div>
      </div>
    `;
  } else {
    goldenProjectsGrid.innerHTML = '';
  }
  
  // Display golden projects with lock/unlock
  goldenProjectsGrid.innerHTML += goldenProjects.map((project, index) => {
    // Check if project is free OR user has unlocked
    const isUnlocked = window.unlockSystem ? window.unlockSystem.isUnlocked() : false;
    const isFreeProject = project.isFree === true;
    const canAccess = isFreeProject || isUnlocked;
    const isLocked = !canAccess;
    
    // Get the correct image URL - use project.image if available, otherwise use placeholder
    const imageUrl = project.image || `https://placehold.co/400x250/667eea/ffffff/png?text=${encodeURIComponent(project.title || project.name || 'Golden Project')}`;
    
    // Get the correct demo URL - ensure it's properly formatted
    let demoUrl = project.demoUrl || project.link || '';
    
    // Clean up the path for proper navigation
    if (demoUrl) {
      // Normalize path separators (Windows uses \, web uses /)
      demoUrl = demoUrl.replace(/\\/g, '/');
      
      // Remove any leading slashes or dots
      demoUrl = demoUrl.replace(/^[\.\/]+/, '');
      
      // Extract path starting from GoldenProjects if it contains full system path
      const goldenIndex = demoUrl.indexOf('GoldenProjects');
      if (goldenIndex > 0) {
        demoUrl = demoUrl.substring(goldenIndex);
      }
      
      // If it's a relative path (not http/https), ensure it starts from the correct location
      if (!demoUrl.startsWith('http')) {
        // Check if path starts with GoldenProjects
        if (demoUrl.startsWith('GoldenProjects')) {
          // Path is already correct relative to parent directory
          demoUrl = '../' + demoUrl;
        } else if (!demoUrl.startsWith('../')) {
          // Add ../ if not already there
          demoUrl = '../' + demoUrl;
        }
      }
      

    }
    
    // Get project title (could be 'title' or 'name')
    const projectTitle = project.title || project.name || 'Untitled Project';
    
    return `
    <div class="golden-project-card ${isLocked ? 'locked' : ''}">
      <span class="golden-badge">✨ Golden ${isFreeProject ? '(Free Demo)' : ''}</span>
      ${isLocked ? '<div class="lock-overlay"><div class="lock-icon">🔒</div><p>Support to Unlock</p></div>' : ''}
      <img src="${imageUrl}" alt="${projectTitle}" class="golden-project-image ${isLocked ? 'blurred' : ''}" onerror="this.src='https://placehold.co/400x250/667eea/ffffff/png?text=Golden+Project'">
      <div class="golden-project-content">
        <h3 class="golden-project-title">${projectTitle}</h3>
        <p class="golden-project-description">${isLocked ? 'Support me to unlock this premium project and 20+ more!' : (project.description || 'An amazing golden project')}</p>
        ${!isLocked && project.tags && project.tags.length > 0 ? `
          <div class="golden-project-tags">
            ${project.tags.map(tag => `<span class="golden-tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
        <div class="golden-project-links">
          ${isLocked ? 
            `<button class="btn-golden unlock-btn" onclick="window.unlockSystem.openModal()">🔓 Unlock All Projects</button>` :
            `${demoUrl ? `<a href="${demoUrl}" target="_blank" class="btn-golden">🚀 Live Demo</a>` : ''}
             ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn-golden-outline">💻 GitHub</a>` : ''}`
          }
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// Load golden projects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadGoldenProjects();
});

// Reload golden projects when returning from admin dashboard
window.addEventListener('focus', () => {
  loadGoldenProjects();
});
