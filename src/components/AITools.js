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
            <div class="ai-tool-card" data-aos="fade-up">
              <img src="images/ollama.svg?v=1" alt="Ollama Local Model Runner" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>Ollama</h3>
                <p>Run large language models locally with Ollama. Deploy and run models like Llama, Mistral, and Gemma on your own hardware with minimal setup. Perfect for privacy-focused applications or offline development.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Local LLMs</span>
                  <span class="ai-tool-tag">CLI</span>
                  <span class="ai-tool-tag">Privacy</span>
                </div>
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Learn more <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <!-- LM Studio -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="100">
              <img src="images/lm-studio.svg?v=1" alt="LM Studio" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>LM Studio</h3>
                <p>A desktop application for running and evaluating local LLMs with a user-friendly interface. LM Studio enables easy testing and comparison of different models and parameters, with a built-in chat interface and API server.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">GUI</span>
                  <span class="ai-tool-tag">Local Inference</span>
                  <span class="ai-tool-tag">Model Testing</span>
                </div>
                <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Explore LM Studio <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <!-- LocalAI -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="200">
              <img src="images/localai.svg?v=1" alt="LocalAI" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>LocalAI</h3>
                <p>An open-source alternative to OpenAI API that runs inference locally. Deploy both open and closed source models with the same OpenAI-compatible API, allowing easy integration with existing applications.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">API Compatible</span>
                  <span class="ai-tool-tag">Self-hosted</span>
                  <span class="ai-tool-tag">Multi-modal</span>
                </div>
                <a href="https://localai.io" target="_blank" rel="noopener noreferrer" class="ai-tool-link">View project <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          
          <h3 class="category-title" data-aos="fade-up">Model Fine-tuning Tools</h3>
          <div class="ai-tools-grid">
            <!-- NVIDIA NeMo -->
            <div class="ai-tool-card" data-aos="fade-up">
              <img src="images/nvidia-nemo.svg?v=1" alt="NVIDIA NeMo" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>NVIDIA NeMo</h3>
                <p>A toolkit for building, training and fine-tuning GPU-accelerated language models at scale. NeMo supports conversational AI models with features for domain adaptation and specialized applications.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">NVIDIA</span>
                  <span class="ai-tool-tag">NLP</span>
                  <span class="ai-tool-tag">Enterprise</span>
                </div>
                <a href="https://developer.nvidia.com/nemo" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Explore NeMo <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <!-- PEFT -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="100">
              <img src="images/peft.svg?v=1" alt="PEFT (Parameter-Efficient Fine-Tuning)" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>PEFT</h3>
                <p>Parameter-Efficient Fine-Tuning methods like LoRA, QLoRA, and Adapters enable fine-tuning large models with minimal resources. Optimize just a small subset of parameters while maintaining performance.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Efficient Tuning</span>
                  <span class="ai-tool-tag">LoRA</span>
                  <span class="ai-tool-tag">Hugging Face</span>
                </div>
                <a href="https://huggingface.co/docs/peft/index" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Learn techniques <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <!-- Axolotl -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="200">
              <img src="images/axolotl.svg?v=1" alt="Axolotl Fine-tuning Framework" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>Axolotl</h3>
                <p>A user-friendly framework for fine-tuning language models. Simplifies the process with configuration files and optimized training pipelines for various models like Llama, Mistral, and more.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Fine-tuning</span>
                  <span class="ai-tool-tag">Open Source</span>
                  <span class="ai-tool-tag">Config-driven</span>
                </div>
                <a href="https://github.com/OpenAccess-AI-Collective/axolotl" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Check out Axolotl <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          
          <h3 class="category-title" data-aos="fade-up">Advanced Machine Learning Platforms</h3>
          <div class="ai-tools-grid">
            <!-- NVIDIA AI Enterprise -->
            <div class="ai-tool-card" data-aos="fade-up">
              <img src="images/nvidia-enterprise.svg?v=1" alt="NVIDIA AI Enterprise" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>NVIDIA AI Enterprise</h3>
                <p>End-to-end platform for AI development and deployment with enterprise support. Includes tools like NVIDIA RAPIDS for data science, TensorRT for inference optimization, and Triton Inference Server.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Enterprise</span>
                  <span class="ai-tool-tag">MLOps</span>
                  <span class="ai-tool-tag">GPU-optimized</span>
                </div>
                <a href="https://www.nvidia.com/en-us/data-center/products/ai-enterprise/" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Explore suite <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <!-- HuggingFace Trainer -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="100">
              <img src="images/huggingface-trainer.svg?v=1" alt="HuggingFace Trainer" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>HuggingFace Trainer</h3>
                <p>A comprehensive training API for PyTorch models. Simplifies training, evaluation, and experimentation with machine learning models while handling distributed training and optimization strategies.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Training API</span>
                  <span class="ai-tool-tag">PyTorch</span>
                  <span class="ai-tool-tag">Transformers</span>
                </div>
                <a href="https://huggingface.co/docs/transformers/main_classes/trainer" target="_blank" rel="noopener noreferrer" class="ai-tool-link">View documentation <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
            <!-- MONAI -->
            <div class="ai-tool-card" data-aos="fade-up" data-aos-delay="200">
              <img src="images/monai.svg?v=1" alt="MONAI for Medical AI" class="ai-tool-img">
              <div class="ai-tool-content">
                <h3>MONAI</h3>
                <p>An open-source framework for healthcare imaging AI built on PyTorch. Developed collaboratively by NVIDIA and King's College London, it provides domain-specific functionality for medical image analysis.</p>
                <div class="ai-tool-tags">
                  <span class="ai-tool-tag">Medical Imaging</span>
                  <span class="ai-tool-tag">NVIDIA</span>
                  <span class="ai-tool-tag">PyTorch</span>
                </div>
                <a href="https://monai.io/" target="_blank" rel="noopener noreferrer" class="ai-tool-link">Discover MONAI <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('ai-tools-component', AITools); 