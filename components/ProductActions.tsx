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
  
  const { addToCart, cart, cartTotal } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const [showCartToast, setShowCartToast] = useState(false);

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

    setShowCartToast(true);

    setTimeout(() => {
      setShowCartToast(false);
    }, 4000);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let progress = 25;
  let toastMessage = "Add 1 more item and save UGX 500 on delivery.";
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
    toastMessage = "Add 1 more item and save UGX 500 on delivery.";
  }

  // ==========================================
  // 🚀 DIRECT WHATSAPP CHAT WITH SELLER
  // ==========================================
  const handleDirectWhatsApp = () => {
    if (!product.sellerPhone) {
      alert("Seller phone number is not available for this product.");
      return;
    }

    // Format phone number for wa.me link (replace leading 0 with 256 for Uganda)
    let formattedPhone = product.sellerPhone.replace(/\D/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "256" + formattedPhone.substring(1);
    }

    const priceText = isNegotiable ? "Price: Negotiable" : `Price: UGX ${currentPrice.toLocaleString()}`;
    const productUrl = `${window.location.origin}/product/${product.publicId || product.id}`;
    
    const rawMessage = `Hi! I saw your item on Oweitu Shop and I'm interested in ordering/asking about it:\n\n*${product.name}*\n${priceText}\n\nLink: ${productUrl}`;
    const encodedMessage = encodeURIComponent(rawMessage);

    window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, "_blank");
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

        {/* Trigger direct open window directly instead of the popup state */}
        <button onClick={handleDirectWhatsApp} className={`w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-md shadow-sm transition-all flex items-center justify-center gap-2 text-[15px] ${isNegotiable ? 'animate-pulse' : ''}`}>
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

      {/* Sticky Mobile Bar at bottom */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out flex items-center gap-3 ${showStickyBar ? 'translate-y-0' : 'translate-y-[150%]'}`}>
        <div className="flex flex-col flex-grow min-w-0 px-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">{product.name}</span>
          <span className={`text-sm font-black truncate ${isNegotiable ? 'text-[#FF6A00]' : 'text-slate-800'}`}>
            {isNegotiable ? "Negotiable" : `UGX ${currentPrice.toLocaleString()}`}
          </span>
        </div>
        <button onClick={handleDirectWhatsApp} className="bg-[#25D366] text-white px-5 py-3 rounded-md font-bold text-xs shadow-sm whitespace-nowrap flex items-center gap-2 active:scale-95 transition-transform">
          <FaWhatsapp className="text-sm" />
          {isNegotiable ? "Negotiate" : "Order Now"}
        </button>
      </div>

      {/* ========================================== */}
      {/* 🚀 CENTERED GAMIFIED TOAST MODAL           */}
      {/* ========================================== */}
      {showCartToast && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 md:p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">

            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#25D366] text-sm font-bold">✓</div>
                <p className="font-black text-slate-900 text-lg">Added to Cart!</p>
              </div>
              <button onClick={() => setShowCartToast(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-2 transition-colors">
                ✕
              </button>
            </div>

            <div className="mb-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className={`text-sm font-bold mb-3 ${isFree ? 'text-[#25D366]' : 'text-slate-700'}`}>
                {toastMessage}
              </p>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${isFree ? 'bg-[#25D366]' : 'bg-[#D97706]'}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <button 
              onClick={() => router.push('/cart')} 
              className="w-full py-3.5 bg-[#D97706] text-white rounded-xl text-[15px] font-bold shadow-md hover:bg-amber-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              View Cart & Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
