async function initializeUsage() {
  const period = document.querySelector('#usage-period');
  try {
    const response = await fetch('./usage-data.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Usage unavailable');
    const { days, exportedAt, timeZone = 'Asia/Shanghai' } = await response.json();
    if (!days.length) throw new Error('No records');
    const total = day => day.input + day.output + day.cache + day.creation;
    const compact = value => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 2 }).format(value);
    const shift = (date, amount) => new Date(Date.parse(date + 'T00:00:00Z') + amount * 86400000).toISOString().slice(0, 10);
    const buttons = [...document.querySelectorAll('[data-range]')];
    function render(from, to, range) {
      const selected = days.filter(day => day.date >= from && day.date <= to);
      const sums = Object.fromEntries(['requests', 'input', 'output', 'cache', 'creation', 'cost'].map(key => [key, selected.reduce((sum, day) => sum + day[key], 0)]));
      const available = selected.length > 0;
      const values = { total: compact(total(sums)), requests: sums.requests.toLocaleString('en'), input: compact(sums.input), output: compact(sums.output), cache: compact(sums.cache), cost: '$' + sums.cost.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
      for (const [key, value] of Object.entries(values)) document.querySelector('#usage-' + key).textContent = available ? value : '—';
      period.textContent = from + ' – ' + to;
      buttons.forEach(button => { button.classList.toggle('is-selected', button.dataset.range === range); button.setAttribute('aria-pressed', String(button.dataset.range === range)); });
      document.querySelector('#usage-detail').textContent = available ? `${selected.length} recorded days · ${sums.requests.toLocaleString('en')} requests · ${total(sums).toLocaleString('en')} tokens` : 'No records in this snapshot for the selected period.';
      document.querySelectorAll('.activity-day').forEach(button => button.classList.toggle('outside-range', button.dataset.date < from || button.dataset.date > to));
    }
    const calendar = document.querySelector('#usage-calendar');
    const first = days[0].date;
    const last = days.at(-1).date;
    const today = () => new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const lookup = new Map(days.map(day => [day.date, day]));
    const peak = Math.max(...days.map(total), 1);
    const start = shift(first, -new Date(first + 'T00:00:00Z').getUTCDay());
    for (let date = start; date <= last; date = shift(date, 1)) {
      const day = lookup.get(date);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'activity-day';
      button.dataset.date = date;
      button.dataset.level = day ? String(Math.max(1, Math.ceil(Math.sqrt(total(day) / peak) * 4))) : '0';
      button.title = day ? `${date}: ${total(day).toLocaleString('en')} tokens · ${day.requests} requests` : `${date}: no record`;
      button.setAttribute('aria-label', button.title);
      button.disabled = date < first;
      button.addEventListener('click', () => render(button.dataset.date, button.dataset.date, 'day'));
      calendar.append(button);
    }
    buttons.forEach(button => button.addEventListener('click', () => {
      const range = button.dataset.range;
      const snapshotEnd = today();
      render(range === 'all' ? first : shift(snapshotEnd, range === '30d' ? -29 : range === '7d' ? -6 : 0), snapshotEnd, range);
    }));
    document.querySelector('#usage-status').textContent = `cc-switch history + deduplicated recent requests through ${last}. Dates: ${timeZone}. Updated ${exportedAt}. Input excludes cache; total includes cache once. Blank days mean no record. Cost is an estimate. Daily sync is not enabled.`;
    render(first, today(), 'all');
  } catch {
    period.textContent = 'Usage data could not be loaded. Please refresh.';
  }
}
initializeUsage();
