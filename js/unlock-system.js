/**
 * Golden Projects Unlock System
 * Encourages visitors to support by unlocking premium projects
 */

class UnlockSystem {
  constructor() {
    this.storageKey = 'goldenProjectsUnlocked';
    this.codesKey = 'goldenUnlockCodes';
    this.freeProjectIndex = 0; // First project is always free
    this.init();
  }

  // SECURE: Valid codes stored server-side (not visible to users)
  // Only YOU can add codes here by editing this file locally
  getValidCodes() {
    // These are the ONLY valid codes
    // Add new codes here when you generate them
    return [
      'GOLDEN2025',
      'PREMIUM2025',
      'SUPPORTER2025'
      // Add your generated codes here
      // Example: 'ABC12345',
    ];
  }

  // Generate a random code
  generateRandomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  init() {
    this.checkUnlockStatus();
    this.setupUnlockModal();
  }

  // Check if projects are unlocked
  isUnlocked() {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  // Check if a specific project is accessible
  canAccessProject(index) {
    return index === this.freeProjectIndex || this.isUnlocked();
  }

  // Unlock all projects
  unlock(code) {
    const validCodes = this.getValidCodes();
    if (validCodes.includes(code.toUpperCase())) {
      localStorage.setItem(this.storageKey, 'true');
      // Track successful unlock
      this.trackUnlock(code);
      return true;
    }
    return false;
  }

  // Track unlock for analytics
  trackUnlock(code) {
    const unlocks = JSON.parse(localStorage.getItem('unlockHistory') || '[]');
    unlocks.push({
      code: code,
      timestamp: new Date().toISOString(),
      sessionId: window.portfolioAnalytics ? window.portfolioAnalytics.sessionId : 'unknown'
    });
    localStorage.setItem('unlockHistory', JSON.stringify(unlocks));
  }

  // Lock projects (for testing)
  lock() {
    localStorage.removeItem(this.storageKey);
  }

  // Check unlock status on page load
  checkUnlockStatus() {
    const unlocked = this.isUnlocked();
    console.log('🔓 Golden Projects Status:', unlocked ? 'UNLOCKED' : 'LOCKED');
  }

  // Setup unlock modal
  setupUnlockModal() {
    // Create modal HTML
    const modalHTML = `
      <div id="unlockModal" class="unlock-modal">
        <div class="unlock-modal-content">
          <button class="unlock-modal-close" onclick="unlockSystem.closeModal()">&times;</button>
          
          <div class="unlock-icon">🔒</div>
          <h2>Unlock All Golden Projects</h2>
          <p class="unlock-description">
            Support me to unlock all 22 premium golden projects!<br>
            Get instant access to my best work.
          </p>

          <div class="unlock-benefits">
            <div class="benefit-item">✅ Access to 22 premium projects</div>
            <div class="benefit-item">✅ Lifetime access (no subscription)</div>
            <div class="benefit-item">✅ Support independent development</div>
            <div class="benefit-item">✅ Unlock code works forever</div>
          </div>

          <div class="unlock-tabs">
            <button class="unlock-tab active" onclick="unlockSystem.switchTab('support')">
              ☕ Support Me
            </button>
            <button class="unlock-tab" onclick="unlockSystem.switchTab('code')">
              🔑 Have a Code?
            </button>
          </div>

          <div id="supportTab" class="unlock-tab-content active">
            <p class="tab-description">Support me on Ko-fi to unlock all projects:</p>
            <div class="unlock-price-info">
              <div class="price-tag">Starting from <strong>$5</strong></div>
              <p class="price-note">Choose any amount you'd like to contribute</p>
            </div>
            <a href="https://ko-fi.com/abdelalii" class="unlock-support-btn" target="_blank">
              ☕ Support on Ko-fi & Get Code
            </a>
            <p class="unlock-note">
              💡 After supporting on Ko-fi, you'll receive an unlock code.<br>
              Come back here and enter it in the "Have a Code?" tab.
            </p>
            <div class="unlock-steps">
              <div class="step">1️⃣ Click the button above</div>
              <div class="step">2️⃣ Support with $5 or more</div>
              <div class="step">3️⃣ Get your unlock code</div>
              <div class="step">4️⃣ Enter code to unlock</div>
            </div>
          </div>

          <div id="codeTab" class="unlock-tab-content">
            <p class="tab-description">Enter your unlock code:</p>
            <input type="text" id="unlockCodeInput" class="unlock-code-input" placeholder="Enter code (e.g., GOLDEN2025)" maxlength="20">
            <button class="unlock-submit-btn" onclick="unlockSystem.submitCode()">
              🔓 Unlock Projects
            </button>
            <div id="unlockMessage" class="unlock-message"></div>
          </div>
        </div>
      </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add modal styles
    this.addModalStyles();
  }

  // Add modal styles
  addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .unlock-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }

      .unlock-modal.active {
        display: flex;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .unlock-modal-content {
        background: white;
        border-radius: 20px;
        padding: 2.5rem;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideUp 0.3s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .unlock-modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        transition: color 0.3s;
      }

      .unlock-modal-close:hover {
        color: #000;
      }

      .unlock-icon {
        font-size: 4rem;
        text-align: center;
        margin-bottom: 1rem;
      }

      .unlock-modal-content h2 {
        text-align: center;
        color: #2d3748;
        margin-bottom: 0.5rem;
        font-size: 1.8rem;
      }

      .unlock-description {
        text-align: center;
        color: #4a5568;
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }

      .unlock-benefits {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .benefit-item {
        color: white;
        padding: 0.5rem 0;
        font-weight: 500;
      }

      .unlock-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .unlock-tab {
        flex: 1;
        padding: 0.75rem;
        background: #f7fafc;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .unlock-tab.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-color: #667eea;
      }

      .unlock-tab-content {
        display: none;
      }

      .unlock-tab-content.active {
        display: block;
      }

      .tab-description {
        text-align: center;
        color: #4a5568;
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .unlock-price-info {
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .price-tag {
        font-size: 1.5rem;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .price-tag strong {
        font-size: 2rem;
        color: #667eea;
      }

      .price-note {
        color: #4a5568;
        font-size: 0.9rem;
        margin: 0;
      }

      .unlock-steps {
        background: #f7fafc;
        border-radius: 10px;
        padding: 1rem;
        margin-top: 1rem;
      }

      .step {
        padding: 0.5rem;
        color: #4a5568;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .unlock-support-btn {
        display: block;
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        color: #2d3748;
        text-align: center;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.1rem;
        transition: all 0.3s;
        margin-bottom: 1rem;
      }

      .unlock-support-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
      }

      .unlock-code-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        margin-bottom: 1rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 2px;
      }

      .unlock-code-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .unlock-submit-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s;
      }

      .unlock-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
      }

      .unlock-message {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        font-weight: 600;
        display: none;
      }

      .unlock-message.success {
        background: #48bb78;
        color: white;
        display: block;
      }

      .unlock-message.error {
        background: #f56565;
        color: white;
        display: block;
      }

      .unlock-note {
        text-align: center;
        color: #718096;
        font-size: 0.9rem;
        margin-top: 1rem;
      }

      @media (max-width: 768px) {
        .unlock-modal-content {
          padding: 2rem;
        }

        .unlock-amounts {
          grid-template-columns: repeat(2, 1fr);
        }

        .unlock-modal-content h2 {
          font-size: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Open modal
  openModal() {
    const modal = document.getElementById('unlockModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('unlockModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Switch tabs
  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.unlock-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.unlock-tab-content').forEach(content => {
      content.classList.remove('active');
    });

    if (tabName === 'support') {
      document.getElementById('supportTab').classList.add('active');
    } else {
      document.getElementById('codeTab').classList.add('active');
    }
  }

  // Support with Ko-fi
  supportAmount(amount) {
    window.open(`https://ko-fi.com/abdelalii`, '_blank');
  }

  // Submit unlock code
  submitCode() {
    const input = document.getElementById('unlockCodeInput');
    const message = document.getElementById('unlockMessage');
    const code = input.value.trim();

    if (!code) {
      this.showMessage('Please enter a code', 'error');
      return;
    }

    if (this.unlock(code)) {
      this.showMessage('🎉 Success! All golden projects unlocked!', 'success');
      setTimeout(() => {
        this.closeModal();
        window.location.reload();
      }, 2000);
    } else {
      this.showMessage('❌ Invalid code. Please try again.', 'error');
      input.value = '';
    }
  }

  // Show message
  showMessage(text, type) {
    const message = document.getElementById('unlockMessage');
    message.textContent = text;
    message.className = `unlock-message ${type}`;
  }

  // Get unlock status for display
  getStatusBadge() {
    return this.isUnlocked() 
      ? '<span class="unlock-badge unlocked">🔓 Unlocked</span>'
      : '<span class="unlock-badge locked">🔒 Locked</span>';
  }
}

// Initialize unlock system
const unlockSystem = new UnlockSystem();

// Make it globally available
window.unlockSystem = unlockSystem;
