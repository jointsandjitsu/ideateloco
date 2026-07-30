import { useEffect, useMemo, useRef, useState } from "react";
import { IdeateLogo } from "@/components/brand/IdeateLogo";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

const SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CSS = "https://assets.calendly.com/assets/external/widget.css";

/** Brand tokens as embed hex (no #) */
const BRAND = {
  primary: "2d5b3a",
  text: "1c242c",
  background: "f5f2e6",
};

function buildScheduleUrl(base: string) {
  try {
    const u = new URL(base.split("?")[0]!);
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("hide_landing_page_details", "1");
    u.searchParams.set("primary_color", BRAND.primary);
    u.searchParams.set("text_color", BRAND.text);
    u.searchParams.set("background_color", BRAND.background);
    return u.toString();
  } catch {
    return `${base}?hide_gdpr_banner=1&primary_color=${BRAND.primary}&text_color=${BRAND.text}&background_color=${BRAND.background}`;
  }
}

function ensureStylesheet() {
  if (document.querySelector(`link[href="${CSS}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CSS;
  document.head.appendChild(link);
}

/**
 * Branded schedule embed.
 * Outer chrome is 100% IDEATE — no “Calendly” product labeling in our UI.
 * Third-party footer strip is clipped via overflow where possible.
 */
export function CalendlyEmbed({
  url,
  prefill,
  className = "",
  title = "Book with Reid Hoffman",
  compact = false,
}: {
  url: string;
  prefill?: { name?: string; email?: string };
  className?: string;
  title?: string;
  compact?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const embedUrl = useMemo(() => buildScheduleUrl(url), [url]);
  /** Extra height so we can crop the external “powered by” strip */
  const widgetH = compact ? 700 : 780;
  const visibleH = compact ? 640 : 720;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    setReady(false);
    setFailed(false);
    host.innerHTML = "";
    ensureStylesheet();

    const mount = () => {
      if (cancelled || !hostRef.current || !window.Calendly) return;
      try {
        window.Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: hostRef.current,
          prefill: {
            name: prefill?.name ?? "",
            email: prefill?.email ?? "",
          },
          utm: {
            utmSource: "ideate",
            utmMedium: "embed",
            utmCampaign: "schedule",
          },
        });
        window.setTimeout(() => {
          if (!cancelled) setReady(true);
        }, 900);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const existing = document.querySelector(`script[src="${SCRIPT}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (window.Calendly) mount();
      else existing.addEventListener("load", mount);
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      script.onload = mount;
      script.onerror = () => {
        if (!cancelled) setFailed(true);
      };
      document.body.appendChild(script);
    }

    const failTimer = window.setTimeout(() => {
      if (!cancelled && !hostRef.current?.querySelector("iframe")) {
        setFailed(true);
      }
    }, 12000);

    return () => {
      cancelled = true;
      window.clearTimeout(failTimer);
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [embedUrl, prefill?.name, prefill?.email]);

  return (
    <div
      className={[
        "ideate-calendly group relative overflow-hidden rounded-[1.35rem]",
        "border border-forest/15 bg-bg shadow-[0_20px_60px_rgba(32,64,41,0.08)]",
        className,
      ].join(" ")}
    >
      <div className="relative flex items-center justify-between gap-3 border-b border-forest/10 bg-gradient-to-r from-cream via-bg-elevated to-cream px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <IdeateLogo className="h-8 w-8" />
          <div className="leading-tight">
            <p className="font-display text-[12px] font-bold tracking-[0.1em] text-forest uppercase">
              IDEATE
            </p>
            <p className="text-[11px] text-muted">{title}</p>
          </div>
        </div>
        <span className="hidden rounded-full bg-forest/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-forest uppercase sm:inline">
          Joints & Jitsu
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-forest to-transparent opacity-70" />
      </div>

      {/* Clip stage — crops external footer branding when present */}
      <div
        className="ideate-calendly-clip relative overflow-hidden bg-cream"
        style={{ height: visibleH }}
      >
        {!ready && !failed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-cream">
            <IdeateLogo className="h-14 w-14 animate-pulse" />
            <p className="text-[12px] font-medium tracking-[0.14em] text-forest uppercase">
              Opening your calendar…
            </p>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-forest/15">
              <div className="ideate-calendly-bar h-full w-1/2 rounded-full bg-forest" />
            </div>
          </div>
        )}

        {failed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
            <IdeateLogo className="h-12 w-12" />
            <p className="max-w-sm text-[14px] text-muted">
              Calendar is taking a moment. Email us and we’ll place the hold manually.
            </p>
            <a
              href="mailto:ideate@reidhoffman.com?subject=IDEATE%20booking"
              className="inline-flex h-11 items-center rounded-full bg-forest px-6 text-[13px] font-semibold text-accent-fg shadow-[0_8px_24px_rgba(45,91,58,0.22)]"
            >
              Email IDEATE
            </a>
          </div>
        )}

        <div
          ref={hostRef}
          className="calendly-inline-widget ideate-calendly-host w-full"
          style={{ minWidth: 320, height: widgetH }}
          data-url={embedUrl}
        />

        {/* Bottom mask — covers residual third-party footer */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-cream via-cream/95 to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-forest/10 bg-bg-elevated/90 px-4 py-2.5 sm:px-5">
        <p className="text-[11px] text-muted">IDEATE with Reid Hoffman · Joints & Jitsu</p>
        <p className="font-mono text-[10px] text-subtle">Private booking</p>
      </div>
    </div>
  );
}
