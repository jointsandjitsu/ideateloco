/** IDEATE platform content — brand, ecosystem, protocols (Joints & Jitsu · Reid Hoffman) */

export const BRAND = {
  name: "IDEATE",
  tagline: "with Reid Hoffman",
  slogan: "get miles ahead",
  email: "ideate@reidhoffman.com",
  company: "Joints & Jitsu",
  location: "Norristown · Global network",
  blurb:
    "IDEATE is the operating system for ambitious operators — protocols, methods, white-label products, and MILES, your interactive super assistant. Built by Reid Hoffman of Joints & Jitsu.",
  principles:
    "Diagonal rhythm. Cream as breath. Green as voice. Navy as punctuation. Type set on the ribbon, never beside it.",
  nameNote:
    "We share a name — and a similar vision for agency and networks — with another public Reid Hoffman. IDEATE and Joints & Jitsu are independent. Nothing on this platform is his book, company, or brand.",
};

/** Internal only — never render as a public surface directory */
export const DOMAINS = [
  { host: "ideate.reidhoffman.com", role: "Primary brand domain", status: "live" as const },
  { host: "ID8RH.com", role: "Short forward", status: "live" as const },
  { host: "ideater.grok.me", role: "Grok surface", status: "live" as const },
  { host: "ideater.base44.app", role: "Partner surface", status: "live" as const },
  { host: "ideate@reidhoffman.com", role: "Primary inbox", status: "live" as const },
];

export type Surface = {
  id: string;
  name: string;
  host: string;
  status: "live" | "staging" | "planned";
  description: string;
  href: string;
};

export const SURFACES: Surface[] = [];

export type Product = {
  id: string;
  name: string;
  eyebrow: string;
  summary: string;
  href: string;
  points: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "miles",
    name: "MILES",
    eyebrow: "Interactive Super Assistant",
    summary:
      "Conversational robot that qualifies projects, routes talent, and narrates culture — get miles ahead.",
    href: "/talk",
    points: ["Project intake", "Talent paths", "Culture stories", "Realtime 3D presence"],
  },
  {
    id: "studio",
    name: "IDEATE Studio",
    eyebrow: "Product & brand systems",
    summary:
      "Strategy-to-ship studio for network-native products — brand, product, and digital as one system.",
    href: "/studio",
    points: ["Brand systems", "Product design", "Web & platforms", "Launch playbooks"],
  },
  {
    id: "protocols",
    name: "Protocol Library",
    eyebrow: "How we decide",
    summary: "Repeatable decision protocols for diligence, partners, culture, and scale.",
    href: "/protocols",
    points: ["Decision trees", "Partner filters", "Trust rituals", "Review cadences"],
  },
  {
    id: "methods",
    name: "Methods",
    eyebrow: "Playbooks",
    summary: "Week-ready playbooks for ideation, diligence, partners, and launch.",
    href: "/methods",
    points: ["Workshops", "Checklists", "Templates", "Facilitation"],
  },
  {
    id: "white-label",
    name: "White Label",
    eyebrow: "Under your brand",
    summary:
      "Ship IDEATE-powered experiences under your brand — assistants and protocol packs.",
    href: "/white-label",
    points: ["Brand theming", "Custom assistants", "Hosted delivery", "Protocol packs"],
  },
  {
    id: "schedule",
    name: "Schedule",
    eyebrow: "Book & prep",
    summary: "Book discovery time and use the workspace before and after the call.",
    href: "/schedule",
    points: ["Live booking", "Prep checklist", "Follow-through", "Session types"],
  },
];

export type Protocol = {
  id: string;
  code: string;
  name: string;
  summary: string;
  steps: string[];
};

