"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/types";
import { FINE_POINTER_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const CARD_SURFACE =
  "block relative overflow-hidden bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]";

/**
 * Mouse devices get the 3D tilt + hover preview; touch devices get a plain card with the
 * preview image inline. Splitting the two keeps 14 spring-driven 3D layers off phones.
 */
export function ProjectCard({ project }: { project: Project }) {
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  return finePointer ? <TiltCard project={project} /> : <TouchCard project={project} />;
}

function TouchCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className={`${CARD_SURFACE} group transition-[transform,background-color] duration-200 active:scale-[0.98] active:bg-foreground/[0.06]`}
    >
      {project.previewImage && (
        <div className="relative h-40 w-full border-b border-foreground/[0.06] bg-foreground/[0.03]">
          <Image
            src={project.previewImage}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cn(
              "object-cover",
              // Phone screenshots lead with their header; browser screenshots lead with chrome, so show their middle.
              project.previewFrame === "browser" ? "object-center" : "object-top"
            )}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-5">
        <p className="font-bold text-lg leading-snug tracking-wide text-foreground">{project.title}</p>
        <p className="line-clamp-3 text-[15px] text-foreground/60 font-light leading-relaxed">
          {project.description}
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/50">
          View project
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild>
        <motion.a
          ref={ref}
          href={project.href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`${CARD_SURFACE} group cursor-pointer overflow-visible p-6 transition-colors duration-500 ease-out hover:bg-foreground/[0.08]`}
        >
          {/* Dynamic Glow Shadow under the card interacting on hover */}
          <div className="absolute inset-0 bg-transparent rounded-3xl z-[-1] transition-shadow duration-500 group-hover:shadow-[0_12px_48px_-12px_var(--main)]" />

          <div
            style={{ transform: "translateZ(30px)" }}
            className="flex flex-col gap-2 relative z-10"
          >
            <p className="font-bold text-xl text-left tracking-wide transition-colors duration-300 text-foreground group-hover:text-[var(--main)]">
              {project.title}
            </p>
            <p className="line-clamp-3 text-left text-[15px] text-foreground/60 font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </motion.a>
      </HoverCardTrigger>
      {project.previewImage && (
        <HoverCardContent className="flex w-52 max-h-[55vh] flex-col gap-0.5 z-[100] border-foreground/20 bg-background/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl">
          <Image
            src={project.previewImage}
            alt={project.title}
            width={500}
            height={500}
            className="w-full h-auto max-h-[calc(55vh-1rem)] object-contain rounded-xl"
          />
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
