/**
 * ============================================================================
 *  VinceVision Technologies — single source of truth for ALL site content.
 *  Edit copy, contact details, services and metrics here only.
 *  Everything marked `isPlaceholder: true` MUST be replaced before launch.
 * ============================================================================
 */

export const site = {
  name: "VinceVision Technologies",
  shortName: "VinceVision",
  legalName: "VinceVision Technologies",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vincevisiontech.github.io",
  description:
    "VinceVision is a cross-continent technology company based in Kenya and the United Kingdom, delivering AI, cloud, cybersecurity, and custom software solutions.",
  foundingYear: 2021,
  email: "vincevisiontech@proton.me",
  whatsapp: {
    // Single canonical number — used everywhere on the site and in the chat fallback.
    display: "+254 742 850266",
    e164: "254742850266",
    get waLink() {
      return `https://wa.me/${this.e164}`;
    },
  },
  socials: [
    // TODO(placeholder): replace # with real profile URLs or remove entries.
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "X", href: "#", icon: "x" },
    { label: "GitHub", href: "#", icon: "github" },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const locations = [
  {
    city: "Nairobi",
    country: "Kenya",
    timeZone: "Africa/Nairobi",
    // TODO(placeholder): replace with the registered business address.
    address: "Nairobi, Kenya",
    addressPlaceholder: true,
  },
  {
    city: "London",
    country: "United Kingdom",
    timeZone: "Europe/London",
    // TODO(placeholder): replace with the registered business address.
    address: "London, United Kingdom",
    addressPlaceholder: true,
  },
] as const;

/* ------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Enterprise-grade technology · Nairobi & London",
  headline: ["Building the next decade of", "intelligent infrastructure."],
  highlightedPhrase: "intelligent infrastructure",
  subhead:
    "VinceVision is a cross-continent technology company led by CEO Mr. Vincent Omondi, delivering end-to-end solutions in AI, cloud, cybersecurity, and digital platforms for organisations operating in Africa, Europe, and beyond.",
  primaryCta: { label: "Book a call", href: "#contact" },
  secondaryCta: { label: "Explore services", href: "#services" },
} as const;

/**
 * Headline metrics. Every value below is a PLACEHOLDER — replace with verified
 * figures before launch. Remove `isPlaceholder` once the number is real.
 */
export const metrics = [
  { label: "Projects delivered", value: 24, suffix: "+", isPlaceholder: true },
  { label: "Countries served", value: 3, suffix: "", isPlaceholder: true },
  { label: "Operating regions", value: 2, suffix: "", isPlaceholder: false },
  { label: "Years in practice", value: 5, suffix: "", isPlaceholder: true },
] as const;

export const trustStrip = [
  "AI & automation",
  "Cloud & DevOps",
  "Cybersecurity",
  "Software engineering",
  "Digital commerce",
  "Technology advisory",
] as const;

/* ------------------------------------------------------------------------- */
/*  Services — six cards, bento grid                                          */
/* ------------------------------------------------------------------------- */

export type Service = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  points: string[];
  /** Tailwind grid hint used by the bento layout */
  wide?: boolean;
};

