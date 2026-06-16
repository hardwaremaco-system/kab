"use client";

import Image from "next/image";
import Link from "next/link";
import { optimizeImage } from "@/lib/utils";
import { trackSelectItem } from "@/lib/analytics"; 

export default function ProductCard({ product }: { product: any }) {
  // ==========================================
  // 1. BASE LOGIC & DATE CHECK
  // ==========================================
  const checkIsNew = (p: any) => {
    const pDate = p.createdAt?.seconds ? p.createdAt.seconds * 1000 : new Date(p.createdAt || 0).getTime();
    return pDate > 0 && (Date.now() - pDate) < (7 * 24 * 60 * 60 * 1000); 
  };

  const optimizedImage = product.images?.[0] ? optimizeImage(product.images[0]) : null;
  const isJustPosted = checkIsNew(product);
  const isSold = product.status === "sold";

  const titleStr = product.title || product.name || 'Product';
  const displayTitle = titleStr;

  // ==========================================
  // 2. PRICING LOGIC (🔥 FIXED)
  // ==========================================
  const currentPrice = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const isNegotiable = currentPrice === 0;

  // 🔥 We now check purely if the original price is greater than the current price
  const hasDiscount = originalPrice > currentPrice && !isNegotiable;

  const discountPercent = hasDiscount 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  // ==========================================
  // 3. SAFE STOCK BAR LOGIC
  // ==========================================
  const hasStockData = product.stock !== undefined && product.stock !== null && product.stock !== "";

  const rawStock = hasStockData ? Number(product.stock) : 0;
  const safeStock = isNaN(rawStock) ? 0 : Math.max(0, rawStock);

  const maxStock = 10;
  const stockWidth = Math.min(100, (safeStock / maxStock) * 100);

  let stockColorClass = "bg-green-500"; 
  if (safeStock <= 3) stockColorClass = "bg-amber-500"; 
  if (safeStock === 1) stockColorClass = "bg-red-500"; 

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
        {/* TOP: IMAGE & BADGES     */}
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

          {/* Sold Out Overlay */}
          {isSold && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[2px]">
               <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-lg transform -rotate-12">
                 Sold Out
               </span>
            </div>
          )}

          {/* New Arrival Badge (Top Left) */}
          {!isSold && isJustPosted && (
            <div className="absolute top-0 left-0 bg-slate-900/90 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-bold px-2 py-1 rounded-br-lg flex items-center gap-1 z-10">
               <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
               NEW
            </div>
          )}

          {/* Discount Badge (Top Right) */}
          {!isSold && hasDiscount && discountPercent > 0 && (
            <div className="absolute top-2 right-2 bg-red-50 text-red-600 border border-red-200 text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 rounded shadow-sm z-10">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* ======================= */}
        {/* BOTTOM: TEXT & DETAILS  */}
        {/* ======================= */}
        <div className="flex flex-col flex-grow p-2.5 sm:p-3">

          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5 truncate">
            {product.category?.replace('-', ' ') || 'Electronics'}
          </span>

          <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate leading-tight mb-2 group-hover:text-[#FF6A00] transition-colors">
            {displayTitle}
          </h3>

          <div className="mt-auto flex flex-col gap-2">

            {!isSold && hasStockData && (
              <div className="flex flex-col gap-1 w-full">
                <div className="w-full h-[4px] bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${stockColorClass}`} 
                    style={{ width: `${stockWidth}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wide">
                  {safeStock > 0 ? `Only ${safeStock} item${safeStock !== 1 ? 's' : ''} left` : 'Out of stock'}
                </span>
              </div>
            )}

            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">

              <div className="flex flex-col justify-center">
                {/* 🔥 The Original Price is now strictly tied to hasDiscount */}
                {hasDiscount && (
                  <span className="text-[10px] font-bold text-slate-400 line-through mb-0.5">
                    UGX {originalPrice.toLocaleString()}
                  </span>
                )}
                
                <span className={`text-sm sm:text-base font-black leading-none ${isSold ? 'text-slate-400 line-through' : isNegotiable ? 'text-[#FF6A00]' : 'text-slate-900 dark:text-white group-hover:text-[#FF6A00]'} transition-colors`}>
                  {isNegotiable ? "Negotiable" : `UGX ${currentPrice.toLocaleString()}`}
                </span>
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
