"use client";

import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash, FaArrowLeft, FaWhatsapp, FaPlus } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();
  const router = useRouter();

  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
  
  // Real Upsell State
  const [upsellItems, setUpsellItems] = useState<any[]>([]);
  const [loadingUpsells, setLoadingUpsells] = useState(true);

  const botPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "256740373021";

  // ==========================================
  // 📥 FETCH REAL UPSELL ITEMS
  // ==========================================
  useEffect(() => {
    async function fetchUpsells() {
      try {
        const res = await fetch("/api/products/upsells");
        if (res.ok) {
          const data = await res.json();
          // Filter out items that are already in the user's cart
          const cartIds = new Set(cart.map(item => item.id));
          const filteredUpsells = data.items.filter((item: any) => !cartIds.has(item.id));
          
          setUpsellItems(filteredUpsells);
        }
      } catch (error) {
        console.error("Failed to load upsells", error);
      } finally {
        setLoadingUpsells(false);
      }
    }
    fetchUpsells();
  }, [cart]); // Re-run filtering if cart changes

  // ==========================================
  // 🧠 THE DELIVERY PROGRESS LOGIC
  // ==========================================
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { deliveryFee, progress, message, isFreeDelivery } = useMemo(() => {
    if (cartTotal >= 20000) {
      return { deliveryFee: 0, progress: 100, message: "Your order qualifies for FREE delivery!", isFreeDelivery: true };
    }
    if (totalItems >= 4) {
      return { deliveryFee: 0, progress: 100, message: "🎉 FREE DELIVERY UNLOCKED!", isFreeDelivery: true };
    }
    if (totalItems === 3) {
      return { deliveryFee: 500, progress: 75, message: "Add 1 more item to unlock FREE delivery.", isFreeDelivery: false };
    }
    if (totalItems === 2) {
      return { deliveryFee: 1000, progress: 50, message: "Add 1 more item and save another UGX 500 on delivery.", isFreeDelivery: false };
    }
    return { deliveryFee: 2000, progress: 25, message: "Add 1 more item and save UGX 1,000 on delivery.", isFreeDelivery: false };
  }, [cartTotal, totalItems]);

  const finalTotal = cartTotal + deliveryFee;

  // ==========================================
  // WHATSAPP CHECKOUT LOGIC
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
      const deliveryText = deliveryFee === 0 ? "FREE" : `UGX ${deliveryFee.toLocaleString()}`;
      
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

  // ==========================================
  // QUICK ADD HANDLER (NOW WITH REAL SELLERS)
  // ==========================================
  const handleQuickAdd = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image, // Real image mapped from API
      sellerId: item.sellerId, // REAL Seller ID
      sellerPhone: item.sellerPhone // REAL Seller Phone
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Shopping Cart</h1>
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-[#25D366] flex items-center gap-2">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>

      {/* ========================================== */}
      {/* 🚀 THE GAMIFICATION BAR */}
      {/* ========================================== */}
      <div className={`mb-8 p-5 rounded-2xl border transition-all ${isFreeDelivery ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex justify-between items-end mb-3">
          <p className={`font-bold text-sm md:text-base ${isFreeDelivery ? 'text-green-700' : 'text-slate-700'}`}>
            {isFreeDelivery ? "✨ " : "🚚 "}{message}
          </p>
          <span className={`text-xs font-black ${isFreeDelivery ? 'text-green-600' : 'text-slate-500'}`}>
            {totalItems >= 4 || cartTotal >= 20000 ? "UNLOCKED" : `${totalItems}/4 ITEMS`}
          </span>
        </div>
        
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden mb-5">
          <div 
            className={`h-full transition-all duration-500 ease-out rounded-full ${isFreeDelivery ? 'bg-[#25D366]' : 'bg-[#D97706]'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Real Quick Add Upsell */}
        {!isFreeDelivery && (
          <div className="pt-4 border-t border-slate-200/60">
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
              Quick add to save on delivery:
            </p>
            
            {loadingUpsells ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-shrink-0 w-[200px] h-[58px] bg-slate-100 animate-pulse rounded-lg border border-slate-200"></div>
                ))}
              </div>
            ) : upsellItems.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {upsellItems.map((item) => (
                  <div key={item.id} className="flex-shrink-0 bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-3 w-[220px] shadow-sm hover:border-[#D97706] transition-colors">
                    <div className="w-10 h-10 bg-slate-50 rounded-md overflow-hidden flex items-center justify-center shrink-0 border border-slate-100">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] text-slate-400">No img</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate" title={item.title}>{item.title}</p>
                      <p className="text-[#D97706] font-black text-xs">UGX {item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleQuickAdd(item)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#D97706] hover:text-white flex items-center justify-center transition-colors text-slate-600 shrink-0">
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Add items from the store to save on delivery!</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50 relative">
              <div className="w-24 h-24 bg-white rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="max-h-full object-contain p-2" />
                ) : (
                  <span className="text-xs text-slate-400">No img</span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 leading-tight pr-8">{item.title}</h3>
                  <p className="text-slate-800 font-extrabold mt-1">UGX {item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border border-slate-300 rounded overflow-hidden bg-white h-8">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 hover:bg-slate-100 font-bold text-slate-600">-</button>
                    <span className="px-3 font-semibold text-sm border-x border-slate-300 h-full flex items-center justify-center min-w-[30px]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 hover:bg-slate-100 font-bold text-slate-600">+</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-2 transition-colors"
                title="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 h-max sticky top-24">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-4">Order Summary</h2>

          <div className="flex justify-between mb-3 text-sm text-slate-600">
            <span>Subtotal ({totalItems} items)</span>
            <span className="font-semibold text-slate-800">UGX {cartTotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between mb-4 text-sm border-b border-slate-200 pb-4">
            <span className="text-slate-600">Delivery Fee</span>
            {isFreeDelivery ? (
              <span className="font-black text-[#25D366]">FREE</span>
            ) : (
              <span className="font-semibold text-slate-800">UGX {deliveryFee.toLocaleString()}</span>
            )}
          </div>

          <div className="flex justify-between mb-6 text-lg">
            <span className="font-bold text-slate-900">Total</span>
            <span className="font-black text-slate-900">UGX {finalTotal.toLocaleString()}</span>
          </div>

          <button 
            onClick={handleCheckoutClick}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 text-[15px]"
          >
            <FaWhatsapp className="text-xl" /> 
            Checkout via WhatsApp
          </button>
        </div>
      </div>

      {/* WHATSAPP POPUP */}
      {/* ... (Your existing WhatsApp Popup Code goes here) ... */}
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
