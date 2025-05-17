/*!
* Raghav Krishnendar - AI Engineer Portfolio
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
    
    // Create neural network background elements
    createNeuralNetworkBackground();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Create floating data streams
    createDataStreams();
});

// Create neural network background with animated connections
function createNeuralNetworkBackground() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    // Create neural nodes
    const nodeCount = 20;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'absolute w-2 h-2 bg-purple-400 rounded-full opacity-30';
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        node.style.top = `${top}%`;
        node.style.left = `${left}%`;
        
        // Add glow effect
        node.classList.add('glow');
        
        // Add pulse animation with random delay
        node.style.animation = `pulse 3s ease-in-out ${Math.random() * 3}s infinite`;
        
        heroSection.appendChild(node);
        nodes.push({element: node, x: left, y: top});
    }
    
    // Create SVG for connections
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'absolute inset-0 w-full h-full');
    svg.style.zIndex = '0';
    heroSection.appendChild(svg);
    
    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
            // Calculate distance
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect nearby nodes
            if (distance < 30) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', `${node.x}%`);
                line.setAttribute('y1', `${node.y}%`);
                line.setAttribute('x2', `${otherNode.x}%`);
                line.setAttribute('y2', `${otherNode.y}%`);
                line.setAttribute('stroke', 'rgba(168, 85, 247, 0.2)');
                line.setAttribute('stroke-width', '1');
                line.classList.add('neural-connection');
                svg.appendChild(line);
            }
        });
    });
}

// Create animated data streams
function createDataStreams() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Add 3-5 data streams per section
        const streamCount = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < streamCount; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            
            // Random position and height
            stream.style.left = `${Math.random() * 100}%`;
            stream.style.height = `${Math.random() * 30 + 20}%`;
            
            // Random animation duration and delay
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            stream.style.animation = `dataStream ${duration}s linear ${delay}s infinite`;
            
            section.appendChild(stream);
        }
    });
}

// Navbar scroll behavior with enhanced effects
window.addEventListener('scroll', () => {
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-shrink', 'shadow-2xl', 'py-2');
            mainNav.classList.remove('p-4');
            // Add glow effect when scrolled
            mainNav.classList.add('glow');
        } else {
            mainNav.classList.remove('navbar-shrink', 'shadow-2xl', 'py-2', 'glow');
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

// Form submission handling with AI-themed feedback
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
            submitButton.innerHTML = '<i class="fas fa-robot fa-spin mr-2"></i> Processing...';
            
            // Simulate AI processing (would be an actual AJAX request in production)
            setTimeout(() => {
                const responseContainer = document.createElement('div');
                responseContainer.className = 'mt-6 p-4 bg-purple-900 bg-opacity-50 rounded-lg border border-purple-500';
                responseContainer.innerHTML = `
                    <div class="flex items-center mb-3">
                        <i class="fas fa-robot text-purple-400 mr-2"></i>
                        <span class="text-white font-semibold">AI Assistant</span>
                    </div>
                    <p class="text-gray-200">Thank you for your message, ${name}! I've processed your inquiry about "${subject}" and will get back to you at ${email} soon.</p>
                `;
                
                contactForm.appendChild(responseContainer);
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 1500);
        });
    }
});

// AI-themed typing effect
function initTypingEffect() {
    const typingElement = document.querySelector('#hero h1 span:first-child');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.classList.add('typing-effect');
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            typingElement.classList.remove('typing-effect');
            
            // Start typing the second span after a delay
            setTimeout(() => {
                const secondTypingElement = document.querySelector('#hero h1 span:last-child');
                if (!secondTypingElement) return;
                
                const secondText = secondTypingElement.textContent;
                secondTypingElement.textContent = '';
                secondTypingElement.classList.add('typing-effect');
                
                let j = 0;
                const secondTypingInterval = setInterval(() => {
                    if (j < secondText.length) {
                        secondTypingElement.textContent += secondText.charAt(j);
                        j++;
                    } else {
                        clearInterval(secondTypingInterval);
                        secondTypingElement.classList.remove('typing-effect');
                    }
                }, 50);
            }, 500);
        }
    }, 50);
}

// Add particle effect to skill bars
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.bg-gradient-to-r');
    
    skillBars.forEach(bar => {
        // Add particle effect when hovering over skill bars
        bar.addEventListener('mouseenter', () => {
            // Create particles
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute w-1 h-1 bg-purple-300 rounded-full';
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.opacity = '0.8';
                
                // Animate particle
                particle.animate([
                    { transform: 'translateY(0) scale(1)', opacity: 0.8 },
                    { transform: 'translateY(-20px) scale(0)', opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                });
                
                bar.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }
        });
    });
});
