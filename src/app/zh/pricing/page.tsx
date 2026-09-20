import type { Metadata } from "next";
import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Faq } from "@/components/sections/faq";
import { compare } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "定价 —— 免费社区版、Studio 席位与企业版",
  description:
    "免费使用全部公开 MCP 集成与默认只读策略。Studio 增加多实例控制、审计留存与共享策略；企业版增加 SSO、自托管与定制集成。软硬件包发布后即可使用。",
  alternates: { canonical: "/zh/pricing", languages: { en: "/pricing", "zh-CN": "/zh/pricing" } },
  keywords: ["MCP 定价", "MCP Server 价格", "工作室 MCP 授权", "企业版 MCP 部署"],
};

const zhPlans = {
  community: {
    name: "社区版",
    price: "免费",
    cadence: "永久",
    bestFor: "独立设计师、工程师与评估者",
    blurb: "把 Agent 接到一台机器上所需的一切。发布后直接下载——无需账号、无需信用卡、无需电话。",
    cta: "即将发布",
    includes: [
      "全部公开集成（Blender、Rhino、Maya、QGIS、Houdini、Photoshop 等 10 款）",
      "默认只读的安全策略",
      "本地 stdio 传输",
      "社区支持与 Discord",
      "本地会话不限量",
    ],
  },
  pro: {
    name: "Studio",
    price: "$39",
    cadence: "每用户 / 月",
    bestFor: "交付客户项目的工作室与自由职业者",
    blurb: "面向生产环境：多实例控制、审计日志与共享策略。",
    cta: "开始 14 天试用",
    includes: [
      "包含社区版全部内容",
      "写操作的检查点与回滚",
      "多实例与无界面 / 批量控制",
      "审计日志 90 天留存",
      "团队策略配置与审批门控",
      "自定义工具注册（Skills SDK）",
      "面向局域网 Agent 的 HTTP 传输",
      "邮件支持，2 个工作日内响应",
    ],
  },
  enterprise: {
    name: "企业版",
    price: "定制",
    cadence: "",
    bestFor: "有 IT 合规要求的工作室、AEC 与制造企业",
    blurb: "面向不能中断的流水线：SSO、自托管、合规审查与定制集成。",
    cta: "联系销售",
    includes: [
      "包含 Studio 全部内容",
      "SSO/SAML、SCIM 与基于角色的访问控制",
      "自托管或气隙部署",
      "审计不限留存 + SIEM 导出",
      "定制集成开发",
      "签名构建与 SBOM 交付",
      "专属解决方案工程师，99.9% 支持 SLA",
    ],
  },
};

const zhCompare: Record<string, string> = {
  Integrations: "集成",
  "Public integrations": "公开集成",
  "Custom tool registration": "自定义工具注册",
  "Private/bespoke software bridges": "私有 / 定制软件桥接",
  "Legacy host versions": "旧版宿主软件",
  "Control & safety": "控制与安全",
  "Safety policy profiles": "安全策略配置",
  "Approval gates for write tools": "写操作审批门控",
  "Checkpoints and rollback": "检查点与回滚",
  "Read-only default": "默认只读",
  Governance: "治理",
  "Audit log retention": "审计日志留存",
  "SIEM / webhook export": "SIEM / webhook 导出",
  "SSO / SAML / SCIM": "SSO / SAML / SCIM",
  "Self-hosted or air-gapped": "自托管或气隙部署",
  "Signed builds and SBOM": "签名构建与 SBOM",
  Operations: "运维",
  Transport: "传输方式",
  "Multi-instance control": "多实例控制",
  "Headless / batch workers": "无界面 / 批量任务",
  Support: "支持",
};

const zhCells: Record<string, string> = {
  "5": "5 个",
  "5 + custom": "5 个 + 定制",
  "1 local": "单机 1 份",
  "Shared team": "团队共享",
  "Shared + enforced": "共享 + 强制",
  Basic: "基础",
  "Custom rules": "自定义规则",
  "7 days local": "本地 7 天",
  "90 days": "90 天",
  Unlimited: "不限",
  Webhook: "Webhook",
  "SIEM + webhook": "SIEM + webhook",
  stdio: "stdio",
  "stdio + HTTP": "stdio + HTTP",
  "stdio + HTTP + mTLS": "stdio + HTTP + mTLS",
  "Up to 5": "最多 5 个",
  Manual: "手动",
  Community: "社区支持",
  "2 business days": "2 个工作日",
  "Named SE + SLA": "专属工程师 + SLA",
};

