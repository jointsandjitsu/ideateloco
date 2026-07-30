/**
 * Brand image layers behind content — scroll reveals them through glass panels.
 * Decorative only; the stage experience is WebGL / generative video.
 */
export function ParallaxLayers({ scrollY }: { scrollY: number }) {
  const layers = [
    {
      src: "/assets/brand/miles-ahead.jpg",
      depth: 0.15,
      opacity: 0.22,
      scale: 1.15,
      className: "top-[-5%] left-[-8%] w-[70%] max-w-3xl",
    },
    {
      src: "/assets/brand/mascot-green.jpg",
      depth: 0.35,
      opacity: 0.18,
      scale: 1.08,
      className: "top-[35%] right-[-6%] w-[48%] max-w-md",
    },
    {
      src: "/assets/brand/mascot-black.jpg",
      depth: 0.55,
      opacity: 0.14,
      scale: 1.2,
      className: "top-[70%] left-[5%] w-[40%] max-w-sm",
    },
    {
      src: "/assets/brand/identity-system.jpg",
      depth: 0.75,
      opacity: 0.12,
      scale: 1.1,
      className: "top-[95%] right-[8%] w-[55%] max-w-lg",
    },
  ] as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {layers.map((L) => {
        const y = scrollY * L.depth * 180;
        return (
          <div
            key={L.src}
            className={`absolute ${L.className}`}
            style={{
              transform: `translate3d(0, ${y}px, 0) scale(${L.scale})`,
              opacity: L.opacity,
              willChange: "transform",
            }}
          >
            <img
              src={L.src}
              alt=""
              className="h-auto w-full rounded-3xl object-cover mix-blend-multiply"
              draggable={false}
            />
          </div>
        );
      })}
      {/* Cream wash so layers feel “through glass” */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, transparent 0%, color-mix(in oklab, var(--color-bg) 55%, transparent) 70%, var(--color-bg) 100%)",
        }}
      />
    </div>
  );
}
