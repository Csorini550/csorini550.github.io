// SendGrid GitHub Pages handler
// This script initializes the SendGrid API in the GitHub Pages environment

(function() {
  console.log('Initializing SendGrid GitHub Pages handler');
  
  // Create a script element to load the bundled SendGrid API
  const script = document.createElement('script');
  script.src = '/api/github-pages-bundle.js'; // This will be created by the GitHub Action
  script.async = true;
  
  // Handle loading errors
  script.onerror = function() {
    console.error('Failed to load SendGrid API bundle for GitHub Pages');
    window.sendGridAPILoaded = false;
  };
  
  // Handle successful loading
  script.onload = function() {
    console.log('SendGrid API bundle loaded successfully');
    if (typeof window.handleSendGridRequest === 'function') {
      window.sendGridAPILoaded = true;
      console.log('SendGrid API handler is ready to use');
    } else {
      console.error('SendGrid API bundle loaded but handler function not found');
      window.sendGridAPILoaded = false;
    }
  };
  
  // Add the script to the document
  document.head.appendChild(script);
})(); 