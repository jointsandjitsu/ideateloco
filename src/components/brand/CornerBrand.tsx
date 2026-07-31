/** Persistent bottom-left lockup — always “IDEATE with Reid Hoffman” + slogans */
export function CornerBrand({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "pointer-events-none select-none",
        className,
      ].join(" ")}
      aria-hidden={false}
    >
      <div className="font-display text-[12px] font-bold tracking-[0.04em] text-forest sm:text-[13px]">
        IDEATE with Reid Hoffman
      </div>
      <div className="mt-0.5 text-[9px] font-medium tracking-[0.06em] text-muted uppercase sm:text-[10px]">
        get miles ahead
      </div>
      <div className="text-[8px] tracking-[0.08em] text-subtle uppercase sm:text-[9px]">
        ARTICULATING VISIONS · DELIVERING CONFIDENCE
      </div>
    </div>
  );
}