export const services: Service[] = [
  {
    id: "ai-automation-data",
    title: "AI, Automation & Data",
    tag: "AI Core",
    summary:
      "Design, deploy, and scale applied AI that is directly tied to your business metrics.",
    points: [
      "AI strategy & opportunity mapping",
      "Custom LLM assistants & chatbots for products and teams",
      "Predictive analytics & forecasting",
      "Computer vision for surveillance, retail & operations",
      "Process automation (RPA) and workflow orchestration",
      "Data engineering, warehousing & real-time dashboards",
    ],
  },
  {
    id: "cloud-devops-infrastructure",
    title: "Cloud, DevOps & Infrastructure",
    tag: "Cloud",
    summary:
      "Cloud-native foundations aligned with your governance, compliance, and uptime requirements.",
    points: [
      "Cloud strategy & total cost optimisation",
      "Multi-cloud and hybrid architectures (AWS, Azure, GCP)",
      "CI/CD pipelines, infrastructure as code & observability",
      "Migration of legacy systems to modern stacks",
      "24/7 monitoring, incident response & SRE support",
    ],
  },
  {
    id: "cybersecurity-compliance",
    title: "Cybersecurity & Compliance",
    tag: "Security",
    summary:
      "Security embedded from design through to daily operations, across borders.",
    points: [
      "Security architecture & zero-trust implementations",
      "Vulnerability assessments & penetration testing",
      "Identity, access management & endpoint protection",
      "Security operations centre (SOC) setup & monitoring",
      "Regulatory alignment for African & UK markets",
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    tag: "Product",
    summary:
      "Full-cycle product development for web, mobile, and internal tools.",
    points: [
      "Custom web & mobile application development",
      "API design, integration & microservices",
      "Enterprise platforms (ERP, CRM, HR, workflows)",
      "UX/UI design & rapid prototyping",
      "Quality engineering, automated testing & releases",
    ],
    wide: true,
  },
  {
    id: "digital-experience-commerce",
    title: "Digital Experience & Commerce",
    tag: "Digital",
    summary:
      "Customer-facing platforms for growth, loyalty, and new revenue streams.",
    points: [
      "Corporate websites & brand platforms",
      "E-commerce & marketplace infrastructure",
      "Customer portals & self-service experiences",
      "Content management & digital asset pipelines",
      "Analytics, experimentation & personalisation",
    ],
  },
  {
    id: "technology-advisory-training",
    title: "Technology Advisory & Training",
    tag: "Advisory",
    summary:
      "Board-level guidance and hands-on capability building for your teams.",
    points: [
      "CTO-as-a-Service for scaling companies",
      "Architecture reviews & technical due diligence",
      "AI literacy & data culture programmes",
      "Secure engineering & DevSecOps training",
      "Technology roadmapping for 12–36 months",
    ],
  },
];

/* ------------------------------------------------------------------------- */
/*  Process — 4-step timeline                                                 */
/* ------------------------------------------------------------------------- */

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    summary:
      "You send a short email or WhatsApp note describing context, timeline, and budget. We respond with clarifying questions and a focused options pack, usually within 1–2 business days.",
  },
  {
    step: "02",
    title: "Architect",
    summary:
      "We align on scope, milestones, and security/compliance boundaries, then produce clear architecture before any code is written — so what gets built is what gets agreed.",
  },
  {
    step: "03",
    title: "Build",
    summary:
      "Senior engineers deliver in visible increments, with working software in the first 2–4 weeks. Direct communication throughout — no account-manager relay.",
  },
  {
    step: "04",
    title: "Operate",
    summary:
      "We hand over with documentation and training, or stay on for monitoring, incident response, and continuous improvement across both African and UK time zones.",
  },
] as const;

/* ------------------------------------------------------------------------- */
/*  Case studies / work                                                       */
/* ------------------------------------------------------------------------- */

export const caseStudies = [
  {
    id: "sharon-thriftwear",
    client: "Sharon Thriftwear",
    founder: "Sharon Nyambura, Founder",
    title: "A digital storefront built around how customers discover and trust the brand",
    summary:
      "VinceVision designed and shipped the brand's digital experience — not just a website, but a structured way for customers to explore products and build trust online, delivered fast without sacrificing quality.",
    services: ["Digital Experience", "E-commerce", "Brand Platform"],
    link: "https://sharonthriftwear.github.io/",
    linkLabel: "sharonthriftwear.github.io",
    placeholder: false,
  },
  {
    id: "case-placeholder-1",
    client: "Confidential fintech",
    founder: "",
    title: "Fraud detection & onboarding automation",
    summary:
      "Placeholder case study — replace with a real engagement summary, outcomes, and metrics once cleared for publication.",
    services: ["AI", "Fintech", "Automation"],
    link: "",
    linkLabel: "",
    placeholder: true,
  },
  {
    id: "case-placeholder-2",
    client: "Public-sector programme",
    founder: "",
    title: "Citizen services portal & data platform",
    summary:
      "Placeholder case study — replace with a real engagement summary, outcomes, and metrics once cleared for publication.",
    services: ["Cloud", "Public Sector", "Data"],
    link: "",
    linkLabel: "",
    placeholder: true,
  },
] as const;

/* ------------------------------------------------------------------------- */
/*  Industries — tabbed                                                       */
/* ------------------------------------------------------------------------- */

