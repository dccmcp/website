import { DownloadSimple, Plugs, SlidersHorizontal, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { RiskPill } from "@/components/ui/badge";

const steps = [
  {
    icon: DownloadSimple,
    step: "01",
    title: "Install the MCP server",
    body: "Add the integration for your host application — Blender addon, Rhino Yak package, FreeCAD workbench or QGIS plugin.",
    code: "npx dccmcp-blender@latest serve",
  },
  {
    icon: Plugs,
    step: "02",
    title: "Connect your agent",
    body: "Register the server with Claude Code, Codex, Cursor, OpenClaw, VS Code or your own MCP client. Local stdio by default; streamable HTTP when a studio server needs to serve a team.",
    code: '"{ "mcpServers": { "blender": … } }"',
  },
  {
    icon: SlidersHorizontal,
    step: "03",
    title: "Control the software",
    body: "The agent inspects real state and calls typed tools. Invalid calls are rejected at the boundary; valid ones edit geometry, run algorithms and export deliverables.",
    code: 'geometry_nodes.set_input({ socket: "Inset" })',
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Verify and audit",
    body: "Every call is logged with its arguments and result. Checkpoints make destructive work reversible, and approvals gate anything that touches production files.",
    code: "dccmcp audit tail --since 2h",
  },
];

export function Solution() {
  return (
    <Section id="solution">
      <SectionHeading
        eyebrow="The solution"
        title="A standard contract between your agent and your software"
        description={
          <>
            We provide standardized{" "}
            <strong className="font-medium text-fg">MCP for Blender</strong>,{" "}
            <strong className="font-medium text-fg">MCP for Maya</strong>,{" "}
            <strong className="font-medium text-fg">MCP for Houdini</strong>,{" "}
            <strong className="font-medium text-fg">MCP for 3ds Max</strong>,{" "}
            <strong className="font-medium text-fg">MCP for Rhino</strong>,{" "}
            <strong className="font-medium text-fg">MCP for ZBrush</strong>,{" "}
            <strong className="font-medium text-fg">MCP for Photoshop</strong>,{" "}
            <strong className="font-medium text-fg">MCP for FreeCAD</strong>,{" "}
            <strong className="font-medium text-fg">MCP for QGIS</strong>. Each integration
            includes a local MCP Server, a software plugin or addon, typed tools, safety policies
            and audit logs — so agents can inspect, create, modify and validate work inside the real
            application without breaking your pipeline.
          </>
        }
      />

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <StaggerItem
            key={item.step}
            className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-5 transition-colors duration-300 hover:border-mint/30"
          >
            <div className="flex items-center justify-between">
              <item.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
              <span className="font-mono text-[11px] text-muted/80">{item.step}</span>
            </div>
            <h3 className="text-[15px] font-medium text-fg">{item.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-muted">{item.body}</p>
            <code className="mt-auto block overflow-hidden rounded-md border border-line/80 bg-ink/70 px-3 py-2 font-mono text-[11px] text-mint/90">
              <span className="line-clamp-1">{item.code}</span>
            </code>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/60 px-5 py-4 text-[13px] text-muted">
          <span className="text-fg">Every tool is risk-classed before an agent can call it:</span>
          <RiskPill risk="read" />
          <span>inspecting state never mutates a file</span>
          <span className="text-line" aria-hidden="true">
            |
          </span>
          <RiskPill risk="write" />
          <span>checkpointed and reversible</span>
          <span className="text-line" aria-hidden="true">
            |
          </span>
          <RiskPill risk="execute" />
          <span>runs long jobs, returns artifacts</span>
        </div>
      </Reveal>
    </Section>
  );
}
