import Link from "next/link";
import {
  ArrowRight,
  Code,
  FileCsv,
  ArrowsClockwise,
  ShieldCheck,
  GridFour,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge, RiskPill } from "@/components/ui/badge";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Faq } from "@/components/sections/faq";
import { BrandIcon } from "@/components/site/brand-icon";
import { FinalCta } from "@/components/sections/final-cta";
import { getIntegration, integrations, relatedIntegrations, type Integration } from "@/lib/integrations";
import { agentIconFor } from "@/lib/agents";
import { getIntegrationZh } from "@/lib/integrations.zh";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

const LAST_REVIEWED_FALLBACK = "2026-09-20";

const T = {
  en: {
    overview: "Overview",
    whatIs: (n: string) => `What is ${n}?`,
    whyBreaks: "Why it breaks",
    whyBreaksTitle: (sw: string) => `What goes wrong when agents drive ${sw} without a contract`,
    howWorks: "How it works",
    howWorksTitle: (n: string) => `How ${n} keeps intent, structure and traceability intact`,
    tools: "Tool reference",
    toolsTitle: (n: string) => `${n} tools — every tool and its risk class`,
    toolsDesc: "Agents discover this list at connect time. You decide which entries are auto-approved, which need a human and which are denied in production files.",
    tool: "Tool",
    description: "Description",
    access: "Access",
    install: "Install",
    installTitle: (n: string) => `Install ${n} in four steps`,
    installDesc: (sw: string) => `Everything runs locally. The server binds to loopback by default and only exposes the tools you approve in ${sw}.`,
    prerelease: "Pre-release.",
    prereleaseBody: (n: string) => `These commands describe the interface we are shipping for ${n} — the packages are not published yet.`,
    prereleaseLink: (n: string) => `Get notified when ${n} launches`,
    agentsTitle: (n: string) => `${n} works with the agents you already use`,
    agentsNote: "Any other MCP-compatible client works too — one config entry, stdio by default.",
    readDocs: "Read the docs",
    related: "Also available",
    relatedTitle: (sw: string) => `Other MCP integrations that pair with ${sw}`,
    viewIntegration: "View integration",
    allCount: (n: number) => `${n} integrations available`,
    allDesc: "Compare tool lists, support matrices and policies for every supported application.",
    browseAll: "Browse all integrations",
    skipLater: "Skip to the FAQ",
  },
  zh: {
    overview: "概述",
    whatIs: (n: string) => `什么是 ${n}？`,
    whyBreaks: "为什么会失败",
    whyBreaksTitle: (sw: string) => `没有契约时，让 Agent 驱动 ${sw} 会出什么问题`,
    howWorks: "如何工作",
    howWorksTitle: (n: string) => `${n} 如何保住设计意图、结构与可追溯性`,
    tools: "工具参考",
    toolsTitle: (n: string) => `${n} 工具清单与风险等级`,
    toolsDesc: "Agent 在连接时就能发现这份清单。你可以决定哪些自动放行、哪些需要人工确认、哪些在生产文件中直接禁用。",
    tool: "工具",
    description: "说明",
    access: "权限",
    install: "安装",
    installTitle: (n: string) => `四步安装 ${n}`,
    installDesc: (sw: string) => `全部本地运行。服务默认只绑定回环地址，且只暴露你在 ${sw} 中批准的工具。`,
    prerelease: "预发布。",
    prereleaseBody: () => "以下命令描述的是我们即将发布的接口，软件包尚未发布。",
    prereleaseLink: (n: string) => `订阅 ${n} 发布通知`,
    agentsTitle: (n: string) => `${n} 兼容你正在使用的 Agent`,
    agentsNote: "任何其他兼容 MCP 的客户端同样可用——只需一条配置，默认走 stdio。",
    readDocs: "阅读文档",
    related: "其他集成",
    relatedTitle: (sw: string) => `常与 ${sw} 搭配使用的其他 MCP 集成`,
    viewIntegration: "查看集成",
    allCount: (n: number) => `共 ${n} 个集成`,
    allDesc: "对比每个受支持软件的工具清单、版本支持矩阵与策略配置。",
    browseAll: "浏览全部集成",
    skipLater: "跳到常见问题",
  },
} as const;



