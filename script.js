// ===== NAVIGATION ===== 
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Hide menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== SCROLL NAVIGATION ===== 
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active-link');
        } else {
            sectionsClass?.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

// ===== SCROLL HEADER ===== 
const scrollHeader = () => {
    const nav = document.getElementById('header');
    if (window.scrollY >= 50) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
};

window.addEventListener('scroll', scrollHeader);

// ===== STATISTICS COUNTER ===== 
const counters = document.querySelectorAll('.statistic__number');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;
    
    const statisticsSection = document.querySelector('.statistics');
    const sectionTop = statisticsSection.offsetTop;
    const sectionHeight = statisticsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition >= sectionTop + sectionHeight / 2) {
        hasAnimated = true;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounters);

// ===== SMOOTH SCROLLING ===== 
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM VALIDATION ===== 
const contactForm = document.getElementById('contact-form');
const formInputs = document.querySelectorAll('.form__input');
const formMessage = document.getElementById('form-message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// Validation functions
const validateName = (name) => {
    return name.trim().length >= 2;
};

const validateEmail = (email) => {
    return emailRegex.test(email.trim());
};

const validatePhone = (phone) => {
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateCompany = (company) => {
    return company.trim().length >= 2;
};

const validatePackageType = (packageType) => {
    return packageType !== '';
};

const validateQuantity = (quantity) => {
    return quantity > 0;
};

const validateProjectDetails = (details) => {
    return details.trim().length >= 10;
};

// Show error message
const showError = (inputId, message) => {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
};

// Hide error message
const hideError = (inputId) => {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
};

// Validate individual field
const validateField = (field) => {
    const fieldId = field.id;
    const fieldValue = field.value;
    let isValid = true;
    
    hideError(fieldId);
    
    switch (fieldId) {
        case 'name':
            if (!validateName(fieldValue)) {
                showError(fieldId, 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }
            break;
            
        case 'email':
            if (!validateEmail(fieldValue)) {
                showError(fieldId, 'Please enter a valid email address');
                isValid = false;
            }
            break;
            
        case 'phone':
            if (!validatePhone(fieldValue)) {
                showError(fieldId, 'Please enter a valid phone number');
                isValid = false;
            }
            break;
            
        case 'company':
            if (!validateCompany(fieldValue)) {
                showError(fieldId, 'Please enter a valid company name');
                isValid = false;
            }
            break;
            
        case 'package-type':
            if (!validatePackageType(fieldValue)) {
                showError(fieldId, 'Please select a package type');
                isValid = false;
            }
            break;
            
        case 'quantity':
            if (!validateQuantity(fieldValue)) {
                showError(fieldId, 'Please enter a valid quantity');
                isValid = false;
            }
            break;
            
        case 'project-details':
            if (!validateProjectDetails(fieldValue)) {
                showError(fieldId, 'Please provide more details (at least 10 characters)');
                isValid = false;
            }
            break;
    }
    
    return isValid;
};

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        formInputs.forEach(input => {
            const fieldValid = validateField(input);
            if (!fieldValid) {
                isFormValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // Show form message
        if (isFormValid) {
            // Simulate form submission
            showFormMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            
            // In a real application, you would send the form data to a server here
            // For now, we'll just simulate a successful submission
            console.log('Form submitted successfully!');
            
        } else {
            showFormMessage('error', 'Please fix the errors above and try again.');
        }
    });
}

// Show form message
const showFormMessage = (type, message) => {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

// ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('[data-aos]');
animateElements.forEach(element => {
    observer.observe(element);
});

// ===== LOADING ANIMATION ===== 
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== PERFORMANCE OPTIMIZATIONS ===== 
// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
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

images.forEach(img => imageObserver.observe(img));

// ===== ACCESSIBILITY IMPROVEMENTS ===== 
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// Focus management
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const trapFocus = (element) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
};

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        delay: 0,
        easing: 'ease-in-out'
    });
}

// ===== UTILITY FUNCTIONS ===== 
// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
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
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    scrollActive();
    scrollHeader();
    animateCounters();
}, 100));

// ===== ERROR HANDLING ===== 
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to a logging service
});

// ===== CONSOLE WELCOME MESSAGE ===== 
console.log('%c🎉 Welcome to Crystal Packaging!', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'color: #7F8C8D; font-size: 12px;');