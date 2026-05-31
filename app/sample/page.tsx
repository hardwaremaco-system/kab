export const revalidate = 7200; 

import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import LeftSidebar from "@/components/LeftSidebar"; 

// 🔥 THE CATEGORY COMPONENTS
import ShopNow from "@/components/shopnow"; 
import TrendingCategories from "@/components/TrendingCategories";
import DiscoveryBanner from "@/components/DiscoveryBanner";
import SaveOnAppliances from "@/components/SaveOnAppliances";
import ThemedCategoryGrid from "@/components/ThemedCategoryGrid";

export default function Home() {
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

            {/* MAIN FEED - ONLY CATEGORIES */}
            <div className="flex-grow min-w-0 flex flex-col w-full gap-4 sm:gap-6 pt-4">
              
              {/* 1. Shopping Made Easy Banner */}
              <ShopNow />
              
              {/* 2. Trending with Emojis */}
              <div className="bg-white dark:bg-[#151515] sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
                <TrendingCategories />
              </div>

              {/* 3. Mustard Whatever You're Into Banner */}
              <DiscoveryBanner />

              {/* 4. Save on Appliances Collage */}
              <SaveOnAppliances />

              {/* 5. Original Colored Category Grid */}
              <div className="bg-white dark:bg-[#151515] sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
                <ThemedCategoryGrid />
              </div>

            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
