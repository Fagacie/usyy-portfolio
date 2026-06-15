const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ── Scroll progress bar ── */
(function(){
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  function updateProgress(){
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
})();

/* ── Typewriter animation on hero H1 ── */
(function(){
  const h1 = document.querySelector('h1[data-typewriter]');
  if (!h1) return;

  const text = h1.getAttribute('aria-label') || '';
  if (!text) return;

  let i = 0;
  h1.textContent = '';
  h1.classList.add('typing');

  // Small delay so the page renders first
  setTimeout(function type(){
    if (i < text.length){
      h1.textContent += text[i];
      i++;
      // Slight random jitter (40-70ms) for a realistic feel
      setTimeout(type, 45 + Math.random() * 30);
    } else {
      // Done — swap class so cursor fades out
      h1.classList.remove('typing');
      h1.classList.add('done');
    }
  }, 320);
})();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* ── Stagger animation engine ── */
(function(){
  // Map: parent selector → child selector → animation class
  const groups = [
    { parent: '.about-grid',    child: '.about-card',    cls: 'stagger-child', gap: 80  },
    { parent: '.project-grid',  child: '.pcard',         cls: 'stagger-child', gap: 90  },
    { parent: '.skills-grid',   child: '.skill-group',   cls: 'stagger-child', gap: 70  },
    { parent: '.timeline',      child: '.timeline-item', cls: 'stagger-left',  gap: 100 },
    { parent: '.contact-links', child: 'a',              cls: 'stagger-child', gap: 80  },
  ];

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = entry.target._staggerChildren;
      if (!children) return;
      children.forEach((el, i) => {
        el.style.setProperty('--stagger-delay', Math.min(i * entry.target._staggerGap, 560) + 'ms');
        // Small rAF so the browser registers the initial hidden state first
        requestAnimationFrame(() => el.classList.add('s-visible'));
      });
      staggerObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

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

  // Section heading cascade: eyebrow → h2 → p
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
    }, { threshold: 0.15 });
    headObserver.observe(head);
  });

  // Contact info box
  const infoBox = document.querySelector('.contact-info-box');
  if (infoBox) {
    infoBox.classList.add('contact-box-anim');
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      infoBox.classList.add('s-visible');
    }, { threshold: 0.1 }).observe(infoBox);
  }
})();



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

  document.querySelector(".about-grid").addEventListener("mouseleave", clearActiveAboutCard);
}

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

const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

if (contactForm && formHint) {
  contactForm.addEventListener("submit", () => {
    formHint.textContent = "Sending message...";
  });
}

/* ── Copy email to clipboard ── */
(function(){
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;
  emailLink.addEventListener('click', function(e){
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
      // fallback: open mail client
      window.location.href = this.href;
    });
  });
})();

const slider = document.getElementById("timelineScroll");

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

/* Project card click — open external link in new tab (no embed modal, no hint badge) */
(function(){
  const pcards = document.querySelectorAll('.pcard');
  if (!pcards.length) return;

  pcards.forEach((card)=>{
    card.addEventListener('click', (ev)=>{
      // allow direct link clicks to behave normally
      if (ev.target.closest('a')) return;

      // find a live/external link first (not github)
      const links = Array.from(card.querySelectorAll('.pcard-links a[href]'));
      const external = links.find(a=>/https?:\/\//i.test(a.href) && !/github.com/i.test(a.href));
      const first = external || links[0];
      if (!first) return;
      window.open(first.href, '_blank', 'noreferrer');
    });
  });
})();