const faq = [
  {
    q: "怎样算一个用户？",
    a: "把 Agent 接入 DCCMCP 的具名个人。CI 或渲染农场使用的服务账号按「每条并发流水线一个席位」计算，而不是按任务数。",
  },
  {
    q: "试用集成需要付费方案吗？",
    a: "不需要。社区版包含全部公开集成，且默认只读。当你需要在共享或生产文件中写入时再升级——尤其是能保证破坏性调用可恢复的检查点与回滚。",
  },
  {
    q: "我的数据会离开本机吗？",
    a: "社区版与 Studio 都不会。它们完全运行在你的硬件上。企业版自托管时，包括审计日志在内的全部流量都留在你的网络内。",
  },
  {
    q: "能购买你们还没列出的软件集成吗？",
    a: "可以。企业客户可以委托我们开发私有桥接。我们已经为内部资产系统、渲染管理器和专有 CAD 工具交付过集成。",
  },
  {
    q: "试用结束后会怎样？",
    a: "你的配置、策略与审计历史都会完整保留，工作区回落到社区版额度，直到你选择方案。不会有任何内容被删除。",
  },
  {
    q: "有学术或初创优惠吗？",
    a: "有。经认证的学术实验室可在教学与非商业研究中免费使用 Studio；早期工作室也可以申请首年折扣。",
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-4 w-4 text-mint" weight="bold" />;
  if (value === false) return <Minus className="h-4 w-4 text-line" weight="bold" />;
  return <span className="text-[13px] text-muted">{zhCells[value] ?? value}</span>;
}

export default function ChinesePricingPage() {
  const order = ["community", "pro", "enterprise"] as const;

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[460px]" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>定价</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[30px] leading-[1.15] font-semibold text-fg sm:text-[40px] lg:text-[48px] lg:leading-[1.1]">
                发布即免费，团队依赖时再升级
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[62ch] text-[15.5px] leading-relaxed text-muted sm:text-[17px]">
                所有方案包含相同的集成与相同的安全引擎。付费方案增加的是治理、规模与支持——不是需要打销售电话才能看到的功能。
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="pt-4">
        <StaggerGroup className="grid gap-5 lg:grid-cols-3">
          {order.map((id) => {
            const zh = zhPlans[id];
            const featured = id === "pro";
            return (
              <StaggerItem key={id} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col gap-6 rounded-2xl border p-6 sm:p-7",
                    featured
                      ? "border-mint/40 bg-panel-raised shadow-[0_0_0_1px_rgba(45,212,191,0.12)]"
                      : "border-line bg-panel",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[16px] font-medium text-fg">{zh.name}</h2>
                      <p className="max-w-[26ch] text-[12.5px] leading-snug text-muted">
                        {zh.bestFor}
                      </p>
                    </div>
                    {featured ? (
                      <Badge tone="mint" className="shrink-0">
                        最受欢迎
                      </Badge>
                    ) : null}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-fg">
                      {zh.price}
                    </span>
                    {zh.cadence ? (
                      <span className="text-[12.5px] text-muted">{zh.cadence}</span>
                    ) : null}
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-muted">{zh.blurb}</p>

                  <ul className="flex flex-col gap-2.5">
                    {zh.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" weight="bold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={id === "enterprise" ? "/enterprise" : "/zh/download"}
                    variant={featured ? "primary" : "outline"}
                    className="mt-auto w-full"
                  >
                    {zh.cta}
                  </ButtonLink>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
        <Reveal className="mt-6">
          <p className="text-center text-[12.5px] text-muted">
            价格以美元计，可按年或按月结算。学术与早期团队有折扣——写信到 support@dccmcp.com 咨询。
          </p>
        </Reveal>
      </Section>

      <Section id="compare" className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="对比"
          title="各方案之间的全部差异"
          description="没有隐藏条款。凡是有限制的地方，都写在这里。"
        />
        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line">
          <div className="min-w-[720px] overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-panel-raised">
                  <th className="w-[40%] px-5 py-4 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                    功能
                  </th>
                  {["社区版", "Studio", "企业版"].map((name) => (
                    <th
                      key={name}
                      className="px-5 py-4 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              {compare.map((group) => (
                <tbody key={group.group}>
                  <tr className="bg-panel">
                    <th
                      colSpan={4}
                      className="border-t border-line px-5 py-3 text-[11px] font-semibold tracking-[0.14em] text-mint uppercase"
                    >
                      {zhCompare[group.group] ?? group.group}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.feature} className="border-t border-line/70 bg-panel">
                      <td className="px-5 py-3.5 text-[13.5px] text-fg">
                        {zhCompare[row.feature] ?? row.feature}
                      </td>
                      <td className="px-5 py-3.5">
                        <Cell value={row.community} />
                      </td>
                      <td className="px-5 py-3.5">
                        <Cell value={row.studio} />
                      </td>
                      <td className="px-5 py-3.5">
                        <Cell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Reveal>
      </Section>

      <Faq items={faq} id="pricing-faq" locale="zh" />

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
