"use client";

import Link from "next/link";

export default function ThemedCategoryGrid() {
  const categories = [
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
      name: "Accessories",
      href: "/category/accessories",
      image: "/images/categories/accessories.png",
      bg: "bg-[#518DFA]",
    },
    {
      name: "Appliances",
      href: "/category/appliances",
      image: "/images/categories/appliances.png",
      bg: "bg-[#9AAAC4]",
    },
    {
      name: "Watches",
      href: "/category/watches",
      image: "/images/categories/watches.png",
      bg: "bg-[#F5C7D9]",
    },
    {
      name: "Other Products",
      href: "/products",
      image: "/images/categories/other-products.png",
      bg: "bg-[#FFFEC3]",
    }
  ];

  return (
    <section className="w-full select-none max-w-[1400px] mx-auto bg-transparent mb-8">
      
      {/* Centered Heading */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white text-center mb-4 sm:mb-6 tracking-tight">
        Curated for You!
      </h2>

      {/* 🔥 RESPONSIVE GRID: 3 columns on mobile, 6 columns (one line) on desktop */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-6 w-full">
        
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            href={cat.href} 
            className="group flex flex-col items-center outline-none"
          >
            {/* IMAGE CONTAINER */}
            <div className={`w-full aspect-square rounded-xl sm:rounded-2xl ${cat.bg} border border-transparent group-hover:border-[#FF6A00] flex items-center justify-center p-2 sm:p-4 mb-2 relative overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md`}>
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" 
              />
            </div>
            
            {/* TEXT */}
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#FF6A00] transition-colors text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}

      </div>
    </section>
  );
}
