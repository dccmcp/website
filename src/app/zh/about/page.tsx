import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "关于我们 — 为生产软件构建 MCP 集成",
  description:
    "DCCMCP 为创意与工程软件构建生产级 MCP Server 与插件，这里是我们对「Agent 进入真实流水线」这件事的基本立场，以及塑造产品的四条原则。",
  alternates: {
    canonical: "/zh/about",
    languages: { en: "/about", "zh-CN": "/zh/about" },
  },
};

const principles = [
  {
    title: "自动化必须可逆",
    body: "如果一个操作无法撤销，它就不该在没有人类参与的情况下交给 Agent 执行。我们把可逆性当作产品需求，而不是一个可选开关。",
  },
  {
    title: "记录和结果同样重要",
    body: "交付物会被评审，而交付物背后的过程会被审计。一次半年后无法解释的工具调用，无论产出多好，都是负债。",
  },
  {
    title: "始终本地优先",
    body: "工作室的工作天然保密。默认架构把数据留在你自己的硬件上，远程部署是一个有意的选择，而不是唯一的选项。",
  },
  {
    title: "软件会更新，我们负责消化",
    body: "宿主软件一直在变。维护版本适配是件不出彩、却必须长期做的事——它正是「演示品」和「工作室敢依赖的系统」之间的差别。",
  },
];

export default function ChineseAboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[440px]" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>关于我们</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.16] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.12]">
                我们构建的，是 AI Agent 与专业人士真正在用的软件之间那一层
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">
                <p>
                  DCCMCP 起源于一个很具体的挫败感：AI Agent 在推理几何、模型和地图时表现出色，在操作这些内容所在的软件时却一塌糊涂。瓶颈不在模型，而在接口。
                </p>
                <p>
                  所以我们认真地做这个接口——类型化工具、安全策略、检查点、审计轨迹、版本适配——服务于那些真正承担生产工作的 3D、CAD、GIS 与计算机视觉软件。
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="原则"
          title="四条塑造我们产品的信念"
          description="这些是我们在技术评审里愿意为之辩护的立场，也是某些功能被刻意排除在路线图之外的原因。"
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-2">
          {principles.map((principle, index) => (
            <StaggerItem key={principle.title} className="flex flex-col gap-3 bg-panel p-6 sm:p-7">
              <span className="font-mono text-[11px] text-muted/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-balance-tight text-[18px] font-medium text-fg">
                {principle.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{principle.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <SectionHeading
            eyebrow="独立性"
            title="一家刻意保持独立的集成供应商"
            description="我们不是某家软件厂商的内部团队，也不假装是。正是因为独立，我们才能用同一套契约支持多款软件，也才能在某个组合并非官方支持时直说。"
          />
          <Reveal from="right">
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-panel p-6 sm:p-7">
              <h3 className="text-[16px] font-medium text-fg">我们如何与厂商打交道</h3>
              <ul className="flex flex-col gap-3 text-[13.5px] leading-relaxed text-muted">
                <li>我们只通过公开、有文档的 API 集成，并遵守每个项目的许可条款。</li>
                <li>我们不把厂商 Logo 当作自己的品牌使用，并明确说明这些集成来自第三方。</li>
                <li>发现问题时我们向上游反馈；厂商改动导致兼容性变化时，我们如实更新兼容矩阵。</li>
                <li>
                  在基于开源组件构建的地方，我们标注来源，并把产品的开源部分与商业部分清晰分开。
                </li>
              </ul>
              <ButtonLink
                href="/legal/third-party-notice"
                variant="outline"
                className="mt-1 self-start"
              >
                阅读第三方声明（英文）
                <ArrowRight className="h-4 w-4" weight="bold" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line/60">
        <Reveal className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-panel-raised p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[18px] font-medium text-fg">你的流水线正需要这一层？</h2>
            <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-muted">
              我们正在招聘为工作室或工程团队交付过工具链的人，也正在招募希望影响首发功能的设计伙伴。
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="/zh/enterprise#contact">联系我们</ButtonLink>
            <ButtonLink href="/zh/integrations" variant="outline">
              查看集成
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
