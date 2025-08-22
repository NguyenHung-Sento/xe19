// Main JavaScript file for Xe19 Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Header scroll effect and Back to Top functionality
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('backToTop');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background effect
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Validate required fields
            if (!data.name || !data.phone || !data.message) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
                return;
            }

            // Validate phone number (Vietnamese format)
            const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
            if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
                alert('Số điện thoại không hợp lệ!');
                return;
            }

            // Validate email if provided
            if (data.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    alert('Email không hợp lệ!');
                    return;
                }
            }

            // Show success message
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add staggered animation for benefit cards
                if (entry.target.classList.contains('benefit-card')) {
                    const cards = document.querySelectorAll('.benefit-card');
                    cards.forEach((card, index) => {
                        if (card === entry.target) {
                            setTimeout(() => {
                                card.style.animationDelay = `${index * 0.1}s`;
                                card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .step, .contact-info, .contact-form, .section-title, .app-promo-text, .phone-mockup');
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format Vietnamese phone number
            if (value.length > 0) {
                if (value.startsWith('84')) {
                    value = '+84 ' + value.substring(2);
                } else if (value.startsWith('0')) {
                    value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
                }
            }
            
            e.target.value = value;
        });
    });

    // Add loading state for buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    });

    // App download tracking
    const downloadLinks = document.querySelectorAll('a[href*="play.google.com"], a[href*="apps.apple.com"]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('play.google.com') ? 'Google Play' : 'App Store';
            console.log(`App download clicked: ${platform}`);
            
            // You can add analytics tracking here
            // gtag('event', 'app_download', { platform: platform });
        });
    });

    // Phone call tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.href);
            
            // You can add analytics tracking here
            // gtag('event', 'phone_call', { phone_number: this.href.replace('tel:', '') });
        });
    });
});

// Utility functions
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format Vietnamese phone number
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
        return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (cleaned.length === 11 && cleaned.startsWith('84')) {
        return '+84 ' + cleaned.substring(2).replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    }
    
    return phone;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateVietnamesePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return /^(0|\+?84)[0-9]{9,10}$/.test(cleaned);
}

// Export functions for use in other scripts
window.Xe19Utils = {
    formatPhoneNumber,
    validateEmail,
    validateVietnamesePhone
};
