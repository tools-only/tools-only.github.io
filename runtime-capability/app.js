const markets = {
  code: {
    symbol: "CODE.FIX", runtime: "R7 / PATCHWORKS", price: "0.70", change: "+7.4%", direction: "up",
    unit: "/ VERIFIED FIX", volume: "1,842", fill: "93.1%", low: "¥0.52", high: "¥0.78",
    points: [0.54, 0.57, 0.55, 0.59, 0.61, 0.60, 0.64, 0.62, 0.66, 0.65, 0.69, 0.67, 0.70]
  },
  research: {
    symbol: "WEB.RESEARCH", runtime: "R4 / DEEPLENS", price: "1.86", change: "+1.8%", direction: "up",
    unit: "/ VERIFIED REPORT", volume: "972", fill: "91.6%", low: "¥1.72", high: "¥1.94",
    points: [1.78, 1.80, 1.77, 1.82, 1.81, 1.84, 1.83, 1.85, 1.82, 1.84, 1.88, 1.87, 1.86]
  },
  review: {
    symbol: "CODE.REVIEW", runtime: "R9 / SENTINEL", price: "0.31", change: "+4.2%", direction: "up",
    unit: "/ ACCEPTED REVIEW", volume: "3,106", fill: "95.4%", low: "¥0.26", high: "¥0.33",
    points: [0.27, 0.28, 0.27, 0.29, 0.28, 0.30, 0.29, 0.30, 0.31, 0.30, 0.32, 0.31, 0.31]
  },
  lead: {
    symbol: "LEAD.VERIFY", runtime: "R2 / PROSPECTOR", price: "0.08", change: "−2.1%", direction: "down",
    unit: "/ VERIFIED LEAD", volume: "8,441", fill: "89.7%", low: "¥0.07", high: "¥0.11",
    points: [0.10, 0.095, 0.101, 0.096, 0.093, 0.094, 0.089, 0.091, 0.086, 0.088, 0.082, 0.084, 0.08]
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function chartPath(points) {
  const width = 720;
  const top = 25;
  const bottom = 195;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(max - min, 0.001);
  const coords = points.map((value, index) => ({
    x: index / (points.length - 1) * width,
    y: bottom - (value - min) / span * (bottom - top)
  }));
  const line = coords.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${width},220 L0,220 Z`, last: coords.at(-1) };
}

function renderMarket(key, announce = true) {
  const market = markets[key];
  const panel = $("#quote-panel");
  panel.classList.add("is-switching");
  setTimeout(() => panel.classList.remove("is-switching"), 180);

  $("#quote-symbol").textContent = market.symbol;
  $("#quote-runtime").textContent = market.runtime;
  $("#quote-price").textContent = market.price;
  $("#quote-change").textContent = market.change;
  $("#quote-change").className = market.direction === "up" ? "is-up" : "is-down";
  $("#quote-unit").textContent = market.unit;
  $("#quote-volume").textContent = market.volume;
  $("#quote-fill").textContent = market.fill;
  $("#quote-low").textContent = market.low;
  $("#quote-high").textContent = market.high;

  const chart = chartPath(market.points);
  const color = market.direction === "up" ? "#385cff" : "#f04b2e";
  $("#chart-line").setAttribute("d", chart.line);
  $("#chart-line").style.stroke = color;
  $("#chart-area").setAttribute("d", chart.area);
  $("#chart-point").setAttribute("cx", chart.last.x);
  $("#chart-point").setAttribute("cy", chart.last.y);
  $("#area-gradient stop").setAttribute("stop-color", color);

  $$(".market-row").forEach((row) => row.classList.toggle("is-selected", row.dataset.symbol === key));
  if (announce) showToast(`${market.symbol} · ¥${market.price} ${market.unit}`);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

$$(".market-row").forEach((row) => row.addEventListener("click", () => renderMarket(row.dataset.symbol)));
const requestedMarket = new URLSearchParams(window.location.search).get("symbol");
renderMarket(markets[requestedMarket] ? requestedMarket : "code", false);
