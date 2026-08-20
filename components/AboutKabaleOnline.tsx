"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider"; // 🔥 IMPORT THEME PROVIDER

export default function AboutMbararaOnline() {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme(); // 🔥 GET CURRENT DAY THEME

  // URL-encoded prefilled message for WhatsApp
  const whatsappMessage = encodeURIComponent("Hello Mbarara Online Admin! I would like to know more about buying and selling on the platform.");
  const adminWhatsAppLink = `https://wa.me/256779094664?text=${whatsappMessage}`;

  return (
    <section className="bg-white dark:bg-[#1a1a1a] px-4 py-8 border-y border-slate-200 dark:border-slate-800 mt-2">
      <div className="max-w-4xl mx-auto text-center">

        {/* 🔥 THEMED TITLE */}
        <h2 className={`text-xl md:text-2xl font-black ${theme.bg} bg-clip-text text-transparent tracking-tight mb-4 leading-tight transition-colors duration-500`}>
          Why shop with Mbarara Online?
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2 text-left md:text-center max-w-3xl mx-auto">
          We are Mbarara City’s dedicated digital marketplace, making it effortless to buy and sell both used and brand-new electronics, phones, fashion, furniture, and daily essentials. We connect local buyers and verified sellers across Mbarara with safe, transparent Cash-on-Delivery commerce.
        </p>

        <div className={`grid transition-all duration-300 ease-in-out text-left ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden space-y-6">

            {/* Core Value Propositions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1">🛡️ Safe Local Trading</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your security comes first. Inspect used or new items in person and only pay via Cash on Delivery once you are 100% satisfied. No advance payment risks.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1">🚀 Fast Mbarara Pickups & Delivery</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Skip the long inter-district courier waits. Meet sellers conveniently in Mbarara City center, university hubs, or arrange swift local delivery.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1">✅ Quality Used & New Goods</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  From affordable second-hand student gear and appliances to brand-new products from verified local retailers, find the best deals in Mbarara.
                </p>
              </div>
            </div>

            {/* WhatsApp Callout */}
            <div className="bg-[#25D366]/5 p-4 rounded-xl border border-[#25D366]/20">
              <h3 className="text-[#25D366] font-bold flex items-center gap-2 mb-2">
                <FaWhatsapp className="text-lg" />
                Message Admin on WhatsApp
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Need help buying, selling, or want to feature your listing? Chat directly with the official Mbarara Online admin for quick assistance, seller verification, and exclusive deals across Mbarara City.
              </p>
              <a 
                href={adminWhatsAppLink} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-black px-5 py-2.5 rounded-lg transition-colors shadow-sm active:scale-95"
              >
                Chat with Admin Now
              </a>
            </div>
          </div>
        </div>

        {/* 🔥 THEMED BUTTON */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-4 text-sm font-black ${theme.bg} bg-clip-text text-transparent hover:opacity-70 focus:outline-none transition-all duration-300 uppercase tracking-wider`}
        >
          {isExpanded ? "Show Less" : "Read More Benefits"}
        </button>

      </div>
    </section>
  );
}
