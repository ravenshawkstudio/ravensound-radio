// Ravensound Radio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle for mobile
    const setupMobileNav = () => {
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');
        
        // Create mobile menu toggle button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-toggle');
        mobileMenuBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        
        // Only add mobile menu button if it doesn't exist and screen is small
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            header.insertBefore(mobileMenuBtn, nav);
            nav.classList.add('mobile-hidden');
            
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('mobile-hidden');
                nav.classList.toggle('mobile-visible');
            });
        }
    };
    
    // Handle window resize
    window.addEventListener('resize', setupMobileNav);
    
    // Initial setup
    setupMobileNav();
    
    // Live button effect
    const liveBtn = document.querySelector('.live-btn');
    if (liveBtn) {
        liveBtn.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
            
            // Here you would typically trigger your live stream
            console.log('Live stream button clicked');
        });
    }
    
    // Animated wave accents
    const animateWaves = () => {
        const waves = document.querySelectorAll('.wave-accent');
        waves.forEach(wave => {
            wave.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
        });
    };
    
    // Run wave animation occasionally
    setInterval(animateWaves, 5000);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add CSS class for page loaded animation
    document.body.classList.add('page-loaded');
});

// Placeholder for future audio player functionality
const audioPlayerSetup = () => {
    // This function will be implemented when connecting the actual audio stream
    console.log('Audio player setup ready for implementation');
    
    // Example structure for audio player:
    /*
    const audioPlayer = {
        audioElement: null,
        isPlaying: false,
        volume: 0.8,
        
        init: function() {
            this.audioElement = new Audio(streamUrl);
            this.setupEventListeners();
        },
        
        play: function() {
            this.audioElement.play();
            this.isPlaying = true;
        },
        
        pause: function() {
            this.audioElement.pause();
            this.isPlaying = false;
        },
        
        setVolume: function(level) {
            this.volume = level;
            this.audioElement.volume = level;
        },
        
        setupEventListeners: function() {
            // Add event listeners for player controls
        }
    };
    */
};
