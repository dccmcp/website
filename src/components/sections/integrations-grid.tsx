import Link from "next/link";
import { ArrowRight, Plugs } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading } from "@/components/ui/section";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ButtonLink } from "@/components/ui/button";
import { featuredIntegrations, integrations, toolCount } from "@/lib/integrations";

/**
 * The landing page deliberately shows only the flagship integrations. Every
 * other product page is reachable from /integrations, the footer band, the
 * related-integrations block on each product page, and this banner.
 */
export function IntegrationsGrid() {
  const featured = featuredIntegrations();

  return (
    <Section id="integrations" className="border-y border-line/60 bg-ink-deep/40">
      <SectionHeading
        eyebrow="Integrations"
        title="MCP Servers for the software you already run"
        description={
          <>
            Each integration is a local MCP server plus a native plugin for Blender, Maya, Houdini,
            3ds Max, Rhino, ZBrush, Photoshop, FreeCAD or QGIS. Same tool contract, same
            policy engine, same audit format — whichever application your pipeline depends on.
          </>
        }
      />

      <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((integration) => (
          <StaggerItem key={integration.slug} className="h-full">
            <TiltCard className="h-full" intensity={4}>
              <Link
                href={`/${integration.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-mint/40 hover:bg-panel-raised"
              >
                <h3 className="text-balance-tight text-[17px] font-medium text-fg">
                  {integration.name}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{integration.tagline}</p>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.08} className="mt-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-line bg-panel p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <Plugs className="mt-0.5 h-6 w-6 shrink-0 text-mint" weight="duotone" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <h3 className="text-[17px] font-medium text-fg">
                {integrations.length} integrations · {toolCount}+ typed tools
              </h3>
              <p className="max-w-[68ch] text-[13.5px] leading-relaxed text-muted">
                MCP for 3ds Max and MCP for ZBrush are documented on their own pages,
                along with the full tool list and support matrix for every integration. If your
                software is not listed, we build private bridges on the enterprise track — Revit,
                Civil 3D, KiCad, Ansys, Maya-based in-house tooling and more.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="/integrations">
              Browse all integrations
              <ArrowRight className="h-4 w-4" weight="bold" />
            </ButtonLink>
            <ButtonLink href="/enterprise#contact" variant="outline">
              Request a private bridge
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
