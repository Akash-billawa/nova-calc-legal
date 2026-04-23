/**
 * NovaCalc Website - Industry-Level Enhancements
 * Advanced interactions, animations, and functionality
 */

// ============================================================================
// CORE UTILITIES
// ============================================================================

const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  smoothScrollTo(element, offset = 0) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.html = document.documentElement;
    this.icon = this.themeToggle?.querySelector('i');
    this.init();
  }

  init() {
    if (!this.themeToggle) return;

    // Load saved theme immediately
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme, false);

    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light', true);
        }
      });
    }
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, true);
  }

  setTheme(theme, animate = true) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateIcon(theme);

    if (animate) {
      this.animateThemeTransition();
    }
  }

  updateIcon(theme) {
    if (!this.icon) return;
    this.icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  animateThemeTransition() {
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
}

// ============================================================================
// SCROLL PROGRESS BAR
// ============================================================================

class ScrollProgress {
  constructor() {
    this.progressBar = document.querySelector('.scroll-progress');
    this.init();
  }

  init() {
    if (!this.progressBar) return;

    const updateProgress = Utils.throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }, 10);

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
  }
}

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================

class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Optionally unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.glass, .feature, .panel, .kpi');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      observer.observe(el);
    });
  }
}

// ============================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#main') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            Utils.smoothScrollTo(target, 100);
          }
        }
      });
    });
  }
}

// ============================================================================
// NAVIGATION ACTIVE STATE
// ============================================================================

class NavigationManager {
  constructor() {
    this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.init();
  }

  init() {
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
      const href = pill.getAttribute('href');
      if (href === this.currentPage) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }
}

// ============================================================================
// PARALLAX EFFECT FOR AMBIENT GLOW
// ============================================================================

class ParallaxEffect {
  constructor() {
    this.ambientGlow = document.querySelector('.ambient-glow');
    this.init();
  }

  init() {
    if (!this.ambientGlow) return;

    const handleParallax = Utils.throttle((e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;
      
      this.ambientGlow.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }, 50);

    document.addEventListener('mousemove', handleParallax);
  }
}

// ============================================================================
// ENHANCED BUTTON INTERACTIONS
// ============================================================================

class ButtonEnhancements {
  constructor() {
    this.init();
  }

  init() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .pill, .theme-toggle').forEach(button => {
      button.addEventListener('click', this.createRipple);
    });

    // Add loading state capability
    this.setupLoadingStates();
  }

  createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  setupLoadingStates() {
    // Add data-loading attribute support for buttons
    const style = document.createElement('style');
    style.textContent = `
      .btn[data-loading="true"] {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }
      .btn[data-loading="true"]::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: button-spin 0.6s linear infinite;
      }
      @keyframes button-spin {
        to { transform: rotate(360deg); }
      }
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================================
// FORM VALIDATION (for contact page)
// ============================================================================

class FormValidator {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
      
      // Real-time validation
      form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearError(field));
      });
    });
  }

  handleSubmit(e, form) {
    e.preventDefault();
    
    let isValid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm(form);
    }
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, message) {
    this.clearError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  clearError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.setAttribute('data-loading', 'true');
    }

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (submitButton) {
      submitButton.removeAttribute('data-loading');
    }

    // Show success message
    this.showSuccessMessage(form);
  }

  showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = 'Thank you! Your message has been sent successfully.';
    successDiv.style.cssText = `
      padding: 16px;
      margin-top: 16px;
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
      border: 1px solid rgba(76, 175, 80, 0.3);
      border-radius: 12px;
      color: #4CAF50;
      text-align: center;
      animation: slideIn 0.3s ease-out;
    `;
    form.appendChild(successDiv);
    form.reset();

    setTimeout(() => successDiv.remove(), 5000);
  }
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Observer not supported
      }
    }

    // Log page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
      }, 0);
    });
  }
}

// ============================================================================
// LAZY LOADING FOR IMAGES
// ============================================================================

class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      this.images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      this.images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
}

// ============================================================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ============================================================================

class KeyboardNavigation {
  constructor() {
    this.init();
  }

  init() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Alt + T: Toggle theme
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        document.getElementById('themeToggle')?.click();
      }

      // Escape: Close any open modals or overlays
      if (e.key === 'Escape') {
        this.closeOverlays();
      }
    });

    // Improve focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  closeOverlays() {
    // Close any open overlays (implement as needed)
    const overlays = document.querySelectorAll('[data-overlay]');
    overlays.forEach(overlay => overlay.classList.remove('active'));
  }
}

// ============================================================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================================================

class ClipboardManager {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-copy]').forEach(element => {
      element.addEventListener('click', () => {
        const textToCopy = element.dataset.copy || element.textContent;
        this.copyToClipboard(textToCopy, element);
      });
    });
  }

  async copyToClipboard(text, element) {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopyFeedback(element);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  showCopyFeedback(element) {
    const originalText = element.textContent;
    element.textContent = 'Copied!';
    element.style.color = 'var(--accent)';
    
    setTimeout(() => {
      element.textContent = originalText;
      element.style.color = '';
    }, 2000);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  }

  initializeModules() {
    // Initialize all modules
    new ThemeManager();
    new ScrollProgress();
    new AnimationObserver();
    new SmoothScroll();
    new NavigationManager();
    new ParallaxEffect();
    new ButtonEnhancements();
    new FormValidator();
    new PerformanceMonitor();
    new LazyLoader();
    new KeyboardNavigation();
    new ClipboardManager();

    // Add loaded class to body
    document.body.classList.add('loaded');

    // Set copyright year
    const yearElements = document.querySelectorAll('#year, [data-year]');
    yearElements.forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // Log initialization
    console.log('%cNovaCalc Website Loaded', 'color: #5b8ff9; font-size: 16px; font-weight: bold;');
    console.log('%cIndustry-level enhancements active', 'color: #6fa0ff; font-size: 12px;');
  }
}

// Start the application
new App();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, Utils };
}
