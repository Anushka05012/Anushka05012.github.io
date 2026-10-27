/* =========================================================
   PROJECT DATA — used by the home page (index.html) and the
   case-study page (project.html?p=<slug>).

   To add a project, copy one object and edit it. Fields:
   - slug:      short id used in the URL, e.g. "crescendo" → project.html?p=crescendo
   - featured:  true shows it as a large card at the top of the Work section
   - category:  filter name (new names get their own filter button automatically)
   - cover:     main screenshot/photo. Without it, a generated cover using
                `glyph` and `colors` [background, text] is shown.
   - thumb:     optional stock image for the project cards only, for projects
                without screenshots; the case-study page then shows no cover
                at the top and no "screenshots on the way" note
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
       { title, text, layout: "screens" | "thumbs" | "masonry" | "row",
         images: [{ src, caption, frame: "browser" | "phone", wide: true }] }
       an item can be a video instead: { video, poster, caption, frame, wide }
       "screens" = big 2-column grid (good for website screenshots)
       "thumbs" = small equal tiles that enlarge on click (mixed sizes, e.g. charts + documents)
       "masonry" = photo wall, "row" = small items in one line (logos, badges)
   ========================================================= */

const VK = "assets/projects/vishwakarandak/";
const DX = "assets/projects/dyxlexia/";
const CR = "assets/projects/cresendo/web/";
const LG = "assets/projects/legal-ai/";
const PV = "assets/projects/pinevox-billing/";

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
    slug: "business-card-intelligence",
    title: "VLM Business Card Intelligence",
    tagline: "A local vision-language model reads business cards and enriches each contact with stock, jobs and news.",
    category: "AI / ML",
    type: "Academic project",
    team: "Group A9 with Neeraj Barhate, Snehal Bawanthade & Vedant Bijiargi · guided by Dr. Radhika Kulkarni",
    thumb: "assets/projects/business-card/thumb.jpg",
    glyph: "@",
    colors: ["#0d1b3e", "#00c9a7"],
    accent: "#00a88c",
    stat: { value: "99.0%", label: "field accuracy on double-sided cards" },
    summary:
      "Professionals collect stacks of business cards at events, then type them into a CRM by hand, creating typos and duplicates and getting no context about the company. This Flask app runs Qwen3-VL-2B locally to turn a photo of a card into structured contact data, merges it with existing records, and adds live business intelligence about the contact's company.",
    built: [
      "Structured extraction of 7 fields (name, title, email, phone, address, company, website) from single- or double-sided cards with Qwen3-VL-2B-Instruct running locally via HuggingFace Transformers.",
      "A prompt that constrains the model to a flat JSON object, with the output stripped of markdown fences and parsed before saving.",
      "Smart deduplication: a contact matching by email or name + company is merged into the existing record without overwriting valid fields.",
      "Company enrichment with live stock quotes (Finnhub), the top 3 open roles (Adzuna) and the 3 most relevant headlines (NewsAPI).",
      "A batch script that imports folders of front/back image pairs straight into the SQLite database.",
      "A multi-user Flask web app with secure login, per-user card storage, a gallery view and search across saved contacts.",
    ],
    highlights: [
      "97.2% accuracy on 60 single-sided cards and 99.0% on 30 double-sided cards.",
      "Email and phone extraction were 100% reliable; address was the hardest field (11.1% error rate) because of multi-line layouts.",
      "₹0 running cost: inference runs locally and every API stays within its free tier.",
    ],
    stack: ["Python", "Flask", "Qwen3-VL-2B", "HuggingFace Transformers", "SQLAlchemy", "SQLite", "Finnhub", "Adzuna", "NewsAPI"],
    links: [],
    spotlight: {
      eyebrow: "How it works",
      title: "From a photo to a profile",
      text: "Each card goes through one pipeline, whether it's uploaded in the browser or imported in bulk from a folder.",
      steps: [
        { title: "Upload", text: "The user uploads the front (and optionally the back) of a card, or drops image pairs into the batch folder." },
        { title: "VLM inference", text: "A vision transformer encodes the images, and the language model generates a JSON object with the 7 contact fields." },
        { title: "Dedup check", text: "The new contact is compared with saved records by email, then by name + company." },
        { title: "Store or merge", text: "A new card is saved; a duplicate is merged, keeping every non-empty field." },
        { title: "Enrich", text: "The company name triggers Finnhub, Adzuna and NewsAPI lookups, giving talking points before a follow-up." },
      ],
    },
    gallery: [],
  },
  {
    slug: "legal-ai",
    title: "LAW ai: Legal Document Analysis",
    tagline: "A hybrid RAG assistant that reads up to 3 legal PDFs together and answers with Indian law and precedents.",
    category: "AI / ML",
    type: "Academic project",
    team: "Group TYA9 with Vedant Bijjargi, Snehal Bawanthade & Neeraj Barhate · guided by Prof. Vidya Gaikwad",
    cover: LG + "chat.jpg",
    glyph: "§",
    colors: ["#1b2b4b", "#e8ecff"],
    accent: "#5468e0",
    stat: { value: "0.86", label: "groundedness score for RAG answers" },
    summary:
      "Lawyers and students lose hours searching long, unstructured PDFs for the right section or citation, and generic chatbots give answers with no link back to the source. LAW ai analyses up to three documents at once, retrieves the relevant passages across all of them, and answers questions grounded in those pages. It is built for Indian law: it picks out IPC, CrPC, Evidence Act and Constitution references and finds matching judgments on Indian Kanoon.",
    built: [
      "A multi-document RAG pipeline: PDFs are loaded with PyPDF, split, embedded with OpenAI embeddings and indexed in FAISS, with cross-document search across up to 3 files that can be added or removed at any time.",
      "Question answering with GPT-4o-mini over re-ranked context (Cohere), with automatic brief or detailed formatting and the source document always cited.",
      "A legal NLP extractor (spaCy + regex, no LLM cost) that detects IPC/CrPC/Evidence/Constitution sections, AIR/SCC/SCR citations and 95+ offence keywords.",
      "Precedent discovery: extracted terms become optimised Indian Kanoon queries, results are semantically re-ranked and filtered to judgments only (no Acts), then cached per session.",
      "Document analysis panels for clause risk levels and legal compliance, plus one-click actions to summarise, identify risks, check compliance and suggest amendments.",
      "Built-in evaluators for context relevance and groundedness, with analytics stored in SQLite.",
    ],
    highlights: [
      "Context relevance of 0.84 (the usual benchmark is 0.75+) and groundedness of 0.86.",
      "89.3% legal term extraction accuracy without using an LLM for parsing.",
      "97% system reliability across multi-PDF sessions, with ~19 s for a document Q&A answer.",
      "Access to 10M+ Indian judgments through Indian Kanoon.",
    ],
    stack: ["Python", "FastAPI", "LangChain", "OpenAI GPT-4o-mini", "FAISS", "Cohere", "spaCy", "SQLite", "Jinja2"],
    links: [],
    spotlight: {
      eyebrow: "How it works",
      title: "From a question to a grounded answer",
      text: "Every answer is built only from the uploaded documents, and every claim points back to the file it came from.",
      steps: [
        { title: "Upload", text: "Up to three PDFs are split into chunks, embedded and stored in a FAISS index for the session." },
        { title: "Retrieve", text: "A question searches all the documents together, and Cohere re-ranks the best passages." },
        { title: "Answer", text: "GPT-4o-mini writes the answer from that context only, citing the source document and the relevant IPC sections." },
        { title: "Find precedents", text: "Legal terms extracted from the documents become Indian Kanoon queries, returning related Supreme Court and High Court judgments." },
        { title: "Measure", text: "Each answer is scored for context relevance and groundedness, and the results are logged in SQLite." },
      ],
    },
    gallery: [
      {
        title: "Inside the app",
        text: "Alongside the chat, each document gets a structured breakdown of its clauses and the laws they touch.",
        layout: "screens",
        images: [
          { src: LG + "analysis.jpg", caption: "Clause risk levels, legal compliance checks and quick actions", frame: "browser" },
        ],
      },
    ],
  },
  // {
  //   slug: "ai-tokenomics",
  //   title: "AI Tokenomics",
  //   tagline: "AI token usage and cost monitoring with approval workflows.",
  //   category: "Enterprise",
  //   type: "Siemens",
  //   when: "Jun – Jul 2026",
  //   role: "DevOps Intern",
  //   team: "Siemens Digital Industries Software",
  //   glyph: "¤",
  //   colors: ["#141414", "#e9e6df"],
  //   accent: "#009999",
  //   summary:
  //     "An internal application for monitoring AI token usage and cost across teams, with approval workflows and analytics, built for Siemens' Jasper portal.",
  //   built: [
  //     "AI token usage monitoring and cost analysis.",
  //     "Approval workflows for AI usage requests.",
  //     "Analytics dashboards.",
  //   ],
  //   highlights: ["Reusable PHP modules and efficient database queries for performance."],
  //   stack: ["PHP", "JavaScript", "MySQL", "Dashboards"],
  //   links: [],
  //   gallery: [],
  // },
  {
    slug: "pinevox-billing",
    title: "PineVox Billing Frontend",
    tagline: "A Next.js billing frontend serving 22,000+ invoices.",
    category: "Web",
    type: "Internship",
    when: "Jul 2025 – May 2026",
    role: "Software Development Intern",
    team: "PineVox",
    cover: PV + "dashboard.jpg",
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
    gallery: [
      {
        title: "Inside the app",
        text: "Dashboards for revenue and call volume, and the invoices customers receive each month.",
        layout: "thumbs",
        images: [
          { src: PV + "revenue-chart.jpg", caption: "Call volume against monthly revenue across the year" },
          { src: PV + "network-map.jpg", caption: "Map view of network routes between locations" },
          { src: PV + "invoice.jpg", caption: "A generated monthly invoice (customer and bank details blurred)" },
        ],
      },
    ],
  },
  {
    slug: "virtual-os",
    title: "Virtual Operating System",
    tagline: "A multiprogramming OS simulator written in C.",
    category: "Systems",
    type: "Academic project",
    thumb: "assets/projects/virtual-os/thumb.jpg",
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
];

/* Cover art shared by both pages: the screenshot (or stock thumb) if there
   is one, otherwise a generated card with the project's glyph. */
function projectCover(p, label = true) {
  const src = p.cover || p.thumb;
  if (src) return `<img src="${src}" alt="${p.title}" loading="lazy" />`;
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
