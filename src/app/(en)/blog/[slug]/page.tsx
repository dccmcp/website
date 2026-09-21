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
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        en: `/blog/${post.slug}`,
        "zh-CN": `/zh/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <article className="relative pt-28 pb-20 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-x-0 top-0 -z-10 h-[420px] opacity-50" aria-hidden="true" />
        <Container>
          <div className="mx-auto max-w-[74ch]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-muted transition-colors hover:text-mint"
            >
              <ArrowLeft className="h-3.5 w-3.5" weight="bold" />
              all articles
            </Link>

            <div className="mt-8 flex flex-col gap-5">
              <Eyebrow>{post.category}</Eyebrow>
              <h1 className="text-balance-tight text-[30px] leading-[1.12] font-semibold text-fg sm:text-[40px] lg:text-[44px] lg:leading-[1.1]">
                {post.title}
              </h1>
              <p className="text-[16px] leading-relaxed text-muted sm:text-[17px]">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 border-y border-line/70 py-4 font-mono text-[11.5px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank className="h-3.5 w-3.5" weight="duotone" />
                  {formatDate(post.date)}
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
                <h2 className="text-[16px] font-medium text-fg">Try it on your own files</h2>
                <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-muted">
                  Install an integration, keep the read-only default, and see what your agent does
                  with real scene state.
                </p>
              </div>
              <ButtonLink href="/download" variant="outline" className="shrink-0">
                Coming soon
              </ButtonLink>
            </div>

            {related.length ? (
              <div className="mt-14 flex flex-col gap-5">
                <h2 className="text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
                  Keep reading
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
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
            author: { "@type": "Organization", name: site.name, url: site.url },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
            mainEntityOfPage: `${site.url}/blog/${post.slug}`,
            keywords: post.keywords.join(", "),
          }),
        }}
      />
    </>
  );
}
