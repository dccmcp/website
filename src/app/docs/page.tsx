import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  Wrench,
  ClockCounterClockwise,
  Plugs,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { integrations } from "@/lib/integrations";
import { agents } from "@/lib/agents";
import { BrandIcon } from "@/components/site/brand-icon";

export const metadata: Metadata = {
  title: "Documentation — Quickstart, tool reference and policy guide",
  description:
    "Install a DCCMCP integration, register it with Claude, Cursor or your own agent, and set a safety policy. Includes the full tool reference index and changelog.",
  alternates: { canonical: "/docs" },
  keywords: ["DCCMCP docs", "MCP server quickstart", "MCP policy configuration", "tool reference"],
};

const toc = [
  { id: "quickstart", label: "Quickstart" },
  { id: "install", label: "Install matrix" },
  { id: "clients", label: "Agent clients" },
  { id: "tools", label: "Tool reference" },
  { id: "policy", label: "Policies & approvals" },
  { id: "audit", label: "Audit & rollback" },
  { id: "skills", label: "Skills SDK" },
  { id: "changelog", label: "Changelog" },
  { id: "status", label: "Status & support matrix" },
];

const installMatrix = [
  { software: "Blender", command: "blender --command extension install dccmcp_blender", server: "npx dccmcp-blender serve" },
  { software: "Maya", command: "Maya module (mod) in MAYA_MODULE_PATH", server: "npx dccmcp-maya serve" },
  { software: "Houdini", command: "Houdini package in HOUDINI_PACKAGE_PATH", server: "npx dccmcp-houdini serve" },
  { software: "3ds Max", command: "3dsmaxbatch -U dccmcp-3dsmax.mzp", server: "npx dccmcp-3dsmax serve" },
  { software: "Rhino", command: "yak install dccmcp-rhino", server: "npx dccmcp-rhino serve" },
  { software: "ZBrush", command: "ZScript dropped into ZStartup", server: "npx dccmcp-zbrush serve" },
  { software: "Photoshop", command: "uxp install ./dccmcp-photoshop.ccx", server: "npx dccmcp-photoshop serve" },
  { software: "FreeCAD", command: "Addon Manager → DCCMCP Workbench", server: "npx dccmcp-freecad serve" },
  { software: "QGIS", command: "Plugins → Manage and Install → DCCMCP", server: "npx dccmcp-qgis serve" },
  { software: "OpenCV", command: "pip install dccmcp-opencv", server: "dccmcp-opencv serve" },
];

const changelog = [
  {
    version: "1.4.0",
    date: "2026-09-08",
    items: [
      "Added streamable HTTP transport with token auth for LAN deployments.",
      "Blender: geometry node simulation zones are now addressable by socket path.",
      "QGIS: processing provenance now records algorithm provider and version.",
    ],
  },
  {
    version: "1.3.2",
    date: "2026-08-19",
    items: [
      "Rhino: block instance transforms accept rotation constraints.",
      "Fixed a checkpoint naming collision when two sessions wrote the same file.",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-08-02",
    items: [
      "Skills SDK 1.0 — register custom typed tools from Python or .NET.",
      "Audit entries now include a host application version fingerprint.",
    ],
  },
];

const supportMatrix = [
  { software: "Blender", supported: "4.2 LTS · 4.5 LTS · 5.x", cadence: "Tested within 14 days of a vendor release" },
  { software: "Maya", supported: "2024 · 2025 · 2026", cadence: "Tested within 14 days of a vendor release" },
  { software: "Houdini", supported: "20.5 · 21+", cadence: "Tested within 21 days of a stable release" },
  { software: "3ds Max", supported: "2024 · 2025 · 2026", cadence: "Tested within 14 days of a vendor release" },
  { software: "Rhino", supported: "Rhino 7 · 8 · 9 WIP track", cadence: "Tested within 14 days of a vendor release" },
  { software: "ZBrush", supported: "2024 · 2025+ (desktop)", cadence: "Tested within 30 days of a stable release" },
  { software: "Photoshop", supported: "2024 · 2025 · 2026", cadence: "Tested within 14 days of a vendor release" },
  { software: "FreeCAD", supported: "0.21 · 1.0+", cadence: "Tested within 21 days of a stable release" },
  { software: "QGIS", supported: "3.34 LTR · 3.40+", cadence: "Tested within 14 days of a LTR release" },
  { software: "OpenCV", supported: "4.x · 5.x", cadence: "Tracked continuously" },
];

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink/70">
      {label ? (
        <div className="flex items-center gap-2 border-b border-line/70 px-4 py-2.5">
          <Terminal className="h-3.5 w-3.5 text-mint" weight="duotone" />
          <span className="font-mono text-[11px] text-muted">{label}</span>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-mint/90">
        {children}
      </pre>
    </div>
  );
}

function DocHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-balance-tight scroll-mt-24 border-t border-line/60 pt-10 text-2xl font-semibold text-fg first:border-t-0 first:pt-0 sm:text-[28px]"
    >
      {children}
    </h2>
  );
}

