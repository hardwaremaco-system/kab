import Link from "next/link";

export default function ShoppingBanner() {
  return (
    <section className="w-full max-w-[1400px] mx-auto bg-[#F6F6F6] dark:bg-slate-800/50 rounded-2xl p-6 sm:p-10 md:p-14 mb-8">
      <div className="max-w-2xl flex flex-col items-start">
        
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] dark:text-white mb-3 sm:mb-4 tracking-tight">
          Shopping made easy
        </h2>
        
        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-[#1A1A1A] dark:text-slate-200 mb-6 sm:mb-8 leading-snug">
          Enjoy reliability, secure deliveries and hassle-free returns.
        </p>
        
        {/* Call to Action Button */}
        <Link 
          href="/products"
          className="inline-block bg-[#1A1A1A] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-[32px] transition-colors duration-300"
        >
          Start now
        </Link>

      </div>
    </section>
  );
}
