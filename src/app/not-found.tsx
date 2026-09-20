import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { integrations } from "@/lib/integrations";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="aura absolute inset-x-0 top-0 -z-10 h-[420px]" aria-hidden="true" />
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>404</Eyebrow>
          <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.1] font-semibold text-fg sm:text-[42px]">
            That page is not connected
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            The URL you requested does not exist — it may have been renamed, or the integration may
            not have shipped yet. Here is where most people were heading.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
              <ArrowRight className="h-4 w-4" weight="bold" />
            </ButtonLink>
            <ButtonLink href="/integrations" variant="outline" size="lg">
              All integrations
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {integrations.map((integration) => (
              <li key={integration.slug}>
                <Link
                  href={`/${integration.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-[13.5px] text-fg transition-colors hover:border-mint/40 hover:bg-panel-raised"
                >
                  {integration.name}
                  <ArrowRight className="h-3.5 w-3.5 text-muted" weight="bold" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/docs"
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-[13.5px] text-fg transition-colors hover:border-mint/40 hover:bg-panel-raised"
              >
                Documentation
                <ArrowRight className="h-3.5 w-3.5 text-muted" weight="bold" />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
