import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteAnalytics } from "@/components/site/analytics";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "MCP for Blender",
    "MCP for Maya",
    "MCP for Houdini",
    "MCP for 3ds Max",
    "MCP for Rhino",
    "MCP for ZBrush",
    "MCP for Photoshop",
    "MCP for FreeCAD",
    "MCP for QGIS",
    "MCP server for 3D software",
    "MCP server for CAD",
    "AI agent for CAD",
    "AI control Blender with MCP",
    "production MCP for 3D software",
    "豆包 MCP",
    "通义千问 MCP 客户端",
    "国产 AI Agent MCP",
    "MCP 服务器 中文",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    site: site.twitter,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  sameAs: [site.github],
  knowsAbout: [
    "Model Context Protocol",
    "Blender automation",
    "Maya scene graph and rigging automation",
    "Houdini procedural FX and PDG automation",
    "3ds Max archviz automation",
    "ZBrush sculpting pipeline automation",
    "Photoshop texture production automation",
    "Rhino and Grasshopper automation",
    "FreeCAD parametric CAD",
    "QGIS geoprocessing",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  publisher: { "@type": "Organization", name: site.name, url: site.url },
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink">
        {children}
        <SiteAnalytics />
        <script
          type="application/ld+json"
          // Structured data is generated from trusted local config, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
      </body>
    </html>
  );
}
