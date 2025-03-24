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
        
        .tech-badge.meta {
          width: 55px;
          height: 55px;
          bottom: -15%;
          left: 50%;
          transform: translateX(-50%);
          animation: techGentlePulse 5s ease-in-out infinite 1s;
          background: rgba(0, 101, 255, 0.1);
          padding: 8px;
          border: 1px solid rgba(0, 183, 255, 0.3);
        }
        
        .tech-badge.meta svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 3px rgba(8, 102, 255, 0.5));
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
          
          .tech-badge.meta {
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
                  <div class="tech-badge meta">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" aria-labelledby="llamaTitle">
                      <title id="llamaTitle">Meta AI Llama</title>
                      <defs>
                        <linearGradient id="llama-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#0866FF"/>
                          <stop offset="100%" style="stop-color:#00CDFF"/>
                        </linearGradient>
                      </defs>
                      <path fill="url(#llama-gradient)" d="M423.093,291.368c-0.488-0.973-1.314-1.461-2.432-1.461c-4.863,0-9.729,0-14.593,0
                        c-0.326,0-0.649,0-0.976,0c-0.976,3.078-1.949,5.993-2.922,8.916c-6.326,19.298-16.04,36.503-30.144,50.923
                        c-9.895,10.054-21.407,17.676-35.166,21.574c-17.674,5.02-34.356,2.915-50.227-7.127c-13.112-8.27-22.221-20.111-28.861-34.037
                        c-2.104-4.368-3.724-8.903-5.342-13.44c0-0.16-0.167-0.324-0.331-0.648c-0.651,0-1.466,0-2.268,0
                        c-0.975,0-1.95,0-2.926,0c-0.165,0.812-0.327,1.622-0.489,2.432c-1.949,9.561-5.02,18.643-9.244,27.394
                        c-6.975,14.416-18.159,24.653-32.731,30.957c-15.066,6.648-30.468,6.811-45.858,0.812c-14.092-5.506-24.975-15.067-33.382-27.395
                        c-7.623-11.179-13.117-23.513-16.527-36.669c-0.164-0.651-0.326-1.138-0.488-1.788c-1.138,0-2.103,0-3.078,0
                        c-4.694,0-9.386,0-14.079,0c-1.784,0-2.599,0.976-2.103,2.76c1.299,4.531,2.431,9.062,4.043,13.436
                        c15.72,42.658,43.096,76.039,83.281,96.964c22.532,11.671,46.531,18.479,71.993,19.623c27.066,1.299,53.146-3.726,77.625-16.203
                        c26.251-13.438,47.658-33.057,65.328-57.226c12.299-16.852,22.221-35.186,28.87-55.131
                        C424.229,294.936,423.905,293.148,423.093,291.368z M395.047,149.577c-1.622-1.46-2.435-1.302-3.401,0.652
                        c-5.02,9.732-12.63,17.513-24.322,19.462c-11.343,1.948-21.898-0.65-31.965-5.832c-12.795-6.485-23.356-15.555-33.217-25.614
                        c-1.623-1.624-3.079-3.404-4.694-5.181c-1.138,2.434-2.27,4.693-3.399,6.959c-7.788,16.203-17.843,30.308-30.632,42.333
                        c-6.485,6.16-13.601,11.342-22.703,12.793c-4.694,0.813-9.243,0.813-13.763-0.975c-12.468-4.857-18.157-15.229-15.888-28.386
                        c0.485-2.759,1.298-5.508,2.271-8.27c0.976,1.137,1.784,2.103,2.598,3.078c9.56,11.829,21.081,21.08,34.038,28.544
                        c1.298,0.813,3.076,0.813,4.531,0.325c6.646-2.759,11.017-7.786,14.258-14.255c7.301-14.254,10.867-29.97,15.56-45.322
                        c2.274-7.625,5.02-15.066,10.705-21.083c4.372-4.612,9.409-7.78,15.895-8.445c4.041-0.345,2.738-1.994-3.892-3.733
                        c-29.646-7.843-60.315-9.074-91.555-3.728c-39.046,6.648-71.176,25.46-96.151,55.771c-11.994,14.579-20.595,31.284-26.738,49.441
                        c-1.81,5.457-3.446,10.945-4.988,16.852c3.886-0.345,7.286-0.664,10.681-0.951c-0.148,0.988-0.229,1.646-0.347,2.301
                        c-1.827,9.89-0.853,19.456,4.039,28.221c4.53,8.104,10.698,13.929,18.974,18.805c-4.05-6.507-6.476-13.277-7.294-20.584
                        c-0.976-8.591,0.975-16.853,4.04-24.63c3.891-10.056,9.895-18.645,16.528-26.922c14.902-18.481,33.058-32.732,53.468-44.076
                        c21.061-11.666,43.601-18.811,67.442-21.249c1.623-0.164,3.402-0.326,5.183-0.651c-2.759-1.624-5.506-3.239-8.27-4.859
                        c-0.654-0.33-1.306-0.665-2.264-1.152c7.948-1.792,15.39-3.559,22.841-5.084c12.46-2.594,24.815-3.24,37.096,0.489
                        c18.807,5.669,34.855,16.04,48.793,30.142c5.02,5.183,9.732,10.537,13.276,16.689c1.622,2.759,2.923,5.832,4.208,8.756
                        c1.147,2.598,1.958,5.515,4.525,6.979C395.047,152.656,395.047,151.023,395.047,149.577z M255.795,199.995
                        c17.023,3.24,33.569,7.462,50.229,10.867c5.506,1.138,11.011,2.103,16.527,3.078c9.08,1.623,17.84,0.328,25.953-4.042
                        c8.436-4.531,15.557-10.866,21.735-18.324c2.434-2.923,4.367-6.159,6.486-9.243c0.326-0.488,0.326-1.299,0.49-1.948
                        c-11.342,5.021-22.514,10.049-34.687,13.118c-2.273,0.573-4.628,0.816-6.972,0.973c-21.406,1.137-42.646,0.326-63.564-4.531
                        c-5.347-1.299-10.537-2.76-16.04-4.21c0.813,4.859,1.623,9.245,2.434,13.928C255.14,199.83,255.306,200.156,255.795,199.995z
                        M174.288,201.457c-12.792-4.041-25.612-7.948-36.815-15.229c-6.81-4.368-13.117-9.243-18.321-15.719
                        c-2.76-3.402-4.856-7.138-7.301-10.705c-0.487-0.813-0.649-1.788-0.975-2.759c-12.303,12.306-24.34,24.337-36.5,36.5
                        c1.147,0.813,2.104,1.46,3.074,2.104c14.579,9.729,30.796,15.392,48.14,16.691c7.299,0.649,14.578,0.325,21.896,0.325
                        c9.082,0,18.321-0.487,27.232-1.948c0.165-0.165,0.326-0.165,0.326-0.326c-0.162-3.079-0.326-6.158-0.49-9.895
                        C174.452,201.296,174.451,201.457,174.288,201.457z M129.56,230.327c-10.379-0.164-20.6-0.326-30.957-0.489
                        c-4.367,0-8.588,0.488-12.468,2.92c-5.996,3.728-10.054,8.918-11.506,15.729c-0.813,4.043-1.138,8.105-1.138,12.306
                        c0,7.948,3.564,14.416,8.427,20.274c7.95,9.406,18.647,14.091,29.812,17.84c8.104,2.759,16.379,4.857,24.813,6.158
                        c3.402,0.488,6.811,0.976,10.542,1.623c0.162-1.133,0.322-1.951,0.322-2.766c0-5.67-0.162-11.337,0-16.995
                        c0.165-4.717,0.325-9.245,1.138-13.937c0.813-4.043,1.299-8.104,2.599-11.995c2.104-6.484,4.694-12.792,7.305-19.276
                        c-5.673-2.761-11.345-5.673-17.203-8.271C137.179,230.814,133.44,230.327,129.56,230.327z M182.872,293.474
                        c-1.135-0.166-1.623-0.326-2.103-0.326c-13.929-2.923-27.558-6.647-40.023-13.765c-9.408-5.354-17.355-12.301-20.759-23.028
                        c-1.138-3.564-1.623-7.301-1.623-11.018c0-2.434,1.138-4.703,3.564-5.342c2.598-0.813,5.02-0.813,7.623-0.163
                        c9.895,2.271,19.625,5.508,29.323,9.729c3.402,1.461,6.323,4.043,9.404,6.323c3.726,2.76,5.508,6.647,6.484,11.014
                        c1.623,7.303,3.727,14.418,5.674,21.574C180.607,290.381,181.575,291.695,182.872,293.474z M321.299,328.486
                        c-13.276,2.759-25.773,1.784-36.495-6.485c-11.669-9.074-18.319-21.731-23.027-35.508c-2.434-7.137-4.693-14.254-6.973-21.574
                        c-0.813-2.599-0.813-5.351-1.138-8.755c0.978,0.971,1.299,1.302,1.623,1.784c5.508,6.485,11.179,12.957,16.364,19.625
                        c4.046,5.02,8.105,10.054,12.306,14.905c6.323,7.299,14.254,11.179,23.519,13.112C314.976,306.586,320.978,316.641,321.299,328.486z
                        M189.034,287.967c-0.165-13.118-7.461-20.599-19.456-22.385c-1.461-0.325-3.402,0.651-4.856,1.461
                        c-2.273,1.301-4.53,2.92-6.323,4.855c-7.299,7.138-12.306,15.893-16.528,25.137c2.434,1.623,4.703,3.242,7.301,4.703
                        c11.995,6.815,24.651,12.146,38.219,14.743c0.327,0.163,0.977-0.166,1.299-0.487
                        C188.86,306.759,189.034,297.671,189.034,287.967z M217.09,293.312c0.976,1.623,1.461,2.923,2.27,3.886
                        c7.138,7.949,15.066,14.743,24.815,19.462c8.918,4.37,18.485,6.649,28.544,6.162c3.565-0.163,7.138-0.975,10.379-2.271
                        c7.786-3.075,13.438-8.429,17.676-15.565c3.562-6.324,5.181-13.114,5.342-20.438c0-1.949-1.137-4.368-2.598-5.834
                        c-7.624-7.785-16.53-13.93-26.257-18.644c-13.602-6.49-27.883-10.219-42.495-12.985c-1.14-0.165-2.766,0.651-3.726,1.625
                        c-0.976,1.138-1.623,2.759-1.949,4.204c-1.784,8.106-3.564,16.04-5.02,24.156C223.087,283.583,220.328,288.448,217.09,293.312z
                        M232.65,256.162c14.253,3.239,28.38,6.649,41.965,12.144c9.243,3.725,17.84,8.433,25.295,14.904
                        c1.462,1.302,2.432,4.208,2.104,6.162c-0.975,6.81-3.896,12.467-9.726,16.201c-4.368,2.761-9.082,4.208-14.093,3.405
                        c-10.216-1.463-18.155-6.648-24.977-14.091c-6.484-7.139-11.666-15.229-16.201-23.84c-1.949-3.564-3.078-7.461-4.532-11.18
                        C232.323,258.92,232.487,257.79,232.65,256.162z M233.462,188.017c1.299,15.719,2.762,31.283,3.888,46.836
                        c0.163,2.436-0.326,5.021-0.165,7.304c0.977,0.488,2.271,0.648,3.402,0.811c-0.486-8.104-0.811-16.038-1.299-23.841
                        c-0.649-9.731-1.299-19.462-2.103-29.159c-0.162-2.759-1.138-5.346-1.623-8.104c-0.487-2.272-1.299-3.726-3.726-3.726
                        c-0.649,0-1.302-0.325-1.949-0.652c0.488-0.648,0.976-1.298,1.626-1.946c-0.65-1.138-1.138-2.76-2.107-3.079
                        c-9.406-3.24-19.13-5.02-28.867-7.461c-1.623-0.326-3.402-0.163-5.669-0.163c1.461,1.299,2.273,1.948,3.075,2.597
                        c2.434,1.949,5.02,3.726,7.138,6.16c2.435,2.76,4.857,5.832,6.162,9.082c1.946,4.855,3.237,10.053,4.205,15.229
                        c0.975,5.347,0.975,10.867,1.623,16.366c0.165,0.975,0.973,2.759,1.623,2.759c5.344,0.326,10.702,0.165,16.527,0.165
                        c-0.488-3.077-0.975-5.832-1.462-8.91c-0.163,0-0.325,0-0.325,0.165C233.137,194.668,233.462,191.429,233.462,188.017z
                        M255.307,239.245c-1.95,0-3.564,0-5.183,0c-1.138,0-2.107,0.163-2.107,1.623c0,1.784,1.138,1.784,2.432,1.784
                        c1.623,0,3.239,0,4.858,0C255.307,241.499,255.307,240.523,255.307,239.245z M190.985,196.602
                        c-0.328-2.927-0.65-5.669-0.977-8.593c-0.976,1.298-1.949,2.434-2.759,3.727c-3.564,5.508-6.971,11.179-10.697,16.527
                        c-0.813,1.138-2.271,1.786-3.399,2.599c1.623,3.726,3.077,7.138,4.693,10.379c1.784-2.434,3.564-4.693,5.183-7.138
                        c-1.137-0.648-2.434-1.298-3.564-1.946c1.298-2.106,2.434-4.204,3.889-6.485c1.138,5.021,2.273,9.729,3.402,14.416
                        c-3.402,0-6.649,0-9.895,0c0.165,0.488,0.165,0.651,0.165,0.811c5.02,0.165,9.895,0.325,15.065,0.488
                        C191.798,213.129,191.313,204.874,190.985,196.602z M250.124,207.801c-0.651-3.077-1.299-6.16-1.949-9.573
                        c-3.561,0-7.134,0-10.862,0c0.162,3.402,0.326,6.486,0.488,9.895C241.86,208.125,245.914,207.965,250.124,207.801z
                        M217.738,227.406c0,2.272,0,4.043,0,6.316c2.757,0,5.347,0,8.1,0c0-1.949,0-3.889,0-5.995
                        C223.246,227.732,220.654,227.57,217.738,227.406z M225.688,207.311c-2.597-0.165-4.856-0.325-7.454-0.488
                        c0.162,1.299,0.162,2.434,0.326,3.559c2.434,0.325,4.693,0.65,7.127,0.975C225.688,210.063,225.688,208.762,225.688,207.311z
                        M225.686,219.13c-2.597-0.165-4.856-0.325-7.452-0.488c0,0.488,0,0.813,0,1.463c2.599,0,5.02,0,7.452,0
                        C225.686,219.782,225.686,219.456,225.686,219.13z"/>
                    </svg>
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