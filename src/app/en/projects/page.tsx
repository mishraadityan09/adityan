import type { Project } from "@/types";
import { ProjectCard } from "@/components/ProjectCard";
import { MobilePager } from "@/components/layout/MobilePager";

export const metadata = { title: "Projects | Adityan Mishra" };

const PROJECTS: Project[] = [
  {
    title: "Self-Hosted Support Platform — Chatwoot fork (replacing Zendesk & Emailgistics)",
    description:
      "Replaced Zendesk with a self-hosted, FlightsMojo-branded Chatwoot fork — one omnichannel inbox for WhatsApp, email, website chat widget, and API channels across 5 markets. Handles ~7,000 conversations and 22,000+ inbound messages a week (43,000+ conversations so far) and saves about $900/month net of server and OpenAI API costs by replacing both Zendesk and Emailgistics. Email workflows for the shared mailboxes, an AI chatbot on WhatsApp and web chat with booking-status lookup and human handoff, a Zendesk-style ticket table, and sticky assignment.",
    href: "/en/projects/support-platform",
    previewImage: "/projects/support-platform/weekly-reports.png",
    previewFrame: "browser",
  },
  {
    title: "Help Center Website — help.flightsmojo.in",
    description:
      "Customer support portal built with Next.js App Router across 8 country domains. SEO optimization and dynamic routing, running on our self-hosted Chatwoot — articles from the Chatwoot portal API, tickets created through the Chatwoot API, and the Chatwoot chat widget.",
    href: "/en/projects/help-center",
    previewImage: "/projects/help-center/home.png",
    previewFrame: "browser",
  },
  {
    title: "FlightsMojo — Flight Booking App (Flutter)",
    description:
      "End-to-end flight booking app for iOS & Android — ~50K Android and ~12K iOS downloads, booking tickets every day with the app alone contributing ₹6–7 lakh in daily revenue. Multi-GDS search (Travelport NDC, Kafila, TripJack), Razorpay payments, Firebase/FCM push notifications, GA4 analytics, and full App Store / Play Store release cycles.",
    href: "/en/projects/flightsmojo",
    previewImage: "/projects/flightsmojo/branding.png",
  },
  {
    title: "Cloak — Private Remote for Claude Code (React Native + Node CLI)",
    description:
      "Drive Claude Code, Codex, or Cursor on your computer from your phone. Expo / React Native app (live on Google Play) with a chat view that gates every edit behind a diff, plus a full terminal mirror. Paired with the cloak-remote npm CLI over a QR-paired, end-to-end-encrypted (ECDH P-256 + AES-256-GCM) Cloudflare tunnel. No account, no cloud.",
    href: "/en/projects/cloak",
    previewImage: "/projects/cloak/pairing.png",
  },
  {
    title: "Cloak Landing Site — cloak-intro.vercel.app",
    description:
      "Marketing site for Cloak built with Next.js 16 + Tailwind v4 and an Apple-style GSAP scroll experience — ScrollSmoother inertia, a pinned product scrub, horizontal-scroll feature gallery, and SplitText reveals with reduced-motion fallbacks. Resend contact form, generated OG images, and a Play Store privacy policy.",
    href: "/en/projects/cloak-intro",
    previewImage: "/projects/cloak-intro/hero.png",
    previewFrame: "browser",
  },
  {
    title: "NxFlow — Task & Project Management App (React Native)",
    description:
      "Cross-platform task and project management app for iOS & Android. Mobile + 6-digit MPIN auth with secure Keychain storage, auto-refresh tokens, role-based access (super-admin / project-admin / project-member), 4-tab navigation, optimistic updates, and a 30s in-memory cache backing the tasks + projects feed.",
    href: "/en/projects/nxflow",
    previewImage: "/projects/nxflow/onboarding.png",
  },
  {
    title: "FlightsMojo Web Booking — flightsmojo.in",
    description:
      "FlightsMojo's main source of revenue. Next.js flight booking web platform with multi-GDS search, fare comparison, currency localisation, and Trip-Shield upsell. Live in production.",
    href: "/en/projects/flightsmojo-web",
    previewImage: "/projects/flightsmojo-web/search.png",
    previewFrame: "browser",
  },
  {
    title: "TripShield Claim Portal — tripshield.flightsmojo.in",
    description:
      "Multi-step claim filing portal for travel-protection refunds — Eligibility → Claim Details → Evidence Upload → Review & Submit. Built in Next.js with file uploads, sticky coverage panels, and responsive HTML email templates.",
    href: "/en/projects/tripshield",
    previewImage: "/projects/tripshield/claim-portal.png",
    previewFrame: "browser",
  },
  {
    title: "threeworld — Turn SVGs into Interactive 3D",
    description:
      "Forked from renatoworks/3dsvg with substantial upgrades — 99%+ smaller 3D model exports (100MB+ → under 1MB), SVG color retention, a space-nebula background with dynamic point lights, redesigned editor UI, and a render-flicker fix. Turns any SVG, text, or pixel art into an interactive 3D object; exports PNG/video/GLB/STL/OBJ; ships an embeddable React component. Built with Three.js, React Three Fiber, and Next.js.",
    href: "/en/projects/threeworld",
    previewImage: "/projects/threeworld/hero.png",
    previewFrame: "browser",
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
        <p className="text-sm text-muted-foreground">
          A collection of real-world projects I&apos;ve built, tracking my
          progress from the first lines of code to full-stack systems.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <MobilePager />
    </>
  );
}
