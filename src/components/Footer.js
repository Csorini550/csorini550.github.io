// Footer.js
class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.loadFontAwesome();
    this.setupEventListeners();
  }

  loadFontAwesome() {
    // Create a link element for Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    
    // Append it to the shadow root
    this.shadowRoot.appendChild(link);
  }

  setupEventListeners() {
    const logoLink = this.shadowRoot.querySelector('.footer-logo a');
    const footerLinks = this.shadowRoot.querySelectorAll('.footer-links a');
    
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
          const navbar = document.querySelector('nav-component');
          let navbarHeight = 0;
          
          if (navbar) {
            const navbarElement = navbar.shadowRoot.querySelector('.navbar');
            if (navbarElement) {
              navbarHeight = navbarElement.offsetHeight;
            }
          }
          
          const targetPosition = targetComponent.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          // Smooth scroll to the section with offset
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
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

    // Add click handlers to all footer links
    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        navigateToSection(targetId);
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .footer {
          background-color: #111;
          color: white;
          padding: 48px 0 16px;
        }
        
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 0;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          margin-bottom: 48px;
        }
        
        .footer-logo {
          flex: 1;
          min-width: 250px;
        }
        
        .footer-logo a {
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 700;
          font-size: 1.8rem;
          color: white;
          text-decoration: none;
        }
        
        .footer-logo a span {
          color: #3a86ff;
        }
        
        .footer-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 150px;
        }
        
        .footer-links a {
          color: #ccc;
          margin-bottom: 16px;
          transition: color 0.2s ease;
          text-decoration: none;
          cursor: pointer;
        }
        
        .footer-links a:hover {
          color: white;
        }
        
        .footer-subscribe {
          flex: 2;
          min-width: 300px;
        }
        
        .footer-subscribe h3 {
          margin-bottom: 16px;
          font-size: 1.2rem;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          color: white;
        }
        
        .social-footer-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 16px;
        }
        
        .social-footer-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #333;
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        
        .social-footer-links a i {
          position: relative;
          z-index: 2;
        }
        
        .social-footer-links a:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #3a86ff, #8338ec);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        
        .social-footer-links a:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        }
        
        .social-footer-links a:hover:before {
          opacity: 1;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .footer-bottom p {
          margin: 0;
          color: #999;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 32px;
          }
        }
        
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      </style>
      
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <a href="#hero">Christopher <span>T. Sorini</span></a>
            </div>
            <div class="footer-links-section">
              <h3>Explore</h3>
              <div class="footer-links">
                <a href="#hero">Home</a>
                <a href="#about">About</a>
                <a href="#ai-tools">AI Tools</a>
                <a href="#interests">Interests</a>
                <a href="#experience">Experience</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <div class="footer-subscribe">
              <h3>Connect with me</h3>
              <div class="social-footer-links">
                <a href="https://github.com/" target="_blank" aria-label="GitHub Profile">
                  <i class="fab fa-github" aria-hidden="true"></i>
                  <span class="visually-hidden">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/christopher-sorini-41a491206/" target="_blank" aria-label="LinkedIn Profile">
                  <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                  <span class="visually-hidden">LinkedIn</span>
                </a>
                <a href="https://x.com/ChristopherS525" target="_blank" aria-label="X Profile">
                  <i class="fab fa-twitter" aria-hidden="true"></i>
                  <span class="visually-hidden">X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2023 Christopher T. Sorini. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer); 