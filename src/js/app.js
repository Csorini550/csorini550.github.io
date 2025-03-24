// Import all components
import '../components/Navbar.js';
import '../components/Hero.js';
import '../components/About.js';
import '../components/Projects.js';
import '../components/Experience.js';
import '../components/Interests.js';
import '../components/AITools.js';
import '../components/Contact.js';
import '../components/Footer.js';

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS library if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  
  // Handle URL hash navigation
  setTimeout(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      
      // Map the target ID to the corresponding component selector
      const componentMap = {
        'hero': 'hero-component',
        'about': 'about-component',
        'ai-tools': 'ai-tools-component',
        'interests': 'interests-component',
        'experience': 'experience-component',
        'contact': 'contact-component'
      };
      
      // Get the component selector based on the target ID
      const componentSelector = componentMap[targetId];
      
      if (componentSelector) {
        const targetComponent = document.querySelector(componentSelector);
        
        if (targetComponent) {
          // Account for the fixed navbar height
          const navbar = document.querySelector('nav-component');
          let offset = 0;
          
          if (navbar) {
            // Get the navbar's shadow root element to access its height
            const navbarElement = navbar.shadowRoot.querySelector('.navbar');
            if (navbarElement) {
              offset = navbarElement.offsetHeight;
            }
          }
          
          // Scroll to the component with offset
          const targetPosition = targetComponent.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  }, 500); // Small delay to ensure components are fully loaded
}); 