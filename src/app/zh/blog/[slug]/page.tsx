import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/sections/mdx-components";
import { ArrowLeft, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts("zh").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "zh");
  if (!post) return {};

  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/zh/blog/${post.slug}`,
      languages: { en: `/blog/${post.slug}`, "zh-CN": `/zh/blog/${post.slug}` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/zh/blog/${post.slug}`,
      publishedTime: post.date,
      locale: "zh_CN",
    },
  };
}

export default async function ChineseBlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug, "zh");
  if (!post) notFound();

  const related = getAllPosts("zh")
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <article className="relative pt-28 pb-20 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-x-0 top-0 -z-10 h-[420px] opacity-50" aria-hidden="true" />
        <Container>
          <div className="mx-auto max-w-[74ch]">
            <Link
              href="/zh/blog"
              className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-muted transition-colors hover:text-mint"
            >
              <ArrowLeft className="h-3.5 w-3.5" weight="bold" />
              全部文章
            </Link>

            <div className="mt-8 flex flex-col gap-5">
              <Eyebrow>{post.category}</Eyebrow>
              <h1 className="text-balance-tight text-[30px] leading-[1.2] font-semibold text-fg sm:text-[40px] lg:text-[44px] lg:leading-[1.18]">
                {post.title}
              </h1>
              <p className="text-[16px] leading-relaxed text-muted sm:text-[17px]">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 border-y border-line/70 py-4 font-mono text-[11.5px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank className="h-3.5 w-3.5" weight="duotone" />
                  {formatDate(post.date, "zh")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" weight="duotone" />
                  {post.readingTime}
                </span>
                <span className="ml-auto">{site.name}</span>
              </div>
            </div>

            <div className="mt-10">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-line bg-panel-raised p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[16px] font-medium text-fg">在你的真实文件上试一次</h2>
                <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-muted">
                  装上集成，保留默认的只读策略，看看你的 Agent 面对真实场景状态会做什么。
                </p>
              </div>
              <ButtonLink href="/zh/download" variant="outline" className="shrink-0">
                即将发布
              </ButtonLink>
            </div>

            {related.length ? (
              <div className="mt-14 flex flex-col gap-5">
                <h2 className="text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
                  继续阅读
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/zh/blog/${item.slug}`}
                      className="group flex flex-col gap-3 rounded-xl border border-line bg-panel p-5 transition-colors hover:border-mint/40 hover:bg-panel-raised"
                    >
                      <Badge>{item.category}</Badge>
                      <span className="text-[15px] leading-snug font-medium text-fg">
                        {item.title}
                      </span>
                      <span className="font-mono text-[11px] text-muted">{item.readingTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            inLanguage: "zh-CN",
            author: { "@type": "Organization", name: site.name, url: site.url },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            mainEntityOfPage: `${site.url}/zh/blog/${post.slug}`,
            keywords: post.keywords.join(", "),
          }),
        }}
      />
    </>
  );
}
