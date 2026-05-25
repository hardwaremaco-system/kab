export const revalidate = 7200; 

import { getCachedDeals } from "@/lib/firebase/fetchers";
import HeroCarousel from "@/components/HeroCarousel"; // Your original carousel

// 🔥 Using the EXACT file names and paths I gave you, inside the src folder:
import PromoHero from "@/src/components/banners/PromoHero"; 
import DiscountBanner from "@/src/components/banners/DiscountBanner"; 
import CategoryBlock from "@/src/components/CategoryBlock";
import DealsScroller from "@/src/components/DealsScroller";
import { futureCategories, trendingCategories } from "@/src/lib/static/categories"; 

export default async function Home() {
  const todaysDeals = await getCachedDeals();

  return (
    <main className="min-h-screen bg-white pb-10 font-sans">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-10 pt-2">

        {/* 1. TOP HERO */}
        <section className="px-0 md:px-4">
          <HeroCarousel products={todaysDeals} />
        </section>

        {/* 2. CATEGORY ROW 1 */}
        <section className="px-4">
          <h2 className="text-[1.3rem] font-bold text-gray-900 mb-4">
            The future in your hands
          </h2>
          <CategoryBlock items={futureCategories} />
        </section>

        {/* 3. MINI TRUST BANNER (Hardcoded temporarily to prevent build crash) */}
        <section className="px-4">
          <div className="w-full bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
            <h3 className="font-bold text-lg mb-1">Shopping made easy</h3>
            <p className="text-gray-500 text-sm">Enjoy reliability, secure deliveries and hassle-free returns.</p>
          </div>
        </section>

        {/* 4. PROMO HERO 2 */}
        <section className="px-0 md:px-4">
          <PromoHero />
        </section>

        {/* 5. TODAY'S DEALS */}
        <section className="px-4">
          <div className="mb-4">
            <h2 className="text-[1.3rem] font-bold text-gray-900">Today's Deals</h2>
            <p className="text-sm text-gray-500">All with free shipping</p>
          </div>
          <DealsScroller products={todaysDeals} />
        </section>

        {/* 6. CATEGORY ROW 2 */}
        <section className="px-4">
          <h2 className="text-[1.3rem] font-bold text-gray-900 mb-4">
            Trending on Kabale Online
          </h2>
          <CategoryBlock items={trendingCategories} />
        </section>

        {/* 7. BOTTOM PROMO */}
        <section className="px-0 md:px-4 mb-8">
          <DiscountBanner />
        </section>

      </div>
    </main>
  );
}
