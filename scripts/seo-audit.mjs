#!/usr/bin/env node
/**
 * SEO metadata audit.
 *
 * Reads the *built* HTML rather than the source, because that is what crawlers
 * see: the root layout's `%s | DCCMCP` template appends to child titles, which
 * is how the homepage once ended up as "... | DCCMCP | DCCMCP".
 *
 * Run after `pnpm build`:  pnpm seo:audit
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = ".next/server/app";
const LIMITS = {
  titleHard: 65, // beyond this Google truncates; hard error
  titleWarn: 60,
  descMax: 165,
  descMin: 70, // short descriptions waste the snippet
};

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith(".html") ? [full] : [];
  });
}

const unescape = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
   .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x2F;/g, "/");

function read(file) {
  const html = readFileSync(file, "utf8");
  const pick = (re) => {
    const m = html.match(re);
    return m ? unescape(m[1]) : "";
  };
  return {
    title: pick(/<title>(.*?)<\/title>/s),
    description: pick(/<meta name="description" content="(.*?)"/s),
    canonical: pick(/<link rel="canonical" href="(.*?)"/),
    ogTitle: pick(/<meta property="og:title" content="(.*?)"/),
  };
}

let errors = 0;
let warns = 0;
const rows = [];

for (const file of walk(ROOT).sort()) {
  const path = "/" + relative(ROOT, file).replace(/\.html$/, "");
  if (path.startsWith("/api") || path.startsWith("/_")) continue; // framework internals

  const page = read(file);
  const issues = [];

  if (!page.title) issues.push("ERROR no <title>");
  else {
    if (page.title.length > LIMITS.titleHard) issues.push(`ERROR title ${page.title.length} > ${LIMITS.titleHard}`);
    else if (page.title.length > LIMITS.titleWarn) issues.push(`warn  title ${page.title.length} > ${LIMITS.titleWarn}`);
  }

  if (!page.description) issues.push("ERROR no meta description");
  else if (page.description.length > LIMITS.descMax) issues.push(`ERROR description ${page.description.length} > ${LIMITS.descMax}`);
  else if (page.description.length < LIMITS.descMin) issues.push(`warn  description ${page.description.length} < ${LIMITS.descMin}`);

  // The brand must appear exactly once — the template already adds it.
  const brandHits = (page.title.match(/DCCMCP/g) ?? []).length;
  if (brandHits > 1) issues.push(`ERROR brand repeated ${brandHits}× in title`);

  if (!page.canonical) issues.push("ERROR no canonical");
  if (!page.ogTitle) issues.push("warn  no og:title");

  for (const i of issues) {
    if (i.startsWith("ERROR")) errors++;
    else warns++;
  }
  rows.push({ path, len: page.title.length, issues, title: page.title });
}

rows.sort((a, b) => b.len - a.len);
console.log(`${rows.length} pages · ${errors} errors · ${warns} warnings\n`);
console.log("longest titles:");
for (const r of rows.slice(0, 6)) console.log(`  ${String(r.len).padStart(3)}  ${r.path}`);

const flagged = rows.filter((r) => r.issues.length);
if (flagged.length) {
  console.log("\nproblems:");
  for (const r of flagged) console.log(`  ${r.path}\n      ${r.issues.join("\n      ")}`);
} else {
  console.log("\nno problems found");
}

process.exit(errors > 0 ? 1 : 0);
