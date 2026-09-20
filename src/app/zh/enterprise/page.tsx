import type { Metadata } from "next";
import {
  Buildings,
  Lock,
  CloudSlash,
  UsersThree,
  FileCode,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "企业版 —— SSO、自托管与私有 MCP 桥接",
  description:
    "DCCMCP 企业版提供 SSO/SAML、SCIM、自托管或内网隔离部署、无上限审计留存、SIEM 导出、签名构建，以及针对 Blender、Rhino、FreeCAD、QGIS、OpenCV 和自研工具的定制集成。",
  alternates: {
    canonical: "/zh/enterprise",
    languages: { en: "/enterprise", "zh-CN": "/zh/enterprise" },
  },
  keywords: [
    "企业级 MCP Server",
    "自托管 MCP",
    "内网隔离 MCP 部署",
    "定制 CAD 集成",
  ],
};

const pillars = [
  {
    icon: Lock,
    title: "身份与权限",
    body: "SSO/SAML、SCIM 目录同步与基于角色的访问控制。权限直接映射到你们现有的用户组，技术总监可以只给某个团队开放 Agent 写权限，其他团队不受影响。",
  },
  {
    icon: CloudSlash,
    title: "自托管或内网隔离",
    body: "控制平面可以完全跑在你们内网，不依赖任何外发连接。更新包支持内网镜像，许可证校验同样可离线完成。",
  },
  {
    icon: FileCode,
    title: "私有集成",
    body: "我们为 Maya、Houdini、Revit、Civil 3D、Ansys、KiCad、专有 CAD 或你们的自研资产系统构建桥接，工具契约与公开集成完全一致。",
  },
  {
    icon: UsersThree,
    title: "规模化治理",
    body: "无上限审计留存、SIEM 与 Webhook 导出、可路由到指定审核人的审批流，以及按项目生效的策略。",
  },
  {
    icon: Handshake,
    title: "具名支持",
    body: "一位熟悉你们流水线的解决方案工程师、99.9% 支持 SLA，以及针对宿主软件版本变更的明确响应时限。",
  },
  {
    icon: Buildings,
    title: "可直接走采购",
    body: "签名构建、SBOM 交付、安全问卷、DPA 与标准企业条款。我们直接对接你们的法务与 IT 团队。",
  },
];

const steps = [
  {
    step: "01",
    title: "技术范围沟通",
    body: "与工程师开 45 分钟会。我们梳理你使用的软件、希望自动化的任务，以及你不放心授予的写权限。",
  },
  {
    step: "02",
    title: "在单条流程上试点",
    body: "我们在生产数据的副本上，用只读策略部署一条真实流程，并衡量 Agent 到底在哪里帮上了忙。",
  },
  {
    step: "03",
    title: "带策略地推广",
    body: "我们编写你们的策略配置、把审批接入现有评审流程，并将审计导出接到你们的监控系统。",
  },
];

export default function ChineseEnterprisePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[480px]" aria-hidden="true" />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>企业版</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance-tight text-[32px] leading-[1.16] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.12]">
                  能通过你们安全审查的 Agent 自动化
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                  大型工作室与工程团队的难点从来不是把模型接上软件，而是治理：写权限是谁批的、日志存在哪里、供应商发布破坏性更新时怎么办。企业版会在采购团队提出这些问题之前，就把答案准备好。
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-3">
                  <Badge tone="mint">SSO / SAML</Badge>
                  <Badge tone="mint">SCIM</Badge>
                  <Badge tone="mint">内网隔离</Badge>
                  <Badge tone="mint">签名构建</Badge>
                  <Badge tone="mint">SIEM 导出</Badge>
                  <Badge tone="mint">99.9% SLA</Badge>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line/60 sm:grid-cols-3">
                  {[
                    { k: "5 天", v: "从试点到首个结果" },
                    { k: "离线", v: "许可证与更新镜像" },
                    { k: "1 名工程师", v: "具名负责你的账号" },
                  ].map((item) => (
                    <div key={item.v} className="bg-panel px-4 py-3.5">
                      <dt className="font-mono text-[15px] text-fg">{item.k}</dt>
                      <dd className="mt-1 text-[12px] leading-snug text-muted">{item.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
              <div className="glass rounded-2xl p-6 sm:p-7">
                <h2 className="text-[18px] font-medium text-fg">聊聊你的部署方案</h2>
                <p className="mt-2 mb-6 text-[13.5px] leading-relaxed text-muted">
                  仅受理企业版与私有桥接咨询。如果你只是想试用 DCCMCP，社区版可直接免费下载，无需预约通话。
                </p>
                <ContactForm locale="zh" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="企业版多了什么"
          title="IT 团队一定会问的那些控制项"
          description="Studio 覆盖工作流，企业版覆盖流程合规、访问模型，以及只有在组织规模上才会暴露的失效模式。"
        />
        <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="flex flex-col gap-4 bg-panel p-6">
              <pillar.icon className="h-6 w-6 text-mint" weight="duotone" aria-hidden="true" />
              <h3 className="text-[16px] font-medium text-fg">{pillar.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{pillar.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="上线流程"
          title="先试点一条流程，再逐步放开"
          description="没有人应该在第一天就批准 Agent 的全面访问权限。我们从最窄的范围开始、用数据衡量，只在结果站得住脚的地方扩大。"
        />
        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((item) => (
            <StaggerItem key={item.step} className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6">
              <span className="font-mono text-[11px] text-mint">{item.step}</span>
              <h3 className="text-[16px] font-medium text-fg">{item.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section id="contact" className="border-t border-line/60">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="flex flex-col gap-5">
            <Eyebrow>联系我们</Eyebrow>
            <h2 className="text-balance-tight text-3xl font-semibold text-fg sm:text-4xl">
              企业版与私有桥接
            </h2>
            <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-muted">
              企业咨询由构建集成的工程师本人处理。如果我们不适合你，第一次通话就会直接说明。
            </p>
            <div className="mt-2 flex flex-col gap-1.5 text-[14px]">
              <a className="text-mint hover:text-mint-bright" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <p className="text-[13px] text-muted/80">
                销售、安全问卷与采购都会进同一个收件箱——说明你需要哪一类，我们会分派给对应的人。
              </p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-line pt-5 text-[13px]">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                  响应时间
                </dt>
                <dd className="text-fg">1 个工作日</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                  时区覆盖
                </dt>
                <dd className="text-fg">欧洲 · 亚太 · 美洲</dd>
              </div>
            </dl>
          </div>

          <Reveal from="right">
            <div className="panel rounded-2xl p-6 sm:p-7">
              <ContactForm locale="zh" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
