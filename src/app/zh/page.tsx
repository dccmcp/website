import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Cube,
  DownloadSimple,
  Plugs,
  SlidersHorizontal,
  Certificate,
  Warning,
  FileCode,
  EyeSlash,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { AgentSession } from "@/components/visuals/agent-session";
import { featuredIntegrations, integrations, toolCount } from "@/lib/integrations";
import { agents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "MCP for Blender、Maya、Houdini 与工程软件",
  description:
    "DCCMCP 提供生产级 MCP Server 与插件，让 Claude Code、Codex、Cursor、豆包等 AI Agent 直接操作 Blender、Maya、Houdini、3ds Max、Rhino、ZBrush、Photoshop、FreeCAD 与 QGIS。类型化工具、安全策略、检查点与审计日志，默认只读、本地运行。",
  alternates: { canonical: "/zh", languages: { en: "/", "zh-CN": "/zh" } },
  keywords: [
    "MCP for Blender",
    "MCP for Maya",
    "MCP for Houdini",
    "豆包 MCP",
    "通义千问 MCP 客户端",
    "国产 AI Agent MCP",
    "MCP 服务器 中文",
    "Blender AI 控制",
    "CAD AI 自动化",
  ],
};

const problems = [
  {
    icon: FileCode,
    title: "模型写的脚本，它自己从没跑过",
    body: "让 Agent 直接写 bpy 或 PyQGIS 代码，它只能靠猜——对象名、集合路径、单位、公差，没有一项经过你的文件验证。等到报错时，改动已经做了一半。",
  },
  {
    icon: Warning,
    title: "一次错误调用，赔上一个下午",
    body: "没有检查点的破坏性操作会损坏场景、破坏链接库、让参数化模型树失效。而在此之前的两小时，没有撤销可退。",
  },
  {
    icon: EyeSlash,
    title: "没人能证明到底改了什么",
    body: "无人值守的自动化如果没有操作记录——谁改的、何时改的、用了什么参数——就无法通过工作室审核、客户验收或生产审计。",
  },
];

const steps = [
  {
    icon: DownloadSimple,
    step: "01",
    title: "安装 MCP Server",
    body: "为你的宿主软件装对应集成：Blender 插件、Maya 模块、Houdini Package、FreeCAD 工作台、QGIS 插件。",
  },
  {
    icon: Plugs,
    step: "02",
    title: "接入你的 Agent",
    body: "在 Claude Code、Codex、Cursor、豆包、通义千问或自建客户端里注册这个 Server。本地默认走 stdio，团队部署可切 HTTP。",
  },
  {
    icon: SlidersHorizontal,
    step: "03",
    title: "让 Agent 操作软件",
    body: "Agent 读取真实状态后调用类型化工具。非法调用在边界被拒绝，合法调用在实时文档里建模、跑算法、导出交付物。",
  },
  {
    icon: Certificate,
    step: "04",
    title: "校验与审计",
    body: "每次调用都记录参数与结果。检查点让破坏性操作可回滚，审批门控拦住任何触碰生产文件的操作。",
  },
];

const proofPoints = [
  { value: String(integrations.length), label: "款宿主软件已支持" },
  { value: `${Math.floor(toolCount / 10) * 10}+`, label: "个类型化工具，全部标注风险等级" },
  { value: "本地", label: "默认 stdio，数据不离开你的机器" },
];

