"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { label: "Introduction", href: "/en" },
  { label: "Projects", href: "/en/projects" },
  { label: "Skills & Tools", href: "/en/skillstools" },
  { label: "Experience", href: "/en/experience" },
  { label: "Contact", href: "/en/contact" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col z-40 w-full bg-foreground/[0.03] border border-foreground/[0.08] backdrop-blur-2xl rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] content-skew content-border relative">
      <nav className="flex flex-col gap-3 relative">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block py-3 px-5 text-[15px] font-medium tracking-[0.1em] uppercase transition-colors duration-300 rounded-full relative z-10",
                isActive
                  ? "text-primary-foreground font-semibold"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 bg-primary z-[-1] rounded-full shadow-[inset_0_0_0_1px_var(--border)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
