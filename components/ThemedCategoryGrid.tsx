"use client";

import Link from "next/link";

export default function ThemedCategoryGrid() {
  // Using your exact data points mapped into specific layout slots
  const slots = {
    tallLeft: {
      name: "Phones & TVs",
      href: "/category/phones-tvs",
      image: "https://images.unsplash.com/photo-1560209617-059c0bd661ba?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmVzfGVufDB8fDB8fHww",
      bg: "bg-[#E2E6E9]",
      textColor: "text-[#041E42]"
    },
    shortRightTop: {
      name: "Sound Systems",
      href: "/category/sound-systems",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80",
      bg: "bg-[#EAD4C7]",
      textColor: "text-[#041E42]"
    },
    shortRightBottom: {
      name: "Accessories",
      href: "/category/accessories",
      image: "https://images.unsplash.com/photo-1602526432604-029a709e131c?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmUlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHx8MA%3D%3D",
      bg: "bg-[#518DFA]",
      textColor: "text-white"
    },
    shortLeftTop: {
      name: "Appliances",
      href: "/category/appliances",
      image: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGlhbmNlfGVufDB8fDB8fHww",
      bg: "bg-[#9AAAC4]",
      textColor: "text-[#041E42]"
    },
    shortLeftBottom: {
      name: "Other Products",
      href: "/products",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&q=80",
      bg: "bg-[#FFFEC3]",
      textColor: "text-[#041E42]"
    },
    tallRight: {
      name: "Watches",
      href: "/category/watches",
      image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D",
      bg: "bg-[#F5C7D9]",
      textColor: "text-[#041E42]"
    }
  };

  return (
    <section className="w-full select-none">
      {/* Centered Heading */}
      <h2 style={{ color: '#1A1A1A' }} className="text-xl sm:text-2xl font-bold dark:text-white text-center mb-4 sm:mb-6 tracking-tight">
        Browse by category
      </h2>

      {/* Main Grid: Stacks on mobile, places side-by-side on md+ screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
        
        {/* ================= HALF 1 (Tall Left, Stacked Right) ================= */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Tall Left Card */}
          <Link href={slots.tallLeft.href} className={`col-span-1 ${slots.tallLeft.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[240px] md:min-h-[340px]`}>
            <div className={`relative z-10 ${slots.tallLeft.textColor} mb-4`}>
              <h3 className="text-sm sm:text-xl font-bold leading-tight mb-1 sm:mb-2">
                {slots.tallLeft.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold underline group-hover:no-underline">
                Shop now
              </span>
            </div>
            <div className="flex-1 w-full rounded-lg overflow-hidden relative mt-auto">
              <img src={slots.tallLeft.image} alt={slots.tallLeft.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </Link>

          {/* Stacked Right Cards */}
          <div className="col-span-1 flex flex-col gap-3 sm:gap-4">
            
            {/* Short Card Top */}
            <Link href={slots.shortRightTop.href} className={`flex-1 ${slots.shortRightTop.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-10 ${slots.shortRightTop.textColor} mb-2`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortRightTop.name}
                </h3>
                <span className="text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[60%] sm:w-[70%] h-[70%] rounded-tl-xl overflow-hidden">
                <img src={slots.shortRightTop.image} alt={slots.shortRightTop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>

            {/* Short Card Bottom */}
            <Link href={slots.shortRightBottom.href} className={`flex-1 ${slots.shortRightBottom.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-10 ${slots.shortRightBottom.textColor} mb-2 w-[70%]`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortRightBottom.name}
                </h3>
                <span className="text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[60%] sm:w-[70%] h-[70%] rounded-tl-xl overflow-hidden">
                <img src={slots.shortRightBottom.image} alt={slots.shortRightBottom.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>

        {/* ================= HALF 2 (Stacked Left, Tall Right) ================= */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Stacked Left Cards */}
          <div className="col-span-1 flex flex-col gap-3 sm:gap-4">
            
            {/* Short Card Top */}
            <Link href={slots.shortLeftTop.href} className={`flex-1 ${slots.shortLeftTop.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-10 ${slots.shortLeftTop.textColor} mb-2`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortLeftTop.name}
                </h3>
                <span className="text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[60%] sm:w-[70%] h-[70%] rounded-tl-xl overflow-hidden">
                <img src={slots.shortLeftTop.image} alt={slots.shortLeftTop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>

            {/* Short Card Bottom */}
            <Link href={slots.shortLeftBottom.href} className={`flex-1 ${slots.shortLeftBottom.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[110px] md:min-h-[160px]`}>
              <div className={`relative z-10 ${slots.shortLeftBottom.textColor} mb-2 w-[70%]`}>
                <h3 className="text-sm sm:text-lg font-bold leading-tight mb-1">
                  {slots.shortLeftBottom.name}
                </h3>
                <span className="text-xs font-semibold underline group-hover:no-underline">
                  Shop now
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-[60%] sm:w-[70%] h-[70%] rounded-tl-xl overflow-hidden">
                <img src={slots.shortLeftBottom.image} alt={slots.shortLeftBottom.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
          </div>

          {/* Tall Right Card */}
          <Link href={slots.tallRight.href} className={`col-span-1 ${slots.tallRight.bg} rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 min-h-[240px] md:min-h-[340px]`}>
            <div className={`relative z-10 ${slots.tallRight.textColor} mb-4`}>
              <h3 className="text-sm sm:text-xl font-bold leading-tight mb-1 sm:mb-2">
                {slots.tallRight.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold underline group-hover:no-underline">
                Shop now
              </span>
            </div>
            <div className="flex-1 w-full rounded-lg overflow-hidden relative mt-auto">
              <img src={slots.tallRight.image} alt={slots.tallRight.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
