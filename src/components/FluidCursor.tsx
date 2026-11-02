"use client";

import dynamic from "next/dynamic";
import {
  DESKTOP_QUERY,
  FINE_POINTER_QUERY,
  REDUCED_MOTION_QUERY,
  useMediaQuery,
} from "@/hooks/use-media-query";

// The fluid simulation is ~1300 lines of WebGL. Loading it lazily keeps it out of the
// shared bundle, and the gates below mean touch devices never download or run it.
const SplashCursor = dynamic(() => import("./SplashCursor"), { ssr: false });

/** Mounts the WebGL fluid-cursor only on desktop, mouse-driven devices with motion enabled. */
export function FluidCursor() {
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  if (!finePointer || !desktop || reducedMotion) return null;
  return <SplashCursor />;
}
