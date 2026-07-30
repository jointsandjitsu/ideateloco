import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/labs")({
  component: LabsPage,
  head: () => ({
    meta: [{ title: "Labs | IDEATE" }],
  }),
});

const EXPERIMENTS = [
  {
    t: "MILES photoreal visualizer",
    d: "Locomotive-class WebGL assistant with dual-screen face, mouse tracking, and speak-reactive glow.",
    href: "/talk",
  },
  {
    t: "Multi-surface deploy map",
    d: "Grok + Base44 + primary hub with shared protocol packs.",
    href: "/schedule",
  },
  {
    t: "White-label pilot kit",
    d: "14-day partner launch sequence with themed assistant scripts.",
    href: "/white-label",
  },
  {
    t: "Protocol library v1",
    d: "Decision, network, AI pairing, scale ethics, and culture protocols.",
    href: "/protocols",
  },
];

function LabsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Labs"
        title="Experiments shipping into the platform."
        description="Where IDEATE tests assistants, surfaces, and methods before they graduate to production."
        primary={{ label: "Open MILES", href: "/talk" }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {EXPERIMENTS.map((e) => (
            <Link
              key={e.t}
              to={e.href}
              className="rounded-2xl border border-border bg-bg-elevated p-6 transition-shadow hover:shadow-soft sm:p-8"
            >
              <h2 className="text-[1.15rem] font-medium">{e.t}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{e.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
