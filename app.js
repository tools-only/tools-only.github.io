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

const usageRanges = {
  all: { from: '2026-06-07', to: '2026-08-21', requests: 35982, input: 535265018, output: 22610995, cache: 3668235581, cacheCreation: 13890462, cost: 2599.207117 },
  '30d': { from: '2026-07-23', to: '2026-08-21', requests: 9583, input: 143248173, output: 5839637, cache: 817732292, cacheCreation: 265769, cost: 769.234756 },
  '7d': { from: '2026-08-15', to: '2026-08-21', requests: 942, input: 14330579, output: 686155, cache: 100281626, cacheCreation: 0, cost: 141.179622 },
  today: { from: '2026-08-21', to: '2026-08-21', requests: 2, input: 134141, output: 793, cache: 71424, cacheCreation: 0, cost: 0.730207 }
};

const usageElements = {
  period: document.querySelector('#usage-period'), total: document.querySelector('#usage-total'), requests: document.querySelector('#usage-requests'),
  input: document.querySelector('#usage-input'), output: document.querySelector('#usage-output'), cache: document.querySelector('#usage-cache'), cost: document.querySelector('#usage-cost')
};
const formatUsage = (value) => value >= 1e9 ? (value / 1e9).toFixed(2) + 'B' : value >= 1e6 ? (value / 1e6).toFixed(2) + 'M' : value >= 1e3 ? (value / 1e3).toFixed(2) + 'K' : String(value);
const showUsage = (range) => {
  const data = usageRanges[range];
  if (!data) return;
  usageElements.period.textContent = data.from + ' – ' + data.to;
  usageElements.total.textContent = formatUsage(data.input + data.output + data.cache + data.cacheCreation);
  usageElements.requests.textContent = data.requests.toLocaleString();
  usageElements.input.textContent = formatUsage(data.input);
  usageElements.output.textContent = formatUsage(data.output);
  usageElements.cache.textContent = formatUsage(data.cache);
  usageElements.cost.textContent = '$' + data.cost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
};
document.querySelectorAll('[data-range]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-range]').forEach((item) => item.classList.remove('is-selected'));
  button.classList.add('is-selected');
  showUsage(button.dataset.range);
}));
