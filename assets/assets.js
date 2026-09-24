import user_image from "./user-image.jpg";
import work_2 from "./work-2.png";
import work_1 from "./work-1.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import profile_img from "./profile-img.png";
import hand_icon from "./hand-icon.png";
import moon_icon from "./moon_icon.png";
import sun_icon from "./sun_icon.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";

export const assets = {
  user_image,
  logo,
  logo_dark,
  profile_img,
  hand_icon,
  moon_icon,
  sun_icon,
  menu_black,
  menu_white,
  close_black,
  close_white,
  work_1,
  work_2,
};

export const links = {
  email: "altamashkhan9315@gmail.com",
  phone: "+91 9315117694",
  github: "https://github.com/Altamashkhan9315",
  linkedin: "https://www.linkedin.com/in/md-altamash-khan/",
  leetcode: "https://leetcode.com/u/altamashkhan9315/",
  resume: "/resume", // latest upload from /upload-resume; falls back to /myresume.pdf
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// first commit at Mulltiply; drives the "N months" copy
export const careerStart = "2025-11-20";
// shown until /api/github-stats returns live numbers
export const fallbackStats = {
  commits: 1400,
  sharePct: 80,
  linesAdded: 130000,
  activeWeeks: 37,
  totalWeeks: 45,
  leetcode: 100,
};

export const experience = [
  {
    company: "Mulltiply Tech India Pvt. Ltd.",
    role: "AI Engineer",
    period: "Nov 2025 – Present",
    location: "Noida, UP",
    summary:
      "Top contributor to a multi-bot Python/FastAPI platform that runs WhatsApp commerce for FMCG distributors and D2C brands. Own the intent classifier, product parser, cart engine, B2C bot and the evaluation harness.",
    bullets: [
      "Architected the LangGraph WhatsApp ordering agent: a 7-node StateGraph with 4 conditional routers over a hierarchical structured-output taxonomy of 18 entities × 51 operations × 63 sub-operations, dispatched to 90+ handlers. Primary author of the 2,300-line classifier and 4,000-line cart and product executors.",
      "Built a catalog-constrained Product Parser that maps free-text Hinglish and photographed order slips onto each seller's live catalog. Beat OpenAI's ~990-value enum cap (one dimension had 2,611 designs) with first-fit-decreasing enum sharding: up to 24 parallel LLM batches merged into one parse.",
      "Built the LLM evaluation and regression harness: catalog-grounded multi-turn scenario generation over a code-derived taxonomy of 120 intents, deterministic cart/intent/quantity checks before an LLM-as-Judge, and severity-ranked issue reports in PDF and Postgres.",
      "Replaced scattered mock flags across ~70 backend clients with one HTTPX transport interception layer, isolated per scenario with ContextVars so parallel test runs never leak state.",
      "Made concurrent chats safe with per-session turn serialisation on Redis (SET NX locks with Lua compare-and-extend, heartbeats, dead-holder takeover) plus an LLM queue-join that folds rapid follow-ups into a single reply.",
      "Shipped a 12-node B2C shopping bot with multi-store search and cart, complaint and human-support flows, and a gpt-5.2 tool-calling agent with 6 tools capped at 4 rounds. Per-store RAG on Pinecone answers in the buyer's own language and script (Hindi, Hinglish, English).",
      "Cut latency and LLM spend: Redis translation cache with fail-open, translate-once chunking (3 round trips → 1), asyncio.gather fan-out, cached DB prompts, cost tracking across 9 modules and routing across 7 OpenAI model families.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "OpenAI", "PostgreSQL", "Redis", "Elasticsearch", "Pinecone", "WhatsApp API"],
  },
  {
    company: "SecOrigin Technologies",
    role: "Software Developer Intern",
    period: "Oct 2024 – Mar 2025",
    location: "Remote",
    summary: "Backend work on MERN applications for cybersecurity products.",
    bullets: [
      "Developed and optimised 15+ REST APIs with Node.js and Express.js, improving response time by 30% and implementing JWT-based authentication.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "JWT"],
  },
];

export const projects = [
  {
    title: "WhatsApp Ordering Agent",
    tagline: "Production LLM agent for B2B FMCG ordering",
    featured: true,
    description:
      "LangGraph agent that takes Hindi/Hinglish orders as text or order-slip photos and turns them into cart actions. Multi-intent planner runs several actions per message in dependency order; a per-seller catalog-constrained parser keeps every SKU grounded in the live catalog.",
    highlights: [
      "7-node StateGraph, 4 routers, 90+ handlers",
      "Enum sharding: 24 parallel LLM batches per parse",
      "Redis Lua locks for per-session turn serialisation",
    ],
    stack: ["LangGraph", "OpenAI", "FastAPI", "Redis", "Elasticsearch"],
    accent: "violet",
  },
  {
    title: "LLM Evaluation Harness",
    tagline: "Mystery shopper that keeps the bots honest",
    featured: true,
    description:
      "Generates catalog-grounded multi-turn test conversations over a 120-intent taxonomy, replays them against the real bot through an HTTPX interception layer, checks cart/intent/quantity deterministically, then hands the rest to an LLM-as-Judge. Issues land severity-ranked in PDF and Postgres.",
    highlights: [
      "120 intents, 3 difficulty tiers",
      "Per-scenario isolation with ContextVars",
      "Deterministic checks before the judge",
    ],
    stack: ["Python", "HTTPX", "OpenAI", "PostgreSQL", "ReportLab"],
    accent: "emerald",
  },
  {
    title: "CLIP Image-Match Service",
    tagline: "Match buyer photos to catalogue SKUs",
    description:
      "Standalone FastAPI microservice: ViT-B-32 512-dim embeddings in Elasticsearch kNN, multi-store filtering, per-SKU dedup and confidence tiers by score and margin. Postgres-backed re-sync re-indexes without re-running inference.",
    highlights: ["Elasticsearch dense_vector kNN", "Weights cached from Cloudflare R2"],
    stack: ["Python", "open_clip", "Elasticsearch", "PostgreSQL", "R2"],
    accent: "sky",
  },
  {
    title: "Delhi Police Citizen-Help Bot",
    tagline: "RAG over policy documents on WhatsApp",
    description:
      "Answers citizens' legal and procedural questions (FIR steps, reporting a crime, emergencies) from policy documents with source-linked answers, plus dedicated handling for officer-refusal scenarios.",
    highlights: ["Pinecone + text-embedding-3-large", "Source-cited answers"],
    stack: ["Python", "FastAPI", "Pinecone", "OpenAI", "WhatsApp API"],
    accent: "amber",
  },
  {
    title: "Gifting Website",
    tagline: "Full-stack e-commerce for personalised gifts",
    description:
      "MERN storefront with category filters, search, cart, secure checkout and an admin dashboard for real-time inventory and order tracking.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    image: work_1,
    live: "https://gifting-site-frontend.onrender.com/",
    github: "https://github.com/Altamashkhan9315/Gifting-site",
    accent: "rose",
  },
  {
    title: "Wanderlust",
    tagline: "Discover, list and review unique places",
    description:
      "Full-stack travel platform with authentication and full CRUD for listings and reviews, deployed on Render.",
    stack: ["JavaScript", "Node.js", "Express", "MongoDB"],
    image: work_2,
    live: "https://wanderlust-0mm6.onrender.com/listings",
    github: "https://github.com/Altamashkhan9315/wanderlust",
    accent: "teal",
  },
];

export const skillGroups = [
  {
    title: "Generative AI",
    skills: ["OpenAI API", "LangGraph", "LangChain", "Multi-Agent Systems", "Tool Calling", "Structured Outputs", "RAG", "Embeddings", "Prompt Engineering", "Intent Classification", "CLIP"],
  },
  {
    title: "LLM Evaluation",
    skills: ["LLM-as-Judge", "Synthetic Scenario Generation", "Deterministic Validation", "Regression Testing", "HTTPX Interception", "Backend Mocking"],
  },
  {
    title: "Backend & APIs",
    skills: ["Python", "FastAPI", "asyncio", "Pydantic v2", "Node.js", "Express.js", "REST APIs", "WhatsApp Business API", "Webhooks"],
  },
  {
    title: "Data, Search & Infra",
    skills: ["PostgreSQL", "asyncpg", "Redis", "Pinecone", "Elasticsearch (kNN)", "MongoDB", "MySQL", "Docker", "Kubernetes", "Cloudflare R2", "Git"],
  },
];

export const infoList = [
  { title: "Role", description: "AI Engineer at Mulltiply, building LLM agents for WhatsApp commerce since Nov 2025." },
  { title: "Education", description: "B.Tech in Computer Science, Jamia Hamdard (2023–2026), CGPA 8.6." },
  { title: "Focus", description: "LangGraph orchestration, structured outputs, RAG, and evaluation that keeps agents honest." },
];
