"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import GLBViewer from "@/components/GLBViewer";

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

type ProjectImage = {
  src: string;
  caption: string;
  /** "phone" = tall mobile aspect, "browser" = wide desktop aspect. Defaults to "phone". */
  frame?: "phone" | "browser";
};

type ProjectLink = {
  label: string;
  href: string;
  /** Platform — picks the icon. Defaults to "external". */
  platform?: "ios" | "android" | "web" | "external";
};

type ProjectInfo = {
  title: string;
  time: string;
  description: string;
  stack: string[];
  glbSrc?: string;
  images?: ProjectImage[];
  links?: ProjectLink[];
};

const PROJECT_DATA: Record<string, ProjectInfo> = {
  "flightsmojo": {
    title: "Flight Booking App (FlightsMojo)",
    time: "Jul 2025 - Present",
    description: "Built and shipped the end-to-end FlightsMojo flight booking app for both iOS and Android using Flutter. Implemented multi-GDS flight search (Travelport NDC, Kafila, TripJack), Razorpay payment integration, Firebase/FCM push notifications, GA4 analytics with logPurchase events, booking confirmation flows, and offline connectivity overlays. Managed full App Store and Play Store submission cycles including rejection resolution.",
    stack: ["Flutter", "iOS", "Android", "Firebase", "Razorpay", "GA4"],
    glbSrc: "/models/flightsmojo.glb",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/flightsmojo-cheap-flights/id6757914588",
        platform: "ios",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.flightsmojo",
        platform: "android",
      },
    ],
    images: [
      { src: "/projects/flightsmojo/branding.png", caption: "Brand splash" },
      { src: "/projects/flightsmojo/flash-deals.png", caption: "Flash flight deals" },
      { src: "/projects/flightsmojo/search-results.png", caption: "Multi-GDS search results" },
      { src: "/projects/flightsmojo/trip-shield.png", caption: "Trip Shield protection" },
      { src: "/projects/flightsmojo/checkout.png", caption: "Razorpay checkout" },
    ],
  },
  "nxflow": {
    title: "NxFlow — Task & Project Management App",
    time: "2025 - Present",
    description: "Cross-platform task and project management app built in React Native (0.83, Hermes + new architecture) for iOS and Android. Implemented mobile + 6-digit MPIN authentication with secure Keychain storage and silent background token refresh, role-based access control across super-admin / project-admin / project-member roles, a 4-tab navigation (Tasks, Calendar, Projects, Profile) with lazy-loaded screens behind error boundaries and skeleton fallbacks, optimistic state updates, and a 30s in-memory cache backing the unified tasks + projects fetch. All sizing flows through a metrics scale (horizontalScale / verticalScale / moderateScale) for true responsive design across devices.",
    stack: ["React Native", "React Navigation", "Keychain", "TypeScript", "REST API", "Hermes"],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/nxflow/id6760958647",
        platform: "ios",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.nxflow",
        platform: "android",
      },
    ],
    images: [
      { src: "/projects/nxflow/onboarding.png", caption: "Onboarding" },
      { src: "/projects/nxflow/login.png", caption: "Mobile + MPIN auth" },
      { src: "/projects/nxflow/tasks.png", caption: "Tasks dashboard" },
      { src: "/projects/nxflow/calendar.png", caption: "Month-view calendar" },
      { src: "/projects/nxflow/projects.png", caption: "Projects directory" },
      { src: "/projects/nxflow/profile.png", caption: "Profile & settings" },
      { src: "/projects/nxflow/user-management.png", caption: "Admin user management" },
    ],
  },
  "help-center": {
    title: "Help Center Website",
    time: "Jul 2025 - Present",
    description: "Developed a customer support and help center portal using Next.js with App Router. Implemented SEO optimization, dynamic routing, and responsive UI. Integrated with Zendesk for ticket management and built a custom chatbot to replace Zendesk AI for omnichannel support routing.",
    stack: ["Next.js", "App Router", "Zendesk", "SEO", "Custom Chatbot"],
    links: [
      {
        label: "help.flightsmojo.in",
        href: "https://help.flightsmojo.in/",
        platform: "web",
      },
    ],
    images: [
      { src: "/projects/help-center/home.png", caption: "Help center home", frame: "browser" },
      { src: "/projects/help-center/knowledge-base.png", caption: "Knowledge base & self-service forms", frame: "browser" },
    ],
  },
  "flightsmojo-web": {
    title: "FlightsMojo Web Booking",
    time: "2025 - In development",
    description: "Building the FlightsMojo flight booking web platform in Next.js — the desktop counterpart to the Flutter mobile app. Currently in active UAT development. Implements responsive flight search across multiple GDS sources, fare comparison, currency localisation, Trip-Shield protection upsell, AI-powered fare alerts, and 24×7 customer support flows. Same brand system and search experience as the mobile app, designed mobile-first and scaling up to wide desktop layouts.",
    stack: ["Next.js", "App Router", "TypeScript", "Multi-GDS", "i18n", "Responsive"],
    links: [
      {
        label: "uat.flightsmojo.in",
        href: "https://uat.flightsmojo.in/",
        platform: "web",
      },
    ],
    images: [
      { src: "/projects/flightsmojo-web/search.png", caption: "Flight search", frame: "browser" },
      { src: "/projects/flightsmojo-web/deals.png", caption: "Offers & flash deals", frame: "browser" },
    ],
  },
  "tripshield": {
    title: "TripShield Claim Portal",
    time: "Jul 2025 - Present",
    description: "Built the TripShield travel-protection claim portal in Next.js — a multi-step flow (Eligibility → Claim Details → Evidence Upload → Review & Submit → Done) where customers file refundable-fare claims online with a 7-working-day decision SLA. Implemented sticky coverage / exclusion panels, evidence file uploads, validation rules around departure-time eligibility, and responsive HTML email templates for booking confirmations, schedule change notifications, and Trip Shield policy communications.",
    stack: ["Next.js", "App Router", "Multi-step Forms", "File Upload", "HTML Emails", "Responsive Design"],
    links: [
      {
        label: "tripshield.flightsmojo.in",
        href: "https://tripshield.flightsmojo.in/",
        platform: "web",
      },
    ],
    images: [
      { src: "/projects/tripshield/claim-portal.png", caption: "Claim portal — eligibility step", frame: "browser" },
      { src: "/projects/tripshield/coverage.png", caption: "Coverage & exclusions panels", frame: "browser" },
    ],
  },
  "3d-showroom": {
    title: "3D Interactive Showroom",
    time: "Nov 2023 - Nov 2024",
    description: "Designed and developed an immersive 3D showroom experience using Babylon.js, enabling users to view and customize product models with real-time material updates. Implemented a first-person walk-through feature for intuitive spatial exploration and product assessment.",
    stack: ["Babylon.js", "3D Rendering", "GLB Optimization"],
  },
  "threeworld": {
    title: "threeworld — SVG → Interactive 3D",
    time: "Apr 2025",
    description:
      "Forked from renatoworks/3dsvg and substantially upgraded. threeworld turns any SVG or text into a real-time 3D object — shipped as both an embeddable <SVG3D> React component (npm: 3dsvg) and a Next.js visual editor where designers pick from 10 PBR material presets, 7 animation modes, procedural textures, and configurable lighting, then export as PNG (up to 4K), 60fps video (MP4 via FFmpeg WASM, or WebM), or a GLB 3D model. The editor renders the engine directly, so what you see is exactly what you embed.",
    stack: [
      "Next.js 16",
      "React Three Fiber",
      "Three.js",
      "TypeScript",
      "tsup",
      "opentype.js",
      "FFmpeg WASM",
      "Tailwind v4",
      "shadcn/ui",
    ],
    links: [
      { label: "Try it live", href: "https://threeworld-web-j7a8.vercel.app/", platform: "web" },
      { label: "GitHub", href: "https://github.com/mishraadityan09/threeworld", platform: "external" },
    ],
    images: [
      { src: "/projects/threeworld/editor.png",    caption: "Visual editor — material + animation controls", frame: "browser" },
      { src: "/projects/threeworld/materials.png", caption: "10 PBR material presets",                       frame: "browser" },
      { src: "/projects/threeworld/export.png",    caption: "PNG export up to 4K, 60fps video export",       frame: "browser" },
      { src: "/projects/threeworld/embed.png",     caption: "Embed code generation — copy <SVG3D> JSX",      frame: "browser" },
    ],
  },
  "wifi-service": {
    title: "WiFi Service Application",
    time: "Jan 2025 - Jun 2025",
    description: "Building a Next.js app for a WiFi service provider with user and admin dashboards. Features include lead generation, customer onboarding, subscription management, and ticket support. Designed responsive UI with Tailwind CSS, MUI, and integrated RESTful APIs.",
    stack: ["Next.js", "Tailwind CSS", "Material UI", "RESTful APIs"],
  },
  "3d-viewer": {
    title: "3D Model Viewer Utility",
    time: "Nov 2023 - Nov 2024",
    description: "Created a web-based model viewer utility allowing users to upload, preview, and verify 3D model quality, including detailed analysis of mesh structure, naming conventions, and size optimization opportunities.",
    stack: ["Babylon.js", "JavaScript/TypeScript", "3D Validation"],
  },
  "healthcare-platform": {
    title: "Healthcare Mobile Application",
    time: "Apr 2023 - Oct 2023",
    description: "Built a cross-platform healthcare application using React Native for doctors to manage appointments, track patient status, and maintain electronic health records. Simultaneously developed a web version using Next.js for comprehensive platform coverage.",
    stack: ["React Native", "Next.js", "Cross-Platform"],
  },
  "siloho-camera": {
    title: "Siloho Camera App",
    time: "Aug 2022 - Apr 2023",
    description: "Developed a React Native camera application enabling employees to efficiently collect and share data during the interior design assessment process. Implemented custom gallery integration with device storage access and specialized photography tools.",
    stack: ["React Native", "Camera APIs", "Device Storage"],
  }
};

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

  useGSAP(
    () => {
      // Cinematic scroll-blur only fits pages with a 3D hero — on text-only project pages
      // there's no content beneath to crossfade into, so the page would just fade to an empty glass shell.
      if (!hasModel) return;

      const el = boxInfoRef.current;
      if (!el) return;

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
                className="group inline-flex items-center gap-2.5 text-sm border border-foreground/[0.12] bg-foreground/[0.04] backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 ease-out hover:border-[var(--main)]/40 hover:bg-foreground/[0.08] hover:shadow-[0_8px_28px_-8px_var(--main)]"
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
          <span key={tag} className="px-3 py-1 bg-white/10 rounded-md text-sm backdrop-blur-sm border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const hasRightColumn = hasModel || Boolean(heroImage);

  const heroVisualBlock = hasModel && data?.glbSrc ? (
    <div className="flex flex-col gap-2 lg:col-start-2 lg:row-start-1 lg:row-span-3">
      <div className="relative w-full aspect-square max-h-[60vh] lg:max-h-none bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-2xl overflow-hidden hover:shadow-[0_12px_48px_-12px_var(--main)] transition-shadow duration-500 ease-out">
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
      <div className={`relative w-full ${heroImage.frame === "browser" ? "aspect-[16/10]" : "aspect-[3/4]"} max-h-[70vh] lg:max-h-none bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-2xl overflow-hidden hover:shadow-[0_12px_48px_-12px_var(--main)] transition-shadow duration-500 ease-out`}>
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
      </div>
      <p className="text-xs text-foreground/40 uppercase tracking-widest text-center lg:text-left">
        {heroImage.caption}
      </p>
    </div>
  ) : null;

  return (
    <div className="w-full min-w-0 flex flex-col gap-y-10 relative">
      <Link
        href="/en/projects"
        className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors w-fit border border-white/10 bg-white/5 px-4 py-2 rounded-full"
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
            data-lenis-prevent
            className="
              flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              [touch-action:pan-x]
              sm:grid sm:grid-cols-2 sm:overflow-visible sm:gap-5 sm:mx-0 sm:px-0 sm:pb-0
              lg:grid-cols-3
            "
          >
            {galleryImages.map((img) => (
              <figure
                key={img.src}
                data-gallery-tile
                className="
                  group flex flex-col gap-2
                  shrink-0 w-[78vw] snap-start
                  sm:w-auto sm:shrink
                "
              >
                <div className={`relative w-full ${img.frame === "browser" ? "aspect-[16/10]" : "aspect-[3/6]"} bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-xl transition-shadow duration-500 ease-out group-hover:shadow-[0_12px_48px_-12px_var(--main)]`}>
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 78vw"
                    className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="text-xs text-foreground/50 uppercase tracking-widest">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
