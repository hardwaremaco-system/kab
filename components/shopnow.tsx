import Link from "next/link";

export default function ShoppingBanner() {
  return (
    <section className="w-full bg-[#E5E5E5] dark:bg-slate-800 py-8 sm:py-10 md:py-14 mb-8">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col items-start">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] dark:text-white mb-3 sm:mb-4 tracking-tight">
          Shopping made easy
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-[#1A1A1A] dark:text-slate-200 mb-6 sm:mb-8 leading-snug">
          Enjoy reliability, secure free deliveries and quality products.
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
