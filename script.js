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


