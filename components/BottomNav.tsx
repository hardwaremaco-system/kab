"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/context/CartContext";
import { 
  Home, 
  LayoutGrid, 
  ShoppingCart, 
  User, 
  ShieldAlert, 
  Watch, 
  Smartphone, 
  Speaker, 
  Headphones, 
  Plug, 
  Package
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth(); 
  const { cartCount } = useCart();

  // ALL HOOKS MUST RUN FIRST
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  // 1. Admin Session Cookie Management
  useEffect(() => {
    if (isAdmin) {
      document.cookie = "kabale_admin_session=true; path=/; max-age=86400; secure; samesite=strict";
    } else {
      document.cookie = "kabale_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, [isAdmin]);

  // 2. Handle Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 3. Mobile Menu Listener
  useEffect(() => {
    const handleMenuState = (e: any) => setIsMenuOpen(e.detail);
    window.addEventListener("mobileMenuState", handleMenuState);
    return () => window.removeEventListener("mobileMenuState", handleMenuState);
  }, []);

  // 4. Navigation Items
  const baseNavItems = [
    { label: "Home", href: "/", Icon: Home },
    { label: "Categories", isTrigger: true, Icon: LayoutGrid }, 
    { label: "Cart", href: "/cart", Icon: ShoppingCart },
    { label: "Profile", href: "/profile", Icon: User },
  ];

  const navItems = isAdmin
    ? [...baseNavItems, { label: "Admin", href: "/admin", Icon: ShieldAlert }]
    : baseNavItems;

  const categoryLinks = [
    { label: "Watches", href: "/category/watches", Icon: Watch },
    { label: "Phones & TVs", href: "/category/phones-tvs", Icon: Smartphone },
    { label: "Sound Systems", href: "/category/sound-systems", Icon: Speaker },
    { label: "Accessories", href: "/category/accessories", Icon: Headphones },
    { label: "Appliances", href: "/category/appliances", Icon: Plug },
    { label: "Other Products", href: "/category/other-products", Icon: Package }
  ];

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/product/")) {
    return null;
  }

  return (
    <>
      {/* FLOATING PILL BOTTOM NAVIGATION BAR */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-max bg-[#f4f4f5] dark:bg-[#1a1a1a] p-2 rounded-full z-50 transition-transform duration-300 xl:hidden shadow-lg border border-white/50 dark:border-white/10 ${
          isVisible && !isMenuOpen ? "translate-y-0" : "translate-y-[200%]"
        }`}
      >
        <div className="flex items-center gap-2">
          {navItems.map(({ label, href, isTrigger, Icon }) => {
            const isActive = !isTrigger && (pathname === href || (href !== "/" && pathname?.startsWith(href || "")));

            const content = (
              <div 
                className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
                  isActive 
                    ? "bg-white dark:bg-black px-5 py-3 rounded-full shadow-sm" 
                    : "px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
                }`}
              >
                {/* SVG Icon */}
                <div className="relative flex items-center justify-center">
                  <Icon 
                    size={24} 
                    strokeWidth={isActive ? 2.5 : 2} 
                    className={`transition-colors duration-300 ${
                      isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`} 
                  />

                  {/* Cart Badge */}
                  {label === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#f4f4f5] dark:border-[#1a1a1a] shadow-sm leading-none z-10">
                      {cartCount}
                    </span>
                  )}
                </div>

                {/* Text Label - Visually matches the image by only showing when active */}
                {isActive && (
                  <span className="text-sm font-semibold text-black dark:text-white whitespace-nowrap">
                    {label}
                  </span>
                )}
              </div>
            );

            const itemClassName = "focus:outline-none tap-highlight-transparent";

            if (isTrigger) {
              return (
                <button key={label} onClick={() => setIsCategoryModalOpen(true)} className={itemClassName}>
                  {content}
                </button>
              );
            }

            if (label === "Admin") {
              return (
                <a key={label} href={href} className={itemClassName}>
                  {content}
                </a>
              );
            }

            return (
              <Link key={label} href={href || "#"} className={itemClassName}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* CATEGORIES SLIDE-UP MODAL (Remains unchanged) */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-[#1a1a1a] w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl p-6 text-white animate-slide-up border border-slate-800 shadow-2xl">

            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6"></div>

            {/* Title */}
            <h3 className="text-center text-xl font-bold mb-6 tracking-wide">Categories</h3>

            {/* Categories List */}
            <div className="flex flex-col gap-2 text-lg font-medium">
              {categoryLinks.map(({ label, href, Icon }) => (
                <Link 
                  key={label}
                  href={href} 
                  onClick={() => setIsCategoryModalOpen(false)} 
                  className="flex items-center gap-4 hover:text-[#FF6A00] transition-colors py-3 px-2 rounded-lg hover:bg-slate-800/50"
                >
                  <Icon className="text-slate-400" size={20} />
                  {label}
                </Link>
              ))}
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsCategoryModalOpen(false)} 
              className="mt-8 w-full py-3.5 bg-slate-800 rounded-xl font-bold hover:bg-slate-700 active:scale-[0.98] transition-all text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}