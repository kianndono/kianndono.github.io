// ===== ANIMATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });

    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize particle system
    initParticleSystem();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize loading animations
    initLoadingAnimations();
});

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent-green)';
        
        setTimeout(() => {
            new Typed(element, {
                strings: [text],
                typeSpeed: 50,
                showCursor: true,
                cursorChar: '|',
                onComplete: function() {
                    // Add glow effect when typing is complete
                    element.style.textShadow = '0 0 10px var(--accent-green)';
                }
            });
        }, 1000 + (index * 500));
    });
}

// ===== PARTICLE SYSTEM =====
function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
    
    // Continuously create new particles
    setInterval(() => {
        if (particleContainer.children.length < 30) {
            createParticle(particleContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
    
    // Random size
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    particle.addEventListener('animationend', () => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger animation to child elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // Progressive reveal for cards
    const cards = document.querySelectorAll('.card, .project-card, .skill-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        observer.observe(card);
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card, .project-card, .skill-item, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create ripple effect
            createRippleEffect(card);
            
            // Add floating animation
            card.style.animation = 'float 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove floating animation
            card.style.animation = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.pixel-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s ease-in-out infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = button.classList.contains('pulse') ? 'btnPulse 2s infinite' : '';
        });
    });
    
    // Navigation link effects
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'neonGlow 1s ease-in-out infinite';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.animation = '';
        });
    });
}

// ===== RIPPLE EFFECT =====
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 65, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// ===== LOADING ANIMATIONS =====
function initLoadingAnimations() {
    // Simulate loading for dynamic content
    const loadingElements = document.querySelectorAll('[data-loading]');
    
    loadingElements.forEach(element => {
        element.classList.add('loading');
        
        setTimeout(() => {
            element.classList.remove('loading');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, parseInt(element.dataset.loading) || 1000);
    });
}

// ===== GLITCH EFFECT =====
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Random glitch intervals
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 0.3s ease-in-out';
            }, 10);
        }, Math.random() * 5000 + 3000);
    });
}

// ===== PARALLAX SCROLLING =====
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== INTERSECTION OBSERVER ANIMATIONS =====
function createIntersectionObserver(elements, className, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(element => observer.observe(element));
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeAnimations() {
    // Reduce animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          navigator.deviceMemory <= 2 || 
                          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice) {
        document.documentElement.style.setProperty('--transition-fast', '0.1s ease');
        document.documentElement.style.setProperty('--transition-smooth', '0.2s ease');
        
        // Disable particle system on low-end devices
        const particles = document.querySelector('.particles');
        if (particles) particles.remove();
    }
}

// ===== SCROLL TO TOP BUTTON =====
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top pixel-btn';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition-fast);
        width: 50px;
        height: 50px;
        border-radius: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATION UTILITIES =====
function animateCSS(element, animationName, callback) {
    element.classList.add('animate__animated', `animate__${animationName}`);
    
    function handleAnimationEnd() {
        element.classList.remove('animate__animated', `animate__${animationName}`);
        element.removeEventListener('animationend', handleAnimationEnd);
        if (typeof callback === 'function') callback();
    }
    
    element.addEventListener('animationend', handleAnimationEnd);
}

function staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// ===== INITIALIZE ALL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    optimizeAnimations();
    initGlitchEffect();
    initParallaxScrolling();
    initScrollToTop();
});

// ===== EXPORT FUNCTIONS =====
window.AnimationController = {
    animateCSS,
    staggerAnimation,
    createRippleEffect,
    createIntersectionObserver
};