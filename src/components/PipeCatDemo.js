// PipeCatDemo.js
class PipeCatDemo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isRecording = false;
    this.recorder = null;
    this.audioChunks = [];
    this.audioStream = null;
    this.conversationHistory = [];
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
        
        .pipecat-demo-section {
          padding: 64px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9f2ff 100%);
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
        
        .demo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        
        @media (max-width: 992px) {
          .demo-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .demo-container {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          height: 600px;
          display: flex;
          flex-direction: column;
        }
        
        .demo-header {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .demo-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 500;
        }
        
        .demo-subtitle {
          font-size: 0.9rem;
          opacity: 0.8;
          margin: 4px 0 0 0;
        }
        
        .demo-body {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .chat-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        
        .message {
          display: flex;
          margin-bottom: 16px;
        }
        
        .message.user {
          justify-content: flex-end;
        }
        
        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.95rem;
          line-height: 1.5;
          position: relative;
        }
        
        .message.user .message-bubble {
          background-color: #8338ec;
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .message.ai .message-bubble {
          background-color: #f0f2f5;
          color: #333;
          border-bottom-left-radius: 4px;
        }
        
        .message-time {
          font-size: 0.7rem;
          margin-top: 4px;
          opacity: 0.7;
          text-align: right;
        }
        
        .message.ai .message-time {
          text-align: left;
        }
        
        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e1e1e1;
          color: #666;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .message.user .message-avatar {
          margin-left: 12px;
          margin-right: 0;
          background-color: #8338ec;
          color: white;
        }
        
        .input-container {
          padding: 16px;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #fff;
        }
        
        .message-input {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 24px;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 0.95rem;
          resize: none;
          outline: none;
          max-height: 120px;
          transition: border-color 0.3s ease;
        }
        
        .message-input:focus {
          border-color: #8338ec;
        }
        
        .send-btn,
        .mic-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #8338ec;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }
        
        .send-btn:hover,
        .mic-btn:hover {
          background-color: rgba(131, 56, 236, 0.1);
        }
        
        .mic-btn.recording {
          background-color: #ff3b30;
          color: white;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .scenario-container {
          padding: 24px;
        }
        
        .scenario-header {
          margin-bottom: 16px;
          font-size: 1.2rem;
          color: #333;
          font-weight: 600;
        }
        
        .scenario-select {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
          background-color: white;
          font-family: inherit;
          margin-bottom: 16px;
          cursor: pointer;
        }
        
        .scenario-description {
          background-color: #f7f7f9;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          color: #666;
          line-height: 1.5;
        }
        
        .start-scenario-btn {
          background-color: #8338ec;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
          width: 100%;
        }
        
        .start-scenario-btn:hover {
          background-color: #6423c0;
        }
        
        .comparison-container {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-top: 32px;
        }
        
        .comparison-title {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          padding: 16px 24px;
          margin: 0;
          font-size: 1.2rem;
          font-weight: 500;
        }
        
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        
        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .comparison-column {
          padding: 24px;
        }
        
        .comparison-column:first-child {
          border-right: 1px solid #eee;
        }
        
        @media (max-width: 768px) {
          .comparison-column:first-child {
            border-right: none;
            border-bottom: 1px solid #eee;
          }
        }
        
        .comparison-column h3 {
          margin-top: 0;
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 16px;
        }
        
        .comparison-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .comparison-list li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
        }
        
        .comparison-list li i {
          margin-right: 8px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        .comparison-list.traditional li i {
          color: #ff3b30;
        }
        
        .comparison-list.ai li i {
          color: #34c759;
        }
        
        .audio-player {
          width: 100%;
          margin-top: 16px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .loading-indicator {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(131, 56, 236, 0.3);
          border-radius: 50%;
          border-top-color: #8338ec;
          animation: spin 1s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
      
      <section id="pipecat-demo" class="pipecat-demo-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>PipeCat Voice AI Demo</h2>
            <p>Experience the future of call center interactions with our AI-powered voice assistant. Compare traditional call center experiences with our AI-enhanced solution.</p>
          </div>
          
          <div class="demo-grid">
            <div class="demo-container" data-aos="fade-up">
              <div class="demo-header">
                <div>
                  <h3 class="demo-title">AI Call Center Assistant</h3>
                  <p class="demo-subtitle">Powered by PipeCat</p>
                </div>
                <div class="demo-status">Live Demo</div>
              </div>
              <div class="demo-body">
                <div class="chat-container" id="chat-container">
                  <!-- Initial welcome message -->
                  <div class="message ai">
                    <div class="message-avatar">AI</div>
                    <div>
                      <div class="message-bubble">
                        Hello! I'm your AI customer service assistant. How can I help you today?
                      </div>
                      <div class="message-time">Just now</div>
                    </div>
                  </div>
                </div>
                <div class="input-container">
                  <textarea class="message-input" id="message-input" placeholder="Type your message here..." rows="1"></textarea>
                  <button class="mic-btn" id="mic-btn">
                    <i class="fas fa-microphone"></i>
                  </button>
                  <button class="send-btn" id="send-btn">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="scenario-container" data-aos="fade-up" data-aos-delay="100">
              <h3 class="scenario-header">Choose a Scenario</h3>
              <select class="scenario-select" id="scenario-select">
                <option value="billing-inquiry">Billing Inquiry</option>
                <option value="tech-support">Technical Support</option>
                <option value="product-info">Product Information</option>
                <option value="complaint">Complaint Resolution</option>
              </select>
              
              <div class="scenario-description" id="scenario-description">
                <strong>Billing Inquiry:</strong> You want to inquire about a charge on your recent bill that you don't recognize. You need to verify if the charge is legitimate and possibly request a refund.
              </div>
              
              <button class="start-scenario-btn" id="start-scenario-btn">Start Scenario</button>
              
              <div class="comparison-container" data-aos="fade-up" data-aos-delay="150">
                <h3 class="comparison-title">Traditional vs. AI-Enhanced</h3>
                <div class="comparison-grid">
                  <div class="comparison-column">
                    <h3>Traditional Call Center</h3>
                    <ul class="comparison-list traditional">
                      <li><i class="fas fa-times-circle"></i> Average wait time: 8-15 minutes</li>
                      <li><i class="fas fa-times-circle"></i> Limited operating hours</li>
                      <li><i class="fas fa-times-circle"></i> Often transferred between agents</li>
                      <li><i class="fas fa-times-circle"></i> Inconsistent quality of service</li>
                      <li><i class="fas fa-times-circle"></i> Limited language support</li>
                    </ul>
                    <audio class="audio-player" controls>
                      <source src="audio/traditional-call-center.wav" type="audio/wav">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div class="comparison-column">
                    <h3>AI-Enhanced Experience</h3>
                    <ul class="comparison-list ai">
                      <li><i class="fas fa-check-circle"></i> Instant response, no waiting</li>
                      <li><i class="fas fa-check-circle"></i> 24/7 availability</li>
                      <li><i class="fas fa-check-circle"></i> Consistent answers across interactions</li>
                      <li><i class="fas fa-check-circle"></i> Personalized service based on history</li>
                      <li><i class="fas fa-check-circle"></i> Supports multiple languages</li>
                    </ul>
                    <audio class="audio-player" controls>
                      <source src="audio/ai-enhanced-call-center.wav" type="audio/wav">
                      Your browser does not support the audio element.
                    </audio>
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
    const messageInput = this.shadowRoot.getElementById('message-input');
    const sendBtn = this.shadowRoot.getElementById('send-btn');
    const micBtn = this.shadowRoot.getElementById('mic-btn');
    const scenarioSelect = this.shadowRoot.getElementById('scenario-select');
    const scenarioDescription = this.shadowRoot.getElementById('scenario-description');
    const startScenarioBtn = this.shadowRoot.getElementById('start-scenario-btn');

    // Auto-resize text area as user types
    messageInput.addEventListener('input', () => {
      messageInput.style.height = 'auto';
      messageInput.style.height = (messageInput.scrollHeight) + 'px';
    });

    // Send message when user clicks send button
    sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send message when user presses Enter (without Shift)
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Toggle voice recording when user clicks mic button
    micBtn.addEventListener('click', () => {
      this.toggleRecording();
    });

    // Update scenario description when user selects a different scenario
    scenarioSelect.addEventListener('change', () => {
      this.updateScenarioDescription(scenarioSelect.value);
    });

    // Start scenario when user clicks start button
    startScenarioBtn.addEventListener('click', () => {
      this.startScenario(scenarioSelect.value);
    });
  }

  sendMessage() {
    const messageInput = this.shadowRoot.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
      // Add user message to chat
      this.addMessage(message, 'user');
      
      // Clear input
      messageInput.value = '';
      messageInput.style.height = 'auto';
      
      // Simulate AI response (in a real implementation, this would call an API)
      this.simulateTyping().then(() => {
        this.respondToMessage(message);
      });
    }
  }

  toggleRecording() {
    const micBtn = this.shadowRoot.getElementById('mic-btn');
    
    if (this.isRecording) {
      // Stop recording
      this.stopRecording();
      micBtn.classList.remove('recording');
      micBtn.querySelector('i').className = 'fas fa-microphone';
    } else {
      // Start recording
      this.startRecording();
      micBtn.classList.add('recording');
      micBtn.querySelector('i').className = 'fas fa-stop';
    }
    
    this.isRecording = !this.isRecording;
  }

  startRecording() {
    // In a real implementation, this would use the Web Audio API and MediaRecorder
    // For now, we'll simulate recording
    this.audioChunks = [];
    
    // Get user media (microphone)
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.audioStream = stream;
        this.recorder = new MediaRecorder(stream);
        
        this.recorder.addEventListener('dataavailable', e => {
          this.audioChunks.push(e.data);
        });
        
        this.recorder.addEventListener('stop', () => {
          const audioBlob = new Blob(this.audioChunks);
          // In a real implementation, you would send this blob to your speech-to-text API
          // For now, we'll simulate a response
          setTimeout(() => {
            // Simulate a user message detected from speech
            const simulatedText = "I'd like to inquire about my recent bill. There's a charge I don't recognize.";
            this.addMessage(simulatedText, 'user');
            
            // Process the message
            this.simulateTyping().then(() => {
              this.respondToMessage(simulatedText);
            });
          }, 1500);
        });
        
        this.recorder.start();
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
        alert('Error accessing microphone. Please check your browser permissions.');
        
        // Reset recording state
        const micBtn = this.shadowRoot.getElementById('mic-btn');
        micBtn.classList.remove('recording');
        micBtn.querySelector('i').className = 'fas fa-microphone';
        this.isRecording = false;
      });
  }

  stopRecording() {
    if (this.recorder && this.recorder.state !== 'inactive') {
      this.recorder.stop();
    }
    
    // Stop all audio tracks
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
    }
  }

  addMessage(text, sender) {
    const chatContainer = this.shadowRoot.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // Format current time
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create HTML for the message
    messageDiv.innerHTML = `
      <div class="message-avatar">${sender === 'user' ? 'You' : 'AI'}</div>
      <div>
        <div class="message-bubble">${text}</div>
        <div class="message-time">${timeStr}</div>
      </div>
    `;
    
    // Add to chat container
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Add to conversation history
    this.conversationHistory.push({
      sender,
      text,
      timestamp: now
    });
  }

  simulateTyping() {
    // Add typing indicator
    const chatContainer = this.shadowRoot.getElementById('chat-container');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing';
    typingDiv.innerHTML = `
      <div class="message-avatar">AI</div>
      <div>
        <div class="message-bubble">
          <div class="loading-indicator"></div> Typing...
        </div>
      </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Return a promise that resolves after a delay
    return new Promise(resolve => {
      setTimeout(() => {
        // Remove typing indicator
        chatContainer.removeChild(typingDiv);
        resolve();
      }, 1500);
    });
  }

  respondToMessage(message) {
    // In a real implementation, this would call an AI API
    // For now, we'll use a simple set of predetermined responses
    
    const lowercaseMsg = message.toLowerCase();
    let response;
    
    if (lowercaseMsg.includes('bill') || lowercaseMsg.includes('charge') || lowercaseMsg.includes('payment')) {
      response = "I can help you with your billing inquiry. I see there was a charge of $49.99 on May 15th for a premium service subscription. This appears to be for the annual renewal. Would you like me to provide more details about this charge or help you with a refund?";
    } else if (lowercaseMsg.includes('refund') || lowercaseMsg.includes('money back')) {
      response = "I understand you'd like a refund. I've reviewed your account and you're eligible for a full refund as you're within the 30-day guarantee period. I've initiated the refund process, and you should see the amount credited back to your account within 3-5 business days. Is there anything else you'd like help with?";
    } else if (lowercaseMsg.includes('tech') || lowercaseMsg.includes('problem') || lowercaseMsg.includes('not working')) {
      response = "I'm sorry to hear you're experiencing technical issues. To help diagnose the problem, could you please tell me what device you're using and what specific issue you're encountering? This will help me provide you with the most accurate troubleshooting steps.";
    } else if (lowercaseMsg.includes('product') || lowercaseMsg.includes('feature') || lowercaseMsg.includes('information')) {
      response = "Our premium service includes 24/7 customer support, advanced analytics, unlimited storage, and priority processing. The annual subscription is $49.99, which saves you 30% compared to the monthly plan. Would you like me to tell you more about any specific feature?";
    } else if (lowercaseMsg.includes('complaint') || lowercaseMsg.includes('unhappy') || lowercaseMsg.includes('disappointed')) {
      response = "I'm truly sorry to hear about your negative experience. Your satisfaction is our top priority, and I'd like to address your concerns immediately. Could you please provide more details about the issue you've encountered? I'll make sure this is escalated to our customer experience team.";
    } else if (lowercaseMsg.includes('thank')) {
      response = "You're very welcome! I'm glad I could help. Is there anything else you'd like assistance with today?";
    } else if (lowercaseMsg.includes('bye') || lowercaseMsg.includes('goodbye')) {
      response = "Thank you for chatting with me today. I hope I was able to assist you. Have a wonderful day!";
    } else {
      response = "Thank you for your message. I'm here to help with billing inquiries, technical support, product information, or any concerns you might have. Could you please provide more details about what you need assistance with?";
    }
    
    // Add AI response to chat
    this.addMessage(response, 'ai');
  }

  updateScenarioDescription(scenario) {
    const scenarioDescription = this.shadowRoot.getElementById('scenario-description');
    
    switch (scenario) {
      case 'billing-inquiry':
        scenarioDescription.innerHTML = "<strong>Billing Inquiry:</strong> You want to inquire about a charge on your recent bill that you don't recognize. You need to verify if the charge is legitimate and possibly request a refund.";
        break;
      case 'tech-support':
        scenarioDescription.innerHTML = "<strong>Technical Support:</strong> Your account access has stopped working unexpectedly. You need help troubleshooting and regaining access to your premium features.";
        break;
      case 'product-info':
        scenarioDescription.innerHTML = "<strong>Product Information:</strong> You're considering upgrading to a premium service but want to learn more about the features, pricing, and benefits before making a decision.";
        break;
      case 'complaint':
        scenarioDescription.innerHTML = "<strong>Complaint Resolution:</strong> You experienced poor service from a previous interaction and want to file a complaint and seek resolution to your issue.";
        break;
    }
  }

  startScenario(scenario) {
    // Clear existing chat
    const chatContainer = this.shadowRoot.getElementById('chat-container');
    chatContainer.innerHTML = '';
    
    // Reset conversation history
    this.conversationHistory = [];
    
    // Add initial message based on selected scenario
    const initialMessage = "Hello! I'm your AI customer service assistant. How can I help you today?";
    this.addMessage(initialMessage, 'ai');
    
    // Provide a hint based on the selected scenario
    let hint;
    switch (scenario) {
      case 'billing-inquiry':
        hint = "Try asking about a charge on your bill that you don't recognize, or request information about a recent payment.";
        break;
      case 'tech-support':
        hint = "Try explaining that you're having trouble accessing your account or that a specific feature isn't working correctly.";
        break;
      case 'product-info':
        hint = "Try asking about features, pricing, or benefits of our premium service, or request a comparison between different plans.";
        break;
      case 'complaint':
        hint = "Try explaining a negative experience you had and ask for resolution, or request to speak with a supervisor.";
        break;
    }
    
    // Add hint message after a short delay
    setTimeout(() => {
      this.addMessage(`Hint: ${hint}`, 'ai');
    }, 1000);
  }
}

customElements.define('pipecat-demo-component', PipeCatDemo);

export default PipeCatDemo; 