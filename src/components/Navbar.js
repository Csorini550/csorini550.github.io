// Navbar.js
class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background-color: transparent;
        }
        
        .navbar.scrolled {
          background-color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.12);
          padding: 12px 0;
        }
        
        .navbar.scrolled .logo a,
        .navbar.scrolled .nav-links a {
          color: #333;
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo a {
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 700;
          font-size: 1.8rem;
          color: #fff;
          text-decoration: none;
        }
        
        .logo a span {
          color: #3a86ff;
        }
        
        .nav-links {
          display: flex;
          gap: 24px;
        }
        
        .nav-links a {
          color: #fff;
          font-weight: 500;
          text-decoration: none;
          position: relative;
        }
        
        .nav-links a:after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #3a86ff;
          transition: width 0.3s ease;
        }
        
        .nav-links a:hover:after {
          width: 100%;
        }
        
        .nav-toggle {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          min-width: 180px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
          z-index: 1100;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        .dropdown-content a {
          color: #333 !important;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: background-color 0.3s ease;
        }
        
        .dropdown-content a:hover {
          background-color: #f1f1f1;
        }
        
        .dropdown-content a:after {
          display: none;
        }
        
        .dropdown-toggle:after {
          content: '▼';
          font-size: 0.7em;
          margin-left: 5px;
          vertical-align: middle;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .nav-toggle {
            display: block;
          }
          
          .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.12);
            padding: 16px;
            z-index: 1000;
          }
          
          .nav-links.active a {
            color: #333;
          }
          
          .dropdown-content {
            position: static;
            box-shadow: none;
            margin-left: 16px;
            width: calc(100% - 16px);
            margin-top: 8px;
            margin-bottom: 8px;
            border-radius: 0;
            background-color: #f5f5f5;
          }
          
          .dropdown:hover .dropdown-content {
            display: none;
          }
          
          .dropdown.active .dropdown-content {
            display: block;
          }
        }
      </style>
      
      <nav class="navbar">
        <div class="navbar-container">
          <div class="logo">
            <a href="#hero">Christopher <span>T. Sorini</span></a>
          </div>
          <div class="nav-links">
            <a href="#about">About</a>
            <a href="#ai-tools">AI Tools</a>
            <a href="#interests">Interests</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <div class="nav-toggle">
            <slot name="toggle-icon"></slot>
          </div>
        </div>
      </nav>
    `;
  }

  setupEventListeners() {
    const navToggle = this.shadowRoot.querySelector('.nav-toggle');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    const logoLink = this.shadowRoot.querySelector('.logo a');
    const dropdownToggles = this.shadowRoot.querySelectorAll('.dropdown-toggle');

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Handle dropdowns in mobile view
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdown = toggle.closest('.dropdown');
          dropdown.classList.toggle('active');
        }
      });
    });

    // Define the navigation helper function
    const navigateToSection = (targetId) => {
      // Map the target ID to the corresponding component selector
      const componentMap = {
        'hero': 'hero-component',
        'about': 'about-component',
        'ai-tools': 'ai-tools-component',
        'interests': 'interests-component',
        'experience': 'experience-component',
        'contact': 'contact-component'
      };
      
      // Get the component selector based on the target ID
      const componentSelector = componentMap[targetId];
      
      if (componentSelector) {
        const targetComponent = document.querySelector(componentSelector);
        
        if (targetComponent) {
          // Add a small offset to account for fixed navbar
          const navbarHeight = this.shadowRoot.querySelector('.navbar').offsetHeight;
          const targetPosition = targetComponent.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          // Smooth scroll to the section with offset
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          navLinks.classList.remove('active');
          
          // Close any open dropdowns
          this.shadowRoot.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
          });
          
          // Update URL hash without causing a jump
          history.pushState(null, null, `#${targetId}`);
        } else {
          console.error(`Component with selector '${componentSelector}' not found`);
        }
      } else {
        console.error(`No component mapping found for target ID '${targetId}'`);
      }
    };

    // Add logo link click handler
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = logoLink.getAttribute('href').substring(1);
      navigateToSection(targetId);
    });

    // Improved navigation handling
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Don't prevent default for dropdown toggles in desktop mode
        if (!link.classList.contains('dropdown-toggle') || window.innerWidth <= 768) {
          e.preventDefault();
        }
        
        // Only navigate if it's not a dropdown toggle or if it's in mobile view
        if (!link.classList.contains('dropdown-toggle') || window.innerWidth > 768) {
          const targetId = link.getAttribute('href').substring(1); // Remove the # from the href
          navigateToSection(targetId);
        }
      });
    });
    
    // Handle dropdown menu item clicks
    this.shadowRoot.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        navigateToSection(targetId);
      });
    });
  }

  handleScroll() {
    const navbar = this.shadowRoot.querySelector('.navbar');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Close the mobile menu when scrolling
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

customElements.define('nav-component', Navbar); 