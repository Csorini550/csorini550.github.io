// Contact.js
class Contact extends HTMLElement {
  constructor() {
    super();
    this.formSubmitted = false;
    this.formSubmitting = false;
    this.formError = false;
    this.errorMessage = '';
    this.formSuccess = false;
    this.recipientName = 'Christopher T. Sorini'; // Default recipient name
    this.recipientEmail = 'contact@example.com'; // Default recipient email
    
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  // Allow email address to be set via attribute
  static get observedAttributes() {
    return ['recipient-email', 'recipient-name'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'recipient-email' && newValue) {
      this.recipientEmail = newValue;
      this.updateEmailDisplay();
    }
    if (name === 'recipient-name' && newValue) {
      this.recipientName = newValue;
    }
  }

  updateEmailDisplay() {
    const emailDisplay = this.shadowRoot.querySelector('.info-item .email-display');
    if (emailDisplay) {
      emailDisplay.textContent = this.recipientEmail;
    }
  }

  checkEmailJSLoaded() {
    // Check if EmailJS is loaded and ready
    if (window.emailjsLoaded && typeof emailjs !== 'undefined') {
      console.log('EmailJS is loaded and ready to use');
      this.emailJSAvailable = true;
    } else {
      console.warn('EmailJS not loaded yet or not available. Form will retry when submitted.');
      this.emailJSAvailable = false;
      
      // Add event listener to check again when EmailJS might be loaded later
      window.addEventListener('emailjs:loaded', () => {
        console.log('EmailJS loaded event detected');
        this.emailJSAvailable = true;
      });
    }
  }

  connectedCallback() {
    console.log('Contact component connected to DOM');
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
    console.log('Font Awesome loaded');
  }

  // Send email using EmailJS
  sendWithEmailJS(formData) {
    // Get service and template IDs
    const serviceID = 'service_2uc99iw';
    const notificationTemplateID = 'template_t1tmmg9'; // Template for notifying the site owner
    const autoReplyTemplateID = 'template_f8az02j';    // Template for auto-reply to the submitter
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      user_name: formData.name,     // Explicitly define user_name for template use
      reply_to: formData.email,
      user_email: formData.email,   // Explicitly define user_email for template use
      to_name: this.recipientName,
      to_email: this.recipientEmail,
      subject: formData.subject,    // Original subject from the form
      message: formData.message,
      user_subject: formData.subject // Also include as user_subject for template flexibility
    };
    
    // Add submitter's name for the auto-reply template
    const autoReplyParams = {
      from_name: this.recipientName, // Site owner's name as the sender
      reply_to: this.recipientEmail, // Site owner's email for replies
      to_name: formData.name,        // Submitter's name
      user_name: formData.name,      // Explicitly define user_name for template use
      to_email: formData.email,      // Submitter's email
      user_email: formData.email,    // Explicitly define user_email for template use
      subject: `Thank you for contacting ${this.recipientName}`, // Custom subject for auto-reply
      message: formData.message,     // Original message for reference
      user_subject: formData.subject // Original subject preserved as user_subject
    };
    
    // Log the attempt
    console.log('Attempting to send emails via EmailJS...');
    console.log('Admin Notification Parameters:', templateParams);
    console.log('Auto-Reply Parameters:', autoReplyParams);
    
    // Send both emails using Promise.all for better performance
    return Promise.all([
      // Send notification to site owner
      emailjs.send(serviceID, notificationTemplateID, templateParams),
      // Send auto-reply to form submitter
      emailjs.send(serviceID, autoReplyTemplateID, autoReplyParams)
    ])
    .then(([notificationResponse, autoReplyResponse]) => {
      console.log('Emails sent successfully!', {
        notification: notificationResponse,
        autoReply: autoReplyResponse
      });
      return { success: true, notificationResponse, autoReplyResponse };
    })
    .catch(error => {
      console.error('Failed to send one or more emails:', error);
      return { success: false, error };
    });
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
        
        // Validate form data
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
          this.showStatus(statusMessage, 'Please fill out all fields.', 'error');
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          if (sendingOverlay) sendingOverlay.style.display = 'none';
          return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          this.showStatus(statusMessage, 'Please enter a valid email address.', 'error');
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          if (sendingOverlay) sendingOverlay.style.display = 'none';
          return;
        }
        
        // Gather form data
        const formData = {
          name: name,
          email: email,
          subject: subject,
          message: message,
          to_name: this.recipientName,
          to_email: this.recipientEmail
        };
        
        console.log("Form data prepared:", formData);
        
        // Send email with EmailJS
        this.sendWithEmailJS(formData)
          .then((response) => {
            console.log("Email sent successfully:", response);
            // Show success message
            this.showStatus(statusMessage, 'Thank you for your message! I will get back to you soon.', 'success');
            form.reset();
          })
          .catch((error) => {
            console.error('Email error:', error);
            
            // Provide specific error message based on the error type
            let errorMessage = `Sorry, there was an error sending your message. Please try again or contact me directly at ${this.recipientEmail}.`;
            
            if (error.details && typeof error.details === 'string') {
              // Add more specific error information if available
              errorMessage += ' Error details: ' + error.details;
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
          
          .container {
            width: 95%;
            padding: 16px 10px;
          }
          
          .contact-form, .contact-info {
            padding-left: 8px;
            padding-right: 8px;
          }
          
          .info-item {
            padding-left: 8px;
          }
          
          .info-container {
            max-width: calc(100% - 100px);
          }
          
          .social-links a {
            margin-left: 4px;
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
                <img src="src/images/Image (3).jpeg" alt="Christopher T. Sorini" />
              </div>
              <div class="info-container">
                <div class="info-item">
                  <i class="fas fa-envelope"></i>
                  <p class="email-display">${this.recipientEmail}</p>
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
                    <a href="https://github.com/csorini550/" target="_blank" aria-label="GitHub Profile">
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
}

customElements.define('contact-component', Contact); 