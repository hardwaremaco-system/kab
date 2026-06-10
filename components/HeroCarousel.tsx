"use client";

export default function HeroSection() {
  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-hidden">
      {/* 🚀 Removed the massive py-20/py-32 to make it a tight rectangle */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col items-center text-center">
        
        {/* High-Impact Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-2">
          Save time shopping,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D97706] to-amber-500">
            and we deliver what you need.
          </span>
        </h1>
        
        {/* Both lines now in uniform gray with no extra spacing */}
        <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium leading-snug">
          Pay only after receiving your order.<br />
          Products are from trusted shops in Kabale.
        </p>

      </div>
    </div>
  );
}
