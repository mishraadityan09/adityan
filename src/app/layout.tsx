import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: "Adityan Mishra — Frontend Developer",
  description: "Portfolio of Adityan Mishra — Frontend Developer specializing in React, Next.js, Flutter, and 3D web experiences.",
  keywords: ["Portfolio", "Adityan Mishra", "Frontend Developer", "React", "Next.js", "Flutter"],
  openGraph: {
    title: "Adityan Mishra — Frontend Developer",
    description: "Portfolio of Adityan Mishra — Frontend Developer specializing in React, Next.js, Flutter, and 3D web experiences.",
    url: "/",
    siteName: "Adityan Mishra",
    locale: "en_US",
    type: "website",
    images: [{ url: "/seo/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adityan Mishra — Frontend Developer",
    description: "Portfolio of Adityan Mishra — Frontend Developer specializing in React, Next.js, Flutter, and 3D web experiences.",
    images: [{ url: "/seo/opengraph-image.png", width: 1200, height: 630 }],
  },
  icons: { icon: "/seo/favicon.png" },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} lenis`} suppressHydrationWarning>
      <body className="tracking-wider antialiased scroll-smooth font-light bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
