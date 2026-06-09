import Link from "next/link";

export default function ShoppingMadeEasyBanner() {
  return (
    <div className="w-full bg-[#F7F7F7] dark:bg-[#151515] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-start justify-center border border-slate-100 dark:border-slate-800">
      <h2 className="text-[32px] sm:text-[40px] leading-tight font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
        Shopping made easy
      </h2>
      <p className="text-[16px] sm:text-[18px] text-slate-800 dark:text-slate-300 mb-6 max-w-md font-medium leading-snug">
        Enjoy reliability, secure free deliveries and great prices.
      </p>
      <Link 
        href="/products" 
        className="bg-[#151515] hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-8 py-3.5 rounded-full font-bold text-[15px] transition-all shadow-sm active:scale-95"
      >
        Start now
      </Link>
    </div>
  );
}
