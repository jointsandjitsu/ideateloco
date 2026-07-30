import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { IdeateLogo } from "@/components/brand/IdeateLogo";
import { BRAND, PALETTE } from "@/lib/ideate/content";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About | IDEATE with Reid Hoffman · Joints & Jitsu" }],
  }),
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title="IDEATE with Reid Hoffman."
        description={BRAND.blurb}
        primary={{ label: "Talk with MILES", href: "/talk" }}
        secondary={{ label: "Schedule", href: "/schedule" }}
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-[16px] leading-relaxed text-muted">
            <p>
              IDEATE is built by <strong className="text-ink">Reid Hoffman</strong> of{" "}
              <strong className="text-ink">{BRAND.company}</strong> — for operators who play
              infinite games, ship SOPs, and want AI on the boring half of the work.
            </p>
            <p>
              We combine a product studio, a protocol library, white-label delivery, and MILES —
              an interactive super assistant — into one operating system. Slogan:{" "}
              <span className="font-display italic text-forest">{BRAND.slogan}</span>.
            </p>
            <p className="font-display text-[15px] leading-snug text-ink">{BRAND.principles}</p>

            <div className="rounded-2xl border border-border bg-bg-elevated/80 p-5 text-[14px] leading-relaxed text-muted">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-forest uppercase">
                About the name
              </p>
              <p className="mt-2">{BRAND.nameNote}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-bg-elevated p-8">
            <div className="flex items-center gap-3">
              <IdeateLogo className="h-14 w-14" priority />
              <div>
                <p className="font-display text-[1.1rem] font-bold tracking-[0.06em] text-forest uppercase">
                  IDEATE
                </p>
                <p className="text-[13px] text-muted">with Reid Hoffman</p>
                <p className="text-[12px] text-subtle">{BRAND.company}</p>
              </div>
            </div>
            <p className="mt-6 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Contact
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-2 block text-[1.25rem] font-medium text-forest underline underline-offset-4"
            >
              {BRAND.email}
            </a>
            <p className="mt-2 text-[13px] text-muted">{BRAND.location}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {PALETTE.map((c) => (
                <span
                  key={c.hex}
                  className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px]"
                >
                  <span className="h-3 w-3 rounded-full" style={{ background: c.hex }} />
                  {c.name}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/talk"
                className="rounded-full bg-forest px-4 py-2 text-[12px] font-semibold text-accent-fg"
              >
                MILES
              </Link>
              <Link
                to="/schedule"
                className="rounded-full border border-border px-4 py-2 text-[12px] font-semibold"
              >
                Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
