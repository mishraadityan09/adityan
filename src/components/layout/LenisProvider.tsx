// Lenis removed — native CSS scroll-behavior: smooth handles smooth scrolling
// at zero CPU cost via the browser compositor thread.
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