export const industries = [
  {
    id: "fintech",
    name: "Financial Services & Fintech",
    summary: "Secure, compliant platforms for payments, lending, and digital banking.",
    points: [
      "Transaction monitoring & fraud detection",
      "Core system integrations & APIs",
      "Customer onboarding & KYC automation",
    ],
  },
  {
    id: "public-sector",
    name: "Public Sector & Development",
    summary: "Digital public infrastructure built for reliability and inclusion.",
    points: [
      "Citizen services & portals",
      "Data platforms for policy & programmes",
      "Identity, access & auditability",
    ],
  },
  {
    id: "commerce",
    name: "Commerce, Retail & Creators",
    summary: "End-to-end support for brands and entrepreneurs going digital.",
    points: [
      "Brand and e-commerce platforms",
      "Inventory, logistics & fulfilment systems",
      "Customer data, loyalty & analytics",
    ],
  },
] as const;

/* ------------------------------------------------------------------------- */
/*  Tech stack marquee — text wordmarks (no image assets to load)             */
/* ------------------------------------------------------------------------- */

export const techStack = [
  "AWS",
  "Azure",
  "Google Cloud",
  "Kubernetes",
  "Docker",
  "Terraform",
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "TensorFlow",
  "PyTorch",
  "Kafka",
  "Grafana",
] as const;

/* ------------------------------------------------------------------------- */
/*  About + CEO                                                               */
/* ------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About VinceVision",
  heading: "A technology company engineered for cross-continent execution.",
  paragraphs: [
    "VinceVision is headquartered across Kenya and the United Kingdom, giving clients access to both deep regional understanding and global-standard engineering. Led by CEO Mr. Vincent Omondi, the team combines experience in product development, infrastructure, and AI to move organisations from slide-ware to shipped systems.",
    "Instead of generic, volume-driven engagements, VinceVision works with a limited number of clients at any given time. This allows hands-on involvement from senior architects, direct communication via email or WhatsApp, and a clear focus on measurable outcomes.",
  ],
  pillars: [
    {
      title: "Presence",
      value: "Kenya & United Kingdom",
      note: "Designed for organisations operating across time zones and markets.",
    },
    {
      title: "Engagement",
      value: "Email & WhatsApp",
      note: "Direct access, no public forms or ticket queues.",
    },
    {
      title: "Approach",
      value: "Architecture first",
      note: "Every solution begins with clear architecture, security, and reliability.",
    },
  ],
  ceo: {
    name: "Mr. Vincent Omondi",
    role: "Founder & CEO · Principal Technology Architect",
    initials: "VO",
    // CEO portrait. Currently hotlinked from LinkedIn's CDN per request.
    // For maximum reliability, download the file and self-host it, e.g.
    // portrait: "/ceo-portrait.jpg" (then no remote host dependency remains).
    portrait:
      "https://media.licdn.com/dms/image/v2/D4D03AQHHmfgCXp7OsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1636396692080?e=2147483647&v=beta&t=1XGE4UH7oU78czs3dQHFHn26hAxjuffcfYuguLy0H0I",
    portraitPlaceholder: false,
    quote:
      "Technology only matters when it serves people, context, and outcomes. VinceVision exists to translate complex capabilities — like AI, cloud, and cybersecurity — into systems your teams can trust and your customers can feel. We care about what ships, what scales, and what stays secure.",
    postscript:
      "If you are leading a team in Kenya, the wider African region, or the UK and need a partner who can bridge both worlds, VinceVision is designed for you.",
  },
} as const;

/* ------------------------------------------------------------------------- */
/*  Testimonials — only verified quotes. The carousel pairs the testimonial   */
/*  with the real engagement-process content rather than fabricated reviews.  */
/* ------------------------------------------------------------------------- */

export const testimonials = [
  {
    id: "sharon-nyambura",
    quote:
      "Working with VinceVision transformed how my brand shows up digitally. They didn't just build a website; they helped me think through how my customers actually discover, explore, and trust my products online. The process was structured, transparent, and incredibly fast — without sacrificing quality.",
    name: "Sharon Nyambura",
    role: "Founder, Sharon Thriftwear",
    initials: "SN",
    link: "https://sharonthriftwear.github.io/",
    linkLabel: "sharonthriftwear.github.io",
  },
  // TODO(placeholder): replace with verified, permission-granted testimonials.
  {
    id: "testimonial-placeholder-1",
    quote:
      "Placeholder testimonial — replace with a verified client quote, name, and role once publication permission is granted.",
    name: "Client name",
    role: "Role, Organisation",
    initials: "??",
    link: "",
    linkLabel: "",
    placeholder: true,
  },
  {
    id: "testimonial-placeholder-2",
    quote:
      "Placeholder testimonial — replace with a verified client quote, name, and role once publication permission is granted.",
    name: "Client name",
    role: "Role, Organisation",
    initials: "??",
    link: "",
    linkLabel: "",
    placeholder: true,
  },
] as const;

