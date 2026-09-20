import {
  ShieldCheck,
  Scroll,
  Stack,
  CubeTransparent,
  PuzzlePiece,
  Gauge,
} from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ShieldCheck,
    title: "Production-grade safety",
    body: "Read-only by default. Approval gates on write tools, deny rules for production paths, and per-tool permissions that a TD can configure once and enforce everywhere.",
    span: "lg:col-span-3",
    accent: true,
  },
  {
    icon: Scroll,
    title: "Auditable by default",
    body: "Every call records the tool, arguments, result, host version and file fingerprint. Export to your SIEM or query it locally.",
    span: "lg:col-span-3",
  },
  {
    icon: Stack,
    title: "Multi-instance control",
    body: "Drive several sessions of the same application, or a mixed set of applications, from one agent run. Headless workers included.",
    span: "lg:col-span-2",
  },
  {
    icon: PuzzlePiece,
    title: "Skills & custom tools",
    body: "Register your own typed tools and packaged skills so agents can use studio conventions instead of inventing them.",
    span: "lg:col-span-2",
  },
  {
    icon: CubeTransparent,
    title: "Real UI control",
    body: "Tools act on the live document, not a copy. The viewport, layer tree and undo stack stay in sync while the agent works.",
    span: "lg:col-span-2",
  },
];

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Capabilities"
        title="Built for pipelines that cannot be interrupted"
        description="The difference between an agent that impresses in a demo and one your technical director will approve is everything below the model."
      />

      <StaggerGroup className="mt-12 grid gap-4 lg:grid-cols-6">
        {features.map((feature) => (
          <StaggerItem
            key={feature.title}
            className={cn("h-full", feature.span)}
          >
            <Reveal className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border border-line bg-panel p-6",
                  feature.accent && "bg-panel-raised",
                )}
              >
                <feature.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
                <h3 className="text-balance-tight text-[17px] font-medium text-fg">
                  {feature.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{feature.body}</p>
              </div>
            </Reveal>
          </StaggerItem>
        ))}

        <StaggerItem className="lg:col-span-6">
          <Reveal>
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <Gauge className="mt-0.5 h-6 w-6 shrink-0 text-mint" weight="duotone" aria-hidden="true" />
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[17px] font-medium text-fg">Fast enough to stay in flow</h3>
                  <p className="max-w-[70ch] text-[13.5px] leading-relaxed text-muted">
                    Tool dispatch is a local call, not a network round-trip. Results stream back to
                    the agent as they land, so long operations report progress instead of stalling.
                  </p>
                </div>
              </div>
              <dl className="grid shrink-0 grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line/60 font-mono text-center">
                {[
                  { k: "4", v: "transports" },
                  { k: "0", v: "cloud deps" },
                  { k: "24/7", v: "local" },
                ].map((item) => (
                  <div key={item.v} className="bg-panel-raised px-4 py-3">
                    <dt className="text-base text-fg">{item.k}</dt>
                    <dd className="mt-0.5 text-[10px] tracking-wide text-muted uppercase">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </StaggerItem>
      </StaggerGroup>
    </Section>
  );
}
