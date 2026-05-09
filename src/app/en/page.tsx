import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import PixelTransition from "@/components/PixelTransition";

export const metadata = {
  title: "Adityan Mishra — Frontend Developer",
};

export default function IntroductionPage() {
  return (
    <div className="flex flex-row gap-10 flex-1">
      {/* Left: text content */}
      <div className="flex flex-col gap-10 w-full">
        {/* Name + title */}
        <div className="flex flex-col gap-y-3">
          <h1
            itemProp="name"
            className="topic"
          >
            Adityan Mishra
          </h1>
          <p className="md:text-xl uppercase font-normal text-lg">
            Frontend Developer — React · Next.js · Flutter
          </p>
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
        <div className="flex flex-wrap gap-10">
          <SocialLink
            href="https://www.linkedin.com/in/adityan-mishra-61ba18162/"
            label="LinkedIn"
            iconSrc="/icons-social/linkedin.svg"
          />
          <SocialLink
            href="https://github.com/mishraadityan09"
            label="GitHub"
            iconSrc="/icons-software/github.svg"
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

        {/* Mobile prev/next */}
        <div className="lg:hidden flex justify-between flex-1 items-end">
          <PrevNextLink href="/en/contact" direction="prev" />
          <PrevNextLink href="/en/projects" direction="next" />
        </div>
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
}: {
  href: string;
  label: string;
  iconSrc: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-hover-btn inline-flex items-center gap-4 px-3 py-2 rounded-md border border-white/15 bg-white/[0.045] text-sm font-medium w-fit h-fit"
    >
      <Image src={iconSrc} alt={label} width={22} height={22} className="shrink-0" style={{ height: "auto" }} />
      {label}
      <ArrowUpRight className="w-4 h-4" aria-hidden />
    </a>
  );
}

function PrevNextLink({
  href,
  direction,
}: {
  href: string;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={href}
      className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
    >
      {direction === "prev" && <ArrowLeft className="w-5 h-5" aria-hidden />}
      {direction}
      {direction === "next" && <ArrowRight className="w-5 h-5" aria-hidden />}
    </Link>
  );
}