export const engagementSteps = [
  "You send a short email or WhatsApp note describing your context, timeline, and budget expectations.",
  "VinceVision responds with clarifying questions and a focused options pack (usually within 1–2 business days).",
  "You agree on scope, milestones, and security/compliance boundaries.",
  "Delivery starts with visible progress in the first 2–4 weeks.",
] as const;

/* ------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* ------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "Where is VinceVision based?",
    a: "VinceVision operates across Kenya and the United Kingdom, supporting organisations in Africa, the UK, and Europe — especially teams working across multiple time zones and markets.",
  },
  {
    q: "What services do you offer?",
    a: "Six end-to-end practices: AI, automation & data; cloud, DevOps & infrastructure; cybersecurity & compliance; software engineering; digital experience & commerce; and technology advisory & training — from strategy through to daily operations.",
  },
  {
    q: "How do engagements typically start?",
    a: "Send a short email or WhatsApp note with your context, region, challenge, and timelines. We respond with clarifying questions and a focused options pack, then align on scope, milestones, and security boundaries before delivery begins — with visible progress in the first 2–4 weeks.",
  },
  {
    q: "How can I contact VinceVision?",
    a: "Enquiries are handled directly via email at vincevisiontech@proton.me or WhatsApp at +254 742 850266. We deliberately avoid public forms so sensitive details stay protected and you reach decision-makers directly.",
  },
  {
    q: "Which industries do you work with?",
    a: "Financial services and fintech, public sector and development, and commerce, retail, and creator-led brands — from early-stage scaleups to established enterprises.",
  },
  {
    q: "Can you handle regulated and security-sensitive work?",
    a: "Yes. Security is embedded from design through operations: zero-trust architecture, penetration testing, identity and access management, SOC setup, and regulatory alignment for both African and UK markets.",
  },
] as const;

/* ------------------------------------------------------------------------- */
/*  Chat assistant                                                            */
/* ------------------------------------------------------------------------- */

export const chatConfig = {
  title: "VinceVision Assistant",
  subtitle: "Answers about VinceVision's services, regions, and contact options.",
  placeholder: "Ask about services, regions, contact…",
  // Shown when the API route is unavailable (static hosting) or not configured.
  fallbackMessage:
    "I can't reach the AI service right now. For a direct answer, email vincevisiontech@proton.me or WhatsApp +254 742 850266 — the team typically replies within 1–2 business days.",
  welcomeMessage:
    "Hi, I'm the VinceVision assistant. Ask me about our services, where we operate, or how to get in touch.",
  offTopicMessage:
    "I can only answer questions about VinceVision Technologies — our services, industries, process, regions, and contact details. Is there something along those lines I can help with?",
} as const;

/* ------------------------------------------------------------------------- */
/*  Boot sequence (first visit, once per session)                             */
/* ------------------------------------------------------------------------- */

export const bootLines = [
  "Initializing VinceVision Core…",
  "Nairobi node online",
  "London node online",
  "Linking AI cores…",
  "Security layer armed",
  "Calibrating holographic interface…",
] as const;

/* ------------------------------------------------------------------------- */
/*  Launch event — TODO(placeholder): set the real UTC launch date.           */
/* ------------------------------------------------------------------------- */

export const launch = {
  // ISO 8601 UTC. Replace before announcing; drives /launch countdown + ignition.
  dateUtc: "2026-12-01T09:00:00Z",
  title: "VinceVision Core goes live",
  teaser: "Sentient infrastructure for two continents. One ignition moment.",
  notifyEmailSubject: "Notify me — VinceVision launch",
  notifyEmailBody:
    "Hello VinceVision team,\n\nPlease notify me when VinceVision Core goes live.\n\nName:\nOrganisation:\n",
  notifyWhatsapp:
    "Hello VinceVision, please notify me when the new platform launches.",
} as const;

/* ------------------------------------------------------------------------- */
/*  Launch kit — share assets, storyboard, announcement copy, checklist       */
/* ------------------------------------------------------------------------- */

