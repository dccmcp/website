import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "bottom" | "left" | "right" | "none";

/**
 * Progressive-enhancement reveal.
 *
 * Content is always rendered visible in the DOM — the entrance animation is a
 * pure CSS scroll-driven animation, applied only where `animation-timeline:
 * view()` is supported. That keeps text crawlable, avoids an invisible
 * server-rendered state, and costs no JavaScript.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  as: As = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
  as?: "div" | "section" | "li" | "article" | "header";
  id?: string;
}) {
  return (
    <As
      id={id}
      className={cn("reveal", `reveal-${from}`, className)}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </As>
  );
}

export function StaggerGroup({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  return <As className={cn("stagger", className)}>{children}</As>;
}

export function StaggerItem({
  children,
  className,
  as: As = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  id?: string;
}) {
  return (
    <As id={id} className={cn("reveal reveal-bottom", className)}>
      {children}
    </As>
  );
}
