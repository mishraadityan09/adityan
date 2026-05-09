"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  return (
    <>
      <h1 itemProp="contact" className="topic">
        Contact
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: contact info */}
        <div className="flex flex-col gap-y-10">
          <ContactInfoItem
            label="Email"
            href="mailto:adityanmishra36@gmail.com"
            display="adityanmishra36@gmail.com"
            iconSrc="/icons-social/gmail.svg"
          />
          <ContactInfoItem
            label="LinkedIn"
            href="https://www.linkedin.com/in/adityan-mishra-61ba18162/"
            display="linkedin.com/in/adityan-mishra-61ba18162"
            iconSrc="/icons-social/linkedin.svg"
          />
        </div>

        {/* Right: message form card */}
        <ContactForm />
      </div>

      {/* Mobile prev/next */}
      <div className="lg:hidden flex justify-between flex-1 items-end">
        <Link
          href="/en/experience"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden />
          prev
        </Link>
        <Link
          href="/en"
          className="h-fit flex items-center gap-1 uppercase rounded-full shadow shadow-stone-100 px-3 py-2 text-sm"
        >
          next
          <ArrowRight className="w-5 h-5" aria-hidden />
        </Link>
      </div>
    </>
  );
}

function ContactInfoItem({
  label,
  href,
  display,
  iconSrc,
}: {
  label: string;
  href: string;
  display: string;
  iconSrc: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="title">{label}</p>
      <div className="flex flex-wrap gap-5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-underline w-fit h-fit flex gap-4 items-center"
        >
          <Image src={iconSrc} alt={label} width={25} height={25} style={{ height: "auto" }} />
          <p className="break-all text-sm">{display}</p>
        </a>
      </div>
    </div>
  );
}

function ContactForm() {
  const [content, setContent] = useState("");
  const MAX = 1000;

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm w-full max-w-sm">
      {/* Card header */}
      <div className="flex items-start justify-between gap-2 px-6">
        <span className="font-semibold leading-none">Your message</span>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-input/30 hover:bg-input/50 px-4 py-2 text-sm font-medium transition-all"
        >
          Default
        </button>
      </div>

      {/* Card content */}
      <div className="px-6">
        <form id="contact-form" className="flex flex-col gap-5">
          <Field label="Email">
            <input
              type="email"
              name="email"
              placeholder="your-email@gmail.com"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow]"
            />
          </Field>
          <Field label="Topic">
            <input
              type="text"
              name="topic"
              placeholder="What's the topic today?"
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow]"
            />
          </Field>
          <Field label="Content">
            <div className="relative">
              <textarea
                name="content"
                placeholder="Type your message here."
                rows={5}
                maxLength={MAX}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 transition-[color,box-shadow] resize-none"
              />
              <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                {content.length}/{MAX}
              </span>
            </div>
          </Field>
          <button
            type="submit"
            className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
