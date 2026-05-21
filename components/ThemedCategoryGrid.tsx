"use client";

import Link from "next/link";

export default function ThemedCategoryGrid() {
  const slots = {
    tallLeft: {
      name: "Phones & TVs",
      href: "/category/phones-tvs",
      image: "/images/categories/phones-tvs.png", 
      bg: "bg-[#E2E6E9]",
      textColor: "text-[#041E42]"
    },
    shortRightTop: {
      name: "Sound Systems",
      href: "/category/sound-systems",
      image: "/images/categories/sound-systems.png",
      bg: "bg-[#EAD4C7]",
      textColor: "text-[#041E42]"
    },
    shortRightBottom: {
      name: "Accessories",
      href: "/category/accessories",
      image: "/images/categories/accessories.png",
      bg: "bg-[#518DFA]",
      textColor: "text-white"
    },
    shortLeftTop: {
      name: "Appliances",
      href: "/category/appliances",
      image: "/images/categories/appliances.png",
      bg: "bg-[#9AAAC4]",
      textColor: "text-[#041E42]"
    },
    shortLeftBottom: {
      name: "Other Products",
      href: "/products",
      image: "/images/categories/other-products.png",
      bg: "bg-[#FFFEC3]",
      textColor: "text-[#041E42]"
    },
    tallRight: {
      name: "Watches",
      href: "/category/watches",
      image: "/images/categories/watches.png",
      bg: "bg-[#F5C7D9]",
      textColor: "text-[#041E42]"
    }
  };

  return (
    <section className="w-full select-none max-w-[1400px] mx-auto">
      {/* Centered Heading */}
      <h2 style={{ color: '#1A1A1A' }} className="text-xl sm:text-2xl font-bold dark:text-white text-center mb-4 sm:mb-6 tracking-tight">
        Browse by category
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
        
        {/* ================= HALF 1 (Tall Left, Stacked Right) ================= */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Tall Left Card */}
          <Link href={slots.tallLeft.href} className={`col-span-1 ${slots.tallLeft.bg} rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[240px] md:min-h-[340px]`}>
            <div className={`relative z-20 ${slots.tallLeft.textColor} mb-4`}>
              <h3 className="text-sm sm:text-xl font-bold leading-tight mb-1 sm:mb-2">
                {slots.tallLeft.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold underline group-hover:no-underline">
                Shop now
              </span>
            </div>
            {/* Optimized for transparent floating image */}
            <div className="absolute inset-x-0 bottom-0 top-20 sm:top-24 z-10 p-2 sm:p-4">
              <img src={slots.tallLeft.image} alt={slots.tallLeft.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-xl" />
            </div>
          </Link>

          {/* Stacked Right Cards */}
          <div className="col-span-1 flex flex-col gap-3 sm:gap-4">
            
            {/* Short Card Top */}
            <Link href={slots.shortRightTop.href} className={`flex-1 ${slots.shortRightTop.bg} rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-20 ${slots.shortRightTop.textColor} mb-2 w-[50%] sm:w-[60%]`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortRightTop.name}
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[65%] sm:w-[55%] h-[90%] z-10 p-1">
                <img src={slots.shortRightTop.image} alt={slots.shortRightTop.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-lg" />
              </div>
            </Link>

            {/* Short Card Bottom */}
            <Link href={slots.shortRightBottom.href} className={`flex-1 ${slots.shortRightBottom.bg} rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-20 ${slots.shortRightBottom.textColor} mb-2 w-[50%] sm:w-[60%]`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortRightBottom.name}
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[65%] sm:w-[55%] h-[90%] z-10 p-1">
                <img src={slots.shortRightBottom.image} alt={slots.shortRightBottom.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-lg" />
              </div>
            </Link>
          </div>
        </div>

        {/* ================= HALF 2 (Stacked Left, Tall Right) ================= */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Stacked Left Cards */}
          <div className="col-span-1 flex flex-col gap-3 sm:gap-4">
            
            {/* Short Card Top */}
            <Link href={slots.shortLeftTop.href} className={`flex-1 ${slots.shortLeftTop.bg} rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-20 ${slots.shortLeftTop.textColor} mb-2 w-[50%] sm:w-[60%]`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortLeftTop.name}
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[65%] sm:w-[55%] h-[90%] z-10 p-1">
                <img src={slots.shortLeftTop.image} alt={slots.shortLeftTop.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-lg" />
              </div>
            </Link>

            {/* Short Card Bottom */}
            <Link href={slots.shortLeftBottom.href} className={`flex-1 ${slots.shortLeftBottom.bg} rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-20 ${slots.shortLeftBottom.textColor} mb-2 w-[50%] sm:w-[60%]`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortLeftBottom.name}
                </h3>
                <span className="text-[10px] sm:text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[65%] sm:w-[55%] h-[90%] z-10 p-1">
                <img src={slots.shortLeftBottom.image} alt={slots.shortLeftBottom.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-lg" />
              </div>
            </Link>
          </div>

          {/* Tall Right Card */}
          <Link href={slots.tallRight.href} className={`col-span-1 ${slots.tallRight.bg} rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[240px] md:min-h-[340px]`}>
            <div className={`relative z-20 ${slots.tallRight.textColor} mb-4`}>
              <h3 className="text-sm sm:text-xl font-bold leading-tight mb-1 sm:mb-2">
                {slots.tallRight.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold underline group-hover:no-underline">
                Shop now
              </span>
            </div>
            {/* Optimized for transparent floating image */}
            <div className="absolute inset-x-0 bottom-0 top-20 sm:top-24 z-10 p-2 sm:p-4">
              <img src={slots.tallRight.image} alt={slots.tallRight.name} className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500 drop-shadow-xl" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
