// ============================================
// BIG PRODEJE - LANDING PAGE INTERACTIVITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVIGATION
    // ============================================
    
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 11, 30, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 11, 30, 0.7)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // ============================================
    // ALBUM CARD INTERACTIONS
    // ============================================
    
    const albumCards = document.querySelectorAll('.album-card');
    
    albumCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        
        // Hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Play button interaction
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Get album info
                const albumTitle = card.querySelector('h3').textContent;
                
                // Create notification
                showNotification(`Lecture de "${albumTitle}" sur Spotify...`);
                
                // Simulate play action
                this.innerHTML = '<i class="fas fa-pause"></i>';
                this.style.background = '#10B981';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    this.style.background = '';
                }, 3000);
            });
        }
    });
    
    // ============================================
    // VIDEO PLAYER ENHANCEMENT
    // ============================================
    
    const videoIframe = document.querySelector('.video-wrapper iframe');
    
    if (videoIframe) {
        // Add loading state
        videoIframe.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        videoIframe.style.opacity = '0';
    }
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.section-header, .bio-content, .video-container').forEach(el => {
        observer.observe(el);
    });
    
    // Observe album cards with index for staggered animation
    document.querySelectorAll('.album-card').forEach((card, index) => {
        card.style.setProperty('--i', index);
        observer.observe(card);
    });
    
    // Observe solo album cards for fade-in animation
    document.querySelectorAll('.solo-album-card').forEach((card, index) => {
        observer.observe(card);
    });
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <span>${message}</span>
            <i class="fas fa-times"></i>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 11, 30, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(30, 144, 255, 0.3);
            border-radius: 8px;
            padding: 1rem 1.5rem;
            color: white;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.fa-times');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
        
        document.body.appendChild(notification);
        
        // Add keyframes for animation
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ============================================
    // RESPONSIVE NAVIGATION
    // ============================================
    
    function handleResponsiveNav() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    }
    
    // Initial call
    handleResponsiveNav();
    
    // Update on resize
    window.addEventListener('resize', handleResponsiveNav);
    
    // ============================================
    // PAGE LOAD ANIMATIONS
    // ============================================
    
    // Add loaded class to body for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // ============================================
    // CTA BUTTON ENHANCEMENT
    // ============================================
    
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-styles';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn-primary {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercentage > 5) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
    
    // ============================================
    // SPOTIFY IFRAME DETECTION
    // ============================================
    
    function checkSpotifyIframes() {
        const spotifyPlayers = document.querySelectorAll('.spotify-player');
        
        spotifyPlayers.forEach((player, index) => {
            const iframe = player.querySelector('iframe');
            const fallback = player.querySelector('.spotify-fallback');
            
            if (iframe && fallback) {
                // Check if iframe loaded successfully
                iframe.addEventListener('load', function() {
                    // If iframe loads successfully, hide fallback after a delay
                    setTimeout(() => {
                        fallback.style.opacity = '0';
                        fallback.style.pointerEvents = 'none';
                        setTimeout(() => {
                            fallback.style.display = 'none';
                        }, 300);
                    }, 1000);
                });
                
                iframe.addEventListener('error', function() {
                    // If iframe fails to load, show error message
                    fallback.innerHTML = `
                        <div class="spotify-logo">⚠️</div>
                        <p>Lecteur Spotify non disponible</p>
                        <p class="fallback-text">ID Spotify invalide ou album non public</p>
                        <p class="fallback-text">Vérifiez l'URL Spotify</p>
                    `;
                    fallback.style.background = 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 0, 0, 0.2))';
                });
                
                // Set a timeout to check if iframe is still loading
                setTimeout(() => {
                    if (iframe.contentDocument && iframe.contentDocument.body) {
                        // If iframe has content, hide fallback
                        if (iframe.contentDocument.body.innerHTML.includes('Page not found')) {
                            fallback.innerHTML = `
                                <div class="spotify-logo">⚠️</div>
                                <p>Page Spotify non trouvée</p>
                                <p class="fallback-text">ID Spotify incorrect</p>
                            `;
                            fallback.style.background = 'linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(255, 0, 0, 0.2))';
                        }
                    }
                }, 3000);
            }
        });
    }
    
    // Run Spotify detection after page loads
    setTimeout(checkSpotifyIframes, 2000);
    
    // ============================================
    // CONSOLE GREETING
    // ============================================
    
    console.log('%c🎵 BIG PRODEJE - Légende du G-Funk 🎵', 'color: #1E90FF; font-size: 18px; font-weight: bold;');
    console.log('%cSite développé par Young G West Coast', 'color: #C0C0C0; font-size: 14px;');
    console.log('%cSouth Central LA • West Coast Forever', 'color: #B0B8D0; font-size: 12px;');
});

/* ==========================================
   🔌 SCRIPT D'ACTIVATION DU MENU MOBILE
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // 1. On cible le bouton hamburger et le menu
    const hamburger = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-links');

    // 2. Vérification de sécurité (au cas où le menu n'existe pas sur une page)
    if (hamburger && menu) {
        
        // 3. Gestion du clic ou du "touch" sur mobile
        ['click', 'touchstart'].forEach(function(eventType) {
            hamburger.addEventListener(eventType, function(event) {
                // On empêche les autres scripts de bloquer l'action
                event.preventDefault(); 
                event.stopPropagation();
                
                // MAGIE : On ajoute ou on retire la classe "active"
                menu.classList.toggle('active');
            }, { passive: false });
        });

        // 4. (Optionnel) Fermer le menu si on clique sur un des liens
        const links = menu.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
            });
        });
    }
});