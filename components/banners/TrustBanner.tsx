import Link from "next/link";

export default function TrustBanner() {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden mb-4 sm:mb-6 shadow-sm">
      {/* Background Image - Replace with your actual image path */}
      <img 
        src="/images/trust-banner-bg.jpg" 
        alt="Pay on delivery" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-center h-full max-w-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
          Pay after you receive what you ordered
        </h2>
        <p className="text-white/90 text-lg mb-6 font-medium">
          Shop confidently on Kabale Online. Inspect your items upon delivery before you pay.
        </p>
        <Link href="/trust-policy">
          <button className="bg-white text-black font-semibold py-3 px-6 rounded-full w-fit hover:bg-gray-100 transition duration-200">
            Learn more
          </button>
        </Link>
      </div>
    </div>
  );
}
