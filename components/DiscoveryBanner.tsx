import Link from "next/link";

export default function DiscoveryBanner() {
  return (
    <section className="w-full bg-[#E89C15] py-6 sm:py-8 mb-8 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-between">

        {/* Left/Top Content Area */}
        <div className="flex-1 max-w-xl w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#422608] mb-3 leading-tight tracking-tight">
            Whatever you're into, it's here
          </h2>

          <p className="text-[#422608] text-base sm:text-lg mb-5 leading-snug font-medium">
            Turn a wrench, get a tech upgrade, and find everything you love.
          </p>

          <Link 
            href="/products"
            className="inline-block bg-[#422608] hover:bg-[#291704] text-[#E89C15] font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-300"
          >
            Do your thing
          </Link>
        </div>

        {/* Right/Bottom Grid Area (The White Cards) */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 mt-2 lg:mt-0">

          {/* Card 1: Accessories */}
          <Link 
            href="/category/accessories"
            className="bg-white rounded-[20px] p-4 flex flex-col h-[140px] sm:h-[180px] hover:shadow-xl transition-all duration-300 group outline-none"
          >
            <div className="flex items-center text-slate-900 font-medium text-sm sm:text-base mb-auto">
              Accessories 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* Expanded image container and larger image */}
            <div className="flex justify-center items-center w-full h-full">
              <img 
                src="/images/categories/accessories.png" 
                alt="Accessories" 
                className="w-24 h-24 sm:w-36 sm:h-36 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </Link>

          {/* Card 2: Sound Systems */}
          <Link 
            href="/category/sound-systems"
            className="bg-white rounded-[20px] p-4 flex flex-col h-[140px] sm:h-[180px] hover:shadow-xl transition-all duration-300 group outline-none"
          >
            <div className="flex items-center text-slate-900 font-medium text-sm sm:text-base mb-auto whitespace-nowrap">
              Sound Systems 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* Expanded image container and larger image */}
            <div className="flex justify-center items-center w-full h-full">
              <img 
                src="/images/categories/sound-systems.png" 
                alt="Sound Systems" 
                className="w-24 h-24 sm:w-36 sm:h-36 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
