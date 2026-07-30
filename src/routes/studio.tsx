import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
  head: () => ({
    meta: [{ title: "Studio | IDEATE" }],
  }),
});

const SERVICES = [
  {
    t: "Strategy & brand",
    d: "Positioning, identity systems, and narrative that compound across the network.",
  },
  {
    t: "Product & web",
    d: "End-to-end product design and engineering — platforms, tools, and launches.",
  },
  {
    t: "Protocol design",
    d: "Turn messy org knowledge into protocols and methods people actually run.",
  },
  {
    t: "White-label builds",
    d: "Partner instances with themed assistants and multi-surface deploy.",
  },
];

function StudioPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Studio"
        title="Strategy-to-ship for network-native products."
        description="IDEATE Studio pairs brand, product, and digital as one system — then wires it into protocols, assistants, and surfaces."
        primary={{ label: "Start a project", href: "/talk" }}
        secondary={{ label: "See work", href: "/work" }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.t} className="rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8">
              <h2 className="text-[1.2rem] font-medium">{s.t}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border p-8">
          <div>
            <h2 className="text-[1.25rem] font-medium">Ready when you are</h2>
            <p className="mt-1 text-[14px] text-muted">
              MILES will capture the brief. Humans take it from there.
            </p>
          </div>
          <Link
            to="/talk"
            className="inline-flex h-11 items-center rounded-full bg-forest px-6 text-[13px] font-semibold text-accent-fg"
          >
            Open project intake
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
