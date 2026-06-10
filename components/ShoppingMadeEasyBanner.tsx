"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export default function ShoppingMadeEasyBanner() {
  const theme = useTheme();

  return (
    <div className="w-full bg-[#F7F7F7] dark:bg-[#151515] rounded-xl p-5 sm:p-6 flex flex-col items-start justify-center border border-slate-100 dark:border-slate-800">
      <h2 className={`text-[24px] sm:text-[28px] leading-tight font-extrabold ${theme.bg} bg-clip-text text-transparent mb-1.5 tracking-tight transition-colors duration-500`}>
        Shopping made easy
      </h2>
      <p className="text-[13px] sm:text-[14px] text-slate-700 dark:text-slate-300 mb-4 max-w-sm font-medium leading-snug">
        Enjoy reliability, secure free deliveries and great prices.
      </p>
      <Link 
        href="/products" 
        className="bg-[#151515] hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-bold text-[13px] sm:text-[14px] transition-all shadow-sm active:scale-95"
      >
        Start now
      </Link>
    </div>
  );
}
