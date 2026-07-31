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

/** Wordmark lockup: one line “IDEATE with Reid Hoffman” + slogans below */
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
            "font-display block text-[14px] font-bold tracking-[0.04em] sm:text-[15px]",
            inverted ? "text-cream" : "text-forest",
          ].join(" ")}
        >
          IDEATE with Reid Hoffman
        </span>
        {showSlogan && (
          <span className={inverted ? "block text-[10px] text-cream/70" : "block text-[10px] text-muted"}>
            get miles ahead
            <span className="mx-1 opacity-40">·</span>
            ARTICULATING VISIONS · DELIVERING CONFIDENCE
          </span>
        )}
      </span>
    </span>
  );
}
