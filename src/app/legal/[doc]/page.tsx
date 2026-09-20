import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/section";
import { legalDocs, getLegalDoc } from "@/lib/legal";

type Params = { doc: string };

export function generateStaticParams(): Params[] {
  return legalDocs.map((doc) => ({ doc: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { doc } = await params;
  const item = getLegalDoc(doc);
  if (!item) return {};

  return {
    title: item.metaTitle,
    description: item.description,
    alternates: { canonical: `/legal/${item.slug}` },
  };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { doc } = await params;
  const item = getLegalDoc(doc);
  if (!item) notFound();

  return (
    <article className="pt-28 pb-20 sm:pt-32 lg:pt-36">
      <Container>
        <div className="mx-auto max-w-[74ch]">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-balance-tight mt-4 text-[30px] font-semibold text-fg sm:text-[40px]">
            {item.title}
          </h1>
          <p className="mt-4 font-mono text-[12px] text-muted">Last updated {item.updated}</p>

          <div className="mt-8 flex flex-col gap-4">
            {item.intro.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-[1.75] text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <nav aria-label="Document sections" className="mt-10 rounded-xl border border-line bg-panel p-5">
            <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
              Contents
            </p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {item.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#section-${index + 1}`}
                    className="text-[13px] text-muted transition-colors hover:text-mint"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 flex flex-col gap-10">
            {item.sections.map((section, index) => (
              <section key={section.heading} className="flex scroll-mt-24 flex-col gap-4" id={`section-${index + 1}`}>
                <h2 className="text-balance-tight text-[21px] font-semibold text-fg sm:text-[23px]">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[14.5px] leading-[1.75] text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="flex list-disc flex-col gap-2 pl-5 text-[14.5px] leading-relaxed text-muted">
                    {section.list.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 rounded-xl border border-line bg-panel/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
            <p className="text-[13px] leading-relaxed text-muted">
              This document is a plain-language baseline written for technical review and is not
              legal advice. Enterprise order forms, a DPA and negotiated terms take precedence where
              they apply. Questions:{" "}
              <a className="text-mint hover:text-mint-bright" href="mailto:support@dccmcp.com">
                support@dccmcp.com
              </a>
              .
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-[13px]">
            {legalDocs
              .filter((entry) => entry.slug !== item.slug)
              .map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/legal/${entry.slug}`}
                  className="text-muted transition-colors hover:text-mint"
                >
                  {entry.title}
                </Link>
              ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
