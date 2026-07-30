import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/layout/PageHero";
import { CalendlyEmbed } from "@/components/schedule/CalendlyEmbed";
import { PrepWorkspace } from "@/components/schedule/PrepWorkspace";
import { IdeateButton, IdeateLinkButton } from "@/components/ui/IdeateButton";
import { CALENDLY, EVENT_TYPES } from "@/lib/ideate/calendly";
import { Calendar, ClipboardList, Sparkles } from "lucide-react";

export const Route = createFileRoute("/schedule")({
  component: SchedulePage,
  head: () => ({
    meta: [
      { title: "Schedule | IDEATE with Reid Hoffman" },
      {
        name: "description",
        content:
          "Book IDEATE time with Reid Hoffman — and use the workspace to prepare before and ship after the call.",
      },
    ],
  }),
});

function SchedulePage() {
  const [active, setActive] = useState(EVENT_TYPES[0]!.id);
  const [tab, setTab] = useState<"book" | "before" | "after">("book");
  const event = EVENT_TYPES.find((e) => e.id === active) ?? EVENT_TYPES[0]!;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Scheduling"
        title="Book the call. Get work done before and after."
        description="Booking embedded in IDEATE — plus a workspace so you arrive ready and leave with momentum."
        primary={{ label: "Talk with MILES first", href: "/talk" }}
        secondary={{ label: "About IDEATE", href: "/about" }}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "book", label: "Book", icon: Calendar },
                { id: "before", label: "Before the call", icon: ClipboardList },
                { id: "after", label: "After the call", icon: Sparkles },
              ] as const
            ).map((t) => (
              <IdeateButton
                key={t.id}
                type="button"
                variant={tab === t.id ? "primary" : "secondary"}
                size="sm"
                onClick={() => setTab(t.id)}
                icon={<t.icon className="h-3.5 w-3.5" />}
              >
                {t.label}
              </IdeateButton>
            ))}
          </div>
        </div>
      </section>

      {tab === "book" && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-4">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">
                Session types
              </p>
              {EVENT_TYPES.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setActive(e.id)}
                  className={[
                    "w-full rounded-2xl border p-4 text-left transition-all duration-200",
                    active === e.id
                      ? "border-forest bg-forest/5 shadow-soft"
                      : "border-border bg-bg-elevated hover:border-forest/40",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: e.color }} />
                    <p className="text-[14px] font-semibold">{e.name}</p>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {e.duration} min · {e.when}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{e.description}</p>
                </button>
              ))}
              <p className="text-[12px] text-subtle">Live booking · {CALENDLY.timezone}</p>
            </div>
            <div className="lg:col-span-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-[1.35rem] font-bold">{event.name}</h2>
                <IdeateButton type="button" variant="soft" size="sm" onClick={() => setTab("before")}>
                  Prep while you book →
                </IdeateButton>
              </div>
              <CalendlyEmbed url={event.schedulingUrl} title={event.name} />
            </div>
          </div>
        </section>
      )}

      {tab === "before" && (
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <PrepWorkspace phase="before" />
          <div className="mt-8 flex flex-wrap gap-3">
            <IdeateButton type="button" onClick={() => setTab("book")}>
              Book a slot
            </IdeateButton>
            <IdeateLinkButton href="/talk" variant="secondary">
              Brief MILES first
            </IdeateLinkButton>
          </div>
        </section>
      )}

      {tab === "after" && (
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <PrepWorkspace phase="after" />
          <div className="mt-8 flex flex-wrap gap-3">
            <IdeateButton type="button" onClick={() => setTab("book")}>
              Schedule follow-up
            </IdeateButton>
            <IdeateLinkButton href="/methods" variant="secondary">
              Open methods
            </IdeateLinkButton>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
