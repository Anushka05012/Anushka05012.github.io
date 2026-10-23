/* =========================================================
   Home page only. Project data lives in projects.js,
   shared helpers in common.js.
   ========================================================= */

/* ---------- Photo fallback ---------- */
(function photo() {
  const fig = $(".hero-photo");
  const img = $(".photo", fig);
  const fail = () => fig.classList.add("no-photo");
  img.addEventListener("error", fail);
  if (img.complete && img.naturalWidth === 0) fail();
})();

/* ---------- Preloader + hero intro ---------- */
(function intro() {
  const loader = $("#loader");
  const count = $("#loaderCount");
  const title = $(".hero-title");
  const word = $(".split", title);

  // split "Hello" into letters for a staggered rise
  word.innerHTML = [...word.textContent]
    .map((c, i) => `<span class="char" style="transition-delay:${i * 0.07}s">${c}</span>`)
    .join("");

  // skip the loader when coming back from a project page
  const returning = document.referrer.includes("project.html");
  document.body.classList.add("loading");
  const duration = reducedMotion || returning ? 0 : 1400;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration || 1, 1);
    count.textContent = Math.round((1 - Math.pow(1 - t, 3)) * 100);
    if (t < 1) return requestAnimationFrame(tick);
    loader.classList.add("done");
    document.body.classList.remove("loading");
    setTimeout(() => title.classList.add("in"), returning ? 0 : 300);
  }
  requestAnimationFrame(tick);
})();

/* ---------- Clock ---------- */
(function clock() {
  const el = $("#clock");
  const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
  const update = () => (el.textContent = fmt.format(new Date()));
  update();
  setInterval(update, 10000);
})();

/* ---------- Work: featured case studies + project grid ---------- */
(function work() {
  const featuredEl = $("#featured");
  const gridEl = $("#projectGrid");
  const filters = $("#filters");
  const url = (p) => `project.html?p=${p.slug}`;
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const liveTag = (p) => (p.live ? `<span class="live-tag"><span class="pulse"></span> Live</span>` : "");
  const statHtml = (p, cls) =>
    p.stat ? `<p class="${cls}"><b>${p.stat.value}</b><span>${p.stat.label}</span></p>` : "";

  featuredEl.innerHTML = featured
    .map((p, i) => {
      const points = (p.highlights.length ? p.highlights : p.built).slice(0, 3);
      const media = p.cover ? browserFrame(projectCover(p), p.live) : projectCover(p);
      return `
      <article class="feature reveal${i % 2 ? " flip" : ""}" data-cat="${p.category}" style="--p-accent:${p.accent}">
        <a class="feature-media" href="${url(p)}" aria-label="Open ${p.title}">
          ${media}
          <span class="feature-open">Open case study <span>↗</span></span>
        </a>
        <div class="feature-body">
          <span class="feature-index">${String(i + 1).padStart(2, "0")} <i>/ ${String(featured.length).padStart(2, "0")}</i></span>
          <div class="feature-cats"><span>${p.category}</span><span>${p.type}</span>${liveTag(p)}</div>
          <h3><a href="${url(p)}">${p.title}</a></h3>
          ${statHtml(p, "feature-stat")}
          <p class="feature-what">${p.tagline}</p>
          <ul>${points.map((t) => `<li>${t}</li>`).join("")}</ul>
          <p class="feature-meta">${[p.role, p.stack.slice(0, 4).join(" · ")].filter(Boolean).join(" — ")}</p>
          <a class="pill-btn" href="${url(p)}">Open project <span>→</span></a>
        </div>
      </article>`;
    })
    .join("");

  gridEl.innerHTML =
    rest
      .map(
        (p) => `
      <div class="card-wrap reveal" data-cat="${p.category}">
        <a class="card" href="${url(p)}" style="--p-accent:${p.accent}">
          <div class="card-media">${projectCover(p, false)}</div>
          <div class="card-body">
            <div class="card-top"><span>${p.category}</span><span>${liveTag(p) || p.type}</span></div>
            <h3>${p.title}</h3>
            ${statHtml(p, "card-stat")}
            <p>${p.tagline}</p>
          </div>
          <span class="card-arrow">↗</span>
        </a>
      </div>`
      )
      .join("") +
    `<div class="card-wrap reveal" data-cat="*">
        <a class="card card-next" href="#contact">
          <div class="card-body">
            <span class="card-next-star">✦</span>
            <h3>More in the making…</h3>
            <p>Have an idea we could build together?</p>
          </div>
          <span class="card-arrow">→</span>
        </a>
      </div>`;

  // filters
  const cats = ["All", ...new Set(projects.map((p) => p.category))];
  filters.innerHTML = cats
    .map((c) => {
      const n = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
      return `<button class="chip${c === "All" ? " active" : ""}" data-cat="${c}" aria-pressed="${c === "All"}">${c}<sup>${n}</sup></button>`;
    })
    .join("");

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    $$(".chip", filters).forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    const cat = btn.dataset.cat;
    $$(".feature, .card-wrap", $("#work")).forEach((el) => {
      const show = cat === "All" || el.dataset.cat === cat || el.dataset.cat === "*";
      el.classList.toggle("hide", !show);
    });
    // hide the "More projects" label when the filter leaves nothing in the grid
    $("#moreLabel").classList.toggle("hide", !$$('.card-wrap:not(.hide):not([data-cat="*"])', gridEl).length);
  });

  revealer.scan($("#work"));
})();

