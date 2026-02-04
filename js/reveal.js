// Creative Reveal System
class ContentReveal {
  constructor() {
    this.revealDotContainer = document.getElementById('revealDotContainer');
    this.revealDot = document.getElementById('revealDot');
    this.mainContentWrapper = document.getElementById('mainContentWrapper');
    this.isRevealed = false;

    this.init();
  }

  init() {
    // Check if user has already seen the reveal (session storage)
    const hasSeenReveal = sessionStorage.getItem('portfolioRevealed');
    
    if (hasSeenReveal) {
      // Skip the reveal animation, show content immediately
      this.skipReveal();
    } else {
      // Set up the reveal interaction
      this.setupReveal();
    }
  }

  setupReveal() {
    // Click event on the dot
    this.revealDot.addEventListener('click', () => {
      this.triggerReveal();
    });

    // Also allow spacebar or enter key
    document.addEventListener('keydown', (e) => {
      if (!this.isRevealed && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        this.triggerReveal();
      }
    });
  }

  triggerReveal() {
    if (this.isRevealed) return;
    this.isRevealed = true;

    // Mark as revealed in session storage
    sessionStorage.setItem('portfolioRevealed', 'true');

    // Animate the dot explosion
    this.animateDotExplosion();

    // Show main content with delay
    setTimeout(() => {
      this.showContent();
    }, 600);
  }

  animateDotExplosion() {
    // Add explosion animation
    this.revealDot.style.animation = 'dotExplode 0.6s ease-out forwards';
    
    // Fade out the entire container
    setTimeout(() => {
      this.revealDotContainer.classList.add('hidden');
    }, 300);

    // Inject explosion keyframes
    if (!document.getElementById('explosionKeyframes')) {
      const style = document.createElement('style');
      style.id = 'explosionKeyframes';
      style.textContent = `
        @keyframes dotExplode {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 0.5;
          }
          100% {
            transform: scale(50);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  showContent() {
    // Remove hidden class and add reveal animation
    this.mainContentWrapper.classList.remove('hidden');
    this.mainContentWrapper.classList.add('reveal-active');

    // Stagger animations for different sections
    this.staggerSectionAnimations();
  }

  staggerSectionAnimations() {
    // Get all major sections
    const sections = document.querySelectorAll('section, header, .profile-banner');
    
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 100); // Stagger by 100ms
    });
  }

  skipReveal() {
    // Immediately hide the dot container and show content
    this.revealDotContainer.style.display = 'none';
    this.mainContentWrapper.classList.remove('hidden');
    this.isRevealed = true;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.contentReveal = new ContentReveal();
  });
} else {
  window.contentReveal = new ContentReveal();
}
