import { cn } from "@/lib/utils";

/**
 * The navbar mark, deliberately different from the favicon. At 16px only a bold
 * silhouette survives, so the favicon is the flat filled cube; at 28px we can
 * afford the story — a host application (the cube shell) with an agent driving
 * it through the mint control channel.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)} fill="none">
      {/* Halo behind the target node, so the mark reads as "live" on dark. */}
      <circle cx="16" cy="24.6" r="6.2" fill="currentColor" className="text-mint" opacity="0.13" />
      {/* Isometric cube: the software the agent operates. */}
      <path
        d="M16 3.4 27 9.7v12.6L16 28.6 5 22.3V9.7L16 3.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="text-fg/40"
      />
      <path
        d="M16 3.4V16m0 0 11-6.3M16 16 5 9.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="text-fg/22"
      />
      {/* Control channel from the agent down into the host, ending on a node. */}
      <path
        d="M16 16v6.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="text-mint-bright"
      />
      <circle cx="16" cy="24.6" r="2.5" fill="currentColor" className="text-mint" />
      <circle cx="16" cy="16" r="2" fill="currentColor" className="text-mint-bright" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex items-baseline gap-1.5">
        <span className="text-[17px] font-semibold tracking-tight text-fg">DCCMCP</span>
        <span className="hidden text-[11px] font-medium tracking-[0.16em] text-muted uppercase sm:inline">
          Studio
        </span>
      </span>
    </span>
  );
}