export default function ChineseHomePage() {
  const featured = featuredIntegrations();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[620px]" aria-hidden="true" />

        <Container>
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.06fr)] lg:gap-12">
            <div className="flex flex-col gap-7 lg:pt-6">
              <Reveal>
                <div className="flex flex-col items-start gap-3">
                  <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] tracking-wide text-muted">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" aria-hidden="true" />
                    面向 DCC 软件的 MCP Server
                  </span>
                  <p className="max-w-[48ch] text-[13.5px] leading-relaxed text-muted">
                    <strong className="font-medium text-fg">DCC</strong> 是
                    <strong className="font-medium text-fg">Digital Content Creation</strong>
                    的缩写——指工作室日常使用的 3D、CAD、GIS 与图像软件，比如 Blender、Maya、Houdini 和 Photoshop。
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="text-balance-tight text-[32px] leading-[1.15] font-semibold text-fg sm:text-[42px] lg:text-[52px] lg:leading-[1.1]">
                  让 AI Agent 真正操作 Blender、Maya、Houdini 与工程软件
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="max-w-[56ch] text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
                  不再依赖脆弱的生成式脚本。部署生产级 MCP Server 与插件，让 Claude Code、Codex、Cursor、豆包、通义千问以及你自建的 Agent
                  在真实软件里读取状态、建模、跑算法、校验结果。
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href="/zh/download" size="lg">
                    <Clock className="h-4 w-4" weight="bold" />
                    即将发布
                  </ButtonLink>
                  <ButtonLink href="/docs" variant="outline" size="lg">
                    阅读文档
                    <ArrowRight className="h-4 w-4" weight="bold" />
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-muted">
                  支持 <span className="font-medium text-fg">Claude Code</span>、
                  <span className="font-medium text-fg">Codex</span>、
                  <span className="font-medium text-fg">Cursor</span>、
                  <span className="font-medium text-fg">豆包</span>、
                  <span className="font-medium text-fg">通义千问</span>
                  以及任何兼容 MCP 的 Agent。
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted">
                  <li className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-mint" weight="duotone" />
                    默认只读
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Cube className="h-4 w-4 text-mint" weight="duotone" />
                    写操作带检查点
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <span className="font-mono text-[11px] text-mint">stdio</span>
                    本地传输
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={0.34}>
                <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line/60 sm:grid-cols-3">
                  {proofPoints.map((point) => (
                    <div key={point.label} className="bg-panel px-4 py-3.5">
                      <dt className="font-mono text-xl text-fg">{point.value}</dt>
                      <dd className="mt-1 text-[12px] leading-snug text-muted">{point.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.1} className="lg:sticky lg:top-24">
              <AgentSession />
              <p className="mt-3 text-center font-mono text-[11px] text-muted/80">
                会话示例 · 展示的均为真实 DCCMCP 工具名
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 问题 */}
      <Section className="border-b border-line/60">
        <SectionHeading
          eyebrow="问题"
          title="为什么大多数「AI 直连 DCC」在生产环境都会失败"
          description="让模型直接写特定软件的 Python，演示很轻松，长期维护代价很高。问题从来不是模型写代码的能力，而是 Agent 与软件之间缺少一份契约。"
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-3">
          {problems.map((problem, index) => (
            <StaggerItem key={problem.title} className="flex flex-col gap-4 bg-panel p-6">
              <span className="font-mono text-[11px] text-muted/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <problem.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
              <h3 className="text-balance-tight text-[16px] font-medium text-fg">{problem.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{problem.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* 方案 */}
      <Section>
        <SectionHeading
          eyebrow="方案"
          title="在 Agent 与软件之间建立标准契约"
          description="我们提供标准化的 MCP for Blender、MCP for Maya、MCP for Houdini、MCP for 3ds Max、MCP for Rhino、MCP for ZBrush、MCP for Photoshop、MCP for FreeCAD、MCP for QGIS。每个集成包含本地 MCP Server、软件插件、类型化工具、安全策略与审计日志——让 Agent 在真实应用里读取、创建、修改与校验，而不破坏你的流水线。"
        />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <StaggerItem
              key={item.step}
              className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-5"
            >
              <div className="flex items-center justify-between">
                <item.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
                <span className="font-mono text-[11px] text-muted/80">{item.step}</span>
              </div>
              <h3 className="text-[15px] font-medium text-fg">{item.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* 集成 */}
      <Section className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="集成"
          title="支持你已经在用的软件"
          description="每个集成都是一个本地 MCP Server 加一个原生插件。统一的工具契约、统一的策略引擎、统一的审计格式。DCCMCP 是独立第三方集成，与任何软件厂商均无隶属关系。"
        />
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((integration) => (
            <StaggerItem key={integration.slug} className="h-full">
              <Link
                href={`/${integration.slug}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-panel p-6 transition-colors duration-300 hover:border-mint/40 hover:bg-panel-raised"
              >
                <h3 className="text-balance-tight text-[17px] font-medium text-fg">
                  {integration.name}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{integration.tagline}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-6">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-panel p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <Plugs className="mt-0.5 h-6 w-6 shrink-0 text-mint" weight="duotone" aria-hidden="true" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[17px] font-medium text-fg">
                  {integrations.length} 个集成 · {toolCount}+ 个类型化工具
                </h3>
                <p className="max-w-[68ch] text-[13.5px] leading-relaxed text-muted">
                  MCP for 3ds Max 与 MCP for ZBrush 也有各自的独立页面，含完整工具清单与版本支持矩阵。如果没有你要的软件，我们在企业版提供定制私有集成。
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/integrations" variant="outline">
                浏览全部集成
                <ArrowRight className="h-4 w-4" weight="bold" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Agents */}
      <Section className="border-b border-line/60">
        <SectionHeading
          eyebrow="Agent"
          title="兼容你正在使用的 Agent"
          description="DCCMCP Server 通过 stdio 与 streamable HTTP 讲标准 MCP 协议，任何兼容 MCP 的客户端都能驱动 Blender、Maya、Houdini、Photoshop 等软件——不需要为每家单独写插件。以下是我们每次发版都会验证的客户端。"
        />
        <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent) => (
            <StaggerItem key={agent.name}>
              <div className="flex h-full items-center gap-3.5 rounded-xl border border-line bg-panel px-4 py-3.5">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-panel-raised text-mint"
                >
                  <Robot className="h-[18px] w-[18px]" weight="duotone" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[14px] font-medium text-fg">{agent.name}</span>
                  <span className="truncate font-mono text-[11px] text-muted">{agent.vendor}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line/60 py-20 sm:py-24">
        <div className="aura absolute inset-0 -z-10" aria-hidden="true" />
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
            <Badge tone="neutral">
              <Clock className="h-3 w-3" weight="bold" />
              内测中 · 即将发布
            </Badge>
            <h2 className="text-balance-tight text-3xl font-semibold text-fg sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
              把 Agent 放进真实软件，同时守住你的流水线
            </h2>
            <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-muted">
              9 个集成正在内测，目前还没有可下载的安装包。留下你的软件清单，公测时我们会第一时间通知你。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/zh/download" size="lg">
                订阅发布通知
              </ButtonLink>
              <ButtonLink href="/enterprise" variant="outline" size="lg">
                申请设计伙伴
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
