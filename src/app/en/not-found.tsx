import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-6 py-10">
      <p className="title text-main">404</p>
      <h1 className="topic">Page not found</h1>
      <p className="max-w-prose text-sm text-muted-foreground">
        That link doesn&apos;t go anywhere — the page may have moved, or the address has a typo.
      </p>
      <Link
        href="/en"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/15 px-5 text-sm font-medium transition-colors hover:bg-foreground/10"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to the introduction
      </Link>
    </div>
  );
}
