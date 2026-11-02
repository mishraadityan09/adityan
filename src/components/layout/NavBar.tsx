"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sun, Moon, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/site";
import ScrambledText from "@/components/scrambled-text";
import { MagneticButton } from "@/components/MagneticButton";

const QUICK_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adityan-mishra-61ba18162/",
    iconSrc: "/icons-social/linkedin.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/mishraadityan09",
    iconSrc: "/icons-software/github.svg",
    invertInDark: true,
  },
  { label: "Resume", href: "/cv/Adityan.pdf", iconSrc: "/icons-social/gmail.svg" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Close the sheet whenever the route changes (covers back/forward navigation too).
  const [openedOnPath, setOpenedOnPath] = useState(pathname);
  if (pathname !== openedOnPath) {
    setOpenedOnPath(pathname);
    setOpen(false);
  }

  // While the sheet is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <div className="fixed top-4 lg:top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-[max(0.75rem,env(safe-area-inset-left),env(safe-area-inset-right))] lg:px-4">
        <nav
          aria-label="Primary"
          className="pointer-events-auto flex items-center justify-between px-4 sm:px-6 h-[60px] lg:h-[64px] w-full max-w-[1366px] bg-background/70 lg:bg-foreground/[0.03] border border-foreground/[0.08] backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] content-skew content-border"
        >
          <Link
            href="/en"
            aria-label="Adityan Mishra — home"
            className="text-xl lg:text-2xl font-bold tracking-[0.2em] text-foreground transition-opacity hover:opacity-80 uppercase"
          >
            <ScrambledText>AM.</ScrambledText>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <MagneticButton>
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] hover:bg-foreground/[0.08] active:bg-foreground/[0.1] transition-colors"
              >
                {/* Both icons render; CSS picks the visible one, so there is nothing to hydrate-mismatch. */}
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" aria-hidden />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" aria-hidden />
              </button>
            </MagneticButton>

            {/* Mobile menu button — only shown below lg */}
            <MagneticButton className="lg:hidden">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex items-center gap-2 text-sm font-medium px-4 h-10 rounded-full border border-foreground/[0.12] bg-foreground/[0.04] active:bg-foreground/[0.1] transition-colors text-foreground"
              >
                {open ? "Close" : "Menu"}
                <Plus
                  className={cn("w-4 h-4 transition-transform duration-300", open && "rotate-45")}
                  aria-hidden
                />
              </button>
            </MagneticButton>
          </div>
        </nav>
      </div>

      {/* Mobile navigation sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 z-[90] bg-background/70 cursor-default"
            />
            <motion.div
              key="panel"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden fixed inset-x-3 top-[84px] z-[100] rounded-3xl border border-foreground/10 bg-background/95 backdrop-blur-xl p-3 shadow-2xl flex flex-col gap-1"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 + 0.05 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between min-h-12 px-4 rounded-2xl text-base font-medium tracking-wide transition-colors",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/80 hover:bg-foreground/5 active:bg-foreground/10"
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs tabular-nums opacity-50">0{index + 1}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-2 flex gap-2 border-t border-foreground/10 pt-3">
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 min-h-11 rounded-xl border border-foreground/[0.1] bg-foreground/[0.04] active:bg-foreground/[0.08] text-sm transition-colors"
                  >
                    <Image
                      src={link.iconSrc}
                      alt=""
                      width={18}
                      height={18}
                      className={cn("h-[18px] w-[18px]", link.invertInDark && "dark:invert")}
                    />
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
