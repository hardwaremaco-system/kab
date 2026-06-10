"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash, FaArrowLeft, FaWhatsapp } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);

  const botPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "256740373021";

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

      // Map cart to match the updated API payload expectations
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
        
        // Optional: Clear the cart locally once the lead is safely generated
        // clearCart(); 
      }

      // Format the WhatsApp message text
      const itemsList = cart.map(item => `${item.quantity}x ${item.title}`).join("\n");
      const rawMessage = `Hi! I want to order the following items on Kabale Online:\n\n${itemsList}\n\n*Total: UGX ${cartTotal.toLocaleString()}*\n\nRef: [${referenceCode}]`;
      const encodedMessage = encodeURIComponent(rawMessage);

      window.open(`https://wa.me/${botPhoneNumber}?text=${encodedMessage}`, "_blank");
    } catch (error) {
      const rawMessage = `Hi! I want to order my cart items.\n\nTotal: UGX ${cartTotal.toLocaleString()}`;
      window.open(`https://wa.me/${botPhoneNumber}?text=${encodeURIComponent(rawMessage)}`, "_blank");
    } finally {
      setLoadingWhatsApp(false);
      setShowWhatsAppPopup(false); 
    }
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Shopping Cart</h1>
        <Link href="/" className="text-sm font-bold text-slate-500 hover:text-[#25D366] flex items-center gap-2">
          <FaArrowLeft /> Continue Shopping
        </Link>
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
            <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
            <span className="font-semibold text-slate-800">UGX {cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-slate-600 border-b border-slate-200 pb-4">
            <span>Delivery</span>
            <span className="font-semibold text-slate-800">Standard Local</span>
          </div>

          <div className="flex justify-between mb-6 text-lg">
            <span className="font-bold text-slate-900">Total</span>
            <span className="font-black text-slate-900">UGX {cartTotal.toLocaleString()}</span>
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

      {/* ========================================== */}
      {/* 🛑 WHATSAPP INTERCEPTION POPUP             */}
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
              
              {/* 🧮 SUMMARY BOX */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">  
                <p className="font-bold text-sm text-slate-600 leading-tight mb-2">
                  Paying for {cart.length} item{cart.length > 1 ? "s" : ""}
                </p>  
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">  
                  <span className="text-sm font-bold text-slate-500">Order Total:</span>  
                  <span className="font-black text-slate-900 text-lg">UGX {cartTotal.toLocaleString()}</span>  
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
