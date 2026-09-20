import type { Locale } from "./config";

type Chrome = {
  nav: {
    integrations: string;
    comingSoon: string;
    pricing: string;
    docs: string;
    blog: string;
    enterprise: string;
  };
  cta: {
    getNotified: string;
    readDocs: string;
  };
  menu: {
    allIntegrations: string;
    privateBridge: string;
    browseAll: string;
    tools: string;
    integrationsCount: string;
    integrationsBlurb: string;
  };
  footer: {
    product: string;
    developers: string;
    company: string;
    legal: string;
    serversFor: string;
    yourSoftware: string;
    rights: string;
    status: string;
    disclaimer: string;
  };
  switchLabel: string;
};

export const chrome: Record<Locale, Chrome> = {
  en: {
    nav: {
      integrations: "Integrations",
      comingSoon: "Coming soon",
      pricing: "Pricing",
      docs: "Docs",
      blog: "Blog",
      enterprise: "Enterprise",
    },
    cta: {
      getNotified: "Get notified",
      readDocs: "Read the docs",
    },
    menu: {
      allIntegrations: "All integrations",
      privateBridge: "Request a private bridge",
      browseAll: "Browse all integrations",
      tools: "tools",
      integrationsCount: "integrations",
      integrationsBlurb:
        "typed tools across DCC, CAD, GIS and vision software. Every product has its own page with the full tool list and support matrix.",
    },
    footer: {
      product: "Product",
      developers: "Developers",
      company: "Company",
      legal: "Legal",
      serversFor: "MCP Servers for",
      yourSoftware: "+ your in-house software",
      rights: "All rights reserved.",
      status: "All systems operational",
      disclaimer:
        "DCCMCP provides independent, third-party MCP integrations. We build MCP servers and adapters that connect AI agents to software made by others — we do not develop, publish or support those applications, and we are not affiliated with, endorsed by, sponsored by or certified by any vendor or project we interoperate with, including Autodesk, Adobe, Maxon, the Blender Foundation, Robert McNeel & Associates, the FreeCAD project, the QGIS project and the OpenCV project. That list is illustrative, not exhaustive: the same applies to every other vendor, project or product named on this site. All product names, logos and brands are the property of their respective owners and are used for identification and compatibility purposes only.",
    },
    switchLabel: "Language",
  },
  zh: {
    nav: {
      integrations: "集成",
      comingSoon: "即将发布",
      pricing: "定价",
      docs: "文档",
      blog: "博客",
      enterprise: "企业版",
    },
    cta: {
      getNotified: "订阅发布通知",
      readDocs: "阅读文档",
    },
    menu: {
      allIntegrations: "全部集成",
      privateBridge: "定制私有集成",
      browseAll: "浏览全部集成",
      tools: "个工具",
      integrationsCount: "个集成",
      integrationsBlurb:
        "个类型化工具，覆盖 DCC、CAD、GIS 与视觉软件。每个产品都有独立页面，含完整工具清单与版本支持矩阵。",
    },
    footer: {
      product: "产品",
      developers: "开发者",
      company: "公司",
      legal: "法律",
      serversFor: "支持的软件",
      yourSoftware: "+ 你的自研工具",
      rights: "保留所有权利。",
      status: "所有系统运行正常",
      disclaimer:
        "DCCMCP 提供独立的第三方 MCP 集成服务。我们只开发连接 AI Agent 与他人软件的 MCP Server 与适配层——不开发、不发行、也不为这些宿主软件提供技术支持；我们与任何被集成或被提及的厂商、项目均无隶属、背书、赞助或认证关系，包括 Autodesk、Adobe、Maxon、Blender Foundation、Robert McNeel & Associates、FreeCAD 项目、QGIS 项目与 OpenCV 项目。以上列举仅为示例、并非完整清单，本条款同样适用于本站提及的所有其他厂商、项目与产品。所有产品名称、标识与商标归各自权利人所有，本站仅用于识别与兼容性说明。",
    },
    switchLabel: "语言",
  },
};

export function getChrome(locale: Locale) {
  return chrome[locale];
}
