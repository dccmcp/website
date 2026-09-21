import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  Wrench,
  ClockCounterClockwise,
  Plugs,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { integrations } from "@/lib/integrations";
import { agents } from "@/lib/agents";
import { BrandIcon } from "@/components/site/brand-icon";

export const metadata: Metadata = {
  title: "文档 —— 快速上手、工具参考与策略指南",
  description:
    "安装 DCCMCP 集成、注册到 Claude、Cursor 或自建 Agent，并配置安全策略。含完整工具参考索引与更新日志。",
  alternates: {
    canonical: "/zh/docs",
    languages: { en: "/docs", "zh-CN": "/zh/docs" },
  },
  keywords: ["DCCMCP 文档", "MCP Server 快速上手", "MCP 策略配置", "工具参考"],
};

const toc = [
  { id: "quickstart", label: "快速上手" },
  { id: "install", label: "安装矩阵" },
  { id: "clients", label: "Agent 客户端" },
  { id: "tools", label: "工具参考" },
  { id: "policy", label: "策略与审批" },
  { id: "audit", label: "审计与回滚" },
  { id: "skills", label: "Skills SDK" },
  { id: "changelog", label: "更新日志" },
  { id: "status", label: "状态与支持矩阵" },
];

const installMatrix = [
  { software: "Blender", command: "blender --command extension install dccmcp_blender", server: "npx dccmcp-blender serve" },
  { software: "Maya", command: "在 MAYA_MODULE_PATH 放置 Maya module (mod)", server: "npx dccmcp-maya serve" },
  { software: "Houdini", command: "在 HOUDINI_PACKAGE_PATH 放置 Houdini package", server: "npx dccmcp-houdini serve" },
  { software: "3ds Max", command: "3dsmaxbatch -U dccmcp-3dsmax.mzp", server: "npx dccmcp-3dsmax serve" },
  { software: "Rhino", command: "yak install dccmcp-rhino", server: "npx dccmcp-rhino serve" },
  { software: "ZBrush", command: "把 ZScript 放进 ZStartup 目录", server: "npx dccmcp-zbrush serve" },
  { software: "Photoshop", command: "uxp install ./dccmcp-photoshop.ccx", server: "npx dccmcp-photoshop serve" },
  { software: "FreeCAD", command: "插件管理器 → DCCMCP Workbench", server: "npx dccmcp-freecad serve" },
  { software: "QGIS", command: "插件 → 管理与安装插件 → DCCMCP", server: "npx dccmcp-qgis serve" },
];

const changelog = [
  {
    version: "1.4.0",
    date: "2026-09-08",
    items: [
      "新增可流式 HTTP 传输，支持局域网部署的 Token 鉴权。",
      "Blender：几何节点模拟区现在可以通过 socket 路径寻址。",
      "QGIS：处理过程的溯源记录现在会带上算法提供方与版本。",
    ],
  },
  {
    version: "1.3.2",
    date: "2026-08-19",
    items: [
      "Rhino：图块实例变换支持旋转约束。",
      "修复了两个会话写入同一文件时的检查点命名冲突。",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-08-02",
    items: [
      "Skills SDK 1.0 —— 可用 Python 或 .NET 注册自定义类型化工具。",
      "审计条目现在会记录宿主应用版本指纹。",
    ],
  },
];

const supportMatrix = [
  { software: "Blender", supported: "4.2 LTS · 4.5 LTS · 5.x", cadence: "厂商发布后 14 天内完成测试" },
  { software: "Maya", supported: "2024 · 2025 · 2026", cadence: "厂商发布后 14 天内完成测试" },
  { software: "Houdini", supported: "20.5 · 21+", cadence: "稳定版发布后 21 天内完成测试" },
  { software: "3ds Max", supported: "2024 · 2025 · 2026", cadence: "厂商发布后 14 天内完成测试" },
  { software: "Rhino", supported: "Rhino 7 · 8 · 9 WIP 分支", cadence: "厂商发布后 14 天内完成测试" },
  { software: "ZBrush", supported: "2024 · 2025+（桌面版）", cadence: "稳定版发布后 30 天内完成测试" },
  { software: "Photoshop", supported: "2024 · 2025 · 2026", cadence: "厂商发布后 14 天内完成测试" },
  { software: "FreeCAD", supported: "0.21 · 1.0+", cadence: "稳定版发布后 21 天内完成测试" },
  { software: "QGIS", supported: "3.34 LTR · 3.40+", cadence: "LTR 发布后 14 天内完成测试" },
];

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink/70">
      {label ? (
        <div className="flex items-center gap-2 border-b border-line/70 px-4 py-2.5">
          <Terminal className="h-3.5 w-3.5 text-mint" weight="duotone" />
          <span className="font-mono text-[11px] text-muted">{label}</span>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-mint/90">
        {children}
      </pre>
    </div>
  );
}

function DocHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-balance-tight scroll-mt-24 border-t border-line/60 pt-10 text-2xl font-semibold text-fg first:border-t-0 first:pt-0 sm:text-[28px]"
    >
      {children}
    </h2>
  );
}