export function integrationMetadata(slug: string, locale: Locale = "en") {
  const base = getIntegration(slug);
  const zh = locale === "zh" ? getIntegrationZh(slug) : undefined;
  const integration = base
    ? { ...base, metaTitle: zh?.tagline ? `${base.name} — 用 AI Agent 连接 ${base.software}` : base.metaTitle, metaDescription: zh?.summary ?? base.metaDescription }
    : undefined;
  if (!integration) throw new Error(`Unknown integration: ${slug}`);

  return {
    title: integration.metaTitle,
    description: integration.metaDescription,
    keywords: integration.keywords,
    alternates: {
      canonical: `/${integration.slug}`,
      languages: {
        en: `/${integration.slug}`,
        "zh-CN": `/zh/${integration.slug}`,
      },
    },
    openGraph: {
      title: integration.metaTitle,
      description: integration.metaDescription,
      url: `/${integration.slug}`,
      type: "article" as const,
    },
  };
}

function StructuredData({ integration }: { integration: Integration }) {
  const url = `${site.url}/${integration.slug}`;

  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: integration.name,
      alternateName: [`MCP server for ${integration.software}`, `${integration.software} MCP integration`],
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: integration.category,
      operatingSystem: "macOS, Windows, Linux",
      description: integration.metaDescription,
      url,
      softwareRequirements: integration.specs.find((spec) => spec.label === "Host software")?.value,
      featureList: integration.tools.map((tool) => `${tool.name} — ${tool.description}`),
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Community plan is free; Studio and Enterprise plans add governance and scale.",
      },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Integrations", item: `${site.url}/integrations` },
        { "@type": "ListItem", position: 3, name: integration.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: integration.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/** Merge the Chinese overrides over the English record. */
function localize(integration: Integration, locale: Locale) {
  if (locale === "en") return { ...integration, toolNote: undefined as string | undefined };

  const zh = getIntegrationZh(integration.slug);
  if (!zh) return { ...integration, toolNote: undefined as string | undefined };

  return {
    ...integration,
    tagline: zh.tagline,
    summary: zh.summary,
    heroLead: zh.heroLead,
    problems: zh.problems,
    workflows: zh.workflows,
    install: integration.install.map((step, index) => ({
      ...step,
      title: zh.install[index]?.title ?? step.title,
      body: zh.install[index]?.body ?? step.body,
    })),
    faq: zh.faq,
    specs: integration.specs.map((spec) => ({
      ...spec,
      label: zh.specLabels[spec.label] ?? spec.label,
    })),
    toolNote: zh.toolNote,
  };
}

export function IntegrationPage({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const record = getIntegration(slug);
  if (!record) return null;
  const integration = localize(record, locale);

  const related = relatedIntegrations(integration.slug, 3);
  const copy = T[locale];
  const reviewed = integration.updated ?? LAST_REVIEWED_FALLBACK;
  const highlights = integration.tools.slice(0, 4).map((tool) => tool.name);
  const sampleTools = highlights.length
    ? `${highlights.slice(0, -1).join(", ")} and ${highlights[highlights.length - 1]}`
    : "";

  return (
    <>
      <StructuredData integration={integration} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[520px]" aria-hidden="true" />
        <Container>
          <Reveal className="mb-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-mint">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/integrations" className="transition-colors hover:text-mint">
                    integrations
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-fg">{integration.slug}</li>
              </ol>
            </nav>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              <Reveal className="flex flex-wrap items-center gap-3">
                <Badge tone={integration.status === "Stable" ? "mint" : "neutral"}>
                  {integration.status}
                </Badge>
                <span className="font-mono text-[11.5px] text-muted">{integration.category}</span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="text-balance-tight text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[50px] lg:leading-[1.04]">
                  {integration.name} — Connect AI Agents to {integration.software}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                  {integration.heroLead}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href="/docs#quickstart" size="lg">
                    Install {integration.software} integration
                    <ArrowRight className="h-4 w-4" weight="bold" />
                  </ButtonLink>
                  <ButtonLink href="/download" variant="outline" size="lg">
                    Coming soon
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-mint" weight="duotone" />
                    Read-only by default
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Code className="h-4 w-4 text-mint" weight="duotone" />
                    {integration.tools.length} typed tools
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ArrowsClockwise className="h-4 w-4 text-mint" weight="duotone" />
                    Checkpointed writes
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.12}>
              <div className="glass overflow-hidden rounded-2xl">
                <div className="border-b border-line/70 px-5 py-3">
                  <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                    Technical specification
                  </span>
                </div>
                <dl className="divide-y divide-line/60">
                  {integration.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1 px-5 py-3.5">
                      <dt className="font-mono text-[10.5px] tracking-[0.12em] text-muted/80 uppercase">
                        {spec.label}
                      </dt>
                      <dd className="text-[13.5px] leading-snug text-fg">{spec.value}</dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <dt className="font-mono text-[10.5px] tracking-[0.12em] text-muted/80 uppercase">
                      Last reviewed
                    </dt>
                    <dd className="font-mono text-[12px] text-muted">{reviewed}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Definition block: answers the primary search intent in plain language. */}
      <Section className="border-y border-line/60 bg-ink-deep/40 py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <SectionHeading
            eyebrow={copy.overview}
            title={copy.whatIs(integration.name)}
            className="lg:sticky lg:top-24 lg:self-start"
          />
          <Reveal from="right" className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed text-muted">
              {integration.name} is a local MCP server plus a {integration.software} plugin that
              connects AI agents to a real {integration.software} session. Agents discover{" "}
              {integration.tools.length} typed tools — including {sampleTools} — and call them to
              inspect, create, modify and validate work inside the live application.
            </p>
            <p className="text-[15px] leading-relaxed text-muted">
              Unlike generated {integration.software} scripts, every call is validated against your
              current document, classified as <span className="font-mono text-[13px] text-sky-200">read</span>,{" "}
              <span className="font-mono text-[13px] text-mint-bright">write</span> or{" "}
              <span className="font-mono text-[13px] text-amber-200">execute</span>, and recorded in
              an audit log. {integration.software} stays open, the document stays live, and
              destructive operations are checkpointed so they can be rolled back.
            </p>
            <p className="text-[15px] leading-relaxed text-muted">
              It works with {integration.agents.join(", ")} over stdio or streamable HTTP.
            </p>
            <ul className="mt-1 grid gap-2">
              {integration.specs.slice(0, 3).map((spec) => (
                <li key={spec.label} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                  <span>
                    <span className="text-fg">{spec.label}:</span> {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Problems */}
      <Section className="border-b border-line/60">
        <SectionHeading
          eyebrow={copy.whyBreaks}
          title={copy.whyBreaksTitle(integration.software)}
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-3">
          {integration.problems.map((problem, index) => (
            <StaggerItem key={problem.title} className="flex flex-col gap-3 bg-panel p-6">
              <span className="font-mono text-[11px] text-muted/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance-tight text-[16px] font-medium text-fg">
                {problem.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{problem.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* How the integration solves it */}
      <Section>
        <SectionHeading
          eyebrow={copy.howWorks}
          title={copy.howWorksTitle(integration.name)}
          description={integration.summary}
        />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {integration.workflows.map((workflow) => (
            <StaggerItem
              key={workflow.title}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-6"
            >
              <h3 className="text-[16px] font-medium text-fg">{workflow.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{workflow.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Tool reference */}
      <Section id="tools" className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow={copy.tools}
          title={copy.toolsTitle(integration.name)}
          description={copy.toolsDesc}
        />

        {integration.toolNote ? (
          <Reveal className="mt-8">
            <p className="rounded-xl border border-line bg-panel/60 px-4 py-3 text-[13px] text-muted">
              {integration.toolNote}
            </p>
          </Reveal>
        ) : null}

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line">
          <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_auto] gap-4 border-b border-line bg-panel-raised px-5 py-3 md:grid">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
              {copy.tool}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
              {copy.description}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
              {copy.access}
            </span>
          </div>
          <ul className="divide-y divide-line/60">
            {integration.tools.map((tool) => (
              <li
                key={tool.name}
                className="grid gap-2 bg-panel px-5 py-4 transition-colors hover:bg-panel-raised md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_auto] md:items-start md:gap-4"
              >
                <code className="font-mono text-[12.5px] text-mint">{tool.name}</code>
                <span className="text-[13.5px] leading-relaxed text-muted">{tool.description}</span>
                <RiskPill risk={tool.risk} className="justify-self-start md:justify-self-end" />
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Install */}
      <Section id="install">
        <SectionHeading
          eyebrow={copy.install}
          title={copy.installTitle(integration.name)}
          description={copy.installDesc(integration.software)}
        />

        <Reveal className="mt-8">
          <div className="flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/8 px-4 py-3.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" weight="bold" />
            <p className="text-[13px] leading-relaxed text-amber-100">
              <span className="font-medium">{copy.prerelease}</span> {copy.prereleaseBody(integration.name)}{" "}
              <Link href="/download" className="underline decoration-amber-200/40 underline-offset-4">
                Get notified when {integration.name} launches
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {integration.install.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-panel p-6">
                <span className="font-mono text-[11px] text-mint">
                  STEP {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-medium text-fg">{step.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{step.body}</p>
                {step.code ? (
                  <pre className="mt-auto overflow-x-auto rounded-lg border border-line/80 bg-ink/70 p-4 font-mono text-[11.5px] leading-relaxed text-mint/90">
                    {step.code}
                  </pre>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel-raised p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <FileCsv className="mt-0.5 h-6 w-6 shrink-0 text-mint" weight="duotone" aria-hidden="true" />
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[16px] font-medium text-fg">
                  {integration.name} works with the agents you already use
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {integration.agents.map((agent) => (
                    <li
                      key={agent}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-ink/60 px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      <BrandIcon slug={agentIconFor(agent)} size="sm" className="h-5 w-5 rounded-md border-0 bg-transparent" />
                      {agent}
                    </li>
                  ))}
                </ul>
                <p className="text-[12.5px] leading-relaxed text-muted/80">
                  Any other MCP-compatible client works too — one config entry, stdio by default.
                </p>
              </div>
            </div>
            <ButtonLink href="/docs" variant="outline" className="shrink-0">
              Read the docs
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      {/* Related integrations: same category first. */}
      <Section className="border-t border-line/60">
        <SectionHeading
          eyebrow={copy.related}
          title={copy.relatedTitle(integration.software)}
        />
        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <StaggerItem key={item.slug}>
              <Link
                href={`/${item.slug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-mint/40 hover:bg-panel-raised"
              >
                <h3 className="text-[16px] font-medium text-fg">{item.name}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{item.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] text-mint">
                  {copy.viewIntegration}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    weight="bold"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <GridFour className="mt-0.5 h-6 w-6 shrink-0 text-mint" weight="duotone" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-medium text-fg">
                  {integrations.length} integrations available
                </h3>
                <p className="text-[13.5px] text-muted">
                  Compare tool lists, support matrices and policies for every supported application.
                </p>
              </div>
            </div>
            <ButtonLink href="/integrations" variant="outline" className="shrink-0">
              Browse all integrations
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Faq id="faq" items={integration.faq} locale={locale} />
      <FinalCta />
    </>
  );
}
