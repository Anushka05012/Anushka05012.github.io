/* =========================================================
   Case-study page: project.html?p=<slug>
   Everything here is built from the matching entry in projects.js.
   ========================================================= */

(function projectPage() {
  const main = $("#project");
  const slug = new URLSearchParams(location.search).get("p");
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    main.innerHTML = `
      <section class="pj-missing">
        <span class="eyebrow">404</span>
        <h1>Project not found.</h1>
        <a class="pill-btn" href="index.html#work">See all projects <span>→</span></a>
      </section>`;
    return;
  }

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  document.title = `${p.title} — Anushka Bhalerao`;
  if (p.accent) document.documentElement.style.setProperty("--accent", p.accent);

  const list = (items) => `<ul class="pj-list">${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  const buttons = [
    p.live && `<a class="pill-btn" href="${p.live}" target="_blank" rel="noopener">Visit live site <span>↗</span></a>`,
    ...(p.links || []).map((l) => `<a class="btn-link" href="${l.url}" target="_blank" rel="noopener">${l.label} <span class="arrow">↗</span></a>`),
  ].filter(Boolean).join("");

  const meta = [
    ["When", p.when],
    ["Role", p.role],
    ["Team", p.team],
    ["Stack", p.stack.join(" · ")],
  ].filter(([, v]) => v);

  // every gallery image gets an index so the lightbox can step through all of them
  const all = [];
  const shot = (img, layout) => {
    // videos play inline (muted, looping) and don't open in the lightbox
    const media = img.video
      ? `<video src="${img.video}" poster="${img.poster || ""}" autoplay muted loop playsinline controls
           aria-label="${img.caption || p.title}"></video>`
      : `<img src="${img.src}" alt="${img.caption || p.title}" loading="lazy" />`;
    let inner = media;
    if (img.frame === "browser") inner = browserFrame(media, p.live);
    if (img.frame === "phone") inner = `<div class="phone">${media}</div>`;
    const cls = ["shot", img.wide && "wide", img.frame && `shot-${img.frame}`, img.video && "shot-video"]
      .filter(Boolean).join(" ");
    const body = img.video
      ? `<div class="shot-open">${inner}</div>`
      : `<button class="shot-open" data-shot="${all.push(img) - 1}" aria-label="View larger: ${img.caption || "image"}">${inner}</button>`;
    return `<figure class="${cls} reveal">
        ${body}
        ${img.caption && layout !== "masonry" ? `<figcaption>${img.caption}</figcaption>` : ""}
      </figure>`;
  };

  const gallery = (p.gallery || [])
    .map(
      (g, gi) => `
      <section class="pj-group">
        <div class="pj-group-head reveal">
          <span class="eyebrow">${String(gi + 1).padStart(2, "0")} — Gallery</span>
          <h2>${g.title}</h2>
          ${g.text ? `<p>${g.text}</p>` : ""}
        </div>
        <div class="g-${g.layout || "masonry"}">${g.images.map((img) => shot(img, g.layout)).join("")}</div>
      </section>`
    )
    .join("");

  // one feature shown off in detail: screenshot on one side, numbered steps on the other
  const s = p.spotlight;
  const spotlight = s
    ? `
      <section class="pj-spot">
        <div class="pj-group-head reveal">
          <span class="eyebrow">${s.eyebrow || "Feature spotlight"}</span>
          <h2>${s.title}</h2>
          ${s.text ? `<p>${s.text}</p>` : ""}
        </div>
        <div class="pj-spot-grid">
          ${s.image ? shot(s.image, "spotlight") : ""}
          <ol class="pj-steps">
            ${(s.steps || [])
              .map((st) => `<li class="reveal"><h3>${st.title}</h3><p>${st.text}</p></li>`)
              .join("")}
          </ol>
        </div>
      </section>`
    : "";

  const hero = p.video
    ? browserFrame(
        `<video src="${p.video}" poster="${p.poster || p.cover || ""}" autoplay muted loop playsinline controls
           aria-label="Screen recording of ${p.title}"></video>`,
        p.live
      )
    : p.cover
    ? browserFrame(`<img src="${p.cover}" alt="${p.title}" />`, p.live)
    : `<div class="pj-art">${projectCover(p, false)}</div>`;

  main.innerHTML = `
    <section class="pj-hero">
      <a class="back" href="index.html#work"><span>←</span> All projects</a>
      <div class="pj-head">
        <div class="feature-cats"><span>${p.category}</span><span>${p.type}</span>${
          p.live ? `<span class="live-tag"><span class="pulse"></span> Live</span>` : ""
        }</div>
        <h1>${p.title}</h1>
        <div class="pj-sub">
          <p class="pj-tagline">${p.tagline}</p>
          <div class="pj-side">
            ${p.stat ? `<p class="pj-stat"><b>${p.stat.value}</b><span>${p.stat.label}</span></p>` : ""}
            ${buttons ? `<div class="pj-buttons">${buttons}</div>` : ""}
          </div>
        </div>
      </div>
    </section>

    <figure class="pj-cover reveal">${hero}</figure>

    <section class="pj-info">
      <dl class="pj-meta reveal">
        ${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
      </dl>

      <p class="pj-overview reveal">${p.summary}</p>

      <div class="pj-cols">
        ${p.built.length ? `<div class="reveal"><h2 class="pj-h">What I built</h2>${list(p.built)}</div>` : ""}
        ${p.highlights.length ? `<div class="reveal"><h2 class="pj-h">Highlights</h2>${list(p.highlights)}</div>` : ""}
      </div>
    </section>

    ${spotlight}

    ${
      gallery || p.video || spotlight ? gallery :
      `<section class="pj-group"><div class="pj-soon reveal">
         <span>✦</span>
         <p>Screenshots and a deeper write-up for this project are on the way.</p>
       </div></section>`
    }

    <a class="pj-next" href="project.html?p=${next.slug}">
      <span class="eyebrow">Next project</span>
      <span class="pj-next-title">${next.title} <i>→</i></span>
      <span class="pj-next-thumb">${projectCover(next, false)}</span>
    </a>`;

  revealer.scan(main);
  magnetic(main);

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  let current = 0;

  function show(i) {
    current = (i + all.length) % all.length;
    lbImg.src = all[current].src;
    lbImg.alt = all[current].caption || p.title;
    $("#lbCaption").textContent = all[current].caption || "";
    $("#lbCount").textContent = `${current + 1} / ${all.length}`;
  }
  function open(i) {
    show(i);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".lb-close", lb).focus();
  }
  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  main.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-shot]");
    if (btn) open(+btn.dataset.shot);
  });
  lb.addEventListener("click", (e) => {
    const action = e.target.closest("[data-lb]")?.dataset.lb;
    if (action === "close" || e.target === lb) close();
    if (action === "prev") show(current - 1);
    if (action === "next") show(current + 1);
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // swipe on touch screens
  let startX = null;
  lb.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
