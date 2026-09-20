import Link from "next/link";
import { ArrowRight, ShieldCheck, Cube, Clock } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { AgentSession } from "@/components/visuals/agent-session";
import { Marquee } from "@/components/motion/marquee";
import { pendingSoftware } from "@/lib/site";
import { SoftwareGlyph } from "@/components/site/software-glyph";
import { integrationsByCategory, integrations, toolCount } from "@/lib/integrations";

// Derived from the integration records so the numbers can never drift from the product pages.
const proofPoints = [
  { value: String(integrations.length), label: "host applications supported" },
  { value: `${Math.floor(toolCount / 10) * 10}+`, label: "typed tools, each risk-classed" },
  { value: "Local", label: "stdio first, nothing leaves your machine" },
];

const iconRow = integrationsByCategory().flatMap((group) => group.items);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="aura absolute inset-x-0 top-0 -z-10 h-[620px]" aria-hidden="true" />

      <Container>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.06fr)] lg:gap-12">
          <div className="flex flex-col gap-7 lg:pt-6">
            <Reveal from="bottom">
              <div className="flex flex-col items-start gap-3">
                <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] tracking-wide text-muted">
                  <span
                    className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint"
                    aria-hidden="true"
                  />
                  MCP Servers for DCC software
                </span>
                <p className="max-w-[48ch] text-[13.5px] leading-relaxed text-muted">
                  <strong className="font-medium text-fg">DCC</strong> stands for{" "}
                  <strong className="font-medium text-fg">Digital Content Creation</strong> — the 3D,
                  CAD, GIS and imaging tools studios already run, like Blender, Maya, Houdini and
                  Photoshop.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="text-balance-tight text-[34px] leading-[1.06] font-semibold text-fg sm:text-5xl lg:text-[56px] lg:leading-[1.03]">
                MCP for Blender, Rhino, QGIS &amp; Engineering Software
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-[56ch] text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
                Connect any AI agent to your creative and engineering tools — securely and reliably.
                Deploy production-ready MCP Servers and plugins that let Claude, Cursor and your own
                agents inspect, build and validate work inside Blender, Maya, Houdini, Rhino,
                Photoshop, FreeCAD, QGIS and more, in real time.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href="/download" size="lg">
                  <Clock className="h-4 w-4" weight="bold" />
                  Coming soon
                </ButtonLink>
                <ButtonLink href="/docs#quickstart" variant="outline" size="lg">
                  Quickstart
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-muted">
                Works with{" "}
                <span className="font-medium text-fg">Claude Code</span>,{" "}
                <span className="font-medium text-fg">Codex</span>,{" "}
                <span className="font-medium text-fg">Cursor</span>,{" "}
                <span className="font-medium text-fg">OpenClaw</span>,{" "}
                <span className="font-medium text-fg">Doubao</span>,{" "}
                <span className="font-medium text-fg">Qwen</span> and any other MCP-compatible
                agent.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted">
                <li className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-mint" weight="duotone" />
                  Read-only by default
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Cube className="h-4 w-4 text-mint" weight="duotone" />
                  Checkpointed write tools
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-mint">stdio</span>
                  local transport
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.34}>
              <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line/60 sm:grid-cols-3">
                {proofPoints.map((point) => (
                  <div key={point.label} className="bg-panel px-4 py-3.5">
                    <dt className="font-mono text-xl text-fg">{point.value}</dt>
                    <dd className="mt-1 text-[12px] leading-snug text-muted">{point.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal from="right" delay={0.1} className="lg:sticky lg:top-24">
            <AgentSession />
            <p className="mt-3 text-center font-mono text-[11px] text-muted/80">
              Recorded session format · tool calls shown are real DCCMCP tool names
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="mt-16 border-y border-line/70 bg-ink-deep/50 py-5">
        <Container>
          <p className="mb-4 text-center text-[11px] font-medium tracking-[0.18em] text-muted/80 uppercase">
            Integrations shipping today — third-party, not vendor-affiliated
          </p>
        </Container>
        <Marquee>
          <ul className="flex items-center gap-8 pr-8">
            {iconRow.map((integration) => (
              <li key={integration.slug}>
                <Link
                  href={`/${integration.slug}`}
                  className="group/item flex items-center gap-2.5 whitespace-nowrap"
                  aria-label={`${integration.name} — MCP server for ${integration.software}`}
                >
                  <SoftwareGlyph
                    software={integration.software}
                    className="h-9 w-9 transition-colors duration-300 group-hover/item:border-mint/40"
                  />
                  <span className="text-[13.5px] font-medium tracking-tight text-muted transition-colors duration-300 group-hover/item:text-mint">
                    {integration.software}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Marquee>

        <Container>
          <p className="mt-4 text-center text-[11.5px] text-muted/80">
            Private bridges on request: {pendingSoftware.join(" · ")}
          </p>
        </Container>
      </div>
    </section>
  );
}
