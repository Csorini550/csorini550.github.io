// force-reload.js
// This script forces a reload of web components
console.log('Forcing reload of web components...');

// Function to reload a component
function reloadComponent(tagName) {
  // Get all instances of the component
  const elements = document.querySelectorAll(tagName);
  
  if (elements.length === 0) {
    console.log(`No ${tagName} elements found`);
    return;
  }
  
  console.log(`Reloading ${elements.length} ${tagName} element(s)`);
  
  // For each instance
  elements.forEach((element, index) => {
    // Create a clone
    const parent = element.parentNode;
    const clone = element.cloneNode(true);
    
    // Replace the original with the clone
    parent.replaceChild(clone, element);
    
    console.log(`Reloaded ${tagName} element #${index + 1}`);
  });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting component reload');
  
  // Reload the AI Tools component
  setTimeout(() => {
    reloadComponent('ai-tools-component');
  }, 500);
}); 