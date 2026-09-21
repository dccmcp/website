import type { Metadata } from "next";
import { Check, Minus, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { plans, compare, pricingFaq } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Free Community, Studio $39, Enterprise",
  description:
    "The Community edition is free with a read-only default. Studio adds version history, shared policies and audit retention; Enterprise adds SSO and self-hosting.",
  alternates: { canonical: "/pricing", languages: { en: "/pricing", "zh-CN": "/zh/pricing" } },
  keywords: ["MCP pricing", "MCP server pricing", "studio MCP license", "enterprise MCP deployment"],
};

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 text-mint" weight="bold" />;
  if (value === false) return <Minus className="h-4 w-4 text-line" weight="bold" />;
  return <span className="text-[13px] text-muted">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[460px]" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Pricing</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[50px] lg:leading-[1.04]">
                Free to start. Priced per seat when a team depends on it.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                Every plan includes the same integrations and the same safety engine. Paid plans add
                governance, scale and support — not features you need a sales call to see.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="pt-4">
        <StaggerGroup className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col gap-6 rounded-2xl border p-6 sm:p-7",
                  plan.featured
                    ? "border-mint/40 bg-panel-raised shadow-[0_0_0_1px_rgba(45,212,191,0.12)]"
                    : "border-line bg-panel",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[16px] font-medium text-fg">{plan.name}</h2>
                    <p className="max-w-[26ch] text-[12.5px] leading-snug text-muted">
                      {plan.bestFor}
                    </p>
                  </div>
                  {plan.featured ? (
                    <Badge tone="mint" className="shrink-0">
                      Most popular
                    </Badge>
                  ) : null}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-fg">
                    {plan.price}
                  </span>
                  {plan.cadence ? (
                    <span className="text-[12.5px] text-muted">{plan.cadence}</span>
                  ) : null}
                </div>

                <p className="text-[13.5px] leading-relaxed text-muted">{plan.blurb}</p>

                <ul className="flex flex-col gap-2.5">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" weight="bold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={plan.cta.href}
                  variant={plan.featured ? "primary" : "outline"}
                  className="mt-auto w-full"
                >
                  {plan.cta.label}
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </ButtonLink>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-6">
          <p className="text-center text-[12.5px] text-muted">
            Prices in USD, billed annually or monthly. Academic and early-stage discounts
            available — <a className="text-mint hover:text-mint-bright" href="mailto:support@dccmcp.com">ask us</a>.
          </p>
        </Reveal>
      </Section>

      <Section id="compare" className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="Compare"
          title="Every difference between the plans"
          description="No asterisks. If something is limited, the limit is written here."
        />

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line">
          <div className="min-w-[720px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-panel-raised">
                  <th className="w-[40%] px-5 py-4 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                    Feature
                  </th>
                  {["Community", "Studio", "Enterprise"].map((name) => (
                    <th
                      key={name}
                      className="px-5 py-4 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              {compare.map((group) => (
                <tbody key={group.group}>
                  <tr className="bg-panel">
                    <th
                      colSpan={4}
                      className="border-t border-line px-5 py-3 text-[11px] font-semibold tracking-[0.14em] text-mint uppercase"
                    >
                      {group.group}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.feature} className="border-t border-line/70 bg-panel">
                      <td className="px-5 py-3.5 text-[13.5px] text-fg">{row.feature}</td>
                      <td className="px-5 py-3.5">
                        <Cell value={row.community} />
                      </td>
                      <td className="px-5 py-3.5">
                        <Cell value={row.studio} />
                      </td>
                      <td className="px-5 py-3.5">
                        <Cell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Reveal>
      </Section>

      <Faq items={pricingFaq} id="pricing-faq" />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pricingFaq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
