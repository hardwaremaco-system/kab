"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/context/CartContext"; 
import SearchBar from "@/components/SearchBar";
import AuthModal from "@/components/AuthModal";
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaXTwitter, 
  FaInstagram,
  FaTiktok 
} from "react-icons/fa6";

import { 
  Watch, 
  Smartphone, 
  Speaker, 
  Headphones, 
  Plug, 
  Package,
  Store,
  ShoppingBasket,
  Shirt,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const { cartCount } = useCart(); 

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // ==============================================
  // ROLE & COOKIE LOGIC 
  // ==============================================
  // Using "as string" to prevent strict type errors if types.ts is still caching
  const isStaff = user?.role === "admin" || (user?.role as string) === "editor";

  useEffect(() => {
    if (isStaff) {
      document.cookie = "oweitushop_staff_session=true; path=/; max-age=86400; secure; samesite=strict";
    } else {
      document.cookie = "oweitushop_staff_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, [isStaff]);

  // Lock body scroll AND broadcast state
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      window.dispatchEvent(new CustomEvent("mobileMenuState", { detail: isMobileMenuOpen }));
    }
    return () => { 
      if (typeof window !== "undefined") {
        document.body.style.overflow = 'unset'; 
        window.dispatchEvent(new CustomEvent("mobileMenuState", { detail: false }));
      }
    };
  }, [isMobileMenuOpen]);

  // Scroll listener to collapse/expand mobile header
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }
      setIsScrolledDown(scrollY > lastScrollY && scrollY > 100);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null; 

  const isActive = (path: string) => pathname === path;
  const closeMenu = () => setIsMobileMenuOpen(false);

  const ChevronRight = () => (
    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
  );

  const dailyCategories = [
    { label: "Supermarket", href: "/category/supermarket", Icon: ShoppingBasket },
    { label: "Fashion & Shoes", href: "/category/fashion", Icon: Shirt },
    { label: "Health & Beauty", href: "/category/beauty", Icon: Sparkles },
  ];

  const electronicCategories = [
    { label: "Phones & TVs", href: "/category/phones-tvs", Icon: Smartphone },
    { label: "Sound Systems", href: "/category/sound-systems", Icon: Speaker },
    { label: "Appliances", href: "/category/appliances", Icon: Plug },
    { label: "Accessories", href: "/category/accessories", Icon: Headphones },
    { label: "Watches", href: "/category/watches", Icon: Watch },
    { label: "View All Products", href: "/products", Icon: Package }
  ];

  const CartIcon = ({ badgeSize = "text-[9px]" }) => (
    <Link href="/cart" className="relative p-1 text-slate-700 hover:text-[#FF6A00] transition-colors flex-shrink-0">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {cartCount > 0 && (
        <span className={`absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-600 text-white ${badgeSize} font-bold px-1.5 py-0.5 rounded-full border-2 border-white`}>
          {cartCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      <nav className="fixed w-full top-0 bg-white border-b-[3px] border-[#FF6A00] z-40 transition-all shadow-sm">
        {/* === DESKTOP VIEW === */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center h-16 gap-4 xl:gap-6">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black text-slate-900 tracking-tight">
              Oweitu<span className="text-[#FF6A00]">Shop</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl w-full">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4 xl:space-x-6">
            
            {/* 🔥 NEW: Official Store Link */}
            <Link href="/officialStore" className={`flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide transition-colors ${isActive('/officialStore') ? 'text-[#FF6A00]' : 'text-slate-600 hover:text-[#FF6A00]'}`}>
              <Store className="w-4 h-4" /> Official Store
            </Link>

            <Link href="/category/phones-tvs" className={`text-sm font-bold uppercase tracking-wide transition-colors hidden xl:block ${isActive('/category/phones-tvs') ? 'text-[#FF6A00]' : 'text-slate-600 hover:text-[#FF6A00]'}`}>Phones & TVs</Link>

            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors text-slate-700 hover:text-[#FF6A00] hover:bg-slate-50 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                <span className="text-sm font-bold uppercase tracking-wide">Categories</span>
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="px-5 pb-2 border-b border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Buy Again & Again</p>
                  {dailyCategories.map(cat => (
                    <Link key={cat.label} href={cat.href} className="block py-1.5 text-[14px] font-medium text-slate-700 hover:text-[#FF6A00]">{cat.label}</Link>
                  ))}
                </div>
                <div className="px-5 pt-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Step-Up Electronics</p>
                  {electronicCategories.map(cat => (
                    <Link key={cat.label} href={cat.href} className="block py-1.5 text-[14px] font-medium text-slate-700 hover:text-[#FF6A00]">{cat.label}</Link>
                  ))}
                </div>
              </div>
            </div>

            <CartIcon badgeSize="text-[10px]" />

            {/* 🔥 NEW: Admin Access Button */}
            {isStaff && (
              <Link href="/admin" className="flex items-center bg-slate-900 text-white px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide hover:bg-slate-800 transition-colors shadow-sm">
                Admin
              </Link>
            )}

            <Link href="/sell" className="flex items-center gap-2 bg-[#FF6A00] text-white px-5 py-2.5 rounded-md text-sm font-bold uppercase tracking-wide hover:bg-[#e65c00] transition-colors shadow-sm">
              Sell Now
            </Link>

            {loading ? (
              <div className="h-6 w-6 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin ml-2"></div>
            ) : user ? (
              <div className="flex items-center gap-3 relative group ml-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm cursor-pointer overflow-hidden">
                     {user.photoURL ? <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" /> : (user.displayName || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs text-slate-500 font-medium">Logged in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || "User"}</p>
                    </div>
                    {isStaff && (
                      <Link href="/admin" className="block px-4 py-2 text-sm font-bold text-[#FF6A00] bg-orange-50 hover:bg-orange-100 transition-colors">Admin Dashboard</Link>
                    )}
                    <Link href="/profile" className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#FF6A00]">My Profile</Link>
                    <Link href="/sell" className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#FF6A00]">My Listings</Link>
                    <Link href="/invite" className="block px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#FF6A00]">Partner Dashboard</Link>
                    <button onClick={signOut} className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="text-sm font-bold uppercase tracking-wide text-slate-700 hover:text-[#FF6A00] transition-colors ml-2">
                Login
              </button>
            )}
          </div>
        </div>

        {/* === MOBILE VIEW === */}
        <div className="lg:hidden flex flex-col w-full bg-white transition-all duration-300">
          <div className={`flex items-center justify-between px-4 transition-all duration-300 overflow-hidden transform origin-top ${isScrolledDown ? "h-0 opacity-0 m-0" : "h-14 opacity-100"}`}>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-900 focus:outline-none" aria-label="Open menu">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <Link href="/" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Oweitu<span className="text-[#FF6A00]">Shop</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-slate-800">
              <CartIcon />
              {user ? (
                <Link href="/profile" aria-label="Profile">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </Link>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} aria-label="Login">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </button>
              )}
              {/* 🔥 FIXED MOBILE QUICK HEADER WHATSAPP LINK */}
              <a href="https://wa.me/256779094664" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp to Order" className="relative text-[#25D366] hover:text-[#1EBE57] transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className={`px-3 w-full flex items-center gap-2 transition-all duration-300 ${isScrolledDown ? "py-2.5 shadow-sm" : "pb-3 pt-0"}`}>
            <div className="flex-1 w-full transition-all duration-300">
              <SearchBar />
            </div>
            <div className={`flex items-center justify-center transition-all duration-300 overflow-hidden ${isScrolledDown ? "w-10 opacity-100 scale-100 ml-1" : "w-0 opacity-0 scale-50 m-0"}`}>
               <CartIcon />
            </div>
          </div>
        </div>
      </nav>

      {/* ============================================== */}
      {/* MOBILE MENU DRAWER                           */}
      {/* ============================================== */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] xl:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      <div 
        className={`fixed top-0 left-0 h-[100dvh] w-[85vw] max-w-sm bg-white z-[100] xl:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100 bg-white">
          <button onClick={closeMenu} className="mr-4 text-slate-900 focus:outline-none" aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <Link href="/" onClick={closeMenu} className="text-xl font-black text-slate-900 tracking-tight flex-1">
            Oweitu<span className="text-[#FF6A00]">Shop</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto bg-white flex flex-col">

          {/* 🔥 NEW: Official Store Highlight Block */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <Link 
              href="/officialStore" 
              onClick={closeMenu} 
              className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-4 rounded-xl text-orange-600 hover:bg-orange-100 transition-colors shadow-sm"
            >
              <Store className="w-6 h-6 text-[#FF6A00]" />
              <div className="flex flex-col">
                <span className="font-bold text-[15px] text-slate-900">Official Store</span>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">Verified Products</span>
              </div>
            </Link>
          </div>

          {/* GROUP 1: DAILY ESSENTIALS */}
          <div className="border-b border-slate-100 py-2">
            <div className="px-5 py-2 mb-1">
              <span className="text-[13px] font-black text-slate-900 tracking-wide uppercase">Buy Again & Again</span>
            </div>
            <div className="flex flex-col">
              {dailyCategories.map(({ label, href, Icon }) => (
                <Link 
                  key={label}
                  href={href} 
                  onClick={closeMenu} 
                  className={`flex items-center px-5 py-3.5 transition-colors ${isActive(href) ? 'text-[#FF6A00] bg-orange-50/50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className={`w-6 h-6 mr-4 ${isActive(href) ? 'text-[#FF6A00]' : 'text-slate-400'}`} />
                  <span className="text-[15px] font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* GROUP 2: ELECTRONICS */}
          <div className="border-b border-slate-100 py-2">
            <div className="px-5 py-2 mb-1">
              <span className="text-[13px] font-black text-slate-900 tracking-wide uppercase">Step-Up Electronics</span>
            </div>
            <div className="flex flex-col">
              {electronicCategories.map(({ label, href, Icon }) => (
                <Link 
                  key={label}
                  href={href} 
                  onClick={closeMenu} 
                  className={`flex items-center px-5 py-3.5 transition-colors ${isActive(href) ? 'text-[#FF6A00] bg-orange-50/50 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className={`w-6 h-6 mr-4 ${isActive(href) ? 'text-[#FF6A00]' : 'text-slate-400'}`} />
                  <span className="text-[15px] font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ACTION LINKS: ACCOUNT & HELP */}
          <div className="py-4">
            {loading ? null : user ? (
              <>
                {/* 🔥 NEW: Admin Dashboard Mobile Link */}
                {isStaff && (
                  <Link 
                    href="/admin" 
                    onClick={closeMenu} 
                    className="flex justify-between items-center px-5 py-4 mb-2 mx-2 bg-slate-900 text-white rounded-xl shadow-md transition-colors hover:bg-slate-800"
                  >
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold">Admin Dashboard</span>
                      <span className="text-[11px] text-slate-300 font-medium uppercase tracking-widest">Command Center</span>
                    </div>
                    <ChevronRight />
                  </Link>
                )}

                <Link 
                  href="/profile" 
                  onClick={closeMenu} 
                  className="flex justify-between items-center px-5 py-4 mb-1 mx-2 bg-slate-50 rounded-xl hover:bg-orange-50 group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-slate-900 group-hover:text-[#FF6A00]">Go to my account</span>
                    <span className="text-[12px] text-slate-500 font-medium">Orders, selling & dashboard</span>
                  </div>
                  <ChevronRight />
                </Link>
              </>
            ) : (
              <button 
                onClick={() => { setIsAuthModalOpen(true); closeMenu(); }} 
                className="w-[calc(100%-20px)] mx-auto flex justify-between items-center px-5 py-4 mb-1 bg-[#FF6A00]/10 text-[#FF6A00] rounded-xl hover:bg-[#FF6A00]/20 transition-colors"
              >
                <span className="text-[15px] font-bold">Login / Sign Up</span>
                <ChevronRight />
              </button>
            )}

            <Link 
              href="/guide" 
              onClick={closeMenu} 
              className="flex justify-between items-center px-5 py-4 mx-2 mt-1 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <span className="text-[15px] font-bold text-slate-900">Need Help?</span>
              <ChevronRight />
            </Link>
          </div>

          {/* FOOTER: SOCIALS & LOGOUT */}
          <div className="mt-auto bg-slate-50 border-t border-slate-100 p-5">
            <div className="flex justify-center gap-3 mb-6">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/256779094664" }, // 🔥 FIXED DRAWER FOOTER WHATSAPP LINK
                { icon: FaFacebookF, href: "https://www.facebook.com/" }, 
                { icon: FaInstagram, href: "https://instagram.com/" },
                { icon: FaXTwitter, href: "https://x.com/" },
                { icon: FaTiktok, href: "https://tiktok.com/" },
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white border border-slate-200 text-slate-400 flex items-center justify-center rounded-full transition-colors hover:text-[#FF6A00] hover:border-[#FF6A00]">
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            {user && (
              <button onClick={() => { signOut(); closeMenu(); }} className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded text-[15px] font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors">
                Logout
              </button>
            )}
          </div>

        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