export default function DocsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Documentation</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.05]">
                Install in four commands, then decide what the agent may touch
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                These docs cover installation, client configuration, the policy model and the audit
                format. Per-integration tool lists live on each integration page — this page is the
                shared layer underneath all of them.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="pb-20">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Documentation contents">
              <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
                On this page
              </p>
              <ul className="flex flex-col gap-1 border-l border-line">
                {toc.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-3 text-[13px] text-muted transition-colors hover:border-mint hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex max-w-[76ch] flex-col gap-10">
            <section className="flex flex-col gap-5">
              <DocHeading id="quickstart">Quickstart</DocHeading>
              <div className="flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/8 px-4 py-3.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" weight="bold" />
                <p className="text-[13px] leading-relaxed text-amber-100">
                  <span className="font-medium">Pre-release.</span> The commands on this page describe
                  the interface we are shipping. Nothing is published to npm or PyPI yet —{" "}
                  <Link href="/download" className="underline decoration-amber-200/40 underline-offset-4">
                    get notified at launch
                  </Link>
                  .
                </p>
              </div>
              <p className="text-[14.5px] leading-relaxed text-muted">
                Pick an integration, install the native plugin, start the MCP server, and register it
                with your client. This example uses Blender; the shape is identical everywhere.
              </p>
              <CodeBlock label="1 — install the host plugin">{`blender --command extension install dccmcp_blender`}</CodeBlock>
              <CodeBlock label="2 — start the MCP server">{`npx dccmcp-blender@latest serve --port 7331`}</CodeBlock>
              <CodeBlock label="3 — register with your agent">{`{
  "mcpServers": {
    "blender": {
      "command": "npx",
      "args": ["dccmcp-blender", "serve"]
    }
  }
}`}</CodeBlock>
              <CodeBlock label="4 — verify with a read-only call">{`dccmcp doctor --tool scene.inspect`}</CodeBlock>
              <p className="text-[14.5px] leading-relaxed text-muted">
                The default policy is read-only. Write tools stay blocked until you approve them,
                which is why a first session can safely be exploratory.
              </p>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="install">Install matrix</DocHeading>
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="bg-panel-raised">
                      {["Software", "Plugin / package", "Server"].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {installMatrix.map((row) => (
                      <tr key={row.software} className="border-t border-line/70 bg-panel">
                        <td className="px-4 py-3 text-[13.5px] text-fg">{row.software}</td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-muted">{row.command}</td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-mint/90">{row.server}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="clients">Agent clients</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                Every server speaks the Model Context Protocol over stdio and streamable HTTP, so
                the client you already use is the client you keep. These are the clients we test each
                release; if your agent is not listed but speaks MCP, it works.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {agents.map((agent) => (
                  <li
                    key={agent.name}
                    className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3"
                  >
                    <BrandIcon slug={agent.icon} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] text-fg">{agent.name}</span>
                      <span className="block truncate font-mono text-[11px] text-muted">
                        {agent.vendor}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <CodeBlock label="stdio — local, one config entry per server">{`{
  "mcpServers": {
    "blender": { "command": "npx", "args": ["dccmcp-blender", "serve"] }
  }
}`}</CodeBlock>
              <CodeBlock label="streamable HTTP — shared studio deployment">{`{
  "mcpServers": {
    "blender": {
      "type": "http",
      "url": "http://studio-host:7331/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}`}</CodeBlock>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-panel p-4 text-[13.5px] leading-relaxed text-muted">
                <Plugs className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
                <p>
                  Clients that require a command and arguments (rather than a URL) use the stdio
                  entry. Clients running on another machine use the HTTP entry, which binds to
                  loopback unless you explicitly widen it.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="tools">Tool reference</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                Each server publishes its tool list at connect time. The full list, with arguments
                and risk classes, is documented per integration.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {integrations.map((integration) => (
                  <li key={integration.slug}>
                    <Link
                      href={`/${integration.slug}#tools`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 transition-colors hover:border-mint/40 hover:bg-panel-raised"
                    >
                      <span className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-fg">{integration.name}</span>
                        <span className="font-mono text-[11px] text-muted">
                          {integration.tools.length} tools
                        </span>
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-mint"
                        weight="bold"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="policy">Policies &amp; approvals</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                A policy decides what happens when a tool is called: run it, ask a human, or refuse.
                Policies are declarative files, so they can be reviewed, versioned and shared across
                a team.
              </p>
              <CodeBlock label="policy.toml">{`[default]
mode = "read-only"

[[rule]]
tool = "object.create"
action = "require-approval"

[[rule]]
tool = "pipeline.checkpoint.restore"
action = "deny"
when = { path = "**/production/**" }

[[rule]]
tool = "scene.inspect"
action = "allow"
audit = "summary"`}</CodeBlock>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-panel p-4 text-[13.5px] leading-relaxed text-muted">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
                <p>
                  Approvals can be interactive — the agent pauses and a human confirms in the client
                  — or asynchronous, where the request is queued for a reviewer and the agent
                  continues with other work.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="audit">Audit &amp; rollback</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                Every call writes a structured entry. Entries are append-only on disk and can be
                streamed to a webhook or SIEM.
              </p>
              <CodeBlock label="audit entry">{`2026-09-20T09:14:22Z  studio/leon
tool      geometry_nodes.set_input
args      { "socket": "Inset", "value": 0.02 }
result    ok · 118 ms · 3 variants
file      facade_module_01.blend @ sha256:9f2c…
host      Blender 4.5.1`}</CodeBlock>
              <CodeBlock label="rollback">{`dccmcp restore --checkpoint facade-a1.ckpt --scope objects`}</CodeBlock>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="skills">Skills SDK</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                Register your own tools when studio conventions matter. A skill is a typed callable
                plus a manifest, and it inherits the same policy and audit behavior as built-in
                tools.
              </p>
              <CodeBlock label="skills/rename_by_convention.py">{`from dccmcp import tool, Skill

skill = Skill(
    name="studio-naming",
    tools=[
        tool(
            name="naming.rename_collection",
            risk="write",
            schema={"collection": "str", "pattern": "str"},
        )(rename_collection),
    ],
)`}</CodeBlock>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="changelog">Changelog</DocHeading>
              <ul className="flex flex-col gap-6">
                {changelog.map((release) => (
                  <li key={release.version} className="flex flex-col gap-2 border-l border-line pl-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[13px] text-fg">v{release.version}</span>
                      <span className="font-mono text-[11.5px] text-muted">{release.date}</span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {release.items.map((item) => (
                        <li key={item} className="text-[13.5px] leading-relaxed text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="status">Status &amp; support matrix</DocHeading>
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="bg-panel-raised">
                      {["Software", "Supported versions", "Update cadence"].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {supportMatrix.map((row) => (
                      <tr key={row.software} className="border-t border-line/70 bg-panel">
                        <td className="px-4 py-3 text-[13.5px] text-fg">{row.software}</td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-mint/90">
                          {row.supported}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-muted">{row.cadence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel-raised p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <ClockCounterClockwise className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-medium text-fg">Deploying for a team?</h3>
                  <p className="text-[13.5px] text-muted">
                    We will walk your IT or security team through transport, storage and policy export.
                  </p>
                </div>
              </div>
              <ButtonLink href="/enterprise#contact" variant="outline" className="shrink-0">
                Contact us
              </ButtonLink>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel/60 px-5 py-4">
              <Wrench className="h-5 w-5 shrink-0 text-mint" weight="duotone" />
              <p className="text-[13px] text-muted">
                Looking for the security posture instead? Read the{" "}
                <Link href="/legal/security" className="text-mint hover:text-mint-bright">
                  security overview
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
