"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Page enter transition. Mounted from `app/en/template.tsx`, so it replays on every
 * navigation. Animates opacity + translate only — both run on the compositor thread,
 * which keeps it smooth on phones (the previous rotateX forced a 3D re-raster of the
 * whole glass shell).
 */
export function BootSequence({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 w-full flex flex-col gap-8 lg:gap-10"
    >
      {children}
    </motion.div>
  );
}
