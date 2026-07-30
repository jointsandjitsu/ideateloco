/**
 * Internal embed targets only — never a public surface directory.
 * No third-party “famous Reid” book sites. Scheduling URLs are private wiring.
 */
export const EMBEDS = {
  /** Live booking — rendered inside branded shell; not advertised as Calendly */
  schedulePrimary: {
    title: "IDEATE Discovery",
    src: "https://calendly.com/reidhoffman264/ideate-w-reid-hoffman",
  },
  scheduleJoint: {
    title: "Build-A-Joint Brief",
    src: "https://calendly.com/reidhoffman264/build-a-joint",
  },
  scheduleVision: {
    title: "Jitsuent Vision Brief",
    src: "https://calendly.com/reidhoffman264/30min",
  },
} as const;
