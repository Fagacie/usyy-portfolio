const root = document.documentElement;

function setTheme(theme: 'light' | 'dark') {
  root.dataset.theme = theme;
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* Private browsing may disable storage. */ }
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });
});
setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

document.querySelectorAll<HTMLButtonElement>('[data-back-to-top]').forEach((button) => {
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

const searchInput = document.querySelector<HTMLInputElement>('[data-project-search]');
const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-project-filter]')];
const projectCards = [...document.querySelectorAll<HTMLElement>('[data-project-card]')];
const resultText = document.querySelector<HTMLElement>('[data-project-results]');
let activeFilter = 'all';

function applyProjectFilters() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visible = 0;
  projectCards.forEach((card) => {
    const category = card.dataset.category || '';
    const searchable = card.dataset.search || card.textContent?.toLowerCase() || '';
    const matchesFilter = activeFilter === 'all' || activeFilter === category;
    const matchesSearch = !query || searchable.includes(query);
    const show = matchesFilter && matchesSearch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (resultText) resultText.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown`;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.projectFilter || 'all';
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    applyProjectFilters();
  });
});
searchInput?.addEventListener('input', applyProjectFilters);
if (projectCards.length) applyProjectFilters();

const contactForm = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (contactForm && contactForm.dataset.formMode === 'mailto') {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const fields = new FormData(contactForm);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const subject = String(fields.get('subject') || 'Portfolio enquiry').trim();
    const message = String(fields.get('message') || '').trim();
    const body = `Name: ${name}\nReply email: ${email}\n\n${message}`;
    const status = contactForm.querySelector<HTMLElement>('[data-form-status]');
    if (status) {
      status.textContent = 'Opening your email application. Your message has not been sent until you send it from that application.';
      status.dataset.state = 'info';
    }
    window.location.href = `mailto:fagacie@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
