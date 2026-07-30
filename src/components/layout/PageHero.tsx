import { Link } from "@tanstack/react-router";

function Cta({ label, href, primary }: { label: string; href: string; primary?: boolean }) {
  const external = href.startsWith("mailto:") || href.startsWith("http");
  const className = primary
    ? "inline-flex h-11 items-center rounded-full bg-forest px-6 text-[13px] font-semibold text-accent-fg"
    : "inline-flex h-11 items-center rounded-full border border-border-strong px-6 text-[13px] font-semibold text-fg";

  if (external) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {label}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-b border-border bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {eyebrow && (
          <p className="text-[11px] font-semibold tracking-[0.18em] text-forest uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            {description}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primary && <Cta label={primary.label} href={primary.href} primary />}
            {secondary && <Cta label={secondary.label} href={secondary.href} />}
          </div>
        )}
      </div>
    </section>
  );
}