/* ---------- Copy email ---------- */
(function email() {
  const btn = $("#emailBtn");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.email);
      btn.classList.add("copied");
      setTimeout(() => btn.classList.remove("copied"), 1800);
    } catch (e) {
      location.href = `mailto:${btn.dataset.email}`;
    }
  });
})();

/* ---------- Playground: trace a letter ---------- */
const canvas = $("#traceCanvas");
const ctx = canvas.getContext("2d");
const SIZE = canvas.width;
const mask = document.createElement("canvas");   // the letter shape
const strokes = document.createElement("canvas"); // what the visitor drew
mask.width = mask.height = strokes.width = strokes.height = SIZE;
const mctx = mask.getContext("2d");
const sctx = strokes.getContext("2d");
const letters = "ABCDEGKMNRSWabdghkpqrs";
let letter = "a";

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function newLetter() {
  let next;
  do next = letters[Math.floor(Math.random() * letters.length)];
  while (next === letter);
  letter = next;
  mctx.clearRect(0, 0, SIZE, SIZE);
  mctx.fillStyle = "#000";
  mctx.font = `500 ${SIZE * 0.72}px "Inter Tight", sans-serif`;
  mctx.textAlign = "center";
  mctx.textBaseline = "middle";
  mctx.fillText(letter, SIZE / 2, SIZE / 2 + SIZE * 0.03);
  clearStrokes();
}

function clearStrokes() {
  sctx.clearRect(0, 0, SIZE, SIZE);
  $("#playScore b").textContent = "0%";
  $("#canvasHint").style.opacity = 1;
  drawTrace();
}

function drawTrace() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  // faint letter
  ctx.globalAlpha = 0.14;
  ctx.drawImage(mask, 0, 0);
  ctx.globalAlpha = 1;
  // tint the faint letter with the current ink colour
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = cssVar("--ink");
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(strokes, 0, 0);
}
document.addEventListener("themechange", drawTrace);

function score() {
  const m = mctx.getImageData(0, 0, SIZE, SIZE).data;
  const s = sctx.getImageData(0, 0, SIZE, SIZE).data;
  let inside = 0, covered = 0, outside = 0;
  for (let i = 3; i < m.length; i += 16) {
    if (m[i] > 128) { inside++; if (s[i] > 0) covered++; }
    else if (s[i] > 0) outside++;
  }
  // reward coverage, lightly penalise scribbling outside the letter
  const pct = Math.max(0, Math.round((covered / inside) * 100 - (outside / inside) * 25));
  $("#playScore b").textContent = Math.min(pct, 100) + "%";
}

(function tracing() {
  let drawing = false, last = null;
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE };
  };
  canvas.addEventListener("pointerdown", (e) => {
    drawing = true;
    last = pos(e);
    canvas.setPointerCapture(e.pointerId);
    $("#canvasHint").style.opacity = 0;
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    const p = pos(e);
    sctx.strokeStyle = cssVar("--accent");
    sctx.lineWidth = SIZE * 0.06;
    sctx.lineCap = sctx.lineJoin = "round";
    sctx.beginPath();
    sctx.moveTo(last.x, last.y);
    sctx.lineTo(p.x, p.y);
    sctx.stroke();
    last = p;
    drawTrace();
  });
  const end = () => { if (drawing) { drawing = false; score(); } };
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);

  $("#nextLetter").addEventListener("click", newLetter);
  $("#clearCanvas").addEventListener("click", clearStrokes);

  // wait for the web font so the letter renders in Inter Tight
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(newLetter);
})();
