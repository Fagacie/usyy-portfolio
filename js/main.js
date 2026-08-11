/* ══════════════════════════════════════════
   main.js – single source of truth for all
   interactive behaviour on the portfolio.
   ══════════════════════════════════════════ */

/* ── Utilities ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Year in footer ── */
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ── Scroll progress bar ── */
(function () {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
})();

/* ── Typewriter animation on hero H1 ── */
(function () {
  const h1 = document.querySelector('h1[data-typewriter]');
  if (!h1) return;

  const text = h1.getAttribute('aria-label') || '';
  if (!text) return;

  /* Skip animation when reduced motion is preferred */
  if (prefersReducedMotion) {
    h1.textContent = text;
    h1.classList.add('done');
    return;
  }

  let i = 0;
  h1.textContent = '';
  h1.classList.add('typing');

  setTimeout(function type() {
    if (i < text.length) {
      h1.textContent += text[i];
      i++;
      setTimeout(type, 45 + Math.random() * 30);
    } else {
      h1.classList.remove('typing');
      h1.classList.add('done');
    }
  }, 320);
})();

/* ── Interactive Parallax Environment ── */
(function () {
  if (prefersReducedMotion) return;
  let rafId;
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  document.addEventListener("mousemove", (e) => {
    // Calculate offset based on center of screen
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    // Map to a small pixel offset range (e.g., -15px to +15px)
    target.x = ((e.clientX - cx) / cx) * 15;
    target.y = ((e.clientY - cy) / cy) * 15;

    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  });

  function updateParallax() {
    // Lerp for smooth movement
    current.x += (target.x - current.x) * 0.1;
    current.y += (target.y - current.y) * 0.1;

    document.documentElement.style.setProperty('--mouse-x', `${current.x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${current.y}px`);

    if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
      rafId = requestAnimationFrame(updateParallax);
    } else {
      rafId = null;
    }
  }
})();

/* ── Sticky Header Scroll Compact ── */
(function () {
  const header = document.getElementById("site-header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("compact");
    } else {
      header.classList.remove("compact");
    }
  }, { passive: true });
})();

/* ── Active section detection ── */
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const observedSections = Array.from(navAnchors)
  .map((anchor) => document.querySelector(anchor.getAttribute("href")))
  .filter(Boolean);

if (observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navAnchors.forEach((anchor) => {
          const isActive = anchor.getAttribute("href") === `#${entry.target.id}`;
          anchor.classList.toggle("active", isActive);

          if (isActive) {
            anchor.setAttribute("aria-current", "page");
          } else {
            anchor.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-42% 0px -50% 0px", threshold: 0 }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

/* ── Section reveal on scroll ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.add("active"); // for reveal-stagger
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.02 }
);

document.querySelectorAll(".reveal, .reveal-stagger").forEach((element) => {
  revealObserver.observe(element);
});

/* ── Stagger animation engine ── */
(function () {
  const groups = [
    { parent: '.about-grid', child: '.about-card', cls: 'stagger-child', gap: 80 },
    { parent: '.project-grid', child: '.pcard', cls: 'stagger-child', gap: 90 },
    { parent: '.skills-grid', child: '.skill-group', cls: 'stagger-child', gap: 70 },
    { parent: '.achieve-grid', child: '.achieve-card', cls: 'stagger-child', gap: 80 },
    { parent: '.timeline', child: '.timeline-item', cls: 'stagger-left', gap: 100 },
    { parent: '.contact-links', child: 'a', cls: 'stagger-child', gap: 80 },
  ];

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = entry.target._staggerChildren;
      if (!children) return;
      children.forEach((el, i) => {
        el.style.setProperty('--stagger-delay', Math.min(i * entry.target._staggerGap, 560) + 'ms');
        requestAnimationFrame(() => el.classList.add('s-visible'));
      });
      staggerObserver.unobserve(entry.target);
    });
  }, { threshold: 0.02 });

  groups.forEach(({ parent, child, cls, gap }) => {
    document.querySelectorAll(parent).forEach(container => {
      const children = Array.from(container.querySelectorAll(child));
      if (!children.length) return;
      children.forEach(el => el.classList.add(cls));
      container._staggerChildren = children;
      container._staggerGap = gap;
      staggerObserver.observe(container);
    });
  });

  /* Section heading cascade: eyebrow → h2 → p */
  document.querySelectorAll('.section-head').forEach(head => {
    const eyebrow = head.querySelector('.eyebrow');
    const h2 = head.querySelector('h2');
    const p = head.querySelector('p:not(.eyebrow)');
    if (eyebrow) eyebrow.classList.add('section-eyebrow-anim');
    if (h2) h2.classList.add('section-h2-anim');
    if (p) p.classList.add('section-p-anim');

    const headObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      [eyebrow, h2, p].forEach(el => { if (el) el.classList.add('s-visible'); });
      headObserver.disconnect();
    }, { threshold: 0.05 });
    headObserver.observe(head);
  });

  /* Contact info box */
  const infoBox = document.querySelector('.contact-info-box');
  if (infoBox) {
    infoBox.classList.add('contact-box-anim');
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      infoBox.classList.add('s-visible');
    }, { threshold: 0.1 }).observe(infoBox);
  }
})();

