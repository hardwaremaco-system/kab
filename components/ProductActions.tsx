"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/context/CartContext"; 
import { Product } from "@/types";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductActions({ product, children }: { product: Product, children?: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  // 🚀 Added cart and cartTotal to power the gamification bar
  const { addToCart, cart, cartTotal } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  // 🚀 State for our custom "Added to Cart" toast
  const [showCartToast, setShowCartToast] = useState(false);

  const botPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "256740373021";

  const currentPrice = Number(product.price) || 0;
  const isNegotiable = currentPrice === 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) { 
        setShowStickyBar(true); 
      } else { 
        setShowStickyBar(false); 
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (isNegotiable) {
      alert("This item's price is negotiable. Please use WhatsApp to contact the seller.");
      return;
    }

    addToCart({
      id: product.id,
      title: product.name || "Unknown Item", 
      price: currentPrice, 
      image: product.images?.[0] || "",
      quantity: quantity,
      sellerId: product.sellerId || "SYSTEM", 
      sellerPhone: product.sellerPhone || ""
    });

    // 🚀 Trigger the custom toast instead of the browser alert
    setShowCartToast(true);
    
    // Auto-hide the toast after 4 seconds
    setTimeout(() => {
      setShowCartToast(false);
    }, 4000);
  };

  // ==========================================
  // 🧠 MINI PROGRESS BAR LOGIC
  // ==========================================
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let progress = 25;
  let toastMessage = "Add 1 more item and save UGX 1,000 on delivery.";
  let isFree = false;

  if (cartTotal >= 20000 || totalItems >= 4) {
    progress = 100;
    toastMessage = "🎉 You have FREE delivery!";
    isFree = true;
  } else if (totalItems === 3) {
    progress = 75;
    toastMessage = "Add 1 more item to unlock FREE delivery.";
  } else if (totalItems === 2) {
    progress = 50;
    toastMessage = "Add 1 more item and save another UGX 500.";
  }

  const handleBotInquiry = async () => {
    setLoadingWhatsApp(true);
    try {
      const getCookie = (name: string) => {
        if (typeof document === "undefined") return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };
      const referralCode = getCookie("kabale_ref");

      const res = await fetch("/api/orders/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId: product.id,
          productName: product.name, 
          sellerId: product.sellerId,
          sellerPhone: product.sellerPhone,
          price: currentPrice,
          referralCodeUsed: referralCode || null 
        }),
      });

      let referenceCode = product.id; 
      if (res.ok) {
        const data = await res.json();
        referenceCode = data.leadId; 
      }

      const priceText = isNegotiable ? "Price: Negotiable" : `Price: UGX ${currentPrice.toLocaleString()}`;
      const rawMessage = `Hi! I want to order or ask about this item on Kabale Online:\n\n*${product.name}*\n${priceText}\n\nRef: [${referenceCode}]`;
      const encodedMessage = encodeURIComponent(rawMessage);

      window.open(`https://wa.me/${botPhoneNumber}?text=${encodedMessage}`, "_blank");
    } catch (error) {
      const rawMessage = `Hi! I want to ask about: *${product.name}*\n\nProduct ID: [${product.id}]`;
      window.open(`https://wa.me/${botPhoneNumber}?text=${encodeURIComponent(rawMessage)}`, "_blank");
    } finally {
      setLoadingWhatsApp(false);
      setShowWhatsAppPopup(false); 
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/product/${product.publicId || product.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAdminDelete = async () => {
    if (!user || user.role !== "admin") return;
    if (!window.confirm("ADMIN ACTION: Permanently delete this product?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product.id}?isAdmin=true&adminId=${user.id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Product removed.");
        router.push("/");
      } else {
        alert("Failed to delete.");
        setLoading(false);
      }
    } catch (error) {
      alert("Database error.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {!isNegotiable ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-300 rounded-md overflow-hidden h-12 bg-white shadow-sm">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full text-lg font-bold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors">-</button>
              <span className="px-4 font-semibold text-lg border-x border-slate-300 h-full flex items-center justify-center min-w-[45px] text-slate-800 bg-slate-50">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full text-lg font-bold text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-md text-sm uppercase tracking-wider shadow-sm transition-all active:scale-[0.98]">
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="bg-orange-50 border border-[#FF6A00]/30 rounded-md p-3 flex items-start gap-2 animate-in fade-in">
            <span className="text-lg">🤝</span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              The price for this item is <strong className="text-[#FF6A00]">Negotiable</strong>. "Add to Cart" is disabled. Please contact the seller via WhatsApp to agree on a price.
            </p>
          </div>
        )}

        <button onClick={() => setShowWhatsAppPopup(true)} className={`w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-md shadow-sm transition-all flex items-center justify-center gap-2 text-[15px] ${isNegotiable ? 'animate-pulse' : ''}`}>
          <FaWhatsapp className="text-xl" /> 
          {isNegotiable ? "Negotiate on WhatsApp" : "Order Using WhatsApp"}
        </button>

        <div className="mt-1">
          <button onClick={() => setShowMore(!showMore)} className="text-xs font-bold text-slate-500 flex items-center gap-1 py-2 px-1 hover:text-slate-700 transition-colors">
            {showMore ? "− Hide options" : "+ More options"}
          </button>
          {showMore && (
            <div className="mt-2 bg-slate-50 rounded-lg p-3 flex flex-col gap-2 border border-slate-100">
              <button onClick={handleCopyLink} disabled={loading} className="w-full bg-white text-slate-700 border border-slate-200 py-2.5 rounded-lg font-bold text-xs flex justify-center gap-2 shadow-sm hover:bg-slate-100 transition-colors">
                {copied ? "✅ Link Copied!" : "🔗 Copy Link"}
              </button>
              {children}
              {user?.role === "admin" && (
                <button onClick={handleAdminDelete} disabled={loading} className="w-full bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-lg font-bold text-xs flex justify-center mt-1 hover:bg-red-100 transition-colors">
                  🗑️ Admin Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out flex items-center gap-3 ${showStickyBar ? 'translate-y-0' : 'translate-y-[150%]'}`}>
        <div className="flex flex-col flex-grow min-w-0 px-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">{product.name}</span>
          <span className={`text-sm font-black truncate ${isNegotiable ? 'text-[#FF6A00]' : 'text-slate-800'}`}>
            {isNegotiable ? "Negotiable" : `UGX ${currentPrice.toLocaleString()}`}
          </span>
        </div>
        <button onClick={() => setShowWhatsAppPopup(true)} className="bg-[#25D366] text-white px-5 py-3 rounded-md font-bold text-xs shadow-sm whitespace-nowrap flex items-center gap-2 active:scale-95 transition-transform">
          <FaWhatsapp className="text-sm" />
          {isNegotiable ? "Negotiate" : "Order Now"}
        </button>
      </div>

      {/* ========================================== */}
      {/* 🚀 CUSTOM "ADDED TO CART" GAMIFIED TOAST */}
      {/* ========================================== */}
      {showCartToast && (
        <div className="fixed top-4 left-0 right-0 z-[9999] px-4 flex justify-center animate-in slide-in-from-top-5 duration-300">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-full max-w-sm">
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-[#25D366] text-xs font-bold">✓</div>
                <p className="font-bold text-slate-800 text-sm">Added to cart successfully</p>
              </div>
              <button onClick={() => setShowCartToast(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="mt-3 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className={`text-xs font-bold mb-2 ${isFree ? 'text-[#25D366]' : 'text-slate-600'}`}>
                {toastMessage}
              </p>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${isFree ? 'bg-[#25D366]' : 'bg-[#D97706]'}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <button 
              onClick={() => router.push('/cart')} 
              className="w-full py-3 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition-colors"
            >
              View Cart & Checkout
            </button>
            
          </div>
        </div>
      )}

      {/* WHATSAPP INTERCEPTION POPUP */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-6 md:p-8">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5 mx-auto border border-green-100"><FaWhatsapp className="text-3xl text-[#25D366]" /></div>
              <h3 className="text-xl font-black text-slate-900 text-center mb-2 tracking-tight">Complete Your Order</h3>
              <p className="text-[13px] text-slate-500 text-center mb-6 leading-relaxed">
                When WhatsApp opens, tap <strong className="text-slate-800">SEND</strong> (looks like 
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366] border border-green-600 align-sub ml-1 shadow-inner">
                  <svg className="w-3 h-3 text-black ml-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </span>
                on mobile) to send the pre-filled message and confirm your order instantly.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100">
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><span className="w-5 h-5 rounded-full bg-green-100 text-[#25D366] flex items-center justify-center text-[10px]">✓</span> Fast confirmation</li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><span className="w-5 h-5 rounded-full bg-green-100 text-[#25D366] flex items-center justify-center text-[10px]">✓</span> Quick delivery</li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><span className="w-5 h-5 rounded-full bg-green-100 text-[#25D366] flex items-center justify-center text-[10px]">✓</span> Trusted support</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={handleBotInquiry} disabled={loadingWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-[15px] disabled:opacity-70 active:scale-[0.98]">
                  {loadingWhatsApp ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Connecting...</span> : <>Continue to WhatsApp</>}
                </button>
                <button onClick={() => setShowWhatsAppPopup(false)} disabled={loadingWhatsApp} className="w-full py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
