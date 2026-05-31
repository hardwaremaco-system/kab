export const revalidate = 7200; 

import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import LeftSidebar from "@/components/LeftSidebar"; 

// 🔥 THE COMPONENTS WE BUILT
import ThemedCategoryGrid from "@/components/ThemedCategoryGrid";
import ShopNow from "@/components/shopnow"; 
import DiscoveryBanner from "@/components/DiscoveryBanner";
import SaveOnAppliances from "@/components/SaveOnAppliances";
import TrendingCategories from "@/components/TrendingCategories";
import Link from "next/link";

export default function Home() {
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
              
              {/* 1. TOP GRID: "The future in your hands" (Using your original component) */}
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

              {/* 4. TODAY'S DEALS SCROLLER (Static Placeholder for layout) */}
              <div className="w-full py-8 px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Today's Deals
                </h2>
                <p className="text-sm text-slate-500 mb-4">All with free shipping</p>
                
                {/* Horizontal Scroller Placeholder */}
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="snap-start shrink-0 w-[140px] sm:w-[180px] flex flex-col gap-2">
                      <div className="w-full aspect-square bg-[#F1F1F1] dark:bg-slate-800 rounded-xl relative group">
                        <span className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm z-10 cursor-pointer">
                          🤍
                        </span>
                        <div className="w-full h-full flex items-center justify-center text-4xl">🛒</div>
                      </div>
                      <div className="text-sm font-medium line-clamp-2 leading-tight">Amazing Product {item}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">$34.99</span>
                        <span className="text-xs text-slate-400 line-through">$49.99</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. LIGHT GRAY COLLAGE: "Save on Appliances" */}
              <div className="w-full">
                <SaveOnAppliances />
              </div>

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
