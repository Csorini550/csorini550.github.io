// About.js
class About extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initSkillBars();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .about-section {
          padding: 64px 0;
          position: relative;
          color: #fff;
          overflow: hidden;
        }
        
        .video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: -1;
        }
        
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 0;
          position: relative;
          z-index: 1;
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
          color: #fff;
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
          color: #eee;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .about-content {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          justify-content: center;
        }
        
        .about-text, .about-skills {
          flex: 1;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 24px;
          border-radius: 8px;
          backdrop-filter: blur(5px);
          max-width: 45%;
        }
        
        .about-text h3, .about-skills h3 {
          font-size: 1.75rem;
          margin-bottom: 16px;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          line-height: 1.3;
          color: #fff;
        }
        
        .about-text p {
          margin-bottom: 16px;
          line-height: 1.6;
          color: #eee;
        }
        
        .skill-item {
          margin-bottom: 16px;
        }
        
        .skill-name {
          font-weight: 500;
          margin-bottom: 4px;
          color: #fff;
        }
        
        .skill-bar {
          height: 8px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .skill-level {
          height: 100%;
          background-color: #3a86ff;
          border-radius: 4px;
          width: 0;
          transition: width 1.5s ease;
        }
        
        .achievement-highlight {
          margin-top: 16px;
          background-color: rgba(58, 134, 255, 0.15);
          border-left: 3px solid #3a86ff;
          padding: 16px;
          border-radius: 4px;
        }
        
        .achievement-highlight p {
          margin: 8px 0;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          color: #fff;
        }
        
        .achievement-highlight i {
          color: #3a86ff;
          margin-right: 8px;
          font-size: 1.1rem;
        }
        
        .achievement-highlight strong {
          color: #a799ff;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
            align-items: center;
          }
          
          .about-text, .about-skills {
            max-width: 100%;
            width: 100%;
            margin-bottom: 24px;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .about-section {
            padding: 48px 0;
          }
          
          .section-header {
            margin-bottom: 32px;
          }
          
          .section-header h2 {
            font-size: 1.6rem;
          }
          
          .section-header p {
            font-size: 0.95rem;
          }
          
          .about-text, .about-skills {
            padding: 20px;
          }
          
          .about-text h3, .about-skills h3 {
            font-size: 1.4rem;
            margin-bottom: 12px;
          }
          
          .about-text p {
            font-size: 0.95rem;
            margin-bottom: 12px;
          }
          
          .skill-item {
            margin-bottom: 12px;
          }
          
          .skill-name {
            font-size: 0.9rem;
          }
        }
      </style>
      
      <section id="about" class="about-section">
        <video class="video-bg" autoplay muted loop playsinline disablePictureInPicture disableRemotePlayback>
          <source src="src/images/chicago.mp4" type="video/mp4">
        </video>
        <div class="video-overlay"></div>
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>My Journey</h2>
            <p>From Hinsdale Central High School to Software Engineering</p>
          </div>
          <div class="about-content">
            <div class="about-text" data-aos="fade-right">
              <h3>Early Education & Montana State University</h3>
              <p>At Hinsdale Central High School, I built a strong foundation in analytical thinking and problem-solving. This led me to Montana State University, where I majored in Chemical Engineering and Biological Engineering.</p>
              <p>My rigorous academic curriculum provided me with a deep understanding of scientific principles and technical skills, emphasizing research methodologies and analytical techniques.</p>
              
              <h3>Transition to Software Engineering</h3>
              <p>Recognizing the growing importance of software in solving modern engineering challenges, I expanded my skill set at App Academy, an intensive coding bootcamp for full-stack web development with a highly selective <strong>3% acceptance rate</strong> (more competitive than Harvard).</p>
              <p>Through App Academy's rigorous 1000+ hour curriculum, I mastered JavaScript for developing dynamic web applications, HTML and CSS for responsive design, and Python for server-side logic and data manipulation. The program's focus on pair programming, test-driven development, and algorithmic problem-solving provided me with industry-ready skills that set me apart in the tech industry.</p>
            </div>
            <div class="about-skills" data-aos="fade-left">
              <h3>Technical Skills</h3>
              <div class="skills-container">
                <div class="skill-item">
                  <div class="skill-name">Python</div>
                  <div class="skill-bar" data-percentage="98">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">JavaScript</div>
                  <div class="skill-bar" data-percentage="95">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">Prompt Engineering</div>
                  <div class="skill-bar" data-percentage="94">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">React.js & Redux</div>
                  <div class="skill-bar" data-percentage="90">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">Fine-tuning LLMs (OpenAI, Llama3.3)</div>
                  <div class="skill-bar" data-percentage="88">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">Flask</div>
                  <div class="skill-bar" data-percentage="85">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">PostgreSQL</div>
                  <div class="skill-bar" data-percentage="80">
                    <div class="skill-level"></div>
                  </div>
                </div>
                <div class="skill-item">
                  <div class="skill-name">NVIDIA Echo System</div>
                  <div class="skill-bar" data-percentage="43">
                    <div class="skill-level"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  initSkillBars() {
    // Wait for the component to be fully rendered
    setTimeout(() => {
      const skillBars = this.shadowRoot.querySelectorAll('.skill-bar');
      skillBars.forEach(skillBar => {
        const percentage = skillBar.getAttribute('data-percentage');
        const skillLevel = skillBar.querySelector('.skill-level');
        skillLevel.style.width = percentage + '%';
      });
    }, 500);
  }
}

customElements.define('about-component', About); 