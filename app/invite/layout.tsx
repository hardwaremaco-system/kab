import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refer & Earn | oweitu shop Partner Program",
  description:
    "Invite friends to Oweitu Shop and earn 3,000 UGX directly to your Mobile Money for every new customer. Join the campus partner program today!",
  openGraph: {
    title: "Earn 3,000 UGX per Referral | oweitu shop",
    description:
      "Get paid directly to your MTN/Airtel Mobile Money when you invite friends to shop official items on Oweitu Shop. Start earning today!",
    url: "https://www.oweitushop.com/invite",
    siteName: "Oweitu Shop",
    images: [
      {
        // 🚀 Points to the dynamic image generator
        url: "https://www.oweitushop.com/api/og", 
        width: 1200,
        height: 630,
        alt: "Oweitu Partner Program",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn 3,000 UGX per Referral | oweitu shop",
    description: "Get paid to your Mobile Money when you invite friends to shop on Oweitu Shop.",
    images: ["https://www.oweitushop.com/api/og"],
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
