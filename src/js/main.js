// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navigation bar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate position accounting for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize skill bars in the about section
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Function to animate skill bars when they come into view
    function animateSkillBars() {
        skillBars.forEach(skillBar => {
            const percentage = skillBar.getAttribute('data-percentage');
            const skillLevel = skillBar.querySelector('.skill-level');
            
            if (isInViewport(skillBar) && !skillBar.classList.contains('animated')) {
                skillLevel.style.width = percentage + '%';
                skillBar.classList.add('animated');
            }
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Run on page load and scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // Newsletter subscription
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && isValidEmail(email)) {
                console.log('Newsletter subscription:', email);
                
                // Replace the form with a success message
                subscribeForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <p>Thanks for subscribing!</p>
                    </div>
                `;
            } else {
                // Show error for invalid email
                emailInput.classList.add('error');
                setTimeout(() => {
                    emailInput.classList.remove('error');
                }, 1500);
            }
        });
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
