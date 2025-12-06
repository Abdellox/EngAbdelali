/**
 * ═══════════════════════════════════════════════════════════════════════
 * Admin Dashboard - Dynamic Portfolio Management System
 * Copyright © 2025 Abdel Ali. All Rights Reserved.
 * ═══════════════════════════════════════════════════════════════════════
 */

class AdminDashboard {
  constructor() {
    this.currentSection = 'overview';
    this.init();
  }

  init() {
    this.checkAuth();
    this.setupEventListeners();
    this.loadData();
    this.updateStats();
  }

  // Authentication
  checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      this.showDashboard();
    }
  }

  login(username, password) {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      this.showDashboard();
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
  }

  showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'grid';
    
    // Wait a moment for DOM to be ready, then update stats and render
    setTimeout(() => {
      this.updateStats();
      this.loadUnlockCodes();
      // Render initial data for current section
      if (this.currentSection === 'projects') this.renderProjects();
      if (this.currentSection === 'goldenprojects') this.renderGoldenProjects();
      if (this.currentSection === 'testimonials') this.renderTestimonials();
      if (this.currentSection === 'services') this.renderServices();
      if (this.currentSection === 'experience') this.renderExperience();
      if (this.currentSection === 'skills') this.renderSkills();
    }, 100);
  }

  // Event Listeners
  setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      if (this.login(username, password)) {
        e.target.reset();
      } else {
        alert('Invalid credentials!');
      }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        this.logout();
      }
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        this.switchSection(section);
      });
    });

    document.getElementById('addNewBtn').addEventListener('click', () => {
      this.openModal('add');
    });

    document.querySelector('.modal-close').addEventListener('click', () => {
      this.closeModal();
    });

    document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());
    document.getElementById('importDataBtn').addEventListener('click', () => {
      document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput').addEventListener('change', (e) => this.importData(e));
    document.getElementById('clearDataBtn').addEventListener('click', () => this.clearAllData());
  }

  // Section Switching
  switchSection(section) {
    this.currentSection = section;
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.section === section) {
        item.classList.add('active');
      }
    });

    document.querySelectorAll('.content-section').forEach(sec => {
      sec.classList.remove('active');
    });
    document.getElementById(`${section}Section`).classList.add('active');

    const titles = {
      overview: 'Overview',
      projects: 'Projects Management',
      goldenprojects: 'Golden Projects Management',
      testimonials: 'Testimonials Management',
      services: 'Services Management',
      experience: 'Experience Management',
      skills: 'Skills Management',
      analytics: 'Analytics Dashboard',
      settings: 'Settings'
    };
    document.getElementById('sectionTitle').textContent = titles[section];

    const showButtons = ['projects', 'goldenprojects', 'testimonials', 'services', 'experience', 'skills'].includes(section);
    document.getElementById('addNewBtn').style.display = showButtons ? 'block' : 'none';
    document.getElementById('refreshBtn').style.display = showButtons ? 'block' : 'none';

    // Always render data when switching to a section
    this.refreshCurrentSection();
    
    // Load analytics if switching to analytics section
    if (section === 'analytics') {
      this.refreshAnalytics();
    }
  }

  refreshCurrentSection() {
    const section = this.currentSection;
    console.log('🔄 Refreshing section:', section);
    
    if (section === 'projects') {
      this.renderProjects();
    } else if (section === 'goldenprojects') {
      this.renderGoldenProjects();
    } else if (section === 'testimonials') {
      this.renderTestimonials();
    } else if (section === 'services') {
      this.renderServices();
    } else if (section === 'experience') {
      this.renderExperience();
    } else if (section === 'skills') {
      this.renderSkills();
    }
  }

  // Data Management
  loadData() {
    // Data is already initialized by portfolio-data-init.js
    // Just ensure the keys exist
    if (!localStorage.getItem('portfolioProjects')) {
      localStorage.setItem('portfolioProjects', JSON.stringify([]));
    }
    if (!localStorage.getItem('portfolioTestimonials')) {
      localStorage.setItem('portfolioTestimonials', JSON.stringify([]));
    }
    if (!localStorage.getItem('portfolioServices')) {
      localStorage.setItem('portfolioServices', JSON.stringify([]));
    }
    if (!localStorage.getItem('portfolioExperience')) {
      localStorage.setItem('portfolioExperience', JSON.stringify([]));
    }
    if (!localStorage.getItem('portfolioSkills')) {
      localStorage.setItem('portfolioSkills', JSON.stringify([]));
    }
  }

  getProjects() {
    return JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
  }

  getGoldenProjects() {
    return JSON.parse(localStorage.getItem('goldenProjects') || '[]');
  }

  getTestimonials() {
    return JSON.parse(localStorage.getItem('portfolioTestimonials') || '[]');
  }

  getExperience() {
    return JSON.parse(localStorage.getItem('portfolioExperience') || '[]');
  }

  getSkills() {
    return JSON.parse(localStorage.getItem('portfolioSkills') || '[]');
  }

  getServices() {
    return JSON.parse(localStorage.getItem('portfolioServices') || '[]');
  }

  saveProjects(projects) {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    this.updateStats();
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  }

  saveGoldenProjects(goldenProjects) {
    localStorage.setItem('goldenProjects', JSON.stringify(goldenProjects));
    this.updateStats();
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  }

  saveTestimonials(testimonials) {
    localStorage.setItem('portfolioTestimonials', JSON.stringify(testimonials));
    this.updateStats();
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  }

  saveExperience(experience) {
    localStorage.setItem('portfolioExperience', JSON.stringify(experience));
    this.updateStats();
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  }

  saveSkills(skills) {
    localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    this.updateStats();
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  }

  saveServices(services) {
    localStorage.setItem('portfolioServices', JSON.stringify(services));
    this.updateStats();
    window.dispatchEvent(new Event('portfolioDataUpdated'));
  }

  // Update Stats
  updateStats() {
    const projects = this.getProjects();
    const goldenProjects = this.getGoldenProjects();
    const testimonials = this.getTestimonials();
    const services = this.getServices();
    const experience = this.getExperience();
    const skills = this.getSkills();
    
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('totalGoldenProjects').textContent = goldenProjects.length;
    document.getElementById('totalTestimonials').textContent = testimonials.length;
    document.getElementById('totalServices').textContent = services.length;
    document.getElementById('totalExperience').textContent = experience.length;
    document.getElementById('totalSkills').textContent = skills.length;
  }

  // Render Functions
  renderProjects() {
    const projects = this.getProjects();
    const container = document.getElementById('projectsList');
    
    console.log('📁 Rendering projects:', projects.length, 'projects found');
    
    if (!container) {
      console.error('❌ Projects container not found!');
      return;
    }
    
    if (projects.length === 0) {
      container.innerHTML = '<p class="empty-state">No projects yet. Click "Add New" to create one.</p>';
      return;
    }

    let html = `
      <div class="table-header">
        <div>Project Name</div>
        <div>Category</div>
        <div>Tech Stack</div>
        <div>Actions</div>
      </div>
    `;

    projects.forEach(project => {
      html += `
        <div class="table-row">
          <div><strong>${project.name}</strong></div>
          <div>${project.category}</div>
          <div>${project.tech.slice(0, 2).join(', ')}${project.tech.length > 2 ? '...' : ''}</div>
          <div class="table-actions">
            <button class="btn btn-small btn-secondary" onclick="admin.editProject(${project.id})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="admin.deleteProject(${project.id})">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderGoldenProjects() {
    const goldenProjects = this.getGoldenProjects();
    const container = document.getElementById('goldenProjectsList');
    
    console.log('✨ Rendering golden projects:', goldenProjects.length, 'projects found');
    
    if (!container) {
      console.error('❌ Golden projects container not found!');
      return;
    }
    
    if (goldenProjects.length === 0) {
      container.innerHTML = '<p class="empty-state">No golden projects yet. Click "Add New" to create one.</p>';
      return;
    }

    let html = `
      <div class="table-header">
        <div>Project Name</div>
        <div>Description</div>
        <div>Technologies</div>
        <div>Actions</div>
      </div>
    `;

    goldenProjects.forEach(project => {
      const description = project.description ? 
        (project.description.length > 60 ? project.description.substring(0, 60) + '...' : project.description) 
        : 'No description';
      const languages = project.languages || 'Not specified';
      
      html += `
        <div class="table-row">
          <div>
            <strong>✨ ${project.name}</strong>
            <br>
            <small style="color: #666;"><code>${project.link}</code></small>
          </div>
          <div style="font-size: 0.9rem; color: #666;">${description}</div>
          <div><span style="font-size: 0.85rem; color: #667eea;">${languages}</span></div>
          <div class="table-actions">
            <button class="btn btn-small btn-secondary" onclick="admin.editGoldenProject(${project.id})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="admin.deleteGoldenProject(${project.id})">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderTestimonials() {
    const testimonials = this.getTestimonials();
    const container = document.getElementById('testimonialsList');
    
    console.log('💬 Rendering testimonials:', testimonials.length, 'testimonials found');
    
    if (!container) {
      console.error('❌ Testimonials container not found!');
      return;
    }
    
    if (testimonials.length === 0) {
      container.innerHTML = '<p class="empty-state">No testimonials yet. Click "Add New" to create one.</p>';
      return;
    }

    let html = `
      <div class="table-header">
        <div>Client Name</div>
        <div>Company</div>
        <div>Rating</div>
        <div>Actions</div>
      </div>
    `;

    testimonials.forEach(testimonial => {
      html += `
        <div class="table-row">
          <div><strong>${testimonial.name}</strong></div>
          <div>${testimonial.company}</div>
          <div>${'⭐'.repeat(testimonial.rating)}</div>
          <div class="table-actions">
            <button class="btn btn-small btn-secondary" onclick="admin.editTestimonial(${testimonial.id})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="admin.deleteTestimonial(${testimonial.id})">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderExperience() {
    const experience = this.getExperience();
    const container = document.getElementById('experienceList');
    
    console.log('💼 Rendering experience:', experience.length, 'entries found');
    
    if (!container) {
      console.error('❌ Experience container not found!');
      return;
    }
    
    if (experience.length === 0) {
      container.innerHTML = '<p class="empty-state">No experience yet. Click "Add New" to create one.</p>';
      return;
    }

    let html = `
      <div class="table-header">
        <div>Position</div>
        <div>Company</div>
        <div>Period</div>
        <div>Actions</div>
      </div>
    `;

    experience.forEach(exp => {
      html += `
        <div class="table-row">
          <div><strong>${exp.position}</strong></div>
          <div>${exp.company}</div>
          <div>${exp.period}</div>
          <div class="table-actions">
            <button class="btn btn-small btn-secondary" onclick="admin.editExperience(${exp.id})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="admin.deleteExperience(${exp.id})">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderServices() {
    const services = this.getServices();
    const container = document.getElementById('servicesList');
    
    console.log('⚙️ Rendering services:', services.length, 'services found');
    
    if (!container) {
      console.error('❌ Services container not found!');
      return;
    }
    
    if (services.length === 0) {
      container.innerHTML = '<p class="empty-state">No services yet. Click "Add New" to create one.</p>';
      return;
    }

    let html = `
      <div class="table-header">
        <div>Service Name</div>
        <div>Icon</div>
        <div>Features</div>
        <div>Actions</div>
      </div>
    `;

    services.forEach(service => {
      html += `
        <div class="table-row">
          <div><strong>${service.title}</strong></div>
          <div style="font-size: 1.5rem">${service.icon}</div>
          <div>${service.features.slice(0, 2).join(', ')}${service.features.length > 2 ? '...' : ''}</div>
          <div class="table-actions">
            <button class="btn btn-small btn-secondary" onclick="admin.editService(${service.id})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="admin.deleteService(${service.id})">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderSkills() {
    const skills = this.getSkills();
    const container = document.getElementById('skillsList');
    
    console.log('🛠️ Rendering skills:', skills.length, 'categories found');
    
    if (!container) {
      console.error('❌ Skills container not found!');
      return;
    }
    
    if (skills.length === 0) {
      container.innerHTML = '<p class="empty-state">No skills yet. Click "Add New" to create one.</p>';
      return;
    }

    let html = `
      <div class="table-header">
        <div>Category</div>
        <div>Technologies</div>
        <div>Actions</div>
      </div>
    `;

    skills.forEach(skill => {
      html += `
        <div class="table-row">
          <div><strong>${skill.category}</strong></div>
          <div>${skill.technologies.slice(0, 3).join(', ')}${skill.technologies.length > 3 ? '...' : ''}</div>
          <div class="table-actions">
            <button class="btn btn-small btn-secondary" onclick="admin.editSkill(${skill.id})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="admin.deleteSkill(${skill.id})">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Modal Functions
  openModal(mode, data = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');

    if (this.currentSection === 'projects') {
      modalTitle.textContent = mode === 'add' ? 'Add New Project' : 'Edit Project';
      modalBody.innerHTML = this.getProjectForm(data);
    } else if (this.currentSection === 'goldenprojects') {
      modalTitle.textContent = mode === 'add' ? 'Add New Golden Project' : 'Edit Golden Project';
      modalBody.innerHTML = this.getGoldenProjectForm(data);
    } else if (this.currentSection === 'testimonials') {
      modalTitle.textContent = mode === 'add' ? 'Add New Testimonial' : 'Edit Testimonial';
      modalBody.innerHTML = this.getTestimonialForm(data);
    } else if (this.currentSection === 'services') {
      modalTitle.textContent = mode === 'add' ? 'Add New Service' : 'Edit Service';
      modalBody.innerHTML = this.getServiceForm(data);
    } else if (this.currentSection === 'experience') {
      modalTitle.textContent = mode === 'add' ? 'Add New Experience' : 'Edit Experience';
      modalBody.innerHTML = this.getExperienceForm(data);
    } else if (this.currentSection === 'skills') {
      modalTitle.textContent = mode === 'add' ? 'Add New Skill Category' : 'Edit Skill Category';
      modalBody.innerHTML = this.getSkillForm(data);
    }

    modal.classList.add('active');
  }

  closeModal() {
    document.getElementById('modal').classList.remove('active');
  }

  getProjectForm(data) {
    return `
      <form class="modal-form" onsubmit="admin.saveProject(event, ${data ? data.id : 'null'})">
        <div class="form-group">
          <label>Project Name *</label>
          <input type="text" name="name" value="${data ? data.name : ''}" placeholder="My Awesome Project" required>
        </div>
        <div class="form-group">
          <label>Category *</label>
          <select name="category" required>
            <option value="games" ${data && data.category === 'games' ? 'selected' : ''}>Games</option>
            <option value="productivity" ${data && data.category === 'productivity' ? 'selected' : ''}>Productivity</option>
            <option value="utilities" ${data && data.category === 'utilities' ? 'selected' : ''}>Utilities</option>
            <option value="developer" ${data && data.category === 'developer' ? 'selected' : ''}>Developer Tools</option>
            <option value="creative" ${data && data.category === 'creative' ? 'selected' : ''}>Creative</option>
            <option value="finance" ${data && data.category === 'finance' ? 'selected' : ''}>Finance</option>
            <option value="health" ${data && data.category === 'health' ? 'selected' : ''}>Health</option>
            <option value="other" ${data && data.category === 'other' ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tech Stack (comma separated) *</label>
          <input type="text" name="tech" value="${data ? data.tech.join(', ') : ''}" placeholder="JavaScript, React, Node.js" required>
        </div>
        <div class="form-group">
          <label>📁 Project Folder Path *</label>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <input type="text" id="projectFolderPath" name="folder" value="${data ? data.folder : ''}" placeholder="projects/my-project/index.html" required style="flex: 1;">
            <input type="file" id="projectFileInput" webkitdirectory directory multiple style="display: none;" onchange="admin.handleProjectFileSelection(event)">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('projectFileInput').click()" style="white-space: nowrap;">
              📂 Browse
            </button>
          </div>
          <small style="color: #666; display: block; margin-top: 0.5rem;">
            Click Browse to select your project folder, or type path manually<br>
            Example: projects/calculator/index.html
          </small>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Project</button>
        </div>
      </form>
    `;
  }

  getGoldenProjectForm(data) {
    return `
      <form class="modal-form" onsubmit="admin.saveGoldenProject(event, ${data ? data.id : 'null'})">
        <div class="form-group">
          <label>✨ Project Title *</label>
          <input type="text" name="name" value="${data ? data.name : ''}" placeholder="E-Commerce Platform" required>
        </div>
        
        <div class="form-group">
          <label>📝 Description *</label>
          <textarea name="description" rows="4" placeholder="A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard..." required>${data ? data.description : ''}</textarea>
        </div>
        
        <div class="form-group">
          <label>💻 Languages/Technologies Used *</label>
          <input type="text" name="languages" value="${data ? data.languages : ''}" placeholder="HTML, CSS, JavaScript, React, Node.js" required>
          <small style="color: #666; display: block; margin-top: 0.5rem;">
            Separate multiple technologies with commas
          </small>
        </div>
        
        <div class="form-group">
          <label>🖼️ Project Image URL</label>
          <input type="url" name="image" value="${data ? data.image : ''}" placeholder="https://images.unsplash.com/photo-...">
          <small style="color: #666; display: block; margin-top: 0.5rem;">
            Optional: Add a custom image URL (Unsplash, project screenshot, etc.)<br>
            Leave empty to use auto-generated placeholder
          </small>
        </div>
        
        <div class="form-group">
          <label>📁 Project Folder Path *</label>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <input type="text" id="folderPath" name="link" value="${data ? data.link : ''}" placeholder="GoldenProjects/1_static/MyProject/index.html" required style="flex: 1;">
            <input type="file" id="fileInput" webkitdirectory directory multiple style="display: none;" onchange="admin.handleFileSelection(event)">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click()" style="white-space: nowrap;">
              📂 Browse Files
            </button>
          </div>
          <small style="color: #666; display: block; margin-top: 0.5rem;">
            Click Browse to select your project's HTML file<br>
            Example: GoldenProjects/1_static/FreelanceJobs/index.html
          </small>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">✨ Save Golden Project</button>
        </div>
      </form>
    `;
  }

  getTestimonialForm(data) {
    return `
      <form class="modal-form" onsubmit="admin.saveTestimonial(event, ${data ? data.id : 'null'})">
        <div class="form-group">
          <label>Client Name *</label>
          <input type="text" name="name" value="${data ? data.name : ''}" required>
        </div>
        <div class="form-group">
          <label>Company/Role *</label>
          <input type="text" name="company" value="${data ? data.company : ''}" required>
        </div>
        <div class="form-group">
          <label>Rating *</label>
          <select name="rating" required>
            <option value="5" ${data && data.rating === 5 ? 'selected' : ''}>5 Stars</option>
            <option value="4" ${data && data.rating === 4 ? 'selected' : ''}>4 Stars</option>
            <option value="3" ${data && data.rating === 3 ? 'selected' : ''}>3 Stars</option>
          </select>
        </div>
        <div class="form-group">
          <label>Testimonial Text *</label>
          <textarea name="text" rows="5" required>${data ? data.text : ''}</textarea>
        </div>
        <div class="form-group">
          <label>Avatar Initials</label>
          <input type="text" name="avatar" value="${data ? data.avatar : ''}" maxlength="2" placeholder="JD">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Testimonial</button>
        </div>
      </form>
    `;
  }

  getServiceForm(data) {
    return `
      <form class="modal-form" onsubmit="admin.saveService(event, ${data ? data.id : 'null'})">
        <div class="form-group">
          <label>Service Title *</label>
          <input type="text" name="title" value="${data ? data.title : ''}" placeholder="Frontend Development" required>
        </div>
        <div class="form-group">
          <label>Icon (Emoji) *</label>
          <input type="text" name="icon" value="${data ? data.icon : ''}" placeholder="🧱" maxlength="2" required>
        </div>
        <div class="form-group">
          <label>Description *</label>
          <textarea name="description" rows="3" required>${data ? data.description : ''}</textarea>
        </div>
        <div class="form-group">
          <label>Features (one per line) *</label>
          <textarea name="features" rows="5" placeholder="HTML5, CSS3, JavaScript&#10;React, Vue.js&#10;Responsive design" required>${data ? data.features.join('\n') : ''}</textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Service</button>
        </div>
      </form>
    `;
  }

  getExperienceForm(data) {
    return `
      <form class="modal-form" onsubmit="admin.saveExperience(event, ${data ? data.id : 'null'})">
        <div class="form-group">
          <label>Position *</label>
          <input type="text" name="position" value="${data ? data.position : ''}" placeholder="Senior Software Engineer" required>
        </div>
        <div class="form-group">
          <label>Company *</label>
          <input type="text" name="company" value="${data ? data.company : ''}" placeholder="Tech Solutions Inc." required>
        </div>
        <div class="form-group">
          <label>Period *</label>
          <input type="text" name="period" value="${data ? data.period : ''}" placeholder="2022 - Present" required>
        </div>
        <div class="form-group">
          <label>Description *</label>
          <textarea name="description" rows="4" required>${data ? data.description : ''}</textarea>
        </div>
        <div class="form-group">
          <label>Highlights (one per line)</label>
          <textarea name="highlights" rows="5" placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3">${data ? data.highlights.join('\n') : ''}</textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Experience</button>
        </div>
      </form>
    `;
  }

  getSkillForm(data) {
    return `
      <form class="modal-form" onsubmit="admin.saveSkill(event, ${data ? data.id : 'null'})">
        <div class="form-group">
          <label>Category Name *</label>
          <input type="text" name="category" value="${data ? data.category : ''}" placeholder="Frontend" required>
        </div>
        <div class="form-group">
          <label>Technologies (comma separated) *</label>
          <textarea name="technologies" rows="5" placeholder="JavaScript, TypeScript, React, Vue.js" required>${data ? data.technologies.join(', ') : ''}</textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Skill Category</button>
        </div>
      </form>
    `;
  }

  // Save Functions
  saveProject(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const projects = this.getProjects();
    
    const project = {
      id: id || Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      tech: formData.get('tech').split(',').map(t => t.trim()),
      folder: formData.get('folder'),
      status: 'done'
    };

    if (id) {
      const index = projects.findIndex(p => p.id === id);
      projects[index] = project;
    } else {
      projects.push(project);
    }

    this.saveProjects(projects);
    this.renderProjects();
    this.closeModal();
    alert('Project saved successfully!');
  }

  saveGoldenProject(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const goldenProjects = this.getGoldenProjects();
    
    // Convert languages string to tags array
    const languagesStr = formData.get('languages');
    const tags = languagesStr ? languagesStr.split(',').map(t => t.trim()) : [];
    
    // Use custom image URL if provided, otherwise use placeholder
    const customImage = formData.get('image');
    const imageUrl = customImage && customImage.trim() !== '' 
      ? customImage 
      : 'https://placehold.co/400x250/667eea/ffffff/png?text=' + encodeURIComponent(formData.get('name'));
    
    const project = {
      id: id || Date.now(),
      title: formData.get('name'), // Use 'title' for portfolio compatibility
      name: formData.get('name'), // Keep 'name' for admin display
      description: formData.get('description'),
      languages: formData.get('languages'),
      tags: tags, // Add tags array for portfolio
      link: formData.get('link'),
      demoUrl: formData.get('link'), // Add demoUrl for portfolio
      githubUrl: '', // Empty for now
      image: imageUrl
    };

    if (id) {
      const index = goldenProjects.findIndex(p => p.id === id);
      goldenProjects[index] = project;
    } else {
      goldenProjects.push(project);
    }

    this.saveGoldenProjects(goldenProjects);
    this.renderGoldenProjects();
    this.closeModal();
    alert('✨ Golden project saved successfully!');
  }

  saveTestimonial(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const testimonials = this.getTestimonials();
    
    const testimonial = {
      id: id || Date.now(),
      name: formData.get('name'),
      company: formData.get('company'),
      rating: parseInt(formData.get('rating')),
      text: formData.get('text'),
      avatar: formData.get('avatar') || formData.get('name').split(' ').map(n => n[0]).join('')
    };

    if (id) {
      const index = testimonials.findIndex(t => t.id === id);
      testimonials[index] = testimonial;
    } else {
      testimonials.push(testimonial);
    }

    this.saveTestimonials(testimonials);
    this.renderTestimonials();
    this.closeModal();
    alert('Testimonial saved successfully!');
  }

  saveService(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const services = this.getServices();
    
    const service = {
      id: id || Date.now(),
      title: formData.get('title'),
      icon: formData.get('icon'),
      description: formData.get('description'),
      features: formData.get('features').split('\n').filter(f => f.trim())
    };

    if (id) {
      const index = services.findIndex(s => s.id === id);
      services[index] = service;
    } else {
      services.push(service);
    }

    this.saveServices(services);
    this.renderServices();
    this.closeModal();
    alert('Service saved successfully!');
  }

  saveExperience(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const experience = this.getExperience();
    
    const exp = {
      id: id || Date.now(),
      position: formData.get('position'),
      company: formData.get('company'),
      period: formData.get('period'),
      description: formData.get('description'),
      highlights: formData.get('highlights').split('\n').filter(h => h.trim())
    };

    if (id) {
      const index = experience.findIndex(e => e.id === id);
      experience[index] = exp;
    } else {
      experience.push(exp);
    }

    this.saveExperience(experience);
    this.renderExperience();
    this.closeModal();
    alert('Experience saved successfully!');
  }

  saveSkill(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const skills = this.getSkills();
    
    const skill = {
      id: id || Date.now(),
      category: formData.get('category'),
      technologies: formData.get('technologies').split(',').map(t => t.trim())
    };

    if (id) {
      const index = skills.findIndex(s => s.id === id);
      skills[index] = skill;
    } else {
      skills.push(skill);
    }

    this.saveSkills(skills);
    this.renderSkills();
    this.closeModal();
    alert('Skill category saved successfully!');
  }

  // Edit Functions
  editProject(id) {
    const project = this.getProjects().find(p => p.id === id);
    this.openModal('edit', project);
  }

  editGoldenProject(id) {
    const project = this.getGoldenProjects().find(p => p.id === id);
    this.openModal('edit', project);
  }

  editTestimonial(id) {
    const testimonial = this.getTestimonials().find(t => t.id === id);
    this.openModal('edit', testimonial);
  }

  editService(id) {
    const service = this.getServices().find(s => s.id === id);
    this.openModal('edit', service);
  }

  editExperience(id) {
    const exp = this.getExperience().find(e => e.id === id);
    this.openModal('edit', exp);
  }

  editSkill(id) {
    const skill = this.getSkills().find(s => s.id === id);
    this.openModal('edit', skill);
  }

  // Delete Functions
  deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
      const projects = this.getProjects().filter(p => p.id !== id);
      this.saveProjects(projects);
      this.renderProjects();
      alert('Project deleted successfully!');
    }
  }

  deleteGoldenProject(id) {
    if (confirm('Are you sure you want to delete this golden project?')) {
      const goldenProjects = this.getGoldenProjects().filter(p => p.id !== id);
      this.saveGoldenProjects(goldenProjects);
      this.renderGoldenProjects();
      alert('✨ Golden project deleted successfully!');
    }
  }

  deleteTestimonial(id) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const testimonials = this.getTestimonials().filter(t => t.id !== id);
      this.saveTestimonials(testimonials);
      this.renderTestimonials();
      alert('Testimonial deleted successfully!');
    }
  }

  deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
      const services = this.getServices().filter(s => s.id !== id);
      this.saveServices(services);
      this.renderServices();
      alert('Service deleted successfully!');
    }
  }

  deleteExperience(id) {
    if (confirm('Are you sure you want to delete this experience?')) {
      const experience = this.getExperience().filter(e => e.id !== id);
      this.saveExperience(experience);
      this.renderExperience();
      alert('Experience deleted successfully!');
    }
  }

  deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill category?')) {
      const skills = this.getSkills().filter(s => s.id !== id);
      this.saveSkills(skills);
      this.renderSkills();
      alert('Skill category deleted successfully!');
    }
  }

  // Data Export/Import
  exportData() {
    const data = {
      projects: this.getProjects(),
      testimonials: this.getTestimonials(),
      services: this.getServices(),
      experience: this.getExperience(),
      skills: this.getSkills(),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.projects) this.saveProjects(data.projects);
        if (data.testimonials) this.saveTestimonials(data.testimonials);
        if (data.services) this.saveServices(data.services);
        if (data.experience) this.saveExperience(data.experience);
        if (data.skills) this.saveSkills(data.skills);
        
        this.renderProjects();
        this.renderTestimonials();
        this.renderServices();
        this.renderExperience();
        this.renderSkills();
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data: ' + error.message);
      }
    };
    reader.readAsText(file);
  }

  clearAllData() {
    if (confirm('⚠️ WARNING: This will delete ALL data! Are you absolutely sure?')) {
      if (confirm('This action cannot be undone. Continue?')) {
        localStorage.removeItem('portfolioProjects');
        localStorage.removeItem('portfolioTestimonials');
        localStorage.removeItem('portfolioServices');
        localStorage.removeItem('portfolioExperience');
        localStorage.removeItem('portfolioSkills');
        this.loadData();
        this.updateStats();
        this.renderProjects();
        this.renderTestimonials();
        this.renderServices();
        this.renderExperience();
        this.renderSkills();
        alert('All data cleared!');
      }
    }
  }

  // ===================================
  // Unlock Codes Management
  // ===================================

  loadUnlockCodes() {
    const codes = this.getUnlockCodes();
    const container = document.getElementById('unlockCodesList');
    
    if (!container) return;
    
    if (codes.length === 0) {
      container.innerHTML = '<p style="color: #999;">No unlock codes yet. Add your first code!</p>';
      return;
    }

    container.innerHTML = codes.map((code, index) => `
      <div class="unlock-code-item">
        <div class="code-display">
          <span class="code-text">${code}</span>
          <button class="btn-copy" onclick="admin.copyCode('${code}')" title="Copy code">📋</button>
        </div>
        <button class="btn btn-small btn-danger" onclick="admin.deleteUnlockCode(${index})">Delete</button>
      </div>
    `).join('');
  }

  getUnlockCodes() {
    const codes = localStorage.getItem('goldenUnlockCodes');
    return codes ? JSON.parse(codes) : [];
  }

  saveUnlockCodes(codes) {
    localStorage.setItem('goldenUnlockCodes', JSON.stringify(codes));
    this.loadUnlockCodes();
  }

  addUnlockCode() {
    const input = document.getElementById('newUnlockCode');
    const code = input.value.trim().toUpperCase();
    
    if (!code) {
      alert('Please enter a code');
      return;
    }

    if (code.length < 4) {
      alert('Code must be at least 4 characters');
      return;
    }

    const codes = this.getUnlockCodes();
    
    if (codes.includes(code)) {
      alert('This code already exists!');
      return;
    }

    codes.push(code);
    this.saveUnlockCodes(codes);
    input.value = '';
    alert(`✅ Code "${code}" added successfully!`);
  }

  generateRandomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('newUnlockCode').value = code;
  }

  deleteUnlockCode(index) {
    if (confirm('Are you sure you want to delete this unlock code?')) {
      const codes = this.getUnlockCodes();
      codes.splice(index, 1);
      this.saveUnlockCodes(codes);
      alert('Code deleted successfully!');
    }
  }

  copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      alert(`✅ Code "${code}" copied to clipboard!`);
    }).catch(() => {
      alert(`Code: ${code}\n\nCopy this code manually.`);
    });
  }

  viewUnlockHistory() {
    const history = JSON.parse(localStorage.getItem('unlockHistory') || '[]');
    
    if (history.length === 0) {
      alert('No unlock history yet.');
      return;
    }

    let message = '📊 Unlock History:\n\n';
    history.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      message += `${index + 1}. Code: ${entry.code}\n   Date: ${date}\n\n`;
    });
    
    alert(message);
  }

  // ===================================
  // Analytics Functions
  // ===================================

  refreshAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('portfolioAnalytics') || '{"sessions": [], "clicks": []}');
    
    // Total visitors
    document.getElementById('totalVisitors').textContent = analytics.sessions?.length || 0;
    
    // Device stats
    const devices = { desktop: 0, mobile: 0, tablet: 0 };
    analytics.sessions?.forEach(session => {
      const type = session.device?.type || 'desktop';
      devices[type] = (devices[type] || 0) + 1;
    });
    
    document.getElementById('desktopCount').textContent = devices.desktop;
    document.getElementById('mobileCount').textContent = devices.mobile;
    document.getElementById('tabletCount').textContent = devices.tablet;
    
    // Browser stats
    const browsers = {};
    analytics.sessions?.forEach(session => {
      const browser = session.browser?.name || 'Unknown';
      browsers[browser] = (browsers[browser] || 0) + 1;
    });
    
    const browserStats = document.getElementById('browserStats');
    browserStats.innerHTML = Object.entries(browsers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([browser, count]) => `
        <div class="analytics-item">
          <span>${browser}:</span>
          <strong>${count}</strong>
        </div>
      `).join('') || '<p style="color: #999;">No data yet</p>';
    
    // Average session time
    const totalTime = analytics.sessions?.reduce((sum, s) => sum + (s.duration || 0), 0) || 0;
    const avgTime = analytics.sessions?.length ? Math.round(totalTime / analytics.sessions.length) : 0;
    document.getElementById('avgSessionTime').textContent = avgTime > 60 
      ? `${Math.round(avgTime / 60)}m` 
      : `${avgTime}s`;
    
    // Top clicks
    const clickCounts = {};
    analytics.clicks?.forEach(click => {
      const target = click.target || 'Unknown';
      clickCounts[target] = (clickCounts[target] || 0) + 1;
    });
    
    const topClicks = document.getElementById('topClicks');
    topClicks.innerHTML = Object.entries(clickCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([target, count]) => `
        <div class="analytics-item">
          <span>${target}:</span>
          <strong>${count}</strong>
        </div>
      `).join('') || '<p style="color: #999;">No clicks yet</p>';
    
    // Total page views
    document.getElementById('totalPageViews').textContent = analytics.sessions?.reduce((sum, s) => sum + (s.pageViews || 1), 0) || 0;
    
    console.log('📊 Analytics refreshed');
  }

  exportAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('portfolioAnalytics') || '{"sessions": [], "clicks": []}');
    
    const blob = new Blob([JSON.stringify(analytics, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('Analytics exported successfully!');
  }

  clearAnalytics() {
    if (confirm('⚠️ Are you sure you want to clear all analytics data? This cannot be undone.')) {
      localStorage.removeItem('portfolioAnalytics');
      this.refreshAnalytics();
      alert('Analytics data cleared!');
    }
  }

  // ===================================
  // File/Folder Browser
  // ===================================

  // For Golden Projects
  handleFileSelection(event) {
    const files = event.target.files;
    const folderInput = document.getElementById('folderPath');
    
    if (files.length === 0) {
      return;
    }
    
    // Look for HTML files
    let htmlFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.endsWith('.html')) {
        htmlFiles.push(file);
      }
    }
    
    if (htmlFiles.length === 0) {
      alert('⚠️ No HTML files found in the selected folder.\n\nPlease select a folder that contains HTML files (index.html, main.html, etc.)');
      return;
    }
    
    // If multiple HTML files, let user choose
    if (htmlFiles.length > 1) {
      let fileList = 'Multiple HTML files found. Select one:\n\n';
      htmlFiles.forEach((file, index) => {
        fileList += `${index + 1}. ${file.name}\n`;
      });
      fileList += '\nEnter the number of the file you want to use:';
      
      const choice = prompt(fileList);
      const index = parseInt(choice) - 1;
      
      if (index >= 0 && index < htmlFiles.length) {
        const selectedFile = htmlFiles[index];
        const relativePath = selectedFile.webkitRelativePath || selectedFile.name;
        folderInput.value = relativePath;
        alert(`✅ Selected: ${relativePath}`);
      } else {
        alert('❌ Invalid selection. Please try again.');
      }
    } else {
      // Only one HTML file found
      const selectedFile = htmlFiles[0];
      const relativePath = selectedFile.webkitRelativePath || selectedFile.name;
      folderInput.value = relativePath;
      alert(`✅ File selected: ${relativePath}`);
    }
  }

  // For Regular Projects
  handleProjectFileSelection(event) {
    const files = event.target.files;
    const folderInput = document.getElementById('projectFolderPath');
    
    if (files.length === 0) {
      return;
    }
    
    // Look for HTML files
    let htmlFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.endsWith('.html')) {
        htmlFiles.push(file);
      }
    }
    
    if (htmlFiles.length === 0) {
      alert('⚠️ No HTML files found in the selected folder.\n\nPlease select a folder that contains HTML files (index.html, main.html, etc.)');
      return;
    }
    
    // If multiple HTML files, let user choose
    if (htmlFiles.length > 1) {
      let fileList = 'Multiple HTML files found. Select one:\n\n';
      htmlFiles.forEach((file, index) => {
        fileList += `${index + 1}. ${file.name}\n`;
      });
      fileList += '\nEnter the number of the file you want to use:';
      
      const choice = prompt(fileList);
      const index = parseInt(choice) - 1;
      
      if (index >= 0 && index < htmlFiles.length) {
        const selectedFile = htmlFiles[index];
        const relativePath = selectedFile.webkitRelativePath || selectedFile.name;
        folderInput.value = relativePath;
        alert(`✅ Selected: ${relativePath}`);
      } else {
        alert('❌ Invalid selection. Please try again.');
      }
    } else {
      // Only one HTML file found
      const selectedFile = htmlFiles[0];
      const relativePath = selectedFile.webkitRelativePath || selectedFile.name;
      folderInput.value = relativePath;
      alert(`✅ File selected: ${relativePath}`);
    }
  }

  // ===================================
  // Bulk Import Golden Projects
  // ===================================

  scanGoldenProjectsFolder() {
    // Create a hidden file input for folder selection
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.directory = true;
    input.multiple = true;
    
    input.onchange = (event) => {
      const files = event.target.files;
      
      if (files.length === 0) {
        alert('❌ No folder selected. Please try again.');
        return;
      }
      
      // Check if this is the GoldenProjects folder
      const firstFile = files[0];
      const path = firstFile.webkitRelativePath || '';
      
      if (!path.toLowerCase().includes('goldenprojects')) {
        const proceed = confirm('⚠️ The selected folder doesn\'t appear to be "GoldenProjects".\n\nDo you want to continue anyway?');
        if (!proceed) return;
      }
      
      // Group files by project folder
      const projectFolders = {};
      
      // First, determine what folder was selected
      let selectedFolderName = '';
      if (files.length > 0) {
        const firstPath = files[0].webkitRelativePath || '';
        const parts = firstPath.split(/[\/\\]/);
        selectedFolderName = parts[0]; // First part is the selected folder name
        console.log('📁 Selected folder:', selectedFolderName);
      }
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let relativePath = file.webkitRelativePath || file.name;
        
        console.log(`Processing file ${i + 1}/${files.length}: ${relativePath}`);
        
        // Normalize path separators (Windows uses \, web uses /)
        relativePath = relativePath.replace(/\\/g, '/');
        
        // Extract path starting from GoldenProjects if present
        const goldenProjectsIndex = relativePath.indexOf('GoldenProjects');
        if (goldenProjectsIndex !== -1) {
          relativePath = relativePath.substring(goldenProjectsIndex);
        } else {
          // If GoldenProjects is not in path, user selected a subfolder
          // Reconstruct the path: GoldenProjects/selectedFolder/...
          if (selectedFolderName === '1_static' || selectedFolderName === '2_Dynamic') {
            relativePath = 'GoldenProjects/' + relativePath;
          } else if (selectedFolderName.toLowerCase().includes('golden')) {
            // User selected GoldenProjects folder itself
            relativePath = 'GoldenProjects/' + relativePath.split('/').slice(1).join('/');
          } else {
            // Assume it's a project folder, add GoldenProjects prefix
            relativePath = 'GoldenProjects/' + relativePath;
          }
        }
        
        const pathParts = relativePath.split('/');
        
        // Skip if not enough path parts (need at least: GoldenProjects/ProjectName/file.html)
        if (pathParts.length < 3) {
          console.log(`  ⊘ Skipped: Not enough path parts (${pathParts.length})`);
          continue;
        }
        
        const fileName = file.name;
        
        // Only process HTML files
        if (!fileName.endsWith('.html')) {
          console.log(`  ⊘ Skipped: Not an HTML file`);
          continue;
        }
        
        // Determine project structure
        // Could be: GoldenProjects/ProjectName/file.html (length 3)
        // Or: GoldenProjects/1_static/ProjectName/file.html (length 4)
        // Or: GoldenProjects/2_Dynamic/Camera/lensstory/file.html (length 5+)
        
        let projectName, projectKey;
        
        // The project name is always the folder directly containing the HTML file
        projectName = pathParts[pathParts.length - 2];
        
        // The project key is the full path from GoldenProjects to the project folder
        // This ensures uniqueness for projects with same name in different categories
        projectKey = pathParts.slice(0, -1).join('/'); // Everything except the filename
        
        console.log(`  ✓ Found project: ${projectName} at ${projectKey}`);
        
        if (!projectFolders[projectKey]) {
          projectFolders[projectKey] = {
            name: projectName,
            fullPath: projectKey,
            files: []
          };
        }
        
        projectFolders[projectKey].files.push({
          name: fileName,
          path: relativePath,
          file: file
        });
      }
      
      console.log(`📊 Total projects found: ${Object.keys(projectFolders).length}`);
      
      const projectKeys = Object.keys(projectFolders);
      
      if (projectKeys.length === 0) {
        console.error('❌ No projects found!');
        console.log('Selected folder:', selectedFolderName);
        console.log('Total files scanned:', files.length);
        console.log('HTML files found:', Array.from(files).filter(f => f.name.endsWith('.html')).length);
        
        alert(`❌ No projects found in the selected folder.\n\nSelected: ${selectedFolderName}\nFiles scanned: ${files.length}\nHTML files: ${Array.from(files).filter(f => f.name.endsWith('.html')).length}\n\nMake sure:\n1. Each project has at least one .html file\n2. You selected the correct folder (GoldenProjects or 1_static)\n3. Projects are in subfolders, not loose files\n\nCheck browser console (F12) for details.`);
        return;
      }
      
      // Get display names for confirmation
      const displayNames = projectKeys.map(key => projectFolders[key].name);
      
      // Show confirmation
      const confirmMsg = `🔍 Found ${projectKeys.length} projects:\n\n${displayNames.slice(0, 10).join('\n')}${displayNames.length > 10 ? '\n... and ' + (displayNames.length - 10) + ' more' : ''}\n\nDo you want to import all these projects?`;
      
      if (!confirm(confirmMsg)) {
        return;
      }
      
      // Import all projects
      const goldenProjects = this.getGoldenProjects();
      let addedCount = 0;
      let skippedCount = 0;
      
      projectKeys.forEach(projectKey => {
        const projectData = projectFolders[projectKey];
        const projectName = projectData.name;
        const htmlFiles = projectData.files;
        
        // Prefer index.html, otherwise take the first HTML file
        let selectedFile = htmlFiles.find(f => f.name === 'index.html') || htmlFiles[0];
        
        // Check if project already exists
        const exists = goldenProjects.some(p => p.name === projectName || p.link === selectedFile.path);
        
        if (exists) {
          skippedCount++;
          return;
        }
        
        // Add new project with portfolio-compatible structure
        goldenProjects.push({
          id: Date.now() + addedCount,
          title: projectName, // For portfolio display
          name: projectName, // For admin display
          description: `Golden project: ${projectName}`,
          languages: 'HTML, CSS, JavaScript',
          tags: ['HTML', 'CSS', 'JavaScript'], // For portfolio tags
          link: selectedFile.path,
          demoUrl: selectedFile.path, // For portfolio demo link
          githubUrl: '', // Empty for now
          image: `https://images.unsplash.com/photo-${1500000000000 + addedCount}?w=400&h=250&fit=crop` // Unique placeholder
        });
        
        addedCount++;
      });
      
      // Save all projects
      this.saveGoldenProjects(goldenProjects);
      this.renderGoldenProjects();
      
      // Show results
      alert(`✅ Import Complete!\n\n✓ Added: ${addedCount} projects\n⊘ Skipped: ${skippedCount} (already exist)\n\nTotal Golden Projects: ${goldenProjects.length}`);
    };
    
    // Trigger file picker
    input.click();
  }
}

// Initialize
const admin = new AdminDashboard();

// Debug: Log data counts on load
console.log('🎛️ Admin Dashboard Initialized');
console.log('📊 Current Data:');
console.log('  - Projects:', admin.getProjects().length);
console.log('  - Testimonials:', admin.getTestimonials().length);
console.log('  - Services:', admin.getServices().length);
console.log('  - Experience:', admin.getExperience().length);
console.log('  - Skills:', admin.getSkills().length);
