import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { METHODS } from "@/lib/ideate/content";

export const Route = createFileRoute("/methods")({
  component: MethodsPage,
  head: () => ({
    meta: [{ title: "Methods | IDEATE" }],
  }),
});

function MethodsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Methods"
        title="Playbooks for ideation, diligence, partners, and launch."
        description="Repeatable methods drawn from network thinking, product craft, and white-label operations — ready to run."
        primary={{ label: "Start a project", href: "/talk" }}
        secondary={{ label: "Protocols", href: "/protocols" }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="space-y-4">
          {METHODS.map((m) => (
            <article
              key={m.id}
              className="grid gap-4 rounded-2xl border border-border bg-bg-elevated p-6 sm:grid-cols-12 sm:p-8"
            >
              <div className="sm:col-span-5">
                <h2 className="text-[1.25rem] font-medium tracking-[-0.02em]">{m.name}</h2>
                <p className="mt-1 font-mono text-[12px] text-muted">{m.duration}</p>
              </div>
              <div className="sm:col-span-4">
                <p className="text-[14px] leading-relaxed text-muted">{m.summary}</p>
              </div>
              <ul className="sm:col-span-3 space-y-1.5">
                {m.outcomes.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-border px-3 py-1 text-[12px] text-ink-soft"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
