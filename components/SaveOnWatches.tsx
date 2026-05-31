"use client";

import Link from "next/link";
import Image from "next/image";
import { optimizeImage } from "@/lib/utils"; 

export default function SaveOnWatches({ products }: { products: any[] }) {
  // We only need 6 products to fill the masonry grid perfectly
  const displayProducts = products?.slice(0, 6) || [];

  // Array of predefined background colors and row spans to match the vibrant collage design
  const masonryStyles = [
    "bg-[#8CC63F] normal-row", // Item 1: Normal
    "bg-[#E3242B] row-span-2", // Item 2: Tall
    "bg-[#FFB81C] normal-row", // Item 3: Normal
    "bg-[#0072CE] row-span-2", // Item 4: Tall
    "bg-[#FFB81C] normal-row", // Item 5: Normal
    "bg-[#0072CE] normal-row", // Item 6: Normal
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto bg-[#F9F9F9] dark:bg-slate-800/30 rounded-3xl p-6 sm:p-10 md:p-14 mb-12 overflow-hidden">

      {/* Top Content Area */}
      <div className="max-w-3xl flex flex-col items-start mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-[#1A1A1A] dark:text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
          Upgrade your everyday
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-[#1A1A1A] dark:text-slate-200 mb-8 leading-snug">
          Find the perfect timepiece and save up to 4k on select top-tier watches.
        </p>

        <Link 
          href="/category/watches"
          className="inline-block bg-[#1A1A1A] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-colors duration-300 mb-2"
        >
          Save on Watches
        </Link>
      </div>

      {/* Bottom Collage Area (Masonry-style Grid with Real Products) */}
      {displayProducts.length > 0 && (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[200px]">
          
          {displayProducts.map((product, index) => {
            // Apply the style for this specific index
            const style = masonryStyles[index] || "bg-[#8CC63F]";
            const baseClasses = style.replace(" normal-row", "");
            
            // Re-use your image optimization logic from ProductCard
            const optimizedImage = product.images?.[0] ? optimizeImage(product.images[0]) : null;

            return (
              <Link 
                key={product.id || index}
                href={`/product/${product.publicId || product.id}`}
                className={`${baseClasses} rounded-2xl sm:rounded-3xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm relative overflow-hidden group outline-none`}
              >
                {optimizedImage ? (
                  <Image 
                    src={optimizedImage} 
                    alt={product.title || product.name || "Watch"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                  />
                ) : (
                  <span className="text-white/50 font-bold text-sm uppercase">No Image</span>
                )}
              </Link>
            );
          })}

        </div>
      )}
    </section>
  );
}
