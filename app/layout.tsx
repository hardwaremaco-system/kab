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
  title: "Oweitu Shop | The Better Way To Buy and Sell in Kigezi and Ankole Region",
  description:
    "Connect with buyers and sellers , local farmers, and verified vendors for safe, Cash-on-Delivery commerce.",
  keywords: [
    "Kabale",
    "Kabale University",
    "buy and sell",
    "Uganda",
    "marketplace",
    "student market",
    "agriculture",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oweitu Shop",
  },
  openGraph: {
    title: "Oweitu Shop | The Better Way To Buy and Sell in Ankole and the Entire Western Region",
    description: "Buy and sell locally in Ankole with strictly Cash on Delivery.",
    url: "https://www.oweitushop.com",
    siteName: "Oweitu Shop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oweitu Shop",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oweitu Shop",
    description: "The Better Way To Buy and Sell in Kigezi and the Ankole Region",
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
