const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('resume-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
}

setTheme(storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('resume-theme', nextTheme);
});

const filterButtons = [...document.querySelectorAll('.filter-button')];
const publicationGroups = [...document.querySelectorAll('.publication-group')];

function filterPublications(filter) {
  publicationGroups.forEach((group) => {
    const groupMatches = filter === 'all' || group.dataset.group === filter;
    group.hidden = !groupMatches;
    group.querySelectorAll('.publication').forEach((publication) => {
      publication.classList.toggle('is-hidden', !groupMatches);
    });
  });
  filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filter === filter));
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => filterPublications(button.dataset.filter));
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => observer.observe(section));

