/**
 * @deprecated Prefer IdeateLogo — official asset from ideater.base44.app.
 * Kept as thin wrapper so any remaining imports stay uniform.
 */
import { IdeateLogo } from "./IdeateLogo";

export function IdeateMark({
  className = "h-8 w-8",
  variant: _variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "reversed-green" | "reversed-navy" | "outline" | "cream";
}) {
  return <IdeateLogo className={className} />;
}

export function IdeateWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.15rem] font-bold tracking-[0.04em] text-forest ${className}`}>
      IDEATE
    </span>
  );
}
