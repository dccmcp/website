import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <rect width="32" height="32" rx="7" fill="#0A0A0B" />
      {/* Same mark as the favicon: one bold cube silhouette, three tones.
          Kept deliberately simple so it stays legible at 16px. */}
      <path d="M16 3.5 28.5 10.75 16 18 3.5 10.75Z" fill="#5EEAD4" />
      <path d="M3.5 10.75 16 18v10.5L3.5 21.25Z" fill="#2DD4BF" />
      <path d="M28.5 10.75 28.5 21.25 16 28.5V18Z" fill="#14B8A6" />
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
