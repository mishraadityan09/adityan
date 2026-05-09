import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata = { title: "Projects | Adityan Mishra" };

const PROJECTS: Project[] = [
  {
    title: "FlightsMojo — Flight Booking App (Flutter)",
    description:
      "End-to-end flight booking app for iOS & Android. Multi-GDS search (Travelport NDC, Kafila, TripJack), Razorpay payments, Firebase/FCM push notifications, GA4 analytics, and full App Store / Play Store release cycles.",
    href: "/en/projects/flightsmojo",
    previewImage: "/projects/flightsmojo/branding.png",
  },
  {
    title: "NxFlow — Task & Project Management App (React Native)",
    description:
      "Cross-platform task and project management app for iOS & Android. Mobile + 6-digit MPIN auth with secure Keychain storage, auto-refresh tokens, role-based access (super-admin / project-admin / project-member), 4-tab navigation, optimistic updates, and a 30s in-memory cache backing the tasks + projects feed.",
    href: "/en/projects/nxflow",
    previewImage: "/projects/nxflow/onboarding.png",
  },
  {
    title: "Help Center Website — help.flightsmojo.in",
    description:
      "Customer support portal built with Next.js App Router. SEO optimization, dynamic routing, Zendesk integration, and a custom chatbot for omnichannel support routing.",
    href: "/en/projects/help-center",
    previewImage: "/projects/help-center/home.png",
  },
  {
    title: "FlightsMojo Web Booking — flightsmojo.in (in development)",
    description:
      "Desktop counterpart to the FlightsMojo mobile app. Next.js flight booking web platform with multi-GDS search, fare comparison, currency localisation, Trip-Shield upsell, AI-powered fare alerts. Currently in active UAT development.",
    href: "/en/projects/flightsmojo-web",
    previewImage: "/projects/flightsmojo-web/search.png",
  },
  {
    title: "TripShield Claim Portal — tripshield.flightsmojo.in",
    description:
      "Multi-step claim filing portal for travel-protection refunds — Eligibility → Claim Details → Evidence Upload → Review & Submit. Built in Next.js with file uploads, sticky coverage panels, and responsive HTML email templates.",
    href: "/en/projects/tripshield",
    previewImage: "/projects/tripshield/claim-portal.png",
  },
  {
    title: "threeworld — Turn SVGs into Interactive 3D",
    description:
      "Open-source npm package + visual editor. The <SVG3D> React component embeds extruded 3D text/SVGs with PBR materials and animations; the editor lets anyone design 3D objects from text or SVG and export as PNG, video, or 3D model. Built on React Three Fiber. Forked from renatoworks/3dsvg and substantially upgraded.",
    href: "/en/projects/threeworld",
    previewImage: "/projects/threeworld/hero.png",
  },
  {
    title: "3D Interactive Showroom (Babylon.js)",
    description:
      "Immersive 3D showroom using Babylon.js with real-time material updates and first-person walk-through. Implemented GLB model optimization reducing sizes by 80% while preserving visual fidelity.",
    href: "/en/projects/3d-showroom",
  },
  {
    title: "WiFi Service Application (Next.js)",
    description:
      "Full-stack Next.js app for a WiFi provider with user and admin dashboards. Lead generation, customer onboarding, subscription management, and ticket support with Tailwind CSS + MUI.",
    href: "/en/projects/wifi-service",
  },
  {
    title: "3D Model Viewer (Babylon.js)",
    description:
      "Interactive 3D model viewer displaying mesh properties, texture visualization, and real-time material adjustments for model assessment and quality verification.",
    href: "/en/projects/3d-viewer",
  },
  {
    title: "Healthcare Platform (React Native + Next.js)",
    description:
      "Cross-platform healthcare app for doctors to manage appointments, track patient status, and maintain EHRs — built in React Native for mobile and Next.js for web.",
    href: "/en/projects/healthcare-platform",
  },
  {
    title: "Siloho Camera App (React Native)",
    description:
      "Hybrid mobile camera app for interior design documentation. Custom gallery integration, specialized photography tools, and direct client sharing workflows.",
    href: "/en/projects/siloho-camera",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-y-3">
        <h1 itemProp="projects" className="topic">
          Projects
        </h1>
        <h3 className="text-sm text-muted-foreground">
          A collection of real-world projects I&apos;ve built, tracking my
          progress from the first lines of code to full-stack systems.
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {/* Mobile prev/next */}
      <div className="lg:hidden flex justify-between flex-1 items-end">
        <Link
          href="/en"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden />
          prev
        </Link>
        <Link
          href="/en/skillstools"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          next
          <ArrowRight className="w-5 h-5" aria-hidden />
        </Link>
      </div>
    </>
  );
}
