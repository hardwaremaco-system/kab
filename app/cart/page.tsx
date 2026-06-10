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
  const [upsellItems, setUpsellItems] = useState<any[]>([]);
  const [loadingUpsells, setLoadingUpsells] = useState(true);

  const botPhoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "256740373021";

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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // 🚀 UPDATED DISCOUNT LOGIC: 500 UGX per item
  const baseDelivery = 2000;
  const deliveryDiscount = Math.min(totalItems * 500, baseDelivery);
  const deliveryFee = Math.max(baseDelivery - deliveryDiscount, 0);
  const isFreeDelivery = deliveryFee === 0;
  
  const progress = Math.min(totalItems * 25, 100);
  const message = isFreeDelivery 
    ? "🎉 FREE DELIVERY UNLOCKED!" 
    : `Add ${4 - totalItems} more item(s) to reach FREE delivery.`;

  const finalTotal = cartTotal + deliveryFee;

  const handleCheckoutClick = () => { if (cart.length > 0) setShowWhatsAppPopup(true); };

  const handleBotInquiry = async () => {
    setLoadingWhatsApp(true);
    try {
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
        body: JSON.stringify({ cartItems: payloadCartItems }),
      });

      const data = await res.json();
      const itemsList = cart.map(item => `${item.quantity}x ${item.title}`).join("\n");
      const deliveryText = isFreeDelivery ? "FREE" : `UGX ${deliveryFee.toLocaleString()}`;
      
      const rawMessage = `Hi! I want to order:\n\n${itemsList}\n\n*Subtotal: UGX ${cartTotal.toLocaleString()}*\n*Delivery: ${deliveryText}*\n*Grand Total: UGX ${finalTotal.toLocaleString()}*\n\nRef: [${data.leadId || 'CART'}]`;
      window.open(`https://wa.me/${botPhoneNumber}?text=${encodeURIComponent(rawMessage)}`, "_blank");
    } catch (error) {
      window.open(`https://wa.me/${botPhoneNumber}?text=${encodeURIComponent("I want to order my cart items.")}`, "_blank");
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
        <Link href="/" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-8 rounded-lg">Start Shopping</Link>
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

      {/* Gamification Bar */}
      <div className={`mb-6 p-4 rounded-2xl border ${isFreeDelivery ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-start mb-3">
          <p className={`font-bold text-[13px] ${isFreeDelivery ? 'text-green-700' : 'text-slate-700'}`}>{message}</p>
          <span className="text-[10px] font-black bg-white/60 px-2 py-1 rounded-md">{totalItems}/4 ITEMS</span>
        </div>
        <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden isolate">
          <div className={`absolute top-0 left-0 h-full transition-all ${isFreeDelivery ? 'bg-[#25D366]' : 'bg-[#D97706]'}`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 border rounded-xl bg-slate-50 relative">
              <div className="w-20 h-20 bg-white rounded-lg border flex items-center justify-center shrink-0">
                {item.image ? <img src={item.image} alt={item.title} className="max-h-full object-contain p-2" /> : "No img"}
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="font-bold text-sm line-clamp-2">{item.title}</h3>
                <p className="font-extrabold mt-1">UGX {item.price.toLocaleString()}</p>
                <div className="flex items-center border rounded h-7 w-24 mt-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2">-</button>
                  <span className="px-2 text-xs">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="absolute top-2 right-2 p-2 text-slate-400 hover:text-red-500"><FaTrash /></button>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border rounded-xl p-5 h-max sticky top-24">
          <h2 className="text-lg font-bold mb-4 border-b pb-3">Order Summary</h2>
          <div className="flex justify-between mb-3 text-sm"><span>Subtotal</span><span>UGX {cartTotal.toLocaleString()}</span></div>
          <div className="flex justify-between mb-4 text-sm border-b pb-3"><span>Delivery</span><span className="font-black">{isFreeDelivery ? "FREE" : `UGX ${deliveryFee.toLocaleString()}`}</span></div>
          <div className="flex justify-between mb-6 text-lg font-bold"><span>Total</span><span>UGX {finalTotal.toLocaleString()}</span></div>
          <button onClick={handleCheckoutClick} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2"><FaWhatsapp /> Checkout via WhatsApp</button>
        </div>
      </div>
    </div>
  );
}