export const launchKit = {
  shareImages: [
    {
      file: "/launch/og-launch.svg",
      label: "Primary OG / Twitter card (1200×630)",
      note: "Replace with an exported PNG/JPG for maximum crawler compatibility.",
    },
    {
      file: "/launch/og-launch-alt.svg",
      label: "Alternate share card — globe motif (1200×630)",
      note: "Use for follow-up posts and reminder campaigns.",
    },
  ],
  storyboard: [
    { t: "0.0–2.0s", shot: "Black screen. Boot terminal types: 'Initializing VinceVision Core…'", text: "Nairobi node online · London node online" },
    { t: "2.0–4.5s", shot: "Holographic globe fades in, cyan grid floor extends to horizon", text: "Two continents. One intelligent infrastructure." },
    { t: "4.5–7.0s", shot: "Glowing arc ignites between Nairobi and London, data pulses travel the curve", text: "AI · Cloud · Cybersecurity · Software" },
    { t: "7.0–10.0s", shot: "Quick module cuts: AI console, circuit process path, holo service cards", text: "From slide-ware to shipped systems." },
    { t: "10.0–12.5s", shot: "CEO portrait glitch-reveal with name and title", text: "Led by Mr. Vincent Omondi, Founder & CEO" },
    { t: "12.5–15.0s", shot: "Shockwave ignition into the wordmark, URL and channels resolve", text: "vincevisiontech.github.io — Book a call" },
  ],
  announcements: {
    linkedin: [
      "Today VinceVision Technologies goes live. A cross-continent technology company built between Nairobi and London — AI, cloud, cybersecurity, and software engineering for organisations that need systems that actually ship. Explore the new site and book a call. #TechAfrica #AI #Cloud",
      "From Nairobi to London, we're linking two technology markets with one operating standard. VinceVision Technologies is now live: applied AI, secure cloud, and full-cycle software delivery. Discover how we work — link in the comments.",
      "Technology only matters when it serves people, context, and outcomes. That belief is now a company. VinceVision Technologies has launched — read the mission, explore the modules, and open a secure channel with our team.",
    ],
    x: [
      "VinceVision Technologies is live. Nairobi × London. AI, cloud, cybersecurity, software — engineered to ship. https://vincevisiontech.github.io",
      "Two nodes online. One infrastructure layer for Africa and the UK. VinceVision Core ignites today: https://vincevisiontech.github.io #Launch #AI",
      "No slide-ware. Shipped systems. VinceVision Technologies launches — explore the new flagship site and book a call.",
    ],
    whatsapp: [
      "VinceVision Technologies just launched 🌍 Nairobi × London — AI, cloud, cybersecurity and software engineering for ambitious organisations. Take a look: https://vincevisiontech.github.io",
      "Hi team — sharing the new VinceVision site: AI, cloud and cyber solutions built across Kenya and the UK. Feedback welcome, and enquiries are open via email or WhatsApp. https://vincevisiontech.github.io",
      "It's live. VinceVision Technologies — cross-continent technology delivery from Nairobi and London. Explore modules, process and case work here: https://vincevisiontech.github.io",
    ],
  },
  checklist: [
    "Set the real launch date in content/site.ts (launch.dateUtc) and redeploy",
    "Export OG SVG cards to 1200×630 PNGs and update metadata references",
    "Record/produce the 15s teaser from the storyboard and add captions",
    "Replace placeholder metrics, case studies, CEO photo and social links",
    "Set ANTHROPIC_API_KEY if deploying to Vercel for the live Vince Core console",
    "Schedule LinkedIn/X/WhatsApp announcements (3 variants each above)",
    "Verify email (Proton) and WhatsApp (+254 742 850266) channels are monitored on launch day",
    "Run Lighthouse pass on the production URL; confirm sitemap/robots/JSON-LD validate",
    "Confirm GitHub Pages source is set to GitHub Actions deployment",
    "Legal review of /privacy and /terms before public promotion",
  ],
} as const;

/* ------------------------------------------------------------------------- */
/*  Experience settings                                                       */
/* ------------------------------------------------------------------------- */

export const experience = {
  storageKeys: {
    lite: "vv-lite-mode",
    boot: "vv-boot-seen",
    sound: "vv-sound-on",
  },
  // Sound is OFF by default; the nav toggle enables WebAudio UI sounds.
  soundDefaultOn: false,
  hackerThemeClass: "vv-hacker",
} as const;
