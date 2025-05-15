/*!
* Raghav Krishnendar Portfolio
* Copyright 2025
*/

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Navbar scroll behavior
window.addEventListener('scroll', () => {
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-shrink', 'shadow-2xl', 'py-2');
            mainNav.classList.remove('p-4');
        } else {
            mainNav.classList.remove('navbar-shrink', 'shadow-2xl', 'py-2');
            mainNav.classList.add('p-4');
        }
    }
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.getElementById('navbarToggler');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (navbarToggler && mobileNav) {
        navbarToggler.addEventListener('click', () => {
            mobileNav.classList.remove('hidden');
            setTimeout(() => {
                mobileNav.classList.add('opacity-100');
            }, 10);
        });
    }

    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('opacity-100');
            setTimeout(() => {
                mobileNav.classList.add('hidden');
            }, 300);
        });
    }

    // Close mobile nav when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('opacity-100');
            setTimeout(() => {
                mobileNav.classList.add('hidden');
            }, 300);
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            // Simulate sending (would be an actual AJAX request in production)
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 1500);
        });
    }
});

// Typing effect for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        heroTitle.classList.add('animate__animated', 'animate__fadeInDown');
    }
});
