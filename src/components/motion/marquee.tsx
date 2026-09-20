import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * CSS-only infinite marquee. The children are rendered twice and the track is
 * translated by -50%, so it stays on the compositor with no JavaScript. The
 * duplicate copy is hidden from assistive tech and crawlers to avoid repeating
 * the same links twice in the accessibility tree and the DOM text.
 */
export function Marquee({
  children,
  className,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden select-none", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className="animate-marquee flex w-max shrink-0 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex items-center">{children}</div>
        {/* `inert` keeps the duplicated copy out of the tab order as well as the
            accessibility tree — otherwise every marquee link is focusable twice. */}
        <div className="flex items-center" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
