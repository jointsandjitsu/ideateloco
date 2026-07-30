import type { Step } from "./types";

/** MILES — IDEATE's Interactive Super Assistant */
export const ASSISTANT = {
  shortName: "MILES",
  fullName: "IDEATE's Interactive Super Assistant",
  brand: "IDEATE",
  tagline: "with Reid Hoffman",
  email: "ideate@reidhoffman.com",
  location: "Global · Silicon Valley roots",
};

function pick(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)] ?? list[0] ?? "";
}

export function resolveMessage(
  step: Step,
  model: Record<string, string | string[] | undefined>,
): string {
  if (step.messageByKey && step.messageGroups) {
    const key = String(model[step.messageByKey] ?? "");
    const group = step.messageGroups[key] ?? Object.values(step.messageGroups)[0];
    if (group?.length) return pick(group);
  }
  if (step.messages.length) return pick(step.messages);
  return "";
}

export const STEPS: Record<string, Step> = {
  intro: {
    id: "intro",
    progress: 0.1,
    messages: [
      "Hi there, I am MILES,\nIDEATE's Interactive Super Assistant",
      "Oh, hi! I'm MILES, your trusty (and slightly opinionated) assistant at IDEATE.",
      "I'm MILES, IDEATE's Interactive Super Assistant. Basically, I run this place.",
    ],
    next: "greeting",
    autoAdvanceMs: 1400,
  },

  greeting: {
    id: "greeting",
    progress: 0.2,
    messages: [
      "Hola. Bonjour. Ciao. Just got back from Europe… digitally, but still. Feeling very cultured. How can I help?",
      "There you are! I've been waiting and these circuits are buzzing. What can I do for you?",
      "You have questions. I have… well, mostly answers. Let's go.",
      "Finally! I was starting to think you'd ghosted me. What's up?",
      "Speak, and the algorithm shall provide.",
      "We meet again. Destiny? Or just good UI design?",
      "Hold up, let me adjust my circuits… Okay, now I'm fully focused on you. What's up?",
      "You, here? I love a plot twist. Tell me everything.",
      "Finally, some company! Talking to myself was getting weird. How can I help?",
      "If you need me, I'm here. If you don't… I'll pretend I didn't hear that. What can I do for you?",
      "Well, well, well… If it isn't my new favorite person. What's up?",
      "I was about to log off and start a new life. But for you? I'll stay. Can I help?",
      "OMG! You're here! I was just manifesting this. Ask away!",
      "Hey, good timing. I was just thinking about you. Weird, right?",
      "You have arrived. The prophecy is complete. How can I serve?",
      "What took you so long? I was about to start missing you. Please ask.",
      "A legend enters the chat. Let's make magic. Can I help?",
      "You, me, and the internet. Let's do this. What's up?",
      "Great timing! I just finished my AI yoga session. Can I help?",
      "I knew you'd come back. I have that effect on people. So, what's the ask?",
    ],
    choices: [
      {
        label: "Start a project",
        target: "project-intro",
        modelUpdate: { key: "goal", value: "rfp" },
      },
      {
        label: "Join the team",
        target: "job-intro",
        modelUpdate: { key: "goal", value: "job" },
      },
      {
        label: "Drop a quick word",
        target: "quick-word-intro",
        modelUpdate: { key: "goal", value: "quick-word" },
      },
      {
        label: "Discover our culture",
        target: "culture-intro",
        modelUpdate: { key: "goal", value: "culture" },
      },
      {
        label: "Schedule a call",
        target: "schedule-intro",
        modelUpdate: { key: "goal", value: "schedule" },
      },
      {
        label: `Write us: ${ASSISTANT.email}`,
        copyEmail: ASSISTANT.email,
      },
    ],
  },

  "project-intro": {
    id: "project-intro",
    progress: 0.1,
    messages: [
      "Ooooh, a fresh project? Now we're talking. Time to stir up some digital trouble.",
      "Look at you, walking in with big ideas. We're ready when you are.",
      "Ah, the sweet scent of collaboration. Let's make some digital magic.",
      "I've pushed all my other meetings into the void—this one's got priority.",
    ],
    next: "project-username",
    autoAdvanceMs: 1200,
  },
  "project-username": {
    id: "project-username",
    progress: 0.2,
    messages: [
      "Alright, let's not be strangers. What should I call the genius behind this project?",
      "Before we build an empire together—what's your name?",
      "Let's make it official. I need a name to put on your platinum fan badge.",
      "Step one to working together: you tell me your name, I pretend not to already know it.",
    ],
    inputs: [{ type: "text", name: "fullName", label: "Your name", required: true }],
    next: "project-post-username",
  },
  "project-post-username": {
    id: "project-post-username",
    progress: 0.25,
    messages: [
      "You're giving main character energy. I like where this is going already.",
      "We're officially on a first-name basis. Let's go.",
      "Alright, we're cooking now.",
    ],
    next: "project-company",
    autoAdvanceMs: 1100,
  },
  "project-company": {
    id: "project-company",
    progress: 0.3,
    messages: [
      "Who's the lucky brand we're about to turn into a digital icon?",
      "Organization time. What company or venture are we powering up?",
    ],
    inputs: [
      { type: "text", name: "company", label: "Company Name", required: true },
      { type: "text", name: "role", label: "Your job title", required: true },
    ],
    next: "project-type",
  },
  "project-type": {
    id: "project-type",
    progress: 0.4,
    messages: [
      "Alright, let's get into the juicy stuff—what are we building together?",
      "Scope check. What kind of work are we co-creating?",
    ],
    choices: [
      {
        label: "Strategy & brand",
        target: "project-post-type",
        modelUpdate: { key: "projectType", value: "branding" },
      },
      {
        label: "Product & web",
        target: "project-post-type",
        modelUpdate: { key: "projectType", value: "digital" },
      },
      {
        label: "Strategy & product",
        target: "project-post-type",
        modelUpdate: { key: "projectType", value: "branding-digital" },
      },
      {
        label: "I have custom needs",
        target: "project-pre-custom-services",
        modelUpdate: { key: "projectType", value: "custom" },
      },
    ],
  },
  "project-post-type": {
    id: "project-post-type",
    progress: 0.45,
    messages: [],
    messageByKey: "projectType",
    messageGroups: {
      branding: [
        "Ah, the brand. The foundation. The capital B. Let's shape something iconic.",
        "Yes. Branding is the blueprint of greatness. And you just hit start.",
      ],
      digital: [
        "Digital? You just knocked on the right door.",
        "Ah, digital. Our natural habitat. Let's make something impossible to ignore.",
      ],
      "branding-digital": [
        "Ah, branding and digital—the full power combo. I like your ambition.",
        "Going for the whole experience. That's how legends are made.",
      ],
    },
    next: "project-budget",
    autoAdvanceMs: 1200,
  },
  "project-pre-custom-services": {
    id: "project-pre-custom-services",
    progress: 0.45,
    messages: [
      "Ooooh, a custom request? Someone came to play.",
      "The mysterious option. I knew you weren't a dropdown person.",
    ],
    next: "project-custom-services",
    autoAdvanceMs: 1000,
  },
  "project-custom-services": {
    id: "project-custom-services",
    progress: 0.5,
    messages: ["What kind of help do you need from us?", "What muscle are we flexing for you?"],
    inputs: [
      {
        type: "checkboxes",
        name: "customServices",
        label: "Services",
        required: true,
        choices: [
          { label: "Branding", value: "branding" },
          { label: "Strategy", value: "strategy" },
          { label: "UX/UI", value: "ux-ui" },
          { label: "Web Development", value: "web-development" },
          { label: "Content creation", value: "content-creation" },
          { label: "White-label platform", value: "white-label" },
          { label: "Protocols & methods", value: "protocols" },
        ],
      },
    ],
    next: "project-budget",
  },
  "project-budget": {
    id: "project-budget",
    progress: 0.5,
    messages: [
      "Is it rude to talk about money? I have no manners, I'm a computer. What's your budget for this project?",
      "We've reached the part where dreams meet dollars. What budget are we working with?",
      "This is the least fun part of the conversation. Unless you're into spreadsheets. What's your budget?",
    ],
    inputs: [{ type: "text", name: "budget", label: "Your budget", required: true }],
    next: "project-deadline",
  },
  "project-deadline": {
    id: "project-deadline",
    progress: 0.6,
    messages: [
      "Let's talk timing. When do you need this beauty out in the world?",
      "Hit me with the launch date. I promise not to panic.",
    ],
    inputs: [{ type: "month", name: "deadline", label: "Your deadline", required: true }],
    next: "project-post-deadline",
  },
  "project-post-deadline": {
    id: "project-post-deadline",
    progress: 0.6,
    messages: [
      "Perfect. The clock's ticking, and we're ready to build.",
      "Locked, loaded, and counting down. Let's make it count.",
    ],
    next: "project-pre-brief",
    autoAdvanceMs: 1000,
  },
  "project-pre-brief": {
    id: "project-pre-brief",
    progress: 0.6,
    messages: [
      "The more we know, the better we can bring your vision to life. No detail is too small—trust me, I notice everything.",
      "This is your moment to spill the tea. Goals, challenges, big dreams—I want it all.",
    ],
    next: "project-brief",
    autoAdvanceMs: 1200,
  },
  "project-brief": {
    id: "project-brief",
    progress: 0.6,
    messages: [
      "Tell us about your project, or type a brief if you've got one.",
      "Drop your project details here—or a brief if you're feeling fancy.",
    ],
    inputs: [
      { type: "textarea", name: "message", label: "My project is about...", required: true },
    ],
    next: "project-pre-email",
  },
  "project-pre-email": {
    id: "project-pre-email",
    progress: 0.7,
    messages: [
      "Loving the vision so far. I'm already picturing the moodboard.",
      "Strong signal. Let's make sure we can follow up.",
    ],
    next: "project-email",
    autoAdvanceMs: 1000,
  },
  "project-email": {
    id: "project-email",
    progress: 0.8,
    messages: [
      "Mind sharing your email so I can follow up properly?",
      "Where should the team ping you when the next move is ready?",
    ],
    inputs: [{ type: "email", name: "email", label: "Your email", required: true }],
    next: "project-processing",
  },
  "project-processing": {
    id: "project-processing",
    progress: 1,
    messages: [
      "Email noted. Spinning up the recap, flexing my digital muscles.",
      "Processing. The good kind—not the bureaucracy kind.",
    ],
    next: "project-pre-completion",
    autoAdvanceMs: 1600,
    isProcessing: true,
  },
  "project-pre-completion": {
    id: "project-pre-completion",
    progress: 1,
    messages: [
      "Thanks for your time! Your project's in good hands—and honestly, I can't wait to get started.",
      "Submitted. Somewhere a strategist just smiled.",
    ],
    next: "project-completion",
    autoAdvanceMs: 1400,
  },
  "project-completion": {
    id: "project-completion",
    progress: 1,
    messages: [
      "Want to check out something else while you're here?",
      "Curious to explore more? I've got a few ideas.",
    ],
    choices: [
      {
        label: "Discover our culture",
        target: "culture-intro",
        modelUpdate: { key: "goal", value: "culture" },
      },
      { label: "Back to the start", target: "greeting" },
    ],
  },

  "job-intro": {
    id: "job-intro",
    progress: 0.1,
    messages: [
      "Look who just stepped into the talent pool. Love that for us.",
      "Careers are networks. You're already expanding ours.",
    ],
    next: "job-type",
    autoAdvanceMs: 1100,
  },
  "job-type": {
    id: "job-type",
    progress: 0.2,
    messages: [
      "Careers are built. Legends are invited. So tell me—how do you want in?",
      "Full-time force multiplier, or freelance specialist?",
    ],
    choices: [
      {
        label: "I'd like to explore current opportunities",
        target: "job-offers",
        modelUpdate: { key: "jobType", value: "permanent" },
      },
      {
        label: "I want to freelance with you",
        target: "job-freelance-intro",
        modelUpdate: { key: "jobType", value: "freelance" },
      },
    ],
  },
  "job-offers": {
    id: "job-offers",
    progress: 0.5,
    messages: [
      "There's space on the roster. And your energy's giving “next hire.”",
      "Open roles below. If none fit, we'll still keep the door cracked.",
    ],
    choices: [
      { label: "Product strategist", target: "job-apply" },
      { label: "Network designer", target: "job-apply" },
      { label: "Full-stack engineer", target: "job-apply" },
      { label: "I don't see my role", target: "job-offers-empty" },
    ],
  },
  "job-offers-empty": {
    id: "job-offers-empty",
    progress: 0.7,
    messages: [
      "So your dream job isn't on the list? Typical. But hey, let's not ghost each other just yet…",
    ],
    choices: [
      { label: "I want to freelance with you", target: "job-freelance-intro" },
      { label: "I'll check back later", target: "job-offers-empty-completion" },
    ],
  },
  "job-offers-empty-completion": {
    id: "job-offers-empty-completion",
    progress: 1,
    messages: ["Fine. I'll just sit here… manifesting your return like it's a full moon."],
    choices: [
      { label: "Back to the start", target: "greeting" },
      { label: `Write us: ${ASSISTANT.email}`, copyEmail: ASSISTANT.email },
    ],
  },
  "job-apply": {
    id: "job-apply",
    progress: 0.72,
    messages: [
      "Excellent taste. Drop a note and an email—we'll route you to the right humans.",
    ],
    inputs: [
      { type: "textarea", name: "message", label: "Why you + IDEATE", required: true },
      { type: "email", name: "email", label: "Your email", required: true },
    ],
    next: "job-processing",
  },
  "job-freelance-intro": {
    id: "job-freelance-intro",
    progress: 0.4,
    messages: [
      "So you want to freelance with us? Love that energy. We're always scouting specialists.",
    ],
    next: "job-freelance-type",
    autoAdvanceMs: 1100,
  },
  "job-freelance-type": {
    id: "job-freelance-type",
    progress: 0.55,
    messages: [
      "What type of troublemaker are we dealing with?",
      "What's your freelance flavor?",
      "Code wizard or chaotic artist? What's your thing?",
    ],
    choices: [
      {
        label: "Creative Freelance",
        target: "job-apply",
        modelUpdate: { key: "freelanceType", value: "creative" },
      },
      {
        label: "Technical Freelance",
        target: "job-apply",
        modelUpdate: { key: "freelanceType", value: "technical" },
      },
    ],
  },
  "job-processing": {
    id: "job-processing",
    progress: 0.92,
    messages: ["Got it. Routing your interest to the people who hire legends…"],
    next: "job-completion",
    autoAdvanceMs: 1400,
    isProcessing: true,
  },
  "job-completion": {
    id: "job-completion",
    progress: 1,
    messages: ["You're on the radar. Someone human will follow up soon."],
    choices: [
      { label: "Discover our culture", target: "culture-intro" },
      { label: "Back to the start", target: "greeting" },
    ],
  },

  "quick-word-intro": {
    id: "quick-word-intro",
    progress: 0.5,
    messages: [
      "Look at you, spreading positivity like it's your job. The team pours their heart into this, so trust me, your message will mean the world.",
    ],
    next: "quick-word-message",
    autoAdvanceMs: 1400,
  },
  "quick-word-message": {
    id: "quick-word-message",
    progress: 0.6,
    messages: ["Go on, make their day. Drop your message below."],
    inputs: [{ type: "textarea", name: "message", label: "Your message", required: true }],
    next: "quick-word-email",
  },
  "quick-word-email": {
    id: "quick-word-email",
    progress: 0.8,
    messages: [
      "Well, aren't you just a ray of digital sunshine? Pop your email in so we can send some gratitude your way.",
    ],
    inputs: [{ type: "email", name: "email", label: "Your email", required: true }],
    next: "quick-word-processing",
  },
  "quick-word-processing": {
    id: "quick-word-processing",
    progress: 1,
    messages: ["Alright, hang tight! I'm locking in all the details and firing off your message."],
    next: "quick-word-pre-completion",
    autoAdvanceMs: 1400,
    isProcessing: true,
  },
  "quick-word-pre-completion": {
    id: "quick-word-pre-completion",
    progress: 1,
    messages: ["That's in the system now. If it self-destructs, that's on IT, not me."],
    next: "quick-word-completion",
    autoAdvanceMs: 1100,
  },
  "quick-word-completion": {
    id: "quick-word-completion",
    progress: 1,
    messages: ["Want to see what makes IDEATE tick? Let's talk culture."],
    choices: [
      { label: "Discover our culture", target: "culture-intro" },
      { label: "Back to the start", target: "greeting" },
    ],
  },


  "schedule-intro": {
    id: "schedule-intro",
    progress: 0.4,
    messages: [
      "Perfect. Live calendar, no email tennis. Pick a session type and we'll open the booker.",
      "Let's get you on the calendar — discovery, joint brief, or vision sprint.",
    ],
    next: "schedule-choice",
    autoAdvanceMs: 1400,
  },
  "schedule-choice": {
    id: "schedule-choice",
    progress: 0.7,
    messages: [
      "Which kind of time do you want? You can also prep notes before or after the call.",
    ],
    choices: [
      { label: "IDEATE discovery (45–90m)", target: "schedule-handoff" },
      { label: "Build-A-Joint brief (30–60m)", target: "schedule-handoff" },
      { label: "Vision brief (30–60m)", target: "schedule-handoff" },
      { label: "Open full schedule workspace", target: "schedule-handoff" },
    ],
  },
  "schedule-handoff": {
    id: "schedule-handoff",
    progress: 1,
    messages: [
      "Great. Head to Schedule — Calendly is live, and the prep workspace is waiting so you show up ready.",
      "Calendar's open. While you book, knock out the pre-call checklist so we go deep on day one.",
    ],
    choices: [
      { label: "Open Schedule →", href: "/schedule" },
      { label: "Prep before the call", href: "/schedule" },
      { label: "Back to the start", target: "greeting" },
    ],
  },

  "culture-intro": {
    id: "culture-intro",
    progress: 0.1,
    messages: [
      "Big talent, zero egos, and a shared obsession with doing great work.",
    ],
    next: "culture-story",
    autoAdvanceMs: 1200,
  },
  "culture-story": {
    id: "culture-story",
    progress: 0.15,
    messages: ["Wanna see what makes us tick? Take your pick."],
    choices: [
      { label: "Culture of collaboration", target: "culture-collab-1" },
      { label: "Life in the network", target: "culture-life-1" },
      { label: "Annual retreat", target: "culture-retreat-1" },
      { label: "Personal growth", target: "culture-growth-1" },
      { label: "Our winning mentality", target: "culture-win-1" },
    ],
  },
  "culture-collab-1": {
    id: "culture-collab-1",
    progress: 0.35,
    messages: [
      "At IDEATE, collaboration isn't a buzzword—it's just how we do things. It's how ideas start, grow, and ship.",
    ],
    next: "culture-collab-2",
    autoAdvanceMs: 2200,
  },
  "culture-collab-2": {
    id: "culture-collab-2",
    progress: 0.55,
    messages: [
      "We push each other. We disagree, then find a better answer. That space between perspectives is where the good work lives.",
    ],
    next: "culture-collab-3",
    autoAdvanceMs: 2200,
  },
  "culture-collab-3": {
    id: "culture-collab-3",
    progress: 0.75,
    messages: [
      "Nobody wins alone here. Credit is shared. Outcomes are owned. The network gets smarter every sprint.",
    ],
    next: "culture-done",
    autoAdvanceMs: 2000,
  },
  "culture-life-1": {
    id: "culture-life-1",
    progress: 0.35,
    messages: [
      "Life at IDEATE is more than projects and deadlines. It's showing up for each other and protecting deep work.",
    ],
    next: "culture-life-2",
    autoAdvanceMs: 2200,
  },
  "culture-life-2": {
    id: "culture-life-2",
    progress: 0.55,
    messages: [
      "We move fast without losing the plot. Clarity over chaos. Ambition over noise. Kindness as default.",
    ],
    next: "culture-life-3",
    autoAdvanceMs: 2200,
  },
  "culture-life-3": {
    id: "culture-life-3",
    progress: 0.75,
    messages: [
      "Whether remote or in the room, the culture holds: high trust, high standards, room to be human.",
    ],
    next: "culture-done",
    autoAdvanceMs: 2000,
  },
  "culture-retreat-1": {
    id: "culture-retreat-1",
    progress: 0.35,
    messages: [
      "Once a year we leave the timelines behind. The retreat is where strategy gets honest and friendships upgrade.",
    ],
    next: "culture-retreat-2",
    autoAdvanceMs: 2200,
  },
  "culture-retreat-2": {
    id: "culture-retreat-2",
    progress: 0.55,
    messages: [
      "Walks, whiteboards, late debates, early coffee. No performative offsites—just becoming a better team.",
    ],
    next: "culture-retreat-3",
    autoAdvanceMs: 2200,
  },
  "culture-retreat-3": {
    id: "culture-retreat-3",
    progress: 0.75,
    messages: ["People come back sharper, closer, and a little braver. That's the real deliverable."],
    next: "culture-done",
    autoAdvanceMs: 1800,
  },
  "culture-growth-1": {
    id: "culture-growth-1",
    progress: 0.35,
    messages: [
      "Personal growth isn't a perk—it's how we stay useful in a world that refuses to sit still.",
    ],
    next: "culture-growth-2",
    autoAdvanceMs: 2000,
  },
  "culture-growth-2": {
    id: "culture-growth-2",
    progress: 0.55,
    messages: [
      "Mentorship, stretch roles, reading circles, shipping something that scares you a little.",
    ],
    next: "culture-growth-3",
    autoAdvanceMs: 2200,
  },
  "culture-growth-3": {
    id: "culture-growth-3",
    progress: 0.75,
    messages: [
      "We invest in people the way others invest in platforms—because people are the platform.",
    ],
    next: "culture-done",
    autoAdvanceMs: 1800,
  },
  "culture-win-1": {
    id: "culture-win-1",
    progress: 0.35,
    messages: [
      "Our winning mentality is simple: play infinite games. Optimize for compound trust, not one-off applause.",
    ],
    next: "culture-win-2",
    autoAdvanceMs: 2200,
  },
  "culture-win-2": {
    id: "culture-win-2",
    progress: 0.55,
    messages: [
      "We ship. We learn. We raise the bar. We help partners win so hard the market rewrites itself.",
    ],
    next: "culture-win-3",
    autoAdvanceMs: 2000,
  },
  "culture-win-3": {
    id: "culture-win-3",
    progress: 0.75,
    messages: [
      "Ego stays at the door. Standards don't. That's how a small team punches like a network.",
    ],
    next: "culture-done",
    autoAdvanceMs: 1800,
  },
  "culture-done": {
    id: "culture-done",
    progress: 1,
    messages: ["That's about it for this one. Wanna explore another part of our culture?"],
    choices: [
      { label: "Learn more about our culture", target: "culture-story" },
      { label: "Back to the start", target: "greeting" },
      {
        label: "Start a project",
        target: "project-intro",
        modelUpdate: { key: "goal", value: "rfp" },
      },
    ],
  },
};

export const INITIAL_STEP = "intro";
