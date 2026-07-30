import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { BRAND } from "@/lib/ideate/content";
import { Check } from "lucide-react";

export const Route = createFileRoute("/white-label")({
  component: WhiteLabelPage,
  head: () => ({
    meta: [{ title: "White Label | IDEATE" }],
  }),
});

const FEATURES = [
  "Custom brand tokens, domain, and voice",
  "MILES-class assistant with your scripts",
  "Protocol + method packs for your team",
  "Surfaces on Grok, Base44, or custom host",
  "Partner pilot in 14 days",
  "Shared network standards when you graduate",
];

const STEPS = [
  { t: "Brand lock", d: "Logo, colors, tone, domain, and legal." },
  { t: "Assistant clone", d: "Persona, flows, and email routing." },
  { t: "Private deploy", d: "Hosted under your brand — we wire the OS." },
  { t: "Pilot", d: "Two-week live run with telemetry." },
  { t: "Scale", d: "Protocol pack + network join path." },
];

function WhiteLabelPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="White Label"
        title="Ship IDEATE under your brand — without rebuilding the stack."
        description="White-label assistants, protocol packs, and multi-surface hosting for partners who want network-grade product craft."
        primary={{ label: "Talk with MILES", href: "/talk" }}
        secondary={{ label: "Email the team", href: `mailto:${BRAND.email}` }}
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">What’s included</h2>
            <ul className="mt-6 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Launch sequence
            </p>
            <ol className="mt-5 space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fg font-mono text-[12px] text-accent-fg">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="mt-0.5 text-[14px] text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-forest p-8 text-accent-fg sm:p-12">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-medium tracking-[-0.03em]">
            Ready for a partner instance?
          </h2>
          <p className="mt-3 max-w-lg text-[15px] opacity-80">
            Start with MILES or write {BRAND.email}. We’ll scope surfaces, assistant, and protocol
            pack.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/talk"
              className="inline-flex h-11 items-center rounded-full bg-cream px-6 text-[13px] font-semibold text-moss"
            >
              Start via MILES
            </Link>
            <a
              href={`mailto:${BRAND.email}?subject=White%20label%20inquiry`}
              className="inline-flex h-11 items-center rounded-full border border-cream/30 px-6 text-[13px] font-semibold"
            >
              {BRAND.email}
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
