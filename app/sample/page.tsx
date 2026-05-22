// 🔥 CRITICAL: Tells Next.js to refresh this page every 60 seconds to pull new deals!
export const revalidate = 7200; 

import { getCachedHomepageData } from "@/lib/firebase/fetchers";

// Firebase imports for the active deals query
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// VIP UI COMPONENTS
import WhatsAppPopup from "@/components/WhatsAppPopup";
import ProductSection from "@/components/ProductSection";
import ThemedCategoryGrid from "@/components/ThemedCategoryGrid";
import { ThemeProvider } from "@/components/ThemeProvider";
import LeftSidebar from "@/components/LeftSidebar"; 

// BANNERS & SCROLLERS
import CampaignScroller from "@/components/CampaignScroller";
import TrustBanner from "@/components/banners/TrustBanner"; // The new banner

// 🔥 THE SMART TITLE DICTIONARY
const campaignDisplayNames: Record<string, string> = {
  "flash-sales": "Today's Deals", // Renamed to match the eBay feel
  "weekend-deals": "Weekend Deals",
  "clearance": "Clearance Sale",
  "student-deals": "Student Deals",
  "mega-sale": "Mega Sale"
};

export default async function Home() {
  const data = await getCachedHomepageData();
  
  // We only extract what we actually need for this clean layout
  const latestProducts = data.latestProducts || [];

  // ==========================================
  // 🔥 FETCH AND GROUP DYNAMIC CAMPAIGNS
  // ==========================================
  const campaigns: Record<string, { products: any[], earliestEndDate: string }> = {};

  try {
    const dealsQ = query(
      collection(db, "products"), 
      where("isSale", "==", true), 
      limit(20) 
    );
    const dealsSnap = await getDocs(dealsQ);

    dealsSnap.docs.forEach(doc => {
      const dealData = doc.data();

      if (new Date(dealData.saleEndDate).getTime() > Date.now()) {
        const cType = dealData.campaignType || "flash-sales";

        if (!campaigns[cType]) {
          campaigns[cType] = { products: [], earliestEndDate: dealData.saleEndDate };
        }

        campaigns[cType].products.push({ id: doc.id, ...dealData });

        if (new Date(dealData.saleEndDate) < new Date(campaigns[cType].earliestEndDate)) {
          campaigns[cType].earliestEndDate = dealData.saleEndDate;
        }
      }
    });
  } catch (error) {
    console.error("Failed to fetch deals for homepage:", error);
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent pb-10 pt-2 sm:pt-4 font-sans selection:bg-[#FF6A00] selection:text-white">
        <WhatsAppPopup />
        <div className="w-full max-w-[1400px] mx-auto px-0 sm:px-4">

          <div className="flex flex-col md:flex-row items-start gap-4 w-full">

            {/* THE INVISIBLE SCROLLBAR SIDEBAR */}
            <div className="hidden md:flex flex-col gap-4 w-[220px] lg:w-[240px] shrink-0 sticky top-[85px] h-[calc(100vh-85px)] overflow-y-auto overscroll-contain z-10 pb-6 pr-1 md:pr-2 
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-transparent 
              [&::-webkit-scrollbar-thumb]:bg-slate-200 
              dark:[&::-webkit-scrollbar-thumb]:bg-slate-800 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 
              dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-700"
            >
              <LeftSidebar />
            </div>

            {/* MAIN FEED */}
            <div className="flex-grow min-w-0 flex flex-col w-full">

              {/* 1. THE CATEGORY GRID (eBay's "The future in your hands") */}
              <div className="w-full flex flex-col shadow-sm mb-4 sm:mb-6">
                <div className="w-full bg-white dark:bg-[#151515] sm:rounded-xl border border-slate-200 dark:border-slate-800 p-4 pt-5 sm:pt-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 px-2">Top Categories</h2>
                  <ThemedCategoryGrid />
                </div>
              </div>

              {/* 2. CAMPAIGNS (eBay's "Today's Deals") */}
              {Object.entries(campaigns).map(([slug, campaignData]) => {
                const displayTitle = campaignDisplayNames[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                return (
                  <div className="w-full mb-4 sm:mb-6" key={slug}>
                    <CampaignScroller 
                      title={displayTitle} 
                      endTime={campaignData.earliestEndDate} 
                      products={campaignData.products} 
                      campaignSlug={slug} 
                    />
                  </div>
                );
              })}

              {/* 3. TRUST BANNER (Replacing eBay's App Banner) */}
              <TrustBanner />

              <div className="w-full flex flex-col gap-4 sm:gap-6">
                {/* 4. LATEST ON KABALE ONLINE (Replacing eBay's "Trending") */}
                {latestProducts.length > 0 && (
                  <ProductSection 
                    title="Latest on Kabale Online" 
                    subtitle="Fresh inventory straight out of the box"
                    products={latestProducts.slice(0, 12)} 
                    viewAllLink="/products?sort=latest"
                  />
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
