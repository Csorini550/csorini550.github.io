// AIBioAssistant.js
class AIBioAssistant extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.conversationHistory = [];
    
    // Knowledge base about personal info, career, skills, and AI experience
    // In a real implementation, this would be more extensive and possibly loaded from an external source
    this.knowledgeBase = {
      personal: {
        name: "Christopher T. Sorini",
        location: "Chicago, IL",
        education: "Master's in Computer Science, University of Illinois",
        interests: ["Artificial Intelligence", "Web Development", "Voice Technology", "Call Center Solutions"]
      },
      career: {
        currentRole: "Senior Software Engineer specializing in AI and voice technologies",
        experience: "8+ years of experience in software development with a focus on AI applications",
        previousRoles: [
          "AI Solutions Architect at TechVoice Inc. (2020-Present)",
          "Senior Developer at CallSmart Solutions (2017-2020)",
          "Software Engineer at WebTech Innovations (2015-2017)"
        ],
        achievements: [
          "Led the implementation of AI voice recognition system that reduced call center resolution times by 45%",
          "Developed custom language models for industry-specific terminology processing",
          "Created a voice-enabled customer service platform serving over 50,000 customers daily"
        ]
      },
      skills: {
        programming: ["JavaScript", "Python", "TypeScript", "Java", "C++"],
        frameworks: ["React", "Node.js", "Express", "Flask", "TensorFlow", "PyTorch"],
        cloud: ["AWS", "Google Cloud", "Azure"],
        aiTools: ["OpenAI API", "Hugging Face", "TensorFlow", "PipeCat", "Whisper ASR", "Custom LLM fine-tuning"]
      },
      projects: {
        callCenterAI: {
          title: "Intelligent Call Routing System",
          description: "Designed and implemented an AI system that analyzes caller intent in real-time and routes calls to the appropriate department with 93% accuracy.",
          technologies: ["Python", "TensorFlow", "AWS", "PipeCat"]
        },
        voiceAnalytics: {
          title: "Voice Sentiment Analysis Platform",
          description: "Built a platform that analyzes customer sentiment during calls to identify satisfaction levels and potential escalation scenarios.",
          technologies: ["Python", "Natural Language Processing", "React", "Node.js"]
        },
        multilingual: {
          title: "Multilingual Voice Assistant",
          description: "Developed a voice assistant capable of handling customer inquiries in 12 different languages with dialect recognition.",
          technologies: ["Python", "TensorFlow", "WebRTC", "Custom Acoustic Models"]
        }
      },
      aiInterest: {
        focus: "Specialized in voice AI technologies for call centers and customer service applications",
        philosophy: "AI should enhance human capabilities, not replace them. In call centers, this means handling routine inquiries efficiently while escalating complex issues to human agents.",
        future: "Working towards developing more contextually aware AI systems that can better understand emotional nuances in voice interactions."
      }
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
        
        .ai-bio-section {
          padding: 64px 0;
          background: linear-gradient(135deg, #f7f9fc 0%, #edf5ff 100%);
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
        
        .assistant-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 32px;
          align-items: start;
        }
        
        @media (max-width: 992px) {
          .assistant-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .assistant-info {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 0;
        }
        
        .assistant-header {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          padding: 24px;
          position: relative;
        }
        
        .assistant-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .assistant-avatar i {
          font-size: 48px;
          color: #8338ec;
        }
        
        .assistant-name {
          margin: 0;
          font-size: 1.5rem;
          text-align: center;
          font-weight: 600;
        }
        
        .assistant-title {
          margin: 8px 0 0;
          font-size: 1rem;
          text-align: center;
          opacity: 0.8;
        }
        
        .skills-container {
          padding: 24px;
        }
        
        .skill-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 16px;
          color: #333;
        }
        
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .skill-tag {
          background-color: #f0f0f0;
          color: #555;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .chat-container {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 600px;
        }
        
        .chat-header {
          background: linear-gradient(90deg, #8338ec 0%, #3a86ff 100%);
          color: white;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .chat-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 500;
        }
        
        .chat-subtitle {
          font-size: 0.9rem;
          opacity: 0.8;
          margin: 4px 0 0 0;
        }
        
        .chat-messages {
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
        
        .chat-input {
          padding: 16px;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 12px;
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
        
        .send-btn {
          background: #8338ec;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        
        .send-btn:hover {
          background-color: #6423c0;
        }
        
        .suggested-questions {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .suggested-question {
          background-color: #f0f2f5;
          border: none;
          padding: 8px 16px;
          border-radius: 16px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color: #555;
        }
        
        .suggested-question:hover {
          background-color: #e4e6e9;
        }
        
        .typing-indicator {
          display: inline-flex;
          align-items: center;
          margin: 0 16px;
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #8338ec;
          margin: 0 2px;
          opacity: 0.6;
        }
        
        .typing-dot:nth-child(1) {
          animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(2) {
          animation: typing 1.4s infinite 0.2s;
        }
        
        .typing-dot:nth-child(3) {
          animation: typing 1.4s infinite 0.4s;
        }
        
        @keyframes typing {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
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
      
      <section id="ai-bio-assistant" class="ai-bio-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>AI-Powered Bio Assistant</h2>
            <p>Ask me anything about Christopher's background, skills, projects, or interests in AI and call center technologies</p>
          </div>
          
          <div class="assistant-grid">
            <div class="assistant-info" data-aos="fade-up">
              <div class="assistant-header">
                <div class="assistant-avatar">
                  <i class="fas fa-robot"></i>
                </div>
                <h3 class="assistant-name">Chris AI</h3>
                <p class="assistant-title">Personal Bio Assistant</p>
              </div>
              <div class="skills-container">
                <h4 class="skill-title">About Me</h4>
                <p>I'm an AI assistant trained on Christopher's background, experience, and interests. Ask me questions about his:</p>
                <div class="skill-tags">
                  <span class="skill-tag">Work Experience</span>
                  <span class="skill-tag">Technical Skills</span>
                  <span class="skill-tag">Projects</span>
                  <span class="skill-tag">AI Expertise</span>
                  <span class="skill-tag">Call Center Tech</span>
                  <span class="skill-tag">PipeCat Experience</span>
                </div>
                
                <h4 class="skill-title">Try Asking About</h4>
                <div class="skill-tags">
                  <span class="skill-tag">Voice AI Implementation</span>
                  <span class="skill-tag">AI for Call Centers</span>
                  <span class="skill-tag">Tech Stack</span>
                  <span class="skill-tag">Professional Journey</span>
                  <span class="skill-tag">Current Projects</span>
                </div>
              </div>
            </div>
            
            <div class="chat-container" data-aos="fade-up" data-aos-delay="100">
              <div class="chat-header">
                <div>
                  <h3 class="chat-title">Interactive Resume</h3>
                  <p class="chat-subtitle">Ask questions about Christopher's experience</p>
                </div>
              </div>
              <div class="chat-messages" id="chat-messages">
                <!-- Initial welcome message -->
                <div class="message ai">
                  <div class="message-avatar">AI</div>
                  <div>
                    <div class="message-bubble">
                      Hello! I'm Chris AI, your personal guide to Christopher's professional journey, skills, and interests. What would you like to know about him?
                    </div>
                    <div class="message-time">Just now</div>
                  </div>
                </div>
              </div>
              <div class="chat-input">
                <textarea id="message-input" class="message-input" placeholder="Ask me anything about Christopher..." rows="1"></textarea>
                <button id="send-btn" class="send-btn">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
              <div class="suggested-questions" id="suggested-questions">
                <button class="suggested-question">What is Chris's experience with AI?</button>
                <button class="suggested-question">Tell me about his call center projects</button>
                <button class="suggested-question">What skills does Chris have?</button>
                <button class="suggested-question">What is PipeCat?</button>
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
    const suggestedQuestions = this.shadowRoot.querySelectorAll('.suggested-question');
    
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
    
    // Handle suggested questions
    suggestedQuestions.forEach(button => {
      button.addEventListener('click', () => {
        messageInput.value = button.textContent;
        this.sendMessage();
      });
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
      
      // Generate response (with typing indicator)
      this.simulateTyping().then(() => {
        const response = this.generateResponse(message);
        this.addMessage(response, 'ai');
      });
    }
  }

  addMessage(text, sender) {
    const chatMessages = this.shadowRoot.getElementById('chat-messages');
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
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to conversation history
    this.conversationHistory.push({
      sender,
      text,
      timestamp: now
    });
  }

  simulateTyping() {
    // Add typing indicator
    const chatMessages = this.shadowRoot.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing';
    typingDiv.innerHTML = `
      <div class="message-avatar">AI</div>
      <div>
        <div class="message-bubble">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Return a promise that resolves after a delay
    return new Promise(resolve => {
      setTimeout(() => {
        // Remove typing indicator
        chatMessages.removeChild(typingDiv);
        resolve();
      }, 1500);
    });
  }

  generateResponse(question) {
    // In a real implementation, this would use a more sophisticated NLP approach
    // or call an external AI API with proper context management
    
    const lowercaseQuestion = question.toLowerCase();
    
    // Handle greetings
    if (this.containsAny(lowercaseQuestion, ['hi', 'hello', 'hey', 'greetings'])) {
      return "Hello! I'm happy to tell you all about Christopher T. Sorini's background, skills, and experiences. What specific aspect would you like to know about?";
    }
    
    // Handle goodbyes
    if (this.containsAny(lowercaseQuestion, ['bye', 'goodbye', 'see you', 'farewell'])) {
      return "Thank you for your interest in Christopher's background! If you have any more questions later, feel free to ask. Have a great day!";
    }
    
    // Handle thanks
    if (this.containsAny(lowercaseQuestion, ['thanks', 'thank you', 'appreciate'])) {
      return "You're welcome! I'm here to help you learn more about Christopher. Is there anything else you'd like to know?";
    }
    
    // Handle questions about experience
    if (this.containsAny(lowercaseQuestion, ['experience', 'work history', 'job', 'career', 'profession'])) {
      return `Christopher has ${this.knowledgeBase.career.experience} with a focus on AI applications for voice technologies and call centers. His career journey includes:\n\n` +
        `• ${this.knowledgeBase.career.previousRoles.join('\n• ')}\n\n` +
        `Notable achievements include leading the implementation of an AI voice recognition system that reduced call center resolution times by 45% and developing custom language models for industry-specific terminology processing.`;
    }
    
    // Handle questions about skills
    if (this.containsAny(lowercaseQuestion, ['skills', 'technologies', 'tech stack', 'programming', 'languages'])) {
      return `Christopher has expertise in a variety of technologies:\n\n` +
        `• Programming: ${this.knowledgeBase.skills.programming.join(', ')}\n` +
        `• Frameworks: ${this.knowledgeBase.skills.frameworks.join(', ')}\n` +
        `• Cloud: ${this.knowledgeBase.skills.cloud.join(', ')}\n` +
        `• AI Tools: ${this.knowledgeBase.skills.aiTools.join(', ')}\n\n` +
        `His core specialty is in voice AI technologies and natural language processing, particularly as applied to call center and customer service applications.`;
    }
    
    // Handle questions about projects
    if (this.containsAny(lowercaseQuestion, ['projects', 'portfolio', 'work', 'built'])) {
      const projects = this.knowledgeBase.projects;
      return `Here are some of Christopher's notable projects:\n\n` +
        `1. ${projects.callCenterAI.title}: ${projects.callCenterAI.description}\n` +
        `2. ${projects.voiceAnalytics.title}: ${projects.voiceAnalytics.description}\n` +
        `3. ${projects.multilingual.title}: ${projects.multilingual.description}\n\n` +
        `Each project showcases his expertise in AI voice technologies and their practical applications in call center environments.`;
    }
    
    // Handle questions about AI expertise
    if (this.containsAny(lowercaseQuestion, ['ai', 'artificial intelligence', 'machine learning', 'ml'])) {
      return `Christopher specializes in ${this.knowledgeBase.aiInterest.focus}. His philosophy is that "${this.knowledgeBase.aiInterest.philosophy}" Currently, he's ${this.knowledgeBase.aiInterest.future}`;
    }
    
    // Handle questions about call centers
    if (this.containsAny(lowercaseQuestion, ['call center', 'call centres', 'customer service', 'support', 'helpdesk'])) {
      return `Christopher has extensive experience developing AI solutions for call centers, including intelligent routing systems, voice sentiment analysis, and multilingual assistants. He's particularly focused on creating AI systems that can understand context and emotional nuances in customer interactions, leading to more personalized and efficient service. His call center AI projects have demonstrated significant improvements in metrics like resolution time, customer satisfaction, and agent efficiency.`;
    }
    
    // Handle questions about PipeCat
    if (this.containsAny(lowercaseQuestion, ['pipecat', 'pipe cat'])) {
      return `PipeCat is a voice AI technology that Christopher has worked with extensively. It's an advanced platform for integrating voice recognition, natural language understanding, and voice synthesis capabilities into call center environments. Christopher has implemented PipeCat solutions that enable real-time call transcription, intent detection, and sentiment analysis, significantly improving the efficiency and effectiveness of customer service operations.`;
    }
    
    // Handle questions about education
    if (this.containsAny(lowercaseQuestion, ['education', 'degree', 'university', 'college', 'school'])) {
      return `Christopher holds a ${this.knowledgeBase.personal.education}. His academic background provides a strong foundation in computer science principles, algorithms, and AI methodologies, which he applies to his work in voice technologies and call center solutions.`;
    }
    
    // Handle questions about location
    if (this.containsAny(lowercaseQuestion, ['location', 'where', 'city', 'country', 'based'])) {
      return `Christopher is based in ${this.knowledgeBase.personal.location}, where he works on innovative AI solutions for voice technologies and call center applications.`;
    }
    
    // Default response for unknown questions
    return `That's an interesting question about Christopher. While I don't have specific information on that, I can tell you that he specializes in voice AI technologies for call centers and has extensive experience with platforms like PipeCat. Would you like to know more about his skills, projects, or specific areas of AI expertise?`;
  }

  containsAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
  }
}

customElements.define('ai-bio-assistant-component', AIBioAssistant);

export default AIBioAssistant; 