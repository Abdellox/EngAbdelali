/**
 * ═══════════════════════════════════════════════════════════════════════
 * Portfolio Protection Script
 * Copyright © 2025 Abdel Ali. All Rights Reserved.
 * ═══════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // Disable right-click context menu (gentle deterrent)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Right-click is disabled. Please contact me if you\'d like to collaborate!');
  });

  // Disable common keyboard shortcuts for viewing source
  document.addEventListener('keydown', function(e) {
    // Ctrl+U (View Source), Ctrl+Shift+I (DevTools), F12 (DevTools)
    if (
      (e.ctrlKey && e.key === 'u') ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      e.key === 'F12'
    ) {
      e.preventDefault();
      showNotification('Developer tools are restricted. Interested in my code? Let\'s talk!');
    }

    // Ctrl+S (Save page)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      showNotification('Saving is disabled. Contact me for collaboration opportunities!');
    }

    // Ctrl+Shift+C (Inspect element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
    }
  });

  // Detect DevTools opening (advanced detection)
  let devtoolsOpen = false;
  const threshold = 160;

  setInterval(function() {
    if (window.outerWidth - window.innerWidth > threshold || 
        window.outerHeight - window.innerHeight > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        console.clear();
        console.log('%c⚠️ NOTICE', 'font-size: 24px; font-weight: bold; color: #ef4444;');
        console.log('%cThis website and its code are protected by copyright.', 'font-size: 16px; color: #64748b;');
        console.log('%c', 'font-size: 12px;');
        console.log('%c📧 Interested in collaboration? Contact: abdel.ali@example.com', 'font-size: 14px; color: #10b981;');
        console.log('%c🤝 I\'m open to discussing projects and opportunities!', 'font-size: 14px; color: #6366f1;');
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);

  // Disable text selection (optional - can be annoying, so kept light)
  // Uncomment if you want to enable:
  // document.addEventListener('selectstart', function(e) {
  //   if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
  //     e.preventDefault();
  //   }
  // });

  // Watermark in console
  console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzYzNjZmMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+QWJkZWwgQWxpPC90ZXh0Pjwvc3ZnPg==") no-repeat;');

  // Notification function
  function showNotification(message) {
    // Check if notification already exists
    if (document.querySelector('.protection-notification')) return;

    const notification = document.createElement('div');
    notification.className = 'protection-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        max-width: 350px;
        animation: slideIn 0.3s ease-out;
      ">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 24px;">🔒</span>
          <div>
            <strong style="display: block; margin-bottom: 4px;">Protected Content</strong>
            <p style="margin: 0; font-size: 14px; opacity: 0.95;">${message}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Add copyright watermark to page
  const watermark = document.createElement('div');
  watermark.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 10px;
    color: rgba(0,0,0,0.3);
    pointer-events: none;
    z-index: 9999;
    font-family: monospace;
  `;
  watermark.textContent = '© 2025 Abdel Ali';
  document.body.appendChild(watermark);

  // Log protection status
  console.log('%c🛡️ Protection Active', 'font-size: 12px; color: #10b981; font-weight: bold;');
  console.log('%cThis portfolio is protected by copyright law.', 'font-size: 11px; color: #64748b;');

})();
