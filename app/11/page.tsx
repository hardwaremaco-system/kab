export const revalidate = 7200; 

import { getCachedDeals } from "@/lib/firebase/fetchers";

// Banners & Promos
import HeroCarousel from "@/components/HeroCarousel";
import TrustBanner from "@/components/banners/TrustBanner"; // "Shopping made easy"
import PromoHero from "@/components/banners/PromoHero"; // "Shop the world"
import DiscountBanner from "@/components/banners/DiscountBanner"; // "Unlock 20%"

// Grids & Scrollers
import CategoryBlock from "@/components/CategoryBlock";
import DealsScroller from "@/components/DealsScroller";

// Static Data for Categories (Zero Database Reads!)
import { futureCategories, trendingCategories } from "@/lib/static/categories";

export default async function Home() {
  // 🔥 THE SECRET WEAPON: We only fetch ONE array of real products now.
  // No more trendingProducts, officialProducts, latestProducts, etc.
  const todaysDeals = await getCachedDeals();

  return (
    <main className="min-h-screen bg-white pb-10 font-sans">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-10 pt-2">

        {/* 1. TOP HERO: "Whatever you're into..." */}
        <section className="px-0 md:px-4">
          <HeroCarousel />
        </section>

        {/* 2. CATEGORY ROW 1: "The future in your hands" */}
        {/* Uses a swiper on mobile, snaps into a Bento layout on desktop */}
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
          
          {/* Bigger cards, one-line titles in Light Gray, bold Gray prices */}
          <DealsScroller products={todaysDeals} />
        </section>

        {/* 6. CATEGORY ROW 2: "Trending on Kabale Online" */}
        {/* Again: Just category images routing to /category/[slug], NOT database products */}
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
