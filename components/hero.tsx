"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider"; 

export default function HeroBanner() {
  const theme = useTheme();

  return (
    // 🔥 STRIPPED: Removed all horizontal padding and border-radius. It now bleeds edge-to-edge.
    <section className="relative w-full overflow-hidden bg-white mb-6 border-b border-slate-100 select-none">
      
      {/* LIGHT MESH BACKGROUND
        These absolute divs create the soft, glowing background pattern seen in your image. 
      */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-[#FFF0E6] rounded-full blur-[100px] opacity-80 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#F0F0FF] rounded-full blur-[120px] opacity-80 pointer-events-none"></div>

      {/* Main Content Container (Keeps content constrained on huge monitors, but background is full width) */}
      <div className="relative max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between min-h-[400px] md:min-h-[480px]">

        {/* Left Column: Text Content (Added px-6 so text doesn't hit the physical screen edge) */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-14 z-20 flex flex-col justify-center text-left">

          {/* Sale/Promo Badge (Updated to Orange) */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] w-max mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
            <span className="text-xs font-black tracking-wider uppercase">Tech Week Sale</span>
          </div>

          {/* Headline (Updated to Black & Orange) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.1] font-black text-black tracking-tight mb-4">
            Kabale's Premium <br />
            <span className="text-[#FF6A00]">Electronics Hub.</span>
          </h1>

          {/* Subtitle (Updated to Dark Slate) */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-md font-medium">
            Upgrade your lifestyle with the latest smartphones, smart TVs, and premium home appliances. 100% genuine products delivered fast across the Kigezi region.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              href="/category/phones-tvs" 
              className={`inline-flex justify-center items-center font-bold px-8 py-3.5 rounded-xl transition-all active:scale-95 text-white ${theme.bg || 'bg-[#FF6A00]'} hover:shadow-lg hover:shadow-orange-500/30`}
            >
              Shop Top Tech
            </Link>
            <Link 
              href="/category/appliances" 
              className="inline-flex justify-center items-center font-bold px-8 py-3.5 rounded-xl transition-all active:scale-95 bg-black hover:bg-slate-800 text-white shadow-md"
            >
              View Home Appliances
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Image(s) */}
        <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full flex items-center justify-center p-6 md:p-0 z-10 md:absolute md:right-0 md:top-0 md:bottom-0">

          {/* Decorative glow changed to a soft orange */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#FF6A00]/10 blur-[80px] rounded-full pointer-events-none"></div>

          {/* Image */}
          <img 
            src="https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=800&auto=format&fit=crop" 
            alt="Latest Electronics and Gadgets" 
            className="w-[85%] md:w-[110%] h-auto max-h-[300px] md:max-h-[500px] object-contain drop-shadow-2xl md:translate-x-10 transform hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
          />
        </div>

      </div>
    </section>
  );
}
