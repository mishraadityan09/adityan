"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ProjectCard({ project }: { project: Project }) {
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
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
          className="block relative group cursor-pointer overflow-visible bg-foreground/[0.03] border border-foreground/[0.08] rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-xl transition-colors duration-500 ease-out hover:bg-foreground/[0.08]"
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
