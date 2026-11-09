import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-alma.local"),
  title: {
    template: "%s | Alma — Digital Artist & Illustrator",
    default: "Alma — Digital Artist & Illustrator (Barcelona)",
  },
  description:
    "Portfolio of Alma, a digital artist and illustrator based in Barcelona, Spain. Specializing in hand-painted digital art with Krita, character design, and visual novel art.",
  openGraph: {
    title: "Alma — Digital Artist & Illustrator (Barcelona)",
    description:
      "Original digital paintings, character design, and narrative art created in Krita on a digital drawing tablet.",
    url: "https://portfolio-alma.local",
    siteName: "Alma — Digital Artist & Illustrator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma — Digital Artist & Illustrator",
    description:
      "Original digital paintings, character design, and narrative art created in Krita on a digital drawing tablet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent selection:text-background font-sans">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
