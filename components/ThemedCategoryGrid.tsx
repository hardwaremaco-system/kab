"use client";

import Link from "next/link";

export default function ThemedCategoryGrid() {
  // Re-added your specific background colors for each individual square
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
    // The overall section has no background, letting your root page color show through
    <section className="w-full select-none max-w-[1400px] mx-auto bg-transparent mb-8">
      
      {/* Centered Heading */}
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white text-center mb-6 tracking-tight">
        Curated for You!
      </h2>

      {/* Grid: 2 columns on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
        
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            href={cat.href} 
            className="group flex flex-col items-center outline-none"
          >
            {/* IMAGE CONTAINER (The Square): 
              This uses your specific `cat.bg` color. 
              Added a subtle border that highlights to your brand orange on hover.
            */}
            <div className={`w-full aspect-square rounded-2xl ${cat.bg} border-2 border-transparent group-hover:border-[#FF6A00] flex items-center justify-center p-4 sm:p-6 mb-3 relative overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md`}>
              <img 
                src={cat.image} 
                alt={cat.name} 
                // object-contain ensures your transparent PNGs fit perfectly inside the colored square
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" 
              />
            </div>
            
            {/* TEXT: Sitting directly below the colored square */}
            <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#FF6A00] transition-colors text-center">
              {cat.name}
            </span>
          </Link>
        ))}

      </div>
    </section>
  );
}
