/** Scheduling wiring — Reid Hoffman · Joints & Jitsu · IDEATE */
export const CALENDLY = {
  hostName: "Reid Hoffman",
  slug: "reidhoffman264",
  schedulingUrl: "https://calendly.com/reidhoffman264",
  timezone: "America/New_York",
  email: "ideate@reidhoffman.com",
};

export type CalendlyEvent = {
  id: string;
  name: string;
  slug: string;
  duration: number;
  durationOptions: number[];
  schedulingUrl: string;
  description: string;
  color: string;
  when: string;
};

export const EVENT_TYPES: CalendlyEvent[] = [
  {
    id: "ideate",
    name: "IDEATE w/ Reid Hoffman",
    slug: "ideate-w-reid-hoffman",
    duration: 45,
    durationOptions: [45, 60, 90],
    schedulingUrl: "https://calendly.com/reidhoffman264/ideate-w-reid-hoffman",
    description:
      "Discovery call: unpack your bottleneck, extract vision, map AI flows + SOPs via IDEATE.",
    color: "#17e885",
    when: "Primary discovery",
  },
  {
    id: "joint",
    name: "Build-A-Joint Brief",
    slug: "build-a-joint",
    duration: 30,
    durationOptions: [30, 45, 60],
    schedulingUrl: "https://calendly.com/reidhoffman264/build-a-joint",
    description: "Focused joint-venture / partnership brief — ship the one-pager together.",
    color: "#0099ff",
    when: "Partner brief",
  },
  {
    id: "vision",
    name: "Jitsuent Vision Brief",
    slug: "30min",
    duration: 30,
    durationOptions: [30, 45, 60],
    schedulingUrl: "https://calendly.com/reidhoffman264/30min",
    description: "Fast vision alignment — clarify the game and the next move.",
    color: "#8247f5",
    when: "Vision sprint",
  },
];

export const PREP_TASKS = [
  {
    id: "bottleneck",
    title: "Name the bottleneck",
    blurb: "One sentence: what’s the single thing slowing you down?",
  },
  {
    id: "vision",
    title: "Sketch the 12-month vision",
    blurb: "Where are you if this works? Be specific and slightly ambitious.",
  },
  {
    id: "offplate",
    title: "What should leave your plate?",
    blurb: "List 3 tasks you’d hand to AI / ops so you can focus.",
  },
  {
    id: "time",
    title: "Time you can commit",
    blurb: "Hours per week for the next 30 days — honest beats heroic.",
  },
  {
    id: "materials",
    title: "Bring one artifact",
    blurb: "Deck, SOP, product link, or metric screenshot — anything real.",
  },
];

export const POST_TASKS = [
  {
    id: "notes",
    title: "Capture decisions",
    blurb: "What did we lock? What stays open? Write it while it’s fresh.",
  },
  {
    id: "sop",
    title: "Draft the first SOP",
    blurb: "Turn one workflow from the call into a repeatable checklist.",
  },
  {
    id: "intro",
    title: "Queue the intros",
    blurb: "Who should you meet next in the network? List names + why.",
  },
  {
    id: "experiment",
    title: "7-day experiment",
    blurb: "One small bet with a kill criteria and a learning checkpoint.",
  },
  {
    id: "reschedule",
    title: "Book the follow-up",
    blurb: "Keep momentum — schedule the next checkpoint before you leave.",
  },
];
