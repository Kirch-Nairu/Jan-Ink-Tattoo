import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./qa-fixes.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jan-ink-tattoo.vercel.app"),
  title: {
    default: "Jan Ink Tattoo | Tattoo Work by John Salceda",
    template: "%s | Jan Ink Tattoo",
  },
  description:
    "Explore custom tattoo work by John Salceda at Jan Ink Tattoo — Japanese-inspired, black and grey, color, anime, geometric, and minimal pieces.",
  keywords: [
    "Jan Ink Tattoo",
    "John Salceda tattoo",
    "tattoo artist",
    "Japanese tattoo",
    "black and grey tattoo",
    "color tattoo",
    "anime tattoo",
  ],
  openGraph: {
    title: "Jan Ink Tattoo | John Salceda",
    description: "Custom tattoo work. Built around your idea, style, and skin.",
    type: "website",
    images: [{ url: "/images/tattoos/hero-mask-tiny.webp", width: 600, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jan Ink Tattoo | John Salceda",
    description: "Custom tattoo work. Built around your idea, style, and skin.",
    images: ["/images/tattoos/hero-mask-tiny.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
