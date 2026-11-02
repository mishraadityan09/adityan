"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

interface ThreeGLBViewerProps {
  src: string;
  className?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
  cameraDistance?: number;
}

export default function ThreeGLBViewer({
  src,
  className,
  autoRotate = true,
  enableControls = true,
  cameraDistance = 3,
}: ThreeGLBViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Phones: cap the pixel ratio and skip MSAA. Fill-rate on a 3x-DPR antialiased canvas is the
    // single biggest cost in this component and the difference is invisible on a small screen.
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, coarsePointer ? 1.5 : 2);

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: pixelRatio < 2,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(pixelRatio);
    // `false` keeps the canvas sized by CSS (100% of its box) so the ResizeObserver below keeps working.
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      1000
    );
    camera.position.set(0, 0, cameraDistance);

    // ── Lights ────────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.78);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.95);
    key.position.set(5, 8, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8899ff, 0.52);
    fill.position.set(-5, 2, -3);
    scene.add(fill);

    // ── Controls ──────────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = enableControls;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
    });
    // OrbitControls sets touch-action: none, which would trap vertical swipes over the model and
    // stop the page from scrolling. Let the browser keep vertical pans; horizontal drags still rotate.
    if (coarsePointer) canvas.style.touchAction = "pan-y";

    // ── GLB Loader ────────────────────────────────────────────────────────────
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let model: THREE.Group | null = null;

    loader.load(
      src,
      (gltf) => {
        model = gltf.scene;

        // Center and fit the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = (cameraDistance * 0.6) / maxDim;

        model.position.sub(center.multiplyScalar(scale));
        model.scale.setScalar(scale);

        scene.add(model);
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    );

    // ── Resize observer ───────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(canvas);

    // ── Render loop — only runs while the canvas is on screen and the tab is visible ──
    let raf = 0;
    let running = false;
    let inView = true;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    const start = () => {
      if (running) return;
      running = true;
      tick();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    start();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      ro.disconnect();
      controls.dispose();
      if (model) {
        scene.remove(model);
        model.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
            materials.forEach((m) => m.dispose());
          }
        });
      }
      renderer.dispose();
      dracoLoader.dispose();
    };
  }, [src, autoRotate, enableControls, cameraDistance]);

  return <canvas ref={canvasRef} className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}
