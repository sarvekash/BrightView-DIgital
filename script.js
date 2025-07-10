// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    stat.textContent = '0' + text.replace(/\d/g, '');
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        statsObserver.observe(statsCard);
    }
});

// Form validation (for contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Testimonial slider functionality
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-card');
        this.init();
    }
    
    init() {
        if (this.slides.length > 3) {
            this.createSlider();
        }
    }
    
    createSlider() {
        // Add slider controls if there are more than 3 testimonials
        const container = document.querySelector('.testimonials-grid');
        container.style.overflow = 'hidden';
        container.style.display = 'flex';
        container.style.transition = 'transform 0.5s ease-in-out';
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.textAlign = 'center';
        dotsContainer.style.marginTop = '2rem';
        
        for (let i = 0; i < Math.ceil(this.slides.length / 3); i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: #d1d5db;
                margin: 0 5px;
                cursor: pointer;
                transition: background 0.3s ease;
            `;
            if (i === 0) dot.style.background = '#2563eb';
            
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        container.parentNode.appendChild(dotsContainer);
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        const container = document.querySelector('.testimonials-grid');
        const slideWidth = container.offsetWidth;
        container.style.transform = `translateX(-${index * slideWidth}px)`;
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === index ? '#2563eb' : '#d1d5db';
        });
    }
}

// Initialize testimonial slider
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});

// Make portfolio project links clickable
document.addEventListener('DOMContentLoaded', () => {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const project = link.getAttribute('data-project');
            alert(`Project link clicked: ${project}. You can update this to navigate to the actual project URL later.`);
        });
    });
});

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Contact form submission (placeholder)
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    
    if (validateForm(form)) {
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// Add event listeners for contact forms
document.addEventListener('DOMContentLoaded', () => {
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                .then(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, (error) => {
                    alert('Failed to send message. Please try again later.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    });
});

// Lazy loading for images
function lazyLoadImages() {
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
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations and effects
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading states for buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    };
}

// FAQ Accordion Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add form message container
    const formHeader = contactForm.querySelector('.form-header');
    if (formHeader && !document.querySelector('.form-message')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.innerHTML = '<i class="fas fa-check-circle"></i><span class="message-text"></span>';
        formHeader.insertAdjacentElement('afterend', messageDiv);
    }
    
    // Enhanced form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Add error message container
        if (!input.parentElement.querySelector('.error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement.appendChild(errorDiv);
        }
        
        // Real-time validation
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleEnhancedFormSubmission);
}

// Enhanced field validation
function validateField(field) {
    const formGroup = field.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Remove existing validation classes
    formGroup.classList.remove('error', 'success');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = `${field.previousElementSibling.textContent.replace('*', '')} is required`;
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // URL validation
    if (field.type === 'url' && field.value.trim()) {
        try {
            new URL(field.value);
        } catch {
            isValid = false;
            message = 'Please enter a valid URL (e.g., https://www.example.com)';
        }
    }
    
    // Apply validation state
    if (isValid && field.value.trim()) {
        formGroup.classList.add('success');
        if (!formGroup.querySelector('.success-icon')) {
            const successIcon = document.createElement('i');
            successIcon.className = 'fas fa-check success-icon';
            formGroup.appendChild(successIcon);
        }
    } else if (!isValid) {
        formGroup.classList.add('error');
        if (!formGroup.querySelector('.error-icon')) {
            const errorIcon = document.createElement('i');
            errorIcon.className = 'fas fa-exclamation-circle error-icon';
            formGroup.appendChild(errorIcon);
        }
    }
    
    // Update error message
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    
    return isValid;
}

// Enhanced form submission handler
function handleEnhancedFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.querySelector('.form-message');
    const messageText = formMessage?.querySelector('.message-text');
    
    // Validate all fields
    const formInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    // Check privacy policy checkbox
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        isFormValid = false;
        showFormMessage('error', 'Please accept the Privacy Policy and Terms of Service to continue.');
        return;
    }
    
    if (!isFormValid) {
        showFormMessage('error', 'Please correct the errors above and try again.');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success simulation
        showFormMessage('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
        form.reset();
        
        // Remove validation states
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
            const icons = group.querySelectorAll('.success-icon, .error-icon');
            icons.forEach(icon => icon.remove());
        });
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Scroll to success message
        formMessage?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    }, 2000);
}

// Show form message
function showFormMessage(type, message) {
    const formMessage = document.querySelector('.form-message');
    const messageText = formMessage?.querySelector('.message-text');
    const icon = formMessage?.querySelector('i');
    
    if (!formMessage || !messageText) return;
    
    // Update message content
    messageText.textContent = message;
    
    // Update icon and styling
    formMessage.className = `form-message ${type} show`;
    if (icon) {
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    }
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
}

// Enhanced form validation for all forms
function enhanceAllForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id === 'contactForm') return; // Skip contact form as it has special handling
        
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#d1d5db';
                }
                
                // Email validation
                if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.style.borderColor = '#ef4444';
                        isValid = false;
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
        });
    });
}

// Portfolio Filter Functionality
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        });
    });
}

// Portfolio Testimonial Slider (for portfolio page)
class PortfolioTestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Add event listeners for navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Add event listeners for dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play slider
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
}

// Language Toggle Functionality
let currentLanguage = 'en';

const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'Services': 'Services',
        'Portfolio': 'Portfolio',
        'About': 'About',
        'Contact': 'Contact',
        'Blog': 'Blog',
        'Get Started': 'Get Started',
        
        // Hero Section
        'Take Your Business Online with BrightWave Digital': 'Take Your Business Online with BrightWave Digital',
        'We help businesses grow their online presence through strategic digital marketing, web development, and data-driven solutions that deliver real results.': 'We help businesses grow their online presence through strategic digital marketing, web development, and data-driven solutions that deliver real results.',
        'Start Your Journey': 'Start Your Journey',
        'Our Services': 'Our Services',
        
        // Services
        'Our Digital Marketing Services': 'Our Digital Marketing Services',
        'Comprehensive solutions to boost your online presence and drive growth': 'Comprehensive solutions to boost your online presence and drive growth',
        'Web Development': 'Web Development',
        'Custom websites and web applications that convert visitors into customers': 'Custom websites and web applications that convert visitors into customers',
        'SEO Optimization': 'SEO Optimization',
        'Improve your search rankings and drive organic traffic to your website': 'Improve your search rankings and drive organic traffic to your website',
        'Social Media Marketing': 'Social Media Marketing',
        'Build brand awareness and engage with your audience across all platforms': 'Build brand awareness and engage with your audience across all platforms',
        'PPC Advertising': 'PPC Advertising',
        'Targeted ad campaigns that maximize ROI and drive qualified leads': 'Targeted ad campaigns that maximize ROI and drive qualified leads',
        'Content Marketing': 'Content Marketing',
        'Engaging content that tells your story and connects with your audience': 'Engaging content that tells your story and connects with your audience',
        'Email Marketing': 'Email Marketing',
        'Nurture leads and retain customers with personalized email campaigns': 'Nurture leads and retain customers with personalized email campaigns',
        
        // Why Choose Us
        'Why Choose BrightWave Digital?': 'Why Choose BrightWave Digital?',
        'Proven Results': 'Proven Results',
        'We\'ve helped hundreds of businesses increase their online revenue by an average of 150%': 'We\'ve helped hundreds of businesses increase their online revenue by an average of 150%',
        'Expert Founder': 'Expert Founder',
        'Certified digital marketing specialist who stays ahead of industry trends and best practices': 'Certified digital marketing specialist who stays ahead of industry trends and best practices',
        'Data-Driven Approach': 'Data-Driven Approach',
        'Every strategy is backed by comprehensive analytics and performance tracking': 'Every strategy is backed by comprehensive analytics and performance tracking',
        'Personal Support': 'Personal Support',
        'Direct access to the founder with dedicated support for all your business needs': 'Direct access to the founder with dedicated support for all your business needs',
        
        // Stats
        'Happy Clients': 'Happy Clients',
        'Average ROI Increase': 'Average ROI Increase',
        'Projects Delivered': 'Projects Delivered',
        'Client Satisfaction': 'Client Satisfaction',
        
        // Testimonials
        'What Our Clients Say': 'What Our Clients Say',
        'Real results from real businesses': 'Real results from real businesses',
        
        // CTA
        'Ready to Grow Your Business Online?': 'Ready to Grow Your Business Online?',
        'Let\'s discuss how we can help you achieve your digital marketing goals': 'Let\'s discuss how we can help you achieve your digital marketing goals',
        'Get Free Consultation': 'Get Free Consultation',
        'Call Now: +1 (484)-569-2088': 'Call Now: +1 (484)-569-2088'
    },
    es: {
        // Navigation
        'Home': 'Inicio',
        'Services': 'Servicios',
        'Portfolio': 'Portafolio',
        'About': 'Acerca de',
        'Contact': 'Contacto',
        'Blog': 'Blog',
        'Get Started': 'Comenzar',
        
        // Hero Section
        'Take Your Business Online with BrightWave Digital': 'Lleva Tu Negocio Online con BrightWave Digital',
        'We help businesses grow their online presence through strategic digital marketing, web development, and data-driven solutions that deliver real results.': 'Ayudamos a las empresas a hacer crecer su presencia online a través de marketing digital estratégico, desarrollo web y soluciones basadas en datos que entregan resultados reales.',
        'Start Your Journey': 'Comienza Tu Viaje',
        'Our Services': 'Nuestros Servicios',
        
        // Services
        'Our Digital Marketing Services': 'Nuestros Servicios de Marketing Digital',
        'Comprehensive solutions to boost your online presence and drive growth': 'Soluciones integrales para impulsar tu presencia online y generar crecimiento',
        'Web Development': 'Desarrollo Web',
        'Custom websites and web applications that convert visitors into customers': 'Sitios web personalizados y aplicaciones web que convierten visitantes en clientes',
        'SEO Optimization': 'Optimización SEO',
        'Improve your search rankings and drive organic traffic to your website': 'Mejora tu posicionamiento en buscadores y atrae tráfico orgánico a tu sitio web',
        'Social Media Marketing': 'Marketing en Redes Sociales',
        'Build brand awareness and engage with your audience across all platforms': 'Construye reconocimiento de marca y conecta con tu audiencia en todas las plataformas',
        'PPC Advertising': 'Publicidad PPC',
        'Targeted ad campaigns that maximize ROI and drive qualified leads': 'Campañas publicitarias dirigidas que maximizan el ROI y generan leads calificados',
        'Content Marketing': 'Marketing de Contenidos',
        'Engaging content that tells your story and connects with your audience': 'Contenido atractivo que cuenta tu historia y conecta con tu audiencia',
        'Email Marketing': 'Email Marketing',
        'Nurture leads and retain customers with personalized email campaigns': 'Nutre leads y retén clientes con campañas de email personalizadas',
        
        // Why Choose Us
        'Why Choose BrightWave Digital?': '¿Por Qué Elegir BrightWave Digital?',
        'Proven Results': 'Resultados Comprobados',
        'We\'ve helped hundreds of businesses increase their online revenue by an average of 150%': 'Hemos ayudado a cientos de empresas a aumentar sus ingresos online en un promedio del 150%',
        'Expert Founder': 'Fundador Experto',
        'Certified digital marketing specialist who stays ahead of industry trends and best practices': 'Especialista certificado en marketing digital que se mantiene a la vanguardia de las tendencias y mejores prácticas de la industria',
        'Data-Driven Approach': 'Enfoque Basado en Datos',
        'Every strategy is backed by comprehensive analytics and performance tracking': 'Cada estrategia está respaldada por análisis integrales y seguimiento de rendimiento',
        'Personal Support': 'Soporte Personal',
        'Direct access to the founder with dedicated support for all your business needs': 'Acceso directo al fundador con soporte dedicado para todas tus necesidades empresariales',
        
        // Stats
        'Happy Clients': 'Clientes Satisfechos',
        'Average ROI Increase': 'Aumento Promedio de ROI',
        'Projects Delivered': 'Proyectos Entregados',
        'Client Satisfaction': 'Satisfacción del Cliente',
        
        // Testimonials
        'What Our Clients Say': 'Lo Que Dicen Nuestros Clientes',
        'Real results from real businesses': 'Resultados reales de empresas reales',
        
        // CTA
        'Ready to Grow Your Business Online?': '¿Listo para Hacer Crecer Tu Negocio Online?',
        'Let\'s discuss how we can help you achieve your digital marketing goals': 'Hablemos sobre cómo podemos ayudarte a alcanzar tus objetivos de marketing digital',
        'Get Free Consultation': 'Obtén Consulta Gratuita',
        'Call Now: +1 (484)-569-2088': 'Llama Ahora: +1 (484)-569-2088'
    }
};

function initializeLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    const langText = document.querySelector('.lang-text');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
            langText.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
            translatePage();
        });
    }
}

function translatePage() {
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    
    elementsToTranslate.forEach(element => {
        const englishText = element.getAttribute('data-en');
        const spanishText = element.getAttribute('data-es');
        
        if (currentLanguage === 'es' && spanishText) {
            element.textContent = spanishText;
        } else if (currentLanguage === 'en' && englishText) {
            element.textContent = englishText;
        }
    });
    
    // Translate other text content
    translateTextContent();
}

function translateTextContent() {
    const currentTranslations = translations[currentLanguage];
    
    // Translate headings and paragraphs
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a').forEach(element => {
        const text = element.textContent.trim();
        if (currentTranslations[text] && currentTranslations[text] !== text) {
            element.textContent = currentTranslations[text];
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    console.log('BrightWave Digital website loaded successfully!');
    
    // Initialize language toggle
    initializeLanguageToggle();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize enhanced contact form
    initializeContactForm();
    
    // Enhance all other forms
    enhanceAllForms();
    
    // Initialize portfolio filter
    initializePortfolioFilter();
    
    // Initialize portfolio testimonial slider
    new PortfolioTestimonialSlider();
    
    // Add smooth hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize any existing testimonial sliders
    new TestimonialSlider();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Initialize scroll animations
    animateOnScroll();
});
