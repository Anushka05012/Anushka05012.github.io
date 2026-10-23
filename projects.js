/* =========================================================
   PROJECT DATA — used by the home page (index.html) and the
   case-study page (project.html?p=<slug>).

   To add a project, copy one object and edit it. Fields:
   - slug:      short id used in the URL, e.g. "crescendo" → project.html?p=crescendo
   - featured:  true shows it as a large card at the top of the Work section
   - category:  filter name (new names get their own filter button automatically)
   - cover:     main screenshot/photo. Without it, a generated cover using
                `glyph` and `colors` [background, text] is shown.
   - video:     optional .mp4 played at the top of the case-study page instead
                of the cover; `poster` is the still shown while it loads
   - accent:    colour used for highlights on this project's page
   - stat:      optional headline number { value, label }
   - live:      URL of the live site (adds a "Visit live site" button and a green dot)
   - links:     extra buttons, e.g. [{ label: "Code", url: "https://github.com/..." }]
   - built / highlights: bullet lists on the case-study page
   - spotlight: optional section showing off one feature:
       { eyebrow, title, text, image: { src, caption }, steps: [{ title, text }] }
   - gallery:   list of image groups shown on the case-study page:
       { title, text, layout: "screens" | "masonry" | "row",
         images: [{ src, caption, frame: "browser" | "phone", wide: true }] }
       an item can be a video instead: { video, poster, caption, frame, wide }
       "screens" = big 2-column grid (good for website screenshots)
       "masonry" = photo wall, "row" = small items in one line (logos, badges)
   ========================================================= */

const VK = "assets/projects/vishwakarandak/";
const DX = "assets/projects/dyxlexia/";
const CR = "assets/projects/cresendo/web/";

