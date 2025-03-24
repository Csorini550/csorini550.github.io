// Experience.js
class Experience extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .experience-section {
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
        
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .timeline:after {
          content: '';
          position: absolute;
          width: 2px;
          background-color: #e0e0e0;
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1px;
        }
        
        .timeline-item {
          padding: 16px 0;
          position: relative;
        }
        
        .timeline-date {
          position: absolute;
          width: 150px;
          text-align: right;
          top: 22px;
          left: calc(50% - 170px);
          font-weight: 600;
          color: #3a86ff;
        }
        
        .timeline-content {
          position: relative;
          width: 42%;
          padding: 24px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.12);
          border-radius: 8px;
          margin-left: 53%;
        }
        
        .timeline-content:before {
          content: '';
          position: absolute;
          top: 18px;
          left: -10px;
          width: 20px;
          height: 20px;
          background-color: white;
          border: 3px solid #3a86ff;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .timeline-item:nth-child(even) .timeline-date {
          left: auto;
          right: calc(50% - 160px);
          text-align: left;
        }
        
        .timeline-item:nth-child(even) .timeline-content {
          margin-left: 0;
          margin-right: 53%;
          width: 42%;
        }
        
        .timeline-item:nth-child(even) .timeline-content:before {
          left: auto;
          right: -10px;
        }
        
        .timeline-content h3 {
          margin-bottom: 5px;
          font-size: 1.75rem;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          line-height: 1.3;
          color: #333;
        }
        
        .timeline-content h4 {
          color: #777;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 16px;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        
        .timeline-content p {
          margin-bottom: 16px;
          line-height: 1.6;
          color: #333;
        }

        .achievement-highlight {
          margin-top: 16px;
          background-color: rgba(58, 134, 255, 0.05);
          border-left: 3px solid #3a86ff;
          padding: 16px;
          border-radius: 4px;
        }
        
        .achievement-highlight p {
          margin: 8px 0;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
        }
        
        .achievement-highlight i {
          color: #3a86ff;
          margin-right: 8px;
          font-size: 1.1rem;
        }
        
        .achievement-highlight strong {
          color: #8338ec;
          font-weight: 600;
        }
        
        .university-images {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 20px 0;
          background-color: rgba(58, 134, 255, 0.05);
          padding: 16px;
          border-radius: 8px;
        }
        
        .university-logo {
          max-width: 150px;
          height: auto;
        }
        
        .university-mascot {
          max-width: 100px;
          height: auto;
        }
        
        .university-note {
          text-align: center;
          font-style: italic;
          color: #666;
          margin-top: 10px;
          font-size: 0.9rem;
        }
        
        @media (max-width: 1024px) {
          .timeline-date {
            position: relative;
            width: auto;
            left: 0;
            top: 0;
            margin-bottom: 8px;
            text-align: left;
          }
          
          .timeline-content {
            width: 100%;
            margin-left: 0;
            padding-left: 45px;
          }
          
          .timeline:after {
            left: 20px;
          }
          
          .timeline-content:before {
            left: 10px;
          }
          
          .timeline-item:nth-child(even) .timeline-date {
            right: auto;
            text-align: left;
          }
          
          .timeline-item:nth-child(even) .timeline-content {
            width: 100%;
            margin-right: 0;
            padding-left: 45px;
          }
          
          .timeline-item:nth-child(even) .timeline-content:before {
            right: auto;
            left: 10px;
          }
        }
        
        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.8rem;
          }
          
          .timeline:after {
            left: -5px;
          }
          
          .timeline-content {
            box-sizing: border-box;
            padding-left: 35px;
          }
          
          .timeline-content:before {
            width: 16px;
            height: 16px;
            left: -18px;
            top: 20px;
          }
          
          .timeline-item:nth-child(even) .timeline-content:before {
            left: -18px;
          }
          
          .timeline-date {
            padding-left: 24px;
          }
          
          @media (max-width: 480px) {
            .timeline:after {
              left: -5px;
            }
            
            .timeline-content {
              padding: 20px;
              padding-left: 40px;
            }
            
            .timeline-content:before {
              left: -16px;
              width: 14px;
              height: 14px;
            }
            
            .timeline-item:nth-child(even) .timeline-content:before {
              left: -16px;
            }
            
            .timeline-content h3 {
              font-size: 1.4rem;
            }
            
            .timeline-content h4 {
              font-size: 0.9rem;
            }
            
            .timeline-content p {
              font-size: 0.95rem;
            }
            
            .timeline-date {
              padding-left: 24px;
            }
            
            .achievement-highlight {
              padding: 12px;
            }
            
            .achievement-highlight p {
              font-size: 0.9rem;
            }
            
            .university-logo {
              max-width: 120px;
            }
            
            .university-mascot {
              max-width: 80px;
            }
          }
        }
      </style>
      
      <section id="experience" class="experience-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>Professional Experience</h2>
            <p>My journey in software engineering and development</p>
          </div>
          <div class="timeline" data-aos="fade-up">
            <div class="timeline-item">
              <div class="timeline-date">May 2024 - Present</div>
              <div class="timeline-content">
                <h3>Director of Automation and Technical Solutions</h3>
                <h4>JMI Sales Group</h4>
                <p>Leading strategic initiatives that enhance operational efficiencies and drive innovation at JMI Sales Group. My focus is on leveraging cutting-edge technology to optimize business processes, ensuring seamless integration and automation across sales, finance, and accounting departments.</p>
                <div class="achievement-highlight">
                  <p><i class="fas fa-chart-line"></i> Develop and implement comprehensive automation strategies that align with organizational goals</p>
                  <p><i class="fas fa-users-cog"></i> Lead cross-functional teams to design and enhance systems for improved data integration and workflow automation</p>
                  <p><i class="fas fa-shopping-cart"></i> Oversee the deployment of technical solutions that support e-commerce and digital marketing platforms</p>
                  <p><i class="fas fa-handshake"></i> Manage relationships with technology partners and vendors to ensure the delivery of cost-effective and scalable solutions</p>
                  <p><i class="fas fa-sync-alt"></i> Continuously assess and refine technology infrastructure to support growth and adapt to changing industry trends</p>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">Jul 2021 - Dec 2023</div>
              <div class="timeline-content">
                <h3>Software Engineer</h3>
                <h4>Apexon</h4>
                <p>As a Software Engineer III, I specialized in developing enterprise-level solutions for Fortune 500 clients, delivering high-impact technical implementations while leading cross-functional teams across multiple projects.</p>
                
                <div class="achievement-highlight">
                  <h4 style="margin-top: 0; color: #3a86ff; border-bottom: 1px solid rgba(58, 134, 255, 0.3); padding-bottom: 8px; margin-bottom: 16px;">Key Client Projects</h4>
                  
                  <div style="margin-bottom: 16px;">
                    <p style="margin-bottom: 6px;"><i class="fas fa-credit-card"></i> <strong style="color: #333; font-size: 1.1rem;">Mastercard</strong></p>
                    <ul style="margin: 0 0 0 25px; padding: 0; list-style-type: none;">
                      <li style="position: relative; margin-bottom: 6px;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Engineered RESTful APIs using Java and Spring Boot for a new rebates platform</li>
                      <li style="position: relative; margin-bottom: 6px;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Implemented database solutions with JPA and PostgreSQL with Flyway migration</li>
                      <li style="position: relative;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Integrated Azure services and Sendgrid email communication system</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 16px;">
                    <p style="margin-bottom: 6px;"><i class="fas fa-university"></i> <strong style="color: #333; font-size: 1.1rem;">Ally Bank</strong></p>
                    <ul style="margin: 0 0 0 25px; padding: 0; list-style-type: none;">
                      <li style="position: relative; margin-bottom: 6px;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Developed comprehensive Cypress automation framework for end-to-end testing</li>
                      <li style="position: relative; margin-bottom: 6px;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Created CI/CD pipelines using Jenkins and GitLab for continuous testing</li>
                      <li style="position: relative;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Reduced regression testing time by 65% through strategic test automation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p style="margin-bottom: 6px;"><i class="fas fa-tag"></i> <strong style="color: #333; font-size: 1.1rem;">Groupon</strong></p>
                    <ul style="margin: 0 0 0 25px; padding: 0; list-style-type: none;">
                      <li style="position: relative; margin-bottom: 6px;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Built proof of concept for headless CMS using Strapi for content management</li>
                      <li style="position: relative; margin-bottom: 6px;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Led knowledge transfer sessions to train offshore development teams</li>
                      <li style="position: relative;"><span style="position: absolute; left: -18px; color: #3a86ff;">•</span> Served as technical liaison between development teams and management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2020 - 2021</div>
              <div class="timeline-content">
                <h3>App Academy</h3>
                <h4>Full-Stack Development Bootcamp</h4>
                <p>Selected to join App Academy's elite program with a highly competitive <strong>3% acceptance rate</strong>. Completed an intensive 1000+ hour coding bootcamp focused on full-stack web development. Mastered technologies including JavaScript, React, Redux, Python, Flask, and PostgreSQL.</p>
                <div class="university-images">
                  <img src="/src/images/appacademy.png" alt="App Academy Logo" class="university-logo">
                </div>
                <div class="achievement-highlight">
                  <p><i class="fas fa-award"></i> App Academy is renowned as one of the most rigorous and selective coding bootcamps in the industry</p>
                  <p><i class="fas fa-code"></i> Developed multiple full-stack applications through pair programming and test-driven development</p>
                </div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2013 - 2018</div>
              <div class="timeline-content">
                <h3>Montana State University</h3>
                <h4>Chemical Engineering & Bioengineering</h4>
                <p>Studied chemical engineering principles and bioengineering applications, developing strong analytical and problem-solving skills that transferred well to software development.</p>
                <div class="university-images">
                  <img src="/src/images/montana_state_logo.png" alt="Montana State University Logo" class="university-logo">
                  <img src="/src/images/bobcat.png" alt="Montana State Bobcat Mascot" class="university-mascot">
                </div>
                <p class="university-note">Montana State University - Bozeman, Montana</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('experience-component', Experience); 