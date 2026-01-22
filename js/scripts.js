/*!
* Raghav Krishnendar - AI Engineer Portfolio
* Copyright 2025
*/

// ===== CONFIGURATION =====
const CONFIG = {
  animations: {
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  },
  neural: {
    nodeCount: 12,
    connectionDistance: 25
  },
  dataStreams: {
    minCount: 1,
    maxCount: 2
  }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
  // Create element with classes
  createElement(tag, className = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  },

  // Add event listener with error handling
  addEventListener(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    }
  },

  // Get element by ID with error handling
  getElement(id) {
    return document.getElementById(id);
  },

  // Random number between min and max
  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  // Random integer between min and max
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

// ===== ANIMATION MANAGER =====
const AnimationManager = {
  init() {
    AOS.init(CONFIG.animations);
  },

  createNeuralNetworkBackground() {
    const heroSection = Utils.getElement('hero');
    if (!heroSection) return;

    const nodes = this.createNeuralNodes(heroSection);
    this.createNeuralConnections(heroSection, nodes);
  },

  createNeuralNodes(container) {
    const nodes = [];

    for (let i = 0; i < CONFIG.neural.nodeCount; i++) {
      const node = Utils.createElement('div', 'absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-20');

      const top = Utils.random(0, 100);
      const left = Utils.random(0, 100);
      node.style.top = `${top}%`;
      node.style.left = `${left}%`;
      node.style.animation = `pulse 4s ease-in-out ${Utils.random(0, 4)}s infinite`;

      container.appendChild(node);
      nodes.push({ element: node, x: left, y: top });
    }

    return nodes;
  },

  createNeuralConnections(container, nodes) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'absolute inset-0 w-full h-full');
    svg.style.zIndex = '0';
    container.appendChild(svg);

    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(otherNode => {
        const distance = this.calculateDistance(node, otherNode);

        if (distance < CONFIG.neural.connectionDistance) {
          this.createConnection(svg, node, otherNode);
        }
      });
    });
  },

  calculateDistance(node1, node2) {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  createConnection(svg, node1, node2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${node1.x}%`);
    line.setAttribute('y1', `${node1.y}%`);
    line.setAttribute('x2', `${node2.x}%`);
    line.setAttribute('y2', `${node2.y}%`);
    line.setAttribute('stroke', 'rgba(139, 92, 246, 0.1)');
    line.setAttribute('stroke-width', '0.5');
    line.classList.add('neural-connection');
    svg.appendChild(line);
  },

  createDataStreams() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const streamCount = Utils.randomInt(CONFIG.dataStreams.minCount, CONFIG.dataStreams.maxCount);

      for (let i = 0; i < streamCount; i++) {
        this.createDataStream(section);
      }
    });
  },

  createDataStream(container) {
    const stream = Utils.createElement('div', 'data-stream');

    stream.style.left = `${Utils.random(0, 100)}%`;
    stream.style.height = `${Utils.random(20, 50)}%`;

    const duration = Utils.random(2, 5);
    const delay = Utils.random(0, 5);
    stream.style.animation = `dataStream ${duration}s linear ${delay}s infinite`;

    container.appendChild(stream);
  },

  initTypingEffect() {
    const typingElement = document.querySelector('#hero h1 span:first-child');
    if (!typingElement) return;

    this.typeText(typingElement, () => {
      const secondElement = document.querySelector('#hero h1 span:last-child');
      if (secondElement) {
        setTimeout(() => this.typeText(secondElement), 500);
      }
    });
  },

  typeText(element, callback) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typing-effect');

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        element.classList.remove('typing-effect');
        if (callback) callback();
      }
    }, 50);
  }
};

// ===== NAVIGATION MANAGER =====
const NavigationManager = {
  init() {
    this.setupScrollBehavior();
    this.setupMobileNavigation();
    this.setupSmoothScrolling();
  },

  setupScrollBehavior() {
    window.addEventListener('scroll', () => {
      const mainNav = Utils.getElement('mainNav');
      if (!mainNav) return;

      if (window.scrollY > 50) {
        mainNav.classList.add('navbar-shrink', 'shadow-2xl', 'py-2', 'glow-effect');
        mainNav.classList.remove('p-4');
      } else {
        mainNav.classList.remove('navbar-shrink', 'shadow-2xl', 'py-2', 'glow-effect');
        mainNav.classList.add('p-4');
      }
    });
  },

  setupMobileNavigation() {
    const navbarToggler = Utils.getElement('navbarToggler');
    const mobileNav = Utils.getElement('mobileNav');
    const mobileNavClose = Utils.getElement('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    Utils.addEventListener(navbarToggler, 'click', () => {
      mobileNav.classList.remove('hidden');
      setTimeout(() => mobileNav.classList.add('opacity-100'), 10);
    });

    Utils.addEventListener(mobileNavClose, 'click', () => {
      this.closeMobileNav(mobileNav);
    });

    mobileNavLinks.forEach(link => {
      Utils.addEventListener(link, 'click', () => {
        this.closeMobileNav(mobileNav);
      });
    });
  },

  closeMobileNav(mobileNav) {
    mobileNav.classList.remove('opacity-100');
    setTimeout(() => mobileNav.classList.add('hidden'), 300);
  },

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      Utils.addEventListener(anchor, 'click', (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute('href');
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
  }
};

// ===== FORM MANAGER =====
const FormManager = {
  init() {
    this.setupContactForm();
    this.setupSkillBarEffects();
  },

  setupContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;

    Utils.addEventListener(contactForm, 'submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(contactForm);
    });
  },

  handleFormSubmission(form) {
    const formData = this.getFormData(form);

    if (!this.validateForm(formData)) {
      alert('Please fill in all fields');
      return;
    }

    this.showProcessingState(form);
    this.simulateSubmission(form, formData);
  },

  getFormData(form) {
    return {
      name: Utils.getElement('name').value,
      email: Utils.getElement('email').value,
      subject: Utils.getElement('subject').value,
      message: Utils.getElement('message').value
    };
  },

  validateForm(data) {
    return Object.values(data).every(value => value.trim() !== '');
  },

  showProcessingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-robot fa-spin mr-2"></i> Processing...';
  },

  simulateSubmission(form, data) {
    setTimeout(() => {
      this.showSuccessMessage(form, data);
      this.resetForm(form);
    }, 1500);
  },

  showSuccessMessage(form, data) {
    const responseContainer = Utils.createElement('div', 'mt-6 p-4 bg-purple-900 bg-opacity-50 rounded-lg border border-purple-500');
    responseContainer.innerHTML = `
      <div class="flex items-center mb-3">
        <i class="fas fa-robot text-purple-400 mr-2"></i>
        <span class="text-white font-semibold">AI Assistant</span>
      </div>
      <p class="text-gray-200">Thank you for your message, ${data.name}! I've processed your inquiry about "${data.subject}" and will get back to you at ${data.email} soon.</p>
    `;

    form.appendChild(responseContainer);
  },

  resetForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message';
    form.reset();
  },

  setupSkillBarEffects() {
    const skillBars = document.querySelectorAll('.bg-gradient-to-r');

    skillBars.forEach(bar => {
      Utils.addEventListener(bar, 'mouseenter', () => {
        this.createParticleEffect(bar);
      });
    });
  },

  createParticleEffect(container) {
    for (let i = 0; i < 5; i++) {
      const particle = Utils.createElement('div', 'absolute w-1 h-1 bg-purple-300 rounded-full');
      particle.style.top = `${Utils.random(0, 100)}%`;
      particle.style.left = `${Utils.random(0, 100)}%`;
      particle.style.opacity = '0.8';

      particle.animate([
        { transform: 'translateY(0) scale(1)', opacity: 0.8 },
        { transform: 'translateY(-20px) scale(0)', opacity: 0 }
      ], {
        duration: 1000,
        easing: 'ease-out'
      });

      container.appendChild(particle);

      setTimeout(() => particle.remove(), 1000);
    }
  }
};

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  AnimationManager.init();
  NavigationManager.init();
  FormManager.init();

  // Create visual effects
  AnimationManager.createNeuralNetworkBackground();
  AnimationManager.createDataStreams();
  AnimationManager.initTypingEffect();
});
