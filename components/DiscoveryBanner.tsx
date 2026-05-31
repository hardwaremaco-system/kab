import Link from "next/link";

export default function DiscoveryBanner() {
  return (
    <section className="w-full max-w-[1400px] mx-auto bg-[#E89C15] rounded-3xl p-6 sm:p-10 md:p-12 mb-12 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
        
        {/* Left/Top Content Area */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#422608] mb-4 leading-tight tracking-tight">
            Whatever you're into, it's here
          </h2>
          
          <p className="text-[#422608] text-lg sm:text-xl mb-8 leading-snug font-medium">
            Turn a wrench, get a tech upgrade, and find everything you love.
          </p>
          
          <Link 
            href="/products"
            className="inline-block bg-[#422608] hover:bg-[#291704] text-[#E89C15] font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-colors duration-300"
          >
            Do your thing
          </Link>
        </div>

        {/* Right/Bottom Grid Area (The White Cards) */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6 mt-4 lg:mt-0">
          
          {/* Card 1: Accessories */}
          <Link 
            href="/category/accessories"
            className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col h-[200px] sm:h-[260px] hover:shadow-xl transition-all duration-300 group outline-none"
          >
            <div className="flex items-center text-slate-900 font-medium text-base sm:text-xl mb-auto">
              Accessories 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex justify-center items-center w-full pb-4">
              <span className="text-7xl sm:text-8xl md:text-[100px] drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                🔌
              </span>
            </div>
          </Link>

          {/* Card 2: Sound Systems */}
          <Link 
            href="/category/sound-systems"
            className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col h-[200px] sm:h-[260px] hover:shadow-xl transition-all duration-300 group outline-none"
          >
            <div className="flex items-center text-slate-900 font-medium text-base sm:text-xl mb-auto whitespace-nowrap">
              Sound Systems 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex justify-center items-center w-full pb-4">
              <span className="text-7xl sm:text-8xl md:text-[100px] drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                🔊
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
