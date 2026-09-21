import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, formatDate } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — MCP Tutorials & Engineering Notes",
  description:
    "Practical guides for connecting AI agents to Blender, Rhino, FreeCAD and QGIS: safety policies, tool design and what breaks in production.",
  alternates: { canonical: "/blog", languages: { en: "/blog", "zh-CN": "/zh/blog" } },
  keywords: [
    "MCP for Blender tutorial",
    "how to use MCP with Rhino",
    "MCP server for CAD",
    "AI agent GIS automation",
  ],
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Blog</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.05]">
                Notes on putting agents inside real production software
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                Tutorials, evaluation checklists and engineering post-mortems from building MCP
                integrations for 3D, CAD, GIS and vision software.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="pt-6">
        {featured ? (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col gap-6 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-mint/40 hover:bg-panel-raised sm:p-8 lg:flex-row lg:items-center lg:gap-10"
            >
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="mint">Featured</Badge>
                  <Badge>{featured.category}</Badge>
                </div>
                <h2 className="text-balance-tight text-2xl font-semibold text-fg sm:text-[30px]">
                  {featured.title}
                </h2>
                <p className="max-w-[64ch] text-[14.5px] leading-relaxed text-muted">
                  {featured.description}
                </p>
                <div className="flex items-center gap-4 font-mono text-[11.5px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarBlank className="h-3.5 w-3.5" weight="duotone" />
                    {formatDate(featured.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" weight="duotone" />
                    {featured.readingTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13.5px] text-mint lg:flex-col lg:items-end">
                Read the tutorial
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  weight="bold"
                />
              </div>
            </Link>
          </Reveal>
        ) : null}

        <StaggerGroup className="mt-6 grid gap-5 md:grid-cols-2">
          {rest.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-mint/40 hover:bg-panel-raised"
              >
                <Badge>{post.category}</Badge>
                <h2 className="text-balance-tight text-[19px] leading-snug font-medium text-fg">
                  {post.title}
                </h2>
                <p className="text-[13.5px] leading-relaxed text-muted">{post.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-4 font-mono text-[11px] text-muted">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-panel/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13.5px] text-muted">
              Want the technical detail behind these posts? Start with the{" "}
              <Link href="/docs" className="text-mint hover:text-mint-bright">
                documentation
              </Link>{" "}
              or compare{" "}
              <Link href="/integrations" className="text-mint hover:text-mint-bright">
                integrations
              </Link>
              .
            </p>
            <span className="font-mono text-[11px] text-muted/80">
              {posts.length} articles · updated {formatDate(posts[0]?.date ?? new Date().toISOString())}
            </span>
          </div>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${site.name} blog`,
            url: `${site.url}/blog`,
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              url: `${site.url}/blog/${post.slug}`,
              keywords: post.keywords.join(", "),
            })),
          }),
        }}
      />
    </>
  );
}
