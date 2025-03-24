// Hero.js
class Hero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initParticles();
    this.initTypewriter();
    this.initMouseInteraction();
    this.initAnimations();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .hero-section {
          position: relative;
          display: flex;
          min-height: 100vh;
          padding: 48px 0;
          background: none;
          overflow: hidden;
        }
        
        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }
        
        .video-background video {
          position: absolute;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: cover;
          filter: brightness(0.85);
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg, 
            rgba(0,0,0,0.85) 0%, 
            rgba(20,20,40,0.75) 50%, 
            rgba(0,0,0,0.85) 100%
          );
          z-index: -1;
          animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
          0% {
            background: linear-gradient(
              135deg, 
              rgba(0,0,0,0.85) 0%, 
              rgba(20,20,40,0.75) 50%, 
              rgba(0,0,0,0.85) 100%
            );
          }
          50% {
            background: linear-gradient(
              135deg, 
              rgba(0,0,0,0.85) 0%, 
              rgba(40,20,60,0.75) 50%, 
              rgba(0,0,0,0.85) 100%
            );
          }
          100% {
            background: linear-gradient(
              135deg, 
              rgba(0,0,0,0.85) 0%, 
              rgba(20,20,40,0.75) 50%, 
              rgba(0,0,0,0.85) 100%
            );
          }
        }
        
        .particles-js {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .hero-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          align-items: center;
          gap: 2rem;
          padding: 32px;
          z-index: 1;
          color: #fff;
        }
        
        .hero-text {
          transform: translateY(0);
          opacity: 1;
          transition: all 0.8s ease;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .avatar-container {
          position: relative;
          width: 300px;
          height: 300px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .avatar-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s;
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) rotateY(0deg);
          }
          50% {
            transform: translateY(-20px) rotateY(10deg);
          }
          100% {
            transform: translateY(0px) rotateY(0deg);
          }
        }
        
        .avatar-background {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, #3a86ff 0%, #8338ec 100%);
          opacity: 0.15;
          filter: blur(20px);
          animation: pulse 8s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.25;
          }
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
        }
        
        .avatar-orbit {
          position: absolute;
          width: 400px;
          height: 400px;
          top: -50px;
          left: -50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: rotate 15s linear infinite;
        }
        
        .avatar-orbit:nth-of-type(2) {
          width: 350px;
          height: 350px;
          top: -25px;
          left: -25px;
          animation-duration: 12s;
          animation-direction: reverse;
        }
        
        .avatar-orbit:nth-of-type(3) {
          width: 450px;
          height: 450px;
          top: -75px;
          left: -75px;
          animation-duration: 20s;
        }
        
        @keyframes rotate {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
        
        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #3a86ff;
          border-radius: 50%;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px #3a86ff;
        }
        
        .orbit-dot:nth-of-type(2) {
          left: 100%;
          background-color: #8338ec;
          box-shadow: 0 0 10px #8338ec;
        }
        
        .orbit-dot:nth-of-type(3) {
          top: 0;
          left: 50%;
          background-color: #ff006e;
          box-shadow: 0 0 10px #ff006e;
        }
        
        .orbit-dot:nth-of-type(4) {
          top: 100%;
          left: 50%;
          background-color: #ffbe0b;
          box-shadow: 0 0 10px #ffbe0b;
        }
        
        .profile-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          object-fit: cover;
          transform-style: preserve-3d;
          transition: all 0.5s ease;
        }
        
        .tech-badges {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        
        .tech-badge {
          position: absolute;
          padding: 8px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .tech-badge:hover {
          transform: scale(1.2);
        }
        
        .tech-badge.js {
          width: 50px;
          height: 50px;
          top: 10%;
          left: -15%;
          animation: techFloat 5s ease-in-out infinite;
        }
        
        .tech-badge.react {
          width: 60px;
          height: 60px;
          top: 20%;
          right: -10%;
          animation: techFloat 7s ease-in-out infinite 1s;
        }
        
        .tech-badge.python {
          width: 55px;
          height: 55px;
          bottom: 15%;
          left: -5%;
          animation: techFloat 6s ease-in-out infinite 2s;
        }
        
        .tech-badge.flask {
          width: 45px;
          height: 45px;
          bottom: 10%;
          right: -5%;
          animation: techFloat 8s ease-in-out infinite 0.5s;
        }
        
        .tech-badge.openai {
          width: 55px;
          height: 55px;
          top: -15%;
          left: 50%;
          transform: translateX(-50%);
          animation: techGentlePulse 5s ease-in-out infinite;
          background: rgba(10, 10, 10, 0.7);
        }
        
        .tech-badge.postgresql {
          width: 55px;
          height: 55px;
          bottom: -15%;
          left: 50%;
          transform: translateX(-50%);
          animation: techGentlePulse 5s ease-in-out infinite 1s;
          background: rgba(51, 103, 145, 0.1);
          padding: 8px;
          border: 1px solid rgba(51, 103, 145, 0.3);
        }
        
        .tech-badge.postgresql img {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 3px rgba(51, 103, 145, 0.5));
        }
        
        .tech-badge.openai img {
          width: 80%;
          height: 80%;
          filter: brightness(1.1);
        }
        
        @keyframes techGentlePulse {
          0% {
            transform: translateX(-50%) scale(1);
          }
          50% {
            transform: translateX(-50%) scale(1.05);
          }
          100% {
            transform: translateX(-50%) scale(1);
          }
        }
        
        @keyframes techFloat {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
        
        .tech-badge img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        h1 {
          font-size: 3.5rem;
          margin-bottom: 24px;
          color: white;
          font-family: 'Poppins', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          line-height: 1.3;
          transform: translateY(30px);
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.3s;
        }
        
        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 24px;
          color: #bfa2ff;
          letter-spacing: 1px;
          transform: translateY(30px);
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.5s;
        }
        
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .highlight {
          color: #3a86ff;
          position: relative;
        }
        
        .highlight:after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 8px;
          background-color: rgba(58, 134, 255, 0.2);
          z-index: -1;
        }
        
        .typewriter {
          position: relative;
          display: inline-block;
          color: #ff006e;
          margin-bottom: 32px;
          font-size: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.7s;
        }
        
        .typewriter::after {
          content: '|';
          position: absolute;
          right: -8px;
          width: 4px;
          opacity: 1;
          animation: blink 0.7s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .cta-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          transform: translateY(30px);
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.9s;
        }
        
        .btn {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: 500;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          z-index: -1;
        }
        
        .btn:hover::before {
          width: 100%;
        }
        
        .primary-btn {
          background-color: #3a86ff;
          color: white;
          box-shadow: 0 4px 15px rgba(58, 134, 255, 0.3);
        }
        
        .primary-btn:hover {
          background-color: #2667cc;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(58, 134, 255, 0.4);
        }
        
        .secondary-btn {
          background-color: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
        }
        
        .secondary-btn:hover {
          border-color: #3a86ff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: white;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          animation: fadeIn 1s ease forwards 1.5s;
          opacity: 0;
          cursor: pointer;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 0.7;
          }
        }
        
        .scroll-indicator:hover {
          opacity: 1;
        }
        
        .scroll-indicator span {
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        
        .scroll-arrow {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-visual {
            grid-row: 1;
            margin-bottom: 2rem;
          }
          
          .hero-text {
            grid-row: 2;
          }
          
          .cta-buttons {
            justify-content: center;
          }
          
          .avatar-container {
            width: 250px;
            height: 250px;
          }
          
          .avatar-orbit {
            width: 350px;
            height: 350px;
            top: -50px;
            left: -50px;
          }
          
          .avatar-orbit:nth-of-type(2) {
            width: 300px;
            height: 300px;
            top: -25px;
            left: -25px;
          }
          
          .avatar-orbit:nth-of-type(3) {
            width: 400px;
            height: 400px;
            top: -75px;
            left: -75px;
          }
        }
        
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          
          .hero-visual {
            order: -1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 30px;
          }
          
          .avatar-container {
            width: 200px;
            height: 200px;
            margin: 0 auto;
          }
          
          .avatar-orbit {
            width: 350px;
            height: 350px;
            top: -50px;
            left: -50px;
          }
          
          .avatar-orbit:nth-of-type(2) {
            width: 300px;
            height: 300px;
            top: -25px;
            left: -25px;
          }
          
          .avatar-orbit:nth-of-type(3) {
            width: 400px;
            height: 400px;
            top: -75px;
            left: -75px;
          }
          
          .avatar-background {
            width: 250px;
            height: 250px;
          }
          
          .tech-badge {
            transform: scale(0.7);
          }
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            gap: 16px;
            width: 100%;
            max-width: 280px;
            margin-left: auto;
            margin-right: auto;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            box-sizing: border-box;
          }
          
          .hero-visual {
            margin-top: 50px;
          }
          
          .avatar-container {
            width: 200px;
            height: 200px;
          }
          
          .tech-badge {
            transform: scale(0.6);
          }
          
          .tech-badge.js {
            width: 40px;
            height: 40px;
          }
          
          .tech-badge.react {
            width: 50px;
            height: 50px;
          }
          
          .tech-badge.python {
            width: 45px;
            height: 45px;
          }
          
          .tech-badge.flask {
            width: 35px;
            height: 35px;
          }
          
          .tech-badge.openai {
            width: 45px;
            height: 45px;
            top: -15%;
            animation: techGentlePulse 5s ease-in-out infinite;
          }
          
          .tech-badge.postgresql {
            width: 45px;
            height: 45px;
            bottom: -15%;
            animation: techGentlePulse 5s ease-in-out infinite 1s;
          }
          
          .typewriter {
            font-size: 1.2rem;
          }
          
          .avatar-orbit {
            width: 280px;
            height: 280px;
            top: -40px;
            left: -40px;
          }
          
          .avatar-orbit:nth-of-type(2) {
            width: 240px;
            height: 240px;
            top: -20px;
            left: -20px;
          }
          
          .avatar-orbit:nth-of-type(3) {
            width: 320px;
            height: 320px;
            top: -60px;
            left: -60px;
          }
          
          .avatar-background {
            width: 200px;
            height: 200px;
          }
        }
      </style>
      
      <section id="hero" class="hero-section">
        <div class="video-background">
          <video autoplay muted loop playsinline disablePictureInPicture disableRemotePlayback id="chicago-video">
            <slot name="video-source"></slot>
          </video>
          <div class="video-overlay"></div>
        </div>
        
        <div id="particles-js" class="particles-js"></div>
        
        <div class="hero-content">
          <div class="hero-text">
            <h1>Christopher <span class="highlight">T. Sorini</span></h1>
            <p class="hero-subtitle">Software Engineer | Problem Solver | Outdoors Enthusiast</p>
            <p class="typewriter" id="typewriter"></p>
            <div class="cta-buttons">
              <a href="#about" class="btn primary-btn">My Journey</a>
              <a href="#ai-tools" class="btn secondary-btn">View AI Tools</a>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="avatar-container">
              <div class="avatar-background"></div>
              
              <div class="avatar-orbit">
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
              </div>
              
              <div class="avatar-orbit">
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
              </div>
              
              <div class="avatar-orbit">
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
                <div class="orbit-dot"></div>
              </div>
              
              <div class="avatar-wrapper" id="avatar-wrapper">
                <img class="profile-image" src="src/images/profile-placeholder.svg" alt="Christopher T. Sorini">
                <div class="tech-badges">
                  <div class="tech-badge js">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript">
                  </div>
                  <div class="tech-badge react">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React">
                  </div>
                  <div class="tech-badge python">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python">
                  </div>
                  <div class="tech-badge flask">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" alt="Flask">
                  </div>
                  <div class="tech-badge openai">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="OpenAI">
                  </div>
                  <div class="tech-badge postgresql">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="scroll-indicator" id="scroll-down">
          <span>Scroll Down</span>
          <div class="scroll-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>
    `;
  }

  initParticles() {
    // Add particles.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
      // Initialize particles once the script is loaded
      window.particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 0.5,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.2,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    };
    document.head.appendChild(script);
  }

  initTypewriter() {
    const phrases = [
      "Dreaming up enterprise solutions with AI",
      "Building innovative digital solutions",
      "Turning complex problems into elegant code",
      "Bringing ideas to life through technology"
    ];
    
    setTimeout(() => {
      const typewriterElement = this.shadowRoot.getElementById('typewriter');
      let currentPhraseIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      
      const type = () => {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
          // Deleting characters
          typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
          currentCharIndex--;
          typingSpeed = 50;
        } else {
          // Typing characters
          typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          typingSpeed = 100;
        }
        
        // Transition between phrases
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
          // Finished typing current phrase - pause before moving to next phrase
          isDeleting = false;
          typingSpeed = 2000; // Pause at the end of phrase
          setTimeout(() => {
            // Move to next phrase without deleting
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            currentCharIndex = 0;
            // Clear text to start fresh with next phrase
            typewriterElement.textContent = '';
            // Continue with next phrase
            setTimeout(type, 500);
          }, typingSpeed);
          return;
        }
        
        setTimeout(type, typingSpeed);
      };
      
      type(); // Start typing
    }, 1000);
  }
  
  initMouseInteraction() {
    setTimeout(() => {
      const avatarWrapper = this.shadowRoot.getElementById('avatar-wrapper');
      const heroSection = this.shadowRoot.getElementById('hero');
      const journeyButton = this.shadowRoot.querySelector('a.primary-btn');
      const projectsButton = this.shadowRoot.querySelector('a.secondary-btn');
      
      if (!avatarWrapper || !heroSection) return;
      
      // Add click handlers for the navigation buttons
      if (journeyButton) {
        journeyButton.addEventListener('click', (e) => {
          e.preventDefault();
          const aboutComponent = document.querySelector('about-component');
          if (aboutComponent) {
            // Get the navbar height for offset
            const navbar = document.querySelector('nav-component');
            let navbarHeight = 0;
            if (navbar) {
              const navbarElement = navbar.shadowRoot.querySelector('.navbar');
              if (navbarElement) {
                navbarHeight = navbarElement.offsetHeight;
              }
            }
            // Calculate position and scroll
            const targetPosition = aboutComponent.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            // Update URL hash without causing a jump
            history.pushState(null, null, '#about');
          }
        });
      }
      
      if (projectsButton) {
        projectsButton.addEventListener('click', (e) => {
          e.preventDefault();
          const aiToolsComponent = document.querySelector('ai-tools-component');
          if (aiToolsComponent) {
            // Get the navbar height for offset
            const navbar = document.querySelector('nav-component');
            let navbarHeight = 0;
            if (navbar) {
              const navbarElement = navbar.shadowRoot.querySelector('.navbar');
              if (navbarElement) {
                navbarHeight = navbarElement.offsetHeight;
              }
            }
            // Calculate position and scroll
            const targetPosition = aiToolsComponent.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            // Update URL hash without causing a jump
            history.pushState(null, null, '#ai-tools');
          }
        });
      }
      
      heroSection.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to the center of the section
        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation based on mouse distance from center
        const rotateY = ((mouseX - centerX) / centerX) * 10; // Max 10 degrees
        const rotateX = ((centerY - mouseY) / centerY) * 10; // Max 10 degrees
        
        // Apply rotation to avatar
        avatarWrapper.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });
      
      // Reset rotation when mouse leaves section
      heroSection.addEventListener('mouseleave', () => {
        avatarWrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
      });
      
      // Scroll down functionality
      const scrollDown = this.shadowRoot.getElementById('scroll-down');
      if (scrollDown) {
        scrollDown.addEventListener('click', () => {
          const aboutSection = document.querySelector('about-component');
          if (aboutSection) {
            // Get the navbar height for offset
            const navbar = document.querySelector('nav-component');
            let navbarHeight = 0;
            if (navbar) {
              const navbarElement = navbar.shadowRoot.querySelector('.navbar');
              if (navbarElement) {
                navbarHeight = navbarElement.offsetHeight;
              }
            }
            // Calculate position and scroll
            const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      }
    }, 100);
  }
  
  initAnimations() {
    // Add AOS (Animate On Scroll) init
    if (window.AOS) {
      setTimeout(() => {
        window.AOS.refresh();
      }, 500);
    }
  }
}

customElements.define('hero-component', Hero); 