export const PROTOCOLS: Protocol[] = [
  {
    id: "id8",
    code: "ID8-01",
    name: "Identify → Design → Experiment → Align → Test → Establish",
    summary: "The core IDEATE loop for turning a fuzzy ambition into a durable operating system.",
    steps: [
      "Identify the bottleneck and the infinite game",
      "Design the smallest high-leverage experiment",
      "Experiment in public with kill criteria",
      "Align network and capital to the learning",
      "Test with operators, not spectators",
      "Establish the SOP and handoff",
    ],
  },
  {
    id: "trust",
    code: "TR-02",
    name: "Compound Trust",
    summary: "How Joints & Jitsu and IDEATE partners earn the next conversation.",
    steps: ["Receipts over claims", "Small promises kept loud", "Introduce with context", "Close the loop"],
  },
  {
    id: "partner",
    code: "PT-03",
    name: "Partner Filter",
    summary: "Decide who gets access to the room, the brand, and the calendar.",
    steps: ["Shared infinite game?", "Operator or tourist?", "Can they ship in 30 days?", "Reputation risk check"],
  },
  {
    id: "ai-sop",
    code: "AI-04",
    name: "AI + SOP Wire-up",
    summary: "Map one workflow from human bottleneck to assisted SOP.",
    steps: ["Capture the real path", "Mark judgment vs. drudge", "Automate the drudge", "Human holds the kill switch"],
  },
];

export type Method = {
  id: string;
  name: string;
  summary: string;
  duration: string;
  outcomes: string[];
};

export const METHODS: Method[] = [
  {
    id: "bottleneck",
    name: "Bottleneck Brief",
    summary: "One-page map of the thing that slows you down and the agent that could own it.",
    duration: "45m",
    outcomes: ["One-pager", "Owner named", "Kill criteria"],
  },
  {
    id: "vision",
    name: "12-Month Vision Sketch",
    summary: "Concrete, slightly ambitious picture of the network if this works.",
    duration: "60m",
    outcomes: ["Vision sketch", "Milestones", "Risks"],
  },
  {
    id: "sop-sprint",
    name: "SOP Sprint",
    summary: "Turn one call outcome into a checklist a junior (or AI) can run.",
    duration: "90m",
    outcomes: ["SOP draft", "Handoff notes", "QA steps"],
  },
  {
    id: "partner-diligence",
    name: "Partner Diligence",
    summary: "Lightweight filter for co-marketing, white-label, or joint builds.",
    duration: "2h",
    outcomes: ["Scorecard", "Go/no-go", "Intro plan"],
  },
  {
    id: "culture-story",
    name: "Culture Story",
    summary: "Narrate how Joints & Jitsu / IDEATE behaves under pressure — for talent and partners.",
    duration: "60m",
    outcomes: ["Story arc", "Examples", "Hiring cues"],
  },
];

export const WORK = [
  {
    title: "Operator OS for a multi-location brand",
    tag: "Studio",
    result: "Protocols + MILES intake cut discovery from weeks to one session.",
  },
  {
    title: "White-label assistant for a partner network",
    tag: "White Label",
    result: "Partner OS instance live with brand-themed protocols.",
  },
  {
    title: "Joints & Jitsu joint brief system",
    tag: "Jitsu",
    result: "Build-A-Joint sessions productized with prep + follow-through workspace.",
  },
  {
    title: "AI SOP wire-up for founders",
    tag: "Methods",
    result: "First workflow off the founder’s plate in under 14 days.",
  },
];

export const PALETTE = [
  { name: "Cream", hex: "#F5F2E6" },
  { name: "Forest", hex: "#2D5B3A" },
  { name: "Deep Moss", hex: "#204029" },
  { name: "Midnight", hex: "#182A46" },
  { name: "Ink", hex: "#1C242C" },
];

export const NAV = [
  { label: "Talk", href: "/talk" },
  { label: "Schedule", href: "/schedule" },
  { label: "Studio", href: "/studio" },
  { label: "Protocols", href: "/protocols" },
  { label: "Methods", href: "/methods" },
  { label: "White Label", href: "/white-label" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];
