import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/section";
import { footerNav, site } from "@/lib/site";
import { integrations } from "@/lib/integrations";
import { getChrome } from "@/i18n/ui";
import { localePath, type Locale } from "@/i18n/config";

const zhNav = [
  {
    title: "产品",
    links: [
      { label: "即将发布", href: "/download" },
      { label: "全部集成", href: "/integrations" },
      { label: "定价", href: "/pricing" },
      { label: "文档", href: "/docs" },
      { label: "企业版", href: "/enterprise" },
    ],
  },
  {
    title: "开发者",
    links: [
      { label: "快速开始", href: "/docs#quickstart" },
      { label: "工具参考", href: "/docs#tools" },
      { label: "策略与审批", href: "/docs#policy" },
      { label: "审计与回滚", href: "/docs#audit" },
      { label: "支持的 Agent", href: "/docs#clients" },
    ],
  },
  {
    title: "公司",
    links: [
      { label: "博客", href: "/blog" },
      { label: "关于我们", href: "/about" },
      { label: "设计伙伴计划", href: "/enterprise" },
      { label: "联系我们", href: "/enterprise" },
    ],
  },
  {
    title: "法律",
    links: [
      { label: "服务条款", href: "/legal/terms" },
      { label: "隐私政策", href: "/legal/privacy" },
      { label: "Cookie 政策", href: "/legal/cookies" },
      { label: "数据处理协议", href: "/legal/dpa" },
      { label: "子处理者", href: "/legal/sub-processors" },
      { label: "可接受使用", href: "/legal/acceptable-use" },
      { label: "安全", href: "/legal/security" },
      { label: "第三方声明", href: "/legal/third-party-notice" },
    ],
  },
] as const;

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const year = new Date().getFullYear();
  const c = getChrome(locale);
  const link = (path: string) => localePath(locale, path);
  const groups = locale === "zh" ? zhNav : footerNav;

  return (
    <footer className="relative border-t border-line bg-ink-deep">
      <Container className="py-14 sm:py-16">
        <nav aria-label="Integrations" className="mb-12 border-b border-line pb-10">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
            {c.footer.serversFor}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {integrations.map((integration) => (
              <li key={integration.slug}>
                <Link
                  href={link(`/${integration.slug}`)}
                  className="inline-flex items-center rounded-lg border border-line bg-panel px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-mint/40 hover:text-mint"
                >
                  {integration.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={link("/enterprise")}
                className="inline-flex items-center rounded-lg border border-dashed border-line px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-mint/40 hover:text-mint"
              >
                {c.footer.yourSoftware}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_2.4fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[40ch] text-sm leading-relaxed text-muted">
              {locale === "zh"
                ? "DCC · CAD · GIS 与视觉软件的生产级 MCP Server。"
                : "Production MCP servers for DCC, CAD, GIS and vision software."}
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                className="text-muted transition-colors hover:text-mint"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((item) => (
                    <li key={`${group.title}-${item.href}-${item.label}`}>
                      <Link
                        href={link(item.href)}
                        className="text-[13px] leading-relaxed text-muted transition-colors hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8">
          <p className="max-w-[92ch] text-[12px] leading-relaxed text-muted/80">
            {c.footer.disclaimer}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-muted">
              &copy; {year} {site.name}. {c.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted">
              <Link className="transition-colors hover:text-fg" href={link("/legal/terms")}>
                {locale === "zh" ? "条款" : "Terms"}
              </Link>
              <Link className="transition-colors hover:text-fg" href={link("/legal/privacy")}>
                {locale === "zh" ? "隐私" : "Privacy"}
              </Link>
              <Link className="transition-colors hover:text-fg" href={link("/legal/cookies")}>
                {locale === "zh" ? "Cookie" : "Cookies"}
              </Link>
              <Link className="transition-colors hover:text-fg" href={link("/legal/dpa")}>
                DPA
              </Link>
              <Link
                className="transition-colors hover:text-fg"
                href={link("/legal/third-party-notice")}
              >
                {locale === "zh" ? "第三方声明" : "Third-party notice"}
              </Link>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success"
                  aria-hidden="true"
                />
                {c.footer.status}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
