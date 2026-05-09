"use client";

import Link from "next/link";
import { Sun, Moon, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./Sidebar";
import ScrambledText from "@/components/scrambled-text";
import { MagneticButton } from "@/components/MagneticButton";
import { AnimatePresence, motion } from "framer-motion";

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav className="pointer-events-auto flex items-center justify-between px-6 h-[64px] w-full max-w-[1366px] bg-foreground/[0.03] border border-foreground/[0.08] backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] content-skew content-border">
          <Link
            href="/en"
            className="text-2xl font-bold tracking-[0.2em] text-foreground transition-opacity hover:opacity-80 uppercase"
          >
            <ScrambledText>AM.</ScrambledText>
          </Link>


          <div className="flex items-center gap-4">
            {/* Theme toggle — hidden on mobile */}
            <MagneticButton>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="hidden lg:flex relative items-center justify-center w-10 h-10 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] hover:bg-foreground/[0.08] transition-colors"
              >
                {mounted && (
                  <>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" aria-hidden />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" aria-hidden />
                  </>
                )}
                <span className="sr-only">Theme</span>
              </button>
            </MagneticButton>



            {/* Mobile menu button — only shown on small screens */}
            <MagneticButton>
              <button
                className="lg:hidden flex items-center gap-2 text-sm font-medium px-4 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-foreground"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                Menu
                <Plus className="w-4 h-4" aria-hidden />
              </button>
            </MagneticButton>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden fixed inset-x-4 top-[100px] z-[100] bg-background/80 backdrop-blur-2xl border border-foreground/10 rounded-3xl p-6 flex flex-col gap-2 shadow-2xl"
          >
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block text-lg font-medium tracking-wide py-3 px-4 rounded-xl hover:bg-foreground/5 transition-colors text-foreground/80 hover:text-[var(--main)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
