// AIContentGenerator.js
class AIContentGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isGenerating = false;
    
    // Sample voice options
    this.voiceOptions = [
      { id: 'professional', name: 'Professional', description: 'Clear and authoritative tone, ideal for business communication' },
      { id: 'friendly', name: 'Friendly', description: 'Warm and approachable tone, perfect for customer support' },
      { id: 'technical', name: 'Technical', description: 'Precise and detailed, good for explaining complex topics' }
    ];
    
    // Sample script templates
    this.scriptTemplates = {
      'greeting': 'Thank you for calling [Company]. My name is [Name]. How can I assist you today?',
      'problem-solving': 'I understand you\'re experiencing an issue with [Problem]. Let me help you troubleshoot that.',
      'closing': 'Is there anything else I can help you with today? Thank you for calling [Company], and have a great day!'
    };
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .content-generator-section {
          padding: 64px 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9f1ff 100%);
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
          max-width: 700px;
          margin: 0 auto;
        }
        
        .generator-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        @media (max-width: 992px) {
          .generator-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .generator-card {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .generator-header {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          padding: 24px;
          position: relative;
        }
        
        .generator-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .generator-subtitle {
          margin: 8px 0 0;
          font-size: 1rem;
          opacity: 0.8;
        }
        
        .generator-body {
          padding: 24px;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }
        
        .form-control {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #8338ec;
        }
        
        select.form-control {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 32px;
        }
        
        textarea.form-control {
          min-height: 120px;
          resize: vertical;
        }
        
        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 8px;
        }
        
        .radio-option {
          flex: 1;
          min-width: 180px;
          background-color: #f5f5f5;
          border-radius: 8px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .radio-option:hover {
          background-color: #f0f0f0;
        }
        
        .radio-option.selected {
          background-color: rgba(131, 56, 236, 0.1);
          border-color: #8338ec;
        }
        
        .radio-title {
          margin: 0 0 8px;
          font-weight: 600;
          color: #333;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }
        
        .radio-title input {
          margin-right: 8px;
        }
        
        .radio-description {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        .generate-btn {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        
        .generate-btn:hover {
          background: linear-gradient(90deg, #7331d4 0%, #2e78e6 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .generate-btn:disabled {
          background: #cccccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .result-card {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .result-header {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          padding: 24px;
          position: relative;
        }
        
        .result-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .result-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .result-content {
          background-color: #f7f7f9;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 1rem;
          color: #333;
          line-height: 1.6;
          flex: 1;
          overflow-y: auto;
          white-space: pre-wrap;
          font-family: 'Arial', sans-serif;
        }
        
        .result-actions {
          display: flex;
          gap: 12px;
        }
        
        .action-btn {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .copy-btn {
          background-color: #f0f2f5;
          color: #333;
          border: none;
        }
        
        .copy-btn:hover {
          background-color: #e4e6e9;
        }
        
        .voice-preview-btn {
          background-color: #8338ec;
          color: white;
          border: none;
        }
        
        .voice-preview-btn:hover {
          background-color: #6423c0;
        }
        
        .voice-preview-btn i,
        .copy-btn i {
          margin-right: 8px;
        }
        
        .audio-player {
          width: 100%;
          margin-top: 16px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .template-btn {
          background-color: #f0f2f5;
          color: #333;
          border: none;
          padding: 8px 16px;
          border-radius: 16px;
          font-size: 0.9rem;
          margin-right: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: inline-block;
        }
        
        .template-btn:hover {
          background-color: #e4e6e9;
        }
        
        .templates-container {
          margin-bottom: 16px;
        }
      </style>
      
      <section id="content-generator" class="content-generator-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>AI Content Generator</h2>
            <p>Generate custom call center scripts and preview them with different voice styles</p>
          </div>
          
          <div class="generator-grid">
            <div class="generator-card" data-aos="fade-up">
              <div class="generator-header">
                <h3 class="generator-title">Script Generator</h3>
                <p class="generator-subtitle">Create personalized customer service scripts</p>
              </div>
              <div class="generator-body">
                <div class="form-group">
                  <label class="form-label">Scenario</label>
                  <select id="scenario-select" class="form-control">
                    <option value="customer-service">Customer Service</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="complaint">Complaint Resolution</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Company Name</label>
                  <input type="text" id="company-input" class="form-control" placeholder="E.g., TechSolutions Inc." value="PipeCat Solutions">
                </div>
                
                <div class="form-group">
                  <label class="form-label">Voice Style</label>
                  <div class="radio-group" id="voice-options">
                    ${this.voiceOptions.map((voice, index) => `
                      <div class="radio-option ${index === 0 ? 'selected' : ''}" data-voice="${voice.id}">
                        <div class="radio-title">
                          <input type="radio" name="voice" value="${voice.id}" ${index === 0 ? 'checked' : ''}>
                          ${voice.name}
                        </div>
                        <p class="radio-description">${voice.description}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Script Content</label>
                  <div class="templates-container">
                    <small>Quick templates:</small><br>
                    <button class="template-btn" data-template="greeting">Greeting</button>
                    <button class="template-btn" data-template="problem-solving">Problem Solving</button>
                    <button class="template-btn" data-template="closing">Closing</button>
                  </div>
                  <textarea id="script-input" class="form-control" placeholder="Enter your script content here or use a template..."></textarea>
                </div>
                
                <button id="generate-btn" class="generate-btn">
                  Generate Script
                </button>
              </div>
            </div>
            
            <div class="result-card" data-aos="fade-up" data-aos-delay="100">
              <div class="result-header">
                <h3 class="result-title">Generated Result</h3>
              </div>
              <div class="result-body">
                <div id="result-content" class="result-content">
                  Your generated script will appear here. Start by filling out the form on the left and clicking "Generate Script".
                </div>
                
                <div class="result-actions">
                  <button id="copy-btn" class="action-btn copy-btn">
                    <i class="fas fa-copy"></i> Copy to Clipboard
                  </button>
                  <button id="voice-preview-btn" class="action-btn voice-preview-btn">
                    <i class="fas fa-volume-up"></i> Preview Voice
                  </button>
                </div>
                
                <audio id="audio-player" class="audio-player" controls style="display: none;">
                  <source src="" type="audio/wav">
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  setupEventListeners() {
    const scenarioSelect = this.shadowRoot.getElementById('scenario-select');
    const companyInput = this.shadowRoot.getElementById('company-input');
    const scriptInput = this.shadowRoot.getElementById('script-input');
    const generateBtn = this.shadowRoot.getElementById('generate-btn');
    const resultContent = this.shadowRoot.getElementById('result-content');
    const copyBtn = this.shadowRoot.getElementById('copy-btn');
    const voicePreviewBtn = this.shadowRoot.getElementById('voice-preview-btn');
    const audioPlayer = this.shadowRoot.getElementById('audio-player');
    const voiceOptions = this.shadowRoot.querySelectorAll('.radio-option');
    const templateBtns = this.shadowRoot.querySelectorAll('.template-btn');
    
    // Handle voice option selection
    voiceOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Update the radio button selection
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Update the selected class
        voiceOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });
    
    // Handle template buttons
    templateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const templateKey = btn.dataset.template;
        let templateText = this.scriptTemplates[templateKey] || '';
        
        // Replace placeholders with values
        templateText = templateText.replace('[Company]', companyInput.value || 'Our Company');
        templateText = templateText.replace('[Name]', 'Alex');
        
        // Insert at cursor position or append
        if (document.activeElement === scriptInput) {
          const startPos = scriptInput.selectionStart;
          const endPos = scriptInput.selectionEnd;
          scriptInput.value = scriptInput.value.substring(0, startPos) + 
                              templateText + 
                              scriptInput.value.substring(endPos);
          
          // Set cursor position after inserted text
          scriptInput.selectionStart = startPos + templateText.length;
          scriptInput.selectionEnd = startPos + templateText.length;
          scriptInput.focus();
        } else {
          // Append to existing text with a newline if needed
          if (scriptInput.value && !scriptInput.value.endsWith('\n')) {
            scriptInput.value += '\n';
          }
          scriptInput.value += templateText;
        }
      });
    });
    
    // Generate script
    generateBtn.addEventListener('click', () => {
      if (this.isGenerating) return;
      
      this.isGenerating = true;
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<div class="loading-spinner"></div> Generating...';
      
      // Get selected voice
      const selectedVoice = this.shadowRoot.querySelector('input[name="voice"]:checked').value;
      
      // Hide audio player during generation
      audioPlayer.style.display = 'none';
      
      // Simulate generation (in a real implementation, this would call an API)
      setTimeout(() => {
        const scenario = scenarioSelect.value;
        const company = companyInput.value || 'Our Company';
        const scriptText = scriptInput.value || 'Welcome to our service.';
        
        // Generate enhanced script based on inputs
        const enhancedScript = this.enhanceScript(scriptText, scenario, company, selectedVoice);
        
        // Update result
        resultContent.textContent = enhancedScript;
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.innerHTML = 'Generate Script';
        this.isGenerating = false;
      }, 2000);
    });
    
    // Copy to clipboard
    copyBtn.addEventListener('click', () => {
      const content = resultContent.textContent;
      navigator.clipboard.writeText(content).then(() => {
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy to Clipboard';
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Failed to copy to clipboard');
      });
    });
    
    // Voice preview
    voicePreviewBtn.addEventListener('click', () => {
      const selectedVoice = this.shadowRoot.querySelector('input[name="voice"]:checked').value;
      
      // In a real implementation, this would call a text-to-speech API
      // For this demo, we'll simulate it with a predefined audio file
      
      // Show loading state
      voicePreviewBtn.disabled = true;
      voicePreviewBtn.innerHTML = '<div class="loading-spinner"></div> Loading...';
      
      // Simulate API call delay
      setTimeout(() => {
        // Set the audio source based on selected voice
        // In a real implementation, this would be a dynamically generated audio from an API
        let audioSrc;
        switch(selectedVoice) {
          case 'professional':
            audioSrc = 'audio/professional-voice.wav';
            break;
          case 'friendly':
            audioSrc = 'audio/friendly-voice.wav';
            break;
          case 'technical':
            audioSrc = 'audio/technical-voice.wav';
            break;
          default:
            audioSrc = 'audio/professional-voice.wav';
        }
        
        // Update audio source
        const sourceElement = audioPlayer.querySelector('source');
        sourceElement.src = audioSrc;
        audioPlayer.load();
        
        // Display and play the audio
        audioPlayer.style.display = 'block';
        
        // Reset button
        voicePreviewBtn.disabled = false;
        voicePreviewBtn.innerHTML = '<i class="fas fa-volume-up"></i> Preview Voice';
      }, 1500);
    });
  }

  enhanceScript(scriptText, scenario, company, voiceStyle) {
    // In a real implementation, this would use an AI model to enhance the script
    // For this demo, we'll add some predefined enhancements
    
    // Add introduction based on scenario
    let enhancedScript = scriptText;
    
    // If the script doesn't already have a greeting, add one
    if (!scriptText.includes('Hello') && !scriptText.includes('Hi') && !scriptText.includes('Welcome')) {
      let greeting = '';
      
      switch(scenario) {
        case 'customer-service':
          greeting = `Hello! Thank you for contacting ${company} customer service. `;
          break;
        case 'technical-support':
          greeting = `Hello! You've reached ${company} technical support. `;
          break;
        case 'sales':
          greeting = `Hello! Thank you for your interest in ${company}. `;
          break;
        case 'complaint':
          greeting = `Hello! I'm sorry to hear you're experiencing an issue with ${company}. `;
          break;
        default:
          greeting = `Hello! Thank you for contacting ${company}. `;
      }
      
      enhancedScript = greeting + enhancedScript;
    }
    
    // Add voice style enhancements
    switch(voiceStyle) {
      case 'professional':
        enhancedScript = enhancedScript.replace(/let me/gi, 'allow me to');
        enhancedScript = enhancedScript.replace(/I think/gi, 'I recommend');
        enhancedScript = enhancedScript.replace(/sorry about that/gi, 'I apologize for the inconvenience');
        break;
        
      case 'friendly':
        enhancedScript = enhancedScript.replace(/thank you/gi, 'thanks so much');
        enhancedScript = enhancedScript.replace(/I will/gi, 'I\'ll');
        enhancedScript = enhancedScript.replace(/assistance/gi, 'help');
        break;
        
      case 'technical':
        enhancedScript = enhancedScript.replace(/problem/gi, 'issue');
        enhancedScript = enhancedScript.replace(/fix/gi, 'resolve');
        enhancedScript = enhancedScript.replace(/look at/gi, 'analyze');
        break;
    }
    
    // Add closing if not present
    if (!scriptText.includes('thank you') && !scriptText.includes('Thanks')) {
      enhancedScript += `\n\nThank you for choosing ${company}. Is there anything else I can assist you with today?`;
    }
    
    return enhancedScript;
  }
}

customElements.define('ai-content-generator-component', AIContentGenerator);

export default AIContentGenerator; 