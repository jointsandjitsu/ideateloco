import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { BRAND, NAV } from "@/lib/ideate/content";
import { IdeateLockup, IdeateLogo } from "@/components/brand/IdeateLogo";
import { CornerBrand } from "@/components/brand/CornerBrand";
import { Menu, X } from "lucide-react";

export function SiteShell({
  children,
  bare = false,
}: {
  children: React.ReactNode;
  bare?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (bare) return <>{children}</>;

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <IdeateLockup showSlogan />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={[
                    "rounded-full px-3 py-1.5 text-[12px] font-medium tracking-wide transition-colors",
                    active
                      ? "bg-forest text-accent-fg"
                      : "text-muted hover:bg-choice-hover hover:text-fg",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/talk"
              className="hidden rounded-full bg-forest px-4 py-2 text-[12px] font-semibold text-accent-fg sm:inline-flex"
            >
              Talk with MILES
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-bg px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-choice-hover"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/talk"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-forest px-4 py-3 text-center text-[13px] font-semibold text-accent-fg"
              >
                Talk with MILES
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      {/* Always-on bottom-left brand */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-[60] sm:bottom-5 sm:left-5">
        <div className="rounded-full border border-border/60 bg-bg/90 px-3 py-1.5 shadow-soft backdrop-blur-md">
          <CornerBrand />
        </div>
      </div>

      <footer className="border-t border-border bg-moss text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2.5">
              <IdeateLogo className="h-10 w-10 brightness-0 invert" />
              <div>
                <span className="font-display block text-[15px] font-bold tracking-[0.08em] uppercase">
                  IDEATE
                </span>
                <span className="text-[13px] text-cream/80">with Reid Hoffman</span>
              </div>
            </div>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-cream/75">{BRAND.blurb}</p>
            <p className="mt-4 font-display text-[13px] italic text-cream/90">· {BRAND.slogan} ·</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-cream/55 uppercase">
              Contact
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-3 block text-[15px] font-medium underline underline-offset-4"
            >
              {BRAND.email}
            </a>
            <ul className="mt-4 space-y-2">
              {NAV.slice(0, 6).map((n) => (
                <li key={n.href}>
                  <Link
                    to={n.href}
                    className="text-[14px] text-cream underline-offset-4 hover:underline"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/15 px-4 py-4 text-center text-[12px] text-cream/50 sm:px-6">
          © {new Date().getFullYear()} IDEATE with Reid Hoffman · Joints & Jitsu
        </div>
      </footer>
    </div>
  );
}
