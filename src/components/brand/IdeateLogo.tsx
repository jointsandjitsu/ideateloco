/**
 * Official IDEATE mark — single source from ideater.base44.app.
 * Use this everywhere (nav, MILES, footer, badges). No alternate marks.
 */
export function IdeateLogo({
  className = "h-9 w-9",
  alt = "IDEATE",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <img
      src="/assets/brand/ideate-logo.png"
      alt={alt}
      className={`object-contain ${className}`}
      draggable={false}
      decoding={priority ? "sync" : "async"}
      // eslint-disable-next-line react/no-unknown-property
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

/** Wordmark lockup: official mark + IDEATE text */
export function IdeateLockup({
  className = "",
  showSlogan = false,
  inverted = false,
}: {
  className?: string;
  showSlogan?: boolean;
  inverted?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <IdeateLogo className="h-9 w-9 shrink-0" priority />
      <span className="leading-tight">
        <span
          className={[
            "font-display block text-[15px] font-bold tracking-[0.08em] uppercase",
            inverted ? "text-cream" : "text-forest",
          ].join(" ")}
        >
          IDEATE
        </span>
        {showSlogan && (
          <span className={inverted ? "text-[11px] text-cream/70" : "text-[11px] text-muted"}>
            get miles ahead
          </span>
        )}
      </span>
    </span>
  );
}
