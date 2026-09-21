import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { HtmlLang } from "@/components/site/html-lang";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — 面向创意与工程软件的 MCP 服务`,
    template: `%s | ${site.name}`,
  },
  description:
    "DCCMCP 提供生产级 MCP Server 与插件，让 AI Agent 直接操作 Blender、Maya、Houdini、3ds Max、Rhino、ZBrush、Photoshop、FreeCAD 与 QGIS —— 带类型化工具、安全策略、检查点与审计日志。",
  alternates: { canonical: "/zh" },
  openGraph: { locale: "zh_CN", url: "/zh" },
};

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        跳到主要内容
      </a>
      <HtmlLang locale="zh" />
      <Navbar locale="zh" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale="zh" />
    </>
  );
}
