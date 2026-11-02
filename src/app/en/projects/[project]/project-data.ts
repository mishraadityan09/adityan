// Project content for /en/projects/[project]. Plain data (no "use client") so both the
// server page (generateMetadata / generateStaticParams / sitemap) and the client view can import it.

export type ProjectImage = {
  src: string;
  caption: string;
  /** "phone" = tall mobile aspect, "browser" = wide desktop aspect. Defaults to "phone". */
  frame?: "phone" | "browser";
};

export type ProjectLink = {
  label: string;
  href: string;
  /** Platform — picks the icon. Defaults to "external". */
  platform?: "ios" | "android" | "web" | "external";
};

export type ProjectInfo = {
  title: string;
  time: string;
  description: string;
  stack: string[];
  glbSrc?: string;
  images?: ProjectImage[];
  links?: ProjectLink[];
};

export const PROJECT_DATA: Record<string, ProjectInfo> = {
  "flightsmojo": {
    title: "Flight Booking App (FlightsMojo)",
    time: "Jul 2025 - Present",
    description: "Built and shipped the end-to-end FlightsMojo flight booking app for both iOS and Android using Flutter. The app has ~50K downloads on Android and ~12K on iOS and books tickets every day, with the app alone contributing ₹6–7 lakh in revenue per day. Implemented multi-GDS flight search (Travelport NDC, Kafila, TripJack), Razorpay payment integration, Firebase/FCM push notifications, GA4 analytics with logPurchase events, booking confirmation flows, and offline connectivity overlays. Managed full App Store and Play Store submission cycles including rejection resolution.",
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
    description: "Developed a customer support and help center portal using Next.js with App Router. Implemented SEO optimization, dynamic routing, and responsive UI across 8 country domains. Moved it off Zendesk onto our self-hosted Chatwoot: Help Centre articles load from the Chatwoot portal API (rendered from Markdown, with 301 redirects for old Zendesk article URLs), support tickets and booking inquiries are created through the Chatwoot API, and live chat runs on the Chatwoot web widget.",
    stack: ["Next.js", "App Router", "Chatwoot API", "SEO", "Multi-domain"],
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
    time: "2025 - Present",
    description: "Built and shipped the FlightsMojo flight booking web platform in Next.js — now live in production and the company's main source of revenue. Implements responsive flight search across multiple GDS sources, fare comparison, currency localisation, Trip-Shield protection upsell, and 24×7 customer support flows. Same brand system and search experience as the mobile app, designed mobile-first and scaling up to wide desktop layouts.",
    stack: ["Next.js", "App Router", "TypeScript", "Multi-GDS", "i18n", "Responsive"],
    links: [
      {
        label: "flightsmojo.in",
        href: "https://flightsmojo.in/",
        platform: "web",
      },
    ],
    images: [
      { src: "/projects/flightsmojo-web/search.png", caption: "Flight search", frame: "browser" },
      { src: "/projects/flightsmojo-web/deals.png", caption: "Offers & flash deals", frame: "browser" },
    ],
  },
  "support-platform": {
    title: "Self-Hosted Support Platform (Chatwoot fork)",
    time: "Jul 2026 - Present",
    description:
      "Replaced Zendesk with a self-hosted, FlightsMojo-branded fork of Chatwoot running on our own server. It brings WhatsApp, email, the website chat widget, and API channels (web ticket forms and TripShield claims) into one omnichannel inbox across 5 markets (IN, AE, US, UK, ID), with team routing and labels. It now handles about 7,000 conversations and 22,000+ inbound messages a week (27,000+ agent replies), with 43,000+ conversations handled since launch, and saves about $900/month net — that is after the server and OpenAI API costs, from replacing both Zendesk and Emailgistics. Email workflows built inside Chatwoot replaced Emailgistics for the shared mailboxes: per-market and per-purpose inboxes (including the airline-disruption IROP agency mailbox) land in the same queue with automatic labels such as irop, booking_issue and partner_query, priorities, and routing to the Cancellations & Refunds and IROP teams. Built an AI chatbot (Gemini, then OpenAI, with function calling) on WhatsApp and web chat that looks up booking status, answers from Help Centre articles migrated from Zendesk, persists the booking ID on the conversation, auto-resolves quiet chats, and hands off to human agents. On the agent side, the fork adds a Zendesk-style ticket table, in-app ticket tabs with Play / Next queue navigation, sticky assignment that routes returning customers to their last agent, live open-ticket and folder counts in the sidebar, and a booking-ID chip on every conversation. Also set up per-country inbound email through a Postfix relay with Netcore sending, and a CI pipeline that builds tagged, versioned images for each release.",
    stack: [
      "Chatwoot",
      "Ruby on Rails",
      "Vue.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker Compose",
      "GitHub Actions",
      "Gemini / OpenAI",
    ],
    images: [
      {
        src: "/projects/support-platform/weekly-reports.png",
        caption: "One week of conversations — 6.8K conversations, 22K messages received, 27K sent",
        frame: "browser",
      },
      {
        src: "/projects/support-platform/inbox.png",
        caption: "Omnichannel inbox — WhatsApp, email, chat and web tickets with labels, teams and priorities",
        frame: "browser",
      },
      {
        src: "/projects/support-platform/admin-dashboard.png",
        caption: "Super-admin dashboard — 16 inboxes, 33 agents, 22.5K conversations in the last 30 days (726 a day)",
        frame: "browser",
      },
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
    time: "Apr 2025 - Present",
    description:
      "Forked from renatoworks/3dsvg with substantial upgrades I shipped: a 99%+ reduction in 3D model export size (100MB+ → under 1MB), SVG color retention so uploaded SVGs preserve their original colors in the 3D output, a fix for render flickering on model load, a space-nebula background with colored point lights that dynamically cast onto the model, a redesigned editor UI (cleaner top navigation, larger drawing canvas, better edit-panel UX), and improved default lighting for a better out-of-the-box experience. The editor turns any SVG, text, or pixel art into an interactive 3D object — export as PNG (up to 4K), video (MP4/WebM), or a 3D model (GLB/STL/OBJ). Also ships an embeddable React component: drop <SVG3D text=\"Hello\" animate=\"spin\" /> into any React app and get a fully interactive 3D object instantly. Built with Three.js, React Three Fiber, and Next.js.",
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
  "cloak": {
    title: "Cloak — Private Remote for Claude Code",
    time: "Jun 2026 - Present",
    description:
      "Designed and shipped Cloak, a private, self-hosted remote for coding agents — drive Claude Code, Codex, or Cursor running on your own computer from your phone, with nothing passing through a vendor cloud. Two halves: the cloak-remote npm CLI (run npx cloak-remote on the host) and an Expo / React Native app, live on Google Play. The host drives Claude through the Agent SDK for chat and node-pty for a full terminal mirror, then exposes an encrypted WebSocket over a free outbound-only Cloudflare tunnel (with a LAN fallback). Pairing is a QR scan: ECDH P-256 key exchange (no secret ever transmitted) → per-message AES-256-GCM with per-session forward secrecy → PIN second factor → biometric unlock, with the shared crypto running identically in Node and React Native via @noble. In the app: a chat view where every edit and command is gated behind an inline diff (approve / deny), a terminal tab with esc / ^C / ctrl keys and a snippets sheet, per-session agent and folder pickers, multiple live sessions that survive disconnects and sleep, reconnect handling, push notifications when a session needs you, and customizable themes. Works on macOS, Linux, and Windows.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js CLI",
      "Claude Agent SDK",
      "node-pty",
      "WebSocket",
      "Cloudflare Tunnel",
      "E2E Crypto (@noble)",
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.cloakapp.app",
        platform: "android",
      },
      { label: "npm — cloak-remote", href: "https://www.npmjs.com/package/cloak-remote", platform: "external" },
      { label: "cloak-intro.vercel.app", href: "https://cloak-intro.vercel.app/", platform: "web" },
    ],
    images: [
      { src: "/projects/cloak/pairing.png", caption: "Pair with npx cloak-remote" },
      { src: "/projects/cloak/pin.png", caption: "PIN second factor" },
      { src: "/projects/cloak/folder-picker.png", caption: "Pick a folder per session" },
      { src: "/projects/cloak/chat.png", caption: "Chat with Claude Code" },
      { src: "/projects/cloak/terminal.png", caption: "Full terminal mirror" },
      { src: "/projects/cloak/snippets.png", caption: "Command snippets" },
    ],
  },
  "cloak-intro": {
    title: "Cloak Landing Site",
    time: "Jun 2026 - Present",
    description:
      "Built the marketing site for Cloak in Next.js 16 (App Router) with React 19 and Tailwind v4. It has an Apple-style scroll experience built with GSAP: ScrollSmoother inertia scrolling, a pinned \"watch it work\" product scrub, a horizontal-scroll feature gallery, SplitText masked reveals, and subtle parallax, all with prefers-reduced-motion and no-JS fallbacks. It also includes an animated phone mockup of the app, a folder-driven demo section (one phone per clip), a contact form that sends email through Resend via a Server Action, generated Open Graph / Twitter images, a privacy policy page for the Play Store listing, a mobile hamburger nav, and Vercel Analytics.",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "GSAP", "ScrollTrigger", "Resend", "Vercel"],
    links: [
      { label: "cloak-intro.vercel.app", href: "https://cloak-intro.vercel.app/", platform: "web" },
      { label: "GitHub", href: "https://github.com/mishraadityan09/cloak-intro", platform: "external" },
    ],
    images: [
      { src: "/projects/cloak-intro/hero.png", caption: "Hero with live phone mockup", frame: "browser" },
      { src: "/projects/cloak-intro/features.png", caption: "Horizontal-scroll feature gallery", frame: "browser" },
      { src: "/projects/cloak-intro/security.png", caption: "Security section", frame: "browser" },
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

export const PROJECT_SLUGS = Object.keys(PROJECT_DATA);
