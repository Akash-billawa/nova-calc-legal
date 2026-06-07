/**
 * NovaCalc Website - Optimized Performance Version
 * Smooth animations, lag-free interactions, and polished UI
 */

// ============================================================================
// PERFORMANCE OPTIMIZED CORE
// ============================================================================

(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.__novaCalcInitialized) return;
  window.__novaCalcInitialized = true;

  // ============================================================================
  // OPTIMIZED THEME MANAGER
  // ============================================================================

  const ThemeManager = {
    init() {
      const toggle = document.getElementById('themeToggle');
      if (!toggle) return;

      // Prevent duplicate initialization
      if (toggle.dataset.themeInitialized === 'true') return;
      toggle.dataset.themeInitialized = 'true';

      const icon = toggle.querySelector('i');
      
      // Only set theme if not already set by inline script (FOUC prevention)
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (!currentTheme) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (icon) {
          icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
      }

      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        
        if (icon) {
          icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
      });
    }
  };

  // ============================================================================
  // OPTIMIZED SCROLL PROGRESS
  // ============================================================================

  const ScrollProgress = {
    init() {
      const progressBar = document.querySelector('.scroll-progress');
      if (!progressBar) return;

      let ticking = false;

      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(percent, 100)}%`;
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress);
          ticking = true;
        }
      }, { passive: true });

      // Initial update
      requestAnimationFrame(updateProgress);
    }
  };

  // ============================================================================
  // SMOOTH ANIMATIONS - OPTIMIZED
  // ============================================================================

  const SmoothAnimations = {
    init() {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Use CSS transitions instead of JS for better performance
      this.setupCSSTransitions();
      
      // Lightweight intersection observer
      this.setupIntersectionObserver();
    },

    setupCSSTransitions() {
      // Add smooth CSS transitions to all interactive elements
      const style = document.createElement('style');
      style.textContent = `
        .glass, .feature, .panel, .kpi, .btn, .pill, .footer-links a, .footer-social a {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.4s ease-out,
                      box-shadow 0.3s ease,
                      background 0.3s ease;
        }
        
        .feature {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.5s ease-out,
                      box-shadow 0.3s ease,
                      background 0.3s ease;
        }

        .hero, .panel {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.6s ease-out;
        }

        /* Smooth hover effects */
        .glass:hover {
          transform: translateY(-4px);
        }

        .feature:hover {
          transform: translateY(-6px) scale(1.01);
        }

        /* Staggered animation for features */
        .features .feature:nth-child(1) { animation-delay: 0.1s; }
        .features .feature:nth-child(2) { animation-delay: 0.2s; }
        .features .feature:nth-child(3) { animation-delay: 0.3s; }

        .grid .feature:nth-child(1) { animation-delay: 0.1s; }
        .grid .feature:nth-child(2) { animation-delay: 0.15s; }
        .grid .feature:nth-child(3) { animation-delay: 0.2s; }

        /* Smooth opacity transitions */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          will-change: transform, opacity;
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* GPU acceleration for smooth animations */
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced button transitions */
        .btn {
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }

        .btn:active::before {
          width: 300px;
          height: 300px;
        }

        /* Smooth theme toggle */
        .theme-toggle {
          transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }

        .theme-toggle:hover {
          transform: scale(1.1) rotate(5deg);
        }

        /* Smooth navigation pills */
        .pill {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .pill:hover {
          transform: translateY(-2px);
        }

        /* Smooth footer links */
        .footer-links a, .footer-social a {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Smooth feature icons */
        .feature-icon {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.3s ease;
        }

        .feature:hover .feature-icon {
          transform: scale(1.1) rotate(-3deg);
        }

        /* Smooth ambient glow */
        .ambient-glow {
          transition: transform 0.8s ease-out, opacity 0.8s ease-out;
        }
      `;
      document.head.appendChild(style);
    },

    setupIntersectionObserver() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          el.classList.add('visible');
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Remove GPU hint after animation completes
            setTimeout(() => {
              entry.target.classList.remove('animating');
            }, 700);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe elements, but skip those already animated by inline scripts
      document.querySelectorAll('.glass, .feature, .panel, .kpi').forEach(el => {
        // Skip if inline script already set up animations
        if (el.style.opacity === '0' || el.style.transition) return;
        
        el.classList.add('animate-on-scroll', 'animating');
        observer.observe(el);
      });
    }
  };

  // ============================================================================
  // OPTIMIZED PARALLAX - LAG FREE
  // ============================================================================

  const ParallaxEffect = {
    init() {
      const glow = document.querySelector('.ambient-glow');
      if (!glow) return;

      let ticking = false;
      let lastX = 0;
      let lastY = 0;

      const updateParallax = (e) => {
        if (e.touches) {
          lastX = e.touches[0].clientX;
          lastY = e.touches[0].clientY;
        } else {
          lastX = e.clientX;
          lastY = e.clientY;
        }

        const x = (lastX / window.innerWidth - 0.5) * 15;
        const y = (lastY / window.innerHeight - 0.5) * 15;

        glow.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        ticking = false;
      };

      const handleMove = (e) => {
        if (!ticking) {
          requestAnimationFrame(() => updateParallax(e));
          ticking = true;
        }
      };

      // Use passive event listener for better performance
      document.addEventListener('mousemove', handleMove, { passive: true });
      document.addEventListener('touchmove', handleMove, { passive: true });
    }
  };

  // ============================================================================
  // NAVIGATION MANAGER
  // ============================================================================

  const NavigationManager = {
    init() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      document.querySelectorAll('.pill').forEach(pill => {
        const href = pill.getAttribute('href');
        if (href === currentPage) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // Note: Smooth scroll for anchor links is handled by SmoothScroll module
    }
  };

  // ============================================================================
  // ENHANCED BUTTON INTERACTIONS
  // ============================================================================

  const ButtonEnhancements = {
    init() {
      // Add loading state support
      this.addLoadingStyles();

      // Button click feedback
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          if (this.tagName === 'A' && this.getAttribute('href')) {
            // External link - add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
              this.style.transform = '';
            }, 150);
          }
        });
      });
    },

    addLoadingStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .btn.loading {
          pointer-events: none;
          opacity: 0.8;
        }
        
        .btn.loading::after {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-left: 8px;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: btn-spin 0.6s linear infinite;
        }

        @keyframes btn-spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ============================================================================
  // SMOOTH SCROLL FOR PAGE
  // ============================================================================

  const SmoothScroll = {
    init() {
      // Add smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
              e.preventDefault();
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }
  };

  // ============================================================================
  // PERFORMANCE MONITORING
  // ============================================================================

  const PerformanceMonitor = {
    init() {
      // Log performance metrics on load
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (window.performance) {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ NovaCalc loaded in ${loadTime}ms`, 'color: #5b8ff9; font-weight: bold;');
          }
        }, 0);
      });
    }
  };

  // ============================================================================
  // KEYBOARD SHORTCUTS
  // ============================================================================

  const KeyboardShortcuts = {
    init() {
      document.addEventListener('keydown', (e) => {
        // Alt + T: Toggle theme
        if (e.altKey && e.key === 't') {
          e.preventDefault();
          document.getElementById('themeToggle')?.click();
        }
        
        // Escape: Scroll to top
        if (e.key === 'Escape') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  };

  // ============================================================================
  // COPYRIGHT YEAR
  // ============================================================================

  const CopyrightYear = {
    init() {
      const yearElements = document.querySelectorAll('#year, [data-year]');
      const currentYear = new Date().getFullYear();
      yearElements.forEach(el => {
        el.textContent = currentYear;
      });
    }
  };

  // ============================================================================
  // SKIP LINK INJECTION
  // Adds a "Skip to main content" link for keyboard / screen-reader users
  // if the page didn't already ship one.
  // ============================================================================

  const SkipLink = {
    init() {
      if (document.querySelector('.skip-link')) return;

      const main = document.querySelector('main');
      if (!main) return;
      if (!main.id) main.id = 'main';

      const link = document.createElement('a');
      link.className = 'skip-link';
      link.href = '#' + main.id;
      link.textContent = 'Skip to content';
      document.body.insertBefore(link, document.body.firstChild);
    }
  };

  // ============================================================================
  // MOBILE NAVIGATION
  // Injects a hamburger button into the topbar, collapses the nav into a
  // slide-down panel below it, and wires up close-on-link / ESC / outside-click.
  // Single source of truth for mobile nav across every page.
  // ============================================================================

  const MobileNav = {
    _overlayEl: null,
    _toggleEl: null,
    _pillsEl: null,
    _themeBtnEl: null,

    init() {
      const topbar = document.querySelector('.topbar');
      const pills = document.querySelector('.nav-pills');
      if (!topbar || !pills) return;
      if (document.getElementById('mobileNavToggle')) return;

      this._pillsEl = pills;
      if (!pills.id) pills.id = 'primaryNav';

      // 1) Inject the hamburger toggle before the pills.
      this._toggleEl = document.createElement('button');
      this._toggleEl.id = 'mobileNavToggle';
      this._toggleEl.className = 'mobile-nav-toggle';
      this._toggleEl.type = 'button';
      this._toggleEl.setAttribute('aria-label', 'Open navigation menu');
      this._toggleEl.setAttribute('aria-expanded', 'false');
      this._toggleEl.setAttribute('aria-controls', pills.id);
      this._toggleEl.innerHTML =
        '<i class="fas fa-bars" aria-hidden="true"></i>' +
        '<i class="fas fa-times" aria-hidden="true"></i>';
      topbar.insertBefore(this._toggleEl, pills);

      // 2) Inject a backdrop overlay behind the menu.
      this._overlayEl = document.createElement('div');
      this._overlayEl.className = 'mobile-nav-overlay';
      this._overlayEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(this._overlayEl);

      // 3) Move a copy of the theme toggle INTO the menu for one-handed
      //    access on mobile. Keep the original in the topbar for desktop.
      const existingThemeBtn = topbar.querySelector('.theme-toggle');
      if (existingThemeBtn) {
        const menuToggle = document.createElement('button');
        menuToggle.type = 'button';
        menuToggle.className = 'theme-toggle-mobile';
        menuToggle.innerHTML =
          '<span><i class="fas fa-circle-half-stroke" aria-hidden="true"></i> Theme</span>' +
          '<span class="theme-state">' +
          (document.documentElement.getAttribute('data-theme') === 'dark' ? 'Dark' : 'Light') +
          '</span>';
        menuToggle.addEventListener('click', () => {
          existingThemeBtn.click();
          const next = document.documentElement.getAttribute('data-theme');
          menuToggle.querySelector('.theme-state').textContent =
            next === 'dark' ? 'Dark' : 'Light';
        });
        pills.appendChild(menuToggle);
      }

      // 4) Wire up open / close.
      this._toggleEl.addEventListener('click', () => this.toggle());
      this._overlayEl.addEventListener('click', () => this.close());

      // Close after the user picks a destination.
      pills.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => this.close());
      });

      // Close on Escape, return focus to the toggle.
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
          if (this._toggleEl) this._toggleEl.focus();
        }
      });

      // Auto-close if the viewport grows past the mobile breakpoint while
      // the menu is open (e.g. user rotates tablet to landscape).
      const mql = window.matchMedia('(min-width: 769px)');
      const onMqlChange = (ev) => { if (ev.matches && this.isOpen()) this.close(); };
      if (mql.addEventListener) mql.addEventListener('change', onMqlChange);
      else if (mql.addListener) mql.addListener(onMqlChange);
    },

    isOpen() {
      return this._pillsEl && this._pillsEl.classList.contains('open');
    },

    open() {
      if (!this._pillsEl) return;
      this._pillsEl.classList.add('open');
      this._overlayEl && this._overlayEl.classList.add('visible');
      document.body.classList.add('nav-open');
      this._toggleEl.setAttribute('aria-expanded', 'true');
      this._toggleEl.setAttribute('aria-label', 'Close navigation menu');
    },

    close() {
      if (!this._pillsEl) return;
      this._pillsEl.classList.remove('open');
      this._overlayEl && this._overlayEl.classList.remove('visible');
      document.body.classList.remove('nav-open');
      this._toggleEl.setAttribute('aria-expanded', 'false');
      this._toggleEl.setAttribute('aria-label', 'Open navigation menu');
    },

    toggle() { this.isOpen() ? this.close() : this.open(); }
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  const App = {
    init() {
      // Initialize all modules
      ThemeManager.init();
      SkipLink.init();
      MobileNav.init();
      ScrollProgress.init();
      SmoothAnimations.init();
      ParallaxEffect.init();
      NavigationManager.init();
      ButtonEnhancements.init();
      SmoothScroll.init();
      PerformanceMonitor.init();
      KeyboardShortcuts.init();
      CopyrightYear.init();

      // Add loaded class for CSS animations
      document.body.classList.add('loaded');

      // Log initialization
      console.log('%c✨ NovaCalc Website Optimized', 'color: #5b8ff9; font-size: 16px; font-weight: bold;');
    }
  };

  // ============================================================================
  // START APPLICATION
  // ============================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

})();