"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import GLBViewer from "@/components/GLBViewer";
import { ImageLightbox } from "@/components/ImageLightbox";
import { PROJECT_DATA } from "./project-data";

// Brand-accurate platform glyphs (App Store / Play Store) — kept inline so they pick up currentColor.
const AppleGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden {...props}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM263.3 89.4c26.7-31.7 24.3-60.6 23.5-71-23.6 1.4-50.9 16.1-66.4 34.2-17.1 19.4-27.2 43.4-25 70.5 25.5 2 48.8-11.1 67.9-33.7z"/>
  </svg>
);

const PlayStoreGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden {...props}>
    <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256.6L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
  </svg>
);

// Ensure GSAP registers plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function ProjectDetail({ project }: { project: string }) {
  const boxInfoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const data = PROJECT_DATA[project];
  const hasModel = Boolean(data?.glbSrc);
  const heroImage = !hasModel && data?.images?.[0] ? data.images[0] : null;
  const galleryImages = data?.images
    ? hasModel
      ? data.images
      : data.images.slice(1)
    : [];

  // Tap-to-enlarge for every screenshot (hero + gallery share one index space).
  const lightboxImages = (data?.images ?? []).map((img) => ({ src: img.src, alt: img.caption, caption: img.caption }));
  const galleryOffset = hasModel ? 0 : 1;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // Cinematic scroll-blur only fits pages with a 3D hero — on text-only project pages
      // there's no content beneath to crossfade into, so the page would just fade to an empty glass shell.
      if (!hasModel) return;

      const el = boxInfoRef.current;
      if (!el) return;

      // Desktop + mouse only. Pinning plus an animated blur() filter re-rasterizes the hero on every
      // scroll frame — exactly the kind of work that makes phones stutter, so they skip it.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          filter: "blur(5px)",
          opacity: 0,
          scale: 0.9,
          scrollTrigger: {
            trigger: el,
            start: "bottom bottom-=100",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 0.5,
            pinType: "transform",
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [hasModel] }
  );

  useGSAP(
    () => {
      const root = galleryRef.current;
      if (!root) return;
      const tiles = root.querySelectorAll<HTMLElement>("[data-gallery-tile]");
      if (!tiles.length) return;

      gsap.from(tiles, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
      });
    },
    { dependencies: [galleryImages.length] }
  );

  const titleBlock = (
    <div className="flex flex-col gap-3 lg:col-start-1">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {data ? data.title : project.replace("-", " ")}
        </h1>
        <p className="text-xs text-foreground/60 mt-1">
          {data ? data.time : "2024 - 2025"}
        </p>
      </div>
      {data?.links && data.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.links.map((link) => {
            const platform = link.platform ?? "external";
            const Icon =
              platform === "ios"
                ? AppleGlyph
                : platform === "android"
                ? PlayStoreGlyph
                : ExternalLinkIcon;
            const subLabel =
              platform === "ios"
                ? "Download on"
                : platform === "android"
                ? "Get it on"
                : null;
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-sm border border-foreground/[0.12] bg-foreground/[0.04] px-4 py-2 rounded-full transition-all duration-300 ease-out hover:border-[var(--main)]/40 hover:bg-foreground/[0.08] hover:shadow-[0_8px_28px_-8px_var(--main)]"
              >
                <Icon className="w-4 h-4 text-foreground/70 group-hover:text-foreground transition-colors shrink-0" />
                <span className="leading-tight flex flex-col items-start">
                  {subLabel && (
                    <span className="text-[10px] uppercase tracking-widest text-foreground/40 group-hover:text-foreground/60 transition-colors">
                      {subLabel}
                    </span>
                  )}
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm font-medium">
                    {link.label}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );

  const descriptionBlock = (
    <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed lg:col-start-1">
      {data ? data.description : "This project description is being generated."}
    </p>
  );

  const stackBlock = (
    <div className="flex flex-col gap-2 lg:col-start-1">
      <p className="text-sm font-semibold uppercase tracking-widest text-foreground/40">Tech Stack</p>
      <div className="flex flex-wrap gap-2">
        {(data ? data.stack : ["Next.js", "GSAP", "Tailwind CSS"]).map((tag) => (
          <span key={tag} className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const hasRightColumn = hasModel || Boolean(heroImage);

  const heroVisualBlock = hasModel && data?.glbSrc ? (
    <div className="flex flex-col gap-2 lg:col-start-2 lg:row-start-1 lg:row-span-3">
      <div className="relative w-full aspect-square max-h-[60vh] lg:max-h-none bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_12px_48px_-12px_var(--main)] transition-shadow duration-500 ease-out">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,color-mix(in_oklch,var(--main)_18%,transparent),transparent_60%)]"
        />
        <GLBViewer
          src={data.glbSrc}
          className="w-full h-full relative"
          autoRotate={true}
          enableControls={true}
          cameraDistance={2.4}
        />
      </div>
      <p className="text-xs text-foreground/40 uppercase tracking-widest text-center lg:text-left">
        Drag to rotate · scroll to zoom
      </p>
    </div>
  ) : heroImage ? (
    <div className="flex flex-col gap-2 lg:col-start-2 lg:row-start-1 lg:row-span-3">
      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        aria-label={`View ${heroImage.caption} full size`}
        className={`block w-full text-left cursor-zoom-in relative ${heroImage.frame === "browser" ? "aspect-[16/10]" : "aspect-[3/4]"} max-h-[70vh] lg:max-h-none bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_12px_48px_-12px_var(--main)] active:scale-[0.99] transition-[box-shadow,transform] duration-500 ease-out`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,color-mix(in_oklch,var(--main)_18%,transparent),transparent_60%)]"
        />
        <Image
          src={heroImage.src}
          alt={heroImage.caption}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-contain p-4"
          priority
        />
      </button>
      <p className="text-xs text-foreground/40 uppercase tracking-widest text-center lg:text-left">
        {heroImage.caption}
      </p>
    </div>
  ) : null;

  return (
    <div className="w-full min-w-0 flex flex-col gap-y-10 relative">
      <Link
        href="/en/projects"
        className="flex items-center gap-2 min-h-10 text-sm text-foreground/60 hover:text-foreground active:bg-foreground/[0.08] transition-colors w-fit border border-foreground/10 bg-foreground/5 px-4 py-2 rounded-full"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back to Projects
      </Link>

      {hasRightColumn ? (
        <div
          ref={boxInfoRef}
          className="grid grid-cols-1 gap-8 lg:gap-10 items-start min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(320px,42%)]"
        >
          {titleBlock}
          {heroVisualBlock}
          {descriptionBlock}
          {stackBlock}
        </div>
      ) : (
        <div ref={boxInfoRef} className="flex flex-col gap-8 lg:max-w-3xl">
          {titleBlock}
          {descriptionBlock}
          {stackBlock}
        </div>
      )}

      {galleryImages.length > 0 && (
        <section ref={galleryRef} className="flex flex-col gap-6 min-w-0 overflow-x-clip">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/40">
              Screens
            </h2>
            <p className="text-xs text-foreground/40">
              <span className="sm:hidden">Swipe</span>
              <span className="hidden sm:inline">
                {galleryImages.length} {galleryImages.length === 1 ? "screen" : "screens"}
              </span>
            </p>
          </div>
          <div
            className="
              flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-5 px-5 scroll-pl-5
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              [touch-action:pan-x]
              sm:grid sm:grid-cols-2 sm:overflow-visible sm:gap-5 sm:mx-0 sm:px-0 sm:pb-0
              lg:grid-cols-3
            "
          >
            {galleryImages.map((img, i) => (
              <figure
                key={img.src}
                data-gallery-tile
                className="
                  group flex flex-col gap-2
                  shrink-0 w-[min(72vw,300px)] snap-start
                  sm:w-auto sm:shrink
                "
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i + galleryOffset)}
                  aria-label={`View ${img.caption} full size`}
                  className={`block w-full text-left cursor-zoom-in relative ${img.frame === "browser" ? "aspect-[16/10]" : "aspect-[9/16]"} bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] active:scale-[0.98] transition-[box-shadow,transform] duration-500 ease-out group-hover:shadow-[0_12px_48px_-12px_var(--main)]`}
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 78vw"
                    className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </button>
                <figcaption className="text-xs text-foreground/50 uppercase tracking-widest">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
