"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function ContactPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: "256779094664", // 🔥 FIXED
    contactPhone: "+256 779 094664", // 🔥 FIXED
    supportEmail: "support@oweitushop.com"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "global");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setSettings({
            whatsappNumber: data.whatsappNumber || "256779094664", // 🔥 FIXED
            contactPhone: data.contactPhone || "+256 779 094664", // 🔥 FIXED
            supportEmail: data.supportEmail || "support@oweitushop.com"
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-black mb-4">Contact Support</h1>
      <p className="text-slate-600 mb-8 text-lg">
        We're here to help the Ankole and Kigezi community. Reach out through any channel below.
      </p>

      <div className="space-y-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
          
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-[#FF6A00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <h2 className="font-bold text-xl mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                <a href={`mailto:${settings.supportEmail}`} className="text-[#FF6A00] font-bold hover:underline">
                  {settings.supportEmail}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">WhatsApp</p>
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">
                  +{settings.whatsappNumber}
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Direct Calls</p>
                <a href={`tel:${settings.whatsappNumber}`} className="text-slate-900 font-bold hover:underline">
                  {settings.contactPhone}
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
