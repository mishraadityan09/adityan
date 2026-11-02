import type { Metadata } from "next";
import type { NavItem } from "@/types";

/**
 * Canonical origin for every absolute URL in metadata (Open Graph, canonical, sitemap, robots).
 *
 * VERCEL_PROJECT_PRODUCTION_URL is the stable production domain and is set on every Vercel
 * deployment, previews included. VERCEL_URL is deliberately NOT used: it is the per-deployment
 * hostname, which sits behind Vercel's SSO on preview builds — social crawlers that followed it
 * got a login redirect instead of the preview image.
 */
const PRODUCTION_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "adityan-phi.vercel.app";

export const SITE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : `https://${PRODUCTION_HOST}`;

export const SITE_NAME = "Adityan Mishra";
export const SITE_TITLE = "Adityan Mishra — Frontend Developer";
export const SITE_DESCRIPTION =
  "Frontend Developer with 4+ years building responsive web and mobile apps in React, Next.js and Flutter — from flight booking platforms to 3D showrooms.";

export const SOCIAL = {
  github: "https://github.com/mishraadityan09",
  linkedin: "https://www.linkedin.com/in/adityan-mishra-61ba18162/",
  email: "adityanmishra36@gmail.com",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Introduction", href: "/en" },
  { label: "Projects", href: "/en/projects" },
  { label: "Skills & Tools", href: "/en/skillstools" },
  { label: "Experience", href: "/en/experience" },
  { label: "Contact", href: "/en/contact" },
];

export type OgImage = { url: string; width?: number; height?: number; alt: string };

export const DEFAULT_OG_IMAGE: OgImage = {
  url: "/seo/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};

type PageMetadataInput = {
  /** Rendered as "<title> · Adityan Mishra" unless `absoluteTitle` is set. */
  title: string;
  /** Shown in search results and link previews. Keep it under ~160 characters. */
  description: string;
  /** Route path, e.g. "/en/projects" — becomes the canonical URL and og:url. */
  path: string;
  image?: OgImage;
  absoluteTitle?: boolean;
};

/**
 * Complete Metadata for one page. Next merges nested fields (openGraph, twitter) by replacement,
 * not deep-merge, so a page that sets only `openGraph.title` loses the shared image. Building the
 * whole block here keeps title, description, canonical, Open Graph and Twitter in agreement.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
