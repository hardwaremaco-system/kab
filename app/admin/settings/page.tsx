"use client";

import { useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import Image from "next/image";

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState({
    whatsappNumber: "",
    supportEmail: "",
    contactPhone: "",
    facebookUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
    emailBannerUrl: "",
  });

  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      const fetchSettings = async () => {
        try {
          const docRef = doc(db, "settings", "global");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSettings(prev => ({ ...prev, ...docSnap.data() }));
          }
        } catch (error) {
          console.error("Failed to load settings:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSettings();
    }
  }, [user]);

  if (authLoading || loading) {
    return <div className="py-20 text-center font-bold text-[#6B6B6B] animate-pulse">Loading Configurations...</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-4xl mb-6">⛔</div>
        <h1 style={{ color: '#1A1A1A' }} className="text-3xl font-black mb-2">Access Denied</h1>
        <Link href="/" style={{ backgroundColor: '#1A1A1A' }} className="text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors mt-4">Return to Homepage</Link>
      </div>
    );
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    try {
      let finalBannerUrl = settings.emailBannerUrl;

      // Upload new banner to Cloudinary if selected
      if (newBannerFile) {
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "oweitushop_assets" }) 
        });
        const signData = await signRes.json();
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

        const formDataCloudinary = new FormData();
        formDataCloudinary.append("file", newBannerFile);
        formDataCloudinary.append("api_key", apiKey!);
        formDataCloudinary.append("timestamp", signData.timestamp.toString());
        formDataCloudinary.append("signature", signData.signature);
        formDataCloudinary.append("folder", "oweitushop_assets");

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formDataCloudinary,
        });
        const uploadData = await res.json();
        finalBannerUrl = uploadData.secure_url;
      }

      // Save to Firestore
      const docRef = doc(db, "settings", "global");
      await setDoc(docRef, { ...settings, emailBannerUrl: finalBannerUrl }, { merge: true });

      setSettings(prev => ({ ...prev, emailBannerUrl: finalBannerUrl }));
      setNewBannerFile(null);
      setBannerPreview("");
      setSuccessMsg("Global settings updated successfully!");
      
      setTimeout(() => setSuccessMsg(""), 4000);

    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      <div style={{ backgroundColor: '#1A1A1A' }} className="rounded-3xl p-8 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <span style={{ backgroundColor: '#FF6A00' }} className="text-white text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest mb-3 inline-block">
            Global Configuration
          </span>
          <h1 className="text-3xl font-extrabold mb-1">Store Settings</h1>
          <p style={{ color: '#6B6B6B' }}>Manage official contacts, links, and assets.</p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-8 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
             <span className="text-2xl">✅</span>
             <span className="font-bold">{successMsg}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Contact Information */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold border-b border-slate-100 pb-4 mb-6">Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Official WhatsApp Number</label>
              <input type="text" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-[#FF6A00] outline-none" 
                value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} placeholder="e.g. 256759997376" />
              <p className="text-xs text-slate-500 mt-1">Include country code, no plus sign.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Support Phone Number</label>
              <input type="text" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-[#FF6A00] outline-none" 
                value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} placeholder="+256 759 997 376" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-2">Support Email Address</label>
              <input type="email" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-[#FF6A00] outline-none" 
                value={settings.supportEmail} onChange={e => setSettings({...settings, supportEmail: e.target.value})} placeholder="support@oweitushop.com" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold border-b border-slate-100 pb-4 mb-6">Social Media Links</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Facebook Page URL</label>
              <input type="url" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-[#FF6A00] outline-none" 
                value={settings.facebookUrl} onChange={e => setSettings({...settings, facebookUrl: e.target.value})} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Instagram Profile URL</label>
              <input type="url" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-[#FF6A00] outline-none" 
                value={settings.instagramUrl} onChange={e => setSettings({...settings, instagramUrl: e.target.value})} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">TikTok Profile URL</label>
              <input type="url" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-[#FF6A00] outline-none" 
                value={settings.tiktokUrl} onChange={e => setSettings({...settings, tiktokUrl: e.target.value})} placeholder="https://tiktok.com/@..." />
            </div>
          </div>
        </div>

        {/* Email Banner Asset */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-xl font-bold border-b border-slate-100 pb-4 mb-6">Marketing Assets</h2>
           <div>
             <label className="block text-sm font-semibold mb-2">Email Newsletter Banner</label>
             <p className="text-xs text-slate-500 mb-4">This image can be used as the header for automated emails or receipts.</p>
             
             <div className="flex items-center gap-6">
               <div className="relative w-64 h-32 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                 {(bannerPreview || settings.emailBannerUrl) ? (
                   <Image src={bannerPreview || settings.emailBannerUrl} alt="Email Banner" fill className="object-cover" />
                 ) : (
                   <span className="text-slate-400 text-sm font-bold">No Banner Set</span>
                 )}
               </div>
               <button 
                 type="button" 
                 onClick={() => fileInputRef.current?.click()}
                 className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 transition-colors"
               >
                 Change Image
               </button>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
             </div>
           </div>
        </div>

        <button disabled={saving} type="submit" style={{ backgroundColor: '#FF6A00' }} className="w-full text-white py-4 rounded-xl font-black text-xl hover:opacity-90 transition-all hover:-translate-y-1 shadow-md disabled:opacity-70 disabled:hover:translate-y-0">
          {saving ? "Saving Configuration..." : "Save All Settings"}
        </button>

      </form>
    </div>
  );
}
