import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; 
import ProductFeed from "@/components/ProductFeed";
import LeftSidebar from "@/components/LeftSidebar"; 
import { 
  Watch, 
  Smartphone, 
  Speaker, 
  Headphones, 
  Plug, 
  Package, 
  ChevronRight 
} from "lucide-react"; 

export const revalidate = 3600;

export const metadata = {
  title: "All Products | Kabale Online",
  description: "Browse all premium electronics and items available in Kabale.",
};

// 🔥 Set to 100 as requested
const PAGE_SIZE = 100;

export default async function AllProductsPage() {
  // ==========================================
  // INITIAL SERVER FETCH: Fastest load, best SEO
  // ==========================================
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));

  const snapshot = await getDocs(q);

  // Clean the data so it can be passed safely to the Client Component
  const initialProducts = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Safely convert Firestore Timestamps
      createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (new Date(data.createdAt || 0).getTime()),
      updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : (new Date(data.updatedAt || 0).getTime()),
    } as any;
  });

  // THE 6 NEW EXPLORE CATEGORIES
  const exploreCategories = [
    { name: "Watches", link: "watches", desc: "Classic & smart timepieces", Icon: Watch },
    { name: "Phones & TVs", link: "phones-tvs", desc: "Latest screens & mobile tech", Icon: Smartphone },
    { name: "Sound Systems", link: "sound-systems", desc: "Premium audio & speakers", Icon: Speaker },
    { name: "Accessories", link: "accessories", desc: "Chargers, cases & cables", Icon: Headphones },
    { name: "Appliances", link: "appliances", desc: "Home & kitchen electronics", Icon: Plug },
    { name: "Other Products", link: "other-products", desc: "Explore more great deals", Icon: Package }
  ];

  return (
    <div className="min-h-screen bg-transparent pb-12 pt-2 sm:pt-4 font-sans selection:bg-[#FF6A00] selection:text-white overflow-x-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-0 sm:px-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">

          {/* LEFT SIDEBAR AREA */}
          <div className="hidden md:flex flex-col gap-4 w-[220px] lg:w-[240px] shrink-0 sticky top-[110px] h-max z-10">
            <LeftSidebar />
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-grow min-w-0 flex flex-col w-full gap-4">

            {/* ========================================== */}
            {/* PREMIUM CINEMATIC HERO SECTION             */}
            {/* ========================================== */}
            <div className="relative w-full rounded-none md:rounded-xl overflow-hidden shadow-md min-h-[220px] md:min-h-[260px] flex flex-col justify-center px-6 sm:px-10 py-12">
              {/* Background Image (Tech focused) */}
              <Image 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80" 
                fill 
                className="object-cover object-center" 
                alt="All Marketplace Items" 
                priority 
              />
              {/* Cinematic Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-transparent"></div>

              {/* Text Content */}
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-white tracking-tight leading-tight uppercase">
                  All Marketplace Items
                </h1>
                <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                  Discover the best local deals for premium electronics and gadgets. Fast delivery, pay securely on arrival.
                </p>
              </div>
            </div>

            {/* ========================================== */}
            {/* INTERACTIVE PRODUCT FEED (Client Component)*/}
            {/* ========================================== */}
            <div className="w-full">
              <Suspense fallback={
                <div className="w-full h-[400px] bg-slate-50 dark:bg-slate-900/50 animate-pulse rounded-md" />
              }>
                <ProductFeed initialProducts={initialProducts} />
              </Suspense>
            </div>

            {/* ========================================== */}
            {/* CATEGORIES LIST ROW (New Electronics Grid) */}
            {/* ========================================== */}
            <div className="bg-white dark:bg-[#151515] rounded-none md:rounded-md border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 mt-4">
              <h3 style={{ color: '#6B6B6B' }} className="text-xs font-black uppercase tracking-widest text-center mb-6 dark:text-slate-400">
                Explore The Marketplace
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {exploreCategories.map(({ name, link, desc, Icon }) => (
                  <Link 
                    key={name} 
                    href={`/category/${link}`} 
                    className="group flex flex-col p-4 bg-slate-50 dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-lg hover:border-[#FF6A00] dark:hover:border-[#FF6A00] hover:shadow-md transition-all duration-200 w-full outline-none"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white dark:bg-[#1a1a1a] rounded-md flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-[#FF6A00] transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span style={{ color: '#1A1A1A' }} className="text-sm font-black dark:text-white group-hover:text-[#FF6A00] transition-colors leading-tight">
                          {name}
                        </span>
                      </div>
                    </div>

                    <p style={{ color: '#6B6B6B' }} className="text-[11px] font-medium mb-4 line-clamp-2 flex-grow dark:text-slate-400">
                      {desc}
                    </p>

                    <div className="flex items-center justify-between text-[#FF6A00] border-t border-slate-200 dark:border-slate-800 pt-3 mt-auto">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Browse</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
