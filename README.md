# AI Developer Portfolio Website

A modern, cinematic portfolio website showcasing AI applications, projects, and interactive features.

## Features

- **Cinematic Design**: High-quality visuals and animations that create an immersive experience
- **Interactive AI Features**: Demonstrative AI tools including a chatbot, content generator, and image analyzer
- **Responsive Design**: Fully responsive layout that works on all devices
- **Project Showcase**: Detailed portfolio section highlighting AI projects
- **Modern UI**: Clean, intuitive design with smooth animations and transitions

## Project Structure

```
├── src/                  # Source files
│   ├── index.html        # Main HTML file
│   ├── css/              # CSS styles
│   │   └── styles.css    # Main stylesheet
│   ├── js/               # JavaScript files
│   │   ├── main.js       # Main JavaScript file
│   │   └── ai-features.js # AI features implementation
│   └── images/           # Image assets
│       ├── ai-network.svg # Hero section animation
│       ├── particles.svg  # Background animation
│       └── project-*.jpg  # Project thumbnails
└── README.md             # This file
```

## Interactive AI Features

The website includes the following interactive AI features:

1. **AI Chatbot Assistant**: A simulated AI chatbot that can answer questions about the portfolio, skills, and projects
2. **AI Content Generator**: A demonstration of AI-generated content based on user prompts (paragraphs, stories, poems, code)
3. **AI Image Analyzer**: A simulated computer vision demo that analyzes uploaded images

## Running the Website

Since this is a plain HTML/CSS/JavaScript website, you can run it using any web server or by simply opening the `index.html` file in a web browser.

### Using a Local Server

For the best experience, it's recommended to use a local development server:

**Using Python:**

```bash
# Navigate to the project directory
cd src

# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

**Using Node.js (if installed):**

```bash
# Install a simple http server if you don't have one
npm install -g http-server

# Navigate to the project directory
cd src

# Run the server
http-server
```

Then open your browser and navigate to `http://localhost:8000` or the URL provided by your server.

## Customization

To customize this website for your own use:

1. Replace the project images and descriptions with your own projects
2. Update the personal information in the About section
3. Modify the color scheme by changing the CSS variables in `styles.css`
4. Add your own content to the interactive AI features

## Credits

- Font Awesome for icons
- AOS (Animate On Scroll) library for scroll animations
- Google Fonts for typography

## License

MIT License - Feel free to use this template for your own portfolio 