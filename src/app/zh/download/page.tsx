import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, Check, Clock, ShieldCheck, Terminal } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Faq } from "@/components/sections/faq";
import { integrations, toolCount } from "@/lib/integrations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "即将发布 —— DCCMCP 软件包尚未发布",
  description:
    "Blender、Maya、Houdini、3ds Max、Rhino、ZBrush、Photoshop、FreeCAD、QGIS 的 DCCMCP 集成正在内测。软件包即将发布——写信到 support@dccmcp.com 订阅通知。",
  alternates: { canonical: "/zh/download", languages: { en: "/download", "zh-CN": "/zh/download" } },
  keywords: ["DCCMCP 发布时间", "MCP for Blender 下载", "npx dccmcp-blender", "MCP for Maya 中文"],
};

const packageName = (slug: string) => `dccmcp-${slug.replace("mcp-for-", "")}`;

const notifyHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "DCCMCP 发布通知订阅",
)}&body=${encodeURIComponent("请在 DCCMCP 集成发布时通知我。\n\n我使用的软件：\n\n")}`;

const included = [
  `全部 ${integrations.length} 款公开集成 —— 不阉割功能`,
  "每个宿主软件的完整类型化工具面",
  "默认只读的安全策略引擎",
  "撤销最近一次运行（控制台内直接完成）",
  "本地审计日志",
  `${toolCount}+ 个类型化工具，随宿主软件更新`,
];

const faq = [
  {
    q: "软件包什么时候发布？",
    a: `目前正在内测。等安全与回滚机制在全部 ${integrations.length} 个集成上都经得起考验，我们就会发布，并在当天邮件通知订阅列表。写信到 support@dccmcp.com 说明你用的软件，我们会告诉你排在什么位置。`,
  },
  {
    q: "现在能下载或安装吗？",
    a: "不能。本站目前没有任何下载链接，npm 与 PyPI 上也没有软件包。你在集成页面看到的安装命令描述的是我们即将发布的接口，现在还不能用。",
  },
  {
    q: "社区版会免费吗？",
    a: "会。所有集成与全部工具都在免费的社区版里，默认策略为只读，并且可以撤销最近一次运行——与开源方案同等的安全底线。付费方案增加的是开源方案没有的东西：完整版本历史、团队策略配置、审批工作流、更长的审计留存、SIEM 导出、多实例编排与支持服务。这是更深一层的安全与运维能力，不是阉割工具面。",
  },
  {
    q: "会支持哪些 Agent？",
    a: "任何兼容 MCP 的客户端：Claude Code、Cursor、Codex、GitHub Copilot、Claude Desktop、Gemini CLI、Windsurf、Cline、Roo Code、Trae、豆包、通义千问、Kimi、智谱 GLM、CodeBuddy、腾讯元宝、通义灵码、Qoder、Continue、Zed、JetBrains AI、Goose、Warp、扣子、CodeGeeX、文心快码、文心一言、讯飞星火、MiniMax Agent、OpenClaw 与 WorkBuddy——或者你用 MCP SDK 自建的 Agent。",
  },
  {
    q: "我的工作室能拿到早期访问吗？",
    a: "我们正在招募能在真实生产文件上测试、并对策略模型提出反馈的设计伙伴。写信到 support@dccmcp.com，描述你的流水线和想接入的软件。",
  },
];

export default function ChineseDownloadPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[460px]" aria-hidden="true" />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>即将发布</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance-tight text-[30px] leading-[1.15] font-semibold text-fg sm:text-[40px] lg:text-[48px] lg:leading-[1.1]">
                  DCCMCP 软件包尚未发布
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
                  全部 {integrations.length} 个集成正在内测。目前没有可下载的内容——npm 与 PyPI 上没有包，本站也没有下载链接。发布时，这个页面会变成安装指南，订阅列表里的人会第一时间收到通知。
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href={notifyHref} size="lg">
                    <Bell className="h-4 w-4" weight="bold" />
                    订阅发布通知
                  </ButtonLink>
                  <ButtonLink href="/docs" variant="outline" size="lg">
                    阅读文档
                  </ButtonLink>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted">
                  <li className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-mint" weight="duotone" />
                    内测中
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-mint" weight="duotone" />
                    社区版将免费
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Terminal className="h-4 w-4 text-mint" weight="duotone" />
                    纯本地，无遥测
                  </li>
                </ul>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.12}>
              <div className="glass overflow-hidden rounded-2xl">
                <div className="border-b border-line/70 px-5 py-3">
                  <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                    发布通知
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-5">
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    写信告诉我们你用的软件，对应集成发布时我们会通知你。
                  </p>
                  <a
                    href={notifyHref}
                    className="inline-flex items-center gap-2 font-mono text-[12.5px] text-mint transition-colors hover:text-mint-bright"
                  >
                    {site.email}
                    <ArrowRight className="h-3.5 w-3.5" weight="bold" />
                  </a>
                  <div className="rounded-lg border border-line/80 bg-ink/70 p-4">
                    <p className="font-mono text-[11px] tracking-[0.12em] text-muted/80 uppercase">
                      计划中的接口
                    </p>
                    <pre className="mt-2 overflow-x-auto font-mono text-[11.5px] leading-relaxed text-mint/90">
{`npx dccmcp-blender serve
# 尚未发布`}
                    </pre>
                  </div>
                  <p className="text-[12px] leading-relaxed text-muted/80">
                    上面的命令是我们即将发布的接口，软件包发布前它不能使用。
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section id="status" className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="状态"
          title="即将支持哪些软件，各自进展如何"
          description="每个集成都由一个原生插件加一个本地 MCP Server 组成。下方列出的包名已经预留，将在发布时上线。"
        />
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <StaggerItem key={integration.slug} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <h3 className="text-[16px] font-medium text-fg">{integration.name}</h3>
                    <span className="font-mono text-[11px] text-muted">{integration.category}</span>
                  </div>
                  <Badge tone="neutral">
                    <Clock className="h-3 w-3" weight="bold" />
                    即将发布
                  </Badge>
                </div>
                <dl className="flex flex-col gap-2 text-[13px]">
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-[10.5px] tracking-[0.12em] text-muted/80 uppercase">
                      计划包名
                    </dt>
                    <dd className="font-mono text-[11.5px] text-mint/90">
                      {packageName(integration.slug)}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-[10.5px] tracking-[0.12em] text-muted/80 uppercase">
                      版本要求
                    </dt>
                    <dd className="text-[12.5px] text-muted">{integration.specs[0].value}</dd>
                  </div>
                </dl>
                <Link
                  href={`/zh/${integration.slug}`}
                  className="group mt-auto inline-flex items-center gap-1.5 text-[13px] text-mint transition-colors hover:text-mint-bright"
                >
                  计划 {integration.tools.length} 个工具 · 查看 {integration.name} 文档
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    weight="bold"
                  />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-panel p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-mint" weight="bold" aria-hidden="true" />
                <h2 className="text-[17px] font-medium text-fg">社区版将包含</h2>
              </div>
              <ul className="flex flex-col gap-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" weight="bold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.06}>
            <div className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-panel/60 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-mint" weight="duotone" aria-hidden="true" />
                <h2 className="text-[17px] font-medium text-fg">为什么还没发布</h2>
              </div>
              <p className="text-[13.5px] leading-relaxed text-muted">
                会碰生产文件的 Agent 自动化，必须做到「无聊且可回滚」。我们正在把这些前提做完——覆盖每个宿主软件的检查点与回滚行为、策略模型、审计输出——然后才会把安装包放到任何人面前。
              </p>
              <p className="text-[13.5px] leading-relaxed text-muted">
                设计伙伴正在用真实生产场景测试。想加入的话，告诉我们你用什么软件。
              </p>
              <ButtonLink href={notifyHref} variant="outline" className="mt-auto self-start">
                <Bell className="h-4 w-4" weight="bold" />
                订阅发布通知
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Faq items={faq} id="download-faq" locale="zh" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
