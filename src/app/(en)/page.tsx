import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { IntegrationsGrid } from "@/components/sections/integrations-grid";
import { Agents } from "@/components/sections/agents";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Proof } from "@/components/sections/proof";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { Faq } from "@/components/sections/faq";
import { homeFaq } from "@/lib/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "DCCMCP Official — MCP for Blender, Rhino, QGIS & CAD" },
  description:
    "DCCMCP connects AI agents to Blender, Rhino, FreeCAD and QGIS with typed, audited MCP servers — read-only by default, local, and reversible.",
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/zh" } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${site.name} — MCP Servers for Creative & Engineering Software`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Windows, Linux",
  url: site.url,
  description: site.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Community plan includes every public integration with a read-only default policy.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <IntegrationsGrid />
      <Agents />
      <Features />
      <HowItWorks />
      <Proof />
      <PricingPreview />
      <Faq />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, softwareSchema]) }}
      />
    </>
  );
}
