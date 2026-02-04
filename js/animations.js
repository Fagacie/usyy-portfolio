// ============================
// SCROLL PROGRESS INDICATOR
// ============================
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// ============================
// BACK TO TOP BUTTON
// ============================
const backToTop = document.createElement('button');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// TYPING ANIMATION FOR HERO
// ============================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.classList.add('typing-cursor');
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.appendChild(cursor);
    }
  }
  
  element.textContent = '';
  type();
}

// ============================
// COUNT UP ANIMATION FOR STATS
// ============================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ============================
// TOAST NOTIFICATIONS
// ============================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================
// COPY EMAIL TO CLIPBOARD
// ============================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = link.getAttribute('href').replace('mailto:', '');
    
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy email', 'error');
    });
  });
});

// ============================
// ENHANCED SCROLL ANIMATIONS
// ============================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // Animate counters for stat numbers
      if (entry.target.classList.contains('stat-num')) {
        const text = entry.target.textContent;
        const num = parseInt(text);
        if (!isNaN(num)) {
          animateCounter(entry.target, num, 2000);
        }
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .card, .stat-num').forEach(el => {
  animateOnScroll.observe(el);
});

// ============================
// SMOOTH PAGE LOAD ANIMATION
// ============================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Optional: Typing effect for name (uncomment to enable)
  // const nameElement = document.querySelector('.hero-text h1 .accent');
  // if (nameElement) {
  //   const originalText = nameElement.textContent;
  //   typeWriter(nameElement, originalText, 80);
  // }
  
  setTimeout(() => {
    document.querySelectorAll('.hero-text, .hero-card').forEach((el, i) => {
      el.style.animationDelay = `${i * 0.15}s`;
      el.classList.add('animate-in');
    });
  }, 100);
});

// ============================
// LAZY LOAD IMAGES
// ============================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================
// PARALLAX EFFECT FOR ORBS
// ============================
const orbs = document.querySelectorAll('.orb');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  orbs.forEach((orb, index) => {
    const speed = 0.1 + (index * 0.05);
    orb.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
  });
});

// ============================
// SECTION REVEAL ANIMATIONS
// ============================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 0.8s ease forwards';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// ============================
// INTERACTIVE CARD HOVER GLOW
// ============================
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
  
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--show-glow', '1');
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--show-glow', '0');
  });
});

// ============================
// FLOATING TEXT ANIMATION
// ============================
function createFloatingText(text, element) {
  const span = document.createElement('span');
  span.textContent = text;
  span.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    animation: floatUp 1.5s ease-out forwards;
    font-weight: 600;
    color: var(--accent);
  `;
  element.appendChild(span);
  
  setTimeout(() => span.remove(), 1500);
}

// ============================
// COUNTER ANIMATION WITH DELAY
// ============================
function animateCounterWithScroll(element) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const finalValue = parseInt(entry.target.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            entry.target.textContent = finalValue;
            clearInterval(counter);
          } else {
            entry.target.textContent = Math.floor(currentValue);
          }
        }, 30);
        
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  countObserver.observe(element);
}

// ============================
// PARTICLE EFFECTS ON CLICK
// ============================
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn') || e.target.closest('a')) {
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: particleFlow 0.8s ease-out forwards;
        z-index: 9999;
      `;
      
      const angle = (Math.PI * 2 * i) / 3;
      const distance = 50 + Math.random() * 50;
      particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  }
});

// ============================
// SMOOTH SCROLL ANCHOR LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// ============================
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-60px); opacity: 0; }
  }
  
  @keyframes particleFlow {
    0% { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { 
      opacity: 0; 
      transform: translate(var(--tx), var(--ty)) scale(0); 
    }
  }
  
  @keyframes cardHoverGlow {
    0% { box-shadow: 0 0 20px transparent; }
    100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
  }
`;
document.head.appendChild(style);


