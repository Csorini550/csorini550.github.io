// Contact.js
class Contact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('Contact component initialized');
    this.emailJSLoaded = false;
    this.emailServiceKey = "zxeSmFLK-CuHM_mKO";
    this.serviceID = "service_eh0jpbf";
    this.templateID = "template_pplvcfl";
    this.maxRetries = 3;
    this.retryCount = 0;
  }

  connectedCallback() {
    console.log('Contact component connected to DOM');
    this.render();
    this.loadFontAwesome();
    
    // Initialize email service
    this.initializeEmailService();
  }

  initializeEmailService() {
    console.log(`Initializing email service (attempt ${this.retryCount + 1}/${this.maxRetries})`);
    
    // First check if EmailJS was successfully loaded by the main HTML
    if (window.emailjsLoaded === true && typeof window.emailjs !== 'undefined') {
      console.log("EmailJS already loaded and initialized by main HTML");
      this.emailJSLoaded = true;
      this.setupEventListeners();
      return;
    }
    
    // Check if EmailJS is available but not marked as loaded
    if (typeof window.emailjs !== 'undefined') {
      console.log("EmailJS found in global scope, attempting to initialize");
      try {
        window.emailjs.init(this.emailServiceKey);
        this.emailJSLoaded = true;
        window.emailjsLoaded = true;
        console.log("EmailJS initialized successfully");
        this.setupEventListeners();
      } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
        this.handleEmailJSInitFailure();
      }
      return;
    }
    
    // If EmailJS is not available at all, load it from the recommended CDN
    this.loadEmailJS();
  }

  handleEmailJSInitFailure() {
    this.retryCount++;
    
    if (this.retryCount < this.maxRetries) {
      console.log(`Retrying EmailJS initialization in 2 seconds... (${this.retryCount}/${this.maxRetries})`);
      setTimeout(() => this.initializeEmailService(), 2000);
    } else {
      console.error("Max retries reached. Email service unavailable.");
      // Show error message in the contact form
      const statusMessage = this.shadowRoot.querySelector('#status-message');
      if (statusMessage) {
        this.showStatus(statusMessage, 'Email service is not available at the moment. Please contact me directly at csorini13@gmail.com.', 'error');
      }
      // Still set up event listeners for form validation and provide fallback info
      this.setupEventListeners();
    }
  }

  loadFontAwesome() {
    // Create a link element for Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    
    // Append it to the shadow root
    this.shadowRoot.appendChild(link);
    console.log('Font Awesome loaded');
  }

  loadEmailJS() {
    console.log('Loading EmailJS script from jsDelivr CDN');
    
    // Use jsDelivr CDN which is more reliable
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      console.log('EmailJS script loaded from CDN');
      // Initialize EmailJS after a short delay to ensure it's fully loaded
      setTimeout(() => {
        if (typeof window.emailjs !== 'undefined') {
          try {
            window.emailjs.init(this.emailServiceKey);
            console.log("EmailJS initialized successfully after CDN load");
            this.emailJSLoaded = true;
            window.emailjsLoaded = true;
            this.setupEventListeners();
          } catch (error) {
            console.error("Failed to initialize EmailJS after CDN load:", error);
            this.loadLocalEmailJS();
          }
        } else {
          console.error("EmailJS not defined after script load");
          this.loadLocalEmailJS();
        }
      }, 500);
    };
    
    script.onerror = () => {
      console.error('Failed to load EmailJS from CDN');
      this.loadLocalEmailJS();
    };
    
    // Add to document head for global availability
    document.head.appendChild(script);
  }
  
  loadLocalEmailJS() {
    console.log('Attempting to load EmailJS from local fallback');
    const script = document.createElement('script');
    // Use the correct path to the local file - remove leading slash if needed
    script.src = 'js/vendors/emailjs.min.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      console.log('EmailJS script loaded from local fallback');
      // Initialize EmailJS after a short delay
      setTimeout(() => {
        if (typeof window.emailjs !== 'undefined') {
          try {
            window.emailjs.init(this.emailServiceKey);
            console.log("EmailJS initialized successfully after local load");
            this.emailJSLoaded = true;
            window.emailjsLoaded = true;
            this.setupEventListeners();
          } catch (error) {
            console.error("Failed to initialize EmailJS after local load:", error);
            this.handleEmailJSInitFailure();
          }
        } else {
          console.error("EmailJS not defined after local script load");
          this.handleEmailJSInitFailure();
        }
      }, 500);
    };
    
    script.onerror = () => {
      console.error('Failed to load EmailJS from local fallback');
      this.handleEmailJSInitFailure();
    };
    
    // Add to document head for global availability
    document.head.appendChild(script);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .contact-section {
          padding: 64px 0;
        }
        
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 0;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .section-header h2 {
          margin-bottom: 16px;
          font-size: 2.5rem;
          position: relative;
          display: inline-block;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          line-height: 1.3;
          color: #333;
        }
        
        .section-header h2:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 4px;
          background: #3a86ff;
          border-radius: 2px;
        }
        
        .section-header p {
          color: #777;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-content {
          display: flex;
          gap: 32px;
        }
        
        .contact-form, .contact-info {
          flex: 1;
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
          color: #333;
        }
        
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 1rem;
          color: #333;
        }
        
        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .btn {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: 500;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-size: 1rem;
          background-color: #3a86ff;
          color: white;
        }
        
        .btn:hover {
          background-color: #2667cc;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.12);
        }
        
        #status-message {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          display: none;
          font-weight: 500;
          margin-bottom: 16px;
        }
        
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .sending-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255,255,255,0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          border-radius: 8px;
          display: none;
        }
        
        .sending-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3a86ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .contact-info {
          padding: 32px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.12);
          position: relative;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .info-item i {
          font-size: 1.2rem;
          color: #3a86ff;
          margin-right: 16px;
          width: 24px;
          text-align: center;
        }
        
        .info-item p {
          margin: 0;
          color: #333;
          font-size: 1rem;
        }
        
        .connect-message {
          margin: 24px 0;
          padding: 16px;
          background-color: #f8f9fb;
          border-left: 4px solid #3a86ff;
          border-radius: 8px;
          color: #555;
          font-size: 1.05rem;
          line-height: 1.5;
        }
        
        .connect-message strong {
          color: #3a86ff;
        }
        
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #f8f9fa;
          color: #3a86ff;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        
        .social-links a i {
          font-size: 1.4rem;
          z-index: 2;
        }
        
        .social-links a:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #3a86ff, #4dabff);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .social-links a:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
          color: white;
        }
        
        .social-links a:hover:before {
          opacity: 1;
        }
        
        .social-links-title {
          margin-bottom: 16px;
          font-weight: 500;
          color: #333;
          font-size: 1.1rem;
        }
        
        .avatar-container {
          position: absolute;
          bottom: -10px;
          right: -10px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          border: 4px solid white;
          z-index: 10;
        }
        
        .avatar-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .info-container {
          max-width: calc(100% - 130px);
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
        
        @media (max-width: 768px) {
          .contact-content {
            flex-direction: column;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
        }
      </style>
      
      <section id="contact" class="contact-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>Get In Touch</h2>
            <p>Interested in collaborating or learning more about my work?</p>
          </div>
          <div class="contact-content">
            <div class="contact-form" data-aos="fade-right">
              <div id="status-message"></div>
              <div style="position: relative;">
                <div class="sending-overlay" id="sending-overlay">
                  <div class="sending-spinner"></div>
                  <p>Sending your message...</p>
                </div>
                <form id="contact-form">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                  </div>
                  <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>
                  </div>
                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                  </div>
                  <button type="submit" class="btn">Send Message</button>
                </form>
              </div>
            </div>
            <div class="contact-info" data-aos="fade-left">
              <div class="avatar-container">
                <img src="images/Image (3).jpeg" alt="Christopher Sorini" />
              </div>
              <div class="info-container">
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <p>csorini13@gmail.com</p>
                </div>
                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <p>Chicago, IL</p>
                </div>
                <div class="connect-message">
                  <p>I'm always eager to <strong>collaborate on exciting projects</strong> and <strong>connect with new people</strong>. Learning new skills and exchanging ideas is what drives me forward!</p>
                </div>
                <div class="social-links-container">
                  <p class="social-links-title">Let's connect:</p>
                  <div class="social-links">
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
            </div>
          </div>
        </div>
      </section>
    `;
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector('#contact-form');
    if (form) {
      console.log('Form found and event listener set up');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Show sending overlay
        const sendingOverlay = this.shadowRoot.querySelector('#sending-overlay');
        if (sendingOverlay) {
          sendingOverlay.style.display = 'flex';
        }
        
        // Display status message
        const statusMessage = this.shadowRoot.querySelector('#status-message');
        if (!statusMessage) {
          console.error("Status message element not found");
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          if (sendingOverlay) sendingOverlay.style.display = 'none';
          return;
        }
        
        // Verify EmailJS is ready
        this.verifyEmailService()
          .then(isReady => {
            if (!isReady) {
              throw new Error("Email service is not ready");
            }
            
            // Validate form data
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject').value.trim();
            const message = form.querySelector('#message').value.trim();
            
            if (!name || !email || !subject || !message) {
              this.showStatus(statusMessage, 'Please fill out all fields.', 'error');
              return Promise.reject(new Error("Form validation failed"));
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              this.showStatus(statusMessage, 'Please enter a valid email address.', 'error');
              return Promise.reject(new Error("Invalid email format"));
            }
            
            // Gather form data
            const formData = {
              name: name,
              email: email,
              subject: subject,
              message: message,
              to_name: "Christopher Sorini",
              to_email: 'csorini13@gmail.com',
              recipient: 'csorini13@gmail.com',
              from_name: name,
              reply_to: email
            };
            
            console.log("Sending email with data:", formData);
            
            // Send email using EmailJS - make sure we use the send method correctly
            return window.emailjs.send(this.serviceID, this.templateID, formData);
          })
          .then((response) => {
            console.log("Email sent successfully:", response);
            // Show success message
            this.showStatus(statusMessage, 'Thank you for your message! I will get back to you soon.', 'success');
            form.reset();
          })
          .catch((error) => {
            console.error('Email error:', error);
            
            // Provide specific error message based on the error type
            let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact me directly at csorini13@gmail.com.';
            
            if (error.message === "Email service is not ready") {
              errorMessage = 'Email service is not available at the moment. Please contact me directly at csorini13@gmail.com.';
            } else if (error.message === "Form validation failed" || error.message === "Invalid email format") {
              // Validation errors already handled
              return;
            } else if (error.text) {
              // If there's a specific error text from EmailJS
              errorMessage = `Email error: ${error.text}. Please contact me directly at csorini13@gmail.com.`;
            }
            
            this.showStatus(statusMessage, errorMessage, 'error');
          })
          .finally(() => {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            // Hide sending overlay
            if (sendingOverlay) sendingOverlay.style.display = 'none';
          });
      });
    } else {
      console.error('Contact form not found in the shadow DOM');
    }
  }
  
  // Method to verify EmailJS is ready
  verifyEmailService() {
    return new Promise((resolve) => {
      // If EmailJS was already loaded successfully
      if (this.emailJSLoaded && typeof window.emailjs !== 'undefined') {
        console.log("EmailJS verified as ready");
        resolve(true);
        return;
      }
      
      // If EmailJS exists but wasn't marked as loaded, try to initialize it
      if (typeof window.emailjs !== 'undefined') {
        try {
          window.emailjs.init(this.emailServiceKey);
          this.emailJSLoaded = true;
          console.log("EmailJS initialized during verification");
          resolve(true);
        } catch (error) {
          console.error("EmailJS initialization failed during verification:", error);
          resolve(false);
        }
        return;
      }
      
      // If EmailJS doesn't exist at all, try loading it once more
      console.log("EmailJS not available, attempting one final load");
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.type = 'text/javascript';
      script.async = true;
      
      const timeoutId = setTimeout(() => {
        console.error("EmailJS load timed out during verification");
        resolve(false);
      }, 5000);
      
      script.onload = () => {
        clearTimeout(timeoutId);
        console.log("EmailJS loaded during verification");
        setTimeout(() => {
          try {
            window.emailjs.init(this.emailServiceKey);
            this.emailJSLoaded = true;
            console.log("EmailJS initialized during verification");
            resolve(true);
          } catch (error) {
            console.error("EmailJS init failed during verification:", error);
            resolve(false);
          }
        }, 500);
      };
      
      script.onerror = () => {
        clearTimeout(timeoutId);
        console.error("EmailJS failed to load during verification");
        resolve(false);
      };
      
      document.head.appendChild(script);
    });
  }
  
  // Helper method to show status messages
  showStatus(element, message, type) {
    // Clear any existing content
    element.textContent = '';
    
    // Create icon element
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    icon.style.marginRight = '8px';
    
    // Create text node with message
    const text = document.createTextNode(message);
    
    // Add icon and text to element
    element.appendChild(icon);
    element.appendChild(text);
    
    // Set appropriate class and display
    element.className = type;
    element.style.display = 'block';
    
    // Scroll to status message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // If it's a success message, hide it after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        element.style.display = 'none';
      }, 5000);
    }
  }
}

customElements.define('contact-component', Contact); 