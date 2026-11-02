import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/en",
    display: "standalone",
    background_color: "#121318",
    theme_color: "#121318",
    icons: [
      { src: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/seo/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/seo/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
