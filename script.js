// Ravensound Radio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    const liveNowBtn = document.getElementById('liveNowBtn');
    const listenHeroBtn = document.getElementById('listenHeroBtn');
    const audioPlayerModal = document.getElementById('audioPlayerModal');
    const closePlayerBtn = document.getElementById('closePlayerBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeBtn = document.querySelector('.volume-btn');
    const visualizerBars = document.querySelectorAll('.visualizer-bar');
    const scheduleDays = document.querySelectorAll('.schedule-day');
    const scheduleDayContents = document.querySelectorAll('.schedule-day-content');
    
    // Mobile Navigation Toggle
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Toggle menu icon animation
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('#menuToggle')) {
            mainNav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Animated wave accents
    const animateWaves = () => {
        const waves = document.querySelectorAll('.wave-accent');
        waves.forEach(wave => {
            if (wave.animate) {
                wave.animate([
                    { backgroundPosition: '0% 0%' },
                    { backgroundPosition: '100% 100%' }
                ], {
                    duration: 15000,
                    iterations: Infinity,
                    direction: 'alternate',
                    easing: 'ease-in-out'
                });
            }
        });
    };
    
    // Run wave animation
    animateWaves();
    
    // Audio Player Modal Functions
    const openAudioPlayer = () => {
        if (audioPlayerModal) {
            audioPlayerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeAudioPlayer = () => {
        if (audioPlayerModal) {
            audioPlayerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Open player from header button
    if (liveNowBtn) {
        liveNowBtn.addEventListener('click', openAudioPlayer);
    }
    
    // Open player from hero button
    if (listenHeroBtn) {
        listenHeroBtn.addEventListener('click', openAudioPlayer);
    }
    
    // Close player
    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', () => {
            closeAudioPlayer();
            if (audioPlayer && !audioPlayer.paused) {
                audioPlayer.pause();
                updatePlayPauseButton(false);
            }
        });
    }
    
    // Audio Player Controls
    const initAudioPlayer = () => {
        if (!audioPlayer || !playPauseBtn) return;
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', togglePlayPause);
        
        // Volume control
        if (volumeSlider) {
            volumeSlider.addEventListener('input', () => {
                const volume = volumeSlider.value / 100;
                audioPlayer.volume = volume;
                updateVolumeIcon(volume);
            });
        }
        
        // Mute/Unmute
        if (volumeBtn) {
            volumeBtn.addEventListener('click', toggleMute);
        }
        
        // Handle errors
        audioPlayer.addEventListener('error', (e) => {
            console.error('Audio player error:', e);
            alert('Unable to play the live stream. Click OK to open the station in a new tab.');
            window.open('https://live365.com/station/Ravensound-Radio-a63793', '_blank');
        });
    };
    
    const togglePlayPause = () => {
        if (audioPlayer.paused) {
            audioPlayer.play()
                .then(() => {
                    updatePlayPauseButton(true);
                    activateVisualizer(true);
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                    // Fallback - open in new window
                    window.open('https://live365.com/station/Ravensound-Radio-a63793', '_blank');
                });
        } else {
            audioPlayer.pause();
            updatePlayPauseButton(false);
            activateVisualizer(false);
        }
    };
    
    const updatePlayPauseButton = (isPlaying) => {
        if (playPauseBtn) {
            playPauseBtn.innerHTML = isPlaying ? 
                '<i class="fas fa-pause"></i>' : 
                '<i class="fas fa-play"></i>';
        }
    };
    
    const toggleMute = () => {
        if (audioPlayer.volume > 0) {
            audioPlayer.dataset.prevVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            updateVolumeIcon(0);
        } else {
            const prevVolume = audioPlayer.dataset.prevVolume || 0.8;
            audioPlayer.volume = prevVolume;
            volumeSlider.value = prevVolume * 100;
            updateVolumeIcon(prevVolume);
        }
    };
    
    const updateVolumeIcon = (volume) => {
        if (!volumeBtn) return;
        
        if (volume === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (volume < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    };
    
    const activateVisualizer = (active) => {
        if (!visualizerBars.length) return;
        
        visualizerBars.forEach(bar => {
            bar.style.animationPlayState = active ? 'running' : 'paused';
        });
    };
    
    // Schedule Tabs
    if (scheduleDays.length && scheduleDayContents.length) {
        scheduleDays.forEach(day => {
            day.addEventListener('click', () => {
                // Remove active class from all days
                scheduleDays.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked day
                day.classList.add('active');
                
                // Hide all content
                scheduleDayContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected content
                const dayId = day.getAttribute('data-day');
                const selectedContent = document.getElementById(`${dayId}-schedule`);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                    
                    // Force immediate display of show items
                    const showItems = selectedContent.querySelectorAll('.show-item');
                    showItems.forEach(item => {
                        item.classList.add('animated');
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
    
    // Scroll Animation for Elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .show-item, .about-stats, .contact-form-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animated class to elements in view on page load
    window.addEventListener('load', animateOnScroll);
    
    // Add animated class to elements as they come into view on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize Audio Player
    initAudioPlayer();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .show-item, .about-stats, .contact-form-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .feature-card.animated, .show-item.animated, .about-stats.animated, .contact-form-container.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3) {
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
