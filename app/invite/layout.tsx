import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refer & Earn | Mbarara Online Partner Program",
  description:
    "Invite friends to Mbarara Online and earn 3,000 UGX directly to your Mobile Money for every new customer. Join the Mbarara partner program today!",
  openGraph: {
    title: "Earn 3,000 UGX per Referral | Mbarara Online",
    description:
      "Get paid directly to your MTN/Airtel Mobile Money when you invite friends to shop and trade items on Mbarara Online. Start earning today!",
    url: "https://www.mbararaonline.com/invite",
    siteName: "Mbarara Online",
    images: [
      {
        // 🚀 Points to the dynamic image generator
        url: "https://www.mbararaonline.com/api/og", 
        width: 1200,
        height: 630,
        alt: "Mbarara Online Partner Program",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn 3,000 UGX per Referral | Mbarara Online",
    description: "Get paid to your Mobile Money when you invite friends to shop and trade on Mbarara Online.",
    images: ["https://www.mbararaonline.com/api/og"],
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
