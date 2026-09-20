"use client";

import { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, Path, PlayCircle, Certificate, Check, Lock } from "@phosphor-icons/react";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "inspect",
    label: "Inspect",
    title: "The agent reads before it writes",
    body: "Every session starts with state: collections, layers, units, tolerances, feature trees, CRS. The agent works from what is actually open — not from an assumption.",
  },
  {
    id: "plan",
    label: "Plan",
    title: "Proposed calls are checked against policy",
    body: "The policy engine classifies each call as read, write or execute. Auto-approved calls run; anything else waits for a human, or is denied outright.",
  },
  {
    id: "apply",
    label: "Apply",
    title: "Changes land in the live document",
    body: "Write tools run inside a transaction with a checkpoint. If a step fails, the session reports a structured error and the previous state is one call away.",
  },
  {
    id: "verify",
    label: "Verify",
    title: "Outputs are produced and recorded",
    body: "Renders, drawings, exports and manifests come back as artifacts, alongside a log entry that names the tool, arguments, actor and file fingerprint.",
  },
] as const;

const icons = {
  inspect: MagnifyingGlass,
  plan: Path,
  apply: PlayCircle,
  verify: Certificate,
} as const;

function StagePanel({ active }: { active: number }) {
  const step = steps[active];

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
        <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
          stage {active + 1}/4 · {step.label}
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </span>
      </div>

      <div className="relative min-h-[320px] p-5">
        <div key={step.id} className="animate-canvas-in flex flex-col gap-4">
            {active === 0 ? (
              <>
                <PanelLabel>scene.inspect → result</PanelLabel>
                <pre className="overflow-x-auto rounded-lg border border-line/80 bg-ink/70 p-4 font-mono text-[11.5px] leading-relaxed text-muted">
{`{
  "file": "facade_module_01.blend",
  "units": { "system": "metric", "scale": 1.0 },
  "collections": ["Facade_Module", "Site", "Render_Setup"],
  "objects": 42,
  "checkpoint": "auto/facade-a1.ckpt"
}`}
                </pre>
              </>
            ) : null}

            {active === 1 ? (
              <>
                <PanelLabel>policy decision</PanelLabel>
                <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-line bg-line/60">
                  {[
                    { tool: "scene.inspect", state: "auto-approved", tone: "text-sky-300" },
                    { tool: "geometry_nodes.set_input", state: "approval required", tone: "text-amber-200" },
                    { tool: "pipeline.checkpoint.restore", state: "denied in production", tone: "text-rose-300" },
                  ].map((row) => (
                    <div
                      key={row.tool}
                      className="flex items-center justify-between gap-3 bg-panel px-4 py-3"
                    >
                      <span className="truncate font-mono text-[12px] text-fg">{row.tool}</span>
                      <span className={cn("shrink-0 font-mono text-[11px]", row.tone)}>
                        {row.state}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-amber-400/25 bg-amber-400/8 px-4 py-3 text-[12.5px] text-amber-100">
                  <Lock className="h-4 w-4 shrink-0" weight="duotone" />
                  Waiting for studio approval before writing to Facade_Module
                </div>
              </>
            ) : null}

            {active === 2 ? (
              <>
                <PanelLabel>transaction · 3 calls applied</PanelLabel>
                <ul className="flex flex-col gap-2 font-mono text-[12px]">
                  {[
                    "checkpoint.create → facade-a1.ckpt",
                    "geometry_nodes.set_input(Inset=0.02)",
                    "render.capture(samples=64) → 1 image",
                  ].map((line) => (
                    <li key={line} className="flex items-center gap-2 text-muted">
                      <Check className="h-3.5 w-3.5 shrink-0 text-success" weight="bold" />
                      <span className="truncate">{line}</span>
                    </li>
                  ))}
                </ul>
                <PanelLabel>rollback available</PanelLabel>
                <code className="block rounded-lg border border-line/80 bg-ink/70 px-4 py-3 font-mono text-[11.5px] text-mint">
                  dccmcp restore --checkpoint facade-a1.ckpt --scope objects
                </code>
              </>
            ) : null}

            {active === 3 ? (
              <>
                <PanelLabel>artifacts</PanelLabel>
                <div className="grid grid-cols-2 gap-3">
                  {["variant_020.png", "variant_040.png", "variant_060.png", "audit.log"].map(
                    (file) => (
                      <div
                        key={file}
                        className="flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2.5 font-mono text-[11px] text-muted"
                      >
                        <Certificate className="h-3.5 w-3.5 shrink-0 text-mint" weight="duotone" />
                        <span className="truncate">{file}</span>
                      </div>
                    ),
                  )}
                </div>
                <PanelLabel>audit entry</PanelLabel>
                <pre className="overflow-x-auto rounded-lg border border-line/80 bg-ink/70 p-4 font-mono text-[11px] leading-relaxed text-muted">
{`2026-09-20T09:14:22Z  studio/leon
tool      geometry_nodes.set_input
args      { "socket": "Inset", "value": 0.02 }
result    ok · 118 ms · 3 variants
file      facade_module_01.blend @ sha256:9f2c…`}
                </pre>
              </>
            ) : null}
        </div>
      </div>
    </div>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted/80 uppercase">
      {children}
    </span>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = refs.current.findIndex((node) => node === visible.target);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="relative border-y border-line/60 py-20 sm:py-24 lg:py-28">
      <div className="aura absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <Container>
        <div className="flex flex-col gap-4">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-balance-tight max-w-3xl text-3xl font-semibold text-fg sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
            Four stages, every session
          </h2>
          <p className="max-w-[62ch] text-[15px] leading-relaxed text-muted sm:text-base">
            Scroll through a single agent session. Each stage maps to a guarantee in the tool
            contract, so the behavior is the same whether the agent is a chatbot, a CI job or a
            pipeline you built in-house.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="flex flex-col">
            {steps.map((step, index) => {
              const Icon = icons[step.id];
              const isActive = index === active;
              return (
                <div
                  key={step.id}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  className="border-t border-line/70 py-7 first:border-t-0 first:pt-0"
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="flex w-full items-start gap-4 text-left"
                    aria-current={isActive}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors duration-300",
                        isActive
                          ? "border-mint/40 bg-mint/10 text-mint"
                          : "border-line bg-panel text-muted",
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" weight="duotone" />
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span
                        className={cn(
                          "font-mono text-[11px] tracking-wide uppercase transition-colors",
                          isActive ? "text-mint" : "text-muted/80",
                        )}
                      >
                        {step.label}
                      </span>
                      <span
                        className={cn(
                          "text-balance-tight text-lg font-medium transition-colors duration-300",
                          isActive ? "text-fg" : "text-muted",
                        )}
                      >
                        {step.title}
                      </span>
                      <span className="text-[13.5px] leading-relaxed text-muted">{step.body}</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <StagePanel active={active} />
          </div>
        </div>
      </Container>
    </section>
  );
}
