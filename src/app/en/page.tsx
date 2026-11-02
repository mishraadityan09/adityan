import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PixelTransition from "@/components/PixelTransition";
import { MobilePager } from "@/components/layout/MobilePager";
import { cn } from "@/lib/utils";
import { pageMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/en",
  absoluteTitle: true,
});

// Structured data so search engines can show a Person knowledge panel for the site.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Frontend Developer",
  url: SITE_URL,
  image: `${SITE_URL}/background/adityan_profile.jpeg`,
  email: `mailto:${SOCIAL.email}`,
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
  worksFor: { "@type": "Organization", name: "FlightsMojo" },
  knowsAbout: ["React", "Next.js", "Flutter", "React Native", "TypeScript", "Three.js"],
};

export default function IntroductionPage() {
  return (
    <div className="flex flex-row gap-10 flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, "\\u003c") }}
      />
      {/* Left: text content */}
      <div className="flex flex-col gap-8 lg:gap-10 w-full">
        {/* Name + title (phones get a small portrait here; desktop shows the full pixel card on the right) */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Image
            src="/background/adityan_profile.jpeg"
            alt="Portrait of Adityan Mishra"
            width={160}
            height={213}
            sizes="80px"
            className="lg:hidden h-24 w-[72px] sm:h-28 sm:w-[84px] shrink-0 rounded-2xl object-cover object-top border border-foreground/10 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
            priority
          />
          <div className="flex min-w-0 flex-col gap-y-2 lg:gap-y-3">
            <h1 itemProp="name" className="topic">
              Adityan Mishra
            </h1>
            <p className="text-sm sm:text-lg md:text-xl uppercase font-normal">
              Frontend Developer — React · Next.js · Flutter
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-y-3">
          <p>
            Frontend Developer with 4+ years of experience building responsive
            web and mobile applications. I work across React, Next.js, and
            Flutter to deliver polished UIs — from e-commerce platforms and
            booking apps to 3D interactive showrooms.
          </p>
          <p>
            Currently at FlightsMojo, shipping production Flutter apps for iOS
            &amp; Android and Next.js web products.
          </p>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-10">
          <SocialLink
            href="https://www.linkedin.com/in/adityan-mishra-61ba18162/"
            label="LinkedIn"
            iconSrc="/icons-social/linkedin.svg"
          />
          <SocialLink
            href="https://github.com/mishraadityan09"
            label="GitHub"
            iconSrc="/icons-software/github.svg"
            invertInDark
          />
          <SocialLink
            href="/cv/Adityan.pdf"
            label="Resume"
            iconSrc="/icons-social/gmail.svg"
          />
        </div>

        {/* Education */}
        <div className="flex flex-col gap-y-2 text-sm">
          <Link
            href="https://www.jssaten.ac.in/"
            target="_blank"
            className="hover:text-main transition-colors"
          >
            JSS Academy of Technical Education, Noida
          </Link>
          <p>Bachelor of Computer Science</p>
          <p>Aug 2017 – Aug 2021</p>
        </div>

        <MobilePager />
      </div>

      {/* Right: actor image — desktop only */}
      <div className="hidden lg:block shrink-0">
        <PixelTransition
          firstContent={
            <Image
              src="/background/adityan_profile.jpeg"
              alt="Actor"
              width={280}
              height={480}
              className="object-cover object-top h-full max-h-[480px] rounded-sm"
              style={{ width: "auto" }}
              priority
            />
          }
          secondContent={
            <div className="w-full h-full p-5 flex flex-col justify-start gap-4 bg-stone-950 text-white">
              <Link
                target="_blank"
                href="https://www.jssaten.ac.in/"
                className="hover:underline hover:underline-offset-2 text-lg font-semibold"
              >
                JSS Academy of Technical Education
              </Link>
              <p className="font-light text-white/80">Bachelor of Computer Science</p>
              <p className="font-light text-white/80">Aug 2017 – Aug 2021</p>
              <p className="font-light text-white/80 mt-auto">Noida, India</p>
            </div>
          }
          gridSize={10}
          pixelColor="#ffffff"
          once={false}
          animationStepDuration={0.4}
          className="custom-pixel-card aspect-[280/480] w-[280px]"
        />
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  iconSrc,
  invertInDark = false,
}: {
  href: string;
  label: string;
  iconSrc: string;
  invertInDark?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-hover-btn inline-flex items-center gap-3 sm:gap-4 min-h-11 px-3 py-2 rounded-md border border-foreground/15 bg-foreground/[0.045] active:bg-foreground/[0.1] text-sm font-medium w-fit h-fit"
    >
      <Image
        src={iconSrc}
        alt=""
        width={22}
        height={22}
        className={cn("h-[22px] w-[22px] shrink-0", invertInDark && "dark:invert")}
      />
      {label}
      <ArrowUpRight className="w-4 h-4" aria-hidden />
    </a>
  );
}
