"use client";

import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash, FaArrowLeft, FaWhatsapp, FaPlus, FaShieldAlt } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();
  const router = useRouter();

  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  const [upsellItems, setUpsellItems] = useState<any[]>([]);
  const [loadingUpsells, setLoadingUpsells] = useState(true);

  const botPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "256740373021";

  // ==========================================
  // 1. FETCH REAL UPSELL ITEMS
  // ==========================================
  useEffect(() => {
    async function fetchUpsells() {
      try {
        const res = await fetch("/api/products/upsells");
        if (res.ok) {
          const data = await res.json();
          const cartIds = new Set(cart.map(item => item.id));
          setUpsellItems(data.items.filter((item: any) => !cartIds.has(item.id)));
        }
      } catch (error) {
        console.error("Failed to load upsells", error);
      } finally {
        setLoadingUpsells(false);
      }
    }
    fetchUpsells();
  }, [cart]);

  // ==========================================
  // 2. LOGIC: GAMIFICATION & DISCOUNTS
  // ==========================================
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { deliveryFee, progress, message, isFreeDelivery } = useMemo(() => {
    // Rule 1: High value orders (UGX 20k+) get free delivery instantly
    if (cartTotal >= 20000) {
      return { deliveryFee: 0, progress: 100, message: "Your order qualifies for FREE delivery!", isFreeDelivery: true };
    }
    // Rule 2: Item count scaling (1=2000, 2=1000, 3=500, 4+=FREE)
    if (totalItems >= 4) {
      return { deliveryFee: 0, progress: 100, message: "🎉 FREE DELIVERY UNLOCKED!", isFreeDelivery: true };
    }
    if (totalItems === 3) {
      return { deliveryFee: 500, progress: 75, message: "Add 1 more item to unlock FREE delivery.", isFreeDelivery: false };
    }
    if (totalItems === 2) {
      return { deliveryFee: 1000, progress: 50, message: "Add 1 more item and save another UGX 500 on delivery.", isFreeDelivery: false };
    }
    // Default: 1 item
    return { deliveryFee: 2000, progress: 25, message: "Add 1 more item and save UGX 1,000 on delivery.", isFreeDelivery: false };
  }, [cartTotal, totalItems]);

  const finalTotal = cartTotal + deliveryFee;

  // ==========================================
  // 3. WHATSAPP CHECKOUT
  // ==========================================
  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    setShowWhatsAppPopup(true);
  };

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

      const payloadCartItems = cart.map(item => ({
        productId: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        sellerId: (item as any).sellerId || "SYSTEM", 
        sellerPhone: (item as any).sellerPhone || ""
      }));

      const res = await fetch("/api/orders/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          cartItems: payloadCartItems,
          referralCodeUsed: referralCode || null 
        }),
      });

      let referenceCode = "CART-ORDER"; 
      if (res.ok) {
        const data = await res.json();
        referenceCode = data.leadId; 
      }

      const itemsList = cart.map(item => `${item.quantity}x ${item.title}`).join("\n");
      const deliveryText = isFreeDelivery ? "FREE" : `UGX ${deliveryFee.toLocaleString()}`;
      
      const rawMessage = `Hi! I want to order the following items on Kabale Online:\n\n${itemsList}\n\n*Subtotal: UGX ${cartTotal.toLocaleString()}*\n*Delivery: ${deliveryText}*\n*Grand Total: UGX ${finalTotal.toLocaleString()}*\n\nRef: [${referenceCode}]`;
      const encodedMessage = encodeURIComponent(rawMessage);

      window.open(`https://wa.me/${botPhoneNumber}?text=${encodedMessage}`, "_blank");
    } catch (error) {
      const rawMessage = `Hi! I want to order my cart items.\n\nTotal: UGX ${finalTotal.toLocaleString()}`;
      window.open(`https://wa.me/${botPhoneNumber}?text=${encodeURIComponent(rawMessage)}`, "_blank");
    } finally {
      setLoadingWhatsApp(false);
      setShowWhatsAppPopup(false); 
    }
  };

  const handleQuickAdd = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      sellerId: item.sellerId,
      sellerPhone: item.sellerPhone
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-6 text-center">Looks like you haven't added anything yet.</p>
        <Link href="/" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-8 rounded-lg transition-colors">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-8 bg-white min-h-screen relative overflow-x-hidden box-border">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Shopping Cart</h1>
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-[#25D366] flex items-center gap-2">
          <FaArrowLeft className="hidden sm:block" /> Continue
        </Link>
      </div>

      {/* ========================================== */}
      {/* 🚀 THE GAMIFICATION BAR */}
      {/* ========================================== */}
      <div className={`mb-6 md:mb-8 p-4 rounded-2xl border transition-all w-full max-w-full overflow-hidden box-border ${isFreeDelivery ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-end mb-3 w-full">
          <p className={`font-bold text-[13px] md:text-base leading-snug w-full sm:w-auto ${isFreeDelivery ? 'text-green-700' : 'text-slate-700'}`}>
            {isFreeDelivery ? "✨ " : "🚚 "}{message}
          </p>
          <span className={`inline-block shrink-0 text-[10px] md:text-xs font-black px-2 py-1 bg-white/60 rounded-md whitespace-nowrap ${isFreeDelivery ? 'text-green-600' : 'text-slate-500'}`}>
            {totalItems >= 4 || cartTotal >= 20000 ? "UNLOCKED" : `${totalItems}/4 ITEMS`}
          </span>
        </div>
        
        <div className="relative h-2 md:h-2.5 w-full max-w-full bg-slate-200 rounded-full overflow-hidden mb-4 isolate">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full ${isFreeDelivery ? 'bg-[#25D366]' : 'bg-[#D97706]'}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Real Quick Add Upsell */}
        {!isFreeDelivery && (
          <div className="pt-3 md:pt-4 border-t border-slate-200/60 w-full max-w-full overflow-hidden">
            <p className="text-[10px] md:text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
              Quick add to save on delivery:
            </p>
            
            {loadingUpsells ? (
              <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 w-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-shrink-0 w-[180px] h-[55px] bg-slate-100 animate-pulse rounded-lg border border-slate-200"></div>
                ))}
              </div>
            ) : upsellItems.length > 0 ? (
              <div 
                className="flex flex-nowrap gap-3 overflow-x-auto pb-2 w-full max-w-full snap-x snap-mandatory scroll-smooth hide-scrollbar"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {upsellItems.map((item) => (
                  <div key={item.id} className="flex-shrink-0 bg-white border border-slate-200 rounded-lg p-2 flex items-center gap-2.5 w-[190px] md:w-[220px] snap-start shadow-sm hover:border-[#D97706] transition-colors box-border">
                    <div className="w-10 h-10 bg-slate-50 rounded-md overflow-hidden flex items-center justify-center shrink-0 border border-slate-100">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[9px] text-slate-400">No img</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] md:text-xs font-bold text-slate-800 truncate" title={item.title}>{item.title}</p>
                      <p className="text-[#D97706] font-black text-[10px] md:text-[11px] mt-0.5">UGX {item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleQuickAdd(item)} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#D97706] hover:text-white flex items-center justify-center transition-colors text-slate-600 shrink-0">
                      <FaPlus className="text-[10px]" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">Add items from the store to save on delivery!</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-full">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-3 md:gap-4 w-full">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 border border-slate-200 rounded-xl bg-slate-50 relative w-full box-border">
              <div className="w-20 h-20 bg-white rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="max-h-full object-contain p-2" />
                ) : (
                  <span className="text-[9px] text-slate-400">No img</span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                <div className="w-full">
                  <h3 className="font-bold text-sm md:text-base text-slate-800 leading-tight truncate md:whitespace-normal md:line-clamp-2">{item.title}</h3>
                  <p className="text-slate-800 font-extrabold mt-1 text-sm md:text-base">UGX {item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border border-slate-300 rounded overflow-hidden bg-white h-7 md:h-8">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2.5 hover:bg-slate-100 font-bold text-slate-600">-</button>
                    <span className="px-2 font-semibold text-xs md:text-sm border-x border-slate-300 h-full flex items-center justify-center min-w-[28px]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2.5 hover:bg-slate-100 font-bold text-slate-600">+</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-2 transition-colors"
                title="Remove item"
              >
                <FaTrash className="text-[13px]" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full h-max sticky top-24 box-border">
          <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3">Order Summary</h2>

          <div className="flex justify-between mb-3 text-[13px] md:text-sm text-slate-600">
            <span>Subtotal ({totalItems} items)</span>
            <span className="font-semibold text-slate-800">UGX {cartTotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between mb-4 text-[13px] md:text-sm border-b border-slate-200 pb-3">
            <span className="text-slate-600">Delivery Fee</span>
            {isFreeDelivery ? (
              <span className="font-black text-[#25D366]">FREE</span>
            ) : (
              <span className="font-semibold text-slate-800">UGX {deliveryFee.toLocaleString()}</span>
            )}
          </div>

          <div className="flex justify-between mb-6 text-base md:text-lg">
            <span className="font-bold text-slate-900">Total</span>
            <span className="font-black text-slate-900">UGX {finalTotal.toLocaleString()}</span>
          </div>

          <button 
            onClick={handleCheckoutClick}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-[14px]"
          >
            <FaWhatsapp className="text-lg" /> 
            Checkout via WhatsApp
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <FaShieldAlt className="text-[#25D366]" /> 
            Secure purchase powered by Kabale Online
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 🛑 RICH WHATSAPP INTERCEPTION POPUP        */}
      {/* ========================================== */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="p-6 md:p-8">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5 mx-auto border border-green-100">
                <FaWhatsapp className="text-3xl text-[#25D366]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 text-center mb-2 tracking-tight">Complete Your Order</h3>
              <p className="text-[13px] text-slate-500 text-center mb-6 leading-relaxed">
                When WhatsApp opens, tap <strong className="text-slate-800">SEND</strong> (looks like 
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366] border border-green-600 align-sub ml-1 shadow-inner">
                  <svg className="w-3 h-3 text-black ml-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </span>
                on mobile) to send your cart details and confirm instantly.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-[#25D366] flex items-center justify-center text-[10px]">✓</span> 
                    Fast confirmation
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-[#25D366] flex items-center justify-center text-[10px]">✓</span> 
                    Quick delivery
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-[#25D366] flex items-center justify-center text-[10px]">✓</span> 
                    Trusted support
                  </li>
                </ul>
              </div>

              {/* Order Summary Mini-Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">  
                <p className="font-bold text-sm text-slate-600 leading-tight mb-2">
                  Paying for {totalItems} item{totalItems > 1 ? "s" : ""}
                </p>  
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">  
                  <span className="text-sm font-bold text-slate-500">Order Total:</span>  
                  <span className="font-black text-slate-900 text-lg">UGX {finalTotal.toLocaleString()}</span>  
                </div>  
              </div>  

              <div className="flex flex-col gap-3">
                <button onClick={handleBotInquiry} disabled={loadingWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-[15px] disabled:opacity-70 active:scale-[0.98]">
                  {loadingWhatsApp ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </span>
                  ) : (
                    <>Continue to WhatsApp</>
                  )}
                </button>
                <button onClick={() => setShowWhatsAppPopup(false)} disabled={loadingWhatsApp} className="w-full py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
