"use client";

import Link from "next/link";
import ProductCard from "./ProductCard"; 

export default function HorizontalScroller({ 
  title, 
  subtitle, 
  products, 
  viewAllLink 
}: { 
  title: string, 
  subtitle?: string, 
  products: any[], 
  viewAllLink?: string 
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-[#151515] shadow-sm border border-slate-200 dark:border-slate-800 mb-4 overflow-hidden select-none">

      {/* CLEAN MINIMALIST HEADER */}
      <div className="flex justify-between items-center p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white capitalize tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {/* View All Link */}
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm font-semibold text-[#FF6A00] hover:underline flex items-center gap-1 whitespace-nowrap outline-none">
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* HORIZONTAL SCROLLING TRACK */}
      <div className="p-3 sm:p-4">
        {/* flex, overflow-x-auto, and flex-nowrap create the horizontal swipe track */}
        <div className="flex flex-nowrap overflow-x-auto gap-3 sm:gap-4 pb-4 snap-x snap-mandatory scroll-smooth w-full scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {products.slice(0, 12).map((p) => (
            /* shrink-0 prevents the cards from squishing, fixed widths give them standard sizing */
            <div key={p.id} className="w-[150px] sm:w-[180px] md:w-[200px] shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
