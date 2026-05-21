"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider"; 

export default function HeroBanner() {
  const theme = useTheme();

  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-4 select-none mb-6">
      {/* Main Hero Container 
        Uses a deep, premium dark gradient which makes electronics look expensive and high-quality.
      */}
      <div className="relative bg-gradient-to-br from-slate-900 via-[#041E42] to-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[400px] md:min-h-[480px] shadow-xl">
        
        {/* Left Column: Text Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-14 z-20 flex flex-col justify-center text-left">
          
          {/* Sale/Promo Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white w-max mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FFC220] animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider uppercase">Tech Week Sale</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.1] font-black text-white tracking-tight mb-4">
            Kabale's Premium <br />
            <span className="text-[#FFC220]">Electronics Hub.</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-md">
            Upgrade your lifestyle with the latest smartphones, smart TVs, and premium home appliances. 100% genuine products delivered fast across the Kigezi region.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              href="/category/phones-tvs" 
              className={`inline-flex justify-center items-center font-bold px-8 py-3.5 rounded-xl transition-all active:scale-95 text-white ${theme.bg} hover:shadow-lg hover:shadow-blue-500/30`}
            >
              Shop Top Tech
            </Link>
            <Link 
              href="/category/appliances" 
              className="inline-flex justify-center items-center font-bold px-8 py-3.5 rounded-xl transition-all active:scale-95 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"
            >
              View Home Appliances
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Image(s) */}
        {/* Using absolute positioning on larger screens so the tech looks like it's "floating" out of the box */}
        <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full flex items-center justify-center p-6 md:p-0 z-10 md:absolute md:right-0 md:top-0 md:bottom-0">
          
          {/* Decorative background glow behind the devices */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/30 blur-[80px] rounded-full"></div>

          {/* Placeholder for your transparent tech image.
            For best results, use a transparent PNG of a cluster of devices (e.g., a sleek TV with an iPhone floating next to it).
          */}
          <img 
            src="https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=800&auto=format&fit=crop" 
            alt="Latest Electronics and Gadgets" 
            className="w-[85%] md:w-[110%] h-auto max-h-[300px] md:max-h-[500px] object-contain drop-shadow-2xl md:translate-x-10 transform hover:scale-105 transition-transform duration-700 ease-out mix-blend-screen"
            // Note: Remove "mix-blend-screen" once you upload a real transparent .png file! 
            // I added it here just so the Unsplash placeholder blends nicely with the dark background.
          />
        </div>

      </div>
    </section>
  );
}
