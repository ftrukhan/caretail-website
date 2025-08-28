// Browser capability detection and fallbacks
document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports background-clip: text
    const testEl = document.createElement('div');
    testEl.style.cssText = '-webkit-background-clip: text; background-clip: text;';
    
    if (!testEl.style.backgroundClip && !testEl.style.webkitBackgroundClip) {
        document.documentElement.classList.add('no-backgroundclip');
    }
    
    // Force fallback color for gradient text if needed
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(el => {
        // Test if the gradient is actually working
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(el);
            const color = computedStyle.color;
            
            // If color is not transparent, gradient might not be working
            if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
                el.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                el.style.webkitBackgroundClip = 'text';
                el.style.webkitTextFillColor = 'transparent';
                el.style.backgroundClip = 'text';
                el.style.color = 'transparent';
                
                // Final fallback
                setTimeout(() => {
                    const finalStyle = window.getComputedStyle(el);
                    if (finalStyle.color !== 'rgba(0, 0, 0, 0)' && finalStyle.color !== 'transparent') {
                        el.style.background = 'none';
                        el.style.color = '#667eea';
                        el.style.fontWeight = 'bold';
                    }
                }, 100);
            }
        }, 50);
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.style.display = 'none';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .about-content, .cta-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Email form functionality
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.querySelector('.cta-form');
    const emailInput = document.querySelector('.email-input');
    const submitBtn = emailForm.querySelector('.btn-primary');
    
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate form submission
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! We\'ll notify you when CareTail launches! 🐾', 'success');
                emailInput.value = '';
                submitBtn.textContent = 'Get Early Access';
                submitBtn.disabled = false;
            }, 1000);
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
    
    // Also handle button click
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        emailForm.dispatchEvent(new Event('submit'));
    });
});

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            background: #4CAF50;
            color: white;
        }
        
        .notification-error {
            background: #f44336;
            color: white;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
        }
        
        .notification-message {
            flex: 1;
            margin-right: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Handle all "Get Early Access" buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    const emailInput = document.querySelector('.email-input');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Get Early Access')) {
            button.addEventListener('click', function(e) {
                // If button is not in the form, scroll to email form
                if (!button.closest('.cta-form')) {
                    e.preventDefault();
                    const ctaSection = document.querySelector('.cta');
                    if (ctaSection) {
                        ctaSection.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                            if (emailInput) {
                                emailInput.focus();
                            }
                        }, 500);
                    }
                }
            });
        }
    });
});

// Demo button functionality
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('.btn-secondary');
    
    demoButtons.forEach(button => {
        if (button.textContent.includes('Watch Demo')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Demo video coming soon! Sign up to be notified when it\'s ready. 🎥', 'info');
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const phoneSlowMultiplier = 0.5;
    
    if (hero) {
        const phoneElement = document.querySelector('.phone-mockup');
        if (phoneElement) {
            phoneElement.style.transform = `translateY(${scrolled * phoneSlowMultiplier}px)`;
        }
    }
});

// Hero title appears immediately without typing effect

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.hasAttribute('data-animated')) {
                    stat.setAttribute('data-animated', 'true');
                    stat.textContent = '0';
                    animateCounter(stat, number);
                    
                    // Add back the suffix (K+, etc.)
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});