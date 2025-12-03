/**
 * Portfolio Analytics System
 * Tracks visitor behavior and interactions
 */

class PortfolioAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.init();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  init() {
    this.trackPageView();
    this.setupEventListeners();
    this.trackTimeOnPage();
    this.trackScrollDepth();
  }

  // Track page view
  trackPageView() {
    const visit = {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer || 'Direct',
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      platform: navigator.platform,
      // Enhanced visitor data
      deviceType: this.getDeviceType(),
      browserName: this.getBrowserName(),
      osName: this.getOSName(),
      connectionType: this.getConnectionType(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorDepth: window.screen.colorDepth,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack === '1',
      // Approximate location (no personal data)
      approximateLocation: this.getApproximateLocation()
    };

    this.saveEvent('pageView', visit);
    this.incrementTotalVisits();
  }

  // Get device type
  getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'Mobile';
    }
    return 'Desktop';
  }

  // Get browser name
  getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    if (ua.includes('Trident')) return 'Internet Explorer';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return 'Unknown';
  }

  // Get OS name
  getOSName() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
  }

  // Get connection type
  getConnectionType() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return 'Unknown';
  }

  // Get approximate location (timezone-based, no personal data)
  getApproximateLocation() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // This gives general region without exact location
    return {
      timezone: timezone,
      region: timezone.split('/')[0] // e.g., "America", "Europe", "Asia"
    };
  }

  // Increment total visits counter
  incrementTotalVisits() {
    const stats = this.getStats();
    stats.totalVisits = (stats.totalVisits || 0) + 1;
    stats.lastVisit = new Date().toISOString();
    localStorage.setItem('portfolioStats', JSON.stringify(stats));
  }

  // Get analytics stats
  getStats() {
    const stats = localStorage.getItem('portfolioStats');
    return stats ? JSON.parse(stats) : { totalVisits: 0, events: [] };
  }

  // Setup event listeners for tracking
  setupEventListeners() {
    // Track all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        this.trackClick({
          type: 'link',
          text: link.textContent.trim(),
          href: link.href,
          section: this.getCurrentSection(link)
        });
      }

      // Track button clicks
      const button = e.target.closest('button');
      if (button) {
        this.trackClick({
          type: 'button',
          text: button.textContent.trim(),
          class: button.className,
          section: this.getCurrentSection(button)
        });
      }

      // Track project card clicks
      const projectCard = e.target.closest('.project-card, .golden-project-card');
      if (projectCard) {
        const title = projectCard.querySelector('h3')?.textContent || 'Unknown Project';
        this.trackClick({
          type: 'project',
          projectName: title,
          section: 'Projects'
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      this.trackEvent('formSubmit', {
        formId: form.id || 'unknown',
        section: this.getCurrentSection(form)
      });
    });

    // Track navigation menu clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('navigation', {
          destination: link.textContent.trim(),
          href: link.getAttribute('href')
        });
      });
    });

    // Track social media clicks
    const socialLinks = document.querySelectorAll('.social-links a, .social-icon');
    socialLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('socialClick', {
          platform: this.detectSocialPlatform(link.href || link.closest('a')?.href),
          section: this.getCurrentSection(link)
        });
      });
    });

    // Track filter button clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        this.trackEvent('filterClick', {
          category: e.target.dataset.category || e.target.textContent.trim()
        });
      }
    });
  }

  // Track click events
  trackClick(data) {
    this.trackEvent('click', data);
  }

  // Track generic events
  trackEvent(eventType, data) {
    const event = {
      sessionId: this.sessionId,
      type: eventType,
      timestamp: new Date().toISOString(),
      timeOnPage: Math.floor((Date.now() - this.startTime) / 1000),
      ...data
    };

    this.saveEvent(eventType, event);
  }

  // Save event to localStorage
  saveEvent(eventType, data) {
    const events = this.getEvents();
    events.push({
      eventType,
      ...data
    });

    // Keep only last 1000 events to prevent storage overflow
    if (events.length > 1000) {
      events.shift();
    }

    localStorage.setItem('portfolioEvents', JSON.stringify(events));
  }

  // Get all events
  getEvents() {
    const events = localStorage.getItem('portfolioEvents');
    return events ? JSON.parse(events) : [];
  }

  // Track time on page
  trackTimeOnPage() {
    // Track every 30 seconds
    setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
      this.trackEvent('timeUpdate', {
        timeOnPage,
        page: window.location.pathname
      });
    }, 30000);

    // Track on page unload
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
      this.trackEvent('pageExit', {
        timeOnPage,
        page: window.location.pathname
      });
    });
  }

  // Track scroll depth
  trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          this.trackEvent('scrollDepth', {
            depth: milestone,
            page: window.location.pathname
          });
        }
      });
    });
  }

  // Get current section based on element position
  getCurrentSection(element) {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'Unknown';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      if (elementRect.top >= rect.top && elementRect.top <= rect.bottom) {
        currentSection = section.id || section.className.split(' ')[0];
      }
    });

    return currentSection;
  }

  // Detect social platform from URL
  detectSocialPlatform(url) {
    if (!url) return 'Unknown';
    if (url.includes('linkedin')) return 'LinkedIn';
    if (url.includes('github')) return 'GitHub';
    if (url.includes('twitter')) return 'Twitter';
    if (url.includes('facebook')) return 'Facebook';
    if (url.includes('instagram')) return 'Instagram';
    if (url.includes('mailto:')) return 'Email';
    if (url.includes('tel:')) return 'Phone';
    return 'Other';
  }

  // Get analytics summary
  static getSummary() {
    const events = JSON.parse(localStorage.getItem('portfolioEvents') || '[]');
    const stats = JSON.parse(localStorage.getItem('portfolioStats') || '{}');

    const summary = {
      totalVisits: stats.totalVisits || 0,
      totalEvents: events.length,
      lastVisit: stats.lastVisit,
      uniqueSessions: new Set(events.map(e => e.sessionId)).size,
      eventsByType: {},
      clicksBySection: {},
      popularProjects: {},
      socialClicks: {},
      navigationClicks: {},
      scrollDepthData: [],
      averageTimeOnPage: 0,
      deviceTypes: {},
      browsers: {},
      referrers: {}
    };

    // Analyze events
    events.forEach(event => {
      // Count by type
      summary.eventsByType[event.eventType] = (summary.eventsByType[event.eventType] || 0) + 1;

      // Clicks by section
      if (event.section) {
        summary.clicksBySection[event.section] = (summary.clicksBySection[event.section] || 0) + 1;
      }

      // Popular projects
      if (event.projectName) {
        summary.popularProjects[event.projectName] = (summary.popularProjects[event.projectName] || 0) + 1;
      }

      // Social clicks
      if (event.platform) {
        summary.socialClicks[event.platform] = (summary.socialClicks[event.platform] || 0) + 1;
      }

      // Navigation clicks
      if (event.destination) {
        summary.navigationClicks[event.destination] = (summary.navigationClicks[event.destination] || 0) + 1;
      }

      // Scroll depth
      if (event.eventType === 'scrollDepth') {
        summary.scrollDepthData.push(event.depth);
      }

      // Time on page
      if (event.timeOnPage) {
        summary.averageTimeOnPage += event.timeOnPage;
      }

      // Device detection
      if (event.userAgent) {
        const isMobile = /Mobile|Android|iPhone/i.test(event.userAgent);
        const isTablet = /Tablet|iPad/i.test(event.userAgent);
        const deviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
        summary.deviceTypes[deviceType] = (summary.deviceTypes[deviceType] || 0) + 1;

        // Browser detection
        let browser = 'Other';
        if (event.userAgent.includes('Chrome')) browser = 'Chrome';
        else if (event.userAgent.includes('Firefox')) browser = 'Firefox';
        else if (event.userAgent.includes('Safari')) browser = 'Safari';
        else if (event.userAgent.includes('Edge')) browser = 'Edge';
        summary.browsers[browser] = (summary.browsers[browser] || 0) + 1;
      }

      // Referrers
      if (event.referrer) {
        summary.referrers[event.referrer] = (summary.referrers[event.referrer] || 0) + 1;
      }
    });

    // Calculate average time
    const timeEvents = events.filter(e => e.timeOnPage).length;
    if (timeEvents > 0) {
      summary.averageTimeOnPage = Math.floor(summary.averageTimeOnPage / timeEvents);
    }

    return summary;
  }

  // Clear all analytics data
  static clearData() {
    localStorage.removeItem('portfolioEvents');
    localStorage.removeItem('portfolioStats');
  }
}

// Initialize analytics when page loads
if (typeof window !== 'undefined') {
  window.portfolioAnalytics = new PortfolioAnalytics();
}
