"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, CircleNotch, Pause, Play, TerminalWindow } from "@phosphor-icons/react";
import { sessions, type SessionLine } from "@/components/visuals/session-scripts";
import { HostViewport } from "@/components/visuals/host-viewport";
import { cn } from "@/lib/utils";

const STEP_MS = 900;
const HOLD_MS = 2400;

function lineText(line: SessionLine) {
  switch (line.kind) {
    case "prompt":
      return line.text;
    case "call":
      return `${line.tool}(${line.args})`;
    default:
      return line.text;
  }
}

export function AgentSession({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [playing, setPlaying] = useState(true);

  const session = sessions[index];
  const total = session.lines.length;
  const complete = step >= total;

  useEffect(() => {
    if (!playing) return;
    const timeout = window.setTimeout(
      () => {
        if (complete) {
          setIndex((value) => (value + 1) % sessions.length);
          setStep(1);
        } else {
          setStep((value) => value + 1);
        }
      },
      complete ? HOLD_MS : STEP_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [complete, playing, index]);

  const visible = useMemo(() => session.lines.slice(0, step), [session, step]);
  const activeTool =
    [...visible].reverse().find((line) => line.kind === "call")?.kind === "call"
      ? ([...visible].reverse().find((line) => line.kind === "call") as { tool: string }).tool
      : "scene.inspect";

  return (
    <div className={cn("glass overflow-hidden rounded-2xl", className)}>
      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-line/70 bg-ink/50 p-2">
        {sessions.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setIndex(itemIndex);
                setStep(1);
                setPlaying(true);
              }}
              aria-pressed={active}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                active
                  ? "bg-mint/12 text-mint-bright shadow-[inset_0_0_0_1px_rgba(45,212,191,0.28)]"
                  : "text-muted hover:bg-panel-raised hover:text-fg",
              )}
            >
              {item.software}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-1 pl-2">
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:border-mint/40 hover:text-mint"
            aria-label={playing ? "Pause demo" : "Play demo"}
          >
            {playing ? <Pause className="h-3.5 w-3.5" weight="fill" /> : <Play className="h-3.5 w-3.5" weight="fill" />}
          </button>
        </div>
      </div>

      <div className="grid gap-0">
        {/* Agent console */}
        <div className="flex min-h-[264px] flex-col border-b border-line/70">
          <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5">
            <TerminalWindow className="h-4 w-4 text-mint" weight="duotone" />
            <span className="font-mono text-[11px] tracking-wide text-muted">
              agent › mcp › {session.slug}
            </span>
          </div>

          <div className="flex-1 px-4 py-4" aria-hidden="true">
            <ul className="flex flex-col gap-2.5 font-mono text-[12.5px] leading-relaxed">
              {visible.map((line, lineIndex) => (
                  <li
                    key={`${session.slug}-${lineIndex}`}
                    className="animate-line-in flex gap-2"
                  >
                    {line.kind === "prompt" ? (
                      <>
                        <span className="mt-px shrink-0 text-mint select-none">&rsaquo;</span>
                        <span className="min-w-0 break-words text-fg">{lineText(line)}</span>
                      </>
                    ) : null}

                    {line.kind === "call" ? (
                      <>
                        <CircleNotch
                          className={cn(
                            "mt-0.5 h-3.5 w-3.5 shrink-0",
                            complete ? "text-mint/60" : "animate-spin text-mint",
                          )}
                          weight="bold"
                        />
                        <span className="min-w-0 break-all text-mint-bright">
                          {line.tool}
                          <span className="text-muted">({line.args})</span>
                        </span>
                      </>
                    ) : null}

                    {line.kind === "result" ? (
                      <>
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" weight="bold" />
                        <span className="min-w-0 break-words text-muted">
                          {line.text}
                          {line.detail ? (
                            <span className="text-muted/80"> · {line.detail}</span>
                          ) : null}
                        </span>
                      </>
                    ) : null}

                    {line.kind === "ok" ? (
                      <>
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" weight="bold" />
                        <span className="min-w-0 break-words text-fg">
                          {line.text}
                          {line.detail ? (
                            <span className="text-muted/80"> · {line.detail}</span>
                          ) : null}
                        </span>
                      </>
                    ) : null}
                  </li>
                ))}
            </ul>
          </div>

          <p className="sr-only">
            Example session: an AI agent driving {session.software} through DCCMCP tools.{" "}
            {session.lines.map(lineText).join(". ")}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line/60 px-4 py-2.5 font-mono text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5" aria-live="polite">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  complete ? "bg-success" : "animate-pulse-dot bg-mint",
                )}
                aria-hidden="true"
              />
              {complete ? "session idle" : `running ${activeTool}`}
            </span>
            <span className="text-muted/80">
              stdio · 127.0.0.1
            </span>
            <span className="text-muted/80">
              policy: studio-default
            </span>
          </div>
        </div>

        {/* Host viewport */}
        <div className="flex min-h-[268px] flex-col bg-ink-deep/60">
          <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
            </span>
            <span className="truncate font-mono text-[11px] text-muted">{session.window}</span>
          </div>
          <div className="relative flex-1 p-4">
            <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative h-full min-h-[188px] w-full">
              <div key={session.slug} className="animate-canvas-in absolute inset-0">
                <HostViewport software={session.slug} />
              </div>
            </div>
          </div>
          <div className="border-t border-line/60 px-4 py-2.5">
            <Link
              href={session.href}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-mint transition-colors hover:text-mint-bright"
            >
              tool reference: {session.href}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
