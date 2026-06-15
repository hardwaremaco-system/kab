"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider"; // 🔥 IMPORT THEME PROVIDER

export default function AboutKabaleOnline() {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme(); // 🔥 GET CURRENT DAY THEME

  // URL-encoded prefilled message for WhatsApp
  const whatsappMessage = encodeURIComponent("Hello Oweitu Shop Admin! I would like to know more about your current deals.");
  const adminWhatsAppLink = `https://wa.me/256779094664?text=${whatsappMessage}`;

  return (
    <section className="bg-white dark:bg-[#1a1a1a] px-4 py-8 border-y border-slate-200 dark:border-slate-800 mt-2">
      <div className="max-w-4xl mx-auto text-center">

        {/* 🔥 THEMED TITLE: Focused on the "Why Shop With Us" proposition */}
        <h2 className={`text-xl md:text-2xl font-black ${theme.bg} bg-clip-text text-transparent tracking-tight mb-4 leading-tight transition-colors duration-500`}>
          Why shop with Oweitu?
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2 text-left md:text-center max-w-3xl mx-auto">
          We are Kigezi and Ankole’s most trusted online marketplace, bringing the best electronics, fashion, and home essentials directly to you. We take the stress out of shopping with unbeatable prices, secure payment methods, and lightning-fast local delivery.
        </p>

        <div className={`grid transition-all duration-300 ease-in-out text-left ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden space-y-6">

            {/* Core Value Propositions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1">🛡️ Shop with Confidence</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your trust is our priority. With our strict verification network, you only pay when you receive and verify your exact order. No scams, no surprises.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1">🚀 Fast Local Delivery</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Why wait weeks for a package? We offer swift, reliable delivery straight to your doorstep anywhere across the Ankole and Kigezi regions.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold mb-1">✅ Genuine Products</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We bridge the gap between trusted top-tier vendors and buyers. From the latest smartphones to daily groceries, expect only high-quality items.
                </p>
              </div>
            </div>

            {/* WhatsApp Callout (Updated for Admin Direct Contact) */}
            <div className="bg-[#25D366]/5 p-4 rounded-xl border border-[#25D366]/20">
              <h3 className="text-[#25D366] font-bold flex items-center gap-2 mb-2">
                <FaWhatsapp className="text-lg" />
                Message Admin on WhatsApp
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Need help or want to order directly? Chat with our official admin for support, exclusive flash sales, restock alerts, and special localized deals directly via WhatsApp. Stay ahead of the crowd and never miss out!
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

        {/* 🔥 THEMED BUTTON: controls the expansion */}
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
