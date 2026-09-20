import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Translate } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "该页面暂无中文版",
  description: "此页面目前只有英文版。你可以返回中文首页，或查看英文原版。",
  robots: { index: false, follow: true },
  alternates: { canonical: "/zh" },
};

/**
 * Legal documents are deliberately English-only: the English text is the one
 * that has been reviewed, and a machine translation of a contract is worse
 * than no translation at all. Everything else here is a page we have not
 * translated yet.
 */
const ENGLISH_ONLY = new Set(["legal"]);

/**
 * Fallback for Chinese routes that have no translation yet. Keeps the language
 * switcher from ever landing on a 404 while the remaining pages are translated.
 */
export default async function UntranslatedPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = "/" + slug.join("/");
  const englishTitle = slug.length ? path : "/";
  const englishOnly = slug.length > 0 && ENGLISH_ONLY.has(slug[0]);

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="aura absolute inset-x-0 top-0 -z-10 h-[420px]" aria-hidden="true" />
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>语言</Eyebrow>
          <h1 className="text-balance-tight mt-4 text-[30px] leading-[1.15] font-semibold text-fg sm:text-[38px]">
            {englishOnly ? "该文件仅提供英文版" : "该页面暂无中文版"}
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            {englishOnly
              ? "法律文件只提供英文版本：经过审核的是英文正文，而合同条款的机器翻译比不翻译更糟。这个页面只有英文版："
              : "中文内容正在逐步补齐，首页、定价、集成、文档、博客与企业版页面均已完成翻译。这个页面暂时只有英文版："}
          </p>
          <p className="mt-3 font-mono text-[13px] text-mint">{englishTitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/zh" size="lg">
              <ArrowLeft className="h-4 w-4" weight="bold" />
              返回中文首页
            </ButtonLink>
            <ButtonLink href={path} variant="outline" size="lg">
              <Translate className="h-4 w-4" weight="duotone" />
              查看英文原版
            </ButtonLink>
          </div>

          <p className="mt-10 text-[13.5px] leading-relaxed text-muted">
            需要中文资料或希望我们优先翻译某个页面？
            <Link href="/zh/download" className="ml-1 text-mint hover:text-mint-bright">
              告诉我们
            </Link>
            。
          </p>
        </div>
      </Container>
    </section>
  );
}
