import { Analytics } from "@vercel/analytics/next";

/**
 * Website analytics are cookieless and only activate when the site is served
 * from Vercel. Nothing is loaded on other hosts, so self-hosted and
 * air-gapped deployments stay completely offline.
 */
export function SiteAnalytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "on") return null;
  return <Analytics />;
}
