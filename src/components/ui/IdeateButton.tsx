import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "soft" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-accent-fg shadow-[0_8px_24px_rgba(45,91,58,0.22)] hover:bg-moss hover:shadow-[0_10px_28px_rgba(32,64,41,0.28)] active:scale-[0.98]",
  secondary:
    "border border-forest/30 bg-bg/80 text-forest backdrop-blur-sm hover:border-forest hover:bg-forest hover:text-accent-fg",
  ghost: "text-forest hover:bg-choice-hover",
  soft: "bg-choice-hover text-ink hover:bg-border",
  dark: "bg-ink text-cream hover:bg-midnight",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[12px] gap-1.5",
  md: "h-11 px-6 text-[13px] gap-2",
  lg: "h-12 px-7 text-[14px] gap-2",
};

export const IdeateButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    icon?: ReactNode;
  }
>(function IdeateButton(
  { className = "", variant = "primary", size = "md", icon, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={[
        "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:pointer-events-none disabled:opacity-45",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
});

export function IdeateLinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={[
        "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200 ease-out",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
