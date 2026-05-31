"use client";

import Image from "next/image";
import Link from "next/link";
import { optimizeImage } from "@/lib/utils";
import { trackSelectItem } from "@/lib/analytics"; 

export default function SimpleProductCard({ product }: { product: any }) {
  const optimizedImage = product.images?.[0] ? optimizeImage(product.images[0]) : null;
  const isSold = product.status === "sold";
  const titleStr = product.title || product.name || 'Product';

  // Pricing Logic
  const currentPrice = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const isNegotiable = currentPrice === 0;

  return (
    <div 
      className={`group flex flex-col h-full bg-white dark:bg-[#121212] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#FF6A00]/40 relative ${isSold ? 'opacity-75 grayscale-[30%]' : ''}`}
    >
      <Link 
        href={`/product/${product.publicId || product.id}`} 
        className="flex flex-col h-full outline-none"
        onClick={() => {
          if (typeof trackSelectItem === "function") {
            trackSelectItem({
              id: product.id,
              name: titleStr, 
              price: currentPrice,
              category: product.category || "electronics",
            });
          }
        }}
      >
        {/* ======================= */}
        {/* TOP: IMAGE (CLEAN)      */}
        {/* ======================= */}
        <div className="relative aspect-[4/5] w-full bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden border-b border-slate-100 dark:border-slate-800/60">
          {optimizedImage ? (
            <Image 
              src={optimizedImage} 
              alt={titleStr} 
              fill 
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
              No Image
            </div>
          )}

          {/* Sold Out Overlay (Kept for necessary UX) */}
          {isSold && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[2px]">
               <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-lg transform -rotate-12">
                 Sold Out
               </span>
            </div>
          )}
        </div>

        {/* ======================= */}
        {/* BOTTOM: DETAILS (CLEAN) */}
        {/* ======================= */}
        <div className="flex flex-col flex-grow p-2.5 sm:p-3">

          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5 truncate">
            {product.category?.replace('-', ' ') || 'Electronics'}
          </span>

          <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate leading-tight mb-2 group-hover:text-[#FF6A00] transition-colors">
            {titleStr}
          </h3>

          <div className="mt-auto flex flex-col gap-2">
            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <span className={`text-sm sm:text-base font-black leading-none ${isSold ? 'text-slate-400 line-through' : isNegotiable ? 'text-[#FF6A00]' : 'text-slate-900 dark:text-white group-hover:text-[#FF6A00]'} transition-colors`}>
                  {isNegotiable ? "Negotiable" : `UGX ${currentPrice.toLocaleString()}`}
                </span>

                {originalPrice > currentPrice && (
                  <span className="text-[10px] font-bold text-slate-400 line-through mt-0.5">
                    UGX {originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {!isSold && (
                <div className="w-6 h-6 shrink-0 rounded-full bg-orange-50 dark:bg-orange-500/10 text-[#FF6A00] flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
