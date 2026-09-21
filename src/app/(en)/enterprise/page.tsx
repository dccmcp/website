import type { Metadata } from "next";
import {
  Buildings,
  Lock,
  CloudSlash,
  UsersThree,
  FileCode,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enterprise — SSO, Self-Hosting & Private Bridges",
  description:
    "SSO/SAML, SCIM, air-gapped deployment, unlimited audit retention, SIEM export, signed builds and custom MCP bridges for in-house tools.",
  alternates: { canonical: "/enterprise", languages: { en: "/enterprise", "zh-CN": "/zh/enterprise" } },
  keywords: [
    "enterprise MCP server",
    "self-hosted MCP",
    "air-gapped MCP deployment",
    "custom CAD integration",
  ],
};

const pillars = [
  {
    icon: Lock,
    title: "Identity and access",
    body: "SSO/SAML, SCIM provisioning and role-based access control. Permissions map to your existing groups, so a TD can grant agent write access to one team and not another.",
  },
  {
    icon: CloudSlash,
    title: "Self-hosted or air-gapped",
    body: "Run the control plane inside your network with no outbound dependency. Update packages can be mirrored internally, and license checks work offline.",
  },
  {
    icon: FileCode,
    title: "Private integrations",
    body: "We build bridges for Maya, Houdini, Revit, Civil 3D, Ansys, KiCad, proprietary CAD or your in-house asset system — with the same tool contract as public integrations.",
  },
  {
    icon: UsersThree,
    title: "Governance at scale",
    body: "Unlimited audit retention, SIEM and webhook export, approval workflows routed to reviewers, and per-project policy enforcement.",
  },
  {
    icon: Handshake,
    title: "Named support",
    body: "A solutions engineer who knows your pipeline, a 99.9% support SLA, and a defined response window for vendor version breakage.",
  },
  {
    icon: Buildings,
    title: "Procurement-ready",
    body: "Signed builds, SBOM delivery, security questionnaires, DPA and standard enterprise terms. We work with your legal and IT teams directly.",
  },
];

const steps = [
  {
    step: "01",
    title: "Technical scoping call",
    body: "45 minutes with an engineer. We map your software, the tasks you want automated, and the write access you are uncomfortable granting.",
  },
  {
    step: "02",
    title: "Pilot on one workflow",
    body: "We deploy against a single real workflow in a copy of your production data, with a read-only policy, and measure where the agent actually helps.",
  },
  {
    step: "03",
    title: "Rollout with policy",
    body: "We write your policy profiles, wire approvals into your review process and connect audit export to your monitoring stack.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[480px]" aria-hidden="true" />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>Enterprise</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance-tight text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.05]">
                  Agent automation that passes your security review
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                  Large studios and engineering teams do not fail at connecting a model to software.
                  They fail at governance: who approved the write access, where the logs live, and
                  what happens when a vendor ships a breaking update. Enterprise answers those
                  questions before your procurement team asks them.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-3">
                  <Badge tone="mint">SSO / SAML</Badge>
                  <Badge tone="mint">SCIM</Badge>
                  <Badge tone="mint">Air-gapped</Badge>
                  <Badge tone="mint">Signed builds</Badge>
                  <Badge tone="mint">SIEM export</Badge>
                  <Badge tone="mint">99.9% SLA</Badge>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line/60 sm:grid-cols-3">
                  {[
                    { k: "5 days", v: "typical pilot to first result" },
                    { k: "Offline", v: "license and update mirroring" },
                    { k: "1 engineer", v: "named on your account" },
                  ].map((item) => (
                    <div key={item.v} className="bg-panel px-4 py-3.5">
                      <dt className="font-mono text-[15px] text-fg">{item.k}</dt>
                      <dd className="mt-1 text-[12px] leading-snug text-muted">{item.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
              <div className="glass rounded-2xl p-6 sm:p-7">
                <h2 className="text-[18px] font-medium text-fg">Talk to us about your deployment</h2>
                <p className="mt-2 mb-6 text-[13.5px] leading-relaxed text-muted">
                  Enterprise and private-bridge enquiries only. If you just want to try DCCMCP,
                  the Community edition is a free download — no call required.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="What enterprise adds"
          title="The controls your IT team will ask about"
          description="Studio covers the workflow. Enterprise covers the paperwork, the access model and the failure modes that only show up at organizational scale."
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="flex flex-col gap-4 bg-panel p-6">
              <pillar.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
              <h3 className="text-[16px] font-medium text-fg">{pillar.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{pillar.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How onboarding works"
          title="Pilot on one workflow, then widen"
          description="Nobody should approve blanket agent access on day one. We start narrow, measure, and expand only where the results justify it."
        />
        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((item) => (
            <StaggerItem key={item.step} className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6">
              <span className="font-mono text-[11px] text-mint">{item.step}</span>
              <h3 className="text-[16px] font-medium text-fg">{item.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section id="contact" className="border-t border-line/60">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="flex flex-col gap-5">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="text-balance-tight text-3xl font-semibold text-fg sm:text-4xl">
              Enterprise and private bridges
            </h2>
            <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
              Enterprise enquiries go to the engineers who build the integrations. If we are not the
              right fit, we will tell you on the first call.
            </p>
            <div className="mt-2 flex flex-col gap-1.5 text-[14px]">
              <a className="text-mint hover:text-mint-bright" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <p className="text-[13px] text-muted/80">
                Sales, security questionnaires and procurement all reach the same inbox — mention
                which one you need and we will route it.
              </p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-line pt-5 text-[13px]">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                  Response time
                </dt>
                <dd className="text-fg">1 business day</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                  Timezone coverage
                </dt>
                <dd className="text-fg">EU · APAC · Americas</dd>
              </div>
            </dl>
          </div>

          <Reveal from="right">
            <div className="panel rounded-2xl p-6 sm:p-7">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
