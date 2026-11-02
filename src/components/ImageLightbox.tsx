"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 48;

// false on the server and during hydration, true once mounted — lets us portal without a mismatch.
const subscribeNoop = () => () => {};
const useMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

/**
 * Full-screen viewer for project screenshots. Tap outside the image, press Escape or hit the
 * close button to dismiss; swipe, arrow keys or the side buttons move between images.
 */
export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null && images[index] !== undefined;
  const count = images.length;

  // Scroll lock + focus management for the time the viewer is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (!open || index === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) onNavigate((index + 1) % count);
      else if (e.key === "ArrowLeft" && count > 1) onNavigate((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, index, count, onClose, onNavigate]);

  const current = open && index !== null ? images[index] : null;
  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index !== null) onNavigate((index - 1 + count) % count);
  };
  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index !== null) onNavigate((index + 1) % count);
  };

  if (!mounted) return null;

  // Portaled to <body> so it sits above the floating nav and outside the skewed/transformed
  // content shell (a transformed ancestor would otherwise hijack position: fixed).
  return createPortal(
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-[200] flex flex-col bg-background"
          // Tapping anywhere except the picture itself closes the viewer.
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "IMG") onClose();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null || count < 2) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
            touchStartX.current = null;
            if (dx <= -SWIPE_THRESHOLD) goNext();
            else if (dx >= SWIPE_THRESHOLD) goPrev();
          }}
        >
          <div className="flex items-center justify-between px-[max(1rem,env(safe-area-inset-left))] pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 tabular-nums">
              {index + 1} / {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/[0.12] bg-foreground/[0.06] text-foreground transition-colors hover:bg-foreground/[0.12] active:bg-foreground/[0.16]"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex-1 min-h-0 px-2 sm:px-16">
            <motion.div
              key={current.src}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain select-none"
                draggable={false}
              />
            </motion.div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-foreground/[0.12] bg-background/80 text-foreground transition-colors hover:bg-foreground/[0.12]"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next image"
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-foreground/[0.12] bg-background/80 text-foreground transition-colors hover:bg-foreground/[0.12]"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </>
            )}
          </div>

          <p className="px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] text-center text-xs uppercase tracking-[0.2em] text-foreground/60">
            {current.caption ?? current.alt}
            {count > 1 && <span className="sm:hidden text-foreground/35"> · swipe</span>}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
