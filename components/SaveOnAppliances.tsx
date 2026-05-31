import Link from "next/link";

export default function SaveOnAppliances() {
  return (
    <section className="w-full max-w-[1400px] mx-auto bg-[#F9F9F9] dark:bg-slate-800/30 rounded-3xl p-6 sm:p-10 md:p-14 mb-12 overflow-hidden">
      
      {/* Top Content Area */}
      <div className="max-w-3xl flex flex-col items-start mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-[#1A1A1A] dark:text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
          Upgrade your everyday
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl text-[#1A1A1A] dark:text-slate-200 mb-8 leading-snug">
          Equip your home and save 10%* on select top-tier appliances.
        </p>
        
        <Link 
          href="/category/appliances"
          className="inline-block bg-[#1A1A1A] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-colors duration-300 mb-6"
        >
          Save on Appliances
        </Link>

        <span className="text-sm sm:text-base text-[#1A1A1A] dark:text-slate-300 underline underline-offset-4 decoration-1">
          *Ends June 30. 2x use. Select items.
        </span>
      </div>

      {/* Bottom Collage Area (Masonry-style Grid) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[200px]">
        
        {/* Item 1 */}
        <div className="bg-[#8CC63F] rounded-2xl sm:rounded-3xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm">
          <span className="text-6xl sm:text-8xl drop-shadow-md">🎛️</span>
        </div>

        {/* Item 2 (Tall) */}
        <div className="bg-[#E3242B] rounded-2xl sm:rounded-3xl row-span-2 flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm">
          <span className="text-7xl sm:text-9xl drop-shadow-md">🧊</span>
        </div>

        {/* Item 3 */}
        <div className="bg-[#FFB81C] rounded-2xl sm:rounded-3xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm">
          <span className="text-6xl sm:text-8xl drop-shadow-md">☕</span>
        </div>

        {/* Item 4 (Tall) */}
        <div className="bg-[#0072CE] rounded-2xl sm:rounded-3xl row-span-2 flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm">
          <span className="text-7xl sm:text-9xl drop-shadow-md">🧺</span>
        </div>

        {/* Item 5 */}
        <div className="bg-[#FFB81C] rounded-2xl sm:rounded-3xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm">
          <span className="text-6xl sm:text-8xl drop-shadow-md">🌬️</span>
        </div>

        {/* Item 6 */}
        <div className="bg-[#0072CE] rounded-2xl sm:rounded-3xl flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm">
          <span className="text-6xl sm:text-8xl drop-shadow-md">♨️</span>
        </div>

      </div>
    </section>
  );
}
