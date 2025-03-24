// Contact.js
class Contact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.loadFontAwesome();
    this.loadEmailJS();
  }

  loadFontAwesome() {
    // Create a link element for Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    
    // Append it to the shadow root
    this.shadowRoot.appendChild(link);
  }

  loadEmailJS() {
    // Create a script element for EmailJS
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.async = true;
    
    // Initialize EmailJS when the script is loaded
    script.onload = () => {
      // Initialize with your EmailJS public key
      window.emailjs.init("zxeSmFLK-CuHM_mKO");
      console.log("EmailJS initialized successfully");
    };
    
    // Add error handling for script loading
    script.onerror = () => {
      console.error("Failed to load EmailJS script");
    };
    
    // Append it to the shadow root
    this.shadowRoot.appendChild(script);
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
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Gather form data
        const formData = new FormData(form);
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          to_email: 'csorini13@gmail.com'
        };
        
        console.log("Attempting to send email with data:", data);
        
        // Make sure emailjs is available in the global scope
        if (typeof window.emailjs === 'undefined') {
          console.error("EmailJS is not loaded properly");
          alert('Sorry, the email service is not loaded properly. Please try again later or contact me directly at csorini13@gmail.com.');
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          return;
        }
        
        // Send email using EmailJS with the provided service ID and template ID
        window.emailjs.send('service_eh0jpbf', 'template_ppvcfl', data)
          .then((response) => {
            console.log("Email sent successfully:", response);
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
          })
          .catch((error) => {
            console.error('Email send error:', error);
            alert('Sorry, there was an error sending your message. Please try again or contact me directly at csorini13@gmail.com.');
          })
          .finally(() => {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
      });
    }
  }
}

customElements.define('contact-component', Contact); 