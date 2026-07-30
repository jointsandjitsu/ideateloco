import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { PROTOCOLS } from "@/lib/ideate/content";

export const Route = createFileRoute("/protocols")({
  component: ProtocolsPage,
  head: () => ({
    meta: [{ title: "Protocols | IDEATE" }],
  }),
});

function ProtocolsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Protocols"
        title="Codified ways of working for network-scale teams."
        description="Decision velocity, compound trust, human+AI pairing, white-label launch — the operating rules behind IDEATE."
        primary={{ label: "Talk with MILES", href: "/talk" }}
        secondary={{ label: "Methods", href: "/methods" }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {PROTOCOLS.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[12px] text-muted">{p.code}</p>
              </div>
              <h2 className="mt-2 text-[1.4rem] font-medium tracking-[-0.02em]">{p.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
              <ol className="mt-6 space-y-2.5">
                {p.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-[14px] leading-snug">
                    <span className="font-mono text-[12px] text-subtle tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
