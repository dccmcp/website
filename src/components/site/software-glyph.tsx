import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Original abstract glyphs standing in for each host application.
 * These are our own neutral shapes, not trademarks of the vendors.
 */
const paths: Record<string, ReactNode> = {
  maya: (
    <>
      <path d="M8 26 16 6l8 20" />
      <path d="M11.2 19h9.6" />
      <circle cx="24" cy="25" r="4" />
    </>
  ),
  houdini: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="24" cy="15" r="3" />
      <circle cx="10" cy="26" r="3" />
      <path d="M11 9.6 21 13.6M20.6 17.6 12.6 23.6" />
      <path d="M8 11v12" strokeDasharray="2 3" />
    </>
  ),
  "3ds max": (
    <>
      <path d="M6 11 18 5l8 6v11l-12 6-8-6z" />
      <path d="M18 5v12l8-6M18 17v11" />
      <path d="M3 24c6 1 10-2 12-7" strokeDasharray="2 3" />
    </>
  ),
  photoshop: (
    <>
      <rect x="5" y="11" width="16" height="16" rx="2.5" />
      <path d="M10 6.5h14a2.5 2.5 0 0 1 2.5 2.5v14" />
      <path d="M11.5 21.5c3 2 7.5 1 7.5-2.2s-5.2-2-5.2-4.6 4.2-3.2 6-1.7" />
    </>
  ),
  zbrush: (
    <>
      <path d="M8 20c0-7 4-12 9-12s7 4 7 10-3 10-9 10-7-3-7-8Z" />
      <path d="M11.5 14c3 3 7.5 2 9.5-1M11.5 20c3 3 7.5 2 9.5-2" />
      <path d="M27 8l2.5-2.5" />
    </>
  ),
  blender: (
    <>
      <path d="M3 16c3.6-6.2 8.4-9.4 14.4-9.4 3.4 0 6 1.3 7.6 3.6" />
      <path d="M21.5 13.6c-2.4-1.9-5.3-2.4-8.6-1.6-4.6 1.2-7.6 4-9.4 8.4" />
      <circle cx="17.5" cy="15.5" r="2.6" />
    </>
  ),
  rhino: (
    <>
      <path d="M9.6 27V7.5l12.9 6.4-12.9 6.3" />
      <path d="M9.6 20.2c4.4 1.3 8-.4 10.8-4.1" />
    </>
  ),
  freecad: (
    <>
      <path d="M16 4.5 27 11v13l-11 6.4L5 24V11l11-6.5Z" />
      <path d="M5 11l11 6.4L27 11M16 17.4v13" />
    </>
  ),
  qgis: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M5.4 13.4h21.2M5.4 19.2h21.2" />
      <path d="M16 5c3.4 3.2 5.2 6.9 5.2 11s-1.8 7.8-5.2 11c-3.4-3.2-5.2-6.9-5.2-11S12.6 8.2 16 5Z" />
    </>
  ),
  opencv: (
    <>
      <circle cx="10.5" cy="12" r="5.5" />
      <circle cx="21.5" cy="12" r="5.5" />
      <circle cx="16" cy="21.5" r="5.5" />
    </>
  ),
};

export function SoftwareGlyph({ software, className }: { software: string; className?: string }) {
  const key = software.toLowerCase();
  const shape = paths[key];

  if (!shape) {
    return (
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-md border border-line bg-panel-raised font-mono text-xs text-mint",
          className,
        )}
      >
        {software.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "grid h-9 w-9 place-items-center rounded-md border border-line bg-panel-raised",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5" fill="none">
        <g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-mint"
        >
          {shape}
        </g>
      </svg>
    </span>
  );
}
