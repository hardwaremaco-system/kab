"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function ReturnsPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: "256779094664", 
    contactPhone: "+256 779 094664", 
    supportEmail: "support@oweitushop.com"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "global");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setSettings({
            whatsappNumber: data.whatsappNumber || "256779094664", 
            contactPhone: data.contactPhone || "+256 779 094664", 
            supportEmail: data.supportEmail || "support@oweitushop.com"
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-black mb-4">
          Returns & Refund Policy
        </h1>

        <p className="text-slate-600 mb-10 text-lg">
          At Oweitu Shop, customer satisfaction is important to us. 
          If you receive a damaged, defective, or wrong item, we are here to help.
        </p>

        <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

          {/* Eligible Returns */}
          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#FF6A00]">
              Eligible Returns
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
              <li>Wrong item delivered</li>
              <li>Damaged product</li>
              <li>Defective item</li>
              <li>Item significantly different from description</li>
            </ul>
          </section>

          {/* Return Period */}
          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#FF6A00]">
              Return Period
            </h2>
            <p className="text-slate-700 font-medium">
              Returns must be requested within <strong className="text-slate-900">3 days</strong> after delivery.
            </p>
          </section>

          {/* Non Returnable */}
          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#FF6A00]">
              Non-Returnable Items
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
              <li>Used products</li>
              <li>Opened cosmetics or beauty items</li>
              <li>Items damaged after delivery by the customer</li>
              <li>Products without original packaging</li>
            </ul>
          </section>

          {/* Refund Options */}
          <section className="border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold mb-4 text-[#FF6A00]">
              Refund Options
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 font-medium">
              <li>Product replacement</li>
              <li>Store credit</li>
              <li>Mobile Money refund</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="pt-2">
            <h2 className="text-2xl font-bold mb-4">
              Need Help?
            </h2>
            <p className="text-slate-600 mb-4">
              Contact our support team for return assistance. We are available 24/7 to help resolve your issues.
            </p>

            <div className="space-y-3 font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">
              <p className="flex items-center gap-3 text-slate-800">
                <span className="text-xl">💬</span> WhatsApp: 
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-[#FF6A00] hover:underline font-bold">
                  +{settings.whatsappNumber}
                </a>
              </p>
              <p className="flex items-center gap-3 text-slate-800">
                <span className="text-xl">📧</span> Email: 
                <a href={`mailto:${settings.supportEmail}`} className="text-[#FF6A00] hover:underline font-bold">
                  {settings.supportEmail}
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
