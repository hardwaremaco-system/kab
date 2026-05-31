"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

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

  // Convert title to sentence case (e.g. "Flash Sales" -> "Flash sales")
  const sentenceCaseTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  return (
    <section className="w-full bg-white dark:bg-[#151515] rounded-md shadow-sm border border-slate-200 dark:border-slate-800 mb-4 overflow-hidden select-none">
      
      {/* HEADER AREA - Identical to ProductSection / ContinueBrowsing */}
      <div className="flex justify-between items-center p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col">
          <h2 style={{ color: '#1A1A1A' }} className="text-base sm:text-lg md:text-xl font-bold dark:text-white tracking-tight">
            {sentenceCaseTitle}
          </h2>
          {isMounted && (
            <p style={{ color: '#6B6B6B' }} className="text-[10px] sm:text-xs font-medium mt-0.5 dark:text-slate-400">
              <span className="text-red-600 dark:text-red-500 font-bold">
                Ends in: {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </p>
          )}
        </div>

        {/* VIEW ALL LINK */}
        <Link href={`/deals?campaign=${campaignSlug}`} className="text-sm font-semibold text-[#FF6A00] hover:underline flex items-center gap-1 whitespace-nowrap outline-none">
          See All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* HORIZONTAL SCROLL AREA */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-2 snap-x snap-mandatory hide-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="flex-none w-[140px] sm:w-[180px] lg:w-[200px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
