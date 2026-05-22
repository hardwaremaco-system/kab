"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

interface CampaignScrollerProps {
  title: string;
  endTime: string; 
  products: any[];
  campaignSlug: string; 
}

export default function CampaignScroller({ title, endTime, products, campaignSlug }: CampaignScrollerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Live Countdown Timer Logic
  useEffect(() => {
    setIsMounted(true);
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-white dark:bg-[#151515] overflow-hidden border border-slate-200 dark:border-slate-800 mb-6">
      {/* 🔴 Slim container, no rounded corners */}

      {/* 🔴 THE CAMPAIGN HEADER - Light gray, slim padding */}
      <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 sm:px-4 sm:py-2.5 flex justify-between items-start border-b border-slate-200 dark:border-slate-800">
        
        <div className="flex flex-col">
          {/* Orange Title */}
          <h2 className="text-sm sm:text-base font-black uppercase tracking-widest text-[#FF6A00] leading-none">
            {title}
          </h2>
          
          {/* Red Timer - Placed directly below, smaller font size */}
          {isMounted && (
            <div className="text-[10px] sm:text-xs text-red-600 dark:text-red-500 font-bold tracking-widest mt-1 uppercase">
              Ends In: {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          )}
        </div>

        {/* See All Link */}
        <Link 
          href={`/deals?campaign=${campaignSlug}`} 
          className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:text-[#FF6A00] transition-colors mt-0.5"
        >
          See All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* 🛍️ THE PRODUCTS */}
      <div className="p-2 sm:p-3 bg-white dark:bg-[#151515]">
        <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 snap-x snap-mandatory no-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="flex-none w-[140px] sm:w-[180px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
