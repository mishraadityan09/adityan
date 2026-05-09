import dynamic from "next/dynamic";

// Loaded client-side only — Three.js requires the browser's WebGL context
const GLBViewer = dynamic(() => import("./ThreeGLBViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
      Loading 3D…
    </div>
  ),
});

export default GLBViewer;
