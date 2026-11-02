"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Loaded client-side only — Three.js requires the browser's WebGL context
const ThreeGLBViewer = dynamic(() => import("./ThreeGLBViewer"), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return (
    <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
      Loading 3D…
    </div>
  );
}

interface GLBViewerProps {
  src: string;
  className?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
  cameraDistance?: number;
}

/**
 * Defers downloading Three.js and the model until the viewer is about to scroll into view,
 * so the page's text and images are never blocked behind the 3D bundle.
 */
export default function GLBViewer({ className, ...props }: GLBViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? <ThreeGLBViewer {...props} className="w-full h-full" /> : <Placeholder />}
    </div>
  );
}
