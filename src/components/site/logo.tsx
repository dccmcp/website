import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
      fill="none"
    >
      {/* Isometric cube shell: "a real application". */}
      <path
        d="M16 3.4 27 9.7v12.6L16 28.6 5 22.3V9.7L16 3.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        className="text-line"
      />
      <path d="M16 3.4V16m0 0 11-6.3M16 16 5 9.7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className="text-line" />
      {/* Control channel from agent to host. */}
      <path d="M16 16v6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="text-mint" />
      <circle cx="16" cy="25.2" r="2.6" fill="currentColor" className="text-mint" />
      <circle cx="16" cy="16" r="1.9" fill="currentColor" className="text-mint-bright" />
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
