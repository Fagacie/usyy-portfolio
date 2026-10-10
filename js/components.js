/* ══════════════════════════════════════════
   components.js – shared components for
   multi-page portfolio architecture.
   Loaded BEFORE main.js on every page.
   ══════════════════════════════════════════ */

(function(){
  'use strict';

  /* ── Determine base path (for pages in subdirectories) ── */
  const depth = (location.pathname.match(/\//g) || []).length - 1;
  const isSubDir = location.pathname.includes('/projects/');
  const BASE = isSubDir ? '../' : './';

  /* ── Current page detection ── */
  const path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
  const pageName = path.replace('.html', '');

  /* ══════════════════════════════════════════
     HEADER
  ══════════════════════════════════════════ */
  function buildHeader(){
    const header = document.getElementById('site-header');
    if (!header) return;
    
    // Add class for the floating style
    header.classList.add('floating-header-container');

    const navItems = [
      { label: 'Home',     href: './',            id: 'home' },
      { label: 'Projects', href: 'work',          id: 'work' },
      { label: 'About',    href: 'about',         id: 'about' },
      { label: 'Research', href: 'research',      id: 'research' },
      { label: 'Contact',  href: 'contact',       id: 'contact' },
    ];

    /* Check if we're on a project subpage */
    const projectPages = ['psm-e-learning', 'iot-monitoring', 'pku-management', 'weatherhub', 'masakjerr', 'elite-soccer'];
    const isProjectPage = projectPages.includes(pageName);
    const activeId = isProjectPage ? 'work' : (pageName === 'index' ? 'home' : pageName);

    // Build Desktop Links
    const navHTML = navItems.map(item => {
      const isCurrent = item.id === activeId;
      const href = BASE + item.href;
      return `<a href="${href}" class="nav-item nav-link ${isCurrent ? 'active' : ''}" data-id="${item.id}" ${isCurrent ? 'aria-current="page"' : ''}>${item.label}</a>`;
    }).join('\n        ');

    // Always-visible phone navigation: visitors should not need to open a menu
    // just to reach a main section.
    const mobileDockIcons = {
      home: 'fa-house',
      work: 'fa-diagram-project',
      about: 'fa-user',
      research: 'fa-flask',
      contact: 'fa-envelope'
    };

    const mobileDockHTML = navItems.map((item) => {
      const isCurrent = item.id === activeId;
      const href = BASE + item.href;
      const icon = mobileDockIcons[item.id] || 'fa-circle';
      return '<a href="' + href + '" class="mobile-dock-link ' + (isCurrent ? 'active' : '') + '" data-id="' + item.id + '"' +
        (isCurrent ? ' aria-current="page"' : '') + '>' +
        '<i class="fa-solid ' + icon + '" aria-hidden="true"></i>' +
        '<span>' + item.label + '</span></a>';
    }).join('\n      ');

    header.innerHTML = `
    <nav class="floating-nav" aria-label="Primary navigation">
      <!-- Monogram Logo -->
      <a href="${BASE}index.html" class="nav-logo" aria-label="Abbas Usman Adamu home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22H6.5L12 11L17.5 22H22L12 2Z" fill="currentColor"/>
        </svg>
      </a>

      <!-- Desktop Links with Sliding Indicator -->
      <div class="nav-links" id="navLinks">
        <div class="nav-indicator" id="navIndicator" aria-hidden="true"></div>
        ${navHTML}
      </div>

      <!-- Actions (Resume + Theme) -->
      <div class="nav-actions" id="navActions">
        <a href="${BASE}resume" class="nav-resume-btn" target="_blank" rel="noopener noreferrer" aria-label="View résumé PDF in a new tab">View résumé</a>
      </div>

    </nav>

    <nav class="mobile-bottom-nav" aria-label="Mobile primary navigation">
      ${mobileDockHTML}
    </nav>`;

    document.body.classList.add('has-mobile-bottom-nav');

    /* Sliding Indicator Logic */
    const navList = document.getElementById('navLinks');
    const indicator = document.getElementById('navIndicator');
    const links = document.querySelectorAll('.nav-link');
    const activeLink = document.querySelector('.nav-link.active');

    if (navList && indicator && links.length) {
      // Function to move the pill
      function moveIndicator(el) {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const parentRect = navList.getBoundingClientRect();
        
        indicator.style.width = `${rect.width}px`;
        indicator.style.height = `${rect.height}px`;
        indicator.style.transform = `translate(${rect.left - parentRect.left}px, ${rect.top - parentRect.top}px)`;
        indicator.style.opacity = '1';
      }

      // Initialize position on load
      setTimeout(() => {
        if (activeLink) moveIndicator(activeLink);
        else indicator.style.opacity = '0';
      }, 50);

      window.addEventListener('resize', () => {
        if (activeLink) moveIndicator(activeLink);
      });

      links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
          moveIndicator(e.currentTarget);
        });
        link.addEventListener('focus', (e) => {
          moveIndicator(e.currentTarget);
        });
      });

      navList.addEventListener('mouseleave', () => {
        if (activeLink) moveIndicator(activeLink);
        else indicator.style.opacity = '0';
      });
    }
  }

  /* ══════════════════════════════════════════
     FOOTER
  ══════════════════════════════════════════ */
  function buildFooter(){
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.classList.add('mega-footer');

    footer.innerHTML = `
    <div class="mega-footer-container">
      <div class="footer-grid">
        <!-- Col 1: Brand & Contact -->
        <div class="footer-col footer-col-brand">
          <h3 class="footer-col-title">Let's Connect</h3>
          <p class="footer-blurb">Always exploring the intersection of design and engineering.</p>
          <a href="mailto:abbasusman561@gmail.com" class="footer-email-link">abbasusman561@gmail.com</a>
        </div>
        
        <!-- Col 2: Navigation -->
        <div class="footer-col">
          <h3 class="footer-col-title">Navigation</h3>
          <nav class="mega-footer-nav" aria-label="Footer navigation">
            <a href="${BASE}./">Home</a>
            <a href="${BASE}work">Projects</a>
            <a href="${BASE}about">About</a>
            <a href="${BASE}research">Research</a>
            <a href="${BASE}contact">Contact</a>
          </nav>
        </div>

        <!-- Col 3: Socials -->
        <div class="footer-col">
          <h3 class="footer-col-title">Socials</h3>
          <nav class="mega-footer-social">
            <a href="https://www.linkedin.com/in/fagacie" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/Fagacie" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://x.com/fagacie_" target="_blank" rel="noreferrer">X (Twitter)</a>
            <a href="https://www.instagram.com/fagacie_/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/usman.abbas.10420321/" target="_blank" rel="noreferrer">Facebook</a>
          </nav>
        </div>
      </div>
      
      <div class="footer-bottom-bar">
        <!-- Kept empty left side so button goes to right, or just flex-end -->
        <div></div>
        <button class="back-to-top-btn" aria-label="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
          <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    
    <!-- The Massive Bottom Anchor -->
    <div class="mega-footer-text-container">
      <span class="mega-footer-text" aria-hidden="true">ABBAS USMAN</span>
      <div class="mega-footer-copyright">
        &copy; ${new Date().getFullYear()} &middot; All Rights Reserved.
      </div>
    </div>`;
  }

  /* ══════════════════════════════════════════
     PAGE TRANSITION (fade-in)
  ══════════════════════════════════════════ */
  function initTransition(){
    document.body.classList.add('page-enter');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('page-visible');
      });
    });
  }

  /* ══════════════════════════════════════════
     THEME TOGGLE (dark/light)
  ══════════════════════════════════════════ */
  function initTheme(){
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    /* Inject toggle button into Desktop and Mobile navs */
    const navActions = document.getElementById('navActions');
    const mobileActions = document.getElementById('mobileActions');

    const toggleHTML = `<button class="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" title="Toggle theme">
      <i class="fa-solid fa-moon theme-icon-dark" aria-hidden="true"></i>
      <i class="fa-solid fa-sun theme-icon-light" aria-hidden="true"></i>
    </button>`;

    if (navActions) {
      navActions.insertAdjacentHTML('afterbegin', toggleHTML);
    }
    
    // For mobile, we need a separate ID or just querySelector so they don't clash, 
    // but the original logic uses 'themeToggle' ID. Let's make it work for multiple.
    if (mobileActions) {
      mobileActions.insertAdjacentHTML('afterbegin', toggleHTML.replace('id="themeToggle"', 'id="themeToggleMobile"'));
    }

    const toggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')].filter(Boolean);
    
    toggles.forEach(toggleBtn => {
      toggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    });
  }

  /* ══════════════════════════════════════════
     CERTIFICATE VIEWER (lightbox modal)
  ══════════════════════════════════════════ */
  function initCertViewer(){
    /* Create modal shell once */
    const modal = document.createElement('div');
    modal.id = 'certModal';
    modal.className = 'cert-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Certificate viewer');
    modal.innerHTML = `
      <div class="cert-modal-backdrop"></div>
      <div class="cert-modal-content">
        <button class="cert-modal-close" aria-label="Close viewer">&times;</button>
        <div class="cert-modal-body" id="certModalBody"></div>
        <a class="cert-modal-download" id="certModalDownload" download aria-label="Download certificate">
          <i class="fa-solid fa-download" aria-hidden="true"></i> Download
        </a>
      </div>`;
    document.body.appendChild(modal);

    const body = document.getElementById('certModalBody');
    const downloadBtn = document.getElementById('certModalDownload');
    const closeBtn = modal.querySelector('.cert-modal-close');
    const backdrop = modal.querySelector('.cert-modal-backdrop');

    function openCert(src, title){
      const ext = src.split('.').pop().toLowerCase();
      if (ext === 'pdf') {
        body.innerHTML = `<iframe src="${src}" class="cert-modal-pdf" title="${title || 'Certificate'}"></iframe>`;
      } else {
        body.innerHTML = `<img src="${src}" alt="${title || 'Certificate'}" class="cert-modal-img" />`;
      }
      downloadBtn.href = src;
      downloadBtn.download = title ? title.replace(/[^a-zA-Z0-9\s-]/g, '') + '.' + ext : '';
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeCert(){
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      body.innerHTML = '';
    }

    closeBtn.addEventListener('click', closeCert);
    backdrop.addEventListener('click', closeCert);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeCert();
    });

    /* Attach to all certificate triggers */
    document.querySelectorAll('[data-cert]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCert(btn.getAttribute('data-cert'), btn.getAttribute('data-cert-title') || '');
      });
    });

    /* Expose globally for dynamic use */
    window.openCertViewer = openCert;
  }

  /* ══════════════════════════════════════════
     SCROLL PROGRESS
  ══════════════════════════════════════════ */
  function initScrollProgress(){
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update(){
      const top = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (height > 0 ? (top / height) * 100 : 0).toFixed(2) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════
     INIT
  ══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    buildFooter();
    initTransition();
    initTheme();
    initScrollProgress();
    initCertViewer();
  });

})();