/* ── About card interaction ── */
const aboutCards = document.querySelectorAll(".about-card");
const aboutSignal = document.getElementById("aboutSignal");

if (aboutCards.length && aboutSignal) {
  const defaultSignal = aboutSignal.textContent;

  function setActiveAboutCard(card) {
    aboutCards.forEach((item) => item.classList.toggle("is-active", item === card));
    aboutSignal.textContent = card.dataset.signal || defaultSignal;
  }

  function clearActiveAboutCard() {
    aboutCards.forEach((item) => item.classList.remove("is-active"));
    aboutSignal.textContent = defaultSignal;
  }

  aboutCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setActiveAboutCard(card));
    card.addEventListener("focus", () => setActiveAboutCard(card));
    card.addEventListener("click", () => setActiveAboutCard(card));
  });

  const aboutGrid = document.querySelector(".about-grid");
  if (aboutGrid) {
    aboutGrid.addEventListener("mouseleave", clearActiveAboutCard);
  }
}

/* ── Project filtering ── */
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".pcard");
const projectCount = document.getElementById("projectCount");
const projectInsight = document.getElementById("projectInsight");
const defaultProjectInsight = projectInsight?.textContent || "";

function setActiveProject(project) {
  projects.forEach((item) => item.classList.toggle("is-active", item === project));
  if (projectInsight) {
    projectInsight.textContent = project.dataset.summary || defaultProjectInsight;
  }
}

function clearActiveProject() {
  projects.forEach((item) => item.classList.remove("is-active"));
  if (projectInsight) {
    projectInsight.textContent = defaultProjectInsight;
  }
}

function updateProjectCount() {
  if (!projectCount) return;
  const visibleCount = Array.from(projects).filter((project) => !project.hidden).length;
  projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    projects.forEach((project) => {
      const tags = project.dataset.tags || "";
      const shouldShow = filter === "all" || tags.includes(filter);
      project.hidden = !shouldShow;
    });
    clearActiveProject();
    updateProjectCount();
  });
});

updateProjectCount();

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => setActiveProject(project));
  project.addEventListener("focus", () => setActiveProject(project));
  project.addEventListener("click", () => setActiveProject(project));
});

const projectGrid = document.getElementById("projectGrid");
if (projectGrid) {
  projectGrid.addEventListener("mouseleave", clearActiveProject);
}

