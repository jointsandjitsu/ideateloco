/** IDEATE platform content — brand, ecosystem, protocols (Joints & Jitsu · Reid Hoffman) */

export const BRAND = {
  name: "IDEATE",
  tagline: "with Reid Hoffman",
  slogan: "get miles ahead",
  mission: "ARTICULATING VISIONS · DELIVERING CONFIDENCE",
  email: "ideate@reidhoffman.com",
  company: "Joints & Jitsu",
  founderTitle: "Founder and Chief Rolling Officer of Joints & Jitsu",
  location: "Norristown · Global network",
  blurb:
    "IDEATE is the operating system for ambitious operators — protocols, methods, white-label products, and MILES, your interactive super assistant. Built by Reid Hoffman, Founder and Chief Rolling Officer of Joints & Jitsu.",
  principles:
    "Diagonal rhythm. Cream as breath. Green as voice. Navy as punctuation. Type set on the ribbon, never beside it.",
  howWeAttack:
    "Kind of Blue — open field, free thoughts, no forced solo. Blue Haze — heat when it needs to land: focused, one clean line. Cool blue in green, space between the notes, confidence when it lands.",
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
    id: "joint",
    name: "Build-A-Joint",
    eyebrow: "Apparel & brand identity",
    summary:
      "Apparel customization and brand identity from Joints & Jitsu — design, brief, video, edit, scale. Reid leads end-to-end.",
    href: "/schedule",
    points: ["Design", "Brief", "Video", "Edit", "Scale"],
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
      "Establish the habit that compounds",
    ],
  },
  {
    id: "p02",
    code: "P-02",
    name: "Network Diligence",
    summary: "How we filter partners by trust density, not vanity metrics.",
    steps: ["Map the graph", "Stress the edges", "Score for compound trust", "Decide and document"],
  },
  {
    id: "p03",
    code: "P-03",
    name: "Blue Haze Focus",
    summary: "When free thought must land as one clean line.",
    steps: ["Hold Kind of Blue space", "Name the single note", "Cut the rest", "Ship the line"],
  },
  {
    id: "p04",
    code: "P-04",
    name: "White-Label Launch",
    summary: "Stand up a partner surface without leaking the OS.",
    steps: ["Theme", "Scope assistant", "Host", "Handoff playbook"],
  },
  {
    id: "p05",
    code: "MX-05",
    name: "Groove → Idea",
    summary: "Capture ideas from music — beats, melodies, rests, haze.",
    steps: ["Listen", "Stamp the trigger", "Name the idea", "Route to IDEATE"],
  },
  {
    id: "p06",
    code: "P-06",
    name: "Post-Call Follow-Through",
    summary: "Nothing dies in the calendar after the handshake.",
    steps: ["Lock the brief", "Assign owners", "Set checkpoint", "Ship next 7 days"],
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
    id: "sprint",
    name: "IDEATE Sprint",
    summary: "Five-day loop from bottleneck to shipped experiment.",
    duration: "5 days",
    outcomes: ["Live experiment", "Kill criteria", "Next bet"],
  },
  {
    id: "intake",
    name: "MILES Intake",
    summary: "Conversational qualification that becomes a brief.",
    duration: "20 min",
    outcomes: ["Qualified lead", "Brief draft", "Path chosen"],
  },
  {
    id: "diligence",
    name: "Partner Diligence",
    summary: "Trust-first diligence without killing momentum.",
    duration: "1 week",
    outcomes: ["Trust score", "Risk list", "Go / no-go"],
  },
  {
    id: "white-label",
    name: "White-Label Sequence",
    summary: "From brand kit to live assistant under their domain.",
    duration: "2–4 weeks",
    outcomes: ["Themed surface", "Assistant live", "Handoff kit"],
  },
  {
    id: "vinyl",
    name: "Vinyl Ideation",
    summary: "Stamp ideas while the needle moves — Kind of Blue energy.",
    duration: "1 side",
    outcomes: ["Idea stamps", "Mood board", "Session note"],
  },
  {
    id: "joint",
    name: "Build-A-Joint",
    summary: "Apparel + identity system: design, brief, video, edit, scale.",
    duration: "Session",
    outcomes: ["Design brief", "Identity kit", "Scale plan"],
  },
];

export const WORK = [
  {
    title: "Founder leverage OS",
    tag: "Platform",
    result: "Operators leave with protocols, a live surface, and a calendar path.",
  },
  {
    title: "Build-A-Joint brand system",
    tag: "Apparel & identity",
    result: "End-to-end design through scale, led by Reid as CRO of Joints & Jitsu.",
  },
  {
    title: "White-label assistant pack",
    tag: "Partner",
    result: "Partner ships under their brand with IDEATE protocols underneath.",
  },
  {
    title: "Network culture arc",
    tag: "Culture",
    result: "Kind of Blue / Blue Haze storytelling that recruits the right people.",
  },
];

export const PALETTE = [
  { name: "Off-white", hex: "#F5F2E6" },
  { name: "Forest", hex: "#2D5B3A" },
  { name: "Deep moss", hex: "#204029" },
  { name: "Midnight", hex: "#182A46" },
  { name: "Ink", hex: "#1C242C" },
];

export const NAV = [
  { label: "Talk", href: "/talk" },
  { label: "Studio", href: "/studio" },
  { label: "Protocols", href: "/protocols" },
  { label: "Methods", href: "/methods" },
  { label: "White label", href: "/white-label" },
  { label: "Schedule", href: "/schedule" },
  { label: "Network", href: "/network" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];
