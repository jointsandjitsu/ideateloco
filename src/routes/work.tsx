import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { WORK } from "@/lib/ideate/content";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [{ title: "Work | IDEATE" }],
  }),
});

function WorkPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Work"
        title="Selected engagements across studio, protocols, and surfaces."
        description="A sample of how IDEATE shows up — network OS builds, MILES intake, white-label rollouts, culture systems."
        primary={{ label: "Start a project", href: "/talk" }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {WORK.map((w, i) => (
            <article
              key={w.title}
              className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8"
            >
              <div>
                <p className="font-mono text-[12px] text-muted">
                  {String(i + 1).padStart(2, "0")} · {w.tag}
                </p>
                <h2 className="mt-3 text-[1.35rem] font-medium tracking-[-0.02em]">{w.title}</h2>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">{w.result}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-[14px] text-muted">
          Want something like this?{" "}
          <Link to="/talk" className="font-semibold text-fg underline underline-offset-4">
            Talk with MILES
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}
