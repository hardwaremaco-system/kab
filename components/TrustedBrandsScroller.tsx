"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export default function TrustedBrandsScroller() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const docRef = doc(db, "settings", "brands");
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().brandList?.length > 0) {
          setBrands(snap.data().brandList);
        }
      } catch (error) {
        console.error("Failed to load brands", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading || brands.length === 0) return null;

  // Duplicate the array so the infinite scroll animation is perfectly seamless
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-white dark:bg-[#151515] rounded-none md:rounded-xl border-y md:border border-slate-200 dark:border-slate-800 py-6 overflow-hidden mb-4 sm:mb-6 shadow-sm">
      <div className="text-center mb-5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Trusted Official Brands
        </h3>
      </div>
      
      {/* The scrolling container */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-[#151515] to-transparent z-10 pointer-events-none"></div>
        
        {/* The Animated Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedBrands.map((brand, idx) => (
            <div 
              key={`${brand.id}-${idx}`} 
              className="w-24 md:w-32 h-12 md:h-16 mx-6 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
            >
              <Image 
                src={brand.logoUrl} 
                alt={brand.name} 
                fill 
                className="object-contain" 
              />
            </div>
          ))}
        </div>

        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-[#151515] to-transparent z-10 pointer-events-none"></div>
      
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
