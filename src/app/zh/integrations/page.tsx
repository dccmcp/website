import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Plugs, Code, Check } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Badge, RiskPill } from "@/components/ui/badge";
import { integrationsByCategory, integrations, toolCount } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "全部集成 —— Blender、Maya、Houdini、Rhino、Photoshop 的 MCP Server",
  description:
    "DCCMCP 全部集成一览：Blender、Maya、Houdini、3ds Max、Rhino、ZBrush、Photoshop、FreeCAD 与 QGIS 的 MCP Server，以及针对自研软件的私有桥接。",
  alternates: { canonical: "/zh/integrations", languages: { en: "/integrations", "zh-CN": "/zh/integrations" } },
  keywords: ["MCP for Blender", "MCP for Maya", "MCP for Houdini", "国产 AI Agent MCP", "MCP 服务器 3D 软件"],
};

const categoryZh: Record<string, string> = {
  "3D & Animation": "3D 建模与动画",
  "CAD & Parametric": "CAD 与参数化设计",
  "FX & Simulation": "特效与解算",
  "Sculpting & Texturing": "雕刻与贴图",
  "2D & Texture": "2D 与贴图生产",
  "GIS & Geospatial": "GIS 与地理空间",
  "Vision & Automation": "计算机视觉与自动化",
};

const categoryTitle: Record<string, string> = {
  "3D & Animation": "3D 建模与动画软件的 MCP Server",
  "CAD & Parametric": "CAD 与参数化设计软件的 MCP Server",
  "FX & Simulation": "程序化特效与解算的 MCP Server",
  "Sculpting & Texturing": "雕刻与细节制作的 MCP Server",
  "2D & Texture": "贴图与 2D 生产的 MCP Server",
  "GIS & Geospatial": "GIS 与地理空间分析的 MCP Server",
  "Vision & Automation": "计算机视觉与自动化的 MCP Server",
};

const promises = [
  {
    icon: ShieldCheck,
    title: "统一的策略模型",
    body: "每个集成里的只读、写入与执行工具采用相同的风险分类，因此为工作室写一次策略就能全局生效。",
  },
  {
    icon: Plugs,
    title: "统一的客户端配置",
    body: "所有服务都支持 stdio 与 streamable HTTP。给 Agent 增加一个新宿主软件，不需要改动 Agent 本身的接线方式。",
  },
  {
    icon: Code,
    title: "统一的审计格式",
    body: "工具、参数、操作者、宿主版本与文件指纹——无论由哪款软件执行，记录格式都一致。",
  },
];

export default function ChineseIntegrationsPage() {
  const groups = integrationsByCategory();

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[460px]" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>集成</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[30px] leading-[1.15] font-semibold text-fg sm:text-[40px] lg:text-[48px] lg:leading-[1.1]">
                面向创意、CAD、GIS 与视觉软件的 MCP Server
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[64ch] text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
                {integrations.length} 个集成、{toolCount}+ 个类型化工具、一套契约。每个集成都由一个本地 MCP
                Server 加一个宿主软件原生插件组成：Agent 拿到类型化工具，你保留策略管控、检查点与审计记录。
                这些是独立的第三方集成——我们只做 MCP 适配层，与任何被集成或被提及的厂商均无隶属关系。
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/zh/download" size="lg">
                  即将发布
                </ButtonLink>
                <ButtonLink href="/enterprise" variant="outline" size="lg">
                  定制私有集成
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="pb-4">
        <nav aria-label="跳转到集成">
          <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
            快速跳转
          </p>
          <ul className="flex flex-wrap gap-2">
            {integrations.map((integration) => (
              <li key={integration.slug}>
                <Link
                  href={`#${integration.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-mint/40 hover:text-mint"
                >
                  <span className="font-mono text-[10.5px] text-mint/70">{integration.software}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {groups.map((group, groupIndex) => (
        <Section
          key={group.category}
          className={
            groupIndex === 0
              ? "border-y border-line/60 bg-ink-deep/40 pt-14"
              : "border-b border-line/60 bg-ink-deep/40"
          }
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              {categoryZh[group.category] ?? group.category}
            </span>
            <h2 className="text-balance-tight text-2xl font-semibold text-fg sm:text-[30px]">
              {categoryTitle[group.category] ?? group.category}
            </h2>
          </div>

          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-2">
            {group.items.map((integration) => (
              <StaggerItem key={integration.slug} id={integration.slug} className="h-full scroll-mt-24">
                <Link
                  href={`/zh/${integration.slug}`}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-mint/40 hover:bg-panel-raised sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                      <h3 className="text-[17px] font-medium text-fg">{integration.name}</h3>
                      <span className="font-mono text-[11px] text-muted">
                        {categoryZh[integration.category] ?? integration.category}
                      </span>
                    </div>
                    <Badge tone={integration.status === "Stable" ? "mint" : "neutral"}>
                      {integration.status}
                    </Badge>
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-muted">{integration.tagline}</p>

                  <ul className="flex flex-col gap-2">
                    {integration.tools.slice(0, 3).map((tool) => (
                      <li key={tool.name} className="flex items-center gap-2.5">
                        <Check className="h-3.5 w-3.5 shrink-0 text-mint" weight="bold" />
                        <code className="truncate font-mono text-[11.5px] text-muted">
                          {tool.name}
                        </code>
                        <span className="ml-auto shrink-0 font-mono text-[10px] text-muted/80">
                          {tool.risk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-4">
                    <span className="font-mono text-[11px] text-muted/80">
                      {integration.tools.length} 个工具 · {integration.agents.length} 种 Agent
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-mint">
                      查看 {integration.name}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        weight="bold"
                      />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>
      ))}

      <Section>
        <SectionHeading
          eyebrow="一致性"
          title="每个集成共有的三件事"
          description="标准化的意义在于：学会一个集成，就等于学会了全部。"
        />
        <StaggerGroup className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-3">
          {promises.map((promise) => (
            <StaggerItem key={promise.title} className="flex flex-col gap-4 bg-panel p-6">
              <promise.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
              <h3 className="text-[16px] font-medium text-fg">{promise.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{promise.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/60 px-5 py-4 text-[13px] text-muted">
            <span className="text-fg">所有集成的风险等级定义完全一致：</span>
            <RiskPill risk="read" />
            <RiskPill risk="write" />
            <RiskPill risk="execute" />
            <span className="text-muted/80">—— 且每个集成首次安装时都默认为只读。</span>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
