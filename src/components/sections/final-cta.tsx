import { TerminalWindow, Clock } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24">
      <div className="aura absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-50" aria-hidden="true" />

      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-muted">
            <TerminalWindow className="h-3.5 w-3.5 text-mint" weight="duotone" />
            npx dccmcp-blender@latest serve
          </span>

          <h2 className="text-balance-tight text-3xl font-semibold text-fg sm:text-4xl lg:text-[44px] lg:leading-[1.06]">
            Put an agent inside your real tools — without putting your pipeline at risk
          </h2>

          <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-muted">
            Install an integration, set a policy, and let your agent inspect, build and validate
            work in Blender, Maya, Houdini, 3ds Max, Rhino, ZBrush, Photoshop, FreeCAD or QGIS.
            Free to start, local by default.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/download" size="lg">
              <Clock className="h-4 w-4" weight="bold" />
              Coming soon
            </ButtonLink>
            <ButtonLink href="/docs#quickstart" variant="outline" size="lg">
              Read the quickstart
            </ButtonLink>
          </div>

          <p className="font-mono text-[11.5px] text-muted/80">
            macOS · Windows · Linux — no cloud dependency required
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
