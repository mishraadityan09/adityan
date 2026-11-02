"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Mouse-driven devices — hover effects, cursor-following motion, 3D tilt. */
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
/** Matches Tailwind's `lg` breakpoint. */
export const DESKTOP_QUERY = "(min-width: 1024px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe media query hook. Returns `fallback` on the server and during hydration,
 * then the live match once mounted, so server and client markup always agree.
 */
export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
