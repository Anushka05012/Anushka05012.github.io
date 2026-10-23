/* =========================================================
   Shared by every page: theme, reveal-on-scroll, nav,
   cursor, magnetic buttons, footer year.
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Theme ---------- */
(function theme() {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = saved || (prefersDark ? "dark" : "light");

  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    document.dispatchEvent(new Event("themechange"));
  });
})();

/* ---------- Scroll reveal + counters ---------- */
const revealer = (function reveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$(".count", e.target).forEach(animateCount);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );

  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const to = parseFloat(el.dataset.to);
    const decimals = +el.dataset.decimals || 0;
    const start = performance.now();
    const dur = reducedMotion ? 0 : 1800;
    (function step(now) {
      const t = Math.min((now - start) / dur || 1, 1);
      const v = to * (1 - Math.pow(1 - t, 4));
      el.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  // call again after adding .reveal elements to the page
  function scan(root = document) {
    $$(".reveal:not(.in)", root).forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      io.observe(el);
    });
  }
  scan();
  return { scan };
})();

/* ---------- Nav: hide on scroll, active link, progress, mobile menu ---------- */
(function nav() {
  const nav = $("#nav");
  const bar = $("#progress");
  let lastY = 0;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 30);
    nav.classList.toggle("hidden", y > lastY && y > 400 && !document.body.classList.contains("menu-open"));
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }, { passive: true });

  const links = $$(".nav-links a");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href").endsWith(`#${e.target.id}`)));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => io.observe(s));

  const menuBtn = $("#menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  links.forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
})();

/* ---------- Cursor dot + magnetic buttons ---------- */
(function cursor() {
  const c = $("#cursor");
  if (!finePointer || !c) return;
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;

  addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
  (function loop() {
    cx += (x - cx) * 0.25;
    cy += (y - cy) * 0.25;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener("mouseover", (e) => {
    const t = e.target;
    // over a card the dot steps aside so the card's own hover does the talking
    c.classList.toggle("hide", !!t.closest(".feature-media, .card, .pj-cover, .shot, canvas"));
    c.classList.toggle("hover", !!t.closest("a, button, .chip, .tags span"));
  });
  document.addEventListener("mouseleave", () => c.classList.add("hide"));
  document.addEventListener("mouseenter", () => c.classList.remove("hide"));
})();

function magnetic(root = document) {
  if (!finePointer || reducedMotion) return;
  $$(".magnetic", root).forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
}
magnetic();

/* ---------- Footer year ---------- */
$$(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
