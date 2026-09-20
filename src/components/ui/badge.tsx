import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Tone = "mint" | "neutral" | "warning";

const tones: Record<Tone, string> = {
  mint: "border-mint/30 bg-mint/10 text-mint-bright",
  neutral: "border-line bg-panel-raised text-muted",
  warning: "border-amber-400/25 bg-amber-400/10 text-amber-200",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

const riskTone: Record<string, string> = {
  read: "border-sky-400/25 bg-sky-400/10 text-sky-200",
  write: "border-mint/30 bg-mint/10 text-mint-bright",
  execute: "border-amber-400/25 bg-amber-400/10 text-amber-200",
};

export function RiskPill({ risk, className }: { risk: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase",
        riskTone[risk] ?? riskTone.read,
        className,
      )}
    >
      {risk}
    </span>
  );
}
