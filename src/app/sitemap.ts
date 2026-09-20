import type { MetadataRoute } from "next";
import { integrations } from "@/lib/integrations";
import { getAllPosts } from "@/lib/blog";
import { legalDocs } from "@/lib/legal";
import { site } from "@/lib/site";

/**
 * Pages that exist in both locales. Each pair gets reciprocal hreflang
 * alternates so search engines treat them as one document, not duplicates.
 * Legal documents are English-only on purpose and are listed separately.
 */
const bilingualPathways = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/integrations", changeFrequency: "weekly", priority: 0.9 },
  { path: "/download", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/docs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/enterprise", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localized: MetadataRoute.Sitemap = bilingualPathways.flatMap((page) => {
    const enUrl = `${site.url}${page.path === "/" ? "/" : page.path}`;
    const zhUrl = `${site.url}/zh${page.path === "/" ? "" : page.path}`;
    const languages = { en: enUrl, zh: zhUrl };

    return [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      },
      {
        url: zhUrl,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      },
    ];
  });

  const integrationPages: MetadataRoute.Sitemap = integrations.flatMap((integration) => {
    const lastModified = new Date(integration.updated ?? now);
    const enUrl = `${site.url}/${integration.slug}`;
    const zhUrl = `${site.url}/zh/${integration.slug}`;
    const languages = { en: enUrl, zh: zhUrl };

    return [
      {
        url: enUrl,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: integration.featured ? 0.95 : 0.9,
        alternates: { languages },
      },
      {
        url: zhUrl,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: integration.featured ? 0.95 : 0.9,
        alternates: { languages },
      },
    ];
  });

  const posts: MetadataRoute.Sitemap = getAllPosts().flatMap((post) => {
    const lastModified = new Date(post.date);
    const enUrl = `${site.url}/blog/${post.slug}`;
    const zhUrl = `${site.url}/zh/blog/${post.slug}`;
    const languages = { en: enUrl, zh: zhUrl };

    return [
      {
        url: enUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages },
      },
      {
        url: zhUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages },
      },
    ];
  });

  const legal: MetadataRoute.Sitemap = legalDocs.map((doc) => ({
    url: `${site.url}/legal/${doc.slug}`,
    lastModified: new Date(doc.updated),
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...localized, ...integrationPages, ...posts, ...legal];
}
