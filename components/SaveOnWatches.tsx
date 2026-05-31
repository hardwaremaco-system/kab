"use client";

import Link from "next/link";
import Image from "next/image";
import { optimizeImage } from "@/lib/utils"; 

export default function SaveOnWatches({ products }: { products: any[] }) {
  // We only need 6 products to fill the masonry grid perfectly
  const displayProducts = products?.slice(0, 6) || [];

  // Array of predefined row spans to match the collage design (colors removed)
  const masonryStyles = [
    "",           // Item 1: Normal
    "row-span-2", // Item 2: Tall
    "",           // Item 3: Normal
    "row-span-2", // Item 4: Tall
    "",           // Item 5: Normal
    "",           // Item 6: Normal
  ];

  return (
    <section className="w-full bg-[#E5E5E5] dark:bg-slate-800 py-8 sm:py-12 md:py-16 mb-12 overflow-hidden">
      
      {/* Container wrapper to keep content aligned with the rest of the site */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">

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
              // Apply the row-span style for this specific index
              const style = masonryStyles[index] || "";

              // Re-use your image optimization logic from ProductCard
              const optimizedImage = product.images?.[0] ? optimizeImage(product.images[0]) : null;

              return (
                <Link 
                  key={product.id || index}
                  href={`/product/${product.publicId || product.id}`}
                  className={`${style} bg-white dark:bg-[#121212] rounded-xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm relative overflow-hidden group outline-none`}
                >
                  {optimizedImage ? (
                    <Image 
                      src={optimizedImage} 
                      alt={product.title || product.name || "Watch"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      // Changed to object-cover so the image acts as the full background of the tile
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-slate-400 font-bold text-sm uppercase">No Image</span>
                  )}
                </Link>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}
