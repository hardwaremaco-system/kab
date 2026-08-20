import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Request Board | Mbarara Online",
  description: "See what students and locals in Mbarara City are looking to buy right now. Have an item? Browse the requests and make a quick, easy sale today.",
  openGraph: {
    title: "Buyer Request Board | Mbarara Online",
    description: "See what students and locals in Mbarara City are looking to buy right now. Have an item? Browse the requests and make a quick, easy sale today.",
    url: "https://www.mbararaonline.com/requests",
    siteName: "Mbarara Online",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mbarara Online Buyer Requests",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buyer Request Board | Mbarara Online",
    description: "Can't find what you need? Post it here and let Mbarara sellers come to you.",
  },
};

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
