// AITools.js
// Last updated: March 23, 2023 - 17:30
class AITools extends HTMLElement {
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
        
        .ai-tools-section {
          padding: 64px 0;
          background-color: #f1f8ff;
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
        
        .ai-tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 32px;
        }
        
        .ai-tool-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .ai-tool-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .ai-tool-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-bottom: 1px solid #eee;
        }
        
        .ai-tool-content {
          padding: 24px;
        }
        
        .ai-tool-content h3 {
          margin-bottom: 12px;
          font-size: 1.4rem;
          color: #333;
          font-weight: 600;
        }
        
        .ai-tool-content p {
          margin-bottom: 16px;
          line-height: 1.6;
          color: #666;
          font-size: 0.95rem;
        }
        
        .ai-tool-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .ai-tool-tag {
          background-color: #f0f0f0;
          color: #555;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .ai-tool-link {
          display: inline-block;
          color: #8338ec;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .ai-tool-link:hover {
          color: #6423c0;
        }
        
        .ai-tool-link i {
          margin-left: 4px;
        }
        
        .category-title {
          font-size: 1.8rem;
          margin: 40px 0 20px;
          color: #444;
          position: relative;
          padding-left: 15px;
          border-left: 4px solid #8338ec;
        }
        
        @media (max-width: 768px) {
          .ai-tools-grid {
            grid-template-columns: 1fr;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
          
          .category-title {
            font-size: 1.5rem;
          }
        }
      </style>
      
      <section id="ai-tools" class="ai-tools-section">
        <div class="container">
          <div class="section-header" data-aos="fade-up">
            <h2>AI Tools</h2>
            <p>These are the AI tools I am experimenting with. If you are interested in learning about how to add these tools into your enterprise, follow the links provided below.</p>
          </div>
          
          <h3 class="category-title" data-aos="fade-up">Local Model Deployment</h3>
          <div class="ai-tools-grid">
            <!-- Ollama -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="100">
              <img src="src/images/ollama.svg?v=1" alt="Ollama Local Model Runner" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>Ollama</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Local Models</span>
                  <span class="ai-tool-tag">Open Source</span>
                </div>
                <p>Run large language models locally with a simple API.</p>
                <a href="https://ollama.ai/" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <!-- LM Studio -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="200">
              <img src="src/images/lm-studio.svg?v=1" alt="LM Studio" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>LM Studio</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Desktop App</span>
                  <span class="ai-tool-tag">Model Discovery</span>
                </div>
                <p>Discover, download, and run local LLMs with a desktop interface.</p>
                <a href="https://lmstudio.ai/" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <!-- LocalAI -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="300">
              <img src="src/images/localai.svg?v=1" alt="LocalAI" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>LocalAI</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Self-hosted</span>
                  <span class="ai-tool-tag">OpenAI Alternative</span>
                </div>
                <p>Self-hosted OpenAI alternative running on consumer hardware.</p>
                <a href="https://github.com/mudler/LocalAI" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          
          <h3 class="category-title" data-aos="fade-up">Model Fine-tuning Tools</h3>
          <div class="ai-tools-grid">
            <!-- NVIDIA NeMo -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="400">
              <img src="src/images/nvidia-nemo.svg?v=1" alt="NVIDIA NeMo" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>NVIDIA NeMo</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Model Training</span>
                  <span class="ai-tool-tag">Enterprise</span>
                </div>
                <p>Conversational AI toolkit for building, customizing and deploying generative AI models.</p>
                <a href="https://developer.nvidia.com/nemo" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <!-- PEFT -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="500">
              <img src="src/images/peft.svg?v=1" alt="PEFT (Parameter-Efficient Fine-Tuning)" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>PEFT Library</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Fine-tuning</span>
                  <span class="ai-tool-tag">HuggingFace</span>
                </div>
                <p>Parameter-Efficient Fine-Tuning methods for efficiently adapting pre-trained language models.</p>
                <a href="https://github.com/huggingface/peft" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <!-- Axolotl -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="600">
              <img src="src/images/axolotl.svg?v=1" alt="Axolotl Fine-tuning Framework" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>Axolotl</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Fine-tuning</span>
                  <span class="ai-tool-tag">Open Source</span>
                </div>
                <p>A user-friendly, streamlined tool for fine-tuning large language models.</p>
                <a href="https://github.com/OpenAccess-AI-Collective/axolotl" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
          
          <h3 class="category-title" data-aos="fade-up">Advanced Machine Learning Platforms</h3>
          <div class="ai-tools-grid">
            <!-- NVIDIA AI Enterprise -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="700">
              <img src="src/images/nvidia-enterprise.svg?v=1" alt="NVIDIA AI Enterprise" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>NVIDIA AI Enterprise</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Enterprise</span>
                  <span class="ai-tool-tag">End-to-end</span>
                </div>
                <p>End-to-end platform for developing and deploying AI in enterprise environments.</p>
                <a href="https://www.nvidia.com/en-us/data-center/products/ai-enterprise/" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <!-- HuggingFace Trainer -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="800">
              <img src="src/images/huggingface-trainer.svg?v=1" alt="HuggingFace Trainer" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>HuggingFace Trainer</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Model Training</span>
                  <span class="ai-tool-tag">API</span>
                </div>
                <p>API for efficient fine-tuning of Transformer models for various NLP tasks.</p>
                <a href="https://huggingface.co/docs/transformers/main_classes/trainer" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            
            <!-- MONAI -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="900">
              <img src="src/images/monai.svg?v=1" alt="MONAI for Medical AI" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>MONAI</h3>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Healthcare</span>
                  <span class="ai-tool-tag">Deep Learning</span>
                </div>
                <p>Framework for deep learning in healthcare imaging, deployed in medical and research settings.</p>
                <a href="https://monai.io/" target="_blank" class="ai-tool-link">Learn more <i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('ai-tools-component', AITools); 