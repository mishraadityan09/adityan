import type { MetadataRoute } from "next";
import { NAV_ITEMS, SITE_URL } from "@/lib/site";
import { PROJECT_SLUGS } from "./en/projects/[project]/project-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = NAV_ITEMS.map(({ href }) => ({
    url: `${SITE_URL}${href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: href === "/en" ? 1 : 0.8,
  }));
  const projects = PROJECT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/en/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...projects];
}
