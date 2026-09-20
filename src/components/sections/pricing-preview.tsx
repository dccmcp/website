import Link from "next/link";
import { Check, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeading } from "@/components/ui/section";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <Section id="pricing" className="border-b border-line/60">
      <SectionHeading
        eyebrow="Pricing"
        title="Free at launch, upgrade when a team depends on it"
        description="The Community plan includes every public integration with a read-only default. Studio and Enterprise add the safety layer production pipelines need — checkpointed writes with rollback — plus governance, scale and support."
      />

      <StaggerGroup className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <StaggerItem key={plan.id} className="h-full">
            <div
              className={cn(
                "flex h-full flex-col gap-6 rounded-2xl border p-6",
                plan.featured
                  ? "border-mint/40 bg-panel-raised shadow-[0_0_0_1px_rgba(45,212,191,0.12)]"
                  : "border-line bg-panel",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-medium text-fg">{plan.name}</h3>
                  <p className="max-w-[26ch] text-[12.5px] leading-snug text-muted">{plan.bestFor}</p>
                </div>
                {plan.featured ? <Badge tone="mint" className="shrink-0">Most popular</Badge> : null}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-fg">{plan.price}</span>
                {plan.cadence ? (
                  <span className="text-[12.5px] text-muted">{plan.cadence}</span>
                ) : null}
              </div>

              <p className="text-[13.5px] leading-relaxed text-muted">{plan.blurb}</p>

              <ul className="flex flex-col gap-2.5">
                {plan.includes.slice(0, 5).map((item) => (
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
              </ButtonLink>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-8 flex justify-center">
        <Link
          href="/pricing#compare"
          className="group inline-flex items-center gap-1.5 text-[13.5px] text-mint transition-colors hover:text-mint-bright"
        >
          Compare every plan in detail
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            weight="bold"
          />
        </Link>
      </div>
    </Section>
  );
}
