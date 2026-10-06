import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ExperienceItem } from "@/types";

export const metadata = { title: "Experience | Adityan Mishra" };

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "FlightsMojo",
    role: "Frontend Developer (Flutter & Next.js)",
    period: "Jul 2025 – Present",
    location: "Remote",
    points: [
      "Built and shipped the end-to-end FlightsMojo flight booking app for iOS & Android using Flutter — ~50K Android and ~12K iOS downloads, with the app alone contributing ₹6–7 lakh in revenue per day. Multi-GDS search (Travelport NDC, Kafila, TripJack), Razorpay payments, Firebase/FCM push notifications, GA4 analytics, and full App Store / Play Store release cycles.",
      "Built and shipped flightsmojo.in in Next.js — the flight booking web platform and the company's main source of revenue, with multi-GDS search, fare comparison, currency localisation, Trip-Shield upsell, and 24×7 support flows.",
      "Replaced Zendesk with a self-hosted Chatwoot fork — one omnichannel inbox for WhatsApp, email, website chat widget, and API channels across 5 markets, handling 10,000–15,000 tickets a month and cutting support costs from $850/month to about $100/month. Built an AI chatbot on WhatsApp and web chat (booking-status lookup, Help Centre answers, human handoff), plus a Zendesk-style ticket table, sticky assignment, and per-country inbound email.",
      "Developed help.flightsmojo.in in Next.js with App Router across 8 country domains — SEO optimization and dynamic routing, now running on our self-hosted Chatwoot (portal API for articles, Chatwoot API for tickets, and the Chatwoot chat widget).",
      "Built tripshield.flightsmojo.in in Next.js — travel protection landing site and responsive HTML email templates for booking confirmations and policy communications.",    ],
  },
  {
    company: "Freelance Frontend Developer",
    role: "Independent Contractor",
    period: "Jan 2025 – Jun 2025",
    location: "Remote",
    points: [
      "Built a Next.js app for a WiFi service provider with user and admin dashboards — lead generation, customer onboarding, subscription management, and ticket support using Tailwind CSS, MUI, and RESTful APIs.",
    ],
  },
  {
    company: "Innodesign",
    role: "Frontend Developer",
    period: "Nov 2023 – Nov 2024",
    location: "Rajkot, India",
    points: [
      "Designed and developed an immersive 3D showroom using Babylon.js with real-time material updates and a first-person walk-through feature.",
      "Implemented GLB model processing techniques reducing model sizes by 80% while preserving visual fidelity, significantly improving load times.",
      "Created a web-based model viewer utility for uploading, previewing, and verifying 3D model quality including mesh structure and size analysis.",
    ],
  },
  {
    company: "Cloudastra",
    role: "Software Developer",
    period: "Apr 2023 – Oct 2023",
    location: "Noida, India",
    points: [
      "Designed and developed the company's primary website (Cloudastra.co) showcasing projects and services.",
      "Built a cross-platform healthcare app in React Native for doctors to manage appointments and EHRs, with a parallel Next.js web version.",
      "Developed a location-based Flutter app for healthcare camp management integrating Google Maps API for nearby camp discovery and booking.",
      "Built a Flutter web app for health policy advisory — coverage verification and smart policy recommendations.",
    ],
  },
  {
    company: "Siloho",
    role: "Frontend Developer",
    period: "Aug 2022 – Apr 2023",
    location: "Goa, India",
    points: [
      "Developed a React Native camera app for interior design data collection and client sharing workflows.",
      "Built a customizable e-commerce platform for home and interior design with interactive space visualization.",
      "Engineered internal tools using JavaScript/jQuery and a 3D rendering UI using JSTree and jQuery data tables.",
    ],
  },
  {
    company: "Orryworx",
    role: "Associate Developer",
    period: "Jan 2022 – Jul 2022",
    location: "Gurgaon, India",
    points: [
      "Collaborated on a life management platform for guardians and conservators — legal compliance, financial affairs, and medical information management. Implemented new features and resolved production issues.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <>
      <div className="flex flex-col gap-y-3">
        <h1 className="topic">Experience</h1>
        <p className="text-sm text-muted-foreground">
          4+ years across startups and agencies — web, mobile, and 3D.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {EXPERIENCE.map((job) => (
          <ExperienceCard key={job.company + job.period} job={job} />
        ))}
      </div>

      {/* Mobile prev/next */}
      <div className="lg:hidden flex justify-between flex-1 items-end">
        <Link
          href="/en/skillstools"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden />
          prev
        </Link>
        <Link
          href="/en/contact"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          next
          <ArrowRight className="w-5 h-5" aria-hidden />
        </Link>
      </div>
    </>
  );
}

function ExperienceCard({ job }: { job: ExperienceItem }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-main/40 pl-5">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <p className="font-bold text-base uppercase tracking-wide">{job.company}</p>
          <p className="text-xs text-muted-foreground shrink-0">{job.location}</p>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <p className="text-sm text-main">{job.role}</p>
          <p className="text-xs text-muted-foreground shrink-0">{job.period}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-2 list-none">
        {job.points.map((point, i) => (
          <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
            <span className="text-main mt-1 shrink-0">◦</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
