import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { JsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/seo/analytics";

const canonical = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title: {
    default: "VinceVision Technologies | AI, Cloud & Cybersecurity — Kenya & UK",
    template: "%s | VinceVision Technologies",
  },
  description: site.description,
  keywords: [
    "AI company Kenya",
    "cloud services Nairobi",
    "cybersecurity United Kingdom",
    "software engineering Africa",
    "VinceVision Technologies",
    "Vincent Omondi",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: canonical,
    siteName: site.name,
    title: "VinceVision Technologies | AI, Cloud & Cybersecurity — Kenya & UK",
    description: site.description,
    // TODO(placeholder): replace /og-image.svg with a 1200×630 PNG for crawler compatibility.
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VinceVision Technologies",
    description: site.description,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-slate-950"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
