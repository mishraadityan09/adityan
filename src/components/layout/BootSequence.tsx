"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function BootSequence({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      }}
      className="flex-1 w-full h-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
