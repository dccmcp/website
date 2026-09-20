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
  title: "Coming soon — DCCMCP packages are not published yet",
  description:
    "DCCMCP integrations for Blender, Maya, Houdini, 3ds Max, Rhino, ZBrush, Photoshop, FreeCAD, QGIS and OpenCV are in private testing. Packages publish soon — email support@dccmcp.com to be notified.",
  alternates: { canonical: "/download" },
  keywords: [
    "DCCMCP release date",
    "MCP server for Blender download",
    "npx dccmcp-blender",
    "MCP for Maya release",
  ],
};

const packageName = (slug: string) => `dccmcp-${slug.replace("mcp-for-", "")}`;

const notifyHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Notify me when DCCMCP packages publish",
)}&body=${encodeURIComponent(
  "Please let me know when the DCCMCP integrations are available.\n\nSoftware I use:\n\n",
)}`;

const included = [
  "Every public integration — all 10 products, no feature gating",
  "Full typed tool surface for each host application",
  "Safety policy engine with a read-only default",
  "Checkpoints and rollback for write tools",
  "Local audit log",
  `${toolCount}+ typed tools, updated as host applications ship`,
];

const faq = [
  {
    q: "When will the packages be published?",
    a: "They are in private testing now. We publish when the safety and rollback behaviour holds up across all 10 integrations, and we email everyone on the notification list the day it happens. Email support@dccmcp.com with the software you use and we will tell you where you are in the queue.",
  },
  {
    q: "Can I download or install anything today?",
    a: "No. There is no download link on this site yet and no package on npm or PyPI. The install commands you see on the integration pages describe the interface we are shipping — they do not work yet.",
  },
  {
    q: "Will the Community edition be free?",
    a: "Yes. Every integration and every tool is available on the free Community edition, with a read-only default policy. Paid plans add governance and scale — shared policy profiles, approval workflows, longer audit retention, SIEM export, multi-instance orchestration and support — not a restricted tool surface.",
  },
  {
    q: "Which agents will it work with?",
    a: "Any MCP-compatible client: Claude Code, Cursor, Codex, GitHub Copilot, Claude Desktop, Gemini CLI, Windsurf, Cline, Roo Code, Trae, Doubao, Qwen Code, Kimi, Zhipu GLM, CodeBuddy, Yuanbao, Lingma, Qoder, Continue, Zed, JetBrains AI, Goose, Warp, Coze, CodeGeeX, Comate, ERNIE, Spark, MiniMax Agent, OpenClaw and WorkBuddy — or an agent you build with the MCP SDK.",
  },
  {
    q: "Can I get early access for my studio?",
    a: "We are onboarding design partners who can test against real production files and give feedback on the policy model. Email support@dccmcp.com describing your pipeline and the software you would connect.",
  },
];

export default function DownloadPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36">
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="aura absolute inset-x-0 top-0 -z-10 h-[460px]" aria-hidden="true" />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>Coming soon</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance-tight text-[32px] leading-[1.08] font-semibold text-fg sm:text-[42px] lg:text-[50px] lg:leading-[1.04]">
                  DCCMCP packages are not published yet
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-[58ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
                  All 10 integrations are in private testing. There is nothing to download today —
                  no package on npm or PyPI, and no download link on this site. When they publish,
                  this page becomes the install guide and everyone on the notification list hears
                  first.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href={notifyHref} size="lg">
                    <Bell className="h-4 w-4" weight="bold" />
                    Get notified
                  </ButtonLink>
                  <ButtonLink href="/docs" variant="outline" size="lg">
                    Read the docs
                  </ButtonLink>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted">
                  <li className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-mint" weight="duotone" />
                    In private testing
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-mint" weight="duotone" />
                    Community edition will be free
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Terminal className="h-4 w-4 text-mint" weight="duotone" />
                    Local only, no telemetry
                  </li>
                </ul>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.12}>
              <div className="glass overflow-hidden rounded-2xl">
                <div className="border-b border-line/70 px-5 py-3">
                  <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                    Notification list
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-5">
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    Email us with the software you use and we will tell you when that integration
                    publishes.
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
                      Planned interface
                    </p>
                    <pre className="mt-2 overflow-x-auto font-mono text-[11.5px] leading-relaxed text-mint/90">
{`npx dccmcp-blender serve
# not published yet`}
                    </pre>
                  </div>
                  <p className="text-[12px] leading-relaxed text-muted/80">
                    The command above is the interface we are shipping. It does not work until the
                    packages publish.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section id="status" className="border-y border-line/60 bg-ink-deep/40">
        <SectionHeading
          eyebrow="Status"
          title="What is coming, and where each integration stands"
          description="Every integration is a native plugin plus a local MCP server. The package name under each entry is reserved and will be published at launch."
        />

        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <StaggerItem key={integration.slug} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <h3 className="text-[16px] font-medium text-fg">{integration.name}</h3>
                    <span className="font-mono text-[11px] text-muted">
                      {integration.category}
                    </span>
                  </div>
                  <Badge tone="neutral">
                    <Clock className="h-3 w-3" weight="bold" />
                    {integration.status === "Stable" ? "Coming soon" : integration.status}
                  </Badge>
                </div>

                <dl className="flex flex-col gap-2 text-[13px]">
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-[10.5px] tracking-[0.12em] text-muted/80 uppercase">
                      Planned package
                    </dt>
                    <dd className="font-mono text-[11.5px] text-mint/90">
                      {packageName(integration.slug)}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="font-mono text-[10.5px] tracking-[0.12em] text-muted/80 uppercase">
                      Requires
                    </dt>
                    <dd className="text-[12.5px] text-muted">{integration.specs[0].value}</dd>
                  </div>
                </dl>

                <Link
                  href={`/${integration.slug}`}
                  className="group mt-auto inline-flex items-center gap-1.5 text-[13px] text-mint transition-colors hover:text-mint-bright"
                >
                  {integration.tools.length} tools planned · read the {integration.name} docs
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
                <h2 className="text-[17px] font-medium text-fg">
                  What the Community edition will include
                </h2>
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
                <h2 className="text-[17px] font-medium text-fg">Why it is not out yet</h2>
              </div>
              <p className="text-[13.5px] leading-relaxed text-muted">
                Agent automation that touches production files has to be boring and reversible. We
                are finishing the parts that make that true — checkpoint and rollback behaviour
                across every host application, the policy model, and audit output — before we put
                installers in front of anyone.
              </p>
              <p className="text-[13.5px] leading-relaxed text-muted">
                Design partners are testing against real production scenes now. If you want to be one
                of them, tell us what you run.
              </p>
              <ButtonLink href={notifyHref} variant="outline" className="mt-auto self-start">
                <Bell className="h-4 w-4" weight="bold" />
                Get notified
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Faq items={faq} id="download-faq" />

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
