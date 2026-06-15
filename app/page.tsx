// 🔥 CRITICAL: Tells Next.js to refresh this page every 60 seconds to pull new deals!
export const revalidate = 7200; 

import ContinueBrowsing from "@/components/ContinueBrowsing";
import { getCachedHomepageData } from "@/lib/firebase/fetchers";

// Firebase imports for the active deals query
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// VIP UI COMPONENTS
import HeroCarousel from "@/components/HeroCarousel";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import ProductSection from "@/components/ProductSection";
import ShoppingMadeEasyBanner from "@/components/ShoppingMadeEasyBanner";

import AboutKabaleOnline from "@/components/AboutKabaleOnline";
import ThemedCategoryGrid from "@/components/ThemedCategoryGrid";
import { ThemeProvider } from "@/components/ThemeProvider";
import LeftSidebar from "@/components/LeftSidebar"; 
import TrustedBrandsScroller from "@/components/TrustedBrandsScroller";


// BANNERS & SCROLLERS
import CampaignScroller from "@/components/CampaignScroller";

// 🔥 THE SMART TITLE DICTIONARY
const campaignDisplayNames: Record<string, string> = {
  "flash-sales": "Flash Sales",
  "weekend-deals": "Weekend Deals",
  "clearance": "Clearance Sale",
  "student-deals": "Student Deals",
  "mega-sale": "Mega Sale"
};

export default async function Home() {
  const data = await getCachedHomepageData();

  const heroProducts = data.heroProducts || [];
  const officialProducts = data.officialProducts || [];
  const latestProducts = data.latestProducts || [];
  const basePoolProducts = data.basePool || []; // Fallback buffer for browsing continuity

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

              <div className="w-full flex flex-col shadow-sm mb-4 sm:mb-6">
                <div className="w-full z-0">
                  <HeroCarousel />
                </div>
                <div className="w-full bg-white dark:bg-[#151515] sm:rounded-b-xl border-x border-b border-slate-200 dark:border-slate-800 p-4 pt-5 sm:pt-6">
                  <ThemedCategoryGrid />
                </div>
              </div>

              {/* ========================================== */}
              {/* 🔥 RENDER EVERY ACTIVE CAMPAIGN DYNAMICALLY*/}
              {/* ========================================== */}
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

              <div className="w-full flex flex-col gap-4 sm:gap-6">
                <ContinueBrowsing 
                  title="Continue Browsing"
                  subtitle="Pick up exactly where you left off"
                  fallbackProducts={basePoolProducts} 
                />
{/* 🔥 DROP IT RIGHT HERE */}
<div className="w-full mb-4 sm:mb-6">
  <ShoppingMadeEasyBanner />
</div>

                {/* 🔥 BRAND SCROLLER */}
<div className="w-full mb-4 sm:mb-6">
  <TrustedBrandsScroller />
</div>


                {officialProducts.length > 0 && (
                  <ProductSection 
                    title="From the Official Store" 
                    subtitle="100% genuine guaranteed products"
                    products={officialProducts} 
                    viewAllLink="/officialStore" 
                  />
                )}

{latestProducts.length > 0 && (
                  <ProductSection 
                    title="Recently Added" 
                    subtitle="Fresh products straight out of the box"
                    products={latestProducts} 
                    viewAllLink="/products"
                  />
                )}


                <AboutKabaleOnline />

              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
