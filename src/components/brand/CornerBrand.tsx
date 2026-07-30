/** Persistent bottom-left lockup — always “IDEATE with Reid Hoffman” */
export function CornerBrand({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "pointer-events-none select-none",
        "font-display text-[11px] font-bold tracking-[0.06em] text-forest sm:text-[12px]",
        className,
      ].join(" ")}
      aria-hidden={false}
    >
      <span className="uppercase">IDEATE</span>
      <span className="mx-1 font-sans font-medium tracking-normal text-muted">with</span>
      <span className="font-sans font-semibold tracking-normal text-ink">Reid Hoffman</span>
    </div>
  );
}
