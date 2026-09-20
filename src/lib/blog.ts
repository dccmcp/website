import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

/**
 * English posts live at src/content/blog, Chinese posts in the zh/ subfolder.
 * readdirSync is not recursive, so the English listing never picks up the
 * Chinese files even though they sit underneath it.
 */
const BLOG_DIRS: Record<Locale, string> = {
  en: path.join(process.cwd(), "src/content/blog"),
  zh: path.join(process.cwd(), "src/content/blog/zh"),
};

const DATE_LOCALES: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  keywords: string[];
  featured?: boolean;
};

export type Post = PostMeta & { content: string };

function readPost(dir: string, fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    readingTime: (data.readingTime as string) ?? "6 min read",
    category: (data.category as string) ?? "Guides",
    keywords: (data.keywords as string[]) ?? [],
    featured: Boolean(data.featured),
    content,
  };
}

export function getAllPosts(locale: Locale = "en"): Post[] {
  const dir = BLOG_DIRS[locale];
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => readPost(dir, file))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale: Locale = "en"): Post | undefined {
  return getAllPosts(locale).find((post) => post.slug === slug);
}

export function formatDate(date: string, locale: Locale = "en") {
  return new Date(date).toLocaleDateString(DATE_LOCALES[locale], {
    year: "numeric",
    month: locale === "zh" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