/* ── Copy email to clipboard ── */
(function () {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;
  emailLink.addEventListener('click', function (e) {
    e.preventDefault();
    const email = this.href.replace('mailto:', '');
    navigator.clipboard.writeText(email).then(() => {
      const original = this.querySelector('span')?.textContent || email;
      const span = this.querySelector('span');
      if (span) {
        span.textContent = '✓ Copied!';
        setTimeout(() => { span.textContent = original; }, 2000);
      }
    }).catch(() => {
      window.location.href = this.href;
    });
  });
})();

/* ── Timeline drag-to-scroll ── */
(function () {
  const slider = document.getElementById("timelineScroll");
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
})();

/* ── Project card click → open external link ── */
(function () {
  const pcards = document.querySelectorAll('.pcard');
  if (!pcards.length) return;

  pcards.forEach((card) => {
    card.addEventListener('click', (ev) => {
      if (ev.target.closest('a')) return;
      const links = Array.from(card.querySelectorAll('.pcard-links a[href]'));
      const external = links.find(a => /https?:\/\//i.test(a.href) && !/github.com/i.test(a.href));
      const first = external || links[0];
      if (!first) return;
      window.open(first.href, '_blank', 'noreferrer');
    });
  });
})();

/* ── Back to top (consolidated) ── */
(function () {
  const backToTopLinks = document.querySelectorAll('a[href="#top"], .footer-top-btn');
  backToTopLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

/* ══════════════════════════════════════════
   PREMIUM INTERACTIONS & ANIMATIONS (Stage 1)
   ══════════════════════════════════════════ */

/* 1. Split Text Reveal */
(function () {
  if (prefersReducedMotion) return;
  const splitTextElements = document.querySelectorAll('.split-text');

  splitTextElements.forEach(el => {
    // Basic word split
    const words = el.innerHTML.split(/(\s+|<br>|<\/br>|<br\s*\/>)/);
    el.innerHTML = '';
    words.forEach((word) => {
      if (word.match(/<br/)) {
        el.appendChild(document.createElement('br'));
      } else if (word.trim() === '') {
        el.appendChild(document.createTextNode(word)); // keep whitespace
      } else {
        const wordWrap = document.createElement('span');
        wordWrap.className = 'word';
        const wordInner = document.createElement('span');
        wordInner.className = 'word-inner';
        wordInner.innerHTML = word; // support existing internal tags if any
        wordWrap.appendChild(wordInner);
        el.appendChild(wordWrap);
      }
    });

    // Stagger delays
    const wordInners = el.querySelectorAll('.word-inner');
    wordInners.forEach((inner, i) => {
      inner.style.transitionDelay = `${i * 0.05}s`;
    });

    // Trigger
    requestAnimationFrame(() => {
      setTimeout(() => el.classList.add('active'), 100);
    });
  });
})();

/* 2. Simple Reveal Fade */
(function () {
  if (prefersReducedMotion) return;
  const fades = document.querySelectorAll('.reveal-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
        }, 300); // Wait for header text
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fades.forEach(f => observer.observe(f));
})();

/* 3. Magnetic Buttons */
(function () {
  if (prefersReducedMotion || window.innerWidth < 768) return;
  const magnets = document.querySelectorAll('.magnetic');

  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) - (rect.width / 2);
      const y = (e.clientY - rect.top) - (rect.height / 2);

      // Move up to 10px based on distance from center
      const moveX = (x / rect.width) * 15;
      const moveY = (y / rect.height) * 15;

      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
})();

/* 4. 3D Tilt Effect */
(function () {
  if (prefersReducedMotion || window.innerWidth < 768) return;
  const tiltElements = document.querySelectorAll('.tilt-effect');
  const heroSplit = document.querySelector('.hero-split'); // Mouse area

  if (!heroSplit || tiltElements.length === 0) return;

  heroSplit.addEventListener('mousemove', (e) => {
    const rect = heroSplit.getBoundingClientRect();
    // Normalize coordinates from -1 to 1 based on hero container
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    tiltElements.forEach(el => {
      // Max tilt 10 degrees
      const tiltX = y * -10;
      const tiltY = x * 10;
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  });

  heroSplit.addEventListener('mouseleave', () => {
    tiltElements.forEach(el => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
})();

/* 5. Spotlight Cards */
(function () {
  if (prefersReducedMotion || window.innerWidth < 768) return;
  const cards = document.querySelectorAll('.interactive-card, .pcard, .feat-project, .about-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  });
})();

/* ── Initialize AOS Animations ── */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  });
}

/* ── Initialize VanillaTilt ── */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".feat-project"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
  });
}

/* ── Fetch GitHub API Data ── */
(async function fetchGitHubData() {
  const psmStars = document.getElementById('gh-stars-psm');
  const iotStars = document.getElementById('gh-stars-iot');
  
  try {
    const response = await fetch('https://api.github.com/users/Fagacie/repos');
    if (!response.ok) throw new Error("API Limit");
    const repos = await response.json();
    
    const psmRepo = repos.find(r => r.name.toLowerCase().includes('psm') || r.name.toLowerCase().includes('learning')) || repos[0];
    const iotRepo = repos.find(r => r.name.toLowerCase().includes('iot') || r.name.toLowerCase().includes('pico')) || repos[1];
    
    if (psmRepo && psmStars) {
      psmStars.classList.remove('skeleton-load');
      psmStars.innerHTML = `<i class="fa-solid fa-star"></i> ${psmRepo.stargazers_count}`;
    }
    
    if (iotRepo && iotStars) {
      iotStars.classList.remove('skeleton-load');
      iotStars.innerHTML = `<i class="fa-solid fa-star"></i> ${iotRepo.stargazers_count}`;
    }
  } catch (error) {
    console.warn("GitHub API fallback active", error);
    if (psmStars) {
      psmStars.classList.remove('skeleton-load');
      psmStars.innerHTML = `<i class="fa-solid fa-star"></i> 12`;
    }
    if (iotStars) {
      iotStars.classList.remove('skeleton-load');
      iotStars.innerHTML = `<i class="fa-solid fa-star"></i> 8`;
    }
  }
})();

/* ── Interactive Hero Canvas (Light Trails & ML Nodes) ── */
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || prefersReducedMotion) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
  let lastMouse = { x: -1000, y: -1000 };

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const numParticles = Math.floor((width * height) / 15000);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  window.addEventListener('resize', resize);
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.vx = mouse.x - lastMouse.x;
    mouse.vy = mouse.y - lastMouse.y;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw particles and network connections (ML abstraction)
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      // Interaction with mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let alpha = p.baseAlpha;
      
      if (dist < 150) {
        alpha = p.baseAlpha + (150 - dist) / 150 * 0.5;
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
        
        // Draw energy trail line to mouse
        ctx.beginPath();
        ctx.strokeStyle = `rgba(139, 227, 212, ${((150 - dist) / 150) * 0.4})`;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
      
      ctx.beginPath();
      ctx.fillStyle = `rgba(139, 227, 212, ${alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx2 = p.x - p2.x;
        const dy2 = p.y - p2.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (dist2 < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 227, 212, ${p.baseAlpha * (100 - dist2) / 100 * 0.3})`;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    // Draw mouse light trail
    if (mouse.x > 0 && mouse.y > 0 && (Math.abs(mouse.vx) > 1 || Math.abs(mouse.vy) > 1)) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, 'rgba(139, 227, 212, 0.15)');
      gradient.addColorStop(1, 'rgba(139, 227, 212, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
      ctx.fill();
    }
    
    requestAnimationFrame(draw);
  }

  resize();
  draw();
})();

/* 7. Contact Form Handler */
(function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      // Simulating network request
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      btn.style.pointerEvents = 'none';
      
      setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
        
        formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
        formStatus.style.opacity = '1';
        
        setTimeout(() => {
          formStatus.style.opacity = '0';
        }, 5000);
      }, 1500);
    });
  }
})();
