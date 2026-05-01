const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

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
const projects = document.querySelectorAll(".project");
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

// Initialize lightweight hero visual if present
(function(){
  const script = document.createElement('script');
  script.src = 'js/hero-visual.js';
  script.defer = true;
  document.body.appendChild(script);
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