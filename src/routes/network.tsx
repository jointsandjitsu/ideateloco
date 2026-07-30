import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/ideate/content";

export const Route = createFileRoute("/network")({
  component: NetworkPage,
  head: () => ({
    meta: [{ title: "Network | IDEATE" }],
  }),
});

const PILLARS = [
  {
    t: "Compound trust",
    d: "Every intro and collaboration should make the next one easier. Reputation is the scarce resource.",
  },
  {
    t: "High standards, zero ego",
    d: "Disagree in the open. Credit the network. Ship work that raises the bar for everyone.",
  },
  {
    t: "Infinite games",
    d: "Optimize for long-term optionality and relationships — not one-off applause.",
  },
  {
    t: "Human + machine",
    d: "Assistants like MILES handle volume. Humans keep taste, judgment, and care.",
  },
];

function NetworkPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Network"
        title="A high-trust graph of founders, operators, and builders."
        description="IDEATE is a network as much as a studio — intros, retreats, shared protocols, and compound trust over time."
        primary={{ label: "Join via MILES", href: "/talk" }}
        secondary={{ label: "Write us", href: `mailto:${BRAND.email}` }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <article key={p.t} className="rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8">
              <h2 className="text-[1.2rem] font-medium tracking-[-0.02em]">{p.t}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-border p-8">
          <h2 className="text-[1.3rem] font-medium">How people enter</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              "Talk with MILES about joining or freelancing",
              "Share a portfolio signal and email",
              "Get routed to the humans who hire legends",
            ].map((s, i) => (
              <li key={s} className="text-[14px] leading-relaxed">
                <span className="font-mono text-[12px] text-muted">0{i + 1}</span>
                <p className="mt-1">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteShell>
  );
}
