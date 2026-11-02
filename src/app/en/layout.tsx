import { NavBar } from "@/components/layout/NavBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { FluidCursor } from "@/components/FluidCursor";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Background. Phones get a static pre-blurred gradient (zero per-frame cost).
        Desktop gets the animated blurred blobs, the frosted overlay and the WebGL fluid cursor —
        all gated in CSS / FluidCursor so touch devices never pay for them.
      */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-background" aria-hidden>
        <FluidCursor />
        <div className="aurora-static" />
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
        <div className="hidden lg:block absolute inset-0 bg-background/50 backdrop-blur-[100px]" />
      </div>

      {/* Floating top nav */}
      <NavBar />

      <div className="max-w-[1366px] mx-auto min-h-dvh flex flex-col pt-[92px] lg:pt-[80px]">
        <div className="flex flex-1">
          {/* Left Sidebar Spacer Desktop */}
          <div className="hidden lg:block w-[288px] shrink-0 relative">
            <div className="fixed top-[120px] bottom-[120px] w-[288px] pr-8">
              <Sidebar />
            </div>
          </div>
          {/* Main content area skewed */}
          <main className="flex-1 min-w-0 overflow-visible relative flex flex-col z-10 lg:pt-[50px] content-skew">
            {/* Glass shell. backdrop-blur is desktop-only: on phones it re-blurs the whole card on every scroll frame. */}
            <div className="flex flex-col flex-1 bg-foreground/[0.03] border border-foreground/[0.08] lg:backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-5 sm:p-6 lg:p-8 mb-4 lg:mb-10 mx-3 sm:mx-4 lg:mx-0 lg:mr-5 rounded-[1.5rem] lg:rounded-3xl content-border relative z-20">
              {children}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
