"use client";

import Link from "next/link";

export default function ThemedCategoryGrid() {
  // 🛒 SECTION 1: HIGH-FREQUENCY REPEAT PURCHASES
  const dailyCategories = [
    {
      name: "Supermarket",
      href: "/category/supermarket",
      image: "/images/categories/supermarket.png", 
      bg: "bg-[#FFEBCC]", 
    },
    {
      name: "Fashion",
      href: "/category/fashion",
      image: "/images/categories/fashion.png",
      bg: "bg-[#D1F2EB]", 
    },
    {
      name: "Beauty & Health",
      href: "/category/beauty",
      image: "/images/categories/beauty.png",
      bg: "bg-[#FDEBD0]", 
    }
  ];

  // ⚡ SECTION 2: CORE ELECTRONICS
  const electronicCategories = [
    {
      name: "Phones & TVs",
      href: "/category/phones-tvs",
      image: "/images/categories/phones-tvs.png", 
      bg: "bg-[#E2E6E9]",
    },
    {
      name: "Sound Systems",
      href: "/category/sound-systems",
      image: "/images/categories/sound-systems.png",
      bg: "bg-[#EAD4C7]",
    },
    {
      name: "Appliances",
      href: "/category/appliances",
      image: "/images/categories/appliances.png",
      bg: "bg-[#9AAAC4]",
    },
    {
      name: "Accessories",
      href: "/category/accessories",
      image: "/images/categories/accessories.png",
      bg: "bg-[#518DFA]",
    },
    {
      name: "Watches",
      href: "/category/watches",
      image: "/images/categories/watches.png",
      bg: "bg-[#F5C7D9]",
    },
    {
      name: "View All",
      href: "/products",
      image: "/images/categories/other-products.png",
      bg: "bg-[#FFFEC3]",
    }
  ];

  return (
    <section className="w-full select-none max-w-[1400px] mx-auto bg-transparent mb-4">

      {/* ============================================== */}
      {/* SECTION 1: BUY AGAIN & AGAIN                   */}
      {/* ============================================== */}
      <div className="flex items-center mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
          Buy Again & Again
        </h2>
        <div className="h-[2px] flex-grow bg-slate-100 dark:bg-slate-800 ml-4 rounded-full"></div>
      </div>

      {/* Centered 3-column grid for desktop, standard 3-column for mobile */}
      <div className="grid grid-cols-3 md:flex md:justify-center gap-2 sm:gap-4 md:gap-6 w-full mb-8">
        {dailyCategories.map((cat, index) => (
          <Link 
            key={`daily-${index}`} 
            href={cat.href} 
            className="group flex flex-col items-center outline-none md:w-[160px]"
          >
            <div className={`w-full aspect-square rounded-xl sm:rounded-2xl ${cat.bg} border border-transparent group-hover:border-[#FF6A00] flex items-center justify-center p-3 sm:p-4 mb-2 relative overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md`}>
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" 
              />
            </div>
            <span className="text-[11px] sm:text-[13px] md:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#FF6A00] transition-colors text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>


      {/* ============================================== */}
      {/* SECTION 2: STEP-UP ELECTRONICS                 */}
      {/* ============================================== */}
      <div className="flex items-center mb-4 sm:mb-5 mt-2">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
          Step-Up Electronics
        </h2>
        <div className="h-[2px] flex-grow bg-slate-100 dark:bg-slate-800 ml-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-6 w-full">
        {electronicCategories.map((cat, index) => (
          <Link 
            key={`elec-${index}`} 
            href={cat.href} 
            className="group flex flex-col items-center outline-none"
          >
            <div className={`w-full aspect-square rounded-xl sm:rounded-2xl ${cat.bg} border border-transparent group-hover:border-[#FF6A00] flex items-center justify-center p-2 sm:p-4 mb-2 relative overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md`}>
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" 
              />
            </div>
            <span className="text-[11px] sm:text-[13px] md:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#FF6A00] transition-colors text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}
