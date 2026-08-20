import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import LayoutClient from "@/components/LayoutClient";
import BottomNav from "@/components/BottomNav"; // 🔥 Imported BottomNav
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// VIEWPORT CONFIG
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// SEO & PWA METADATA
export const metadata: Metadata = {
  title: "Mbarara Online | Buy and Sell Used and New Products in Mbarara City",
  description:
    "Connect with buyers and sellers in Mbarara to trade used and new products safely with Cash-on-Delivery commerce.",
  keywords: [
    "Mbarara City",
    "Mbarara Online",
    "buy and sell",
    "used products Mbarara",
    "new products Mbarara",
    "Uganda",
    "marketplace",
    "student market",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mbarara Online",
  },
  openGraph: {
    title: "Mbarara Online | The Better Way To Buy and Sell in Mbarara",
    description: "Buy and sell used and new products locally in Mbarara City with strictly Cash on Delivery.",
    url: "https://www.mbararaonline.com",
    siteName: "Mbarara Online",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mbarara Online",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mbarara Online",
    description: "The Better Way To Buy and Sell Used and New Products in Mbarara City.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-slate-900 transition-colors">

        {/* CLIENT LAYOUT (handles banner, navbar, auth, etc.) */}
        <LayoutClient>
          {children}
          
          {/* 🔥 Added BottomNav here to ensure it has access to Auth and Cart contexts */}
          <BottomNav />
        </LayoutClient>

        {/* Vercel Analytics */}
        <Analytics />

      </body>
    </html>
  );
}
