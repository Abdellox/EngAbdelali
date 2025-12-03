/**
 * Enhanced Analytics System
 * Collects comprehensive visitor data (privacy-compliant)
 */

class EnhancedAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.init();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  init() {
    this.trackEnhancedPageView();
    this.setupEnhancedTracking();
    this.trackUserBehavior();
    this.trackPerformance();
  }

  // Enhanced page view tracking
  trackEnhancedPageView() {
    const data = {
      // Session Info
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      
      // Page Info
      page: window.location.pathname,
      pageTitle: document.title,
      referrer: document.referrer || 'Direct',
      
      // Device Info
      deviceType: this.getDeviceType(),
      deviceModel: this.getDeviceModel(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      orientation: this.getOrientation(),
      
      // Browser Info
      browserName: this.getBrowserName(),
      browserVersion: this.getBrowserVersion(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack === '1',
      
      // OS Info
      osName: this.getOSName(),
      osVersion: this.getOSVersion(),
      
      // Connection Info
      connectionType: this.getConnectionType(),
      onlineStatus: navigator.onLine,
      
      // Location Info (approximate, no personal data)
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      region: this.getRegion(),
      
      // Performance Info
      loadTime: this.getLoadTime(),
      
      // Features Support
      features: this.getSupportedFeatures()
    };

    this.saveEnhancedEvent('enhancedPageView', data);
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

  // Get device model (approximate)
  getDeviceModel() {
    const ua = navigator.userAgent;
    if (ua.includes('iPhone')) return 'iPhone';
    if (ua.includes('iPad')) return 'iPad';
    if (ua.includes('Android')) {
      const match = ua.match(/Android.*?;\s*(.*?)\s*Build/);
      return match ? match[1] : 'Android Device';
    }
    return 'Unknown';
  }

  // Get orientation
  getOrientation() {
    return window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait';
  }

  // Get browser name
  getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    if (ua.includes('Trident')) return 'Internet Explorer';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return 'Unknown';
  }

  // Get browser version
  getBrowserVersion() {
    const ua = navigator.userAgent;
    const match = ua.match(/(Firefox|Chrome|Safari|Opera|Edg|Trident)\/(\d+)/);
    return match ? match[2] : 'Unknown';
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

  // Get OS version
  getOSVersion() {
    const ua = navigator.userAgent;
    let match;
    
    if (ua.includes('Windows NT')) {
      match = ua.match(/Windows NT (\d+\.\d+)/);
      return match ? match[1] : 'Unknown';
    }
    if (ua.includes('Mac OS X')) {
      match = ua.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
      return match ? match[1].replace(/_/g, '.') : 'Unknown';
    }
    if (ua.includes('Android')) {
      match = ua.match(/Android (\d+\.\d+)/);
      return match ? match[1] : 'Unknown';
    }
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
      match = ua.match(/OS (\d+_\d+)/);
      return match ? match[1].replace(/_/g, '.') : 'Unknown';
    }
    
    return 'Unknown';
  }

  // Get connection type
  getConnectionType() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType || 'Unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        saveData: connection.saveData || false
      };
    }
    return { effectiveType: 'Unknown' };
  }

  // Get region (timezone-based)
  getRegion() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone.split('/')[0]; // e.g., "America", "Europe", "Asia"
  }

  // Get page load time
  getLoadTime() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      return timing.loadEventEnd - timing.navigationStart;
    }
    return 0;
  }

  // Get supported features
  getSupportedFeatures() {
    return {
      localStorage: typeof(Storage) !== 'undefined',
      sessionStorage: typeof(Storage) !== 'undefined',
      webGL: this.hasWebGL(),
      webWorkers: typeof(Worker) !== 'undefined',
      serviceWorker: 'serviceWorker' in navigator,
      geolocation: 'geolocation' in navigator,
      notifications: 'Notification' in window,
      touchScreen: 'ontouchstart' in window,
      webRTC: this.hasWebRTC(),
      webAssembly: typeof WebAssembly !== 'undefined'
    };
  }

  // Check WebGL support
  hasWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  // Check WebRTC support
  hasWebRTC() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || 
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  // Setup enhanced tracking
  setupEnhancedTracking() {
    // Track mouse movements (heatmap data)
    let mouseMovements = [];
    document.addEventListener('mousemove', (e) => {
      mouseMovements.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
      
      // Save every 100 movements
      if (mouseMovements.length >= 100) {
        this.saveEnhancedEvent('mouseMovements', {
          movements: mouseMovements,
          sessionId: this.sessionId
        });
        mouseMovements = [];
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.saveEnhancedEvent('scrollDepth', {
          depth: scrollPercent,
          sessionId: this.sessionId,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      this.saveEnhancedEvent('visibilityChange', {
        hidden: document.hidden,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });
    });

    // Track orientation changes
    window.addEventListener('orientationchange', () => {
      this.saveEnhancedEvent('orientationChange', {
        orientation: this.getOrientation(),
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });
    });

    // Track connection changes
    if (navigator.connection) {
      navigator.connection.addEventListener('change', () => {
        this.saveEnhancedEvent('connectionChange', {
          connectionType: this.getConnectionType(),
          sessionId: this.sessionId,
          timestamp: new Date().toISOString()
        });
      });
    }
  }

  // Track user behavior
  trackUserBehavior() {
    // Track form interactions
    document.addEventListener('focus', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.saveEnhancedEvent('formInteraction', {
          type: 'focus',
          field: e.target.name || e.target.id,
          sessionId: this.sessionId,
          timestamp: new Date().toISOString()
        });
      }
    }, true);

    // Track copy events
    document.addEventListener('copy', () => {
      this.saveEnhancedEvent('copyEvent', {
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });
    });

    // Track print events
    window.addEventListener('beforeprint', () => {
      this.saveEnhancedEvent('printEvent', {
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });
    });

    // Track errors
    window.addEventListener('error', (e) => {
      this.saveEnhancedEvent('jsError', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      });
    });
  }

  // Track performance metrics
  trackPerformance() {
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = window.performance.timing;
          const metrics = {
            // Navigation timing
            redirectTime: timing.redirectEnd - timing.redirectStart,
            dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
            tcpTime: timing.connectEnd - timing.connectStart,
            requestTime: timing.responseStart - timing.requestStart,
            responseTime: timing.responseEnd - timing.responseStart,
            domProcessingTime: timing.domComplete - timing.domLoading,
            domContentLoadedTime: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
            loadEventTime: timing.loadEventEnd - timing.loadEventStart,
            totalLoadTime: timing.loadEventEnd - timing.navigationStart,
            
            // Resource timing
            resources: this.getResourceTiming(),
            
            sessionId: this.sessionId,
            timestamp: new Date().toISOString()
          };
          
          this.saveEnhancedEvent('performanceMetrics', metrics);
        }, 0);
      });
    }
  }

  // Get resource timing
  getResourceTiming() {
    if (window.performance && window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource');
      return resources.map(r => ({
        name: r.name,
        type: r.initiatorType,
        duration: r.duration,
        size: r.transferSize
      })).slice(0, 50); // Limit to 50 resources
    }
    return [];
  }

  // Save enhanced event
  saveEnhancedEvent(eventType, data) {
    const events = this.getEnhancedEvents();
    events.push({
      eventType,
      ...data
    });

    // Keep only last 5000 events
    if (events.length > 5000) {
      events.shift();
    }

    localStorage.setItem('enhancedAnalytics', JSON.stringify(events));
  }

  // Get enhanced events
  getEnhancedEvents() {
    const events = localStorage.getItem('enhancedAnalytics');
    return events ? JSON.parse(events) : [];
  }

  // Get analytics summary
  static getSummary() {
    const events = JSON.parse(localStorage.getItem('enhancedAnalytics') || '[]');
    
    const summary = {
      totalEvents: events.length,
      uniqueSessions: new Set(events.map(e => e.sessionId)).size,
      deviceTypes: {},
      browsers: {},
      operatingSystems: {},
      screenResolutions: {},
      countries: {},
      avgLoadTime: 0,
      avgScrollDepth: 0,
      topPages: {},
      referrers: {}
    };

    events.forEach(event => {
      if (event.deviceType) {
        summary.deviceTypes[event.deviceType] = (summary.deviceTypes[event.deviceType] || 0) + 1;
      }
      if (event.browserName) {
        summary.browsers[event.browserName] = (summary.browsers[event.browserName] || 0) + 1;
      }
      if (event.osName) {
        summary.operatingSystems[event.osName] = (summary.operatingSystems[event.osName] || 0) + 1;
      }
      if (event.screenResolution) {
        summary.screenResolutions[event.screenResolution] = (summary.screenResolutions[event.screenResolution] || 0) + 1;
      }
      if (event.region) {
        summary.countries[event.region] = (summary.countries[event.region] || 0) + 1;
      }
      if (event.page) {
        summary.topPages[event.page] = (summary.topPages[event.page] || 0) + 1;
      }
      if (event.referrer) {
        summary.referrers[event.referrer] = (summary.referrers[event.referrer] || 0) + 1;
      }
    });

    return summary;
  }

  // Clear data
  static clearData() {
    localStorage.removeItem('enhancedAnalytics');
  }
}

// Initialize enhanced analytics
if (typeof window !== 'undefined') {
  window.enhancedAnalytics = new EnhancedAnalytics();
}
