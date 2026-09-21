import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Plugs, Code, Check } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Badge, RiskPill } from "@/components/ui/badge";
import { integrationsByCategory, integrations, toolCount } from "@/lib/integrations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Integrations — MCP Servers for Blender, Maya, Houdini, Rhino, Photoshop",
  description:
    "Every DCCMCP integration in one place: MCP Servers for Blender, Maya, Houdini, 3ds Max, Rhino, ZBrush, Photoshop, FreeCAD and QGIS, plus private bridges for in-house software.",
  alternates: { canonical: "/integrations", languages: { en: "/integrations", "zh-CN": "/zh/integrations" } },
  keywords: [
    "MCP for Blender",
    "MCP for Maya",
    "MCP for Houdini",
    "MCP for 3ds Max",
    "MCP for Rhino",
    "MCP for ZBrush",
    "MCP for Photoshop",
    "MCP for FreeCAD",
    "MCP for QGIS",
    "MCP server for 3D software",
    "MCP server for CAD",
  ],
};

const promises = [
  {
    icon: ShieldCheck,
    title: "One policy model",
    body: "Read, write and execute tools are classified identically across every integration, so a studio policy written once applies everywhere.",
  },
  {
    icon: Plugs,
    title: "One client configuration",
    body: "Every server speaks stdio and streamable HTTP. Add a new host application to an agent without changing how the agent is wired.",
  },
  {
    icon: Code,
    title: "One audit format",
    body: "Tool, arguments, actor, host version and file fingerprint — recorded in the same schema regardless of which software ran the work.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DCCMCP integrations",
  itemListElement: integrations.map((integration, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: integration.name,
    description: integration.metaDescription,
    url: `${site.url}/${integration.slug}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Integrations", item: `${site.url}/integrations` },
  ],
};

export default function IntegrationsPage() {
  const groups = integrationsByCategory();

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[460px]" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-5">
                <ol className="flex items-center gap-2 font-mono text-[11.5px] text-muted">
                  <li>
                    <Link href="/" className="transition-colors hover:text-mint">
                      home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-fg">integrations</li>
                </ol>
              </nav>
            </Reveal>
            <Reveal>
              <Eyebrow>Integrations</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[50px] lg:leading-[1.04]">
                MCP Servers for creative, CAD, GIS and vision software
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[64ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                {integrations.length} integrations, {toolCount}+ typed tools, one contract. Each pairs
                a local MCP server with a native plugin for the host application, so agents get
                typed tools while you keep policy enforcement and an audit trail. These
                are independent third-party integrations: we build the MCP layer only, and we are not
                affiliated with, endorsed by or sponsored by any vendor or project we connect to —
                whether or not it is named on this page.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/download" variant="outline" size="lg">
                  Coming soon
                </ButtonLink>
                <ButtonLink href="/enterprise#contact" variant="outline" size="lg">
                  Request a private bridge
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Jump nav: fast internal linking to each product page. */}
      <Container className="pb-4">
        <nav aria-label="Jump to an integration">
          <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
            Jump to
          </p>
          <ul className="flex flex-wrap gap-2">
            {integrations.map((integration) => (
              <li key={integration.slug}>
                <Link
                  href={`#${integration.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-mint/40 hover:text-mint"
                >
                  <span className="font-mono text-[10.5px] text-mint/70">
                    {integration.software}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {groups.map((group, groupIndex) => (
        <Section
          key={group.category}
          className={
            groupIndex === 0
              ? "border-y border-line/60 bg-ink-deep/40 pt-14"
              : "border-b border-line/60 bg-ink-deep/40"
          }
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              {group.category}
            </span>
            <h2 className="text-balance-tight text-2xl font-semibold text-fg sm:text-[30px]">
              {group.category === "3D & Animation"
                ? "MCP for 3D modeling and animation software"
                : group.category === "CAD & Parametric"
                  ? "MCP for CAD and parametric design software"
                  : group.category === "FX & Simulation"
                    ? "MCP for procedural FX and simulation"
                    : group.category === "Sculpting & Texturing"
                      ? "MCP for sculpting and detailing"
                      : group.category === "2D & Texture"
                        ? "MCP for texture and 2D production"
                        : group.category === "GIS & Geospatial"
                          ? "MCP for GIS and geospatial analysis"
                          : "MCP for computer vision and automation"}
            </h2>
          </div>

          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-2">
            {group.items.map((integration) => (
              <StaggerItem key={integration.slug} id={integration.slug} className="h-full scroll-mt-24">
                <Link
                  href={`/${integration.slug}`}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-mint/40 hover:bg-panel-raised sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                      <h3 className="text-[17px] font-medium text-fg">{integration.name}</h3>
                      <span className="font-mono text-[11px] text-muted">
                        {integration.category}
                      </span>
                    </div>
                    <Badge tone={integration.status === "Stable" ? "mint" : "neutral"}>
                      {integration.status}
                    </Badge>
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-muted">{integration.tagline}</p>

                  <ul className="flex flex-col gap-2">
                    {integration.tools.slice(0, 3).map((tool) => (
                      <li key={tool.name} className="flex items-center gap-2.5">
                        <Check className="h-3.5 w-3.5 shrink-0 text-mint" weight="bold" />
                        <code className="truncate font-mono text-[11.5px] text-muted">
                          {tool.name}
                        </code>
                        <span className="ml-auto shrink-0 font-mono text-[10px] text-muted/80">
                          {tool.risk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-4">
                    <span className="font-mono text-[11px] text-muted/80">
                      {integration.tools.length} tools · {integration.agents.length} agents
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-mint">
                      Open {integration.name}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        weight="bold"
                      />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>
      ))}

      <Section>
        <SectionHeading
          eyebrow="Consistency"
          title="Three things every integration shares"
          description="The point of a standard is that learning one integration teaches you all of them."
        />
        <StaggerGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-3">
          {promises.map((promise) => (
            <StaggerItem key={promise.title} className="flex flex-col gap-4 bg-panel p-6">
              <promise.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
              <h3 className="text-[16px] font-medium text-fg">{promise.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{promise.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/60 px-5 py-4 text-[13px] text-muted">
            <span className="text-fg">Risk classes are identical everywhere:</span>
            <RiskPill risk="read" />
            <RiskPill risk="write" />
            <RiskPill risk="execute" />
            <span className="text-muted/80">
              — and every integration defaults to read-only on first install.
            </span>
          </div>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([itemListSchema, breadcrumbSchema]) }}
      />
    </>
  );
}
