// ===== MAIN APPLICATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initActiveNavigation();
    initMobileMenu();
    initContactHandlers();
    initThemeToggle();
    initPreloader();
    initLazyLoading();
    initFormValidation();
    
    console.log('🎮 Portfolio initialized successfully!');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ===== ACTIVE NAVIGATION =====
function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== CONTACT HANDLERS =====
function initContactHandlers() {
    // Email contact
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            showNotification('Opening email client...', 'info');
        });
    });
    
    // Phone contact
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            showNotification('Opening dialer...', 'info');
        });
    });
    
    // Copy to clipboard functionality
    const contactItems = document.querySelectorAll('.contact-card');
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const text = item.querySelector('p').textContent;
            if (text && text !== 'Connect with me') {
                copyToClipboard(text);
            }
        });
    });
}

// ===== CLIPBOARD FUNCTIONALITY =====
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification(`Copied: ${text}`, 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification(`Copied: ${text}`, 'success');
        } catch (fallbackErr) {
            showNotification('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 5px;
        border-left: 4px solid var(--accent-green);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        max-width: 300px;
    `;
    
    // Set border color based on type
    switch (type) {
        case 'success':
            notification.style.borderLeftColor = 'var(--accent-green)';
            break;
        case 'error':
            notification.style.borderLeftColor = '#ff4444';
            break;
        case 'warning':
            notification.style.borderLeftColor = '#ffaa00';
            break;
        default:
            notification.style.borderLeftColor = 'var(--accent-cyan)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    // Optional: Add theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            showNotification(`Switched to ${newTheme} theme`, 'info');
        });
    }
}

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">&lt;KIANN/&gt;</div>
            <div class="preloader-text">Loading Portfolio...</div>
            <div class="preloader-progress">
                <div class="preloader-bar"></div>
            </div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    // Simulate loading progress
    const progressBar = preloader.querySelector('.preloader-bar');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 500);
            }, 500);
        }
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }, 100);
    
    // Add preloader styles
    const preloaderCSS = `
        .preloader-content {
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .preloader-logo {
            font-size: 2rem;
            font-weight: 700;
            color: var(--accent-green);
            text-shadow: 0 0 10px var(--accent-green);
            margin-bottom: 1rem;
            animation: pulse 2s infinite;
        }
        
        .preloader-text {
            color: var(--text-secondary);
            margin-bottom: 2rem;
            font-size: 1rem;
        }
        
        .preloader-progress {
            width: 200px;
            height: 4px;
            background: var(--bg-secondary);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .preloader-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
            width: 0%;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px var(--accent-green);
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = preloaderCSS;
    document.head.appendChild(style);
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const backgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.backgroundImage = `url(${element.dataset.bg})`;
                element.classList.remove('lazy-bg');
                backgroundObserver.unobserve(element);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyBackgrounds.forEach(bg => backgroundObserver.observe(bg));
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (validateForm(data)) {
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });
}

function validateForm(data) {
    const required = ['name', 'email', 'message'];
    return required.every(field => data[field] && data[field].trim() !== '');
}

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Monitor performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🚀 Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('⚠️ Page load time is slow, consider optimization');
            }
        }
    });
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
                console.warn('⚠️ High memory usage detected');
            }
        }, 30000);
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('An error occurred. Please try again.', 'error');
});

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== ANALYTICS TRACKING =====
function trackEvent(category, action, label) {
    // Google Analytics tracking (if implemented)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for development
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
}

function activateEasterEgg() {
    showNotification('🎮 Konami Code activated! Extra gaming mode enabled!', 'success', 5000);
    
    // Add special effects
    document.body.style.filter = 'hue-rotate(45deg)';
    setTimeout(() => {
        document.body.style.filter = '';
    }, 3000);
    
    trackEvent('EasterEgg', 'KonamiCode', 'Activated');
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initPerformanceMonitoring();
    initKeyboardNavigation();
    initEasterEggs();
});

// ===== EXPORT FUNCTIONS =====
window.PortfolioApp = {
    showNotification,
    copyToClipboard,
    trackEvent,
    debounce,
    throttle
};