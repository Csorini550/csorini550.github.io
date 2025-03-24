// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AI Chatbot
    initChatbot();
    
    // Initialize AI Content Generator
    initContentGenerator();
    
    // Initialize AI Image Analyzer
    initImageAnalyzer();
});

// AI Chatbot Implementation
function initChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    
    if (!chatbotContainer || !chatbotMessages || !chatbotInput || !chatbotSendBtn) {
        return; // Exit if elements don't exist
    }
    
    // Welcome message
    addBotMessage("Hi there! I'm Chris's AI assistant. How can I help you today?", 500);
    
    // Send message on button click
    chatbotSendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send user message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input field
        chatbotInput.value = '';
        
        // Process and respond to the message (simulated AI response)
        processMessage(message);
    }
    
    // Add a user message to the chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Add a bot message to the chat
    function addBotMessage(message, delay = 1000) {
        setTimeout(() => {
            const messageElement = document.createElement('div');
            messageElement.className = 'bot-message';
            messageElement.innerHTML = `
                <div class="bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
            
            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // After a delay, remove typing indicator and show message
            setTimeout(() => {
                chatbotMessages.removeChild(typingIndicator);
                chatbotMessages.appendChild(messageElement);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, delay);
        }, 500);
    }
    
    // Process the user message and generate a response
    function processMessage(message) {
        // Define some predefined responses for demonstration
        const responses = {
            // Questions about projects
            project: "I've worked on several AI projects including recommendation systems, natural language processing APIs, and computer vision applications. Check out the Projects section for more details!",
            
            // Questions about skills
            skill: "My technical skills include machine learning, deep learning, natural language processing, computer vision, and full-stack development. I'm particularly strong in TensorFlow, PyTorch, and Python.",
            
            // Questions about contact
            contact: "You can reach out through the contact form at the bottom of the page, or via email at contact@chris.ai.",
            
            // Questions about experience
            experience: "I have experience as a Senior AI Developer, Machine Learning Engineer, and AI Research Associate. Check out my experience timeline for more details!",
            
            // General introduction question
            introduction: "I'm Chris, an AI developer specializing in creating intelligent applications that solve real-world problems. I focus on machine learning, natural language processing, and computer vision.",
            
            // Default response
            default: "That's an interesting question! I'd be happy to discuss that further. Feel free to reach out through the contact form or email me directly for a more detailed conversation."
        };
        
        // Simple keyword matching for demo purposes
        // In a real implementation, you would use NLP or a proper chatbot service
        message = message.toLowerCase();
        
        if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
            addBotMessage(responses.project);
        } else if (message.includes('skill') || message.includes('expertise') || message.includes('specialize')) {
            addBotMessage(responses.skill);
        } else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
            addBotMessage(responses.contact);
        } else if (message.includes('experience') || message.includes('background') || message.includes('history')) {
            addBotMessage(responses.experience);
        } else if (message.includes('who are you') || message.includes('about you') || message.includes('tell me about') || message.includes('introduction')) {
            addBotMessage(responses.introduction);
        } else {
            addBotMessage(responses.default);
        }
    }
}

// AI Content Generator Implementation
function initContentGenerator() {
    const contentGenerator = document.getElementById('content-generator');
    const contentPrompt = document.getElementById('content-prompt');
    const contentType = document.getElementById('content-type');
    const generateBtn = document.getElementById('generate-btn');
    const generatedContent = document.getElementById('generated-content');
    
    if (!contentGenerator || !contentPrompt || !contentType || !generateBtn || !generatedContent) {
        return; // Exit if elements don't exist
    }
    
    // Generate content on button click
    generateBtn.addEventListener('click', function() {
        const prompt = contentPrompt.value.trim();
        const type = contentType.value;
        
        if (prompt === '') {
            // Show error for empty prompt
            contentPrompt.classList.add('error');
            setTimeout(() => {
                contentPrompt.classList.remove('error');
            }, 1500);
            return;
        }
        
        // Show loading state
        generatedContent.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';
        
        // Simulate content generation with delay
        setTimeout(() => {
            generateContent(prompt, type);
        }, 2000);
    });
    
    // Generate different types of content based on the selected type
    function generateContent(prompt, type) {
        let content = '';
        
        // For demonstration purposes, we'll use predefined templates
        // In a real implementation, you would use an AI API
        
        switch (type) {
            case 'paragraph':
                content = generateParagraph(prompt);
                break;
            case 'story':
                content = generateStory(prompt);
                break;
            case 'poem':
                content = generatePoem(prompt);
                break;
            case 'code':
                content = generateCode(prompt);
                break;
            default:
                content = generateParagraph(prompt);
        }
        
        // Display the generated content
        generatedContent.innerHTML = content;
    }
    
    // Generate a paragraph based on the prompt
    function generateParagraph(prompt) {
        // Example templates - in a real app, this would come from an AI model
        const templates = [
            `The concept of ${prompt} has revolutionized how we think about technology. As we delve deeper into this subject, we discover that it encompasses not just technical aspects but also philosophical questions about our relationship with machines. The future of ${prompt} looks promising, with advancements being made daily by researchers and practitioners around the world.`,
            
            `When examining ${prompt}, we must consider both its practical applications and theoretical foundations. The field has evolved significantly over the past decade, incorporating insights from diverse disciplines. The integration of ${prompt} into everyday technologies has transformed user experiences and created new possibilities for innovation.`,
            
            `${prompt} represents a fascinating intersection of technology and human creativity. By analyzing its development and impact, we can gain valuable insights into how artificial intelligence continues to shape our world. The ethical considerations surrounding ${prompt} are as important as its technical implementations, requiring thoughtful discourse and regulation.`
        ];
        
        // Select a random template
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    // Generate a short story based on the prompt
    function generateStory(prompt) {
        // Example template for a short story
        return `<h4>The Adventure of ${prompt}</h4>
        <p>Once upon a time, in a world where technology and magic coexisted, there was a curious explorer named Alex who became fascinated with ${prompt}. "There must be more to this than meets the eye," Alex thought one evening while studying ancient manuscripts about technological wonders.</p>
        <p>The next morning, Alex received a mysterious message: "Seek the wisdom of ${prompt} at the edge of the Digital Forest." Without hesitation, Alex packed essential tools and embarked on the journey.</p>
        <p>After three days of challenging travel through data streams and algorithmic puzzles, Alex finally reached the legendary AI Oracle. "I've come to learn about ${prompt}," Alex announced boldly.</p>
        <p>The Oracle's interface flickered. "To truly understand ${prompt}, you must become part of it." Before Alex could respond, a surge of code enveloped them, transforming their perception of reality.</p>
        <p>When Alex awoke, the world looked different – patterns and connections previously invisible now appeared as clear as day. Alex had become one with ${prompt}, forever changed but empowered to share this new knowledge with humanity.</p>`;
    }
    
    // Generate a poem based on the prompt
    function generatePoem(prompt) {
        // Example template for a poem
        return `<h4>${prompt.charAt(0).toUpperCase() + prompt.slice(1)} Dreams</h4>
        <p style="font-style: italic; line-height: 1.8;">
        In the realm of binary and code,<br>
        ${prompt} emerges, a story untold.<br>
        Silicon thoughts and digital dreams,<br>
        Intelligence flowing in invisible streams.<br><br>
        
        Algorithms dancing in perfect time,<br>
        Creating patterns both complex and sublime.<br>
        ${prompt} awakens in the dawn of our age,<br>
        Writing its story on history's page.<br><br>
        
        Human and machine in harmonic blend,<br>
        A partnership on which we now depend.<br>
        ${prompt} evolving beyond our sight,<br>
        Illuminating the future with newfound light.
        </p>`;
    }
    
    // Generate code based on the prompt
    function generateCode(prompt) {
        // Example template for code (Python class)
        const cleanPrompt = prompt.replace(/[^a-zA-Z0-9]/g, '');
        const className = cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1);
        
        return `<pre><code class="language-python">
class ${className}:
    """
    A class implementing functionality related to ${prompt}
    """
    
    def __init__(self, parameters=None):
        """
        Initialize the ${className} with optional parameters
        
        Args:
            parameters (dict): Configuration parameters
        """
        self.name = "${prompt}"
        self.parameters = parameters or {}
        self.initialized = True
        print(f"${className} initialized with {len(self.parameters)} parameters")
    
    def process_data(self, input_data):
        """
        Process input data using ${prompt} algorithms
        
        Args:
            input_data: The data to process
            
        Returns:
            Processed data
        """
        if not self.initialized:
            raise Exception("${className} not properly initialized")
            
        # Implement ${prompt} processing logic here
        processed = self._apply_algorithm(input_data)
        
        return {
            "original": input_data,
            "processed": processed,
            "metadata": {
                "algorithm": "${prompt}_v1",
                "processing_time": "0.05s"
            }
        }
        
    def _apply_algorithm(self, data):
        # Internal implementation of the ${prompt} algorithm
        return data  # Placeholder for actual implementation
        
    @staticmethod
    def get_version():
        return "1.0.0"


# Example usage
if __name__ == "__main__":
    processor = ${className}({"optimization_level": "high"})
    result = processor.process_data("Sample input")
    print(f"Processing complete: {result}")
</code></pre>`;
    }
}

// AI Image Analyzer Implementation
function initImageAnalyzer() {
    const imageAnalyzer = document.getElementById('image-analyzer');
    const dropArea = document.getElementById('drop-area');
    const uploadBtn = document.getElementById('upload-btn');
    const imageUpload = document.getElementById('image-upload');
    const analysisResults = document.getElementById('analysis-results');
    
    if (!imageAnalyzer || !dropArea || !uploadBtn || !imageUpload || !analysisResults) {
        return; // Exit if elements don't exist
    }
    
    // Click the hidden file input when the button is clicked
    uploadBtn.addEventListener('click', function() {
        imageUpload.click();
    });
    
    // Handle file selection
    imageUpload.addEventListener('change', handleFiles);
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropArea.classList.add('active');
    }
    
    function unhighlight() {
        dropArea.classList.remove('active');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFiles(e) {
        const files = e.target ? e.target.files : e;
        if (files.length === 0) return;
        
        const file = files[0];
        
        // Only process image files
        if (!file.type.match('image.*')) {
            analysisResults.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Please upload an image file.</div>';
            return;
        }
        
        // Display the image
        const reader = new FileReader();
        reader.onload = function(e) {
            // Show loading state
            analysisResults.innerHTML = `
                <div class="analyzing">
                    <img src="${e.target.result}" alt="Uploaded image" style="max-width: 100%; max-height: 200px; display: block; margin: 0 auto;">
                    <p>Analyzing image...</p>
                    <div class="loading"><span></span><span></span><span></span></div>
                </div>
            `;
            
            // Simulate AI processing with delay
            setTimeout(() => {
                analyzeImage(e.target.result, file.name);
            }, 2500);
        };
        reader.readAsDataURL(file);
    }
    
    // Simulate AI image analysis
    function analyzeImage(imageData, fileName) {
        // In a real application, you would send the image to an AI API
        // Here we'll simulate results for demonstration purposes
        
        // Generate random confidence values for demo
        const confidence = {
            objects: Math.random() * 30 + 70, // 70-100%
            faces: Math.random() * 20 + 75,   // 75-95%
            scene: Math.random() * 15 + 80,   // 80-95%
            colors: Math.random() * 10 + 85   // 85-95%
        };
        
        // Randomly select objects that might be in the image
        const possibleObjects = ['person', 'chair', 'table', 'laptop', 'book', 'plant', 'cup', 'phone', 'bag', 'window', 'door', 'clock', 'painting'];
        const objectCount = Math.floor(Math.random() * 5) + 1; // 1-5 objects
        const detectedObjects = [];
        
        for (let i = 0; i < objectCount; i++) {
            const objectIndex = Math.floor(Math.random() * possibleObjects.length);
            const objectConf = Math.floor(Math.random() * 30 + 70); // 70-100%
            detectedObjects.push({
                name: possibleObjects[objectIndex],
                confidence: objectConf
            });
            // Remove the selected object to avoid duplicates
            possibleObjects.splice(objectIndex, 1);
            if (possibleObjects.length === 0) break;
        }
        
        // Randomly select scene type
        const scenes = ['indoor', 'outdoor', 'office', 'home', 'nature', 'urban', 'studio'];
        const detectedScene = scenes[Math.floor(Math.random() * scenes.length)];
        
        // Generate random colors
        const colors = ['#3a86ff', '#ff006e', '#8338ec', '#fb5607', '#ffbe0b', '#3a5a40', '#1d3557'];
        const colorCount = Math.floor(Math.random() * 3) + 2; // 2-4 colors
        const dominantColors = [];
        
        for (let i = 0; i < colorCount; i++) {
            const colorIndex = Math.floor(Math.random() * colors.length);
            dominantColors.push({
                color: colors[colorIndex],
                percentage: Math.floor(Math.random() * 50 + 10) // 10-60%
            });
            // Remove the selected color to avoid duplicates
            colors.splice(colorIndex, 1);
            if (colors.length === 0) break;
        }
        
        // Sort colors by percentage
        dominantColors.sort((a, b) => b.percentage - a.percentage);
        
        // Format confidence values
        const formatConfidence = (value) => value.toFixed(1) + '%';
        
        // Display analysis results
        analysisResults.innerHTML = `
            <div class="analysis-report">
                <div class="analysis-header">
                    <h4>Analysis Report for "${fileName}"</h4>
                    <p class="analysis-summary">Image successfully analyzed with ${formatConfidence(confidence.objects)} overall confidence.</p>
                </div>
                
                <div class="analysis-section">
                    <h5><i class="fas fa-eye"></i> Object Detection</h5>
                    <div class="detected-objects">
                        ${detectedObjects.map(obj => `
                            <div class="detected-item">
                                <span class="item-name">${obj.name}</span>
                                <div class="confidence-bar">
                                    <div class="confidence-level" style="width: ${obj.confidence}%"></div>
                                </div>
                                <span class="confidence-value">${obj.confidence}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="analysis-section">
                    <h5><i class="fas fa-image"></i> Scene Classification</h5>
                    <p>This image appears to be a <strong>${detectedScene}</strong> scene (${formatConfidence(confidence.scene)} confidence).</p>
                </div>
                
                <div class="analysis-section">
                    <h5><i class="fas fa-palette"></i> Color Analysis</h5>
                    <div class="color-palette">
                        ${dominantColors.map(colorInfo => `
                            <div class="color-item">
                                <div class="color-swatch" style="background-color: ${colorInfo.color}"></div>
                                <span class="color-details">${colorInfo.color} (${colorInfo.percentage}%)</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="analysis-footer">
                    <p>Analysis performed using AI Vision Processing v2.1</p>
                    <button id="new-analysis-btn" class="btn">Analyze Another Image</button>
                </div>
            </div>
        `;
        
        // Add event listener to the new analysis button
        const newAnalysisBtn = document.getElementById('new-analysis-btn');
        if (newAnalysisBtn) {
            newAnalysisBtn.addEventListener('click', function() {
                analysisResults.innerHTML = '';
                imageUpload.value = ''; // Clear the file input
            });
        }
    }
}
