// ============================
// USYYTECH Portfolio JS
// Light mode default ✅
// ============================

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ----------------------------
// Mobile nav toggle
// ----------------------------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ----------------------------
// Active nav link on scroll
// ----------------------------
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const sectionMap = Array.from(navAnchors)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
        if (a.classList.contains("active")) {
          a.setAttribute("aria-current", "page");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sectionMap.forEach((section) => sectionObserver.observe(section));

// ----------------------------
// Reveal animation on scroll
// ----------------------------
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => observer.observe(el));

// ----------------------------
// Theme toggle (Light default)
// ----------------------------
const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
    localStorage.setItem("usyy_theme", "dark");
  } else {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
    localStorage.setItem("usyy_theme", "light");
  }
}

// Light mode default (unless user saved dark)
const savedTheme = localStorage.getItem("usyy_theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// ----------------------------
// Project filters
// ----------------------------
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projects.forEach((project) => {
      const tags = project.dataset.tags || "";

      if (filter === "all" || tags.includes(filter)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// ----------------------------
// Modal logic (with screenshots)
// ----------------------------
const modal = document.getElementById("projectModal");
const closeModalBtn = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalRole = document.getElementById("modalRole");
const modalStack = document.getElementById("modalStack");
const modalGallery = document.getElementById("modalGallery");
const modalPoints = document.getElementById("modalPoints");
const modalLinks = document.getElementById("modalLinks");

document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Header
    modalTitle.textContent = btn.dataset.title || "Project";
    modalRole.textContent = btn.dataset.role || "";
    modalStack.textContent = "Stack: " + (btn.dataset.stack || "");

    // Gallery
    modalGallery.innerHTML = "";
    const images = (btn.dataset.images || "").split("|").filter(Boolean);

    if (images.length === 0) {
      // show placeholder if no screenshots provided
      const box = document.createElement("div");
      box.style.border = "1px solid var(--border)";
      box.style.borderRadius = "18px";
      box.style.padding = "14px";
      box.style.color = "var(--muted)";
      box.style.fontWeight = "850";
      box.style.gridColumn = "1 / -1";
      box.textContent = "No screenshots uploaded yet ✅ Add images into assets/img/ to display here.";
      modalGallery.appendChild(box);
    } else {
      images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `${btn.dataset.title} screenshot`;
        modalGallery.appendChild(img);
      });
    }

    // Points
    modalPoints.innerHTML = "";
    const points = (btn.dataset.points || "").split("|").filter(Boolean);
    points.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      modalPoints.appendChild(li);
    });

    // Links
    modalLinks.innerHTML = "";
    const links = (btn.dataset.links || "").split("|").filter(Boolean);
    links.forEach((linkItem) => {
      const [label, url] = linkItem.split(":");
      const a = document.createElement("a");
      a.className = "btn btn-small btn-ghost";
      a.textContent = label?.trim() || "Link";
      a.href = url?.trim() || "#";
      a.target = "_blank";
      a.rel = "noreferrer";
      modalLinks.appendChild(a);
    });

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ----------------------------
// Contact form UX (Formspree)
// ----------------------------
const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    formHint.textContent = "Sending... ✅";
  });
}
