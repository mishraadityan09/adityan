"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./Sidebar";

/**
 * Prev / next section links shown below the content on phones and tablets, where the
 * desktop sidebar is hidden. Derives its targets from NAV_ITEMS so every page stays in sync.
 */
export function MobilePager() {
  const pathname = usePathname();
  const index = NAV_ITEMS.findIndex((item) => item.href === pathname);
  if (index === -1) return null;

  const prev = NAV_ITEMS[(index - 1 + NAV_ITEMS.length) % NAV_ITEMS.length];
  const next = NAV_ITEMS[(index + 1) % NAV_ITEMS.length];

  return (
    <nav aria-label="Section navigation" className="lg:hidden mt-auto flex items-stretch justify-between gap-3 pt-2">
      <PagerLink href={prev.href} label={prev.label} direction="prev" />
      <PagerLink href={next.href} label={next.label} direction="next" />
    </nav>
  );
}

function PagerLink({
  href,
  label,
  direction,
}: {
  href: string;
  label: string;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-12 max-w-[48%] items-center gap-2.5 rounded-full border border-foreground/[0.12] bg-foreground/[0.04] px-4 transition-[background-color,transform] duration-200 active:scale-[0.97] active:bg-foreground/[0.08]",
        isNext && "flex-row-reverse text-right"
      )}
    >
      {isNext ? (
        <ArrowRight className="w-4 h-4 shrink-0 text-foreground/60" aria-hidden />
      ) : (
        <ArrowLeft className="w-4 h-4 shrink-0 text-foreground/60" aria-hidden />
      )}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/45">{direction}</span>
        <span className="truncate text-sm font-medium">{label}</span>
      </span>
    </Link>
  );
}
