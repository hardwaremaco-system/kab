"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "PENDING";

  return (
    <div className="max-w-md mx-auto py-16 px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[70vh] flex flex-col justify-center">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
        <CheckCircle size={48} strokeWidth={2.5} />
      </div>
      
      <h1 className="text-3xl font-black text-slate-900 mb-2">
        Order Received!
      </h1>
      
      <p className="text-slate-600 mb-6 text-[15px] font-medium">
        Thank you for shopping with Oweitu Shop. We are processing your order.
      </p>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
          Order Reference
        </p>
        <p className="text-2xl font-black text-[#FF6A00]">
          {orderId}
        </p>
      </div>

      <div className="space-y-3">
        <Link 
          href="/profile/orders"
          className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#e65c00] transition-colors flex justify-center items-center gap-2 shadow-md"
        >
          <ShoppingBag size={18} />
          Track My Order
        </Link>

        <Link 
          href="/"
          className="w-full bg-slate-100 text-slate-700 py-4 rounded-xl font-bold text-[15px] hover:bg-slate-200 transition-colors flex justify-center items-center gap-2"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Suspense is required by Next.js when using useSearchParams */}
      <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-[#FF6A00] border-t-transparent rounded-full"></div></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
