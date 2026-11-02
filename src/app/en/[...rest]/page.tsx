import { notFound } from "next/navigation";

/** Any /en/* path that no other route matches renders the branded 404 inside the /en layout. */
export default function CatchAll() {
  notFound();
}
