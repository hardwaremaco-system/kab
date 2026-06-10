"use client";

import { FaWhatsapp, FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div className="w-full bg-white border-b border-slate-100 overflow-hidden relative">
      {/* Subtle modern background accent */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-white z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 flex flex-col items-center text-center">
        
        {/* Minimalist Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
          Kabale's Local Marketplace
        </div>
        
        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
          Save time shopping,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D97706] to-amber-500">
            and we deliver what you need.
          </span>
        </h1>
        
        {/* Elegant Subheadline */}
        <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
          <strong className="text-slate-800 font-bold">Pay only after receiving your order.</strong><br />
          Products sourced from trusted local shops.
        </p>
        
        {/* Modern Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          
          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-[#D97706] mb-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
              <FaTruck className="text-2xl" />
            </div>
            <span className="text-sm font-bold text-slate-800">Fast Local Delivery</span>
          </div>
          
          <div className="hidden sm:block w-px h-12 bg-slate-200"></div>

          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
              <FaMoneyBillWave className="text-2xl" />
            </div>
            <span className="text-sm font-bold text-slate-800">Pay on Delivery</span>
          </div>

          <div className="hidden sm:block w-px h-12 bg-slate-200"></div>

          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-[#25D366] mb-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
              <FaWhatsapp className="text-2xl" />
            </div>
            <span className="text-sm font-bold text-slate-800">WhatsApp Support</span>
          </div>

        </div>

      </div>
    </div>
  );
}
