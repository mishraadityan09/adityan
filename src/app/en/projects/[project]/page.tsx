import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import ProjectDetail from "./ProjectDetail";
import { PROJECT_DATA, PROJECT_SLUGS } from "./project-data";

type Props = { params: Promise<{ project: string }> };

export function generateStaticParams() {
  return PROJECT_SLUGS.map((project) => ({ project }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const data = PROJECT_DATA[project];
  if (!data) return {};
  // Wide screenshots make a good link-preview card; phone screenshots get letterboxed, so fall back to the site image.
  const cover = data.images?.find((image) => image.frame === "browser");
  return pageMetadata({
    title: data.title,
    description: summarize(data.description),
    path: `/en/projects/${project}`,
    image: cover ? { url: cover.src, alt: `${data.title} — ${cover.caption}` } : undefined,
  });
}

export default async function Page({ params }: Props) {
  const { project } = await params;
  if (!PROJECT_DATA[project]) notFound();
  return <ProjectDetail project={project} />;
}

/** First ~160 characters of the description, cut at a word boundary — what search results and previews show. */
function summarize(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
