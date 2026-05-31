// 🔥 CRITICAL: Tells Next.js to refresh this page every 60 seconds to pull new deals!
export const revalidate = 7200; 

import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import LeftSidebar from "@/components/LeftSidebar"; 

// Firebase imports for the active deals query
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// 🔥 THE COMPONENTS WE BUILT & NEEDED IMPORTS
import ThemedCategoryGrid from "@/components/ThemedCategoryGrid";
import ShopNow from "@/components/shopnow"; 
import DiscoveryBanner from "@/components/DiscoveryBanner";
import CampaignScroller from "@/components/CampaignScroller";
import SaveOnWatches from "@/components/SaveOnWatches";
import TrendingCategories from "@/components/TrendingCategories";

// 🔥 THE SMART TITLE DICTIONARY
const campaignDisplayNames: Record<string, string> = {
  "flash-sales": "Flash Sales",
  "weekend-deals": "Weekend Deals",
  "clearance": "Clearance Sale",
  "student-deals": "Student Deals",
  "mega-sale": "Mega Sale"
};

export default async function Home() {
  
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

      // Ensure the deal hasn't expired
      if (new Date(dealData.saleEndDate).getTime() > Date.now()) {
        const cType = dealData.campaignType || "flash-sales";

        // If this campaign type doesn't exist in our object yet, create it
        if (!campaigns[cType]) {
          campaigns[cType] = { products: [], earliestEndDate: dealData.saleEndDate };
        }

        // Push the product into its specific campaign
        campaigns[cType].products.push({ id: doc.id, ...dealData });

        // Update the master clock for this specific campaign
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
      <div className="min-h-screen bg-white dark:bg-slate-900 pb-10 pt-2 sm:pt-4 font-sans selection:bg-[#FF6A00] selection:text-white">
        <WhatsAppPopup />
        
        <div className="w-full max-w-[1400px] mx-auto px-0 sm:px-4">
          <div className="flex flex-col md:flex-row items-start gap-4 w-full">

            {/* THE INVISIBLE SCROLLBAR SIDEBAR (Hidden on mobile) */}
            <div className="hidden md:flex flex-col gap-4 w-[220px] lg:w-[240px] shrink-0 sticky top-[85px] h-[calc(100vh-85px)] overflow-y-auto overscroll-contain z-10 pb-6 pr-1 md:pr-2 
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-transparent 
              [&::-webkit-scrollbar-thumb]:bg-slate-200 
              dark:[&::-webkit-scrollbar-thumb]:bg-slate-800 
              [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              <LeftSidebar />
            </div>

            {/* MAIN FEED - MATCHING THE SCREENSHOT EXACTLY */}
            <div className="flex-grow min-w-0 flex flex-col w-full overflow-hidden">
              
              {/* 1. TOP GRID: "The future in your hands" */}
              <div className="w-full pt-4 sm:pt-6 px-4">
                <ThemedCategoryGrid />
              </div>

              {/* 2. LIGHT GRAY BANNER: "Shopping made easy" */}
              <div className="w-full mt-4">
                <ShopNow />
              </div>

              {/* 3. MUSTARD BANNER: "Whatever you're into, it's here" */}
              <div className="w-full">
                <DiscoveryBanner />
              </div>

              {/* 4. TODAY'S DEALS / CAMPAIGN SCROLLERS */}
              <div className="w-full py-4 px-4 sm:px-6">
                {Object.entries(campaigns).map(([slug, campaignData]) => {
                  // Look up the nice name, fallback to formatting the slug if not found
                  const displayTitle = campaignDisplayNames[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                  return (
                    <div className="w-full mb-6 sm:mb-8" key={slug}>
                      <CampaignScroller 
                        title={displayTitle} 
                        endTime={campaignData.earliestEndDate} 
                        products={campaignData.products} 
                        campaignSlug={slug} 
                      />
                    </div>
                  );
                })}
              </div>

                            {/* 5. DYNAMIC COLLAGE: "Save on Watches" */}
              {save4kProducts.length > 0 && (
                <div className="w-full">
                  <SaveOnWatches products={save4kProducts} />
                </div>
              )}

              {/* 6. BOTTOM GRID: "Trending on Kabale Online" */}
              <div className="w-full py-8 px-4">
                <TrendingCategories />
              </div>

            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
