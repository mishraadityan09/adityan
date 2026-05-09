import { NavBar } from "@/components/layout/NavBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { BootSequence } from "@/components/layout/BootSequence";
import SplashCursor from "@/components/SplashCursor";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {/* Aurora & Fluid Cursor Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-auto z-[-1] bg-background">
        <SplashCursor />
        <div className="aurora-blob blob-1 pointer-events-none"></div>
        <div className="aurora-blob blob-2 pointer-events-none"></div>
        <div className="aurora-blob blob-3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[100px] pointer-events-none"></div>
      </div>

      {/* Floating top nav */}
      <NavBar />

      <div className="max-w-[1366px] mx-auto min-h-screen flex flex-col mt-[80px]">
        <div className="flex flex-1">
          {/* Left Sidebar Spacer Desktop */}
          <div className="hidden lg:block w-[288px] shrink-0 relative">
            <div className="fixed top-[120px] bottom-[120px] w-[288px] pr-8">
              <Sidebar />
            </div>
          </div>
          {/* Main content area skewed */}
          <main className="flex-1 min-w-0 overflow-visible relative flex flex-col z-10 pt-[100px] lg:pt-[50px] content-skew">
            {/* The glassy box is now inside the skewed container */}
            <div className="flex flex-col flex-1 gap-6 lg:gap-10 bg-foreground/[0.03] border border-foreground/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-4 sm:p-6 lg:p-8 mb-4 lg:mb-10 mx-4 lg:mx-0 lg:mr-5 rounded-[1.5rem] lg:rounded-3xl content-border relative z-20">
              <BootSequence>{children}</BootSequence>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </LenisProvider>
  );
}
