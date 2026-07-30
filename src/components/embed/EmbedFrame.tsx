import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { IdeateLinkButton } from "@/components/ui/IdeateButton";

/**
 * Full-bleed embed. Some hosts block framing — we always offer a clean open path.
 * Never display a list of third-party hostnames as “live surfaces.”
 */
export function EmbedFrame({
  src,
  title,
  minHeight = 720,
  className = "",
}: {
  src: string;
  title: string;
  minHeight?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border bg-bg-elevated ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <p className="text-[12px] font-semibold tracking-wide text-ink">{title}</p>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-forest hover:underline"
        >
          Open full view <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      {!failed ? (
        <iframe
          src={src}
          title={title}
          className="w-full border-0 bg-bg"
          style={{ minHeight }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="clipboard-write; fullscreen"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <p className="max-w-md text-[14px] text-muted">
            This experience prefers its own window. Continue without leaving IDEATE’s orbit.
          </p>
          <IdeateLinkButton href={src} external>
            Continue →
          </IdeateLinkButton>
        </div>
      )}
    </div>
  );
}
