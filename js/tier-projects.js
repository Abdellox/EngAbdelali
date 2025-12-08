/**
 * ═══════════════════════════════════════════════════════════════════════
 * 3-Tier Project System
 * Copyright © 2025 Abdel Ali. All Rights Reserved.
 * ═══════════════════════════════════════════════════════════════════════
 */

// Tier Navigation Handler
function initTierNavigation() {
  const tierButtons = document.querySelectorAll('.tier-btn');
  const tierSections = document.querySelectorAll('.projects-tier-section');
  
  tierButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tier = this.getAttribute('data-tier');
      
      // Remove active class from all buttons
      tierButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all sections
      tierSections.forEach(section => section.classList.remove('active'));
      
      // Show selected section
      const targetSection = document.getElementById(`tier-${tier}`);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

// Categorize projects by tier
function categorizeProjectsByTier(projects) {
  const basic = [];
  const intermediate = [];
  const professional = [];
  
  projects.forEach(project => {
    if (project.isFree === true) {
      basic.push(project);
    } else if (project.tier === 'professional') {
      professional.push(project);
    } else {
      // Default to intermediate for locked projects without specific tier
      intermediate.push(project);
    }
  });
  
  return { basic, intermediate, professional };
}

// Render project card
function renderProjectCard(project, tier, isUnlocked) {
  const card = document.createElement('article');
  const canAccess = tier === 'basic' || isUnlocked;
  const isLocked = !canAccess;
  
  card.className = `project-card tier-${tier} ${isLocked ? 'locked' : ''}`;
  card.setAttribute('data-category', project.category);
  
  const categoryLabel = project.category.charAt(0).toUpperCase() + project.category.slice(1);
  
  const techBadges = project.tech.map(tech => 
    `<span class="tech-badge">${tech}</span>`
  ).join('');
  
  // Build project URL
  let projectUrl = '';
  if (project.folder) {
    projectUrl = `Projects/${project.folder}/index.html`;
  }
  
  // Tier label
  let tierLabel = '';
  if (tier === 'basic') tierLabel = 'Basic';
  else if (tier === 'intermediate') tierLabel = 'Intermediate';
  else if (tier === 'professional') tierLabel = 'Professional';
  
  card.innerHTML = `
    <div class="project-tag">${categoryLabel} • ${tierLabel}</div>
    <h3 class="project-title">${project.name}</h3>
    <div class="project-tech">${techBadges}</div>
    <div class="project-links">
      ${projectUrl && canAccess ? `<a href="${projectUrl}" target="_blank" class="project-link">
        🚀 View Demo
      </a>` : isLocked ? `<button class="project-link unlock-btn" onclick="window.unlockSystem.openModal()">
        🔓 Unlock
      </button>` : `<span class="project-link" style="cursor: not-allowed; opacity: 0.6;">
        Demo Coming Soon
      </span>`}
    </div>
  `;
  
  return card;
}

// Load projects by tier
function loadTierProjects() {
  const projects = getProjects();
  const isUnlocked = window.unlockSystem ? window.unlockSystem.isUnlocked() : false;
  
  // Categorize projects
  const { basic, intermediate, professional } = categorizeProjectsByTier(projects);
  
  // Update counts
  document.getElementById('basicCount').textContent = `${basic.length} FREE`;
  document.getElementById('intermediateCount').textContent = intermediate.length;
  document.getElementById('professionalCount').textContent = professional.length;
  
  // Render Basic Projects
  const basicGrid = document.getElementById('basicProjectsGrid');
  if (basicGrid) {
    basicGrid.innerHTML = '';
    if (basic.length === 0) {
      basicGrid.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1/-1;">No basic projects available.</p>';
    } else {
      basic.forEach((project, index) => {
        const card = renderProjectCard(project, 'basic', isUnlocked);
        card.style.animationDelay = `${index * 0.03}s`;
        basicGrid.appendChild(card);
      });
    }
  }
  
  // Render Intermediate Projects
  const intermediateGrid = document.getElementById('intermediateProjectsGrid');
  if (intermediateGrid) {
    intermediateGrid.innerHTML = '';
    if (intermediate.length === 0) {
      intermediateGrid.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1/-1;">No intermediate projects available.</p>';
    } else {
      intermediate.forEach((project, index) => {
        const card = renderProjectCard(project, 'intermediate', isUnlocked);
        card.style.animationDelay = `${index * 0.03}s`;
        intermediateGrid.appendChild(card);
      });
    }
  }
  
  // Render Professional Projects
  const professionalGrid = document.getElementById('professionalProjectsGrid');
  if (professionalGrid) {
    professionalGrid.innerHTML = '';
    if (professional.length === 0) {
      professionalGrid.innerHTML = '<p style="text-align: center; color: #64748b; grid-column: 1/-1;">No professional projects available.</p>';
    } else {
      professional.forEach((project, index) => {
        const card = renderProjectCard(project, 'professional', isUnlocked);
        card.style.animationDelay = `${index * 0.03}s`;
        professionalGrid.appendChild(card);
      });
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initTierNavigation();
  loadTierProjects();
  console.log('✅ 3-Tier Project System Initialized');
});

// Reload projects when unlock status changes
if (window.unlockSystem) {
  window.unlockSystem.onUnlockChange = function() {
    loadTierProjects();
  };
}
