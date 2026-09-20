import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
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
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      {...props}
      className="text-balance-tight mt-12 mb-4 scroll-mt-24 text-[24px] font-semibold text-fg sm:text-[28px]"
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} className="mt-9 mb-3 text-[19px] font-medium text-fg sm:text-[21px]" />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p {...props} className="my-4 text-[15px] leading-[1.75] text-muted" />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className="my-5 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted" />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol {...props} className="my-5 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted" />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} className="pl-1" />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong {...props} className="font-medium text-fg" />
  ),
  a: (props: React.ComponentProps<"a">) => {
    const href = props.href ?? "";
    const internal = href.startsWith("/");
    if (internal) {
      return <Link {...props} href={href} className="text-mint underline decoration-mint/40 underline-offset-4 hover:text-mint-bright" />;
    }
    return (
      <a
        {...props}
        className="text-mint underline decoration-mint/40 underline-offset-4 hover:text-mint-bright"
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  },
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="my-8 border-l-2 border-mint/50 pl-5 text-[16px] leading-relaxed text-fg/90 italic"
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      {...props}
      className="rounded-md border border-line/80 bg-panel-raised px-1.5 py-0.5 font-mono text-[13px] text-mint-bright"
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl border border-line bg-ink/80 p-5 font-mono text-[12.5px] leading-relaxed text-mint/90 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-7 overflow-x-auto rounded-xl border border-line">
      <table {...props} className="w-full border-collapse text-left text-[13.5px]" />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => <thead {...props} className="bg-panel-raised" />,
  th: (props: React.ComponentProps<"th">) => (
    <th
      {...props}
      className="border-b border-line px-4 py-3 font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase"
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td {...props} className="border-b border-line/60 px-4 py-3 align-top text-muted" />
  ),
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} className="my-7 w-full rounded-xl border border-line" />
  ),
};

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
