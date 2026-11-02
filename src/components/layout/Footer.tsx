export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-1 px-5 py-4 sm:py-5 max-w-[1366px] mx-auto mb-[max(1.25rem,env(safe-area-inset-bottom))] text-xs sm:text-sm text-center font-normal tracking-wider text-foreground/70 content-skew">
      <p>© {new Date().getFullYear()} Adityan Mishra</p>
      <p>Built with Next.js &amp; Tailwind CSS</p>
    </footer>
  );
}
