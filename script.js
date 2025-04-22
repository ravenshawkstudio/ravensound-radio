// Ravensound Radio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('#navToggle')) {
            mainNav.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Live button effect
    const liveBtn = document.querySelector('.live-btn');
    if (liveBtn) {
        liveBtn.addEventListener('click', function() {
            // Scroll to player
            const playerSection = document.querySelector('.live-player-wrapper');
            if (playerSection) {
                playerSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Add pulse effect
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    }
    
    // Animated wave accents
    const animateWaves = () => {
        const waves = document.querySelectorAll('.wave-accent');
        waves.forEach(wave => {
            wave.animate([
                { backgroundPosition: '0% 0%' },
                { backgroundPosition: '100% 100%' }
            ], {
                duration: 15000,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });
        });
    };
    
    // Run wave animation
    animateWaves();
    
    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .show-card, .section-title, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
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
    
    // Sound wave animation
    const soundWave = document.querySelector('.sound-wave');
    if (soundWave) {
        const spans = soundWave.querySelectorAll('span');
        spans.forEach((span, index) => {
            const delay = index * 0.1;
            span.style.animation = `sound-wave-animation 1.2s ${delay}s infinite alternate`;
        });
    }
    
    // Add CSS for the animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-item, .show-card, .section-title, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-item.animate, .show-card.animate, .section-title.animate, .gallery-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-item:nth-child(2), .show-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-item:nth-child(3), .show-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .live-btn.pulse {
            animation: btnPulse 1s;
        }
        
        @keyframes btnPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(240, 193, 75, 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(240, 193, 75, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(240, 193, 75, 0);
            }
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    
    document.head.appendChild(style);
    
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
