// Interests.js
class Interests extends HTMLElement {
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
        
        .interests-section {
          background-color: #f8f9fa;
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
        
        .interests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
          margin-top: 32px;
        }
        
        .interest-item {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 8px rgba(0,0,0,0.12);
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .interest-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.14);
        }

        .interest-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #eee;
          transition: transform 0.5s ease;
        }
        
        .interest-item:hover .interest-image {
          transform: scale(1.05);
        }
        
        .interest-content {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .interest-item i {
          font-size: 2.5rem;
          color: #3a86ff;
          margin-bottom: 16px;
        }
        
        .interest-item h3 {
          margin-bottom: 16px;
          color: #333;
          font-size: 1.75rem;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          line-height: 1.3;
        }
        
        .interest-item p {
          color: #777;
          line-height: 1.6;
          margin-top: auto;
        }
        
        @media (max-width: 768px) {
          .interests-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .interests-grid {
            grid-template-columns: 1fr;
          }
          
          .interest-item {
            padding: 24px;
          }
        }
      </style>
      
      <section id="interests" class="interests-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>Personal Interests</h2>
            <p>Beyond the code: my passions and adventures</p>
          </div>
          <div class="interests-grid" data-aos="fade-up">
            <div class="interest-item">
              <img src="/src/images/skiing.jpg" alt="Skiing in Montana" class="interest-image">
              <div class="interest-content">
                <i class="fas fa-mountain"></i>
                <h3>Skiing</h3>
                <p>Exploring the slopes of Montana and Colorado, embracing the thrill of downhill adventures.</p>
              </div>
            </div>
            <div class="interest-item">
              <img src="/src/images/fly_fishing.jpg" alt="Fly fishing in a mountain stream" class="interest-image">
              <div class="interest-content">
                <i class="fas fa-fish"></i>
                <h3>Fly Fishing</h3>
                <p>Finding peace and connection with nature while fly fishing in pristine streams and rivers.</p>
              </div>
            </div>
            <div class="interest-item">
              <img src="/src/images/pickleball.jpeg" alt="Playing pickleball" class="interest-image">
              <div class="interest-content">
                <i class="fas fa-table-tennis"></i>
                <h3>Pickleball</h3>
                <p>Strategizing on the pickleball court mirrors my approach to AI problems—quick adaptations, pattern recognition, and finding the perfect angle for success.</p>
              </div>
            </div>
            <div class="interest-item">
              <img src="/src/images/hiking.jpeg" alt="Hiking in the mountains" class="interest-image">
              <div class="interest-content">
                <i class="fas fa-hiking"></i>
                <h3>Hiking</h3>
                <p>Venturing to remote destinations, discovering natural beauty and challenging my limits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('interests-component', Interests); 