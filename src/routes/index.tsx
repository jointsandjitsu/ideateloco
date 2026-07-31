import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { IdeaAssistant } from "@/components/idea/IdeaAssistant";
import { StageBridgeProvider, useStageBridge } from "@/components/idea/stage-bridge";
import { ImmersiveStage } from "@/components/stage/ImmersiveStage";
import { ParallaxLayers } from "@/components/stage/ParallaxLayers";
import { CalendlyEmbed } from "@/components/schedule/CalendlyEmbed";
import { IdeateLogo } from "@/components/brand/IdeateLogo";
import { CornerBrand } from "@/components/brand/CornerBrand";
import { EMBEDS } from "@/lib/ideate/embeds";
import {
  BRAND,
  METHODS,
  PALETTE,
  PRODUCTS,
  PROTOCOLS,
  WORK,
} from "@/lib/ideate/content";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "IDEATE with Reid Hoffman — get miles ahead" },
      { name: "description", content: BRAND.blurb },
    ],
  }),
});

function HomePage() {
  return (
    <StageBridgeProvider>
      <HomeExperience />
    </StageBridgeProvider>
  );
}

function HomeExperience() {
  const [scrollY, setScrollY] = useState(0);
  const stage = useStageBridge();

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollY(window.scrollY / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <ImmersiveStage
        scrollY={scrollY}
        mode={stage?.mode ?? "idle"}
        speakLevel={stage?.speakLevel ?? 0}
        seed={stage?.seed ?? "intro"}
      />
      <ParallaxLayers scrollY={scrollY} />

      <section className="relative z-20 h-dvh w-full overflow-hidden">
        <IdeaAssistant />
        {/* Bottom-left brand on onboarding */}
        <div className="pointer-events-none absolute bottom-5 left-4 z-50 sm:bottom-6 sm:left-6">
          <div className="rounded-full border border-border/60 bg-bg/90 px-3 py-1.5 shadow-soft backdrop-blur-md">
            <CornerBrand />
          </div>
        </div>
        <a
          href="#platform"
          className="absolute bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-forest/15 bg-bg/75 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] text-forest/80 uppercase backdrop-blur-md sm:bottom-28"
        >
          Explore platform
          <ArrowDown className="h-3 w-3 opacity-70" />
        </a>
      </section>

      <div id="platform" className="relative z-20 scroll-mt-0">
        <SiteShell>
          <PlatformBody />
        </SiteShell>
      </div>
    </div>
  );
}

function PlatformBody() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-bg/80 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-forest uppercase backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {BRAND.slogan}
            </p>
            <h1 className="font-display mt-6 text-[clamp(2.2rem,5.5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
              IDEATE
              <span className="mt-1 block text-[0.55em] font-semibold tracking-normal text-muted">
                with Reid Hoffman
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
              {BRAND.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-[13px] font-semibold text-accent-fg shadow-[0_8px_24px_rgba(45,91,58,0.2)]"
              >
                Back to MILES <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/schedule"
                className="inline-flex h-12 items-center rounded-full border border-border-strong bg-bg/70 px-6 text-[13px] font-semibold backdrop-blur-sm"
              >
                Schedule a call
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border/70 bg-bg/75 p-6 shadow-soft backdrop-blur-md">
              <div className="flex items-center gap-3">
                <IdeateLogo className="h-12 w-12" priority />
                <div>
                  <p className="font-display text-[15px] font-bold tracking-[0.08em] text-forest uppercase">
                    IDEATE
                  </p>
                  <p className="text-[13px] text-muted">with Reid Hoffman</p>
                </div>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-muted">
                Onboarding, scheduling, and the methods library — one experience for Joints & Jitsu.
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-4 block text-[13px] font-medium text-forest underline underline-offset-4"
              >
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-bg/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-5 sm:px-6">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Identity
          </span>
          {PALETTE.map((c) => (
            <div key={c.hex} className="flex items-center gap-2">
              <span
                className="h-7 w-7 rounded-md border border-border shadow-sm"
                style={{ background: c.hex }}
              />
              <span className="hidden text-[11px] text-muted sm:inline">{c.name}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-3">
            <IdeateLogo className="h-10 w-10" />
          </div>
        </div>
      </section>

      {/* Embedded schedule — not a link list */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">
            Schedule
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.5rem,3vw,2.1rem)] font-bold">
            Book time — embedded here
          </h2>
          <p className="mt-2 max-w-xl text-[14px] text-muted">
            Live calendar inside IDEATE. Prep before, ship after — on the Schedule workspace.
          </p>
          <div className="mt-8">
            <CalendlyEmbed url={EMBEDS.schedulePrimary.src} title="IDEATE Discovery · Joints & Jitsu" compact />
          </div>
          <Link
            to="/schedule"
            className="mt-4 inline-flex text-[13px] font-semibold text-forest underline underline-offset-4"
          >
            Full schedule workspace →
          </Link>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">
            Inside IDEATE
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
            Everything you need, in one OS
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.id}
                to={p.href}
                className="group flex flex-col rounded-2xl border border-border/70 bg-bg/70 p-6 backdrop-blur-md transition-shadow hover:shadow-soft"
              >
                <p className="text-[11px] font-semibold tracking-[0.14em] text-forest uppercase">
                  {p.eyebrow}
                </p>
                <h3 className="font-display mt-2 text-[1.35rem] font-bold">{p.name}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">{p.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-forest">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-bg/60 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">
            Protocols
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
            How we decide, ship, and scale trust
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PROTOCOLS.slice(0, 3).map((pr) => (
              <article
                key={pr.id}
                className="rounded-2xl border border-border/70 bg-bg/75 p-6 backdrop-blur-md"
              >
                <p className="font-mono text-[12px] text-forest">{pr.code}</p>
                <h3 className="font-display mt-2 text-[1.15rem] font-bold">{pr.name}</h3>
                <p className="mt-2 text-[14px] text-muted">{pr.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">Methods</p>
          <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
            Playbooks you can run this week
          </h2>
          <div className="mt-8 divide-y divide-border/70 border-y border-border/70 bg-bg/50 backdrop-blur-sm">
            {METHODS.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="grid gap-2 px-2 py-5 sm:grid-cols-12 sm:items-center sm:gap-6"
              >
                <p className="text-[15px] font-semibold sm:col-span-4">{m.name}</p>
                <p className="text-[14px] text-muted sm:col-span-6">{m.summary}</p>
                <p className="font-mono text-[12px] text-subtle sm:col-span-2 sm:text-right">
                  {m.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">Work</p>
          <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
            Recent engagements
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {WORK.map((w) => (
              <article
                key={w.title}
                className="rounded-2xl border border-border/70 bg-bg/70 p-6 backdrop-blur-md"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-forest uppercase">
                  {w.tag}
                </p>
                <h3 className="font-display mt-2 text-[1.2rem] font-bold">{w.title}</h3>
                <p className="mt-2 text-[14px] text-muted">{w.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-3xl bg-forest px-6 py-12 text-accent-fg sm:px-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase opacity-70">
              · get miles ahead ·
            </p>
            <h2 className="font-display mt-3 max-w-xl text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold leading-tight">
              IDEATE with Reid Hoffman
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex h-12 items-center rounded-full bg-cream px-6 text-[13px] font-semibold text-moss"
              >
                Open MILES
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex h-12 items-center rounded-full border border-cream/30 px-6 text-[13px] font-semibold"
              >
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
