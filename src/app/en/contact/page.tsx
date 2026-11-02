import { pageMetadata } from "@/lib/site";
import { ContactContent } from "./ContactContent";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Adityan Mishra — by email, on LinkedIn, or with a message straight from the site. I usually reply within a day.",
  path: "/en/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
