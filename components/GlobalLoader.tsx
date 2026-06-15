"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GlobalLoader() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Hide the loader when the new URL finishes loading
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  // 2. Intercept clicks on internal links to show the loader instantly
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (
        href &&
        href.startsWith("/") &&
        anchor.target !== "_blank" &&
        href !== pathname
      ) {
        setIsNavigating(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    // Completely transparent background
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent pointer-events-none transition-opacity duration-300">

      {/* Custom Keyframe Animation for Orbital Spin & Pulse */}
      <style>{`
        @keyframes orbitalSpin {
          0% { 
            transform: scale(0.8) rotate(0deg); 
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.15) rotate(180deg); 
            opacity: 1;
          }
          100% { 
            transform: scale(0.8) rotate(360deg); 
            opacity: 0.7;
          }
        }
        .animate-orbital-spin {
          /* ease-in-out smooths out the speed transition so it breathes naturally */
          animation: orbitalSpin 1.8s infinite ease-in-out;
        }
      `}</style>

      {/* The 3 Chained Ovals SVG */}
      <svg 
        className="animate-orbital-spin w-16 h-16 text-[#FF6A00] drop-shadow-md" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Oval 1 */}
        <ellipse 
          cx="50" cy="50" rx="42" ry="14" 
          stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          transform="rotate(30 50 50)" 
        />
        {/* Oval 2 */}
        <ellipse 
          cx="50" cy="50" rx="42" ry="14" 
          stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          transform="rotate(90 50 50)" 
        />
        {/* Oval 3 */}
        <ellipse 
          cx="50" cy="50" rx="42" ry="14" 
          stroke="currentColor" strokeWidth="6" strokeLinecap="round"
          transform="rotate(150 50 50)" 
        />
      </svg>

    </div>
  );
}
