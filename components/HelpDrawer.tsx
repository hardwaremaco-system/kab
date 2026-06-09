"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { X, HelpCircle, PhoneCall, AlertTriangle, MessageSquare, ChevronRight } from "lucide-react";

export default function HelpDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* ============================================== */}
      {/* FLOATING ACTION BUTTON (FAB)                   */}
      {/* ============================================== */}
      <button
        onClick={toggleDrawer}
        className="fixed bottom-6 right-4 sm:right-6 bg-white border border-slate-200 text-slate-800 p-3.5 rounded-full shadow-lg z-40 hover:bg-slate-50 hover:text-[#FF6A00] hover:border-[#FF6A00] transition-all flex items-center justify-center"
        aria-label="Help and Support"
      >
        <HelpCircle size={28} strokeWidth={2.5} />
      </button>

      {/* ============================================== */}
      {/* DRAWER OVERLAY                                 */}
      {/* ============================================== */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleDrawer}
      />

      {/* ============================================== */}
      {/* SLIDE-OUT DRAWER                               */}
      {/* ============================================== */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-[90vw] max-w-[400px] bg-white z-[110] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={toggleDrawer} className="text-slate-500 hover:text-slate-900 focus:outline-none -ml-2 p-2">
            <X size={24} strokeWidth={2.5} />
          </button>
          <h2 className="text-lg font-bold text-slate-900">Help & Support</h2>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* SECTION 1: Direct Contact (Optimized for Local) */}
          <section>
            <h3 className="text-[22px] font-extrabold text-slate-900 mb-2 tracking-tight">
              How can we help you?
            </h3>
            <p className="text-[15px] text-slate-600 mb-5 leading-relaxed">
              Have questions about buying, delivery, or a specific electronic item? Reach out to our local support team directly.
            </p>
            
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/256759997376"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE57] text-white py-3.5 px-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>
              
              <a
                href="tel:+256759997376"
                className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-800 py-3 px-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall size={18} />
                Call Support Team
              </a>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 2: Trust & Reporting */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-[#FF6A00]" size={22} />
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Report an issue
              </h3>
            </div>
            <p className="text-[15px] text-slate-600 mb-5 leading-relaxed">
              We ensure all electronics on our platform are genuine. If you spot a suspicious listing, counterfeit item, or experienced an issue with a seller, let our admins know immediately.
            </p>
            
            <Link 
              href="/report" 
              onClick={toggleDrawer}
              className="w-full inline-flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 px-4 rounded-full font-semibold text-[15px] transition-colors"
            >
              Submit a report
            </Link>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 3: Feedback & Guides */}
          <section className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
              Let us know
            </h3>
            
            <div className="flex flex-col gap-1">
              <Link 
                href="/feedback" 
                onClick={toggleDrawer}
                className="flex items-center justify-between py-3 text-[#FF6A00] hover:text-orange-700 font-bold text-[15px] group transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  Send feedback
                </span>
                <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/guide" 
                onClick={toggleDrawer}
                className="flex items-center justify-between py-3 text-[#FF6A00] hover:text-orange-700 font-bold text-[15px] group transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle size={18} />
                  Read the Buyer's Guide
                </span>
                <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
