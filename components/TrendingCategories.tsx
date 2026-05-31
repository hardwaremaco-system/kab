import Link from "next/link";

export default function TrendingCategories() {
  // Categories from your original ThemedCategoryGrid component, updated with emojis
  const trendingCategories = [
    { name: "Phones & TVs", href: "/category/phones-tvs", emoji: "📱" },
    { name: "Sound Systems", href: "/category/sound-systems", emoji: "🔊" },
    { name: "Accessories", href: "/category/accessories", emoji: "🔌" },
    { name: "Appliances", href: "/category/appliances", emoji: "🍳" },
    { name: "Watches", href: "/category/watches", emoji: "⌚" },
    { name: "Other Products", href: "/products", emoji: "🛍️" },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto bg-transparent mb-12 px-4 sm:px-6">
      
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] dark:text-white mb-4 sm:mb-6 tracking-tight">
        Trending on Kabale Online
      </h2>
      
      {/* Responsive Grid: 3 columns to match the reference image perfectly */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-6 w-full">
        {trendingCategories.map((cat, index) => (
          <Link 
            key={index} 
            href={cat.href} 
            className="group flex flex-col items-start outline-none"
          >
            {/* Light gray rounded square for the emoji */}
            <div className="w-full aspect-square rounded-2xl bg-[#F6F6F6] dark:bg-slate-800 flex items-center justify-center p-4 mb-2 sm:mb-3 transition-transform duration-300 group-hover:bg-gray-200 dark:group-hover:bg-slate-700">
              <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                {cat.emoji}
              </span>
            </div>

            {/* Category Text below the image container */}
            <span className="text-xs sm:text-sm md:text-base text-[#1A1A1A] dark:text-slate-200 font-medium leading-tight group-hover:underline decoration-2 underline-offset-2">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
      
    </section>
  );
}
