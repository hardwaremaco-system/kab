export const revalidate = 7200; 

import { getCachedDeals } from "@/lib/firebase/fetchers";

// Banners & Promos
import HeroCarousel from "@/components/HeroCarousel";
import TrustBanner from "@/components/TrustBanner"; 
import PromoHero from "@/components/PromoHero"; // 🔥 Path flattened
import DiscountBanner from "@/components/DiscountBanner"; // 🔥 Path flattened

// Grids & Scrollers
import CategoryBlock from "@/components/CategoryBlock";
import DealsScroller from "@/components/DealsScroller";

// Static Data for Categories 
import { futureCategories, trendingCategories } from "@/lib/categories"; // 🔥 Path flattened

export default async function Home() {
  const todaysDeals = await getCachedDeals();

  return (
    <main className="min-h-screen bg-white pb-10 font-sans">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-10 pt-2">

        {/* 1. TOP HERO: "Whatever you're into..." */}
        <section className="px-0 md:px-4">
          {/* 🔥 Fixed: Passing products so the carousel has data */}
          <HeroCarousel products={todaysDeals} />
        </section>

        {/* 2. CATEGORY ROW 1: "The future in your hands" */}
        <section className="px-4">
          <h2 className="text-[1.3rem] font-bold text-gray-900 mb-4">
            The future in your hands
          </h2>
          <CategoryBlock items={futureCategories} />
        </section>

        {/* 3. MINI TRUST BANNER: "Shopping made easy" */}
        <section className="px-4">
          <TrustBanner />
        </section>

        {/* 4. PROMO HERO 2: "Shop the world. Ship for free." */}
        <section className="px-0 md:px-4">
          <PromoHero />
        </section>

        {/* 5. THE ONLY REAL PRODUCTS: "Today's Deals" */}
        <section className="px-4">
          <div className="mb-4">
            <h2 className="text-[1.3rem] font-bold text-gray-900">Today's Deals</h2>
            <p className="text-sm text-gray-500">All with free shipping</p>
          </div>

          <DealsScroller products={todaysDeals} />
        </section>

        {/* 6. CATEGORY ROW 2: "Trending on Kabale Online" */}
        <section className="px-4">
          <h2 className="text-[1.3rem] font-bold text-gray-900 mb-4">
            Trending on Kabale Online
          </h2>
          <CategoryBlock items={trendingCategories} />
        </section>

        {/* 7. BOTTOM PROMO: "Unlock 20% across your picks" */}
        <section className="px-0 md:px-4 mb-8">
          <DiscountBanner />
        </section>

      </div>
    </main>
  );
}
