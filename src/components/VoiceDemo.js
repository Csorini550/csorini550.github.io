// VoiceDemo.js
class VoiceDemo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.welcomeAudioPlayed = false;
    this.languages = {
      english: {
        text: "I love working with JavaScript, React, Python, and Flask. They're my go-to tools for building powerful web applications.",
        audioSrc: "audio/english-demo.wav"
      },
      french: {
        text: "J'adore travailler avec JavaScript, React, Python et Flask. Ce sont mes outils préférés pour créer des applications web puissantes.",
        audioSrc: "audio/french-demo.wav"
      }
    };
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    
    // Show volume prompt when page loads
    if (!this.welcomeAudioPlayed) {
      setTimeout(() => {
        this.showVolumePrompt();
      }, 2000);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .voice-demo-section {
          padding: 64px 0;
          background-color: #f5f0ff;
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
          background: #8338ec;
          border-radius: 2px;
        }
        
        .section-header p {
          color: #777;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .demo-container {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          padding: 32px;
          margin-bottom: 32px;
        }
        
        .demo-steps {
          margin-bottom: 32px;
        }
        
        .step {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .step-number {
          width: 32px;
          height: 32px;
          background-color: #8338ec;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-title {
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }
        
        .step-description {
          color: #666;
          line-height: 1.5;
        }
        
        .audio-player {
          width: 100%;
          margin: 16px 0;
        }
        
        .audio-container {
          margin-top: 24px;
        }
        
        .audio-label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }
        
        .upload-container {
          border: 2px dashed #8338ec;
          border-radius: 8px;
          padding: 32px;
          text-align: center;
          margin-bottom: 24px;
          transition: background-color 0.3s ease;
        }
        
        .upload-container:hover {
          background-color: rgba(131, 56, 236, 0.05);
        }
        
        .upload-icon {
          font-size: 2rem;
          color: #8338ec;
          margin-bottom: 16px;
        }
        
        .upload-text {
          color: #666;
          margin-bottom: 16px;
        }
        
        .file-input {
          display: none;
        }
        
        .upload-btn, .generate-btn {
          background-color: #8338ec;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 12px 24px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
        }
        
        .upload-btn:hover, .generate-btn:hover {
          background-color: #6423c0;
        }
        
        .upload-btn:disabled, .generate-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .language-selector {
          display: flex;
          margin-bottom: 16px;
          gap: 12px;
        }
        
        .language-btn {
          background-color: #f0f0f0;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .language-btn.active {
          background-color: #8338ec;
          color: white;
        }
        
        .text-to-generate {
          width: 100%;
          min-height: 100px;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 12px;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 16px;
        }
        
        .generated-audio {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #f0f0f0;
        }
        
        /* Modal styles */
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          justify-content: center;
          align-items: center;
        }
        
        .modal-content {
          background-color: white;
          padding: 32px;
          border-radius: 8px;
          max-width: 500px;
          text-align: center;
        }
        
        .modal-title {
          font-size: 1.5rem;
          margin-bottom: 16px;
          color: #333;
        }
        
        .modal-text {
          margin-bottom: 24px;
          line-height: 1.6;
          color: #666;
        }
        
        .modal-btn {
          background-color: #8338ec;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 12px 24px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .modal-btn:hover {
          background-color: #6423c0;
        }
        
        .hide {
          display: none;
        }
        
        .show {
          display: flex;
        }
        
        @media (max-width: 768px) {
          .demo-container {
            padding: 24px 16px;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
        }
      </style>
      
      <section id="voice-demo" class="voice-demo-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>Voice Clone Demo</h2>
            <p>Experience the power of PipeCat AI voice cloning technology</p>
          </div>
          
          <div class="demo-container" data-aos="fade-up">
            <div class="demo-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">Listen to the Demo</div>
                  <div class="step-description">
                    First, listen to how PipeCat AI can generate speech in different languages using the same voice model.
                  </div>
                  <div class="audio-container">
                    <div class="language-selector">
                      <button class="language-btn active" data-language="english">English</button>
                      <button class="language-btn" data-language="french">French</button>
                    </div>
                    <audio id="demo-audio" class="audio-player" controls>
                      <source src="${this.languages.english.audioSrc}" type="audio/wav">
                      Your browser does not support the audio element.
                    </audio>
                    <p id="demo-text" class="demo-text">${this.languages.english.text}</p>
                  </div>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Upload Your Voice Sample</div>
                  <div class="step-description">
                    Upload a short recording of your voice (15-30 seconds). The AI will use this to clone your voice.
                  </div>
                  <div class="upload-container" id="upload-container">
                    <i class="fas fa-microphone upload-icon"></i>
                    <p class="upload-text">Drag & drop your audio file or click to browse</p>
                    <input type="file" id="voice-file" class="file-input" accept="audio/*">
                    <button class="upload-btn" id="upload-btn">Select Audio File</button>
                  </div>
                  <div id="selected-file" class="selected-file hide"></div>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Generate Speech in Your Voice</div>
                  <div class="step-description">
                    The AI will generate the following text in your voice.
                  </div>
                  <textarea id="text-to-generate" class="text-to-generate" readonly>I love working with JavaScript, React, Python, and Flask. They're my go-to tools for building powerful web applications.</textarea>
                  <button id="generate-btn" class="generate-btn" disabled>Generate Your Voice</button>
                  
                  <div id="generated-audio" class="generated-audio hide">
                    <div class="audio-label">Your Generated Voice:</div>
                    <audio id="cloned-audio" class="audio-player" controls>
                      <source src="" type="audio/wav">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Volume Prompt Modal -->
      <div id="volume-modal" class="modal">
        <div class="modal-content">
          <h3 class="modal-title">Please Turn On Your Volume</h3>
          <p class="modal-text">This experience includes audio demonstrations of voice cloning technology. Please ensure your volume is turned on for the best experience.</p>
          <button id="volume-confirm-btn" class="modal-btn">Got it!</button>
        </div>
      </div>
      
      <!-- Welcome Audio (hidden) -->
      <audio id="welcome-audio" src="audio/welcome-message.wav" preload="auto"></audio>
    `;
  }

  setupEventListeners() {
    // DOM elements
    const volumeModal = this.shadowRoot.getElementById('volume-modal');
    const volumeConfirmBtn = this.shadowRoot.getElementById('volume-confirm-btn');
    const welcomeAudio = this.shadowRoot.getElementById('welcome-audio');
    const languageBtns = this.shadowRoot.querySelectorAll('.language-btn');
    const demoAudio = this.shadowRoot.getElementById('demo-audio');
    const demoText = this.shadowRoot.getElementById('demo-text');
    const uploadBtn = this.shadowRoot.getElementById('upload-btn');
    const voiceFileInput = this.shadowRoot.getElementById('voice-file');
    const uploadContainer = this.shadowRoot.getElementById('upload-container');
    const selectedFile = this.shadowRoot.getElementById('selected-file');
    const generateBtn = this.shadowRoot.getElementById('generate-btn');
    const generatedAudio = this.shadowRoot.getElementById('generated-audio');
    const clonedAudio = this.shadowRoot.getElementById('cloned-audio');

    // Volume modal confirmation
    volumeConfirmBtn.addEventListener('click', () => {
      volumeModal.classList.remove('show');
      this.welcomeAudioPlayed = true;
      // Start playing the welcome audio after user confirms
      welcomeAudio.play();
    });

    // Language selector buttons
    languageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        languageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update audio source and text
        const language = btn.getAttribute('data-language');
        demoAudio.src = this.languages[language].audioSrc;
        demoText.textContent = this.languages[language].text;
        
        // Play the audio
        demoAudio.load();
        demoAudio.play();
      });
    });

    // File upload handling
    uploadBtn.addEventListener('click', () => {
      voiceFileInput.click();
    });

    uploadContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadContainer.style.backgroundColor = 'rgba(131, 56, 236, 0.1)';
    });

    uploadContainer.addEventListener('dragleave', () => {
      uploadContainer.style.backgroundColor = '';
    });

    uploadContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadContainer.style.backgroundColor = '';
      
      if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('audio/')) {
          this.handleFileSelection(file);
        }
      }
    });

    voiceFileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        this.handleFileSelection(e.target.files[0]);
      }
    });

    // Generate button
    generateBtn.addEventListener('click', () => {
      // Simulating voice cloning process
      generateBtn.disabled = true;
      generateBtn.textContent = 'Processing...';
      
      // In a real implementation, this would send the file to your API
      // and receive back the cloned audio
      setTimeout(() => {
        generateBtn.textContent = 'Generate Your Voice';
        generateBtn.disabled = false;
        
        // Show the generated audio section with the "cloned" result
        generatedAudio.classList.remove('hide');
        clonedAudio.src = 'audio/cloned-demo.wav'; // This would be a dynamically generated URL in a real implementation
        clonedAudio.load();
        clonedAudio.play();
      }, 3000);
    });
  }

  showVolumePrompt() {
    const volumeModal = this.shadowRoot.getElementById('volume-modal');
    volumeModal.classList.add('show');
  }

  handleFileSelection(file) {
    const selectedFile = this.shadowRoot.getElementById('selected-file');
    const generateBtn = this.shadowRoot.getElementById('generate-btn');
    
    // Display selected file info
    selectedFile.textContent = `Selected: ${file.name}`;
    selectedFile.classList.remove('hide');
    
    // Enable generate button
    generateBtn.disabled = false;
  }
}

customElements.define('voice-demo-component', VoiceDemo); 