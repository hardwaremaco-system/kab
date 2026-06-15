"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { FaBuilding, FaTrash, FaPlus, FaImage } from "react-icons/fa";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export default function AdminBrandsPage() {
  const { user } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [newBrandName, setNewBrandName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!user || user.role !== "admin") return; 
      try {
        const docRef = doc(db, "settings", "brands");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setBrands(snap.data().brandList || []);
        }
      } catch (error) {
        console.error("Failed to fetch brands", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [user]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName || !logoFile) return alert("Please provide a name and a logo.");
    
    setUploading(true);
    try {
      // 1. Upload to Cloudinary
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "oweitushop_assets" }) 
      });
      const signData = await signRes.json();
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

      const formData = new FormData();
      formData.append("file", logoFile);
      formData.append("api_key", apiKey!);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", "oweitushop_assets");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST", body: formData,
      });
      const uploadData = await res.json();
      
      // 2. Save to Firestore
      const newBrand: Brand = {
        id: Date.now().toString(),
        name: newBrandName,
        logoUrl: uploadData.secure_url
      };

      const updatedBrands = [...brands, newBrand];
      await setDoc(doc(db, "settings", "brands"), { brandList: updatedBrands });

      // 3. Update UI
      setBrands(updatedBrands);
      setNewBrandName("");
      setLogoFile(null);
      setLogoPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Brand added successfully!");

    } catch (error) {
      console.error(error);
      alert("Failed to upload brand.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this brand?")) return;
    
    try {
      const updatedBrands = brands.filter(b => b.id !== id);
      await setDoc(doc(db, "settings", "brands"), { brandList: updatedBrands });
      setBrands(updatedBrands);
    } catch (error) {
      console.error(error);
      alert("Failed to delete brand.");
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-8 p-4">
      {/* HEADER */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <FaBuilding className="text-[#FF6A00]" /> Trusted Brands
        </h1>
        <p className="text-slate-600 mt-2 font-medium">Manage the partner logos that appear on the homepage marquee.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ADD NEW BRAND FORM */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FaPlus className="text-[#FF6A00]"/> Add New Brand</h3>
            <form onSubmit={handleAddBrand} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Brand Name</label>
                <input type="text" required className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-[#FF6A00]"
                  value={newBrandName} onChange={e => setNewBrandName(e.target.value)} placeholder="e.g. Samsung" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Brand Logo (Transparent PNG best)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden"
                >
                  {logoPreview ? (
                    <Image src={logoPreview} alt="Preview" fill className="object-contain p-2" />
                  ) : (
                    <div className="text-center text-slate-400">
                      <FaImage className="mx-auto text-2xl mb-1" />
                      <span className="text-xs font-bold">Click to upload</span>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
              </div>

              <button disabled={uploading} type="submit" className="w-full bg-[#FF6A00] text-white font-bold py-3 rounded-xl hover:bg-[#e65f00] transition-colors disabled:opacity-50">
                {uploading ? "Uploading..." : "Save Brand"}
              </button>
            </form>
          </div>
        </div>

        {/* BRANDS TABLE */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="px-6 py-4">Logo</th>
                    <th className="px-6 py-4">Brand Name</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">Loading brands...</td></tr>
                  ) : brands.length === 0 ? (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">No brands added yet.</td></tr>
                  ) : (
                    brands.map((brand) => (
                      <tr key={brand.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-16 h-10 relative bg-white border border-slate-100 rounded p-1">
                            <Image src={brand.logoUrl} alt={brand.name} fill className="object-contain" />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">{brand.name}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDelete(brand.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
