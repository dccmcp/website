import type { MetadataRoute } from "next";
import { integrations } from "@/lib/integrations";
import { getAllPosts } from "@/lib/blog";
import { legalDocs } from "@/lib/legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: `${site.url}/`, zh: `${site.url}/zh` } },
    },
    { url: `${site.url}/zh`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/integrations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/download`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/enterprise`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const integrationPages: MetadataRoute.Sitemap = integrations.map((integration) => ({
    url: `${site.url}/${integration.slug}`,
    lastModified: new Date(integration.updated ?? now),
    changeFrequency: "weekly",
    priority: integration.featured ? 0.95 : 0.9,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const legal: MetadataRoute.Sitemap = legalDocs.map((doc) => ({
    url: `${site.url}/legal/${doc.slug}`,
    lastModified: new Date(doc.updated),
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...core, ...integrationPages, ...posts, ...legal];
}
