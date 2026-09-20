import { FileText, ShieldCheck, ClockCounterClockwise, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading } from "@/components/ui/section";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

const pillars = [
  {
    icon: FileText,
    title: "Published tool surfaces",
    body: "Every integration documents its tools, arguments and risk class in public. You can read exactly what an agent is able to do before you install anything.",
  },
  {
    icon: ShieldCheck,
    title: "A written security posture",
    body: "Local-first transport, read-only defaults, checkpointed writes and exportable audit logs — described as a policy you can hand to your IT team.",
  },
  {
    icon: ClockCounterClockwise,
    title: "A dated support matrix",
    body: "We publish which host application versions each release supports, and how long after a vendor release we ship an update. No silent breakage.",
  },
];

export function Proof() {
  return (
    <Section id="early-access" className="border-b border-line/60">
      <SectionHeading
        eyebrow="Early access"
        title="We would rather show you the contract than a logo wall"
        description={
          <>
            DCCMCP is in early access with a small group of studios and engineering teams. Instead of
            borrowed social proof, we publish the things that actually decide whether an
            automation platform is safe to deploy: the tool list, the policy defaults and the
            support matrix.
          </>
        }
      />

      <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
        {pillars.map((pillar) => (
          <StaggerItem
            key={pillar.title}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6"
          >
            <pillar.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
            <h3 className="text-[16px] font-medium text-fg">{pillar.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-muted">{pillar.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.08} className="mt-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-line bg-panel-raised p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[16px] font-medium text-fg">Design partner program</h3>
            <p className="max-w-[64ch] text-[13.5px] leading-relaxed text-muted">
              We are onboarding studios, AEC firms and engineering teams now. Design partners get
              Studio seats at no cost during the program, direct access to the engineers building
              the integrations, and a vote on what ships next.
            </p>
          </div>
          <ButtonLink href="/enterprise#contact" variant="outline" className="shrink-0">
            Apply to the program
            <ArrowRight className="h-4 w-4" weight="bold" />
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
