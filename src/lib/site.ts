export const site = {
  name: "DCCMCP",
  domain: "dccmcp.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dccmcp.com",
  tagline: "MCP Servers for DCC, CAD, GIS & Vision Software",
  description:
    "Production-grade MCP Servers, plugins and tool bridges that let Claude, Cursor and your own agents control Blender, Maya, Houdini, 3ds Max, Rhino, ZBrush, Photoshop, FreeCAD and QGIS — safely, with typed tools, safety policies and audit logs.",
  email: "support@dccmcp.com",
  github: "https://github.com/dccmcp",
  discord: "https://discord.gg/dccmcp",
  docs: "/docs",
  twitter: "@dccmcp",
} as const;

export const nav = [
  { label: "Integrations", href: "/integrations" },
  { label: "Coming soon", href: "/download" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Enterprise", href: "/enterprise" },
] as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Coming soon", href: "/download" },
      { label: "All integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Documentation", href: "/docs" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Quickstart", href: "/docs#quickstart" },
      { label: "Tool reference", href: "/docs#tools" },
      { label: "Policies & approvals", href: "/docs#policy" },
      { label: "Audit & rollback", href: "/docs#audit" },
      { label: "Skills SDK", href: "/docs#skills" },
      { label: "Changelog", href: "/docs#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Design partner program", href: "/enterprise#contact" },
      { label: "Contact sales", href: "/enterprise#contact" },
      { label: "Status", href: "/docs#status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Sub-processors", href: "/legal/sub-processors" },
      { label: "Acceptable Use", href: "/legal/acceptable-use" },
      { label: "Security", href: "/legal/security" },
      { label: "Third-party notice", href: "/legal/third-party-notice" },
    ],
  },
] as const;

/** Software we integrate on the enterprise track, not part of the public launch set. */
export const pendingSoftware = [
  "Revit",
  "Civil 3D",
  "KiCad",
  "Ansys",
  "Grasshopper",
  "Maya-based in-house tools",
] as const;
