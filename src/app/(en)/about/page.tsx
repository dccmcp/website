import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About — Why we build MCP integrations for production software",
  description:
    "DCCMCP builds production-grade MCP Servers and plugins for creative and engineering software. Here is what we believe about agent automation in real pipelines.",
  alternates: { canonical: "/about", languages: { en: "/about", "zh-CN": "/zh/about" } },
};

const principles = [
  {
    title: "Automation must be reversible",
    body: "If an operation cannot be undone, it should not be available to an agent without a human in the loop. We treat reversibility as a product requirement, not a feature flag.",
  },
  {
    title: "The record matters as much as the result",
    body: "Deliverables get reviewed, but the process behind them gets audited. A tool call that cannot be explained six months later is a liability, however good the output was.",
  },
  {
    title: "Local first, always",
    body: "Studio work is confidential by nature. The default architecture keeps your data on your hardware, and remote deployment is a deliberate choice rather than the only option.",
  },
  {
    title: "Vendors ship updates; we absorb them",
    body: "Host applications change constantly. Maintaining version support is unglamorous, ongoing work — and it is the difference between a demo and something a studio can rely on.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[440px]" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>About</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.05]">
                We build the layer between AI agents and the software professionals actually use
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">
                <p>
                  DCCMCP started from a specific frustration: AI agents are extraordinary at reasoning
                  about geometry, models and maps, and terrible at operating the applications those
                  things live in. The model is not the bottleneck. The interface is.
                </p>
                <p>
                  So we build that interface properly — typed tools, safety policies, checkpoints,
                  audit trails and version support — for the software that runs real production work
                  in 3D, CAD, GIS and computer vision.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="Principles"
          title="Four beliefs that shape what we ship"
          description="These are the positions we would defend in a technical review, and the reasons some features are deliberately not on our roadmap."
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-2">
          {principles.map((principle, index) => (
            <StaggerItem key={principle.title} className="flex flex-col gap-3 bg-panel p-6 sm:p-7">
              <span className="font-mono text-[11px] text-muted/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance-tight text-[18px] font-medium text-fg">
                {principle.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{principle.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <SectionHeading
            eyebrow="Independence"
            title="An independent integration vendor, on purpose"
            description="We are not a vendor's internal team and we do not pretend to be one. That independence is what lets us support several applications with one consistent contract — and to say plainly when something is not officially supported."
          />
          <Reveal from="right">
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-panel p-6 sm:p-7">
              <h3 className="text-[16px] font-medium text-fg">How we work with vendors</h3>
              <ul className="flex flex-col gap-3 text-[13.5px] leading-relaxed text-muted">
                <li>
                  We integrate through documented, public APIs and follow each project&apos;s license
                  terms.
                </li>
                <li>
                  We do not use vendor logos as our branding, and we state clearly that integrations
                  are third-party.
                </li>
                <li>
                  We report bugs upstream when we find them, and we keep our own compatibility matrix
                  honest when a vendor changes something.
                </li>
                <li>
                  Where we build on open-source components, we credit them and separate the
                  open-source and commercial parts of our product clearly.
                </li>
              </ul>
              <ButtonLink href="/legal/third-party-notice" variant="outline" className="mt-1 self-start">
                Read the third-party notice
                <ArrowRight className="h-4 w-4" weight="bold" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line/60">
        <Reveal className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-panel-raised p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[18px] font-medium text-fg">Working on a pipeline that needs this?</h2>
            <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-muted">
              We are hiring people who have shipped tooling for studios or engineering teams — and we
              are onboarding design partners who want to shape what ships first.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="/enterprise#contact">Talk to us</ButtonLink>
            <ButtonLink href="/integrations" variant="outline">
              See integrations
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
