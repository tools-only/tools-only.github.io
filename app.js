const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.masthead nav a')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-current', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach((section) => observer.observe(section));
}