export default function ChineseDocsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>文档</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance-tight mt-4 text-[32px] leading-[1.16] font-semibold text-fg sm:text-[42px] lg:text-[48px] lg:leading-[1.12]">
                四条命令装好，然后决定 Agent 能碰什么
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                这份文档覆盖安装、客户端配置、策略模型与审计格式。每个集成的工具清单在各自的产品页上——本页是它们共同依赖的那一层。
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="pb-20">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="文档目录">
              <p className="mb-3 font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
                本页内容
              </p>
              <ul className="flex flex-col gap-1 border-l border-line">
                {toc.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-3 text-[13px] text-muted transition-colors hover:border-mint hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex max-w-[76ch] flex-col gap-10">
            <section className="flex flex-col gap-5">
              <DocHeading id="quickstart">快速上手</DocHeading>
              <div className="flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/8 px-4 py-3.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" weight="bold" />
                <p className="text-[13px] leading-relaxed text-amber-100">
                  <span className="font-medium">尚未发布。</span>
                  本页命令描述的是我们即将交付的接口。目前 npm 与 PyPI 上都还没有发布任何包——
                  <Link href="/zh/download" className="underline decoration-amber-200/40 underline-offset-4">
                    留下邮箱，发布时通知你
                  </Link>
                  。
                </p>
              </div>
              <p className="text-[14.5px] leading-relaxed text-muted">
                选一个集成，装好原生插件，启动 MCP Server，再注册到你的客户端。下面以 Blender 为例，其他软件的形态完全一致。
              </p>
              <CodeBlock label="1 — 安装宿主插件">{`blender --command extension install dccmcp_blender`}</CodeBlock>
              <CodeBlock label="2 — 启动 MCP Server">{`npx dccmcp-blender@latest serve --port 7331`}</CodeBlock>
              <CodeBlock label="3 — 注册到你的 Agent">{`{
  "mcpServers": {
    "blender": {
      "command": "npx",
      "args": ["dccmcp-blender", "serve"]
    }
  }
}`}</CodeBlock>
              <CodeBlock label="4 — 用一次只读调用验证">{`dccmcp doctor --tool scene.inspect`}</CodeBlock>
              <p className="text-[14.5px] leading-relaxed text-muted">
                默认策略是只读。写工具在你批准之前一直处于封锁状态，所以第一次会话可以放心地只做探查。
              </p>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="install">安装矩阵</DocHeading>
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="bg-panel-raised">
                      {["软件", "插件 / 包", "Server"].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {installMatrix.map((row) => (
                      <tr key={row.software} className="border-t border-line/70 bg-panel">
                        <td className="px-4 py-3 text-[13.5px] text-fg">{row.software}</td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-muted">{row.command}</td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-mint/90">{row.server}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="clients">Agent 客户端</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                所有 Server 都通过 stdio 与可流式 HTTP 讲 Model Context Protocol，所以你已经在用的客户端可以继续用。下面是我们在每个版本都会测试的客户端；不在列表里但支持 MCP 的 Agent 同样可用。
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {agents.map((agent) => (
                  <li
                    key={agent.name}
                    className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3"
                  >
                    <BrandIcon slug={agent.icon} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] text-fg">{agent.name}</span>
                      <span className="block truncate font-mono text-[11px] text-muted">
                        {agent.vendor}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <CodeBlock label="stdio —— 本地使用，每个 Server 一条配置">{`{
  "mcpServers": {
    "blender": { "command": "npx", "args": ["dccmcp-blender", "serve"] }
  }
}`}</CodeBlock>
              <CodeBlock label="可流式 HTTP —— 工作室共享部署">{`{
  "mcpServers": {
    "blender": {
      "type": "http",
      "url": "http://studio-host:7331/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}`}</CodeBlock>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-panel p-4 text-[13.5px] leading-relaxed text-muted">
                <Plugs className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
                <p>
                  只能用命令加参数（而不接受 URL）的客户端走 stdio 配置项；运行在另一台机器上的客户端走 HTTP 配置项，除非你显式放开，它默认只绑定回环地址。
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="tools">工具参考</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                每个 Server 在连接时发布自己的工具清单。完整清单、参数与风险等级按集成分别记录。
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {integrations.map((integration) => (
                  <li key={integration.slug}>
                    <Link
                      href={`/zh/${integration.slug}#tools`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 transition-colors hover:border-mint/40 hover:bg-panel-raised"
                    >
                      <span className="flex flex-col">
                        <span className="text-[13.5px] font-medium text-fg">
                          {integration.name}
                        </span>
                        <span className="font-mono text-[11px] text-muted">
                          {integration.tools.length} 个工具
                        </span>
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-mint"
                        weight="bold"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="policy">策略与审批</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                策略决定一次工具调用会发生什么：直接执行、请求人工确认，或者拒绝。策略是声明式文件，因此可以被评审、纳入版本管理，并在团队内共享。
              </p>
              <CodeBlock label="policy.toml">{`[default]
mode = "read-only"

[[rule]]
tool = "object.create"
action = "require-approval"

[[rule]]
tool = "pipeline.checkpoint.restore"
action = "deny"
when = { path = "**/production/**" }

[[rule]]
tool = "scene.inspect"
action = "allow"
audit = "summary"`}</CodeBlock>
              <div className="flex items-start gap-3 rounded-xl border border-line bg-panel p-4 text-[13.5px] leading-relaxed text-muted">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
                <p>
                  审批可以是交互式的——Agent 暂停，由人在客户端里确认；也可以是异步的——请求进入审核队列，Agent 先去处理别的工作。
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="audit">审计与回滚</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                每一次调用都会写入一条结构化记录。记录在磁盘上只追加，并可流式推送到 Webhook 或 SIEM。
              </p>
              <CodeBlock label="审计条目">{`2026-09-20T09:14:22Z  studio/leon
tool      geometry_nodes.set_input
args      { "socket": "Inset", "value": 0.02 }
result    ok · 118 ms · 3 variants
file      facade_module_01.blend @ sha256:9f2c…
host      Blender 4.5.1`}</CodeBlock>
              <CodeBlock label="回滚">{`dccmcp restore --checkpoint facade-a1.ckpt --scope objects`}</CodeBlock>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="skills">Skills SDK</DocHeading>
              <p className="text-[14.5px] leading-relaxed text-muted">
                当工作室的约定需要固化时，注册你自己的工具。一个 skill 就是「类型化可调用对象 + 清单文件」，它继承与内置工具完全相同的策略和审计行为。
              </p>
              <CodeBlock label="skills/rename_by_convention.py">{`from dccmcp import tool, Skill

skill = Skill(
    name="studio-naming",
    tools=[
        tool(
            name="naming.rename_collection",
            risk="write",
            schema={"collection": "str", "pattern": "str"},
        )(rename_collection),
    ],
)`}</CodeBlock>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="changelog">更新日志</DocHeading>
              <ul className="flex flex-col gap-6">
                {changelog.map((release) => (
                  <li key={release.version} className="flex flex-col gap-2 border-l border-line pl-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[13px] text-fg">v{release.version}</span>
                      <span className="font-mono text-[11.5px] text-muted">{release.date}</span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {release.items.map((item) => (
                        <li key={item} className="text-[13.5px] leading-relaxed text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-5">
              <DocHeading id="status">状态与支持矩阵</DocHeading>
              <div className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="bg-panel-raised">
                      {["软件", "支持的版本", "适配节奏"].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {supportMatrix.map((row) => (
                      <tr key={row.software} className="border-t border-line/70 bg-panel">
                        <td className="px-4 py-3 text-[13.5px] text-fg">{row.software}</td>
                        <td className="px-4 py-3 font-mono text-[11.5px] text-mint/90">
                          {row.supported}
                        </td>
                        <td className="px-4 py-3 text-[13px] text-muted">{row.cadence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel-raised p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <ClockCounterClockwise className="mt-0.5 h-5 w-5 shrink-0 text-mint" weight="duotone" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-medium text-fg">要给团队部署？</h3>
                  <p className="text-[13.5px] text-muted">
                    我们可以为你的 IT 或安全团队讲解传输方式、存储与策略导出。
                  </p>
                </div>
              </div>
              <ButtonLink href="/zh/enterprise#contact" variant="outline" className="shrink-0">
                联系我们
              </ButtonLink>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel/60 px-5 py-4">
              <Wrench className="h-5 w-5 shrink-0 text-mint" weight="duotone" />
              <p className="text-[13px] text-muted">
                想看安全姿态？读一下
                <Link href="/legal/security" className="ml-1 text-mint hover:text-mint-bright">
                  安全概览
                </Link>
                （英文）。
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
