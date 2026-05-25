"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

export default function DealsScroller({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        className="w-full py-2"
      >
        {products.map((product) => {
          // Standardized data mapping matching your HeroCarousel
          const title = product.name || product.title || "Exclusive Deal";
          const price = Number(product.price).toLocaleString();
          const image = product.images?.[0] ? product.images[0] : "";

          return (
            // Override SwiperSlide width to ensure "Bigger Cards" sizing
            <SwiperSlide key={product.id} className="!w-[200px] sm:!w-[240px]">
              <Link 
                href={`/product/${product.publicId || product.id}`} 
                className="block bg-white dark:bg-[#151515] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition group"
              >
                {/* Image Container - Aspect Square */}
                <div className="w-full aspect-square relative bg-gray-100 dark:bg-gray-900 overflow-hidden">
                  {image ? (
                    <Image 
                      src={image} 
                      alt={title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 200px, 240px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  {/* One-Line Titles (Light Gray) */}
                  <h3 className="truncate text-gray-400 font-medium text-base mb-1">
                    {title}
                  </h3>
                  
                  {/* Bold Gray Prices */}
                  <p className="font-bold text-gray-500 text-lg">
                    UGX {price}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