const projects = [
  {
    slug: "crescendo",
    featured: true,
    title: "Crescendo '26",
    tagline: "An Indian Odyssey–themed fest website, plus the operations platform that ran the event.",
    category: "Web",
    type: "Full-stack platform",
    when: "2026 · fest held 6–9 April",
    team: "Website team with Aryan Sonawane, Soham Deogaonkar & Shubham Chauhan · VIT Pune",
    cover: CR + "frame-1.jpg",
    video: CR + "tour.mp4",
    poster: CR + "frame-1.jpg",
    glyph: "C",
    colors: ["#b3263e", "#ffd27a"],
    accent: "#c0392b",
    stat: { value: "2,067", label: "visitors in the first 12 hours" },
    summary:
      "Crescendo '26 is VIT's inter-college technical, cultural and sports festival. We built both the public festival website and the internal system that ran the event. Registration, tickets, live venue entry and organiser workflows all live in one platform, so the team could run the fest with fewer manual handoffs and make faster decisions on the ground.",
    built: [
      "An Indian Odyssey–themed festival site with an intro loader and a built-in music player.",
      "Event discovery by category (Technical, Cultural & EC, Sports) with fees and prizes, plus competitions, timeline, partners, rulebooks, team and an FAQ help desk.",
      "Participant onboarding with email OTP (Nodemailer) or Google sign-in.",
      "Profiles with ticket visibility, event status and a QR-based gate pass.",
      "Super Admin dashboard: event lifecycle controls (status, format, venue, on-spot entry) and role and assignment management for coordinators and venue teams.",
      "Coordinator dashboard: live participant queues, round-based solo and versus formats, scores, remarks, starred rounds, on-spot registration straight into the queue, and exports.",
      "Venue team dashboard: camera-based QR validation with instant entry logging and a live entry list.",
      "A Neon Postgres + Prisma 7 data layer with Zod validation, CSV import, audit and integrity scripts, and a DNS-aware fetch path for networks where Neon's DNS was unreliable.",
    ],
    highlights: [
      "2,067 visitors and 7,716 page views in the first 12 hours, tracked with Vercel Analytics and runtime observability.",
      "Replaced scattered sheets and manual gate coordination with one role-based system.",
      "Faster venue entry with QR gate validation, and quicker events with live queueing, scoring and round control.",
      "Better accountability through entry logs, validation checks and audit scripts.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Neon Postgres", "Prisma 7", "Zod", "Vercel"],
    live: "https://crescendo26.vercel.app/",
    links: [],
    spotlight: {
      eyebrow: "Feature spotlight",
      title: "From sign-up to the gate",
      text: "Every participant carries an identity pass on their phone. One scan at the venue verifies them, logs the entry and keeps the crowd moving.",
      image: { src: CR + "ticket.jpg", caption: "Participant ticket (contact details and QR blurred)" },
      steps: [
        { title: "Sign up", text: "Participants register with an email OTP or Google sign-in." },
        { title: "Get the identity pass", text: "Their profile shows the ticket, each event's status and a personal QR gate pass." },
        { title: "Scan at the gate", text: "The venue team scans the pass with a phone camera, and validation checks run instantly." },
        { title: "Entry logged", text: "Each entry lands in a live list for crowd control and an audit trail." },
        { title: "On to the event", text: "Coordinators run live queues, rounds and scores, and on-spot registrations join the queue in real time." },
      ],
    },
    gallery: [
      {
        title: "The festival site",
        text: "Truck art, camels, tabla and marigolds, all built around the Indian Odyssey theme.",
        layout: "screens",
        images: [
          { video: CR + "intro.mp4", poster: CR + "intro-poster.jpg", caption: "Intro loader and the built-in music player", frame: "browser", wide: true },
          { src: CR + "frame-11.jpg", caption: "What is Crescendo?", frame: "browser" },
          { src: CR + "frame-23.jpg", caption: "Technical events with fees and prizes", frame: "browser" },
          { src: CR + "frame-28.jpg", caption: "Sports events", frame: "browser" },
          { src: CR + "timeline.jpg", caption: "Fest timeline with event details", frame: "browser" },
          { video: CR + "faq.mp4", poster: CR + "faq-poster.jpg", caption: "Help desk FAQ", frame: "browser", wide: true },
        ],
      },
      {
        title: "Running the event",
        text: "Behind the public site sit three role-based dashboards: Super Admin for event and access control, Coordinator for live queues and scoring, and Venue Team for gate entry.",
        layout: "screens",
        images: [
          { src: CR + "venue-dashboard.jpg", caption: "Venue team dashboard: gate-pass scanning and the live guest list (personal details blurred)", frame: "browser" },
        ],
      },
    ],
  },
  {
    slug: "vishwakarandak",
    title: "Vishwakarandak '25",
    tagline: "A Harry Potter–themed website for VIT Pune's inter-department fest.",
    category: "Web",
    type: "Student Council",
    when: "2025",
    role: "Website Secretary & co-developer",
    team: "Built with Aryan Sonawane · Student Council, VIT Pune",
    cover: VK + "screens/home.jpg",
    video: VK + "vk-web.mp4",
    poster: VK + "vk-poster.jpg",
    glyph: "VK",
    colors: ["#0b0d14", "#d6a74a"],
    accent: "#c9962f",
    stat: { value: "7", label: "houses on one live leaderboard" },
    summary:
      "The official website for Vishwakarandak '25, VIT Pune's fest of technical wizardry, sporting duels and cultural events. Participants compete in seven Hogwarts-style houses, so the site had to feel like the Wizarding World while still being a practical hub for schedules, results and sponsors.",
    built: [
      "An immersive, themed home page with an animated title, ambient audio and an event gallery.",
      "A section for the seven competing houses: Black, Dumbledore, Lestrange, Longbottom, Malfoy, Potter and Weasley.",
      "Events, timeline and schedule pages, with the full fest schedule embedded.",
      "A scoreboard & results page for the house leaderboard.",
      "A QR ticketing system: every registered student gets a Platform 9¾ ticket with a unique QR code and an attendance code (house + PRN).",
      "An attendance flow for organisers, with a built-in camera scanner, instant check-ins and protection against marking a student twice.",
      "A student dashboard listing registered events with Pending / Attended status.",
      "Secure sign-in with NextAuth.js, JWT sessions, bcrypt-hashed passwords and auth checks on every API route.",
      "A Prisma data model linking students and events through registrations, with a unique constraint so nobody is registered for the same event twice.",
    ],
    highlights: [
      "Co-developed with Aryan Sonawane and credited on the live site.",
      "Led the Student Council web team of 15+ student developers as Website Secretary.",
      "One scan of a ticket shows every event a student is registered for.",
      "Live at studentcouncilvitpune.in.",
    ],
    stack: ["Next.js 15", "TypeScript", "NextAuth.js", "Prisma", "SQLite", "Tailwind CSS", "QR codes"],
    live: "https://www.studentcouncilvitpune.in/",
    links: [],
    spotlight: {
      eyebrow: "Feature spotlight",
      title: "Your ticket to Platform 9¾",
      text: "Every registered student gets a personal ticket in the site's Hogwarts Express style. One QR code carries all of their registered events, so organisers can check anyone in with a single scan.",
      image: { src: VK + "ticket.jpg", caption: "A student's ticket, with their registered event and its status" },
      steps: [
        { title: "Sign in", text: "The student signs in and lands on a dashboard with every event they've registered for." },
        { title: "Get the ticket", text: "The dashboard generates a unique QR ticket and an attendance code: house code + PRN." },
        { title: "Scan at the barrier", text: "Organisers scan it with the site's built-in camera scanner or any QR app, which opens the student's attendance page." },
        { title: "Mark attendance", text: "Ticking an event checks the student in instantly, and it shows as completed." },
        { title: "No double entry", text: "Scan the same ticket again and attended events are already ticked and locked; the dashboard shows an Attended badge." },
      ],
    },
    gallery: [],
  },
  {
    slug: "dyslexia-learning",
    featured: true,
    title: "AI-powered Dyslexia Learning Platform",
    tagline: "Dyxlexia at Ease: tracing and speech practice with instant feedback for children with dyslexia.",
    category: "AI / ML",
    type: "Academic project",
    when: "2025 · Semester 2, 2024–25",
    glyph: "Aa",
    colors: ["#e5786a", "#fff4ee"],
    accent: "#e0705f",
    cover: DX + "home.jpg",
    stat: { value: "85%+", label: "handwriting recognition accuracy" },
    summary:
      "The WHO estimates that 70–210 million people worldwide could have severe dyslexia, which makes reading, writing and spelling hard work. Most learning tools don't recognise handwriting or correct spelling, so children get no feedback. Dyxlexia at Ease is a playful web app where children trace letters and numbers, a CNN checks their handwriting in real time, and speech recognition helps with spelling and pronunciation.",
    built: [
      "A CNN trained on EMNIST handwritten letters and digits (resized, normalised, greyscale), served to the web app through Flask.",
      "Letter, number and spelling practice, with a drawing canvas for tracing.",
      "Confusable-letter drills (b/d, p/q) that check two letters side by side and point out swaps.",
      "Encouraging feedback by score: under 30% \"Try again\", 30–70% \"Good, keep practising\", over 70% \"Great, well done\".",
      "Spelling assistance: speech is captured, transcribed with the Vosk model and matched to the target word using Levenshtein distance.",
      "Multiple child profiles (\"Who's learning today?\") and a dashboard tracking letter and digit progress.",
    ],
    highlights: [
      "85%+ handwriting recognition accuracy.",
      "Written up as a paper, \"A Learning Platform for Dyslexic Children using Tracing and Speech Recognition\", for the 2025 Asian Conference on Intelligent Technologies (ACOIT), IEEE Bangalore Section.",
      "Speech side built on the LibriSpeech dataset and the offline Vosk recogniser.",
    ],
    stack: ["Python", "TensorFlow", "CNN", "Flask", "OpenCV", "Vosk", "JavaScript"],
    links: [],
    spotlight: {
      eyebrow: "How it works",
      title: "Trace, check, cheer",
      text: "Every exercise gives the child an immediate, friendly response, so practice feels like a game instead of a test.",
      image: { src: DX + "letter-practice.jpg", caption: "Letter practice: a traced \"C\" recognised with 99.79% similarity" },
      steps: [
        { title: "Pick a profile", text: "Each child has their own profile, so progress is tracked separately." },
        { title: "Trace on the canvas", text: "The target letter or number is shown large next to a drawing canvas." },
        { title: "The CNN reads it", text: "The drawing is preprocessed and passed to the model, which returns the recognised character and a similarity score." },
        { title: "Friendly feedback", text: "The score decides the message, from \"Try again\" to \"Great, well done\", with the mistake named when the wrong letter is drawn." },
        { title: "Progress unlocks", text: "Mastered letters and digits turn green on the dashboard, and the progress bars fill up." },
      ],
    },
    gallery: [
      {
        title: "Inside the app",
        text: "Soft colours, big shapes and doodles keep the screens calm and inviting for young learners.",
        layout: "screens",
        images: [
          { src: DX + "confusables.jpg", caption: "Confusable letters: \"Expected P but got Q. Try again!\"", frame: "browser" },
          { src: DX + "dashboard.jpg", caption: "Child dashboard with letter and digit progress", frame: "browser" },
        ],
      },
    ],
  },
  {
    slug: "ctb-analyzer",
    featured: true,
    title: "CTB Analyzer",
    tagline: "Defect analysis with AI-assisted root cause analysis, built at Siemens.",
    category: "Enterprise",
    type: "Siemens",
    when: "Jun – Jul 2026",
    role: "DevOps Intern",
    team: "Siemens Digital Industries Software",
    glyph: "RCA",
    colors: ["#009999", "#e6f7f7"],
    accent: "#009999",
    summary:
      "An enterprise application for CTB defect analysis with AI-assisted Root Cause Analysis and reporting dashboards, built for Siemens' Automation & AI Apps Portal (Jasper).",
    built: [
      "Defect analysis workflows for CTB data.",
      "AI-assisted Root Cause Analysis (RCA).",
      "Reporting dashboards for engineering teams.",
    ],
    highlights: ["SSO authentication.", "Optimised database queries and reusable PHP modules."],
    stack: ["PHP", "JavaScript", "MySQL", "AI", "SSO"],
    links: [],
    gallery: [],
  },
  {
    slug: "learn-and-help",
    title: "Learn and Help — Digital Platform",
    tagline: "The digital infrastructure behind a non-profit in education.",
    category: "Web",
    type: "Non-profit",
    role: "Director of Technology",
    glyph: "L&H",
    colors: ["#ff8a3d", "#fff4ee"],
    accent: "#ff6a1f",
    summary:
      "As Director of Technology, I'm building the digital infrastructure that helps Learn and Help scale its educational and charitable impact.",
    built: [
      "Website development for the organisation.",
      "Automation for tracking student progress.",
      "Opportunity and resource databases for students.",
      "Technology for digital outreach.",
    ],
    highlights: [],
    stack: ["Web Development", "Automation", "Databases"],
    live: "",
    links: [],
    gallery: [],
  },
  {
    slug: "ai-tokenomics",
    title: "AI Tokenomics",
    tagline: "AI token usage and cost monitoring with approval workflows.",
    category: "Enterprise",
    type: "Siemens",
    when: "Jun – Jul 2026",
    role: "DevOps Intern",
    team: "Siemens Digital Industries Software",
    glyph: "¤",
    colors: ["#141414", "#e9e6df"],
    accent: "#009999",
    summary:
      "An internal application for monitoring AI token usage and cost across teams, with approval workflows and analytics, built for Siemens' Jasper portal.",
    built: [
      "AI token usage monitoring and cost analysis.",
      "Approval workflows for AI usage requests.",
      "Analytics dashboards.",
    ],
    highlights: ["Reusable PHP modules and efficient database queries for performance."],
    stack: ["PHP", "JavaScript", "MySQL", "Dashboards"],
    links: [],
    gallery: [],
  },
  {
    slug: "pinevox-billing",
    title: "PineVox Billing Frontend",
    tagline: "A Next.js billing frontend serving 22,000+ invoices.",
    category: "Web",
    type: "Internship",
    when: "Jul 2025 – May 2026",
    role: "Software Development Intern",
    team: "PineVox",
    glyph: "₹",
    colors: ["#2f4bff", "#eef0ff"],
    accent: "#2f4bff",
    stat: { value: "22,000+", label: "invoices for 500+ customers" },
    summary:
      "A responsive Next.js frontend for PineVox's internal billing application, giving teams instant access to customer invoices.",
    built: [
      "Responsive Next.js UI for internal teams.",
      "REST API integration serving 22,000+ invoices for 500+ customers.",
      "Secure SSH-based data transfer and improved workflow automation.",
    ],
    highlights: [],
    stack: ["Next.js", "React", "REST APIs", "SSH"],
    links: [],
    gallery: [],
  },
  {
    slug: "virtual-os",
    title: "Virtual Operating System",
    tagline: "A multiprogramming OS simulator written in C.",
    category: "Systems",
    type: "Academic project",
    glyph: "OS",
    colors: ["#1e7a55", "#e8f5ee"],
    accent: "#1e7a55",
    stat: { value: "3", label: "interrupt types: system, program, timer" },
    summary:
      "A multiprogramming operating system simulator in C that models how a real OS loads, schedules and protects jobs.",
    built: [
      "Paging and virtual memory management.",
      "Process scheduling and PCB management.",
      "Interrupt handling and simulated system calls.",
      "Error handling (opcode, operand, page fault) and I/O operations.",
    ],
    highlights: [],
    stack: ["C", "Operating Systems", "Paging", "Scheduling"],
    links: [],
    gallery: [],
  },
  {
    slug: "vertical-agriculture",
    title: "Sustainable Vertical Agriculture",
    tagline: "Research paper published by Taylor & Francis.",
    category: "Research",
    type: "Publication",
    glyph: "✿",
    colors: ["#c99a2e", "#fff8e6"],
    accent: "#b4861f",
    summary: "A research paper on enabling sustainable vertical agriculture, published by Taylor & Francis.",
    built: [],
    highlights: ["Co-authored and published with Taylor & Francis."],
    stack: ["Research", "Sustainability", "Agri-tech"],
    links: [],
    gallery: [],
  },
];

/* Cover art shared by both pages: the screenshot if there is one,
   otherwise a generated card with the project's glyph. */
function projectCover(p, label = true) {
  if (p.cover) return `<img src="${p.cover}" alt="${p.title}" loading="lazy" />`;
  const [bg, fg] = p.colors || ["#222", "#fff"];
  return `<div class="art" style="--art-bg:${bg};--art-fg:${fg}">
      <span class="art-glyph">${p.glyph || p.title[0]}</span>
      ${label ? `<span class="art-label">${p.category}</span>` : ""}
    </div>`;
}

/* A screenshot wrapped in a little browser window. */
function browserFrame(inner, url = "") {
  const host = url ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "";
  return `<div class="browser">
      <div class="browser-bar"><i></i><i></i><i></i>${host ? `<span>${host}</span>` : ""}</div>
      <div class="browser-view">${inner}</div>
    </div>`;
}
